import '../models/launcher_motion.dart';
import 'package:flutter/material.dart';
import 'original_icon.dart';
import 'launcher_action.dart';

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
      duration: launcherDuration(150),
      style: TextStyle(
          fontFamily: 'Kaspersky Sans Text',
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w500),
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
                  OriginalIcon('signal-cellular-100', size: 14, color: color),
                  const SizedBox(width: 4),
                  OriginalIcon('wifi', size: 14, color: color),
                  const SizedBox(width: 4),
                  OriginalIcon('battery-charge-medium', size: 14, color: color),
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
    return Center(
      child: SizedBox(
        width: 52,
        height: 52,
        child: LauncherAction(
            label: 'Домой',
            onPressed: onHome,
            child: const Center(child: OriginalIcon('mobile-home', size: 24))),
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
          maxLines: 1,
          softWrap: false,
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
          maxLines: 1,
          softWrap: false,
          style: TextStyle(
              fontSize: 14, height: 17 / 14, color: Color(0xB8FFFFFF)),
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
        child: const Padding(
          padding: EdgeInsets.only(top: 70, bottom: 12),
          child: Column(
            children: <Widget>[
              OriginalIcon('lock', size: 20),
              SizedBox(height: 23),
              LauncherClock(),
              Spacer(),
              OriginalIcon('unlock', size: 72, height: 11),
              SizedBox(height: 21),
              Text(
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
          const OriginalIcon('lock', size: 22),
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
            key: ValueKey<String>('pin-dots-$entered'),
            mainAxisAlignment: MainAxisAlignment.center,
            children: List<Widget>.generate(4, (int index) {
              final bool filled = index < entered;
              return AnimatedScale(
                scale: filled ? 1.08 : 1,
                duration: launcherDuration(220),
                curve: Curves.easeOutBack,
                child: AnimatedContainer(
                  duration: launcherDuration(150),
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
