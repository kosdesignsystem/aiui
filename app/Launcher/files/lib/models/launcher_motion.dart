import 'package:flutter/widgets.dart';

/// Flutter exposes the browser/OS reduced-motion preference through this flag.
Duration launcherDuration(int milliseconds) => Duration(
      milliseconds: WidgetsBinding.instance.platformDispatcher
              .accessibilityFeatures.disableAnimations
          ? 1
          : milliseconds,
    );
