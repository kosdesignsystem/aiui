import 'package:flutter/material.dart';

import '../models/launcher_app.dart';

class RecentTransitionOverlay extends StatefulWidget {
  const RecentTransitionOverlay({
    Key? key,
    required this.item,
    required this.toOverview,
    required this.onComplete,
  }) : super(key: key);

  final LauncherItem item;
  final bool toOverview;
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
      duration: const Duration(milliseconds: 420),
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
      child: LayoutBuilder(
        builder: (context, constraints) {
          final full = Rect.fromLTWH(
            0,
            0,
            constraints.maxWidth,
            constraints.maxHeight,
          );
          final contentHeight = constraints.maxHeight - 92;
          final pageHeight = contentHeight - 104;
          final previewTop = 40 + 84 + (pageHeight - 540) / 2 + 46;
          final overview = Rect.fromLTWH(
            (constraints.maxWidth - 222) / 2,
            previewTop,
            222,
            494,
          );

          return AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              final progress = Curves.easeOutCubic.transform(_controller.value);
              final begin = widget.toOverview ? full : overview;
              final end = widget.toOverview ? overview : full;
              final rect = Rect.lerp(begin, end, progress)!;
              final radius =
                  widget.toOverview ? 18 * progress : 18 * (1 - progress);
              return Stack(
                children: <Widget>[
                  Positioned.fromRect(
                    rect: rect,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(radius),
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          boxShadow: const <BoxShadow>[
                            BoxShadow(
                              color: Color(0x61000000),
                              blurRadius: 52,
                              offset: Offset(0, 22),
                            ),
                          ],
                        ),
                        child: Image.asset(widget.item.preview!,
                            fit: BoxFit.cover),
                      ),
                    ),
                  ),
                ],
              );
            },
          );
        },
      ),
    );
  }
}
