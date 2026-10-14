import 'package:flutter/material.dart';

import 'screens/launcher_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const LauncherApp());
}

class LauncherApp extends StatelessWidget {
  const LauncherApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Launcher',
      theme: ThemeData(
        brightness: Brightness.dark,
        fontFamily: 'Kaspersky Sans Text',
        scaffoldBackgroundColor: const Color(0xFF082D30),
        splashFactory: NoSplash.splashFactory,
        highlightColor: Colors.transparent,
      ),
      home: const LauncherScreen(),
    );
  }
}
