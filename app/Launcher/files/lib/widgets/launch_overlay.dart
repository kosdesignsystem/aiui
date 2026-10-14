import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../models/launcher_app.dart';

class LaunchOverlay extends StatefulWidget {
  const LaunchOverlay({
    Key? key,
    required this.item,
    required this.origin,
    required this.onComplete,
  }) : super(key: key);

  final LauncherItem item;
  final Offset origin;
  final VoidCallback onComplete;

  @override
  State<LaunchOverlay> createState() => _LaunchOverlayState();
}

class _LaunchOverlayState extends State<LaunchOverlay>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1020),
    )
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) widget.onComplete();
      })
      ..forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned.fill(
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) {
          final size = MediaQuery.of(context).size;
          final center = size.center(Offset.zero);
          final reveal = Curves.easeInOut.transform(
            (_controller.value / 0.31).clamp(0.0, 1.0),
          );
          final travel = Curves.easeInOut.transform(
            (_controller.value / 0.30).clamp(0.0, 1.0),
          );
          final loaderOpacity = ((_controller.value - 0.30) / 0.18).clamp(
            0.0,
            1.0,
          );
          final iconOpacity = (1 - ((_controller.value - 0.30) / 0.13)).clamp(
            0.0,
            1.0,
          );
          final maxRadius = math.sqrt(
            size.width * size.width + size.height * size.height,
          );
          final position = Offset.lerp(widget.origin, center, travel)!;

          return IgnorePointer(
            child: Stack(
              children: <Widget>[
                ClipPath(
                  clipper: _CircleRevealClipper(
                    center: widget.origin,
                    radius: 31 + (maxRadius - 31) * reveal,
                  ),
                  child: const ColoredBox(color: Color(0xFF091215)),
                ),
                Opacity(
                  opacity: loaderOpacity,
                  child: ColoredBox(
                    color: const Color(0xFF091215),
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Image.asset(widget.item.icon, width: 78, height: 78),
                          const SizedBox(height: 20),
                          Text(
                            widget.item.label,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 24),
                          const SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white70,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Positioned(
                  left: position.dx - 29,
                  top: position.dy - 29,
                  child: Opacity(
                    opacity: iconOpacity,
                    child: Transform.scale(
                      scale: 1 + 0.35 * travel,
                      child: Image.asset(
                        widget.item.icon,
                        width: 58,
                        height: 58,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _CircleRevealClipper extends CustomClipper<Path> {
  const _CircleRevealClipper({required this.center, required this.radius});

  final Offset center;
  final double radius;

  @override
  Path getClip(Size size) =>
      Path()..addOval(Rect.fromCircle(center: center, radius: radius));

  @override
  bool shouldReclip(covariant _CircleRevealClipper oldClipper) =>
      oldClipper.radius != radius || oldClipper.center != center;
}
