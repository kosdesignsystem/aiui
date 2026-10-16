import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'screens/launcher_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  SystemChrome.setPreferredOrientations(<DeviceOrientation>[
    DeviceOrientation.portraitUp,
  ]);
  runApp(const LauncherApplication());
}

class LauncherApplication extends StatelessWidget {
  const LauncherApplication({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Launcher',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF082D30),
        splashFactory: NoSplash.splashFactory,
        highlightColor: Colors.transparent,
        visualDensity: VisualDensity.standard,
      ),
      home: const LauncherScreen(),
    );
  }
}
