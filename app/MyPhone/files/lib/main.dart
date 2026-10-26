import 'package:flutter/material.dart';

import 'my_phone.dart';
import 'platform/default_platform_adapter.dart';
import 'platform/my_phone_platform.dart';

void main() {
  runApp(const MyPhoneApp());
}

class MyPhoneApp extends StatelessWidget {
  const MyPhoneApp({
    Key? key,
    this.platformAdapter,
  }) : super(key: key);

  final MyPhonePlatformAdapter? platformAdapter;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPhone',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xff101719),
        fontFamily: 'KasperskySansText',
        colorScheme: const ColorScheme.dark(
          primary: Color(0xff2687ee),
          surface: Color(0xff082d30),
        ),
        splashFactory: InkRipple.splashFactory,
      ),
      home: MyPhoneScreen(
        platformAdapter:
            platformAdapter ?? createDefaultMyPhonePlatformAdapter(),
      ),
    );
  }
}
