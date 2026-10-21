import '../models/launcher_motion.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Shared mouse, keyboard, focus and accessibility behavior for custom controls.
class LauncherAction extends StatefulWidget {
  const LauncherAction(
      {Key? key,
      required this.label,
      required this.child,
      required this.onPressed,
      this.onKeyboardPressed,
      this.selected,
      this.toggled})
      : super(key: key);
  final String label;
  final Widget child;
  final VoidCallback? onPressed;
  final VoidCallback? onKeyboardPressed;
  final bool? selected;
  final bool? toggled;
  @override
  State<LauncherAction> createState() => _LauncherActionState();
}

class _LauncherActionState extends State<LauncherAction> {
  bool focused = false;
  bool pressed = false;
  bool hovered = false;
  @override
  Widget build(BuildContext context) => Semantics(
        label: widget.label,
        button: true,
        enabled: widget.onPressed != null,
        selected: widget.selected,
        toggled: widget.toggled,
        onTap: widget.onKeyboardPressed ?? widget.onPressed,
        excludeSemantics: true,
        child: FocusableActionDetector(
          enabled: widget.onPressed != null,
          mouseCursor: widget.onPressed == null
              ? SystemMouseCursors.basic
              : SystemMouseCursors.click,
          onShowFocusHighlight: (v) => setState(() => focused = v),
          onShowHoverHighlight: (v) => setState(() => hovered = v),
          shortcuts: const <ShortcutActivator, Intent>{
            SingleActivator(LogicalKeyboardKey.enter): ActivateIntent(),
            SingleActivator(LogicalKeyboardKey.space): ActivateIntent(),
          },
          actions: <Type, Action<Intent>>{
            ActivateIntent: CallbackAction<ActivateIntent>(onInvoke: (_) {
              (widget.onKeyboardPressed ?? widget.onPressed)?.call();
              return null;
            }),
          },
          child: GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: widget.onPressed,
            onTapDown: widget.onPressed == null
                ? null
                : (_) => setState(() => pressed = true),
            onTapUp: (_) => setState(() => pressed = false),
            onTapCancel: () => setState(() => pressed = false),
            child: DecoratedBox(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  border: focused
                      ? Border.all(color: Colors.white, width: 2)
                      : null),
              child: AnimatedScale(
                  duration: launcherDuration(90),
                  scale: pressed
                      ? .96
                      : hovered
                          ? 1.015
                          : 1,
                  child: widget.child),
            ),
          ),
        ),
      );
}
