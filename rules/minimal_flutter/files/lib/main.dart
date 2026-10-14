import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';

void main() => runApp(ExampleApp());

class ExampleApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: BouncingImages(),
      ),
    );
  }
}

class BouncingImages extends StatefulWidget {
  @override
  _BouncingImagesState createState() => _BouncingImagesState();
}

class _BouncingImagesState extends State<BouncingImages> with TickerProviderStateMixin {
  final int numberOfImages = 14;
  late List<AnimationController> _controllers;
  late List<Animation<Offset>> _animations;
  late Random _random;
  final List<String> images = [
    'assets/image1.png',
    'assets/image2.png',
    'assets/image3.png',
    'assets/image4.png',
    'assets/image5.png',
    'assets/image6.png',
    'assets/image7.png',
    'assets/image8.png',
    'assets/image9.png',
    'assets/image10.png',
    'assets/image11.png',
    'assets/image12.png',
    'assets/image13.png',
    'assets/image14.png',
  ];
  late List<Offset> _velocities;
  late Size _screenSize;

  @override
  void initState() {
    super.initState();
    _random = Random();

    _controllers = List.generate(numberOfImages, (index) {
      return AnimationController(
        vsync: this,
        duration: Duration(seconds: 10),
      );
    });

    _velocities = List.generate(numberOfImages, (index) {
      return Offset(_random.nextDouble() * 400 - 100, _random.nextDouble() * 400 - 100);
    });

    _animations = _controllers.map((controller) {
      return Tween<Offset>(
        begin: Offset.zero,
        end: Offset.zero,
      ).animate(controller);
    }).toList();

    for (var controller in _controllers) {
      controller.repeat();
    }
  }

  @override
  void dispose() {
    for (var controller in _controllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _screenSize = MediaQuery.of(context).size;

    return Stack(
      children: List.generate(numberOfImages, (index) {
        return AnimatedBuilder(
          animation: _controllers[index],
          builder: (context, child) {
            _updatePosition(index);
            return Positioned(
              left: _screenSize.width / 2 + _animations[index].value.dx,
              top: _screenSize.height / 2 + _animations[index].value.dy,
              child: child!,
            );
          },
          child: Image.asset(images[index], width: 50, height: 50, filterQuality: FilterQuality.none),
        );
      }),
    );
  }

  void _updatePosition(int index) {
    final currentOffset = _animations[index].value;
    final velocity = _velocities[index];

    Offset newOffset = currentOffset + velocity * 0.02;

    if (newOffset.dx <= -_screenSize.width / 2 || newOffset.dx >= _screenSize.width / 2 - 50) {
      _velocities[index] = Offset(-velocity.dx, velocity.dy);
      newOffset = currentOffset + _velocities[index] * 0.02;
    }
    if (newOffset.dy <= -_screenSize.height / 2 || newOffset.dy >= _screenSize.height / 2 - 50) {
      _velocities[index] = Offset(velocity.dx, -velocity.dy);
      newOffset = currentOffset + _velocities[index] * 0.02;
    }

    _controllers[index].stop();
    _animations[index] = Tween<Offset>(
      begin: newOffset,
      end: newOffset,
    ).animate(_controllers[index]);
    _controllers[index].repeat();
  }
}