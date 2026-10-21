import 'package:flutter/foundation.dart';

import 'kos_launcher_platform.dart';
import 'launcher_platform.dart';

/// All imported code is Dart/Flutter-only; no browser API enters a KOS build.
/// Other native hosts use the unconnected KOS adapter for development too.
LauncherPlatform createLauncherPlatform() =>
    kIsWeb ? const DemoLauncherPlatform() : const KosLauncherPlatform();
