import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../models/launcher_model.dart';

class RecentsView extends StatefulWidget {
  const RecentsView({
    Key? key,
    required this.onOpen,
    required this.onEmpty,
    this.initialActiveId,
    this.transitioningAppId,
  }) : super(key: key);

  final ValueChanged<LauncherItem> onOpen;
  final VoidCallback onEmpty;
  final String? initialActiveId;
  final String? transitioningAppId;

  @override
  State<RecentsView> createState() => _RecentsViewState();
}

class _RecentsViewState extends State<RecentsView> {
  late final PageController _controller;
  late List<LauncherItem> _items;
  final Set<String> _closingIds = <String>{};
  int _page = 0;
  String? _draggedId;
  double _dragY = 0;
  bool _closingAll = false;
  Timer? _removeTimer;
  Timer? _closeAllTimer;

  @override
  void initState() {
    super.initState();
    _items = List<LauncherItem>.from(launchableItems);
    final int initial = _items.indexWhere(
      (LauncherItem item) => item.id == widget.initialActiveId,
    );
    _page = initial < 0 ? 0 : initial;
    _controller = PageController(initialPage: _page, viewportFraction: 0.684);
  }

  @override
  void dispose() {
    _removeTimer?.cancel();
    _closeAllTimer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _dismiss(LauncherItem item) {
    if (_closingIds.contains(item.id)) return;
    final int removedIndex = _items.indexOf(item);
    setState(() {
      _closingIds.add(item.id);
      _draggedId = null;
      _dragY = 0;
    });
    _removeTimer = Timer(const Duration(milliseconds: 460), () {
      if (!mounted) return;
      setState(() {
        _items.remove(item);
        _closingIds.remove(item.id);
        if (_items.isNotEmpty) {
          _page = removedIndex.clamp(0, _items.length - 1);
        }
      });
      if (_items.isEmpty) {
        widget.onEmpty();
      } else {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (_controller.hasClients) {
            _controller.animateToPage(
              _page,
              duration: const Duration(milliseconds: 290),
              curve: Curves.easeOutCubic,
            );
          }
        });
      }
    });
  }

  void _closeAll() {
    if (_closingAll || _items.isEmpty) return;
    setState(() => _closingAll = true);
    final int duration = 240 + _items.length * 28;
    _closeAllTimer = Timer(Duration(milliseconds: duration), () {
      if (mounted) widget.onEmpty();
    });
  }

  double _currentPage() {
    if (_controller.hasClients && _controller.position.haveDimensions) {
      return _controller.page ?? _page.toDouble();
    }
    return _page.toDouble();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: <Widget>[
        Image.asset('assets/wallpaper.png', fit: BoxFit.cover),
        const DecoratedBox(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: <Color>[Color(0x1401101D), Color(0x42010B19)],
            ),
          ),
        ),
        Column(
          children: <Widget>[
            const SizedBox(height: 18),
            AnimatedOpacity(
              duration: const Duration(milliseconds: 150),
              opacity: _closingAll ? 0 : 1,
              child: TextButton(
                onPressed: _closeAll,
                style: TextButton.styleFrom(
                  foregroundColor: Colors.white,
                  minimumSize: const Size(160, 28),
                  padding: EdgeInsets.zero,
                ),
                child: const Text(
                  'Закрыть все',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400),
                ),
              ),
            ),
            const SizedBox(height: 18),
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: _items.length,
                onPageChanged: (int value) => setState(() => _page = value),
                itemBuilder: (BuildContext context, int index) {
                  final LauncherItem item = _items[index];
                  return AnimatedBuilder(
                    animation: _controller,
                    builder: (BuildContext context, Widget? child) {
                      final double signedDistance = _currentPage() - index;
                      final double distance = signedDistance.abs().clamp(
                            0.0,
                            1.0,
                          );
                      final double previewWidth =
                          222.11 - distance * (222.11 - 183.24);
                      final double previewHeight =
                          493.58 - distance * (493.58 - 407.2);
                      final double lift = distance * 40;
                      final double iconShift =
                          signedDistance.sign * distance * 94;
                      final double opacity = 1 - distance * 0.3;
                      final double drag = _draggedId == item.id ? _dragY : 0;
                      final double dragProgress = (-drag / 150).clamp(0.0, 1.0);
                      final bool closing = _closingIds.contains(item.id);
                      final int totalDuration = 240 + _items.length * 28;
                      final double delay = (index * 28) / totalDuration;

                      return TweenAnimationBuilder<double>(
                        tween:
                            Tween<double>(begin: 0, end: _closingAll ? 1 : 0),
                        duration: Duration(milliseconds: totalDuration),
                        curve: Interval(delay.clamp(0.0, 0.9), 1),
                        builder: (
                          BuildContext context,
                          double closeAllProgress,
                          Widget? child,
                        ) {
                          return AnimatedSlide(
                            offset:
                                closing ? const Offset(0, -1.18) : Offset.zero,
                            duration: const Duration(milliseconds: 240),
                            curve: Curves.easeInCubic,
                            child: AnimatedOpacity(
                              opacity: closing ? 0 : 1 - closeAllProgress,
                              duration: const Duration(milliseconds: 180),
                              child: Transform.translate(
                                offset: Offset(
                                  0,
                                  lift + drag - closeAllProgress * 580,
                                ),
                                child: Transform.scale(
                                  scale: 1 - dragProgress * 0.025,
                                  child: Opacity(
                                    opacity:
                                        opacity * (1 - dragProgress * 0.16),
                                    child: _RecentCard(
                                      item: item,
                                      previewWidth: previewWidth,
                                      previewHeight: previewHeight,
                                      iconShift: iconShift,
                                      hidePreview:
                                          widget.transitioningAppId == item.id,
                                      onTap: () => widget.onOpen(item),
                                      onVerticalStart: () => setState(() {
                                        _draggedId = item.id;
                                        _dragY = 0;
                                      }),
                                      onVerticalUpdate: (double delta) =>
                                          setState(() {
                                        _dragY = delta < 0
                                            ? delta
                                            : math.min(24, delta * 0.18);
                                      }),
                                      onVerticalEnd: (double velocity) {
                                        if (_dragY < -88 ||
                                            (_dragY < -32 && velocity < -420)) {
                                          _dismiss(item);
                                        } else {
                                          setState(() {
                                            _draggedId = null;
                                            _dragY = 0;
                                          });
                                        }
                                      },
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      );
                    },
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ],
    );
  }
}

class _RecentCard extends StatelessWidget {
  const _RecentCard({
    required this.item,
    required this.previewWidth,
    required this.previewHeight,
    required this.iconShift,
    required this.hidePreview,
    required this.onTap,
    required this.onVerticalStart,
    required this.onVerticalUpdate,
    required this.onVerticalEnd,
  });

  final LauncherItem item;
  final double previewWidth;
  final double previewHeight;
  final double iconShift;
  final bool hidePreview;
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
        onVerticalDragUpdate: (DragUpdateDetails details) {
          totalDelta += details.delta.dy;
          onVerticalUpdate(totalDelta);
        },
        onVerticalDragEnd: (DragEndDetails details) =>
            onVerticalEnd(details.primaryVelocity ?? 0),
        onVerticalDragCancel: () => onVerticalEnd(0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Transform.translate(
              offset: Offset(iconShift, 0),
              child: Image.asset(item.icon, width: 34, height: 34),
            ),
            const SizedBox(height: 12),
            AnimatedOpacity(
              duration: const Duration(milliseconds: 90),
              opacity: hidePreview ? 0 : 1,
              child: Container(
                width: previewWidth,
                height: previewHeight,
                clipBehavior: Clip.antiAlias,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  boxShadow: const <BoxShadow>[
                    BoxShadow(
                      color: Color(0x57000000),
                      blurRadius: 42,
                      offset: Offset(0, 18),
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
            ),
          ],
        ),
      ),
    );
  }
}
