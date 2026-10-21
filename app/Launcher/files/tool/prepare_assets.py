"""Reproducible byte copies and mechanical JSX extraction; --check is read-only."""
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys
import xml.etree.ElementTree as ET

APP = Path(__file__).resolve().parents[1]
REPO = APP.parents[2]
CHECK = '--check' in sys.argv
entries = []
def sha(data):
    return hashlib.sha256(data).hexdigest()
def emit(source, target, data=None, origin=None):
    src = REPO / source
    original = src.read_bytes()
    data = original if data is None else data.encode()
    dest = APP / target
    if CHECK:
        assert dest.read_bytes() == data, f'Asset mismatch: {target}'
    else:
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
    item = dict(kind='copy' if origin is None else 'extracted-svg', source=source,
                target=target, sha256=sha(data))
    if origin:
        item.update(source_sha256=sha(original), origin=origin)
    entries.append(item)

names = {'Browser':'browser','Calculator':'calculator','Calendar':'calendar','Camera':'camera',
         'Сlock':'clock','Compass':'compass','Contacts':'contacts','Dictaphone':'dictaphone',
         'File System':'files','Mail':'mail','Maps':'maps','Messenger':'messenger','MyOffice':'my_office',
         'Notes':'notes','Phone':'phone','Photo Gallery':'gallery','Settings':'settings',
         'SMS':'sms','Video':'video','VPN':'vpn','Weather':'weather'}
for source, target in names.items():
    emit(f'src/assets/launcher/icons/{source}.png',f'assets/icons/{target}.png')
for source,target in {'Files':'files','Phone':'phone','Photo':'camera','Photo Gallery':'gallery',
                      'Settings':'settings','Weather':'weather'}.items():
    emit(f'src/assets/launcher/screens/{source}.png',f'assets/screens/{target}.png')
emit('src/assets/launcher/wallpaper.png','assets/wallpaper.png')
for source,target in {'KasperskySansText-Regular.woff2':'text_regular.woff2',
                      'KasperskySansText-Medium.woff2':'text_medium.woff2',
                      'KasperskySansText-SemiBold.woff2':'text_semibold.woff2',
                      'KasperskySansTextClock-Regular.otf':'clock_regular.otf'}.items():
    emit(f'src/assets/fonts/{source}',f'assets/fonts/{target}')
icons = 'lock mobile-home mobile-back-outline signal-cellular-100 wifi battery-charge-medium avia place place-off notification-off notification-active lighter lighter-outline volume-0 volume-100 brightness-low-outline brightness search filter apps chat settings copy-outline'.split()
for name in icons:
    emit(f'src/assets/icons/{name}.svg',f'assets/svg/{name}.svg')

# Keep the JSX geometry and hierarchy; translate JSX attribute spelling only.
def extract(path, marker, active=None):
    text=(REPO/path).read_text()
    fragment=re.search(r'<svg\b[^>]*className="'+marker+r'"[\s\S]*?</svg>',text).group()
    fragment=fragment.replace('className=', 'class=').replace('stopColor=', 'stop-color=').replace('stopOpacity=', 'stop-opacity=')
    conditional=re.compile(r'\{active \? null : (<path[^>]+/>)\}')
    fragment=conditional.sub('' if active else r'\1',fragment)
    fragment=fragment.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ',1)
    # CSS declarations from _home.scss and _shade.scss are inherited via groups.
    if marker=='launcher-unlock__handle':
        fragment=fragment.replace('<path ', '<path fill="none" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" ',1)
    elif marker.endswith('--cellular'):
        fragment=re.sub(r'<rect ', '<rect fill="currentColor" ',fragment)
    else:
        fragment=fragment.replace('<circle ', '<circle fill="currentColor" ')
        fragment=fragment.replace('<path ', '<path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" ')
    ET.fromstring(fragment)
    return fragment+'\n'

for marker,name,active,path in [
    ('launcher-unlock__handle','unlock',None,'src/web/Launcher/launcher.tsx'),
    ('launcher-toggle-glyph launcher-toggle-glyph--cellular','cellular',True,'src/web/Launcher/shade.tsx'),
    ('launcher-toggle-glyph launcher-toggle-glyph--wifi','wifi-on',True,'src/web/Launcher/shade.tsx'),
    ('launcher-toggle-glyph launcher-toggle-glyph--wifi','wifi-off',False,'src/web/Launcher/shade.tsx')]:
    svg=extract(path,marker,active)
    emit(path,f'assets/svg/{name}.svg',svg,f'{marker}; active={active}; JSX attribute spelling + CSS presentation from _home.scss/_shade.scss')
    # Check original geometry attributes and nesting independently of hashes.
    raw=re.search(r'<svg\b[^>]*className="'+marker+r'"[\s\S]*?</svg>',(REPO/path).read_text()).group()
    raw=re.sub(r'\{active \? null : (<path[^>]+/>)\}', '' if active else r'\1',raw)
    raw=raw.replace('className=','class=').replace('stopColor=','stop-color=').replace('stopOpacity=','stop-opacity=')
    a=ET.fromstring(raw); b=ET.fromstring(svg)
    original_nodes=list(a.iter()); extracted_nodes=list(b.iter())
    assert len(original_nodes)==len(extracted_nodes), name
    for original,extracted in zip(original_nodes,extracted_nodes):
        assert original.tag.split('}')[-1]==extracted.tag.split('}')[-1], name
        for attribute,value in original.attrib.items():
            assert extracted.attrib[attribute]==value, (name,attribute)
        allowed={'fill','stroke','stroke-width','stroke-linecap','vector-effect'}
        assert set(extracted.attrib)-set(original.attrib) <= allowed, name

manifest=dict(version=1,assets=entries)
if CHECK:
    assert json.loads((APP/'assets-manifest.json').read_text())==manifest
    all_files={str(p.relative_to(APP)) for p in (APP/'assets').rglob('*') if p.is_file()}
    assert all_files=={e['target'] for e in entries}, 'Unregistered/missing assets'
else:
    (APP/'assets-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'{len(entries)} assets: copies, inline SVG structure/geometry and manifest OK')
