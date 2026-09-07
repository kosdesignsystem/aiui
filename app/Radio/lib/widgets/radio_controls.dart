import 'package:flutter/material.dart';

import '../theme/tokens.dart';

class RadioControls extends StatelessWidget {
  const RadioControls({
    super.key,
    required this.isPlaying,
    required this.isLoading,
    required this.onPrevious,
    required this.onToggle,
    required this.onNext,
  });

  final bool isPlaying;
  final bool isLoading;
  final VoidCallback onPrevious;
  final VoidCallback onToggle;
  final VoidCallback onNext;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 104,
      child: Row(
        children: [
          _ControlButton(label: 'Предыдущая волна', icon: Icons.arrow_back, onPressed: onPrevious),
          const SizedBox(width: 8),
          Expanded(
            child: Semantics(
              button: true,
              label: isPlaying ? 'Пауза' : 'Воспроизвести',
              child: Material(
                color: AppColors.textPrimary,
                borderRadius: BorderRadius.circular(22),
                clipBehavior: Clip.antiAlias,
                child: InkWell(
                  onTap: onToggle,
                  child: Center(
                    child: Text(
                      isLoading ? 'Loading' : isPlaying ? 'Pause' : 'Play',
                      style: const TextStyle(color: Colors.black, fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          _ControlButton(label: 'Следующая волна', icon: Icons.arrow_forward, onPressed: onNext),
        ],
      ),
    );
  }
}

class _ControlButton extends StatelessWidget {
  const _ControlButton({required this.label, required this.icon, required this.onPressed});

  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 70,
      height: double.infinity,
      child: IconButton(
        tooltip: label,
        onPressed: onPressed,
        style: IconButton.styleFrom(
          backgroundColor: AppColors.surface,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(22)),
        ),
        icon: Icon(icon, color: AppColors.textPrimary),
      ),
    );
  }
}

