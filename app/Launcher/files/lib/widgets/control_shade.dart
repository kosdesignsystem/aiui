import '../models/launcher_motion.dart';
import 'dart:math' as math;
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../platform/launcher_platform.dart';
import 'launcher_chrome.dart';
import 'launcher_action.dart';
import 'original_icon.dart';

class ControlShade extends StatefulWidget {
  const ControlShade(
      {Key? key,
      required this.onClose,
      required this.onSettings,
      this.platform = const DemoLauncherPlatform(),
      this.contentOpacity = 1,
      this.contentScale = 1,
      this.preview = false,
      this.onSliderInteraction})
      : super(key: key);
  final VoidCallback onClose;
  final VoidCallback onSettings;
  final LauncherPlatform platform;
  final double contentOpacity;
  final double contentScale;
  final bool preview;
  final ValueChanged<bool>? onSliderInteraction;
  @override
  State<ControlShade> createState() => _ControlShadeState();
}

class _ControlShadeState extends State<ControlShade> {
  late final ControlState controls = widget.platform.createControls();
  @override
  Widget build(BuildContext context) => IgnorePointer(
        ignoring: widget.preview,
        child: Semantics(
          label: 'Панель быстрых настроек',
          explicitChildNodes: true,
          scopesRoute: !widget.preview,
          child: Stack(fit: StackFit.expand, children: [
            ClipRect(
                child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 28, sigmaY: 28),
              child: ColoredBox(
                color: const Color(0x7A05272A),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 102, 16, 70),
                  child: Opacity(
                    opacity: widget.contentOpacity.clamp(0.0, 1.0),
                    child: Transform.scale(
                      scale: widget.contentScale,
                      alignment: const Alignment(0, -.64),
                      child: SingleChildScrollView(
                          child:
                              Column(mainAxisSize: MainAxisSize.min, children: [
                        const LauncherClock(),
                        const SizedBox(height: 24),
                        Row(children: [
                          Expanded(child: _network(true)),
                          const SizedBox(width: 16),
                          Expanded(child: _network(false)),
                        ]),
                        const SizedBox(height: 25),
                        Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              _quick('airplane', 'Режим полета', 'avia', 'avia',
                                  const Color(0xFFD9A832)),
                              _quick('location', 'Геолокация', 'place',
                                  'place-off', const Color(0xFF287DE0)),
                              _quick(
                                  'silent',
                                  'Без звука',
                                  'notification-off',
                                  'notification-active',
                                  const Color(0xFFD63D4D)),
                              _quick('flashlight', 'Фонарик', 'lighter',
                                  'lighter-outline', const Color(0xFF716CEA)),
                            ]),
                        const SizedBox(height: 25),
                        ShadeSlider(
                            value: controls.volume,
                            startIcon: 'volume-0',
                            endIcon: 'volume-100',
                            label: 'Громкость',
                            onInteraction: widget.onSliderInteraction,
                            onChanged: (v) =>
                                setState(() => controls.volume = v)),
                        const SizedBox(height: 25),
                        ShadeSlider(
                            value: controls.brightness,
                            startIcon: 'brightness-low-outline',
                            endIcon: 'brightness',
                            label: 'Яркость',
                            onInteraction: widget.onSliderInteraction,
                            onChanged: (v) =>
                                setState(() => controls.brightness = v)),
                        const SizedBox(height: 44),
                        LauncherAction(
                            label: 'Перейти в настройки',
                            onPressed: widget.onSettings,
                            child: const Text('Перейти в настройки',
                                style: TextStyle(
                                    fontSize: 16,
                                    height: 22 / 16,
                                    fontWeight: FontWeight.w600))),
                      ])),
                    ),
                  ),
                ),
              ),
            )),
            Positioned(
                bottom: 52,
                left: 0,
                right: 0,
                height: 28,
                child: LauncherAction(
                    label: 'Закрыть панель',
                    onPressed: widget.onClose,
                    child: const SizedBox.expand())),
          ]),
        ),
      );
  Widget _network(bool mobile) {
    final bool active = mobile ? controls.mobile : controls.wifi;
    final String label = mobile ? 'Моб. интернет' : 'Wi-Fi';
    final String detail = active
        ? mobile
            ? 'Megafon LTE'
            : 'KLCorp'
        : 'Выключено';
    return LauncherAction(
      label: '$label, $detail',
      toggled: active,
      onPressed: () => setState(() {
        if (mobile) {
          controls.mobile = !active;
        } else {
          controls.wifi = !active;
        }
      }),
      child: AnimatedContainer(
        duration: launcherDuration(200),
        height: 102,
        decoration: BoxDecoration(
            color: active ? const Color(0xFF2687EE) : launcherGlass,
            borderRadius: BorderRadius.circular(17),
            boxShadow: active
                ? const [
                    BoxShadow(
                        color: Color(0x38105DAC),
                        blurRadius: 18,
                        offset: Offset(0, 7))
                  ]
                : null),
        padding: const EdgeInsets.fromLTRB(13, 14, 13, 13),
        child: DefaultTextStyle(
          style: TextStyle(
              fontFamily: 'Kaspersky Sans Text',
              color: active ? Colors.white : Colors.white54),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            AnimatedGlyph(
                motion: mobile ? 'cellular' : 'wifi',
                name: mobile
                    ? 'cellular'
                    : active
                        ? 'wifi-on'
                        : 'wifi-off',
                active: active,
                color: active ? Colors.white : Colors.white54),
            const SizedBox(height: 8),
            Text(label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                    fontSize: 17,
                    height: 21 / 17,
                    fontWeight: FontWeight.w600)),
            const SizedBox(height: 1),
            Text(detail,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 14, height: 18 / 14)),
          ]),
        ),
      ),
    );
  }

  Widget _quick(String id, String label, String on, String off, Color accent) {
    final bool active = controls.quick[id]!;
    return SizedBox(
        width: 68,
        child: LauncherAction(
          label: label,
          toggled: active,
          onPressed: () => setState(() => controls.quick[id] = !active),
          child: Column(children: [
            AnimatedContainer(
                duration: launcherDuration(200),
                width: 68,
                height: 68,
                transform: Matrix4.translationValues(0, active ? -1 : 0, 0),
                decoration: BoxDecoration(
                    color: active ? launcherWhite : launcherGlassStrong,
                    borderRadius: BorderRadius.circular(18),
                    boxShadow: active
                        ? const [
                            BoxShadow(
                                color: Color(0x26000000),
                                blurRadius: 22,
                                offset: Offset(0, 8))
                          ]
                        : null),
                child: Center(
                    child: AnimatedGlyph(
                        motion: id,
                        name: active ? on : off,
                        active: active,
                        color: active ? accent : const Color(0x94FFFFFF)))),
            const SizedBox(height: 12),
            SizedBox(
                height: 15,
                child: OverflowBox(
                    maxWidth: 90,
                    minWidth: 90,
                    child: Text(label,
                        maxLines: 1,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 12,
                            height: 15 / 12,
                            color: active
                                ? Colors.white
                                : const Color(0x94FFFFFF))))),
          ]),
        ));
  }
}

/// Animate original SVG geometry. Network segments stay separate, as in JSX.
class AnimatedGlyph extends StatefulWidget {
  const AnimatedGlyph(
      {Key? key,
      required this.name,
      required this.motion,
      required this.active,
      required this.color})
      : super(key: key);
  final String name;
  final String motion;
  final bool active;
  final Color color;
  @override
  State<AnimatedGlyph> createState() => _AnimatedGlyphState();
}

class _AnimatedGlyphState extends State<AnimatedGlyph>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller =
      AnimationController(vsync: this, duration: launcherDuration(420));
  String? source;
  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    if (widget.motion != 'cellular' && widget.motion != 'wifi') return;
    final name = widget.name;
    final value = await rootBundle.loadString('assets/svg/$name.svg');
    if (mounted && widget.name == name) setState(() => source = value);
  }

  @override
  void didUpdateWidget(AnimatedGlyph oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.name != widget.name) _load();
    if (oldWidget.active != widget.active) {
      if (MediaQuery.of(context).disableAnimations) {
        controller.value = 1;
      } else {
        controller.forward(from: 0);
      }
    }
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SizedBox(
        width: 22,
        height: 22,
        child: AnimatedBuilder(
            animation: controller,
            builder: (context, _) {
              final t = controller.isAnimating ? controller.value : 1.0;
              final wave = math.sin(t * math.pi);
              Widget icon;
              if (source != null) {
                var markup = source!;
                var index = 0;
                markup = markup.replaceAllMapped(
                    RegExp(r'<(rect|circle|path)\b[^>]*/>'), (m) {
                  final i = index++;
                  final local =
                      ((t * 420 - (widget.active ? i : 3 - i) * 34) / 280)
                          .clamp(0.0, 1.0);
                  final scale = widget.active
                      ? .16 + .84 * Curves.easeOutBack.transform(local)
                      : 1 - .68 * math.sin(local * math.pi);
                  final opacity = widget.active
                      ? local
                      : 1 - .88 * math.sin(local * math.pi);
                  final cx = widget.motion == 'cellular' ? 4.5 + i * 5 : 12.0;
                  final cy = widget.motion == 'cellular'
                      ? 20.0
                      : i == 0
                          ? 18.0
                          : i == 1
                              ? 13.3
                              : 8.6;
                  if (!controller.isAnimating) return m[0]!;
                  return '<g opacity="$opacity" transform="translate($cx $cy) scale(1 $scale) translate(${-cx} ${-cy})">${m[0]}</g>';
                });
                icon = SvgPicture.string(markup,
                    width: 22,
                    height: 22,
                    theme: SvgTheme(currentColor: widget.color));
              } else {
                icon = OriginalIcon(widget.name, color: widget.color);
              }
              var offset = Offset.zero;
              var angle = 0.0;
              var scale = 1.0;
              switch (widget.motion) {
                case 'airplane':
                  offset = Offset((widget.active ? -10 : 10) * (1 - t), 0);
                  scale = 1 - .1 * (1 - t);
                  break;
                case 'location':
                  offset = Offset(0, widget.active ? -7 * (1 - t) : -3 * wave);
                  scale = 1 - .12 * (1 - t);
                  break;
                case 'silent':
                  angle = math.sin(t * math.pi * 4) * .14 * (1 - t);
                  break;
                case 'flashlight':
                  angle = -.087 * (1 - t);
                  offset = Offset(0, math.sin(t * math.pi * 2));
                  scale = 1 - .07 * (1 - t);
                  break;
              }
              return Stack(
                  clipBehavior: Clip.none,
                  alignment: Alignment.center,
                  children: [
                    if (controller.isAnimating)
                      Transform.scale(
                          scale: .55 + .85 * t,
                          child: Opacity(
                              opacity: .35 * (1 - t),
                              child: Container(
                                  width: 22,
                                  height: 22,
                                  decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      border: Border.all(
                                          color: widget.color, width: 2))))),
                    Transform.translate(
                        offset: offset,
                        child: Transform.rotate(
                            angle: angle,
                            child: Transform.scale(scale: scale, child: icon))),
                  ]);
            }),
      );
}

class ShadeSlider extends StatefulWidget {
  const ShadeSlider(
      {Key? key,
      required this.value,
      required this.startIcon,
      required this.endIcon,
      required this.label,
      required this.onChanged,
      this.onInteraction})
      : super(key: key);
  final double value;
  final String startIcon;
  final String endIcon;
  final String label;
  final ValueChanged<double> onChanged;
  final ValueChanged<bool>? onInteraction;
  @override
  State<ShadeSlider> createState() => _ShadeSliderState();
}

class _ShadeSliderState extends State<ShadeSlider> {
  bool dragging = false;
  void _set(Offset position, double width) => widget.onChanged(
      ((position.dx - 4) / (width - 8) * 100).roundToDouble().clamp(0, 100));
  void _finish() {
    setState(() => dragging = false);
    widget.onInteraction?.call(false);
  }

  @override
  Widget build(BuildContext context) => Semantics(
        slider: true,
        label: widget.label,
        value: '${widget.value.round()}%',
        increasedValue: '${(widget.value + 1).clamp(0, 100).round()}%',
        decreasedValue: '${(widget.value - 1).clamp(0, 100).round()}%',
        onIncrease: () => widget.onChanged((widget.value + 1).clamp(0, 100)),
        onDecrease: () => widget.onChanged((widget.value - 1).clamp(0, 100)),
        child: Focus(
            onKeyEvent: (_, event) {
              if (event is KeyDownEvent || event is KeyRepeatEvent) {
                double? value;
                if (event.logicalKey == LogicalKeyboardKey.arrowRight ||
                    event.logicalKey == LogicalKeyboardKey.arrowUp) {
                  value = widget.value + 1;
                }
                if (event.logicalKey == LogicalKeyboardKey.arrowLeft ||
                    event.logicalKey == LogicalKeyboardKey.arrowDown) {
                  value = widget.value - 1;
                }
                if (event.logicalKey == LogicalKeyboardKey.home) value = 0;
                if (event.logicalKey == LogicalKeyboardKey.end) value = 100;
                if (value != null) {
                  widget.onChanged(value.clamp(0, 100));
                  return KeyEventResult.handled;
                }
              }
              return KeyEventResult.ignored;
            },
            child: Builder(
                builder: (context) => LayoutBuilder(
                    builder: (context, constraints) => Listener(
                          onPointerDown: (e) {
                            Focus.of(context).requestFocus();
                            widget.onInteraction?.call(true);
                            setState(() => dragging = true);
                            _set(e.localPosition, constraints.maxWidth);
                          },
                          onPointerMove: (e) {
                            if (dragging) {
                              _set(e.localPosition, constraints.maxWidth);
                            }
                          },
                          onPointerUp: (_) => _finish(),
                          onPointerCancel: (_) => _finish(),
                          child: SizedBox(
                              height: 51,
                              child: ClipRRect(
                                  borderRadius: BorderRadius.circular(13),
                                  child: Stack(fit: StackFit.expand, children: [
                                    const ColoredBox(color: Color(0x38FFFFFF)),
                                    Align(
                                        alignment: Alignment.centerLeft,
                                        child: AnimatedContainer(
                                            duration: Duration(
                                                milliseconds:
                                                    dragging ? 0 : 150),
                                            curve: Curves.easeOutCubic,
                                            width: math.min(
                                                constraints.maxWidth,
                                                constraints.maxWidth *
                                                        widget.value /
                                                        100 +
                                                    6),
                                            height: 51,
                                            decoration: BoxDecoration(
                                                color: Colors.white,
                                                borderRadius:
                                                    BorderRadius.circular(13)),
                                            alignment: Alignment.centerRight,
                                            padding:
                                                const EdgeInsets.only(right: 4),
                                            child: Container(
                                                width: 3,
                                                height: dragging ? 31.36 : 28,
                                                decoration: BoxDecoration(
                                                    color:
                                                        const Color(0xFF929697),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            2))))),
                                    Padding(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20),
                                        child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.spaceBetween,
                                            children: [
                                              _sliderIcon(widget.startIcon,
                                                  widget.value >= 9),
                                              _sliderIcon(widget.endIcon,
                                                  widget.value >= 91),
                                            ])),
                                    if (Focus.of(context).hasFocus)
                                      DecoratedBox(
                                          decoration: BoxDecoration(
                                              border: Border.all(
                                                  color: Colors.white,
                                                  width: 2),
                                              borderRadius:
                                                  BorderRadius.circular(13))),
                                  ]))),
                        )))),
      );
  Widget _sliderIcon(String name, bool filled) => TweenAnimationBuilder<double>(
      key: ValueKey('$name-$filled'),
      tween: Tween(begin: .88, end: 1),
      duration: launcherDuration(420),
      curve: Curves.easeOutBack,
      builder: (_, scale, child) => Transform.scale(scale: scale, child: child),
      child: OriginalIcon(name,
          size: 20, color: filled ? const Color(0xFF20282A) : Colors.white));
}
