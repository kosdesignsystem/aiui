import 'dart:async';

import 'package:flutter/material.dart';

import '../models/launcher_model.dart';
import '../widgets/control_shade.dart';
import '../widgets/home_grid.dart';
import '../widgets/launch_transitions.dart';
import '../widgets/launcher_chrome.dart';
import '../widgets/recents_view.dart';

class LauncherScreen extends StatefulWidget {
  const LauncherScreen({Key? key}) : super(key: key);

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
  bool _shadeClosing = false;
  Offset _launchOrigin = Offset.zero;
  int _pinLength = 0;
  bool _blackout = false;
  double _dragOffset = 0;
  int? _pointer;
  Offset _pointerStart = Offset.zero;
  String? _dragAxis;
  Timer? _pinTimer;
  Timer? _shadeTimer;

  @override
  void initState() {
    super.initState();
    _shadeAnimation = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 240),
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
    if (!_canTrackPointer || event.buttons != 1) return;
    _pointer = event.pointer;
    _pointerStart = event.position;
    _dragAxis = null;
  }

  void _onPointerMove(PointerMoveEvent event) {
    if (_pointer != event.pointer) return;
    final Offset delta = event.position - _pointerStart;
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
    final Offset delta = event.position - _pointerStart;
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
    setState(() => _blackout = true);
    await Future<void>.delayed(const Duration(milliseconds: 170));
    if (!mounted) return;
    setState(() {
      _mode = next;
      _dragOffset = 0;
    });
    await Future<void>.delayed(const Duration(milliseconds: 30));
    if (mounted) setState(() => _blackout = false);
  }

  void _onDigit(int _) {
    if (_pinLength >= 4) return;
    final int next = _pinLength + 1;
    setState(() => _pinLength = next);
    if (next == 4) {
      _pinTimer?.cancel();
      _pinTimer = Timer(const Duration(milliseconds: 110), () {
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

  void _openRecent(LauncherItem item) {
    if (_recentTransitionApp != null) return;
    setState(() {
      _recentTransitionApp = item;
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
      duration: const Duration(milliseconds: 240),
      curve: Curves.easeInCubic,
    );
    _shadeTimer?.cancel();
    _shadeTimer = Timer(const Duration(milliseconds: 240), () {
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
    setState(() {
      _activeApp = settingsItem;
      _shadeOrigin = ShadeOrigin.app;
      _mode = LauncherMode.app;
      _dragOffset = 0;
      _shadeAnimation.value = 0;
    });
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
                    key: const ValueKey<String>('launcher-home'),
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
                child: _AppPreview(item: _activeApp!),
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
                  onEmpty: _showHome,
                ),
              ),
            if (showShade)
              FractionalTranslation(
                translation: Offset(0, shadeProgress - 1),
                child: Opacity(
                  opacity: 0.58 + shadeProgress * 0.42,
                  child: ControlShade(
                    contentOpacity: 0.35 + shadeProgress * 0.65,
                    contentScale: 0.92 + shadeProgress * 0.08,
                    onClose: _closeShade,
                    onSettings: _openSettings,
                  ),
                ),
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
                duration: const Duration(milliseconds: 170),
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
  const _AppPreview({required this.item});

  final LauncherItem item;

  @override
  Widget build(BuildContext context) {
    return Semantics(
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
  }
}

double mathMax(double a, double b) => a > b ? a : b;
