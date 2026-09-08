import 'package:flutter/material.dart';

const _style = TextStyle(
  color: Colors.white,
  fontFamily: 'Kaspersky Sans Text Clock',
  fontSize: 104,
  fontWeight: FontWeight.w500,
  height: .95,
  letterSpacing: -5.72,
  fontFeatures: <FontFeature>[FontFeature.tabularFigures()],
);

class Frequency extends StatelessWidget {
  const Frequency({Key? key, required this.value}) : super(key: key);

  final double value;

  @override
  Widget build(BuildContext context) {
    final text = value.toStringAsFixed(1);
    return Semantics(
      label: text,
      liveRegion: true,
      child: ExcludeSemantics(
        child: FittedBox(
          fit: BoxFit.scaleDown,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: <Widget>[
              for (var index = 0; index < text.length; index++)
                text[index] == '.'
                    ? const SizedBox(
                        width: 29.12,
                        height: 98.8,
                        child: Text('.', style: _style),
                      )
                    : _Digit(
                        key: ValueKey<int>(index),
                        value: int.parse(text[index]),
                      ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Digit extends StatefulWidget {
  const _Digit({Key? key, required this.value}) : super(key: key);

  final int value;

  @override
  State<_Digit> createState() => _DigitState();
}

class _DigitState extends State<_Digit> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late Animation<double> _digit;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 620),
      value: 1,
    );
    _digit = AlwaysStoppedAnimation<double>(widget.value.toDouble());
  }

  @override
  void didUpdateWidget(_Digit oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.value == widget.value) {
      return;
    }
    _digit = Tween<double>(
      begin: oldWidget.value.toDouble(),
      end: widget.value.toDouble(),
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Cubic(.2, .78, .24, 1),
      ),
    );
    if (MediaQuery.of(context).disableAnimations) {
      _controller.value = 1;
    } else {
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
    return SizedBox(
      width: 59.28,
      height: 98.8,
      child: ClipRect(
        child: AnimatedBuilder(
          animation: _digit,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, -98.8 * _digit.value),
              child: child,
            );
          },
          child: Column(
            children: List<Widget>.generate(
              10,
              (digit) => SizedBox(
                width: 59.28,
                height: 98.8,
                child: Text('$digit', style: _style),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
