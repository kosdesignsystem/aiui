import '../models/launcher_motion.dart';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../models/launcher_model.dart';

class HomeLaunchOverlay extends StatefulWidget {
  const HomeLaunchOverlay({
    Key? key,
    required this.item,
    required this.origin,
    required this.onComplete,
  }) : super(key: key);

  final LauncherItem item;
  final Offset origin;
  final VoidCallback onComplete;

  @override
  State<HomeLaunchOverlay> createState() => _HomeLaunchOverlayState();
}

class _HomeLaunchOverlayState extends State<HomeLaunchOverlay>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: launcherDuration(720),
    )
      ..addStatusListener((AnimationStatus status) {
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
      child: IgnorePointer(
        child: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            final Size size = constraints.biggest;
            final Offset center = size.center(Offset.zero);
            final double radius = math.sqrt(
                  math.pow(
                        math.max(
                          widget.origin.dx,
                          size.width - widget.origin.dx,
                        ),
                        2,
                      ) +
                      math.pow(
                        math.max(
                          widget.origin.dy,
                          size.height - widget.origin.dy,
                        ),
                        2,
                      ),
                ) *
                1.06;
            return AnimatedBuilder(
              animation: _controller,
              builder: (BuildContext context, Widget? child) {
                final double reveal = Curves.easeInOutCubic.transform(
                  (_controller.value / 0.39).clamp(0.0, 1.0),
                );
                final double loaderOpacity = Curves.easeOut.transform(
                  ((_controller.value - 0.36) / 0.20).clamp(0.0, 1.0),
                );
                final Offset iconCenter = Offset.lerp(
                  widget.origin,
                  center,
                  reveal,
                )!;
                return Stack(
                  fit: StackFit.expand,
                  children: <Widget>[
                    ClipPath(
                      clipper: _CircleRevealClipper(
                        center: widget.origin,
                        radius: 31 + (radius - 31) * reveal,
                      ),
                      child: const DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: <Color>[
                              Color(0xFF070B11),
                              Color(0xFF0A1119),
                              Color(0xFF05080D),
                            ],
                            stops: <double>[0, 0.52, 1],
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      left: iconCenter.dx - 29,
                      top: iconCenter.dy - 29,
                      child: Opacity(
                        opacity: 1 - loaderOpacity,
                        child: Transform.scale(
                          scale: 1 + reveal * 0.35,
                          child: Image.asset(
                            widget.item.icon,
                            width: 58,
                            height: 58,
                          ),
                        ),
                      ),
                    ),
                    if (loaderOpacity > 0)
                      Opacity(
                        opacity: loaderOpacity,
                        child: _LoadingStage(icon: widget.item.icon),
                      ),
                  ],
                );
              },
            );
          },
        ),
      ),
    );
  }
}

class _LoadingStage extends StatefulWidget {
  const _LoadingStage({required this.icon});

  final String icon;

  @override
  State<_LoadingStage> createState() => _LoadingStageState();
}

class _LoadingStageState extends State<_LoadingStage>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulse;

  @override
  void initState() {
    super.initState();
    _pulse = AnimationController(
      vsync: this,
      duration: launcherDuration(2800),
    );
    if (!WidgetsBinding.instance.platformDispatcher.accessibilityFeatures
        .disableAnimations) {
      _pulse.repeat();
    }
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ScaleTransition(
        scale: TweenSequence<double>([
          TweenSequenceItem(
              tween: Tween(begin: 1.0, end: 1.08)
                  .chain(CurveTween(curve: Curves.easeInOut)),
              weight: 22),
          TweenSequenceItem(
              tween: Tween(begin: 1.08, end: .99)
                  .chain(CurveTween(curve: Curves.easeInOut)),
              weight: 20),
          TweenSequenceItem(
              tween: Tween(begin: .99, end: 1.045)
                  .chain(CurveTween(curve: Curves.easeInOut)),
              weight: 22),
          TweenSequenceItem(
              tween: Tween(begin: 1.045, end: 1.0)
                  .chain(CurveTween(curve: Curves.easeInOut)),
              weight: 18),
          TweenSequenceItem(tween: ConstantTween(1.0), weight: 18),
        ]).animate(_pulse),
        child: Container(
          width: 112,
          height: 112,
          alignment: Alignment.center,
          decoration: const BoxDecoration(
            boxShadow: <BoxShadow>[
              BoxShadow(
                color: Color(0x6B000000),
                blurRadius: 36,
                offset: Offset(0, 18),
              ),
            ],
          ),
          child: Image.asset(widget.icon, width: 96, height: 96),
        ),
      ),
    );
  }
}

class RecentTransitionOverlay extends StatefulWidget {
  const RecentTransitionOverlay({
    Key? key,
    required this.item,
    required this.toOverview,
    this.bounds,
    required this.onComplete,
  }) : super(key: key);

  final LauncherItem item;
  final bool toOverview;
  final Rect? bounds;
  final VoidCallback onComplete;

  @override
  State<RecentTransitionOverlay> createState() =>
      _RecentTransitionOverlayState();
}

class _RecentTransitionOverlayState extends State<RecentTransitionOverlay>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: launcherDuration(widget.toOverview ? 380 : 360),
    )
      ..addStatusListener((AnimationStatus status) {
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
      child: IgnorePointer(
        child: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            final Rect full = Offset.zero & constraints.biggest;
            final Rect overview =
                widget.bounds ?? recentPreviewRect(constraints.biggest);
            return AnimatedBuilder(
              animation: _controller,
              builder: (BuildContext context, Widget? child) {
                final double value = Curves.easeOutCubic.transform(
                  _controller.value,
                );
                final Rect begin = widget.toOverview ? full : overview;
                final Rect end = widget.toOverview ? overview : full;
                final Rect rect = Rect.lerp(begin, end, value)!;
                final double radius =
                    widget.toOverview ? 18 * value : 18 * (1 - value);
                return Stack(
                  children: <Widget>[
                    Positioned.fromRect(
                      rect: rect,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(radius),
                        child: DecoratedBox(
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            boxShadow: <BoxShadow>[
                              BoxShadow(
                                color: Color(0x61000000),
                                blurRadius: 52,
                                offset: Offset(0, 22),
                              ),
                            ],
                          ),
                          child: Image.asset(
                            widget.item.preview!,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
            );
          },
        ),
      ),
    );
  }
}

class HomeMinimizeOverlay extends StatefulWidget {
  const HomeMinimizeOverlay({
    Key? key,
    required this.item,
    required this.onComplete,
  }) : super(key: key);

  final LauncherItem item;
  final VoidCallback onComplete;

  @override
  State<HomeMinimizeOverlay> createState() => _HomeMinimizeOverlayState();
}

class _HomeMinimizeOverlayState extends State<HomeMinimizeOverlay>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: launcherDuration(280),
    )
      ..addStatusListener((AnimationStatus status) {
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
      child: IgnorePointer(
        child: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            final Rect full = Offset.zero & constraints.biggest;
            final Rect target = _homeIconRect(constraints.biggest, widget.item);
            return AnimatedBuilder(
              animation: _controller,
              builder: (BuildContext context, Widget? child) {
                final double value = Curves.easeInOutCubic.transform(
                  _controller.value,
                );
                final Rect rect = Rect.lerp(full, target, value)!;
                final double previewOpacity =
                    1 - ((_controller.value - 0.66) / 0.34).clamp(0.0, 1.0);
                final double iconOpacity =
                    ((_controller.value - 0.58) / 0.42).clamp(0.0, 1.0);
                return Stack(
                  children: <Widget>[
                    Positioned.fromRect(
                      rect: rect,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(15 * value),
                        child: Stack(
                          fit: StackFit.expand,
                          children: <Widget>[
                            Opacity(
                              opacity: previewOpacity,
                              child: Image.asset(
                                widget.item.preview!,
                                fit: BoxFit.cover,
                              ),
                            ),
                            Opacity(
                              opacity: iconOpacity,
                              child: Image.asset(
                                widget.item.icon,
                                fit: BoxFit.cover,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              },
            );
          },
        ),
      ),
    );
  }
}

Rect _homeIconRect(Size size, LauncherItem item) {
  final int index = launchableItems.indexWhere(
    (LauncherItem candidate) => candidate.id == item.id,
  );
  final int safeIndex = math.max(0, index);
  final int column = safeIndex % 4;
  final int row = safeIndex ~/ 4;
  final double cellWidth = (size.width - 32) / 4;
  final double centerX = 16 + cellWidth * (column + 0.5);
  final int rowCount = (launchableItems.length / 4).ceil();
  final double gridHeight = rowCount * 79 + math.max(0, rowCount - 1) * 22;
  final double gridBottom = size.height - 52 - 46;
  final double gridTop = gridBottom - gridHeight;
  final double centerY = gridTop + row * 101 + 29;
  return Rect.fromCenter(
    center: Offset(centerX, centerY),
    width: 58,
    height: 58,
  );
}

Rect recentPreviewRect(Size size) {
  final double previewWidth = math.min(222.11, size.width * 0.617);
  final double previewHeight = previewWidth * (493.58 / 222.11);
  final double contentHeight = size.height - 40 - 52;
  final double pageHeight = math.max(0, contentHeight - 64 - 20);
  final double groupHeight = 34 + 12 + previewHeight;
  final double top = 40 + 64 + math.max(0, (pageHeight - groupHeight) / 2) + 46;
  return Rect.fromLTWH(
    (size.width - previewWidth) / 2,
    top,
    previewWidth,
    previewHeight,
  );
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
