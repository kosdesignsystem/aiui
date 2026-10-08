import 'dart:async';

import 'package:flutter/material.dart';

import '../models/launcher_app.dart';

class RecentsView extends StatefulWidget {
  const RecentsView({
    Key? key,
    required this.onOpen,
    required this.onEmpty,
    this.initialActiveId,
  }) : super(key: key);

  final ValueChanged<LauncherItem> onOpen;
  final VoidCallback onEmpty;
  final String? initialActiveId;

  @override
  State<RecentsView> createState() => _RecentsViewState();
}

class _RecentsViewState extends State<RecentsView> {
  late List<LauncherItem> _items;
  late PageController _controller;
  int _page = 0;
  String? _draggedId;
  double _dragY = 0;
  bool _closingAll = false;

  @override
  void initState() {
    super.initState();
    _items = List<LauncherItem>.from(launchableItems);
    final initial = _items.indexWhere(
      (item) => item.id == widget.initialActiveId,
    );
    _page = initial < 0 ? 0 : initial;
    _controller = PageController(initialPage: _page, viewportFraction: 0.685);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _dismiss(LauncherItem item) {
    final index = _items.indexOf(item);
    setState(() {
      _items.remove(item);
      _draggedId = null;
      _dragY = 0;
      if (_items.isNotEmpty) _page = index.clamp(0, _items.length - 1);
    });
    if (_items.isEmpty) {
      widget.onEmpty();
      return;
    }
    _controller.dispose();
    _controller = PageController(initialPage: _page, viewportFraction: 0.685);
  }

  Future<void> _closeAll() async {
    if (_closingAll || _items.isEmpty) return;
    setState(() => _closingAll = true);
    await Future<void>.delayed(
      Duration(milliseconds: 280 + _items.length * 36),
    );
    if (mounted) widget.onEmpty();
  }

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: const Color(0x1701101D),
      child: Column(
        children: <Widget>[
          const SizedBox(height: 18),
          AnimatedOpacity(
            duration: const Duration(milliseconds: 160),
            opacity: _closingAll ? 0 : 1,
            child: TextButton(
              onPressed: _closeAll,
              style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                minimumSize: const Size(160, 28),
              ),
              child: const Text(
                'Закрыть все',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400),
              ),
            ),
          ),
          const SizedBox(height: 18),
          Expanded(
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 280),
              opacity: _closingAll ? 0 : 1,
              child: PageView.builder(
                controller: _controller,
                itemCount: _items.length,
                onPageChanged: (value) => setState(() => _page = value),
                itemBuilder: (context, index) {
                  final item = _items[index];
                  return AnimatedBuilder(
                    animation: _controller,
                    builder: (context, child) {
                      final rawPage = _controller.hasClients &&
                              _controller.position.haveDimensions
                          ? (_controller.page ?? _page.toDouble())
                          : _page.toDouble();
                      final distance = (rawPage - index).abs().clamp(0.0, 1.0);
                      final scale = 1 - distance * 0.175;
                      final lift = distance * 40;
                      final drag = _draggedId == item.id ? _dragY : 0.0;
                      return Transform.translate(
                        offset: Offset(0, lift + drag),
                        child: Transform.scale(
                          scale: scale,
                          child: Opacity(
                            opacity: 1 - distance * 0.30,
                            child: child,
                          ),
                        ),
                      );
                    },
                    child: _RecentCard(
                      item: item,
                      onTap: () => widget.onOpen(item),
                      onVerticalStart: () => setState(() {
                        _draggedId = item.id;
                        _dragY = 0;
                      }),
                      onVerticalUpdate: (delta) => setState(() {
                        _dragY = delta < 0 ? delta : delta * 0.18;
                      }),
                      onVerticalEnd: (velocity) {
                        if (_dragY < -88 || (_dragY < -32 && velocity < -420)) {
                          _dismiss(item);
                        } else {
                          setState(() {
                            _draggedId = null;
                            _dragY = 0;
                          });
                        }
                      },
                    ),
                  );
                },
              ),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}

class _RecentCard extends StatelessWidget {
  const _RecentCard({
    required this.item,
    required this.onTap,
    required this.onVerticalStart,
    required this.onVerticalUpdate,
    required this.onVerticalEnd,
  });

  final LauncherItem item;
  final VoidCallback onTap;
  final VoidCallback onVerticalStart;
  final ValueChanged<double> onVerticalUpdate;
  final ValueChanged<double> onVerticalEnd;

  @override
  Widget build(BuildContext context) {
    double totalDelta = 0;
    return Semantics(
      button: true,
      label:
          'Открыть приложение «${item.label}». Смахните вверх, чтобы закрыть',
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        onVerticalDragStart: (_) {
          totalDelta = 0;
          onVerticalStart();
        },
        onVerticalDragUpdate: (details) {
          totalDelta += details.delta.dy;
          onVerticalUpdate(totalDelta);
        },
        onVerticalDragEnd: (details) =>
            onVerticalEnd(details.primaryVelocity ?? 0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset(item.icon, width: 34, height: 34),
            const SizedBox(height: 12),
            Container(
              width: 222,
              height: 494,
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                boxShadow: const <BoxShadow>[
                  BoxShadow(
                    color: Color(0x61000000),
                    blurRadius: 52,
                    offset: Offset(0, 22),
                  ),
                  BoxShadow(
                    color: Color(0x2E000000),
                    blurRadius: 14,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Image.asset(item.preview!, fit: BoxFit.cover),
            ),
          ],
        ),
      ),
    );
  }
}
