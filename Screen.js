import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing, withSpring, useDerivedValue, interpolate, cancelAnimation, interpolateColor } from 'react-native-reanimated';

const AnimatedStyleUpdateExample = () => {
	const opacityValue = useSharedValue(0);
	const bgValue = useSharedValue(0);
	const borderRadiusValue = useSharedValue(0);
	const rotateXValue = useSharedValue(80);
	const scaleValue = useSharedValue(1);

	const bgColor = useDerivedValue(() => {
		return interpolateColor(bgValue.value,
			[0, 0.25, 0.5, 0.75, 1],
			['#6bb5ff', '#52a4f7', '#3193f5', '#177de3', '#0e6cc9'],
		)
	})
	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: bgColor.value,
			transform: [
				{rotateX: rotateXValue.value + 'deg'},
				{scale: scaleValue.value},
			],
			opacity: opacityValue.value,
			borderRadius: borderRadiusValue.value,
		}
	})

	const playAnimation = () => {
		opacityValue.value = withTiming(1, {
			duration: 300,
		})
		rotateXValue.value = withSpring(0);
		scaleValue.value = withSpring(1.8);
		borderRadiusValue.value = withTiming(6, {duration: 600});
		bgValue.value = withTiming(1, {
			duration: 400,
		})
	}

	const stopAnimation = () => {
		opacityValue.value = withTiming(0, {
			duration: 300,
		})
		rotateXValue.value = withSpring(50);
		scaleValue.value = withSpring(1);
		borderRadiusValue.value = withTiming(0, {duration: 600});
		bgValue.value = withTiming(0, {
			duration: 300,
		})
	}

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.cube, animatedStyle]}>
				<Text style={{color: 'white', textAlign: 'center'}}>i'm animated box</Text>
			</Animated.View>
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btnPlay} onPress={playAnimation}>
					<Text>Play</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnPlay} onPress={stopAnimation}>
					<Text>Reset</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: '#ecf0f1',
		justifyContent: 'center', 
		alignItems: 'center',
	},
	cube: {
		width: 100, 
		height: 100,
		justifyContent: 'center', 
		alignItems: 'center',
	},
	btnContainer: {
		width: '100%', 
		height: 60,  
		position: 'absolute', 
		bottom: 0,
		flexDirection: 'row',
		justifyContent:"center",
		alignItems: 'center',
	},
	btnPlay: {
		width: 130,
		height: 50,
		margin: 5,
		backgroundColor: '#e74c3c',
		justifyContent: 'center', 
		alignItems: 'center',

	}
});

export default AnimatedStyleUpdateExample;
