import hashlib
from pathlib import Path
import pytest

from model_parts import checksums, discover_parts, install_model, split_model


def test_checksums_read_binary_file(tmp_path):
    source = tmp_path / "source"
    data = b"\x00\xffattachment\x00"
    source.write_bytes(data)
    assert checksums(source) == (hashlib.md5(data).hexdigest(), hashlib.sha256(data).hexdigest())


def test_split_rejects_wrong_model_before_creating_parts(tmp_path):
    source = tmp_path / "wrong.ckpt"
    source.write_bytes(b"not the model")
    with pytest.raises(ValueError, match="Контрольная сумма"):
        split_model(source, tmp_path / "parts")
    assert not (tmp_path / "parts").exists()


def test_missing_part_is_reported(tmp_path):
    (tmp_path / "v3_ctc.ckpt.002").write_bytes(b"last part")
    with pytest.raises(ValueError, match="Пропущена часть.*001"):
        discover_parts(tmp_path)


def test_mac_zero_based_single_part_is_accepted(tmp_path):
    part = tmp_path / "v3_ctc.ckpt.000"
    part.write_bytes(b"final part")
    assert discover_parts(tmp_path) == [part]


def test_mac_zero_based_missing_part_is_reported(tmp_path):
    (tmp_path / "v3_ctc.ckpt.000").write_bytes(b"x" * (30 * 1024 * 1024))
    (tmp_path / "v3_ctc.ckpt.002").write_bytes(b"last part")
    with pytest.raises(ValueError, match="Пропущена часть.*001"):
        discover_parts(tmp_path)


def test_wrong_checksum_never_installs_checkpoint_and_removes_partial(tmp_path):
    parts = tmp_path / "parts"
    parts.mkdir()
    (parts / "v3_ctc.ckpt.001").write_bytes(b"not the model")
    cache = tmp_path / "cache"
    with pytest.raises(ValueError, match="Модель НЕ установлена"):
        install_model(parts, cache)
    assert list(cache.iterdir()) == []


def test_existing_cache_is_preserved(tmp_path):
    parts = tmp_path / "parts"
    parts.mkdir()
    (parts / "v3_ctc.ckpt.001").write_bytes(b"part")
    cache = tmp_path / "cache"
    cache.mkdir()
    target = cache / "v3_ctc.ckpt"
    target.write_bytes(b"existing user file")
    with pytest.raises(FileExistsError):
        install_model(parts, cache)
    assert target.read_bytes() == b"existing user file"


def test_symbolic_link_is_rejected(tmp_path):
    source = tmp_path / "source"
    source.write_bytes(b"part")
    (tmp_path / "v3_ctc.ckpt.001").symlink_to(source)
    with pytest.raises(ValueError, match="обычным файлом"):
        discover_parts(tmp_path)
