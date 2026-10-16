import 'package:flutter/material.dart';

const Color launcherWhite = Color(0xFFF8FBFB);
const Color launcherGlass = Color(0x33DBEBEC);
const Color launcherGlassStrong = Color(0x47DDECEE);

class LauncherStatusBar extends StatelessWidget {
  const LauncherStatusBar({Key? key, this.dark = false}) : super(key: key);

  final bool dark;

  @override
  Widget build(BuildContext context) {
    final Color color = dark ? const Color(0xFF23282F) : Colors.white;
    return AnimatedDefaultTextStyle(
      duration: const Duration(milliseconds: 150),
      style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w500),
      child: SizedBox(
        height: 40,
        child: Padding(
          padding: const EdgeInsets.only(left: 48, right: 18),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              const Text('13:52'),
              Row(
                children: <Widget>[
                  Icon(Icons.signal_cellular_4_bar, size: 14, color: color),
                  const SizedBox(width: 4),
                  Icon(Icons.wifi, size: 14, color: color),
                  const SizedBox(width: 4),
                  Icon(Icons.battery_charging_full, size: 14, color: color),
                  const SizedBox(width: 4),
                  const Text('98%'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class LauncherNavigationArea extends StatelessWidget {
  const LauncherNavigationArea({Key? key, required this.onHome})
      : super(key: key);

  final VoidCallback onHome;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: 'Домой',
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onHome,
        child: SizedBox(
          height: 52,
          child: Center(
            child: Container(
              width: 104,
              height: 4,
              decoration: BoxDecoration(
                color: const Color(0xD1FFFFFF),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class LauncherClock extends StatelessWidget {
  const LauncherClock({Key? key, this.compact = false}) : super(key: key);

  final bool compact;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Text(
          '13:52',
          style: TextStyle(
            fontFamily: 'Kaspersky Sans Clock',
            fontSize: compact ? 56 : 72,
            height: 1,
            fontWeight: FontWeight.w400,
            letterSpacing: -2,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 5),
        const Text(
          'Понедельник, 24 июня',
          style: TextStyle(fontSize: 14, color: Color(0xB8FFFFFF)),
        ),
      ],
    );
  }
}

class LockView extends StatelessWidget {
  const LockView({Key? key, required this.dragOffset}) : super(key: key);

  final double dragOffset;

  @override
  Widget build(BuildContext context) {
    final double opacity = (1 + dragOffset / 250).clamp(0.0, 1.0);
    return Transform.translate(
      offset: Offset(0, dragOffset * 0.28),
      child: Opacity(
        opacity: opacity,
        child: Padding(
          padding: const EdgeInsets.only(top: 70, bottom: 12),
          child: Column(
            children: <Widget>[
              const Icon(Icons.lock_outline, size: 20, color: Colors.white),
              const SizedBox(height: 23),
              const LauncherClock(),
              const Spacer(),
              CustomPaint(
                size: const Size(72, 11),
                painter: _UnlockHandlePainter(),
              ),
              const SizedBox(height: 21),
              const Text(
                'Проведите вверх',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: Color(0x30FFFFFF),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _UnlockHandlePainter extends CustomPainter {
  const _UnlockHandlePainter();

  @override
  void paint(Canvas canvas, Size size) {
    final Paint paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2
      ..strokeCap = StrokeCap.round
      ..shader = const LinearGradient(
        colors: <Color>[
          Color(0x6BFFFFFF),
          Color(0xDBFFFFFF),
          Color(0x6BFFFFFF),
        ],
      ).createShader(Offset.zero & size);
    final Path path = Path()
      ..moveTo(0.75, 10)
      ..cubicTo(11.5, 0.9, 60.5, 0.9, 71.25, 10);
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class PinPadView extends StatelessWidget {
  const PinPadView({
    Key? key,
    required this.entered,
    required this.onDigit,
    required this.onCancel,
  }) : super(key: key);

  final int entered;
  final ValueChanged<int> onDigit;
  final VoidCallback onCancel;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(22, 54, 22, 10),
      child: Column(
        children: <Widget>[
          const Icon(Icons.lock_outline, size: 22),
          const SizedBox(height: 28),
          const Text(
            'Введите код-пароль',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w500,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 22),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List<Widget>.generate(4, (int index) {
              final bool filled = index < entered;
              return AnimatedScale(
                scale: filled ? 1.08 : 1,
                duration: const Duration(milliseconds: 220),
                curve: Curves.easeOutBack,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  width: 12,
                  height: 12,
                  margin: const EdgeInsets.symmetric(horizontal: 6.5),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: filled ? Colors.white : const Color(0x52FFFFFF),
                  ),
                ),
              );
            }),
          ),
          const SizedBox(height: 10),
          TextButton(
            onPressed: () {},
            style: TextButton.styleFrom(
              foregroundColor: Colors.white,
              minimumSize: const Size(96, 42),
            ),
            child: const Text(
              'Не помню',
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          const SizedBox(height: 6),
          SizedBox(
            width: 264,
            child: Column(
              children: <Widget>[
                for (final List<int> row in const <List<int>>[
                  <int>[1, 2, 3],
                  <int>[4, 5, 6],
                  <int>[7, 8, 9],
                ]) ...<Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: row
                        .map(
                          (int digit) => _PinKey(
                            digit: digit,
                            onPressed: () => onDigit(digit),
                          ),
                        )
                        .toList(growable: false),
                  ),
                  const SizedBox(height: 14),
                ],
                _PinKey(digit: 0, onPressed: () => onDigit(0)),
              ],
            ),
          ),
          const Spacer(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              TextButton(
                onPressed: () {},
                child: const Text('SOS', style: _actionStyle),
              ),
              TextButton(
                onPressed: onCancel,
                child: const Text('Отменить', style: _actionStyle),
              ),
            ],
          ),
        ],
      ),
    );
  }

  static const TextStyle _actionStyle = TextStyle(
    color: Colors.white,
    fontWeight: FontWeight.w500,
  );
}

class _PinKey extends StatelessWidget {
  const _PinKey({required this.digit, required this.onPressed});

  final int digit;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 72,
      height: 72,
      child: Material(
        color: launcherGlass,
        borderRadius: BorderRadius.circular(22),
        child: InkWell(
          borderRadius: BorderRadius.circular(22),
          onTap: onPressed,
          child: Center(
            child: Text(
              '$digit',
              style: const TextStyle(
                fontFamily: 'Kaspersky Sans Clock',
                fontSize: 32,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
