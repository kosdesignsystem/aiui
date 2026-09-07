import 'package:flutter/material.dart';

import '../theme/tokens.dart';

class Tuner extends StatelessWidget {
  const Tuner({
    super.key,
    required this.stationIndex,
    required this.stationCount,
    required this.onChanged,
  });

  final int stationIndex;
  final int stationCount;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final maxIndex = stationCount > 1 ? stationCount - 1 : 1;
    final position = stationIndex / maxIndex;
    return Semantics(
      label: 'Настроить частоту',
      slider: true,
      child: SizedBox(
        height: 128,
        child: Stack(
          children: [
            Positioned(
              top: 16,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: List.generate(41, (index) {
                  final major = index % 5 == 0;
                  return Container(
                    width: 1,
                    height: major ? 40 : 24,
                    color: major ? AppColors.majorTick : AppColors.tick,
                  );
                }),
              ),
            ),
            Positioned(
              top: 0,
              left: position * (MediaQuery.sizeOf(context).width - 36) - 1.5,
              child: Container(
                width: 3,
                height: 92,
                decoration: BoxDecoration(
                  color: AppColors.accent,
                  borderRadius: BorderRadius.circular(3),
                  boxShadow: const [
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
                  thumbShape: RoundSliderThumbShape(enabledThumbRadius: 0),
                  overlayShape: RoundSliderOverlayShape(overlayRadius: 0),
                ),
                child: Slider(
                  value: stationIndex.toDouble().clamp(0, maxIndex.toDouble()),
                  max: maxIndex.toDouble(),
                  divisions: maxIndex,
                  onChanged: (value) => onChanged(value.round()),
                ),
              ),
            ),
            const Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('88', style: TextStyle(color: Color(0xFF555555), fontSize: 12)),
                  Text('92', style: TextStyle(color: Color(0xFF555555), fontSize: 12)),
                  Text('96', style: TextStyle(color: Color(0xFF555555), fontSize: 12)),
                  Text('100', style: TextStyle(color: Color(0xFF555555), fontSize: 12)),
                  Text('104', style: TextStyle(color: Color(0xFF555555), fontSize: 12)),
                  Text('108', style: TextStyle(color: Color(0xFF555555), fontSize: 12)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
