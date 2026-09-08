import 'package:flutter/material.dart';

class Tuner extends StatelessWidget {
  const Tuner({
    Key? key,
    required this.index,
    required this.count,
    required this.height,
    required this.onChanged,
  }) : super(key: key);

  final int index;
  final int count;
  final double height;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final max = count > 1 ? count - 1 : 1;
    return Semantics(
      label: 'Настроить частоту',
      slider: true,
      increasedValue: index < max ? '${index + 1}' : null,
      decreasedValue: index > 0 ? '${index - 1}' : null,
      onIncrease: index < max ? () => onChanged(index + 1) : null,
      onDecrease: index > 0 ? () => onChanged(index - 1) : null,
      child: LayoutBuilder(
        builder: (context, constraints) {
          final position = index / max;
          final duration = MediaQuery.of(context).disableAnimations
              ? Duration.zero
              : const Duration(milliseconds: 220);
          return SizedBox(
            height: height,
            child: Stack(
              children: <Widget>[
                const Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 92,
                  child: CustomPaint(painter: _ScalePainter()),
                ),
                AnimatedPositioned(
                  duration: duration,
                  curve: Curves.easeOut,
                  top: 0,
                  left: (constraints.maxWidth - 3) * position,
                  child: Container(
                    width: 3,
                    height: 92,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFF4141),
                      borderRadius: BorderRadius.circular(3),
                      boxShadow: const <BoxShadow>[
                        BoxShadow(color: Color(0x8CFF4141), blurRadius: 18),
                      ],
                    ),
                  ),
                ),
                Positioned.fill(
                  bottom: 28,
                  child: SliderTheme(
                    data: const SliderThemeData(
                      trackHeight: 0,
                      activeTrackColor: Colors.transparent,
                      inactiveTrackColor: Colors.transparent,
                      thumbColor: Colors.transparent,
                      overlayColor: Colors.transparent,
                      thumbShape: RoundSliderThumbShape(enabledThumbRadius: 0),
                      overlayShape: RoundSliderOverlayShape(overlayRadius: 0),
                    ),
                    child: Slider(
                      value: index.toDouble().clamp(0, max.toDouble()),
                      min: 0,
                      max: max.toDouble(),
                      divisions: max,
                      onChanged: (value) => onChanged(value.round()),
                    ),
                  ),
                ),
                const Positioned(
                  left: 0,
                  right: 0,
                  bottom: 0,
                  child: _Labels(),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _ScalePainter extends CustomPainter {
  const _ScalePainter();

  @override
  void paint(Canvas canvas, Size size) {
    final minor = Paint()..color = const Color(0xFF393939);
    final major = Paint()..color = const Color(0xFF6C6C6C);
    for (var tick = 0; tick < 41; tick++) {
      final isMajor = tick % 5 == 0;
      final x = size.width * tick / 40;
      canvas.drawRect(
        Rect.fromLTWH(x - .5, 16, 1, isMajor ? 40 : 24),
        isMajor ? major : minor,
      );
    }
  }

  @override
  bool shouldRepaint(_ScalePainter oldDelegate) => false;
}

class _Labels extends StatelessWidget {
  const _Labels();

  @override
  Widget build(BuildContext context) {
    return const DefaultTextStyle(
      style: TextStyle(
        color: Color(0xFF555555),
        fontFamily: 'Kaspersky Sans Text Clock',
        fontSize: 12,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text('88'),
          Text('92'),
          Text('96'),
          Text('100'),
          Text('104'),
          Text('108'),
        ],
      ),
    );
  }
}
