import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Cheerio from 'cheerio';
import Axios from 'axios';

const AnimatedStyleUpdateExample = () => {
	const [newsData, setNewsData] = useState([]);
	const [title, setTitle] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);

	const getNewsFromSite = async () => {
		const { data } = await Axios.get('https://www.imgonline.com.ua/eng/color-palette.php');
		const $ = Cheerio.load(data);
		let arr = []
		const title = $('#content > h1').text();
		setTitle(title);
		$('tbody').each((i, elem) => {
				const children = $(elem).children();
				children.each((i, li) => {
					const colorName = $(li).find('td:nth-of-type(1)').text()
					const colorRgb = $(li).find('td:nth-of-type(2)').text()
					const colorHex = $(li).find('td:nth-of-type(3)').text()
					arr.push({colorName, colorRgb, colorHex});
			})
		})
		setNewsData(arr);
		setTimeout(() => {
			setIsLoaded(true)
		}, 1500);
	};

	useEffect(() => {
		getNewsFromSite();
	}, []);
    console.log("AnimatedStyleUpdateExample ~ isLoaded", isLoaded)

	return (
			<View style={styles.container}>
			<Text>{title}</Text>
			{isLoaded ? <FlatList 
				data={newsData}
				keyExtractor={(item) => item.colorName}
				renderItem={({item: {colorName, colorRgb, colorHex}}) => (
				<View key={colorName} style={{width: '100%', height: 30, backgroundColor: colorHex, flexDirection: 'row', }}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
						<Text>{colorName}</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
						<Text>{colorRgb}</Text>
					</View>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
						<Text>{colorHex}</Text>
					</View>
				</View>
				)}
			/>
			: <ActivityIndicator color="green" size='large' />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
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
