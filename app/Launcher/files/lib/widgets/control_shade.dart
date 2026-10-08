import 'dart:ui';

import 'package:flutter/material.dart';

import 'launcher_chrome.dart';

class ControlShade extends StatefulWidget {
  const ControlShade({
    Key? key,
    required this.onClose,
    required this.onSettings,
  }) : super(key: key);

  final VoidCallback onClose;
  final VoidCallback onSettings;

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
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 28, sigmaY: 28),
        child: ColoredBox(
          color: const Color(0x7A05272A),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 62, 16, 18),
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
                        onTap: () => setState(() => _mobile = !_mobile),
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
                      onTap: () => setState(() => _airplane = !_airplane),
                    ),
                    _QuickToggle(
                      active: _location,
                      icon: _location ? Icons.location_on : Icons.location_off,
                      label: 'Геолокация',
                      accent: const Color(0xFF287DE0),
                      onTap: () => setState(() => _location = !_location),
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
                      onTap: () => setState(() => _flashlight = !_flashlight),
                    ),
                  ],
                ),
                const SizedBox(height: 25),
                _ShadeSlider(
                  value: _volume,
                  startIcon: Icons.volume_off,
                  endIcon: Icons.volume_up,
                  semanticLabel: 'Громкость',
                  onChanged: (value) => setState(() => _volume = value),
                ),
                const SizedBox(height: 25),
                _ShadeSlider(
                  value: _brightness,
                  startIcon: Icons.brightness_low_outlined,
                  endIcon: Icons.brightness_high,
                  semanticLabel: 'Яркость',
                  onChanged: (value) => setState(() => _brightness = value),
                ),
                const Spacer(),
                TextButton(
                  onPressed: widget.onSettings,
                  style: TextButton.styleFrom(foregroundColor: Colors.white),
                  child: const Text(
                    'Перейти в настройки',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                ),
                SizedBox(
                  height: 28,
                  width: double.infinity,
                  child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onTap: widget.onClose,
                    child: const SizedBox.expand(),
                  ),
                ),
              ],
            ),
          ),
        ),
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
    return Semantics(
      button: true,
      toggled: active,
      label: label,
      child: Material(
        color: active ? const Color(0xFF2687EE) : launcherGlass,
        borderRadius: BorderRadius.circular(17),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(17),
          child: SizedBox(
            height: 102,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(13, 14, 13, 13),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 260),
                    transitionBuilder: (child, animation) =>
                        ScaleTransition(scale: animation, child: child),
                    child: Icon(
                      icon,
                      key: ValueKey<bool>(active),
                      size: 24,
                      color: active ? Colors.white : Colors.white54,
                    ),
                  ),
                  const SizedBox(height: 7),
                  Text(
                    label,
                    style: TextStyle(
                      fontSize: 17,
                      height: 21 / 17,
                      fontWeight: FontWeight.w600,
                      color: active ? Colors.white : Colors.white54,
                    ),
                  ),
                  Text(
                    detail,
                    style: TextStyle(
                      fontSize: 14,
                      height: 18 / 14,
                      color: active ? Colors.white : Colors.white54,
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
                duration: const Duration(milliseconds: 280),
                width: 68,
                height: 68,
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
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 280),
                  transitionBuilder: (child, animation) =>
                      ScaleTransition(scale: animation, child: child),
                  child: Icon(
                    icon,
                    key: ValueKey<bool>(active),
                    size: 24,
                    color: active ? accent : Colors.white54,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                label,
                maxLines: 1,
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
    final fraction = value / 100;
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
              FractionallySizedBox(
                alignment: Alignment.centerLeft,
                widthFactor: (fraction + 0.018).clamp(0, 1),
                child: const ColoredBox(color: Colors.white),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 19),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Icon(
                      startIcon,
                      size: 20,
                      color:
                          value >= 9 ? const Color(0xFF20282A) : Colors.white,
                    ),
                    Icon(
                      endIcon,
                      size: 20,
                      color:
                          value >= 91 ? const Color(0xFF20282A) : Colors.white,
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
