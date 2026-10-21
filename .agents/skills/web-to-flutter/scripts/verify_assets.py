#!/usr/bin/env python3
"""Read-only verification of original assets and the stage-one baseline."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import sys


def digest(path):
    result = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            result.update(chunk)
    return result.hexdigest()


def contained_file(root, value, label):
    if not isinstance(value, str) or not value or Path(value).is_absolute():
        raise ValueError(f"{label}: expected a nonempty relative path")
    path = (root / value).resolve()
    if not path.is_relative_to(root):
        raise ValueError(f"{label}: path escapes {root}")
    if not path.is_file():
        raise ValueError(f"{label}: file not found: {path}")
    return path


def checksum(value, label):
    if not isinstance(value, str) or not re.fullmatch(r"[0-9a-fA-F]{64}", value):
        raise ValueError(f"{label}: expected a SHA-256 value (64 hex characters)")
    return value.lower()


def verify(manifest, repo_root, app_root):
    if not isinstance(manifest, dict) or manifest.get("version") != 1:
        raise ValueError("manifest.version must be 1")
    records = manifest.get("assets")
    if not isinstance(records, list):
        raise ValueError("manifest.assets must be an array")
    errors = []
    seen = set()
    checked = 0
    asset_root = (app_root / "assets").resolve()
    for index, record in enumerate(records):
        label = f"assets[{index}]"
        try:
            if not isinstance(record, dict):
                raise ValueError("expected an object")
            kind = record.get("kind")
            if kind not in ("copy", "extracted-svg"):
                raise ValueError("kind must be copy or extracted-svg")
            source = contained_file(repo_root, record.get("source"), "source")
            target = contained_file(app_root, record.get("target"), "target")
            if not target.is_relative_to(asset_root):
                raise ValueError("target must be inside app-root/assets")
            if target in seen:
                raise ValueError("duplicate target")
            seen.add(target)
            expected = checksum(record.get("sha256"), "sha256")
            if kind == "copy":
                expected_source = expected
            else:
                expected_source = checksum(record.get("source_sha256"), "source_sha256")
                if target.suffix.lower() != ".svg":
                    raise ValueError("extracted-svg target must be an SVG file")
                origin = record.get("origin")
                if not isinstance(origin, str) or not origin.strip():
                    raise ValueError("extracted-svg requires an origin locator")
            if digest(source) != expected_source:
                errors.append(f"{label}: source differs from recorded SHA-256: {source}")
            if digest(target) != expected:
                errors.append(f"{label}: target differs from recorded SHA-256: {target}")
            checked += 1
        except (ValueError, OSError, RuntimeError) as exc:
            errors.append(f"{label}: {exc}")
    return checked, errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--repo-root", required=True, type=Path)
    parser.add_argument("--app-root", required=True, type=Path,
                        help="Flutter project directory containing pubspec.yaml and assets/")
    args = parser.parse_args()
    try:
        repo_root = args.repo_root.resolve()
        app_root = args.app_root.resolve()
        if not repo_root.is_dir() or not app_root.is_dir():
            raise ValueError("repo-root and app-root must be existing directories")
        manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
        checked, errors = verify(manifest, repo_root, app_root)
    except (ValueError, OSError, RuntimeError) as exc:
        print(f"Invalid input: {exc}", file=sys.stderr)
        return 2
    for error in errors:
        print(error, file=sys.stderr)
    print(f"Checked {checked} of {len(manifest['assets'])} assets; errors: {len(errors)}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
