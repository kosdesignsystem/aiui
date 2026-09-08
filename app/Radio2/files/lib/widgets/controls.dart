import 'package:flutter/material.dart';

class Controls extends StatelessWidget {
  const Controls({
    Key? key,
    required this.playing,
    required this.loading,
    required this.height,
    required this.onPrevious,
    required this.onToggle,
    required this.onNext,
  }) : super(key: key);

  final bool playing;
  final bool loading;
  final double height;
  final VoidCallback onPrevious;
  final VoidCallback onToggle;
  final VoidCallback onNext;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: Row(
        children: <Widget>[
          _SideButton(
            label: 'Предыдущая волна',
            icon: Icons.arrow_back,
            onPressed: onPrevious,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: _Button(
              label: playing ? 'Пауза' : 'Воспроизвести',
              color: Colors.white,
              onPressed: onToggle,
              child: Text(
                loading
                    ? 'Loading'
                    : playing
                        ? 'Pause'
                        : 'Play',
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          _SideButton(
            label: 'Следующая волна',
            icon: Icons.arrow_forward,
            onPressed: onNext,
          ),
        ],
      ),
    );
  }
}

class _SideButton extends StatelessWidget {
  const _SideButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 70,
      child: _Button(
        label: label,
        color: const Color(0xFF181818),
        onPressed: onPressed,
        child: Icon(icon, color: Colors.white, size: 24),
      ),
    );
  }
}

class _Button extends StatelessWidget {
  const _Button({
    required this.label,
    required this.color,
    required this.onPressed,
    required this.child,
  });

  final String label;
  final Color color;
  final VoidCallback onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: label,
      child: Material(
        color: color,
        borderRadius: BorderRadius.circular(22),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onPressed,
          child: Center(child: child),
        ),
      ),
    );
  }
}
