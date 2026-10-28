"""Transfer v3_ctc.ckpt in raw parts below the 32 MiB attachment limit.

Standard library only. Never loads/unpickles the checkpoint. Install verifies
the upstream checksum before atomically placing the file into GigaAM's cache.
"""
import argparse
import hashlib
import os
from pathlib import Path
import re
import tempfile

# Published by GigaAM at pinned commit 7447938d791c4f3e643386ee22c33777004293a5.
MODEL_NAME = "v3_ctc.ckpt"
EXPECTED_MD5 = "73413e7be9c6a5935827bfab5c0dd678"
PART_SIZE = 30 * 1024 * 1024
PART_PATTERN = re.compile(r"v3_ctc\.ckpt\.(\d{3})\Z")


def checksums(path):
    md5, sha256 = hashlib.md5(), hashlib.sha256()
    with Path(path).open("rb") as source:
        while block := source.read(1024 * 1024):
            md5.update(block)
            sha256.update(block)
    return md5.hexdigest(), sha256.hexdigest()


def split_model(source, destination):
    source, destination = Path(source), Path(destination)
    if checksums(source)[0] != EXPECTED_MD5:
        raise ValueError("Контрольная сумма исходного файла не совпадает с официальной GigaAM v3_ctc.")
    # Do not mix new parts with an earlier or incomplete transfer.
    destination.mkdir(parents=True, exist_ok=False)
    names = []
    with source.open("rb") as stream:
        while block := stream.read(PART_SIZE):
            part = destination / f"{MODEL_NAME}.{len(names) + 1:03d}"
            with part.open("xb") as output:
                output.write(block)
            names.append(part.name)
    print(f"Создано частей: {len(names)}. Загрузите все файлы из {destination}")
    return names


def discover_parts(directory):
    directory = Path(directory)
    parts = sorted(path for path in directory.iterdir() if PART_PATTERN.fullmatch(path.name))
    if not parts:
        raise ValueError("Нет частей v3_ctc.ckpt.001, .002 и т. д.")
    if len(parts) > 128:
        raise ValueError("Слишком много частей для этой модели.")
    start = 0 if parts[0].name == f"{MODEL_NAME}.000" else 1
    for index, part in enumerate(parts, start):
        if part.name != f"{MODEL_NAME}.{index:03d}":
            raise ValueError(f"Пропущена часть {MODEL_NAME}.{index:03d}")
        if part.is_symlink() or not part.is_file():
            raise ValueError(f"Часть должна быть обычным файлом: {part.name}")
        size = part.stat().st_size
        if not 0 < size <= PART_SIZE:
            raise ValueError(f"Некорректный размер части: {part.name}")
        if index < start + len(parts) - 1 and size != PART_SIZE:
            raise ValueError(f"Промежуточная часть должна иметь размер 30 MiB: {part.name}")
    return parts


def install_model(directory, cache):
    parts = discover_parts(directory)
    cache = Path(cache)
    cache.mkdir(parents=True, exist_ok=True)
    target = cache / MODEL_NAME
    if target.exists() or target.is_symlink():
        raise FileExistsError(f"Файл уже существует, он не будет перезаписан: {target}")
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=cache, prefix="v3_ctc-", suffix=".partial", delete=False) as output:
            temporary = Path(output.name)
            md5, sha256 = hashlib.md5(), hashlib.sha256()
            size = 0
            for part in parts:
                with part.open("rb") as source:
                    while block := source.read(1024 * 1024):
                        output.write(block)
                        md5.update(block)
                        sha256.update(block)
                        size += len(block)
            output.flush()
            os.fsync(output.fileno())
        if md5.hexdigest() != EXPECTED_MD5:
            raise ValueError("Сумма собранной модели не совпадает с официальной. Модель НЕ установлена; проверьте полноту частей.")
        # A hard link installs atomically and fails if another process created the target.
        os.link(temporary, target)
        print(f"Установлено: {target}\nРазмер: {size}\nMD5: {md5.hexdigest()}\nSHA256: {sha256.hexdigest()}")
        return target
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    split = commands.add_parser("split", help="Проверить и разбить исходную модель на части по 30 MiB")
    split.add_argument("source", type=Path)
    split.add_argument("--output", type=Path, default=Path("v3_ctc.parts"))
    install = commands.add_parser("install", help="Проверить, собрать и установить загруженные части")
    install.add_argument("directory", type=Path)
    install.add_argument("--cache", type=Path, default=Path(os.environ.get("GIGAAM_CACHE", "/workspace/.voicehelper/models")))
    args = parser.parse_args()
    try:
        if args.command == "split":
            split_model(args.source, args.output)
        else:
            install_model(args.directory, args.cache)
    except (OSError, ValueError) as error:
        parser.exit(1, f"Ошибка: {error}\n")


if __name__ == "__main__":
    main()
