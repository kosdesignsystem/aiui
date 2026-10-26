import 'dart:async';
import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/material.dart';

import 'models.dart';
import 'platform/my_phone_platform.dart';
import 'svg_icon.dart';

const _white = Color(0xfff8fbfb);
const _wallpaper = 'assets/launcher/wallpaper.png';
const _statusHeight = 40.0;
const _navHeight = 52.0;

class MyPhoneScreen extends StatefulWidget {
  const MyPhoneScreen({
    Key? key,
    required this.platformAdapter,
  }) : super(key: key);

  final MyPhonePlatformAdapter platformAdapter;

  @override
  State<MyPhoneScreen> createState() => _MyPhoneScreenState();
}

class _MyPhoneScreenState extends State<MyPhoneScreen>
    with TickerProviderStateMixin {
  LauncherMode _mode = LauncherMode.lock;
  LauncherMode _shadeOrigin = LauncherMode.home;
  LauncherApp? _activeApp;
  LauncherApp? _launchingApp;
  LauncherApp? _recentsTransitionApp;
  int _pinLength = 0;
  int _homePage = 0;
  double _dragOffset = 0;
  bool _isVerticalDragging = false;
  bool _isShadeClosing = false;
  List<LauncherApp> _recentItems = List<LauncherApp>.from(launchableApps);

  late final PageController _homeController;
  late final AnimationController _launchController;
  late final AnimationController _recentsTransitionController;
  int _launchToken = 0;
  Timer? _shadeTimer;

  @override
  void initState() {
    super.initState();
    _homeController = PageController();
    _launchController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 720),
    );
    _recentsTransitionController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 380),
    );
  }

  @override
  void dispose() {
    _homeController.dispose();
    _shadeTimer?.cancel();
    _launchController.dispose();
    _recentsTransitionController.dispose();
    super.dispose();
  }

  void _setMode(LauncherMode mode) {
    if (!mounted) return;
    setState(() {
      _mode = mode;
      _dragOffset = 0;
    });
  }

  void _showHome() {
    _launchToken++;
    _launchController.stop();
    _launchController.reset();
    _recentsTransitionController.stop();
    _recentsTransitionController.reset();
    _shadeTimer?.cancel();
    setState(() {
      _launchingApp = null;
      _recentsTransitionApp = null;
      _activeApp = null;
      _mode = LauncherMode.home;
      _shadeOrigin = LauncherMode.home;
      _homePage = 0;
      _dragOffset = 0;
      _isVerticalDragging = false;
      _isShadeClosing = false;
    });
    if (_homeController.hasClients) {
      _homeController.animateToPage(
        0,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
      );
    }
  }

  void _openShade() {
    setState(() {
      _shadeOrigin =
          _mode == LauncherMode.app ? LauncherMode.app : LauncherMode.home;
      _mode = LauncherMode.shade;
      _dragOffset = 0;
      _isShadeClosing = false;
    });
  }

  void _closeShade() {
    if (_isShadeClosing) return;
    final nextMode = _shadeOrigin == LauncherMode.app && _activeApp != null
        ? LauncherMode.app
        : LauncherMode.home;
    setState(() {
      _isShadeClosing = true;
      _isVerticalDragging = false;
      _dragOffset = -220;
    });
    _shadeTimer?.cancel();
    _shadeTimer = Timer(const Duration(milliseconds: 240), () {
      if (!mounted) return;
      setState(() {
        _mode = nextMode;
        _dragOffset = 0;
        _isShadeClosing = false;
      });
    });
  }

  void _openRecents() {
    final transitionApp = _mode == LauncherMode.app ? _activeApp : null;
    setState(() {
      _recentItems = List<LauncherApp>.from(launchableApps);
      _recentsTransitionApp = transitionApp;
      _mode = LauncherMode.recents;
      _dragOffset = 0;
    });
    if (transitionApp != null) {
      _recentsTransitionController.forward(from: 0).whenComplete(() {
        if (!mounted || _recentsTransitionApp?.id != transitionApp.id) return;
        setState(() => _recentsTransitionApp = null);
        _recentsTransitionController.reset();
      });
    }
  }

  Future<void> _launchApp(LauncherApp app) async {
    if (_launchingApp != null || !app.isLaunchable) return;
    final token = ++_launchToken;
    setState(() => _launchingApp = app);
    await _launchController.forward(from: 0);
    if (!mounted || token != _launchToken) return;
    setState(() {
      _activeApp = app;
      _launchingApp = null;
      _mode = LauncherMode.app;
      _shadeOrigin = LauncherMode.app;
    });
    _launchController.reset();
  }

  Future<void> _openSettingsAdapter() async {
    final handled = await widget.platformAdapter.openSystemSettings();
    if (!mounted || handled) return;
    final settings = launcherAppById('settings');
    setState(() {
      _activeApp = settings;
      _mode = LauncherMode.app;
      _shadeOrigin = LauncherMode.app;
      _dragOffset = 0;
    });
  }

  void _handleVerticalStart(DragStartDetails details) {
    setState(() {
      _dragOffset = 0;
      _isVerticalDragging = true;
    });
  }

  void _handleVerticalUpdate(DragUpdateDetails details) {
    final next = _dragOffset + details.delta.dy;
    setState(() {
      if (_mode == LauncherMode.lock || _mode == LauncherMode.shade) {
        _dragOffset = next.clamp(-220.0, 0.0).toDouble();
      } else {
        _dragOffset = next.clamp(-180.0, 260.0).toDouble();
      }
    });
  }

  void _handleVerticalEnd(DragEndDetails details) {
    final velocity = details.primaryVelocity ?? 0;
    setState(() => _isVerticalDragging = false);
    if (_mode == LauncherMode.lock && (_dragOffset < -64 || velocity < -520)) {
      _setMode(LauncherMode.pin);
      return;
    }
    if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
        (_dragOffset > 72 || velocity > 520)) {
      _openShade();
      return;
    }
    if ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
        (_dragOffset < -72 || velocity < -520)) {
      _openRecents();
      return;
    }
    if (_mode == LauncherMode.shade && (_dragOffset < -64 || velocity < -520)) {
      _closeShade();
      return;
    }
    setState(() => _dragOffset = 0);
  }

  void _enterDigit() {
    if (_pinLength >= 4) return;
    setState(() => _pinLength++);
    if (_pinLength == 4) {
      Timer(const Duration(milliseconds: 110), () {
        if (!mounted) return;
        setState(() {
          _pinLength = 0;
          _mode = LauncherMode.home;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FittedBox(
          fit: BoxFit.contain,
          child: SizedBox(width: 360, height: 800, child: _buildPhone()),
        ),
      ),
    );
  }

  Widget _buildPhone() {
    final canDrag = _mode == LauncherMode.lock ||
        _mode == LauncherMode.home ||
        _mode == LauncherMode.app ||
        _mode == LauncherMode.shade;
    return ClipRRect(
      borderRadius: BorderRadius.circular(32),
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onVerticalDragStart: canDrag ? _handleVerticalStart : null,
        onVerticalDragUpdate: canDrag ? _handleVerticalUpdate : null,
        onVerticalDragEnd: canDrag ? _handleVerticalEnd : null,
        child: ColoredBox(
          color: const Color(0xff082d30),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.asset(_wallpaper, fit: BoxFit.cover),
              _buildPrimarySurface(),
              if (_mode == LauncherMode.shade ||
                  ((_mode == LauncherMode.home || _mode == LauncherMode.app) &&
                      _dragOffset > 0))
                _buildShadeLayer(),
              _StatusBar(
                dark: _mode == LauncherMode.app &&
                    (_activeApp?.darkStatusBar ?? false),
              ),
              _SystemNavBar(onHome: _showHome),
              if (_recentsTransitionApp != null)
                _RecentEnterOverlay(
                  key: const Key('recent-enter-transition'),
                  app: _recentsTransitionApp!,
                  animation: _recentsTransitionController,
                ),
              if (_launchingApp != null)
                _LaunchOverlay(
                  app: _launchingApp!,
                  animation: _launchController,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPrimarySurface() {
    Widget child;
    switch (_mode) {
      case LauncherMode.lock:
        child = _LockScreen(dragOffset: _dragOffset);
        break;
      case LauncherMode.pin:
        child = _PinScreen(
          entered: _pinLength,
          onDigit: _enterDigit,
          onCancel: () {
            setState(() {
              _pinLength = 0;
              _mode = LauncherMode.lock;
            });
          },
        );
        break;
      case LauncherMode.home:
        child = _HomeScreen(
          controller: _homeController,
          page: _homePage,
          dragOffset: _dragOffset,
          onPageChanged: (page) => setState(() => _homePage = page),
          onLaunch: _launchApp,
        );
        break;
      case LauncherMode.app:
        child = _AppPreview(app: _activeApp!, dragOffset: _dragOffset);
        break;
      case LauncherMode.shade:
        child = _shadeOrigin == LauncherMode.app && _activeApp != null
            ? _AppPreview(app: _activeApp!, blurred: true)
            : _HomeScreen(
                controller: _homeController,
                page: _homePage,
                blurred: true,
                onPageChanged: (page) => _homePage = page,
                onLaunch: _launchApp,
              );
        break;
      case LauncherMode.recents:
        child = _RecentsScreen(
          items: _recentItems,
          initialApp: _activeApp,
          transitioningAppId: _recentsTransitionApp?.id,
          onOpen: _launchApp,
          onDismiss: (app) {
            final nextItems = _recentItems
                .where((item) => item.id != app.id)
                .toList(growable: true);
            setState(() => _recentItems = nextItems);
            if (nextItems.isEmpty) _showHome();
          },
          onCloseAll: _showHome,
        );
        break;
    }
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 240),
      switchInCurve: Curves.easeOutCubic,
      switchOutCurve: Curves.easeIn,
      layoutBuilder: (currentChild, previousChildren) {
        return Stack(
          fit: StackFit.expand,
          clipBehavior: Clip.none,
          children: <Widget>[
            ...previousChildren,
            if (currentChild != null) currentChild,
          ],
        );
      },
      transitionBuilder: (switcherChild, animation) {
        final scale = Tween<double>(begin: 0.985, end: 1).animate(
          CurvedAnimation(parent: animation, curve: Curves.easeOutCubic),
        );
        return FadeTransition(
          opacity: animation,
          child: ScaleTransition(scale: scale, child: switcherChild),
        );
      },
      child: KeyedSubtree(key: ValueKey<LauncherMode>(_mode), child: child),
    );
  }

  Widget _buildShadeLayer() {
    final isPreview = _mode != LauncherMode.shade;
    final progress =
        isPreview ? (_dragOffset / 220).clamp(0.0, 1.0).toDouble() : 1.0;
    final closeProgress = _mode == LauncherMode.shade
        ? (1 + _dragOffset / 220).clamp(0.0, 1.0).toDouble()
        : progress;
    return AnimatedPositioned(
      duration: _isVerticalDragging
          ? Duration.zero
          : Duration(milliseconds: _isShadeClosing ? 240 : 280),
      curve: _isShadeClosing ? Curves.easeInCubic : Curves.easeOutCubic,
      left: 0,
      right: 0,
      top: (closeProgress - 1) * 800,
      height: 800,
      child: Opacity(
        opacity: 0.58 + closeProgress * 0.42,
        child: IgnorePointer(
          ignoring: isPreview,
          child: ControlShade(
            platformAdapter: widget.platformAdapter,
            onClose: _closeShade,
            onSettings: _openSettingsAdapter,
          ),
        ),
      ),
    );
  }
}

class _PhoneViewport extends StatelessWidget {
  const _PhoneViewport({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: _statusHeight,
        bottom: _navHeight,
      ),
      child: SizedBox.expand(child: child),
    );
  }
}

class _StatusBar extends StatelessWidget {
  const _StatusBar({required this.dark});

  final bool dark;

  @override
  Widget build(BuildContext context) {
    final color = dark ? const Color(0xff23282f) : Colors.white;
    return Positioned(
      left: 0,
      top: 0,
      right: 0,
      height: _statusHeight,
      child: Semantics(
        label: 'Время 13:52, заряд 98%',
        child: Padding(
          padding: const EdgeInsets.only(left: 48, right: 18),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('13:52',
                  style: TextStyle(
                      color: color, fontSize: 12, fontWeight: FontWeight.w500)),
              Row(
                children: [
                  AssetSvg('assets/icons/signal-cellular-100.svg',
                      size: 14, color: color),
                  const SizedBox(width: 4),
                  AssetSvg('assets/icons/wifi.svg', size: 14, color: color),
                  const SizedBox(width: 4),
                  AssetSvg('assets/icons/battery-charge-medium.svg',
                      size: 14, color: color),
                  const SizedBox(width: 4),
                  Text('98%',
                      style: TextStyle(
                          color: color,
                          fontSize: 12,
                          fontWeight: FontWeight.w500)),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SystemNavBar extends StatelessWidget {
  const _SystemNavBar({required this.onHome});

  final VoidCallback onHome;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: 0,
      right: 0,
      bottom: 0,
      height: _navHeight,
      child: Center(
        child: IconButton(
          key: const Key('system-home'),
          tooltip: 'Домой',
          onPressed: onHome,
          icon: const AssetSvg('assets/icons/mobile-home.svg',
              size: 24, color: Colors.white),
        ),
      ),
    );
  }
}

class _ClockBlock extends StatelessWidget {
  const _ClockBlock();

  @override
  Widget build(BuildContext context) {
    return const Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          '13:52',
          style: TextStyle(
            fontFamily: 'KasperskySansClock',
            fontSize: 72,
            height: 1,
            letterSpacing: -2,
            fontWeight: FontWeight.w400,
          ),
        ),
        SizedBox(height: 5),
        Text(
          'Понедельник, 24 июня',
          style: TextStyle(fontSize: 14, color: Color(0xb8ffffff)),
        ),
      ],
    );
  }
}

class _LockScreen extends StatelessWidget {
  const _LockScreen({required this.dragOffset});

  final double dragOffset;

  @override
  Widget build(BuildContext context) {
    final opacity = (1 + dragOffset / 250).clamp(0.0, 1.0).toDouble();
    return _PhoneViewport(
      child: Opacity(
        opacity: opacity,
        child: Transform.translate(
          offset: Offset(0, dragOffset * 0.28),
          child: const Padding(
            padding: EdgeInsets.fromLTRB(0, 70, 0, 12),
            child: Column(
              children: [
                AssetSvg('assets/icons/lock.svg',
                    size: 20, color: Colors.white),
                SizedBox(height: 23),
                _ClockBlock(),
                Spacer(),
                AssetSvg(
                  'assets/extracted/unlock-handle.svg',
                  key: Key('unlock-handle'),
                  width: 72,
                  height: 11,
                ),
                SizedBox(height: 21),
                Text(
                  'Проведите вверх',
                  key: Key('unlock-hint'),
                  style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Color(0x30ffffff)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _PinScreen extends StatelessWidget {
  const _PinScreen({
    required this.entered,
    required this.onDigit,
    required this.onCancel,
  });

  final int entered;
  final VoidCallback onDigit;
  final VoidCallback onCancel;

  @override
  Widget build(BuildContext context) {
    const digits = <int>[1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return _PhoneViewport(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(22, 54, 22, 10),
        child: Column(
          children: [
            const AssetSvg('assets/icons/lock.svg',
                size: 22, color: Colors.white),
            const SizedBox(height: 28),
            const Text('Введите код-пароль',
                key: Key('pin-title'),
                style: TextStyle(
                    fontSize: 20, height: 1.4, fontWeight: FontWeight.w500)),
            const SizedBox(height: 22),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List<Widget>.generate(4, (index) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  width: 12,
                  height: 12,
                  margin: const EdgeInsets.symmetric(horizontal: 6.5),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: index < entered
                        ? Colors.white
                        : const Color(0x52ffffff),
                  ),
                );
              }),
            ),
            const SizedBox(height: 18),
            TextButton(
                onPressed: () {},
                child: const Text('Не помню',
                    style: TextStyle(
                        color: Colors.white, fontWeight: FontWeight.w500))),
            const SizedBox(height: 12),
            SizedBox(
              width: 264,
              height: 330,
              child: Wrap(
                alignment: WrapAlignment.center,
                spacing: 24,
                runSpacing: 14,
                children: digits.map((digit) {
                  if (digit == 0) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [_PinKey(digit: digit, onPressed: onDigit)],
                    );
                  }
                  return _PinKey(digit: digit, onPressed: onDigit);
                }).toList(),
              ),
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton(
                    onPressed: () {},
                    child: const Text('SOS',
                        style: TextStyle(color: Colors.white))),
                TextButton(
                    key: const Key('pin-cancel'),
                    onPressed: onCancel,
                    child: const Text('Отменить',
                        style: TextStyle(color: Colors.white))),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _PinKey extends StatelessWidget {
  const _PinKey({required this.digit, required this.onPressed});

  final int digit;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 72,
      height: 72,
      child: _PressScale(
        pressedScale: 0.94,
        child: Material(
          color: const Color(0x33dbebec),
          borderRadius: BorderRadius.circular(22),
          child: InkWell(
            key: Key('pin-$digit'),
            borderRadius: BorderRadius.circular(22),
            onTap: onPressed,
            child: Center(
              child: Text(
                '$digit',
                style: const TextStyle(
                    fontFamily: 'KasperskySansClock', fontSize: 32),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _HomeScreen extends StatelessWidget {
  const _HomeScreen({
    required this.controller,
    required this.page,
    required this.onPageChanged,
    required this.onLaunch,
    this.dragOffset = 0,
    this.blurred = false,
  });

  final PageController controller;
  final int page;
  final ValueChanged<int> onPageChanged;
  final ValueChanged<LauncherApp> onLaunch;
  final double dragOffset;
  final bool blurred;

  @override
  Widget build(BuildContext context) {
    Widget content = _PhoneViewport(
      child: Transform.translate(
        offset: Offset(0, dragOffset * 0.12),
        child: Padding(
          padding: const EdgeInsets.only(bottom: 18),
          child: Column(
            children: [
              Expanded(
                child: PageView.builder(
                  key: const Key('home-pages'),
                  controller: controller,
                  onPageChanged: onPageChanged,
                  itemCount: homePages.length,
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
                            mainAxisExtent: 101,
                            crossAxisSpacing: 0,
                            mainAxisSpacing: 0,
                          ),
                          itemCount: homePages[pageIndex].length,
                          itemBuilder: (context, index) {
                            final app = homePages[pageIndex][index];
                            return _AppButton(
                              app: app,
                              onPressed:
                                  app.isLaunchable ? () => onLaunch(app) : null,
                            );
                          },
                        ),
                      ),
                    );
                  },
                ),
              ),
              SizedBox(
                height: 16,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List<Widget>.generate(homePages.length, (index) {
                    return Semantics(
                      label: 'Перейти на страницу ${index + 1}',
                      button: true,
                      child: GestureDetector(
                        onTap: () => controller.animateToPage(
                          index,
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeOutCubic,
                        ),
                        child: Container(
                          width: index == page ? 7 : 6,
                          height: index == page ? 7 : 6,
                          margin: const EdgeInsets.symmetric(horizontal: 6),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: index == page
                                ? Colors.white
                                : const Color(0x5cffffff),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ],
          ),
        ),
      ),
    );
    if (blurred) {
      content = ImageFiltered(
        imageFilter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
        child: Opacity(
            opacity: 0.72,
            child: Transform.scale(scale: 1.025, child: content)),
      );
    }
    return content;
  }
}

class _AppButton extends StatelessWidget {
  const _AppButton({required this.app, required this.onPressed});

  final LauncherApp app;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: app.isLaunchable ? app.label : '${app.label}, недоступно',
      button: app.isLaunchable,
      enabled: app.isLaunchable,
      child: _PressScale(
        pressedScale: app.isLaunchable ? 0.91 : 1,
        child: InkWell(
          key: Key('app-${app.id}'),
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Image.asset(app.icon, width: 58, height: 58),
              const SizedBox(height: 7),
              SizedBox(
                width: 76,
                child: Text(
                  app.label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 12, height: 1.16, shadows: [
                    Shadow(
                        blurRadius: 4,
                        color: Color(0xff000011),
                        offset: Offset(0, 1))
                  ]),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AppPreview extends StatelessWidget {
  const _AppPreview(
      {required this.app, this.dragOffset = 0, this.blurred = false});

  final LauncherApp app;
  final double dragOffset;
  final bool blurred;

  @override
  Widget build(BuildContext context) {
    Widget image = Semantics(
      label: 'Приложение «${app.label}»',
      image: true,
      child: Image.asset(app.preview!, fit: BoxFit.cover),
    );
    if (blurred) {
      image = ImageFiltered(
        imageFilter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
        child: Opacity(
            opacity: 0.76, child: Transform.scale(scale: 1.025, child: image)),
      );
    }
    return Transform.translate(
        offset: Offset(0, dragOffset * 0.08), child: image);
  }
}

class _LaunchOverlay extends StatelessWidget {
  const _LaunchOverlay({required this.app, required this.animation});

  final LauncherApp app;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        final value = Curves.easeOutCubic.transform(animation.value);
        final showLoader = animation.value > 0.42;
        return Positioned.fill(
          child: ColoredBox(
            color: Color.lerp(
              const Color(0x00091215),
              const Color(0xff091215),
              (value * 1.45).clamp(0.0, 1.0).toDouble(),
            )!,
            child: Center(
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 120),
                opacity: showLoader ? 0 : 1,
                child: Transform.scale(
                  scale: 1 + value * 0.35,
                  child: Image.asset(app.icon, width: 58, height: 58),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class _RecentEnterOverlay extends StatelessWidget {
  const _RecentEnterOverlay({
    Key? key,
    required this.app,
    required this.animation,
  }) : super(key: key);

  final LauncherApp app;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: animation,
      builder: (context, child) {
        final progress = Curves.easeOutCubic.transform(animation.value);
        final rect = Rect.lerp(
          const Rect.fromLTWH(0, 0, 360, 800),
          const Rect.fromLTWH(69, 197, 222, 494),
          progress,
        )!;
        return Positioned(
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(18 * progress),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: progress > 0.2
                    ? const [
                        BoxShadow(
                          color: Color(0x61000000),
                          blurRadius: 52,
                          offset: Offset(0, 22),
                        ),
                      ]
                    : null,
              ),
              child: Image.asset(app.preview!, fit: BoxFit.cover),
            ),
          ),
        );
      },
    );
  }
}

class _RecentsScreen extends StatefulWidget {
  const _RecentsScreen({
    Key? key,
    required this.items,
    required this.initialApp,
    required this.transitioningAppId,
    required this.onOpen,
    required this.onDismiss,
    required this.onCloseAll,
  }) : super(key: key);

  final List<LauncherApp> items;
  final LauncherApp? initialApp;
  final String? transitioningAppId;
  final ValueChanged<LauncherApp> onOpen;
  final ValueChanged<LauncherApp> onDismiss;
  final VoidCallback onCloseAll;

  @override
  State<_RecentsScreen> createState() => _RecentsScreenState();
}

class _RecentsScreenState extends State<_RecentsScreen> {
  late final PageController _controller;
  late int _page;
  String? _promotedAppId;
  bool _promotedFromRight = true;
  int _promotionEpoch = 0;
  Timer? _promotionTimer;

  @override
  void initState() {
    super.initState();
    final initialIndex = widget.initialApp == null
        ? 0
        : widget.items.indexWhere((item) => item.id == widget.initialApp!.id);
    _page = initialIndex < 0 ? 0 : initialIndex;
    _controller = PageController(initialPage: _page, viewportFraction: 0.68);
  }

  @override
  void dispose() {
    _promotionTimer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant _RecentsScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.items.length <= widget.items.length || widget.items.isEmpty) {
      return;
    }
    final targetPage = _page.clamp(0, widget.items.length - 1).toInt();
    _page = targetPage;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !_controller.hasClients) return;
      _controller.animateToPage(
        targetPage,
        duration: const Duration(milliseconds: 290),
        curve: Curves.easeOutCubic,
      );
    });
  }

  void _preparePromotion(int index) {
    if (_promotedAppId != null) return;
    final hasNext = index + 1 < widget.items.length;
    final promoted = hasNext
        ? widget.items[index + 1]
        : index > 0
            ? widget.items[index - 1]
            : null;
    if (promoted != null) {
      setState(() {
        _promotedAppId = promoted.id;
        _promotedFromRight = hasNext;
        _promotionEpoch++;
      });
      _promotionTimer?.cancel();
      _promotionTimer = Timer(const Duration(milliseconds: 600), () {
        if (mounted && _promotedAppId == promoted.id) {
          setState(() => _promotedAppId = null);
        }
      });
    }
  }

  void _dismissApp(LauncherApp app) {
    widget.onDismiss(app);
  }

  @override
  Widget build(BuildContext context) {
    return _PhoneViewport(
      child: DecoratedBox(
        decoration: const BoxDecoration(
          color: Color(0x4a01101d),
          image: DecorationImage(
              image: AssetImage(_wallpaper), fit: BoxFit.cover, opacity: 0.76),
        ),
        child: Column(
          children: [
            const SizedBox(height: 18),
            TextButton(
              key: const Key('close-all'),
              onPressed: widget.onCloseAll,
              child: const Text('Закрыть все',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w400)),
            ),
            Expanded(
              child: Stack(
                clipBehavior: Clip.none,
                children: [
                  Positioned.fill(
                    child: PageView.builder(
                      key: const Key('recent-pages'),
                      controller: _controller,
                      clipBehavior: Clip.none,
                      itemCount: widget.items.length,
                      onPageChanged: (value) => setState(() => _page = value),
                      itemBuilder: (context, index) {
                        final app = widget.items[index];
                        final active = index == _page;
                        Widget card = AnimatedScale(
                          duration: const Duration(milliseconds: 180),
                          curve: Curves.easeOutCubic,
                          scale: active ? 1 : 0.84,
                          child: AnimatedOpacity(
                            duration: const Duration(milliseconds: 180),
                            opacity: active ? 1 : 0.7,
                            child: Dismissible(
                              key: ValueKey<String>('recent-${app.id}'),
                              direction: DismissDirection.up,
                              dismissThresholds: const {
                                DismissDirection.up: 0.18
                              },
                              movementDuration:
                                  const Duration(milliseconds: 240),
                              resizeDuration: const Duration(milliseconds: 170),
                              onUpdate: (details) {
                                if (details.progress >= 0.18) {
                                  _preparePromotion(index);
                                }
                              },
                              confirmDismiss: (_) async {
                                _preparePromotion(index);
                                return true;
                              },
                              onDismissed: (_) => _dismissApp(app),
                              child: InkWell(
                                onTap: () => widget.onOpen(app),
                                borderRadius: BorderRadius.circular(18),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.asset(app.icon,
                                        width: 34, height: 34),
                                    const SizedBox(height: 12),
                                    Container(
                                      width: 222,
                                      height: 494,
                                      clipBehavior: Clip.antiAlias,
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.circular(18),
                                        boxShadow: const [
                                          BoxShadow(
                                              color: Color(0x61000000),
                                              blurRadius: 52,
                                              offset: Offset(0, 22))
                                        ],
                                      ),
                                      child: Opacity(
                                        opacity:
                                            widget.transitioningAppId == app.id
                                                ? 0
                                                : 1,
                                        child: Image.asset(
                                          app.preview!,
                                          fit: BoxFit.cover,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                        return card;
                      },
                    ),
                  ),
                  if (_promotedAppId != null)
                    Positioned.fill(
                      child: IgnorePointer(
                        child: KeyedSubtree(
                          key: Key('promoted-$_promotedAppId'),
                          child: _PromotedRecentOverlay(
                            key: ValueKey<String>(
                                'promotion-$_promotionEpoch-$_promotedAppId'),
                            app: launcherAppById(_promotedAppId!),
                            fromRight: _promotedFromRight,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 12),
          ],
        ),
      ),
    );
  }
}

class _PromotedRecentOverlay extends StatelessWidget {
  const _PromotedRecentOverlay({
    Key? key,
    required this.app,
    required this.fromRight,
  }) : super(key: key);

  final LauncherApp app;
  final bool fromRight;

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween<double>(begin: 0, end: 1),
      duration: const Duration(milliseconds: 380),
      curve: Curves.easeOutCubic,
      builder: (context, value, child) {
        final direction = fromRight ? 1.0 : -1.0;
        return Opacity(
          opacity: 0.7 + value * 0.3,
          child: Transform.translate(
            offset: Offset(direction * (1 - value) * 88, 0),
            child: Transform.scale(
              scale: 0.94 + value * 0.06,
              child: child,
            ),
          ),
        );
      },
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(app.icon, width: 34, height: 34),
          const SizedBox(height: 12),
          Container(
            width: 222,
            height: 494,
            clipBehavior: Clip.antiAlias,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              boxShadow: const [
                BoxShadow(
                  color: Color(0x61000000),
                  blurRadius: 52,
                  offset: Offset(0, 22),
                ),
              ],
            ),
            child: Image.asset(app.preview!, fit: BoxFit.cover),
          ),
        ],
      ),
    );
  }
}

class ControlShade extends StatefulWidget {
  const ControlShade({
    Key? key,
    required this.platformAdapter,
    required this.onClose,
    required this.onSettings,
  }) : super(key: key);

  final MyPhonePlatformAdapter platformAdapter;
  final VoidCallback onClose;
  final VoidCallback onSettings;

  @override
  State<ControlShade> createState() => _ControlShadeState();
}

class _ControlShadeState extends State<ControlShade> {
  bool mobileEnabled = true;
  bool wifiEnabled = false;
  bool airplane = false;
  bool location = true;
  bool silent = true;
  bool flashlight = false;
  double volume = 100;
  double brightness = 46;

  void _toggle(
    MyPhoneSystemToggle toggle,
    bool currentValue,
    void Function(bool value) update,
  ) {
    final nextValue = !currentValue;
    setState(() => update(nextValue));
    widget.platformAdapter.setToggle(toggle, nextValue);
  }

  void _setVolume(double value) {
    setState(() => volume = value);
    widget.platformAdapter.setVolume(value);
  }

  void _setBrightness(double value) {
    setState(() => brightness = value);
    widget.platformAdapter.setBrightness(value);
  }

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 28, sigmaY: 28),
        child: ColoredBox(
          color: const Color(0x7a05272a),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 102, 16, 70),
            child: Column(
              children: [
                const _ClockBlock(),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Expanded(
                      child: _NetworkToggle(
                        key: const Key('mobile-toggle'),
                        active: mobileEnabled,
                        label: 'Моб. интернет',
                        detail: mobileEnabled ? 'Megafon LTE' : 'Выключено',
                        icon: 'assets/extracted/cellular-toggle.svg',
                        motion: _ToggleMotion.cellular,
                        onTap: () => _toggle(
                          MyPhoneSystemToggle.mobileData,
                          mobileEnabled,
                          (value) => mobileEnabled = value,
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: _NetworkToggle(
                        key: const Key('wifi-toggle'),
                        active: wifiEnabled,
                        label: 'Wi-Fi',
                        detail: wifiEnabled ? 'KLCorp' : 'Выключено',
                        icon: wifiEnabled
                            ? 'assets/extracted/wifi-toggle-on.svg'
                            : 'assets/extracted/wifi-toggle-off.svg',
                        motion: _ToggleMotion.wifi,
                        onTap: () => _toggle(
                          MyPhoneSystemToggle.wifi,
                          wifiEnabled,
                          (value) => wifiEnabled = value,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 25),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _QuickToggle(
                        label: 'Режим полета',
                        active: airplane,
                        icon: 'assets/icons/avia.svg',
                        accent: const Color(0xffd9a832),
                        motion: _ToggleMotion.airplane,
                        onTap: () => _toggle(MyPhoneSystemToggle.airplaneMode,
                            airplane, (value) => airplane = value)),
                    _QuickToggle(
                        label: 'Геолокация',
                        active: location,
                        icon: location
                            ? 'assets/icons/place.svg'
                            : 'assets/icons/place-off.svg',
                        accent: const Color(0xff287de0),
                        motion: _ToggleMotion.location,
                        onTap: () => _toggle(MyPhoneSystemToggle.location,
                            location, (value) => location = value)),
                    _QuickToggle(
                        label: 'Без звука',
                        active: silent,
                        icon: silent
                            ? 'assets/icons/notification-off.svg'
                            : 'assets/icons/notification-active.svg',
                        accent: const Color(0xffd63d4d),
                        motion: _ToggleMotion.bell,
                        onTap: () => _toggle(MyPhoneSystemToggle.silentMode,
                            silent, (value) => silent = value)),
                    _QuickToggle(
                        label: 'Фонарик',
                        active: flashlight,
                        icon: flashlight
                            ? 'assets/icons/lighter.svg'
                            : 'assets/icons/lighter-outline.svg',
                        accent: const Color(0xff716cea),
                        motion: _ToggleMotion.flashlight,
                        onTap: () => _toggle(MyPhoneSystemToggle.flashlight,
                            flashlight, (value) => flashlight = value)),
                  ],
                ),
                const SizedBox(height: 25),
                _ShadeSlider(
                  key: const Key('volume-slider'),
                  value: volume,
                  label: 'Громкость',
                  startIcon: 'assets/icons/volume-0.svg',
                  endIcon: 'assets/icons/volume-100.svg',
                  onChanged: _setVolume,
                ),
                const SizedBox(height: 25),
                _ShadeSlider(
                  key: const Key('brightness-slider'),
                  value: brightness,
                  label: 'Яркость',
                  startIcon: 'assets/icons/brightness-low-outline.svg',
                  endIcon: 'assets/icons/brightness.svg',
                  onChanged: _setBrightness,
                ),
                const Spacer(),
                Semantics(
                  button: true,
                  label: 'Перейти в настройки',
                  child: InkWell(
                    key: const Key('open-settings'),
                    onTap: widget.onSettings,
                    child: const SizedBox(
                      height: 22,
                      child: Center(
                        child: Text(
                          'Перейти в настройки',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            height: 1.375,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Semantics(
                  button: true,
                  label: 'Закрыть панель',
                  child: InkWell(
                    key: const Key('close-shade'),
                    onTap: widget.onClose,
                    child: const SizedBox(
                      height: 28,
                      width: double.infinity,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _NetworkToggle extends StatelessWidget {
  const _NetworkToggle({
    Key? key,
    required this.active,
    required this.label,
    required this.detail,
    required this.icon,
    required this.motion,
    required this.onTap,
  }) : super(key: key);

  final bool active;
  final String label;
  final String detail;
  final String icon;
  final _ToggleMotion motion;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final color = active ? Colors.white : const Color(0x8affffff);
    return _PressScale(
      pressedScale: 0.97,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        decoration: BoxDecoration(
          color: active ? const Color(0xff2687ee) : const Color(0x33dbebec),
          borderRadius: BorderRadius.circular(17),
          boxShadow: active
              ? const [
                  BoxShadow(
                    color: Color(0x38105dac),
                    blurRadius: 18,
                    offset: Offset(0, 7),
                  ),
                ]
              : null,
        ),
        child: Material(
          type: MaterialType.transparency,
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(17),
            child: SizedBox(
              height: 102,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(13, 14, 13, 13),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _AnimatedToggleIcon(
                      active: active,
                      asset: icon,
                      color: color,
                      motion: motion,
                      size: 30,
                    ),
                    const SizedBox(height: 2),
                    AnimatedDefaultTextStyle(
                      duration: const Duration(milliseconds: 180),
                      style: TextStyle(
                        color: color,
                        fontSize: 17,
                        height: 1.2,
                        fontWeight: FontWeight.w600,
                      ),
                      child: Text(label, maxLines: 1, softWrap: false),
                    ),
                    AnimatedSwitcher(
                      duration: const Duration(milliseconds: 180),
                      transitionBuilder: (child, animation) => FadeTransition(
                        opacity: animation,
                        child: SlideTransition(
                          position: Tween<Offset>(
                            begin: const Offset(0, 0.18),
                            end: Offset.zero,
                          ).animate(animation),
                          child: child,
                        ),
                      ),
                      child: Text(
                        detail,
                        key: ValueKey<String>(detail),
                        maxLines: 1,
                        softWrap: false,
                        style:
                            TextStyle(color: color, fontSize: 14, height: 1.15),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _QuickToggle extends StatelessWidget {
  const _QuickToggle({
    required this.label,
    required this.active,
    required this.icon,
    required this.accent,
    required this.motion,
    required this.onTap,
  });

  final String label;
  final bool active;
  final String icon;
  final Color accent;
  final _ToggleMotion motion;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 68,
      child: _PressScale(
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(18),
          child: Column(
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                curve: Curves.easeOutCubic,
                width: 68,
                height: 68,
                decoration: BoxDecoration(
                  color: active ? _white : const Color(0x47ddecee),
                  borderRadius: BorderRadius.circular(18),
                  boxShadow: active
                      ? const [
                          BoxShadow(
                              color: Color(0x26000000),
                              blurRadius: 22,
                              offset: Offset(0, 8))
                        ]
                      : null,
                ),
                child: Center(
                  child: _AnimatedToggleIcon(
                    active: active,
                    asset: icon,
                    color: active ? accent : const Color(0x94ffffff),
                    motion: motion,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: 84,
                child: AnimatedDefaultTextStyle(
                  duration: const Duration(milliseconds: 180),
                  style: TextStyle(
                    fontSize: 12,
                    height: 1.25,
                    color: active ? Colors.white : const Color(0x94ffffff),
                  ),
                  child: Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.visible,
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ShadeSlider extends StatelessWidget {
  const _ShadeSlider({
    Key? key,
    required this.value,
    required this.label,
    required this.startIcon,
    required this.endIcon,
    required this.onChanged,
  }) : super(key: key);

  final double value;
  final String label;
  final String startIcon;
  final String endIcon;
  final ValueChanged<double> onChanged;

  @override
  Widget build(BuildContext context) {
    final startDark = value >= 9;
    final endDark = value >= 91;
    return Semantics(
      label: label,
      value: '${value.round()}%',
      slider: true,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Container(
              height: 51,
              decoration: BoxDecoration(
                  color: const Color(0x38ffffff),
                  borderRadius: BorderRadius.circular(13))),
          AnimatedPositioned(
            duration: const Duration(milliseconds: 150),
            curve: Curves.easeOutCubic,
            left: 0,
            top: 0,
            bottom: 0,
            right: (328 * (100 - value) / 100).clamp(0.0, 328.0).toDouble(),
            child: ClipRRect(
                borderRadius: BorderRadius.circular(13),
                child: const ColoredBox(color: Colors.white)),
          ),
          Positioned(
              left: 20,
              child: _AnimatedSliderIcon(
                asset: startIcon,
                dark: startDark,
              )),
          Positioned(
              right: 20,
              child: _AnimatedSliderIcon(
                asset: endIcon,
                dark: endDark,
              )),
          Positioned.fill(
            child: SliderTheme(
              data: SliderTheme.of(context).copyWith(
                activeTrackColor: Colors.transparent,
                inactiveTrackColor: Colors.transparent,
                thumbColor: Colors.transparent,
                overlayColor: Colors.transparent,
                trackHeight: 51,
                thumbShape: const RoundSliderThumbShape(
                    enabledThumbRadius: 1.5, elevation: 0),
                overlayShape: SliderComponentShape.noOverlay,
              ),
              child:
                  Slider(value: value, min: 0, max: 100, onChanged: onChanged),
            ),
          ),
        ],
      ),
    );
  }
}

class _PressScale extends StatefulWidget {
  const _PressScale({
    required this.child,
    this.pressedScale = 0.96,
  });

  final Widget child;
  final double pressedScale;

  @override
  State<_PressScale> createState() => _PressScaleState();
}

class _PressScaleState extends State<_PressScale> {
  bool _pressed = false;

  void _setPressed(bool value) {
    if (_pressed == value) return;
    setState(() => _pressed = value);
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: (_) => _setPressed(true),
      onPointerUp: (_) => _setPressed(false),
      onPointerCancel: (_) => _setPressed(false),
      child: AnimatedScale(
        scale: _pressed ? widget.pressedScale : 1,
        duration: const Duration(milliseconds: 90),
        curve: Curves.easeOut,
        child: widget.child,
      ),
    );
  }
}

enum _ToggleMotion { cellular, wifi, airplane, location, bell, flashlight }

class _AnimatedToggleIcon extends StatefulWidget {
  const _AnimatedToggleIcon({
    required this.active,
    required this.asset,
    required this.color,
    required this.motion,
    this.size = 22,
  });

  final bool active;
  final String asset;
  final Color color;
  final _ToggleMotion motion;
  final double size;

  @override
  State<_AnimatedToggleIcon> createState() => _AnimatedToggleIconState();
}

class _AnimatedToggleIconState extends State<_AnimatedToggleIcon>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
      value: 1,
    );
  }

  @override
  void didUpdateWidget(covariant _AnimatedToggleIcon oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.active != widget.active || oldWidget.asset != widget.asset) {
      _controller.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final t = _controller.value;
        final ease = Curves.easeOutCubic.transform(t);
        var dx = 0.0;
        var dy = 0.0;
        var rotation = 0.0;
        var scale = 1.0;
        var opacity = 1.0;

        switch (widget.motion) {
          case _ToggleMotion.cellular:
          case _ToggleMotion.wifi:
            scale = 0.55 + ease * 0.45;
            opacity = 0.2 + ease * 0.8;
            break;
          case _ToggleMotion.airplane:
            dx = (widget.active ? -10 : 10) * (1 - ease);
            scale = 0.9 + ease * 0.1;
            opacity = 0.2 + ease * 0.8;
            break;
          case _ToggleMotion.location:
            dy = widget.active
                ? -7 * (1 - ease)
                : -3 * math.sin(t * math.pi) * (1 - t);
            scale = 0.88 + ease * 0.12;
            opacity = 0.3 + ease * 0.7;
            break;
          case _ToggleMotion.bell:
            rotation = math.sin(t * math.pi * 4) * (1 - t) * 0.14;
            scale = 1 + math.sin(t * math.pi) * 0.04;
            break;
          case _ToggleMotion.flashlight:
            rotation = (widget.active ? -0.09 : 0.07) * (1 - ease);
            dy = widget.active ? 1.5 * (1 - ease) : -1 * (1 - ease);
            scale = 0.93 + ease * 0.07;
            break;
        }

        final pulseOpacity = _controller.isAnimating ? (1 - t) * 0.34 : 0.0;
        return SizedBox(
          width: widget.size,
          height: widget.size,
          child: Stack(
            clipBehavior: Clip.none,
            alignment: Alignment.center,
            children: [
              if (widget.motion == _ToggleMotion.flashlight &&
                  _controller.isAnimating)
                Transform.scale(
                  alignment: Alignment.topCenter,
                  scaleY: 0.2 + t * 1.1,
                  child: Opacity(
                    opacity: math.sin(t * math.pi).clamp(0.0, 1.0),
                    child: Container(
                      width: 18,
                      height: 34,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            Color.lerp(Colors.transparent, widget.color, 0.34)!,
                            Colors.transparent
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              Transform.scale(
                scale: 0.55 + t * 0.85,
                child: Opacity(
                  opacity: pulseOpacity,
                  child: Container(
                    width: widget.size + 6,
                    height: widget.size + 6,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: widget.color, width: 1.5),
                    ),
                  ),
                ),
              ),
              Opacity(
                opacity: opacity,
                child: Transform.translate(
                  offset: Offset(dx, dy),
                  child: Transform.rotate(
                    angle: rotation,
                    child: Transform.scale(
                      scale: scale,
                      child: AnimatedSwitcher(
                        duration: const Duration(milliseconds: 180),
                        transitionBuilder: (switcherChild, animation) {
                          return FadeTransition(
                            opacity: animation,
                            child: ScaleTransition(
                              scale: Tween<double>(begin: 0.8, end: 1)
                                  .animate(animation),
                              child: switcherChild,
                            ),
                          );
                        },
                        child: AssetSvg(
                          widget.asset,
                          key: ValueKey<String>(widget.asset),
                          size: widget.size,
                          color: widget.color,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _AnimatedSliderIcon extends StatefulWidget {
  const _AnimatedSliderIcon({
    required this.asset,
    required this.dark,
  });

  final String asset;
  final bool dark;

  @override
  State<_AnimatedSliderIcon> createState() => _AnimatedSliderIconState();
}

class _AnimatedSliderIconState extends State<_AnimatedSliderIcon>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late Color _fromColor;
  late Color _toColor;

  Color _colorFor(bool dark) => dark ? const Color(0xff20282a) : Colors.white;

  @override
  void initState() {
    super.initState();
    _fromColor = _toColor = _colorFor(widget.dark);
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 420),
      value: 1,
    );
  }

  @override
  void didUpdateWidget(covariant _AnimatedSliderIcon oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.dark != widget.dark) {
      _fromColor = _colorFor(oldWidget.dark);
      _toColor = _colorFor(widget.dark);
      _controller.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final t = Curves.easeOutCubic.transform(_controller.value);
        final scale = _controller.value < 0.45
            ? 1 - _controller.value / 0.45 * 0.12
            : 0.88 + ((_controller.value - 0.45) / 0.55) * 0.12;
        final rotation = math.sin(_controller.value * math.pi * 2) * 0.04;
        return Transform.rotate(
          angle: rotation,
          child: Transform.scale(
            scale: scale,
            child: AssetSvg(
              widget.asset,
              size: 20,
              color: Color.lerp(_fromColor, _toColor, t),
            ),
          ),
        );
      },
    );
  }
}
