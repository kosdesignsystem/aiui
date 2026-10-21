import '../models/launcher_motion.dart';
import 'dart:async';
import 'dart:ui' show ImageFilter;

import 'package:flutter/material.dart';

import '../models/launcher_model.dart';
import '../platform/launcher_platform.dart';
import '../widgets/control_shade.dart';
import '../widgets/home_grid.dart';
import '../widgets/launch_transitions.dart';
import '../widgets/launcher_chrome.dart';
import '../widgets/recents_view.dart';
import 'navigation_catalog.dart';

class LauncherScreen extends StatefulWidget {
  const LauncherScreen({Key? key, required this.platform}) : super(key: key);
  final LauncherPlatform platform;

  @override
  State<LauncherScreen> createState() => _LauncherScreenState();
}

class _LauncherScreenState extends State<LauncherScreen>
    with SingleTickerProviderStateMixin {
  final GlobalKey _surfaceKey = GlobalKey();

  late final AnimationController _shadeAnimation;
  LauncherMode _mode = LauncherMode.lock;
  ShadeOrigin _shadeOrigin = ShadeOrigin.home;
  LauncherItem? _activeApp;
  LauncherItem? _launchingApp;
  LauncherItem? _recentTransitionApp;
  LauncherItem? _minimizingApp;
  bool _transitioningToOverview = false;
  Rect? _recentBounds;
  bool _shadeClosing = false;
  Offset _launchOrigin = Offset.zero;
  int _pinLength = 0;
  bool _blackout = false;
  double _dragOffset = 0;
  int? _pointer;
  Offset _pointerStart = Offset.zero;
  String? _dragAxis;
  bool _sliderInteraction = false;
  int _generation = 0;
  int _homeEpoch = 0;
  Timer? _pinTimer;
  Timer? _shadeTimer;

  @override
  void initState() {
    super.initState();
    _shadeAnimation = AnimationController(
      vsync: this,
      duration: launcherDuration(240),
    )..addListener(_redrawShade);
  }

  @override
  void dispose() {
    _pinTimer?.cancel();
    _shadeTimer?.cancel();
    _shadeAnimation
      ..removeListener(_redrawShade)
      ..dispose();
    super.dispose();
  }

  void _redrawShade() {
    if (mounted) setState(() {});
  }

  bool get _canTrackPointer =>
      _launchingApp == null &&
      _recentTransitionApp == null &&
      _minimizingApp == null &&
      !_shadeClosing &&
      (_mode == LauncherMode.lock ||
          _mode == LauncherMode.home ||
          _mode == LauncherMode.app ||
          _mode == LauncherMode.shade);

  void _onPointerDown(PointerDownEvent event) {
    if (!_canTrackPointer ||
        _sliderInteraction ||
        event.buttons != 1 ||
        event.localPosition.dy >= 748) {
      return;
    }
    _pointer = event.pointer;
    _pointerStart = event.localPosition;
    _dragAxis = null;
  }

  void _onPointerMove(PointerMoveEvent event) {
    if (_pointer != event.pointer) return;
    final Offset delta = event.localPosition - _pointerStart;
    if (_dragAxis == null && mathMax(delta.dx.abs(), delta.dy.abs()) > 7) {
      _dragAxis = _mode == LauncherMode.home && delta.dx.abs() > delta.dy.abs()
          ? 'horizontal'
          : 'vertical';
    }
    if (_dragAxis != 'vertical') return;
    setState(() {
      if (_mode == LauncherMode.lock) {
        _dragOffset = delta.dy.clamp(-240.0, 0.0);
      } else if (_mode == LauncherMode.home || _mode == LauncherMode.app) {
        _dragOffset = delta.dy.clamp(-180.0, 260.0);
      } else if (_mode == LauncherMode.shade) {
        _dragOffset = delta.dy.clamp(-220.0, 0.0);
      }
    });
  }

  void _onPointerUp(PointerEvent event) {
    _finishPointer(event, cancelled: false);
  }

  void _onPointerCancel(PointerCancelEvent event) {
    _finishPointer(event, cancelled: true);
  }

  void _finishPointer(PointerEvent event, {required bool cancelled}) {
    if (_pointer != event.pointer) return;
    final Offset delta = event.localPosition - _pointerStart;
    final String? axis = _dragAxis;
    _pointer = null;
    _dragAxis = null;

    if (cancelled || axis != 'vertical') {
      if (_dragOffset != 0) setState(() => _dragOffset = 0);
      return;
    }

    if (_mode == LauncherMode.lock && delta.dy < -64) {
      _transitionTo(LauncherMode.pin);
    } else if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
        delta.dy > 72) {
      final double progress = (_dragOffset / 220).clamp(0.0, 1.0);
      setState(() {
        _shadeTimer?.cancel();
        _shadeOrigin =
            _mode == LauncherMode.app ? ShadeOrigin.app : ShadeOrigin.home;
        _mode = LauncherMode.shade;
        _dragOffset = 0;
        _shadeAnimation.value = progress;
      });
      _shadeAnimation.animateTo(1, curve: Curves.easeOutCubic);
    } else if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
        delta.dy < -72) {
      setState(() {
        if (_mode == LauncherMode.app && _activeApp != null) {
          _recentTransitionApp = _activeApp;
          _recentBounds = null;
          _transitioningToOverview = true;
        }
        _mode = LauncherMode.recents;
        _dragOffset = 0;
      });
    } else if (_mode == LauncherMode.shade && delta.dy < -64) {
      _closeShade();
    } else {
      setState(() => _dragOffset = 0);
      if (_mode == LauncherMode.shade) {
        _shadeAnimation.animateTo(1, curve: Curves.easeOutCubic);
      }
    }
  }

  Future<void> _transitionTo(LauncherMode next) async {
    final int generation = ++_generation;
    final bool reduced = MediaQuery.of(context).disableAnimations;
    setState(() => _blackout = true);
    await Future<void>.delayed(Duration(milliseconds: reduced ? 1 : 170));
    if (!mounted || generation != _generation) return;
    setState(() {
      _mode = next;
      _dragOffset = 0;
    });
    await Future<void>.delayed(launcherDuration(30));
    if (mounted && generation == _generation) setState(() => _blackout = false);
  }

  void _onDigit(int _) {
    if (_pinLength >= 4) return;
    final int next = _pinLength + 1;
    setState(() => _pinLength = next);
    if (next == 4) {
      _pinTimer?.cancel();
      _pinTimer = Timer(launcherDuration(110), () {
        if (mounted) _transitionTo(LauncherMode.home);
      });
    }
  }

  void _startLaunch(LauncherItem item, Offset globalOrigin) {
    if (_launchingApp != null || !item.launchable) return;
    final RenderBox? box =
        _surfaceKey.currentContext?.findRenderObject() as RenderBox?;
    setState(() {
      _launchOrigin =
          box == null ? globalOrigin : box.globalToLocal(globalOrigin);
      _launchingApp = item;
    });
  }

  void _finishLaunch() {
    final LauncherItem? item = _launchingApp;
    if (item == null) return;
    setState(() {
      _activeApp = item;
      _shadeOrigin = ShadeOrigin.app;
      _mode = LauncherMode.app;
      _dragOffset = 0;
      _launchingApp = null;
    });
  }

  Rect _localBounds(Rect global) {
    final box = _surfaceKey.currentContext!.findRenderObject() as RenderBox;
    return Rect.fromPoints(box.globalToLocal(global.topLeft),
        box.globalToLocal(global.bottomRight));
  }

  void _openRecent(LauncherItem item, Rect globalBounds) {
    if (_recentTransitionApp != null) return;
    setState(() {
      _recentTransitionApp = item;
      _recentBounds = _localBounds(globalBounds);
      _transitioningToOverview = false;
    });
  }

  void _finishRecentTransition() {
    final LauncherItem? item = _recentTransitionApp;
    if (item == null) return;
    setState(() {
      if (!_transitioningToOverview) {
        _activeApp = item;
        _shadeOrigin = ShadeOrigin.app;
        _mode = LauncherMode.app;
      }
      _recentTransitionApp = null;
    });
  }

  void _showHome() {
    _generation++;
    _homeEpoch++;
    _pinTimer?.cancel();
    _shadeTimer?.cancel();
    _pointer = null;
    _sliderInteraction = false;
    _shadeClosing = false;
    _blackout = false;
    _launchingApp = null;
    _recentTransitionApp = null;
    final bool shouldMinimize = _activeApp != null &&
        (_mode == LauncherMode.app ||
            (_mode == LauncherMode.shade && _shadeOrigin == ShadeOrigin.app));
    if (shouldMinimize) {
      setState(() {
        _minimizingApp = _activeApp;
        _activeApp = null;
        _shadeOrigin = ShadeOrigin.home;
        _mode = LauncherMode.home;
        _dragOffset = 0;
        _shadeAnimation.value = 0;
      });
      return;
    }
    setState(() {
      _activeApp = null;
      _recentTransitionApp = null;
      _shadeOrigin = ShadeOrigin.home;
      _mode = LauncherMode.home;
      _dragOffset = 0;
      _shadeAnimation.value = 0;
    });
  }

  void _closeShade() {
    if (_shadeClosing) return;
    final double gestureProgress = (1 + _dragOffset / 220).clamp(0.0, 1.0);
    _shadeAnimation.value = gestureProgress;
    setState(() {
      _shadeClosing = true;
      _dragOffset = 0;
    });
    _shadeAnimation.animateTo(
      0,
      duration: launcherDuration(240),
      curve: Curves.easeInCubic,
    );
    _shadeTimer?.cancel();
    _shadeTimer = Timer(launcherDuration(240), () {
      if (!mounted) return;
      setState(() {
        _mode = _shadeOrigin == ShadeOrigin.app && _activeApp != null
            ? LauncherMode.app
            : LauncherMode.home;
        _shadeClosing = false;
      });
    });
  }

  void _openSettings() {
    _pointer = null;
    _closeShade();
    Navigator.of(context).push(MaterialPageRoute<void>(
      settings: const RouteSettings(name: '/app/Components/navigation'),
      builder: (_) => NavigationCatalog(
          platform: widget.platform,
          onHome: () {
            Navigator.of(context).pop();
            _showHome();
          }),
    ));
  }

  double get _shadeProgress {
    if (_mode == LauncherMode.shade) {
      if (_dragOffset < 0) {
        return (1 + _dragOffset / 220).clamp(0.0, 1.0);
      }
      return _shadeAnimation.value;
    }
    if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
        _dragOffset > 0) {
      return (_dragOffset / 220).clamp(0.0, 1.0);
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    final double shadeProgress = _shadeProgress;
    final bool showShade = _mode == LauncherMode.shade || shadeProgress > 0;
    final bool showHome = _mode == LauncherMode.home ||
        _mode == LauncherMode.recents ||
        (_mode == LauncherMode.shade && _shadeOrigin == ShadeOrigin.home);
    final bool homeInBackground = _mode == LauncherMode.recents ||
        (_mode == LauncherMode.shade && !_shadeClosing);
    final bool showApp = _activeApp != null &&
        (_mode == LauncherMode.app ||
            (_mode == LauncherMode.shade && _shadeOrigin == ShadeOrigin.app));
    final bool darkStatus =
        _mode == LauncherMode.app && (_activeApp?.darkStatusBar ?? false);

    return Scaffold(
      body: Listener(
        onPointerDown: _onPointerDown,
        onPointerMove: _onPointerMove,
        onPointerUp: _onPointerUp,
        onPointerCancel: _onPointerCancel,
        child: Stack(
          key: _surfaceKey,
          fit: StackFit.expand,
          clipBehavior: Clip.hardEdge,
          children: <Widget>[
            Image.asset('assets/wallpaper.png', fit: BoxFit.cover),
            if (showHome)
              Positioned(
                top: 40,
                bottom: 52,
                left: 0,
                right: 0,
                child: Transform.translate(
                  offset: Offset(
                    0,
                    _mode == LauncherMode.home ? _dragOffset * 0.12 : 0,
                  ),
                  child: HomeGrid(
                    key: ValueKey<String>('launcher-home-$_homeEpoch'),
                    background: homeInBackground,
                    onLaunch: _startLaunch,
                  ),
                ),
              ),
            if (showApp)
              Transform.translate(
                offset: Offset(
                  0,
                  _mode == LauncherMode.app ? _dragOffset * 0.08 : 0,
                ),
                child: _AppPreview(
                    item: _activeApp!,
                    background: _mode == LauncherMode.shade && !_shadeClosing),
              ),
            if (_mode == LauncherMode.lock)
              Positioned(
                top: 40,
                bottom: 52,
                left: 0,
                right: 0,
                child: LockView(dragOffset: _dragOffset),
              ),
            if (_mode == LauncherMode.pin)
              Positioned(
                top: 40,
                bottom: 52,
                left: 0,
                right: 0,
                child: PinPadView(
                  entered: _pinLength,
                  onDigit: _onDigit,
                  onCancel: () {
                    setState(() => _pinLength = 0);
                    _transitionTo(LauncherMode.lock);
                  },
                ),
              ),
            if (_mode == LauncherMode.recents)
              Positioned(
                top: 40,
                bottom: 52,
                left: 0,
                right: 0,
                child: RecentsView(
                  key: ValueKey<String?>(_activeApp?.id),
                  initialActiveId: _activeApp?.id,
                  transitioningAppId: _recentTransitionApp?.id,
                  onOpen: _openRecent,
                  onTransitionReady: (bounds) {
                    if (mounted && _recentTransitionApp != null) {
                      setState(() => _recentBounds = _localBounds(bounds));
                    }
                  },
                  onEmpty: _showHome,
                ),
              ),
            if (showShade)
              FractionalTranslation(
                translation: Offset(0, shadeProgress - 1),
                child: Opacity(
                  opacity: 0.58 + shadeProgress * 0.42,
                  child: ControlShade(
                    platform: widget.platform,
                    contentOpacity: 0.35 + shadeProgress * 0.65,
                    contentScale: 0.92 + shadeProgress * 0.08,
                    onClose: _closeShade,
                    onSettings: _openSettings,
                    preview: _mode != LauncherMode.shade,
                    onSliderInteraction: (active) {
                      _sliderInteraction = active;
                      if (active) _pointer = null;
                    },
                  ),
                ),
              ),
            Positioned(
              top: 8,
              left: 18,
              width: 24,
              height: 24,
              child: IgnorePointer(
                  child: DecoratedBox(
                      decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: const RadialGradient(
                              center: Alignment(-.4, -.4),
                              colors: [
                                Color(0xFF5C6B82),
                                Color(0xFF1B2331),
                                Color(0xFF0C111B)
                              ],
                              stops: [
                                0,
                                .45,
                                1
                              ]),
                          border: Border.all(
                              color: const Color(0xE606090E), width: 2)))),
            ),
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: LauncherStatusBar(dark: darkStatus),
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: LauncherNavigationArea(onHome: _showHome),
            ),
            IgnorePointer(
              child: AnimatedOpacity(
                duration: launcherDuration(170),
                opacity: _blackout ? 1 : 0,
                child: const ColoredBox(color: Color(0xFF021113)),
              ),
            ),
            if (_launchingApp != null)
              HomeLaunchOverlay(
                item: _launchingApp!,
                origin: _launchOrigin,
                onComplete: _finishLaunch,
              ),
            if (_recentTransitionApp != null)
              RecentTransitionOverlay(
                item: _recentTransitionApp!,
                toOverview: _transitioningToOverview,
                bounds: _recentBounds,
                onComplete: _finishRecentTransition,
              ),
            if (_minimizingApp != null)
              HomeMinimizeOverlay(
                item: _minimizingApp!,
                onComplete: () => setState(() => _minimizingApp = null),
              ),
          ],
        ),
      ),
    );
  }
}

class _AppPreview extends StatelessWidget {
  const _AppPreview({required this.item, this.background = false});
  final bool background;

  final LauncherItem item;

  @override
  Widget build(BuildContext context) {
    Widget content = Semantics(
      label: 'Приложение «${item.label}»',
      image: true,
      child: ColoredBox(
        color: const Color(0xFFF5F5F7),
        child: Image.asset(
          item.preview!,
          fit: BoxFit.cover,
          alignment: Alignment.center,
        ),
      ),
    );
    if (background) {
      content = Opacity(
          opacity: .76,
          child: ImageFiltered(
              imageFilter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
              child: Transform.scale(scale: 1.025, child: content)));
    }
    return content;
  }
}

double mathMax(double a, double b) => a > b ? a : b;
