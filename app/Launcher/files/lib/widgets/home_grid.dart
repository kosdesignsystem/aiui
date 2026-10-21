import '../models/launcher_motion.dart';
import 'dart:ui';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../models/launcher_model.dart';
import 'launcher_action.dart';

typedef LauncherItemTap = void Function(LauncherItem item, Offset globalCenter);

class HomeGrid extends StatefulWidget {
  const HomeGrid({Key? key, required this.onLaunch, this.background = false})
      : super(key: key);

  final LauncherItemTap onLaunch;
  final bool background;

  @override
  State<HomeGrid> createState() => _HomeGridState();
}

class _HomeGridState extends State<HomeGrid> {
  late final PageController _controller;
  int _page = 0;
  Offset? start;
  Duration startedAt = Duration.zero;
  String? axis;
  double startPixels = 0;
  double edge = 0;
  void down(PointerDownEvent event) {
    if (event.buttons != 1) return;
    start = event.localPosition;
    startedAt = event.timeStamp;
    axis = null;
    startPixels = _controller.offset;
  }

  void move(PointerMoveEvent event) {
    if (start == null) return;
    final delta = event.localPosition - start!;
    if (axis == null && math.max(delta.dx.abs(), delta.dy.abs()) > 7) {
      axis = delta.dx.abs() > delta.dy.abs() ? 'horizontal' : 'vertical';
    }
    if (axis != 'horizontal') return;
    final width = _controller.position.viewportDimension;
    final target = startPixels - delta.dx.clamp(-width * .72, width * .72);
    final max = width * (homePages.length - 1);
    _controller.jumpTo(target.clamp(0.0, max));
    setState(() => edge = target < 0 || target > max
        ? delta.dx.sign * math.pow(delta.dx.abs(), .86) * .24 * 2.05
        : 0);
  }

  void finish(PointerEvent event, {bool cancelled = false}) {
    if (start == null) return;
    final delta = event.localPosition - start!;
    final width = _controller.position.viewportDimension;
    final elapsed = math.max(1, (event.timeStamp - startedAt).inMilliseconds);
    final base = (startPixels / width).round();
    int next = base;
    if (!cancelled &&
        axis == 'horizontal' &&
        (delta.dx.abs() > width * .18 ||
            (delta.dx.abs() > 24 && delta.dx.abs() / elapsed > .38))) {
      next = (base + (delta.dx < 0 ? 1 : -1)).clamp(0, homePages.length - 1);
    }
    start = null;
    axis = null;
    setState(() => edge = 0);
    _controller.animateToPage(next,
        duration: const Duration(milliseconds: 300),
        curve: const Cubic(.22, 1, .36, 1));
  }

  @override
  void initState() {
    super.initState();
    _controller = PageController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Widget content = Column(
      children: <Widget>[
        Expanded(
          child: Listener(
              behavior: HitTestBehavior.opaque,
              onPointerDown: down,
              onPointerMove: move,
              onPointerUp: finish,
              onPointerCancel: (e) => finish(e, cancelled: true),
              child: Transform.translate(
                  offset: Offset(edge, 0),
                  child: PageView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    controller: _controller,
                    itemCount: homePages.length,
                    onPageChanged: (int value) => setState(() => _page = value),
                    itemBuilder: (BuildContext context, int pageIndex) {
                      return Align(
                        alignment: Alignment.bottomCenter,
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxHeight: 584),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: GridView.builder(
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 4,
                                mainAxisExtent: 79,
                                mainAxisSpacing: 22,
                              ),
                              itemCount: homePages[pageIndex].length,
                              itemBuilder: (BuildContext context, int index) =>
                                  _AppTile(
                                item: homePages[pageIndex][index],
                                onLaunch: widget.onLaunch,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ))),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 16,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List<Widget>.generate(homePages.length, (int index) {
              final bool active = _page == index;
              return LauncherAction(
                selected: active,
                label: 'Перейти на страницу ${index + 1}',
                onPressed: () => _controller.animateToPage(
                  index,
                  duration: launcherDuration(300),
                  curve: Curves.easeOutCubic,
                ),
                child: SizedBox(
                  width: 18,
                  height: 16,
                  child: Center(
                    child: AnimatedScale(
                      scale: active ? 1.18 : 1,
                      duration: launcherDuration(150),
                      curve: Curves.easeOutCubic,
                      child: Container(
                        width: 6,
                        height: 6,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color:
                              active ? Colors.white : const Color(0x5CFFFFFF),
                        ),
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
        ),
        const SizedBox(height: 18),
      ],
    );

    if (widget.background) {
      content = Opacity(
        opacity: 0.72,
        child: ImageFiltered(
          imageFilter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
          child: Transform.scale(scale: 1.025, child: content),
        ),
      );
    }
    return content;
  }
}

class _AppTile extends StatelessWidget {
  _AppTile({required this.item, required this.onLaunch});
  final LauncherItem item;
  final LauncherItemTap onLaunch;
  final GlobalKey iconKey = GlobalKey();
  void _open() {
    final box = iconKey.currentContext?.findRenderObject() as RenderBox?;
    if (box != null && item.launchable) {
      onLaunch(item, box.localToGlobal(box.size.center(Offset.zero)));
    }
  }

  @override
  Widget build(BuildContext context) => LauncherAction(
        label: item.label,
        onPressed: item.launchable ? _open : null,
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          Image.asset(item.icon,
              key: iconKey,
              width: 58,
              height: 58,
              filterQuality: FilterQuality.high),
          const SizedBox(height: 7),
          SizedBox(
              width: 76,
              child: Text(item.label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      height: 14 / 12,
                      shadows: [
                        Shadow(
                            color: Color(0xFF000011),
                            offset: Offset(0, 1),
                            blurRadius: 4)
                      ]))),
        ]),
      );
}
