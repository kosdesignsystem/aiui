import 'dart:ui';

import 'package:flutter/material.dart';

import '../models/launcher_model.dart';

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
          child: PageView.builder(
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
                        mainAxisExtent: 87,
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
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 16,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List<Widget>.generate(homePages.length, (int index) {
              final bool active = _page == index;
              return Semantics(
                button: true,
                selected: active,
                label: 'Перейти на страницу ${index + 1}',
                child: GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () => _controller.animateToPage(
                    index,
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeOutCubic,
                  ),
                  child: SizedBox(
                    width: 18,
                    height: 16,
                    child: Center(
                      child: AnimatedScale(
                        scale: active ? 1.18 : 1,
                        duration: const Duration(milliseconds: 150),
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

class _AppTile extends StatefulWidget {
  const _AppTile({required this.item, required this.onLaunch});

  final LauncherItem item;
  final LauncherItemTap onLaunch;

  @override
  State<_AppTile> createState() => _AppTileState();
}

class _AppTileState extends State<_AppTile> {
  final GlobalKey _iconKey = GlobalKey();
  bool _pressed = false;

  void _open() {
    if (!widget.item.launchable) return;
    final RenderBox? box =
        _iconKey.currentContext?.findRenderObject() as RenderBox?;
    final Offset center = box == null
        ? Offset.zero
        : box.localToGlobal(box.size.center(Offset.zero));
    widget.onLaunch(widget.item, center);
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: widget.item.label,
      button: widget.item.launchable,
      enabled: widget.item.launchable,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: _open,
        onTapDown: widget.item.launchable
            ? (_) => setState(() => _pressed = true)
            : null,
        onTapCancel: widget.item.launchable
            ? () => setState(() => _pressed = false)
            : null,
        onTapUp: widget.item.launchable
            ? (_) => setState(() => _pressed = false)
            : null,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            AnimatedScale(
              duration: const Duration(milliseconds: 90),
              curve: Curves.easeOut,
              scale: _pressed ? 0.91 : 1,
              child: Image.asset(
                widget.item.icon,
                key: _iconKey,
                width: 58,
                height: 58,
                filterQuality: FilterQuality.high,
              ),
            ),
            const SizedBox(height: 7),
            AnimatedOpacity(
              duration: const Duration(milliseconds: 90),
              opacity: _pressed ? 0.72 : 1,
              child: SizedBox(
                width: 76,
                child: Text(
                  widget.item.label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    height: 14 / 12,
                    shadows: <Shadow>[
                      Shadow(
                        color: Color(0xFF000011),
                        offset: Offset(0, 1),
                        blurRadius: 4,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
