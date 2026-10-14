import 'package:flutter/material.dart';

import '../models/launcher_app.dart';

typedef LauncherItemTap = void Function(LauncherItem item, Offset globalCenter);

class HomeGrid extends StatefulWidget {
  const HomeGrid({
    Key? key,
    required this.onLaunch,
    this.background = false,
  }) : super(key: key);

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
    return AnimatedOpacity(
      duration: const Duration(milliseconds: 220),
      opacity: widget.background ? 0.74 : 1,
      child: ColorFiltered(
        colorFilter: widget.background
            ? const ColorFilter.mode(Color(0x52001416), BlendMode.srcATop)
            : const ColorFilter.mode(Colors.transparent, BlendMode.dst),
        child: Column(
          children: <Widget>[
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: homePages.length,
                onPageChanged: (value) => setState(() => _page = value),
                itemBuilder: (context, pageIndex) {
                  return Align(
                    alignment: Alignment.bottomCenter,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 4,
                          mainAxisExtent: 87,
                          crossAxisSpacing: 0,
                          mainAxisSpacing: 22,
                        ),
                        itemCount: homePages[pageIndex].length,
                        itemBuilder: (context, index) => _AppTile(
                          item: homePages[pageIndex][index],
                          onLaunch: widget.onLaunch,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 26,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List<Widget>.generate(homePages.length, (index) {
                  return Semantics(
                    label: 'Перейти на страницу ${index + 1}',
                    button: true,
                    child: GestureDetector(
                      onTap: () => _controller.animateToPage(
                        index,
                        duration: const Duration(milliseconds: 320),
                        curve: Curves.easeOutCubic,
                      ),
                      child: SizedBox(
                        width: 18,
                        height: 16,
                        child: Center(
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 180),
                            width: _page == index ? 6.5 : 6,
                            height: _page == index ? 6.5 : 6,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: _page == index
                                  ? Colors.white
                                  : const Color(0x5CFFFFFF),
                            ),
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
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
    final box = _iconKey.currentContext?.findRenderObject() as RenderBox?;
    final center = box == null
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
              duration: const Duration(milliseconds: 130),
              scale: _pressed ? 0.86 : 1,
              child: Image.asset(
                widget.item.icon,
                key: _iconKey,
                width: 58,
                height: 58,
                filterQuality: FilterQuality.high,
              ),
            ),
            const SizedBox(height: 7),
            SizedBox(
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
          ],
        ),
      ),
    );
  }
}
