import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const TimeTracking = (props) => {
	const [ sec, setSec ] = useState(0);
	const [ min, setMin ] = useState(0);
	const [ hr, setHr ] = useState(0);
	const [ start, setStart ] = useState(false);

	var timer;

	useEffect(() => {
		if (start) {
			timer = setInterval(() => {
				setSec(sec + 1);

				if (sec === 59) {
					setMin(min + 1);
					setSec(0);
				}

				if (min === 59) {
					setHr(hr + 1);
					setMin(0);
				}
			}, 1000);
		} else {
			clearInterval(timer);
		}

		return () => {
			clearInterval(timer);
		};
	});

	return (
		<View style={styles.container}>
			<View style={styles.parent}>
				<Text style={styles.child}>{hr < 10 ? '0' + hr : ':' + hr}</Text>
				<Text style={styles.child}>{min < 10 ? ':0' + min : ':' + min}</Text>
				<Text style={styles.child}>{sec < 10 ? ':0' + sec : ':' + sec}</Text>
			</View>
			<View style={styles.buttonParent}>
				{start ? (
					<Icon
						// style={styles.button}
						name="pause"
						size={25}
						color={Colors.primaryColor}
						onPress={() => {
							// setStop(true);
							setStart(false);
						}}
					/>
				) : (
					<Icon
						// style={styles.button}
						name="play"
						size={25}
						color={Colors.primaryColor}
						onPress={() => {
							setStart(true);
							// setStop(false);
						}}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: "space-between",
		paddingTop: '8%',
		flexDirection:"row",
	},
	parent: {
		display: 'flex',
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.primaryColor,
		paddingLeft: '8%',
		paddingRight: '8%',
		paddingTop: '.5%',
		paddingBottom: '.5%'
	},

	child: {
		fontSize: 30,
		color: Colors.accentColor
	},

	buttonParent: {
		width: '50%',
		marginHorizontal:20,
	}
});

export default TimeTracking;
