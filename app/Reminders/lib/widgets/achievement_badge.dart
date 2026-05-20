import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';

class AchievementBadge extends StatefulWidget {
  const AchievementBadge({
    super.key,
    required this.completedCount,
    required this.planGoal,
  });

  final int completedCount;
  final int planGoal;

  @override
  State<AchievementBadge> createState() => _AchievementBadgeState();
}

class _AchievementBadgeState extends State<AchievementBadge>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3600),
    )..forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return SizedBox(
          width: 118,
          height: 92,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              for (final piece in _celebrationConfetti)
                _AnimatedConfettiPiece(
                  piece: piece,
                  elapsedMs: _controller.value * 3600,
                ),
              Positioned(
                left: 0,
                top: 10,
                child: Container(
                  width: 64,
                  height: 64,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: RemindersTokens.contentBackground,
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: _CelebrationEmoji(elapsedMs: _controller.value * 3600),
                ),
              ),
              Positioned(
                left: 54,
                top: 48,
                child: Container(
                  height: 28,
                  constraints: const BoxConstraints(minWidth: 55),
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: RemindersTokens.orange,
                    borderRadius: BorderRadius.circular(9),
                  ),
                  child: Text(
                    '${widget.completedCount} из ${widget.planGoal}',
                    style: RemindersTypography.semiBold14(
                      RemindersTokens.contentConstant,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _CelebrationEmoji extends StatelessWidget {
  const _CelebrationEmoji({required this.elapsedMs});

  final double elapsedMs;

  @override
  Widget build(BuildContext context) {
    final progress = (elapsedMs / 1500).clamp(0.0, 1.0);
    final frame = _popperFrame(progress);

    return Transform.translate(
      offset: frame.offset,
      child: Transform.rotate(
        angle: frame.rotation,
        child: Transform.scale(
          scale: frame.scale,
          child: const Text('🎉', style: TextStyle(fontSize: 40, height: 1)),
        ),
      ),
    );
  }
}

class _AnimatedConfettiPiece extends StatelessWidget {
  const _AnimatedConfettiPiece({required this.piece, required this.elapsedMs});

  final _ConfettiPiece piece;
  final double elapsedMs;

  @override
  Widget build(BuildContext context) {
    const origin = Offset(32, 42);
    final startMs = 210 + piece.delayMs;
    final localT = ((elapsedMs - startMs) / (3600 - startMs)).clamp(0.0, 1.0);
    final width = piece.shape == _ConfettiShape.strip ? 4.0 : 7.0;
    final height = switch (piece.shape) {
      _ConfettiShape.strip => 12.0,
      _ConfettiShape.dot => 6.0,
      _ConfettiShape.square => 7.0,
    };
    final transform = _confettiTransform(piece, localT);

    return Positioned(
      left: origin.dx,
      top: origin.dy,
      child: Opacity(
        opacity: transform.opacity,
        child: Transform.translate(
          offset: transform.offset - Offset(width / 2, height / 2),
          child: Transform.rotate(
            angle: transform.rotation,
            child: Transform.scale(
              scale: transform.scale,
              child: Container(
                width: width,
                height: height,
                decoration: BoxDecoration(
                  color: piece.color,
                  borderRadius: BorderRadius.circular(
                    piece.shape == _ConfettiShape.dot ? 999 : 2,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _PopperFrame {
  const _PopperFrame({
    required this.offset,
    required this.rotation,
    required this.scale,
  });

  final Offset offset;
  final double rotation;
  final double scale;
}

class _ConfettiTransform {
  const _ConfettiTransform({
    required this.offset,
    required this.rotation,
    required this.scale,
    required this.opacity,
  });

  final Offset offset;
  final double rotation;
  final double scale;
  final double opacity;
}

class _ConfettiPiece {
  const _ConfettiPiece({
    required this.x,
    required this.y,
    required this.endX,
    required this.endY,
    required this.rotateDegrees,
    required this.delayMs,
    required this.color,
    required this.shape,
  });

  final double x;
  final double y;
  final double endX;
  final double endY;
  final double rotateDegrees;
  final double delayMs;
  final Color color;
  final _ConfettiShape shape;
}

enum _ConfettiShape { dot, square, strip }

_PopperFrame _popperFrame(double t) {
  return switch (t) {
    < 0.15 => _interpolatePopper(
      t / 0.15,
      Offset.zero,
      const Offset(-5, 7),
      0,
      -12,
      1,
      0.9,
    ),
    < 0.22 => _interpolatePopper(
      (t - 0.15) / 0.07,
      const Offset(-5, 7),
      const Offset(-7, 9),
      -12,
      -15,
      0.9,
      0.88,
    ),
    < 0.31 => _interpolatePopper(
      (t - 0.22) / 0.09,
      const Offset(-7, 9),
      const Offset(9, -9),
      -15,
      12,
      0.88,
      1.14,
    ),
    < 0.46 => _interpolatePopper(
      (t - 0.31) / 0.15,
      const Offset(9, -9),
      const Offset(-2, 2),
      12,
      -4,
      1.14,
      1.02,
    ),
    < 0.64 => _interpolatePopper(
      (t - 0.46) / 0.18,
      const Offset(-2, 2),
      Offset.zero,
      -4,
      0,
      1.02,
      1,
    ),
    _ => const _PopperFrame(offset: Offset.zero, rotation: 0, scale: 1),
  };
}

_PopperFrame _interpolatePopper(
  double t,
  Offset start,
  Offset end,
  double startDegrees,
  double endDegrees,
  double startScale,
  double endScale,
) {
  final eased = Curves.easeOut.transform(t.clamp(0, 1));

  return _PopperFrame(
    offset: Offset.lerp(start, end, eased)!,
    rotation: _degreesToRadians(lerpDouble(startDegrees, endDegrees, eased)!),
    scale: lerpDouble(startScale, endScale, eased)!,
  );
}

_ConfettiTransform _confettiTransform(_ConfettiPiece piece, double t) {
  final burst = Offset(piece.x, piece.y);
  final fall = Offset(piece.x + 10, piece.y + 210);
  final end = Offset(piece.endX, piece.endY);
  late final Offset offset;
  late final double opacity;
  late final double scale;

  if (t <= 0.08) {
    offset = Offset.zero;
    opacity = 0;
    scale = 0.2;
  } else if (t <= 0.13) {
    final p = (t - 0.08) / 0.05;
    offset = Offset.zero;
    opacity = p;
    scale = lerpDouble(0.2, 0.95, p)!;
  } else if (t <= 0.24) {
    final p = Curves.easeOut.transform((t - 0.13) / 0.11);
    offset = Offset.lerp(Offset.zero, burst, p)!;
    opacity = 1;
    scale = lerpDouble(0.95, 1, p)!;
  } else if (t <= 0.52) {
    final p = Curves.easeInOut.transform((t - 0.24) / 0.28);
    offset = Offset.lerp(burst, fall, p)!;
    opacity = 1;
    scale = lerpDouble(1, 0.94, p)!;
  } else {
    final p = Curves.easeIn.transform((t - 0.52) / 0.48);
    offset = Offset.lerp(fall, end, p)!;
    opacity = lerpDouble(0.95, 0, p)!;
    scale = lerpDouble(0.94, 0.76, p)!;
  }

  return _ConfettiTransform(
    offset: offset,
    opacity: opacity.clamp(0, 1),
    scale: scale,
    rotation: _degreesToRadians(piece.rotateDegrees * t),
  );
}

double _degreesToRadians(double degrees) {
  return degrees * math.pi / 180;
}

const _celebrationConfetti = [
  _ConfettiPiece(
    x: -118,
    y: -130,
    endX: -126,
    endY: 250,
    rotateDegrees: -330,
    delayMs: 8,
    color: Color(0xffff4d6d),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: -92,
    y: -206,
    endX: -108,
    endY: 300,
    rotateDegrees: 240,
    delayMs: 28,
    color: Color(0xffffd166),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: -52,
    y: -250,
    endX: -82,
    endY: 342,
    rotateDegrees: -190,
    delayMs: 0,
    color: Color(0xff34c759),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: -10,
    y: -294,
    endX: -40,
    endY: 376,
    rotateDegrees: 310,
    delayMs: 18,
    color: Color(0xff45a3ff),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 42,
    y: -278,
    endX: 18,
    endY: 410,
    rotateDegrees: -260,
    delayMs: 38,
    color: Color(0xffff8a00),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 92,
    y: -230,
    endX: 72,
    endY: 394,
    rotateDegrees: 290,
    delayMs: 12,
    color: Color(0xff9b5cff),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 136,
    y: -176,
    endX: 136,
    endY: 370,
    rotateDegrees: -230,
    delayMs: 48,
    color: Color(0xff00c2a8),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 184,
    y: -112,
    endX: 202,
    endY: 330,
    rotateDegrees: 350,
    delayMs: 64,
    color: Color(0xffff8ab3),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: -128,
    y: -60,
    endX: -138,
    endY: 404,
    rotateDegrees: -275,
    delayMs: 72,
    color: Color(0xfff9d423),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: -84,
    y: -120,
    endX: -116,
    endY: 438,
    rotateDegrees: 210,
    delayMs: 54,
    color: Color(0xff1dd1a1),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: -24,
    y: -164,
    endX: -60,
    endY: 454,
    rotateDegrees: -180,
    delayMs: 68,
    color: Color(0xff54a0ff),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 36,
    y: -152,
    endX: 26,
    endY: 462,
    rotateDegrees: 340,
    delayMs: 82,
    color: Color(0xffff6b6b),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 94,
    y: -128,
    endX: 102,
    endY: 448,
    rotateDegrees: -390,
    delayMs: 92,
    color: Color(0xff5f27cd),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 156,
    y: -72,
    endX: 180,
    endY: 422,
    rotateDegrees: 265,
    delayMs: 112,
    color: Color(0xff48dbfb),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 214,
    y: -26,
    endX: 248,
    endY: 382,
    rotateDegrees: -300,
    delayMs: 98,
    color: Color(0xffff9f43),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: -106,
    y: -268,
    endX: -130,
    endY: 210,
    rotateDegrees: 420,
    delayMs: 104,
    color: Color(0xffee5253),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: -62,
    y: -314,
    endX: -86,
    endY: 246,
    rotateDegrees: -250,
    delayMs: 116,
    color: Color(0xff2ed573),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 8,
    y: -338,
    endX: -18,
    endY: 286,
    rotateDegrees: 300,
    delayMs: 126,
    color: Color(0xffffdd59),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 76,
    y: -304,
    endX: 52,
    endY: 322,
    rotateDegrees: -210,
    delayMs: 146,
    color: Color(0xff70a1ff),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 140,
    y: -246,
    endX: 132,
    endY: 360,
    rotateDegrees: 230,
    delayMs: 136,
    color: Color(0xffff4757),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 198,
    y: -164,
    endX: 210,
    endY: 402,
    rotateDegrees: -320,
    delayMs: 152,
    color: Color(0xff7bed9f),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 238,
    y: -84,
    endX: 270,
    endY: 436,
    rotateDegrees: 290,
    delayMs: 164,
    color: Color(0xffffa502),
    shape: _ConfettiShape.strip,
  ),
];
