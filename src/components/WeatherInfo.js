import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
} from 'react-native';

export default class WeatherInfo extends Component {
	kelvinToCelcius(temperature) {
    return Math.floor( Number(temperature) - 273.15 );
  }

	capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

	_renderIfNotEmpty() {
		const {weather} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.left}>
					<Image
						style={styles.image}
						source={{uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}} />
					<View style={styles.leftText}>
						<Text style={styles.text}>
							{this.kelvinToCelcius(
								weather.main.temp
							)}
							&deg;
							{'C'}
						</Text>
						<Text style={styles.description}>
							{this.capitalizeFirstLetter(
								weather.weather[0].description
							)}
						</Text>
					</View>
				</View>
				<View style={styles.right}>
					<Text style={styles.rightText}>
						{weather.name}
					</Text>
				</View>
			</View>
		);
	}

	_renderIfEmpty() {
		return (
			<View style={styles.containerNone}>
				<Text style={styles.none}>
					Please use search box or click on map! 
				</Text>
			</View>
		);
	}
	
	render() {
		if (this.props.weather.message) {
				return this._renderIfEmpty();
		}

		return this._renderIfNotEmpty();
	}
}

const styles = StyleSheet.create({
	containerNone: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		marginHorizontal: 10,
		height: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		marginHorizontal: 10,
		height: 50,
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
	left: {
		marginLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftText: {
		marginLeft: 5,
		flexDirection: 'column',
	},
	image: {
		height: 50,
		width: 50,
	},
	description: {
		fontSize: 12,
	},
	right: {
		marginRight: 20,
	},
	none: {
		alignItems: 'center',
	},
	text: {
		color: 'black',
	},
});