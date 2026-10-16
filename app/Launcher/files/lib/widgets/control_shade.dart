import 'dart:ui';

import 'package:flutter/material.dart';

import 'launcher_chrome.dart';

class ControlShade extends StatefulWidget {
  const ControlShade({
    Key? key,
    required this.onClose,
    required this.onSettings,
    this.contentOpacity = 1,
    this.contentScale = 1,
  }) : super(key: key);

  final VoidCallback onClose;
  final VoidCallback onSettings;
  final double contentOpacity;
  final double contentScale;

  @override
  State<ControlShade> createState() => _ControlShadeState();
}

class _ControlShadeState extends State<ControlShade> {
  bool _mobile = true;
  bool _wifi = false;
  bool _airplane = false;
  bool _location = true;
  bool _silent = true;
  bool _flashlight = false;
  double _volume = 100;
  double _brightness = 46;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onVerticalDragEnd: (DragEndDetails details) {
        if ((details.primaryVelocity ?? 0) < -300) widget.onClose();
      },
      child: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          ClipRect(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 28, sigmaY: 28),
              child: ColoredBox(
                color: const Color(0x7A05272A),
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 102, 16, 70),
                  child: AnimatedOpacity(
                    duration: const Duration(milliseconds: 150),
                    opacity: widget.contentOpacity.clamp(0.0, 1.0),
                    child: AnimatedScale(
                      duration: const Duration(milliseconds: 240),
                      curve: Curves.easeOutCubic,
                      alignment: const Alignment(0, -0.64),
                      scale: widget.contentScale,
                      child: Column(
                        children: <Widget>[
                          const LauncherClock(),
                          const SizedBox(height: 24),
                          Row(
                            children: <Widget>[
                              Expanded(
                                child: _NetworkToggle(
                                  active: _mobile,
                                  icon: Icons.signal_cellular_4_bar,
                                  label: 'Моб. интернет',
                                  detail: _mobile ? 'Megafon LTE' : 'Выключено',
                                  onTap: () =>
                                      setState(() => _mobile = !_mobile),
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: _NetworkToggle(
                                  active: _wifi,
                                  icon: _wifi ? Icons.wifi : Icons.wifi_off,
                                  label: 'Wi-Fi',
                                  detail: _wifi ? 'KLCorp' : 'Выключено',
                                  onTap: () => setState(() => _wifi = !_wifi),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 25),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              _QuickToggle(
                                active: _airplane,
                                icon: Icons.airplanemode_active,
                                label: 'Режим полета',
                                accent: const Color(0xFFD9A832),
                                onTap: () =>
                                    setState(() => _airplane = !_airplane),
                              ),
                              _QuickToggle(
                                active: _location,
                                icon: _location
                                    ? Icons.location_on
                                    : Icons.location_off,
                                label: 'Геолокация',
                                accent: const Color(0xFF287DE0),
                                onTap: () =>
                                    setState(() => _location = !_location),
                              ),
                              _QuickToggle(
                                active: _silent,
                                icon: _silent
                                    ? Icons.notifications_off
                                    : Icons.notifications_active,
                                label: 'Без звука',
                                accent: const Color(0xFFD63D4D),
                                onTap: () => setState(() => _silent = !_silent),
                              ),
                              _QuickToggle(
                                active: _flashlight,
                                icon: _flashlight
                                    ? Icons.flashlight_on
                                    : Icons.flashlight_off,
                                label: 'Фонарик',
                                accent: const Color(0xFF716CEA),
                                onTap: () =>
                                    setState(() => _flashlight = !_flashlight),
                              ),
                            ],
                          ),
                          const SizedBox(height: 25),
                          _ShadeSlider(
                            value: _volume,
                            startIcon: Icons.volume_off,
                            endIcon: Icons.volume_up,
                            semanticLabel: 'Громкость',
                            onChanged: (double value) =>
                                setState(() => _volume = value),
                          ),
                          const SizedBox(height: 25),
                          _ShadeSlider(
                            value: _brightness,
                            startIcon: Icons.brightness_low_outlined,
                            endIcon: Icons.brightness_high,
                            semanticLabel: 'Яркость',
                            onChanged: (double value) =>
                                setState(() => _brightness = value),
                          ),
                          const Spacer(),
                          TextButton(
                            onPressed: widget.onSettings,
                            style: TextButton.styleFrom(
                              foregroundColor: Colors.white,
                              minimumSize: const Size(0, 22),
                              padding: EdgeInsets.zero,
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            ),
                            child: const Text(
                              'Перейти в настройки',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            bottom: 52,
            left: 0,
            right: 0,
            height: 28,
            child: Semantics(
              button: true,
              label: 'Закрыть панель',
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: widget.onClose,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _NetworkToggle extends StatelessWidget {
  const _NetworkToggle({
    required this.active,
    required this.icon,
    required this.label,
    required this.detail,
    required this.onTap,
  });

  final bool active;
  final IconData icon;
  final String label;
  final String detail;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final Color color = active ? Colors.white : Colors.white54;
    return Semantics(
      button: true,
      toggled: active,
      label: label,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
        height: 102,
        decoration: BoxDecoration(
          color: active ? const Color(0xFF2687EE) : launcherGlass,
          borderRadius: BorderRadius.circular(17),
          boxShadow: active
              ? const <BoxShadow>[
                  BoxShadow(
                    color: Color(0x38105DAC),
                    blurRadius: 18,
                    offset: Offset(0, 7),
                  ),
                ]
              : null,
        ),
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(17),
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(17),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(13, 12, 13, 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  _AnimatedGlyph(icon: icon, active: active, color: color),
                  const SizedBox(height: 5),
                  Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 17,
                      height: 21 / 17,
                      fontWeight: FontWeight.w600,
                      color: color,
                    ),
                  ),
                  Text(
                    detail,
                    maxLines: 1,
                    style: TextStyle(
                      fontSize: 14,
                      height: 18 / 14,
                      color: color,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _QuickToggle extends StatelessWidget {
  const _QuickToggle({
    required this.active,
    required this.icon,
    required this.label,
    required this.accent,
    required this.onTap,
  });

  final bool active;
  final IconData icon;
  final String label;
  final Color accent;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 76,
      child: Semantics(
        button: true,
        toggled: active,
        label: label,
        child: InkWell(
          borderRadius: BorderRadius.circular(18),
          onTap: onTap,
          child: Column(
            children: <Widget>[
              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                curve: Curves.easeOutCubic,
                width: 68,
                height: 68,
                transform: Matrix4.translationValues(0, active ? -1 : 0, 0),
                decoration: BoxDecoration(
                  color: active ? launcherWhite : launcherGlassStrong,
                  borderRadius: BorderRadius.circular(18),
                  boxShadow: active
                      ? const <BoxShadow>[
                          BoxShadow(
                            color: Color(0x26000000),
                            blurRadius: 22,
                            offset: Offset(0, 8),
                          ),
                        ]
                      : null,
                ),
                child: Center(
                  child: _AnimatedGlyph(
                    icon: icon,
                    active: active,
                    color: active ? accent : Colors.white54,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.visible,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 12,
                  height: 15 / 12,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AnimatedGlyph extends StatelessWidget {
  const _AnimatedGlyph({
    required this.icon,
    required this.active,
    required this.color,
  });

  final IconData icon;
  final bool active;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      switchInCurve: Curves.easeOutBack,
      switchOutCurve: Curves.easeIn,
      transitionBuilder: (Widget child, Animation<double> animation) {
        return FadeTransition(
          opacity: animation,
          child: ScaleTransition(scale: animation, child: child),
        );
      },
      child: Icon(
        icon,
        key: ValueKey<String>('${icon.codePoint}-$active'),
        size: 24,
        color: color,
      ),
    );
  }
}

class _ShadeSlider extends StatelessWidget {
  const _ShadeSlider({
    required this.value,
    required this.startIcon,
    required this.endIcon,
    required this.semanticLabel,
    required this.onChanged,
  });

  final double value;
  final IconData startIcon;
  final IconData endIcon;
  final String semanticLabel;
  final ValueChanged<double> onChanged;

  @override
  Widget build(BuildContext context) {
    final double fraction = value / 100;
    return Semantics(
      slider: true,
      label: semanticLabel,
      value: '${value.round()}%',
      child: SizedBox(
        height: 51,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(13),
          child: Stack(
            fit: StackFit.expand,
            children: <Widget>[
              const ColoredBox(color: Color(0x38FFFFFF)),
              AnimatedFractionallySizedBox(
                duration: const Duration(milliseconds: 150),
                curve: Curves.easeOutCubic,
                alignment: Alignment.centerLeft,
                widthFactor: (fraction + 0.018).clamp(0.0, 1.0),
                child: const ColoredBox(color: Colors.white),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 19),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    AnimatedScale(
                      scale: value >= 9 ? 1 : 0.92,
                      duration: const Duration(milliseconds: 220),
                      child: Icon(
                        startIcon,
                        size: 20,
                        color:
                            value >= 9 ? const Color(0xFF20282A) : Colors.white,
                      ),
                    ),
                    AnimatedScale(
                      scale: value >= 91 ? 1.08 : 1,
                      duration: const Duration(milliseconds: 220),
                      child: Icon(
                        endIcon,
                        size: 20,
                        color: value >= 91
                            ? const Color(0xFF20282A)
                            : Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
              SliderTheme(
                data: SliderTheme.of(context).copyWith(
                  activeTrackColor: Colors.transparent,
                  inactiveTrackColor: Colors.transparent,
                  trackHeight: 51,
                  thumbColor: const Color(0xFF929697),
                  thumbShape: const RoundSliderThumbShape(
                    enabledThumbRadius: 2,
                  ),
                  overlayShape: SliderComponentShape.noOverlay,
                ),
                child: Slider(
                  value: value,
                  min: 0,
                  max: 100,
                  onChanged: onChanged,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
