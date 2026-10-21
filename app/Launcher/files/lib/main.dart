import 'dart:ui';
import 'package:flutter/material.dart';
import 'platform/launcher_platform.dart';
import 'platform/launcher_platform_factory.dart';
import 'screens/launcher_screen.dart';

void main() => runApp(const LauncherApplication());

class LauncherApplication extends StatelessWidget {
  const LauncherApplication({Key? key, this.platform}) : super(key: key);
  final LauncherPlatform? platform;
  @override
  Widget build(BuildContext context) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Launcher',
        scrollBehavior: const _DesktopScrollBehavior(),
        theme: ThemeData(
          brightness: Brightness.dark,
          fontFamily: 'Kaspersky Sans Text',
          scaffoldBackgroundColor: const Color(0xFF082D30),
          splashFactory: NoSplash.splashFactory,
          highlightColor: Colors.transparent,
          textTheme: ThemeData.dark().textTheme.apply(
              fontFamily: 'Kaspersky Sans Text',
              bodyColor: const Color(0xFFF8FBFB),
              displayColor: const Color(0xFFF8FBFB)),
          useMaterial3: false,
        ),
        home: Scaffold(
            backgroundColor: const Color(0xFF0C1118),
            body: SafeArea(
              child: Center(
                  child: FittedBox(
                fit: BoxFit.contain,
                child: SizedBox(
                  width: 360,
                  height: 800,
                  child: ClipRRect(
                      borderRadius: const BorderRadius.all(Radius.circular(32)),
                      child: Navigator(
                          onGenerateRoute: (_) => MaterialPageRoute<void>(
                              builder: (_) => LauncherScreen(
                                  platform:
                                      platform ?? createLauncherPlatform())))),
                ),
              )),
            )),
      );
}

class _DesktopScrollBehavior extends MaterialScrollBehavior {
  const _DesktopScrollBehavior();
  @override
  Set<PointerDeviceKind> get dragDevices => const {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.trackpad,
        PointerDeviceKind.stylus,
        PointerDeviceKind.invertedStylus,
      };
}
