import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

import '../models/launcher_model.dart';
import '../models/launcher_motion.dart';
import 'launcher_action.dart';

class RecentsView extends StatefulWidget {
  const RecentsView(
      {Key? key,
      required this.onOpen,
      required this.onEmpty,
      this.initialActiveId,
      this.transitioningAppId,
      this.onTransitionReady})
      : super(key: key);
  final void Function(LauncherItem, Rect) onOpen;
  final ValueChanged<Rect>? onTransitionReady;
  final VoidCallback onEmpty;
  final String? initialActiveId;
  final String? transitioningAppId;
  @override
  State<RecentsView> createState() => _RecentsViewState();
}

class _RecentsViewState extends State<RecentsView>
    with TickerProviderStateMixin {
  static const double step = 246.24;
  late final AnimationController _snap;
  late final AnimationController _dismiss;
  late final List<LauncherItem> _items;
  double _position = 0;
  double _snapStart = 0;
  double _snapTarget = 0;
  String? _draggedId;
  double _dragY = 0;
  String? _closingId;
  double _closingDrag = 0;
  double _promotedPosition = 0;
  bool _closingAll = false;
  int _dismissMilliseconds = 460;
  Offset? _pointerStart;
  Duration _lastAt = Duration.zero;
  double _lastX = 0;
  double _velocityX = 0;
  double _pointerScale = 1;
  double _startPosition = 0;
  String? _axis;
  bool get _busy => _closingId != null || _closingAll;

  @override
  void initState() {
    super.initState();
    _items = List<LauncherItem>.from(launchableItems);
    final initial =
        _items.indexWhere((item) => item.id == widget.initialActiveId);
    _position = math.max(0, initial).toDouble();
    _snap = AnimationController(vsync: this, duration: launcherDuration(320))
      ..addListener(() {
        setState(() => _position = _snapStart +
            (_snapTarget - _snapStart) *
                const Cubic(.22, 1, .36, 1).transform(_snap.value));
      });
    _dismiss = AnimationController(vsync: this, duration: launcherDuration(460))
      ..addListener(() => setState(() {}))
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) _finishDismiss();
      });
  }

  @override
  void dispose() {
    _snap.dispose();
    _dismiss.dispose();
    super.dispose();
  }

  double get _collapse {
    if (_closingId == null || _items.length == 1) return 0;
    final t =
        ((_dismiss.value * _dismissMilliseconds - 170) / 290).clamp(0.0, 1.0);
    return const Cubic(.22, 1, .36, 1).transform(t);
  }

  double get _displayPosition =>
      _position + (_promotedPosition - _position) * _collapse;

  void _dismissCard(LauncherItem item) {
    if (_busy) return;
    _snap.stop();
    final index = _items.indexOf(item);
    setState(() {
      _closingId = item.id;
      _closingDrag = _dragY;
      _draggedId = null;
      _dragY = 0;
      // Keep the following card on the right until its slot collapses. When
      // removing the last card, bring the previous card in from the left.
      _promotedPosition =
          index.clamp(0, math.max(0, _items.length - 2)).toDouble();
      _dismissMilliseconds = _items.length == 1 ? 240 : 460;
    });
    _dismiss.duration = launcherDuration(_dismissMilliseconds);
    _dismiss.forward(from: 0);
  }

  void _closeAll() {
    if (_busy || _items.isEmpty) return;
    _snap.stop();
    setState(() {
      _closingAll = true;
      _draggedId = null;
      _dragY = 0;
      _dismissMilliseconds = 240 + _items.length * 28;
    });
    _dismiss.duration = launcherDuration(_dismissMilliseconds);
    _dismiss.forward(from: 0);
  }

  void _finishDismiss() {
    if (_closingAll || _items.length == 1) {
      widget.onEmpty();
      return;
    }
    setState(() {
      _items.removeWhere((item) => item.id == _closingId);
      _position = _promotedPosition;
      _closingId = null;
      _closingDrag = 0;
    });
    // Each surviving keyed card is already at its final slot. No animation
    // controller, transform or drag state is transferred to another app.
    _dismiss.reset();
  }

  void _snapTo(double target) {
    _snapStart = _position;
    _snapTarget = target.clamp(0, _items.length - 1).toDouble();
    _snap.duration = launcherDuration(320);
    _snap.forward(from: 0);
  }

  void _down(PointerDownEvent event) {
    if (_busy || event.buttons != 1) return;
    _snap.stop();
    _pointerStart = event.position;
    _startPosition = _position;
    _pointerScale = (context.findRenderObject() as RenderBox)
        .getTransformTo(null)
        .getMaxScaleOnAxis();
    _lastX = event.position.dx;
    _lastAt = event.timeStamp;
    _velocityX = 0;
    _axis = null;
  }

  void _move(PointerMoveEvent event) {
    if (_pointerStart == null || _busy) return;
    final delta = (event.position - _pointerStart!) / _pointerScale;
    final elapsed = math.max(1, (event.timeStamp - _lastAt).inMilliseconds);
    _velocityX = _velocityX * .35 +
        (event.position.dx - _lastX) / _pointerScale / elapsed * .65;
    _lastX = event.position.dx;
    _lastAt = event.timeStamp;
    if (_axis == null && math.max(delta.dx.abs(), delta.dy.abs()) > 7) {
      _axis = delta.dx.abs() > delta.dy.abs() ? 'horizontal' : 'vertical';
    }
    if (_axis == 'horizontal') {
      setState(() => _position =
          (_startPosition - delta.dx / step).clamp(0.0, _items.length - 1.0));
    }
  }

  void _up(PointerEvent event, {bool cancelled = false}) {
    if (_pointerStart == null) return;
    _pointerStart = null;
    if (_axis == 'horizontal' && !_busy) {
      final direction =
          !cancelled && _velocityX.abs() > .38 ? (_velocityX < 0 ? 1 : -1) : 0;
      _snapTo(direction == 0
          ? _position.roundToDouble()
          : (_startPosition.round() + direction).toDouble());
    }
    _axis = null;
  }

  @override
  Widget build(BuildContext context) =>
      LayoutBuilder(builder: (context, constraints) {
        final width = constraints.maxWidth;
        final trackHeight = constraints.maxHeight - 104;
        final closingIndex = _items.indexWhere((item) => item.id == _closingId);
        return Listener(
          behavior: HitTestBehavior.opaque,
          onPointerDown: _down, onPointerMove: _move, onPointerUp: _up,
          onPointerCancel: (event) => _up(event, cancelled: true),
          onPointerSignal: (event) {
            if (event is PointerScrollEvent && !_busy) {
              final delta =
                  event.scrollDelta.dx.abs() > event.scrollDelta.dy.abs()
                      ? event.scrollDelta.dx
                      : event.scrollDelta.dy;
              _snapTo((_position + delta / step)
                  .clamp(0, _items.length - 1)
                  .toDouble());
            }
          },
          onPointerPanZoomStart: (_) {
            if (!_busy) {
              _snap.stop();
              _startPosition = _position;
            }
          },
          onPointerPanZoomUpdate: (event) {
            if (!_busy) {
              setState(() => _position = (_startPosition - event.pan.dx / step)
                  .clamp(0, _items.length - 1)
                  .toDouble());
            }
          },
          onPointerPanZoomEnd: (_) {
            if (!_busy) _snapTo(_position.roundToDouble());
          },
          // The phone frame is the only clipping boundary. A vertical drag must
          // not be cut at the carousel's former scroll-viewport edge.
          child:
              Stack(clipBehavior: Clip.none, fit: StackFit.expand, children: [
            Image.asset('assets/wallpaper.png', fit: BoxFit.cover),
            const DecoratedBox(
                decoration: BoxDecoration(
                    gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Color(0x1401101D), Color(0x42010B19)]))),
            for (var index = 0; index < _items.length; index++)
              _card(_items[index], index, closingIndex, width, trackHeight),
            Positioned(
                top: 18,
                left: 0,
                right: 0,
                height: 48,
                child: Center(
                    child: AnimatedOpacity(
                        opacity: _closingAll ? 0 : 1,
                        duration: launcherDuration(150),
                        child: TextButton(
                            onPressed: _closeAll,
                            style: TextButton.styleFrom(
                                foregroundColor: Colors.white,
                                minimumSize: const Size(160, 28),
                                padding: EdgeInsets.zero),
                            child: const Text('Закрыть все',
                                style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.w400)))))),
          ]),
        );
      });

  Widget _card(LauncherItem item, int index, int closingIndex, double width,
      double trackHeight) {
    final slot =
        index - (closingIndex >= 0 && index > closingIndex ? _collapse : 0);
    final signedDistance = _displayPosition - slot;
    final distance = signedDistance.abs().clamp(0.0, 1.0);
    final previewWidth = 222.11 - distance * (222.11 - 183.24);
    final previewHeight = 493.58 - distance * (493.58 - 407.2);
    final groupHeight = 46 + previewHeight;
    final closing = _closingAll || item.id == _closingId;
    final dismissProgress = closing
        ? ((_dismiss.value * _dismissMilliseconds -
                    (_closingAll ? index * 28 : 0)) /
                240)
            .clamp(0.0, 1.0)
        : 0.0;
    final easedDismiss = Curves.easeInCubic.transform(dismissProgress);
    final drag = item.id == _closingId
        ? _closingDrag
        : _draggedId == item.id
            ? _dragY
            : 0.0;
    final dragProgress = (-drag / 150).clamp(0.0, 1.0);
    return Positioned(
      key: ValueKey('recent-slot-${item.id}'),
      left: (width - 222.11) / 2 + (slot - _displayPosition) * step,
      top: 84 +
          (trackHeight - groupHeight) / 2 +
          distance * 40 +
          drag -
          easedDismiss * groupHeight * 1.18,
      width: 222.11,
      height: groupHeight,
      child: IgnorePointer(
          ignoring: closing,
          child: Transform.scale(
            scale: 1 - dragProgress * .025 - easedDismiss * .04,
            child: Opacity(
              opacity: ((1 - distance * .3) *
                      (1 - dragProgress * .16) *
                      (1 - easedDismiss))
                  .clamp(0.0, 1.0),
              child: _RecentCard(
                item: item,
                onBoundsReady: widget.transitioningAppId == item.id
                    ? widget.onTransitionReady
                    : null,
                previewWidth: previewWidth,
                previewHeight: previewHeight,
                iconShift: signedDistance.sign * distance * 94,
                hidePreview: widget.transitioningAppId == item.id,
                onTap: (bounds) {
                  if (!_busy) widget.onOpen(item, bounds);
                },
                onVerticalStart: () {
                  if (!_busy) {
                    setState(() {
                      _draggedId = item.id;
                      _dragY = 0;
                    });
                  }
                },
                onVerticalUpdate: (delta) {
                  if (!_busy) {
                    setState(() =>
                        _dragY = delta < 0 ? delta : math.min(24, delta * .18));
                  }
                },
                onVerticalEnd: (velocity) {
                  if (_busy) return;
                  if (_dragY < -88 || (_dragY < -32 && velocity < -420)) {
                    _dismissCard(item);
                  } else {
                    setState(() {
                      _draggedId = null;
                      _dragY = 0;
                    });
                  }
                },
              ),
            ),
          )),
    );
  }
}

class _RecentCard extends StatefulWidget {
  const _RecentCard({
    required this.item,
    required this.previewWidth,
    required this.previewHeight,
    required this.iconShift,
    required this.hidePreview,
    required this.onTap,
    this.onBoundsReady,
    required this.onVerticalStart,
    required this.onVerticalUpdate,
    required this.onVerticalEnd,
  });

  final LauncherItem item;
  final double previewWidth;
  final double previewHeight;
  final double iconShift;
  final bool hidePreview;
  final ValueChanged<Rect> onTap;
  final ValueChanged<Rect>? onBoundsReady;
  final VoidCallback onVerticalStart;
  final ValueChanged<double> onVerticalUpdate;
  final ValueChanged<double> onVerticalEnd;

  @override
  State<_RecentCard> createState() => _RecentCardState();
}

class _RecentCardState extends State<_RecentCard> {
  final GlobalKey previewKey = GlobalKey();
  Rect? get bounds {
    final box = previewKey.currentContext?.findRenderObject() as RenderBox?;
    if (box == null) return null;
    return Rect.fromPoints(box.localToGlobal(Offset.zero),
        box.localToGlobal(box.size.bottomRight(Offset.zero)));
  }

  void open() {
    final rect = bounds;
    if (rect != null) widget.onTap(rect);
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && bounds != null) widget.onBoundsReady?.call(bounds!);
    });
  }

  Offset? start;
  Duration started = Duration.zero;
  double scale = 1;
  double travel = 0;
  String? axis;
  void down(PointerDownEvent e) {
    if (e.buttons != 1) return;
    start = e.position;
    started = e.timeStamp;
    final box = context.findRenderObject() as RenderBox;
    scale = box.getTransformTo(null).getMaxScaleOnAxis();
    axis = null;
    travel = 0;
  }

  void move(PointerMoveEvent e) {
    if (start == null) return;
    final delta = (e.position - start!) / scale;
    travel = math.max(travel, delta.distance);
    if (axis == null && math.max(delta.dx.abs(), delta.dy.abs()) > 7) {
      axis = delta.dx.abs() > delta.dy.abs() ? 'horizontal' : 'vertical';
      if (axis == 'vertical') widget.onVerticalStart();
    }
    if (axis == 'vertical') widget.onVerticalUpdate(delta.dy);
  }

  void finish(PointerEvent e, {bool cancelled = false}) {
    if (start == null) return;
    final dy = (e.position - start!).dy / scale;
    final elapsed = math.max(1, (e.timeStamp - started).inMilliseconds);
    start = null;
    if (axis == 'vertical') {
      if (cancelled) widget.onVerticalUpdate(0);
      widget.onVerticalEnd(cancelled ? 0 : dy / elapsed * 1000);
    }
    axis = null;
  }

  @override
  Widget build(BuildContext context) {
    return LauncherAction(
      onKeyboardPressed: open,
      onPressed: () {
        if (travel <= 6) open();
      },
      label:
          'Открыть приложение «${widget.item.label}». Смахните вверх, чтобы закрыть',
      child: Listener(
        behavior: HitTestBehavior.opaque,
        onPointerDown: down,
        onPointerMove: move,
        onPointerUp: finish,
        onPointerCancel: (e) => finish(e, cancelled: true),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Transform.translate(
              offset: Offset(widget.iconShift, 0),
              child: Image.asset(widget.item.icon, width: 34, height: 34),
            ),
            const SizedBox(height: 12),
            AnimatedOpacity(
              duration: launcherDuration(90),
              opacity: widget.hidePreview ? 0 : 1,
              child: Container(
                key: previewKey,
                width: widget.previewWidth,
                height: widget.previewHeight,
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
                child: Image.asset(widget.item.preview!, fit: BoxFit.cover),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
