import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/launcher_app.dart';
import '../widgets/control_shade.dart';
import '../widgets/home_grid.dart';
import '../widgets/launch_overlay.dart';
import '../widgets/launcher_chrome.dart';
import '../widgets/recent_transition_overlay.dart';
import '../widgets/recents_view.dart';

class LauncherScreen extends StatefulWidget {
  const LauncherScreen({Key? key}) : super(key: key);

  @override
  State<LauncherScreen> createState() => _LauncherScreenState();
}

class _LauncherScreenState extends State<LauncherScreen> {
  final GlobalKey _surfaceKey = GlobalKey();

  LauncherMode _mode = LauncherMode.lock;
  ShadeOrigin _shadeOrigin = ShadeOrigin.home;
  LauncherItem? _activeApp;
  LauncherItem? _launchingApp;
  LauncherItem? _recentTransitionApp;
  bool _transitioningToOverview = false;
  Offset _launchOrigin = Offset.zero;
  int _pinLength = 0;
  bool _blackout = false;
  double _dragOffset = 0;
  int? _pointer;
  Offset _pointerStart = Offset.zero;
  String? _dragAxis;

  @override
  void initState() {
    super.initState();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  }

  bool get _canTrackPointer =>
      _launchingApp == null &&
      _recentTransitionApp == null &&
      (_mode == LauncherMode.lock ||
          _mode == LauncherMode.home ||
          _mode == LauncherMode.app ||
          _mode == LauncherMode.shade);

  void _onPointerDown(PointerDownEvent event) {
    if (!_canTrackPointer) return;
    _pointer = event.pointer;
    _pointerStart = event.position;
    _dragAxis = null;
  }

  void _onPointerMove(PointerMoveEvent event) {
    if (_pointer != event.pointer) return;
    final delta = event.position - _pointerStart;
    if (_dragAxis == null && (delta.dx.abs() > 7 || delta.dy.abs() > 7)) {
      _dragAxis = _mode == LauncherMode.home && delta.dx.abs() > delta.dy.abs()
          ? 'horizontal'
          : 'vertical';
    }
    if (_dragAxis != 'vertical') return;
    setState(() {
      if (_mode == LauncherMode.lock) _dragOffset = delta.dy.clamp(-240, 0);
      if (_mode == LauncherMode.home || _mode == LauncherMode.app)
        _dragOffset = delta.dy.clamp(-180, 260);
      if (_mode == LauncherMode.shade) _dragOffset = delta.dy.clamp(-240, 0);
    });
  }

  void _onPointerUp(PointerEvent event) {
    if (_pointer != event.pointer) return;
    final delta = event.position - _pointerStart;
    final wasVertical = _dragAxis == 'vertical';
    _pointer = null;
    _dragAxis = null;
    if (!wasVertical) {
      if (_dragOffset != 0) setState(() => _dragOffset = 0);
      return;
    }

    if (_mode == LauncherMode.lock && delta.dy < -64) {
      _transitionTo(LauncherMode.pin);
    } else if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
        delta.dy > 72) {
      setState(() {
        _shadeOrigin =
            _mode == LauncherMode.app ? ShadeOrigin.app : ShadeOrigin.home;
        _mode = LauncherMode.shade;
        _dragOffset = 0;
      });
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
    }
  }

  Future<void> _transitionTo(LauncherMode next) async {
    setState(() => _blackout = true);
    await Future<void>.delayed(const Duration(milliseconds: 180));
    if (!mounted) return;
    setState(() {
      _mode = next;
      _dragOffset = 0;
    });
    await Future<void>.delayed(const Duration(milliseconds: 30));
    if (mounted) setState(() => _blackout = false);
  }

  void _onDigit(int digit) {
    final next = _pinLength + 1;
    setState(() => _pinLength = next);
    if (next == 4) {
      Timer(const Duration(milliseconds: 110), () {
        if (mounted) _transitionTo(LauncherMode.home);
      });
    }
  }

  void _startLaunch(LauncherItem item, Offset globalOrigin) {
    if (_launchingApp != null) return;
    final box = _surfaceKey.currentContext?.findRenderObject() as RenderBox?;
    final localOrigin =
        box == null ? globalOrigin : box.globalToLocal(globalOrigin);
    setState(() {
      _launchOrigin = localOrigin;
      _launchingApp = item;
    });
  }

  void _finishLaunch() {
    final item = _launchingApp;
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
    setState(() {
      _recentTransitionApp = item;
      _transitioningToOverview = false;
    });
  }

  void _finishRecentTransition() {
    final item = _recentTransitionApp;
    if (item == null) return;
    setState(() {
      if (!_transitioningToOverview) {
        _activeApp = item;
        _shadeOrigin = ShadeOrigin.app;
        _mode = LauncherMode.app;
        _dragOffset = 0;
      }
      _recentTransitionApp = null;
    });
  }

  void _goHome() {
    setState(() {
      _activeApp = null;
      _shadeOrigin = ShadeOrigin.home;
      _mode = LauncherMode.home;
      _dragOffset = 0;
    });
  }

  void _closeShade() {
    setState(() {
      _mode = _shadeOrigin == ShadeOrigin.app && _activeApp != null
          ? LauncherMode.app
          : LauncherMode.home;
      _dragOffset = 0;
    });
  }

  void _openSettings() {
    setState(() {
      _activeApp = settingsItem;
      _shadeOrigin = ShadeOrigin.app;
      _mode = LauncherMode.app;
      _dragOffset = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    final darkStatus =
        _mode == LauncherMode.app && (_activeApp?.darkStatusBar ?? false);
    return Scaffold(
      body: Listener(
        onPointerDown: _onPointerDown,
        onPointerMove: _onPointerMove,
        onPointerUp: _onPointerUp,
        onPointerCancel: _onPointerUp,
        child: Stack(
          key: _surfaceKey,
          fit: StackFit.expand,
          children: <Widget>[
            Image.asset('assets/wallpaper.png', fit: BoxFit.cover),
            if (_mode == LauncherMode.app && _activeApp != null)
              Transform.translate(
                offset: Offset(0, _dragOffset * 0.08),
                child: _AppPreview(item: _activeApp!),
              ),
            if (_mode == LauncherMode.shade &&
                _shadeOrigin == ShadeOrigin.app &&
                _activeApp != null)
              _DimmedBackground(child: _AppPreview(item: _activeApp!)),
            Positioned(
              top: 40,
              bottom: 52,
              left: 0,
              right: 0,
              child: _buildContent(),
            ),
            if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
                _dragOffset > 0)
              Positioned(
                top: 40,
                bottom: 52,
                left: 0,
                right: 0,
                child: IgnorePointer(
                  child: FractionalTranslation(
                    translation: Offset(
                      0,
                      (_dragOffset / 220).clamp(0, 1) - 1,
                    ),
                    child: Opacity(
                      opacity: (0.42 + (_dragOffset / 220).clamp(0, 1) * 0.58)
                          .clamp(0, 1),
                      child: ControlShade(
                        onClose: _closeShade,
                        onSettings: _openSettings,
                      ),
                    ),
                  ),
                ),
              ),
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: LauncherStatusBar(dark: darkStatus),
            ),
            const Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: LauncherNavigationArea(),
            ),
            IgnorePointer(
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 180),
                opacity: _blackout ? 1 : 0,
                child: const ColoredBox(color: Color(0xFF021113)),
              ),
            ),
            if (_launchingApp != null)
              LaunchOverlay(
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
          ],
        ),
      ),
    );
  }

  Widget _buildContent() {
    switch (_mode) {
      case LauncherMode.lock:
        return LockView(dragOffset: _dragOffset);
      case LauncherMode.pin:
        return PinPadView(
          entered: _pinLength,
          onDigit: _onDigit,
          onCancel: () {
            setState(() => _pinLength = 0);
            _transitionTo(LauncherMode.lock);
          },
        );
      case LauncherMode.home:
        return Transform.translate(
          offset: Offset(0, _dragOffset * 0.12),
          child: HomeGrid(onLaunch: _startLaunch),
        );
      case LauncherMode.app:
        return const SizedBox.expand();
      case LauncherMode.shade:
        return Stack(
          fit: StackFit.expand,
          children: <Widget>[
            if (_shadeOrigin == ShadeOrigin.home)
              _DimmedBackground(
                child: HomeGrid(onLaunch: _startLaunch, background: true),
              )
            else
              const SizedBox.expand(),
            TweenAnimationBuilder<double>(
              tween: Tween<double>(
                begin: -1,
                end: (_dragOffset / 220).clamp(-1, 0),
              ),
              duration: _dragOffset == 0
                  ? const Duration(milliseconds: 430)
                  : Duration.zero,
              curve: Curves.easeOutCubic,
              builder: (context, value, child) => FractionalTranslation(
                translation: Offset(0, value),
                child: child,
              ),
              child: ControlShade(
                onClose: _closeShade,
                onSettings: _openSettings,
              ),
            ),
          ],
        );
      case LauncherMode.recents:
        return RecentsView(
          key: ValueKey<String?>(_activeApp?.id),
          initialActiveId: _activeApp?.id,
          onOpen: _openRecent,
          onEmpty: _goHome,
        );
    }
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

class _DimmedBackground extends StatelessWidget {
  const _DimmedBackground({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ColorFiltered(
      colorFilter: const ColorFilter.mode(Color(0x4A001416), BlendMode.srcATop),
      child: Transform.scale(
        scale: 1.04,
        child: Opacity(opacity: 0.78, child: child),
      ),
    );
  }
}
