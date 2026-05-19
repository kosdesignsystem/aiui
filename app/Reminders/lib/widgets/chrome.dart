import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';

class FlowPage extends StatelessWidget {
  const FlowPage({
    super.key,
    this.header,
    this.topActions,
    this.bottomActions,
    this.overlay,
    required this.child,
  });

  final Widget? header;
  final Widget? topActions;
  final Widget? bottomActions;
  final Widget? overlay;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final overlayWidget = overlay == null
        ? null
        : Positioned.fill(child: overlay!);

    return Scaffold(
      backgroundColor: RemindersTokens.backgroundSecondary,
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(
            maxWidth: RemindersTokens.maxAppWidth,
          ),
          child: SafeArea(
            child: Stack(
              children: [
                Column(
                  children: [
                    Expanded(
                      child: Column(
                        children: [
                          ?header,
                          ?topActions,
                          Expanded(
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(24),
                              child: DecoratedBox(
                                decoration: BoxDecoration(
                                  color: RemindersTokens.backgroundPrimary,
                                  border: Border.all(
                                    color: RemindersTokens.contentBorder,
                                  ),
                                  borderRadius: BorderRadius.circular(24),
                                ),
                                child: child,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    ?bottomActions,
                  ],
                ),
                ?overlayWidget,
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class RemindersHeader extends StatelessWidget {
  const RemindersHeader({super.key, required this.title, this.meta});

  final String title;
  final Widget? meta;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 40, 24, 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: RemindersTypography.semiBold40()),
          if (meta != null) ...[const SizedBox(height: 16), meta!],
        ],
      ),
    );
  }
}

class SegmentedTabs extends StatelessWidget {
  const SegmentedTabs({
    super.key,
    required this.value,
    required this.onChanged,
    required this.onSearch,
  });

  final String value;
  final ValueChanged<String> onChanged;
  final VoidCallback onSearch;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 72,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            RoundIconButton(
              size: 60,
              icon: Icons.search,
              label: 'Поиск',
              onTap: onSearch,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: DecoratedBox(
                decoration: BoxDecoration(
                  border: Border.all(color: RemindersTokens.contentBorder),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    _SegmentedTab(
                      label: 'Сегодня',
                      selected: value == 'today',
                      onTap: () => onChanged('today'),
                    ),
                    _SegmentedTab(
                      label: 'Все',
                      selected: value == 'all',
                      onTap: () => onChanged('all'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SegmentedTab extends StatelessWidget {
  const _SegmentedTab({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 160),
          height: double.infinity,
          alignment: Alignment.center,
          margin: const EdgeInsets.all(0),
          decoration: BoxDecoration(
            color: selected
                ? RemindersTokens.contentBackground
                : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
            border: selected
                ? Border.all(color: RemindersTokens.contentBorder)
                : null,
          ),
          child: Text(label, style: RemindersTypography.medium16()),
        ),
      ),
    );
  }
}

class RoundIconButton extends StatelessWidget {
  const RoundIconButton({
    super.key,
    required this.icon,
    required this.label,
    required this.onTap,
    this.size = 44,
    this.background,
    this.foreground,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final double size;
  final Color? background;
  final Color? foreground;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: label,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 160),
          width: size,
          height: size,
          decoration: BoxDecoration(
            color: background ?? RemindersTokens.contentBackground,
            borderRadius: BorderRadius.circular(size == 32 ? 8 : 16),
          ),
          child: Icon(
            icon,
            size: size == 32 ? 16 : 24,
            color: foreground ?? RemindersTokens.contentPrimary,
          ),
        ),
      ),
    );
  }
}

class AccentButton extends StatelessWidget {
  const AccentButton({
    super.key,
    required this.label,
    required this.onTap,
    this.enabled = true,
    this.margin = EdgeInsets.zero,
  });

  final String label;
  final VoidCallback onTap;
  final bool enabled;
  final EdgeInsets margin;

  @override
  Widget build(BuildContext context) {
    final background = enabled
        ? RemindersTokens.accentPrimary
        : RemindersTokens.contentBackground;
    final foreground = enabled
        ? RemindersTokens.contentConstant
        : RemindersTokens.contentDisabled;

    return Padding(
      padding: margin,
      child: Semantics(
        button: true,
        enabled: enabled,
        label: label,
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: enabled ? onTap : null,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 160),
            height: 60,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: background,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Text(label, style: RemindersTypography.medium16(foreground)),
          ),
        ),
      ),
    );
  }
}

class BottomActionBar extends StatelessWidget {
  const BottomActionBar({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(color: RemindersTokens.backgroundSecondary),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
        child: child,
      ),
    );
  }
}

class SearchField extends StatelessWidget {
  const SearchField({
    super.key,
    required this.controller,
    required this.focusNode,
    required this.onClose,
    required this.onChanged,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final VoidCallback onClose;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 12),
      child: Row(
        children: [
          Expanded(
            child: Container(
              constraints: const BoxConstraints(minHeight: 56),
              padding: const EdgeInsets.only(left: 16),
              decoration: BoxDecoration(
                color: RemindersTokens.backgroundPrimary,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: RemindersTokens.contentBorder),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: controller,
                      focusNode: focusNode,
                      onChanged: onChanged,
                      textInputAction: TextInputAction.search,
                      style: RemindersTypography.medium18(),
                      decoration: InputDecoration(
                        hintText: 'Поиск',
                        hintStyle: RemindersTypography.medium18(
                          RemindersTokens.contentSecondary,
                        ),
                        border: InputBorder.none,
                        isDense: true,
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(right: 12),
                    child: RoundIconButton(
                      icon: Icons.close,
                      label: 'Назад',
                      size: 32,
                      onTap: onClose,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ReminderListSection extends StatefulWidget {
  const ReminderListSection({
    super.key,
    required this.title,
    required this.children,
    this.collapsible = false,
    this.defaultCollapsed = false,
  });

  final String title;
  final List<Widget> children;
  final bool collapsible;
  final bool defaultCollapsed;

  @override
  State<ReminderListSection> createState() => _ReminderListSectionState();
}

class _ReminderListSectionState extends State<ReminderListSection> {
  late bool _collapsed = widget.defaultCollapsed;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: RemindersTokens.contentBorder)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 12, 12, 0),
              child: Row(
                children: [
                  Text(
                    widget.title,
                    style: RemindersTypography.medium18(
                      RemindersTokens.contentSecondary,
                    ),
                  ),
                  const Spacer(),
                  if (widget.collapsible)
                    RoundIconButton(
                      icon: _collapsed
                          ? Icons.keyboard_arrow_down
                          : Icons.keyboard_arrow_up,
                      label: _collapsed
                          ? 'Развернуть список'
                          : 'Свернуть список',
                      size: 32,
                      background: Colors.transparent,
                      onTap: () => setState(() => _collapsed = !_collapsed),
                    ),
                ],
              ),
            ),
            if (!_collapsed) ...[
              const SizedBox(height: 10),
              for (final child in widget.children)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: child,
                ),
            ],
          ],
        ),
      ),
    );
  }
}
