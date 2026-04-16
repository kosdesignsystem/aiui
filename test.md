Посмотрел реализацию Gallery в [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:67) и [screen.scss](/Users/kasper/aiui/src/web/Gallery/screen.scss:253). Ниже уже в формате, который можно переносить в motion/spec для Flutter или Qt.

**Скейлинг**

- `Pinch zoom`: формула `zoom = clamp(startZoom * currentDistance / startDistance, 1, 4)`. Минимум `1x`, максимум `4x`. Центр pinch также двигает картинку по `panX/panY`. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:552).
- `Double tap`: если текущий `zoom > 1.02`, идёт сброс к `1x`; иначе зум в `2x`. `panX/panY` при double tap всегда сбрасываются в `0`, зум не в точку тапа, а по центру. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:895).
- `Pan` разрешён только когда `zoom > 1.02`; при `zoom <= 1.02` одиночный drag трактуется как dismiss, а не как pan. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:501) и [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:516).
- Ограничение pan: по фактическим границам изображения внутри фрейма, без overscroll/rubber band. Формула пределов: `maxX = (displayWidth * zoom - displayWidth) / 2`, `maxY = (displayHeight * zoom - displayHeight) / 2`. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:121).
- Возврат после жеста: `transform` анимируется за `220ms` с `cubic-bezier(0.22, 1, 0.36, 1)`, но во время активного жеста transition отключён. См. [screen.scss](/Users/kasper/aiui/src/web/Gallery/screen.scss:312).

**Открытие и закрытие фото**

- `Open`: анимация из rect миниатюры в rect viewer. Длительность `320ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`, `border-radius: 18px -> 28px`, `transform-origin: top left`. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:329) и [screen.scss](/Users/kasper/aiui/src/web/Gallery/screen.scss:286).
- `Close`: обратная анимация из viewer в текущую миниатюру. Длительность `280ms`, easing тот же, `border-radius: 28px -> 18px`. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:235).
- Геометрия и на open, и на close считается через `translate3d + scale(scaleX, scaleY)` по реальным размерам source/target rect. Это не fade, а именно shared-element/morph по позиции и размеру. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:262) и [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:348).
- Если target для возврата не найден, закрытие идёт без анимации. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:247).

**Dismiss и важные значения**

- Drag-to-close работает только при `zoom <= 1.02`. Порог закрытия по отпусканию: `abs(dismissY) > 136px`. См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:671).
- Во время dismiss:
    - `dismissProgress = min(abs(dismissY) / 260, 0.86)`
    - `dismissScale = 1 - dismissProgress * 0.1` → минимально около `0.914`
    - `chromeOpacity = 1 - dismissProgress * 0.64` → минимально около `0.4496`
    - `dismissX = sign(deltaX) * abs(deltaX) * 0.18`
      См. [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:171) и [screen.tsx](/Users/kasper/aiui/src/web/Gallery/screen.tsx:616).
- Фон viewer и нижний chrome уходят/возвращаются за `180ms ease`; rail скрывается во время gesture/closing. См. [screen.scss](/Users/kasper/aiui/src/web/Gallery/screen.scss:253) и [screen.scss](/Users/kasper/aiui/src/web/Gallery/screen.scss:335).
- Размер viewer-медиа: ширина `min(100%, 440px)`, max-height `min(68vh, 100%)`, aspect ratio `3:4`. См. [screen.scss](/Users/kasper/aiui/src/web/Gallery/screen.scss:286).

Для переноса 1:1:

- Flutter: `Cubic(0.22, 1.0, 0.36, 1.0)`
- Qt: custom bezier easing с теми же контрольными точками

Если хочешь, следующим сообщением соберу это в короткую табличку “Parameter / Value / Comment” специально для Figma.
