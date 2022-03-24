import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SimpleButton from '../components/SimpleButton';
import {AuthContext} from '../navigaion/AuthProvider';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const logOutHandler = () => {
    logout();
  };

  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Text>{user.uid}</Text>
      <SimpleButton btnTitle={'LogOut'} onPress={logOutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SimpleButton from '../components/SimpleButton';
import { AuthContext } from '../navigaion/AuthProvider';
import HeaderButton from '../components/HeaderButton';
import Card from '../components/Card';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeScreen = (props) => {
	const { user, logout } = useContext(AuthContext);
	const cUser = auth().currentUser;

	useEffect(
		() => {
			props.navigation.setOptions({
				headerRight: () => <HeaderButton iconName={'add-circle-outline'} />
			});

			firestore().collection('Users').doc(cUser.uid).set({
				email: cUser.email ,
			});
		},
		[ props.navigation, cUser ]
	);

	const logOutHandler = () => {
		logout();
	};

	return (
		<View style={styles.screen}>
			<Card>
                <Text>Rishik Karanjiya</Text>
            </Card>
			<Text>Home Screen</Text>
			<Text>{user.uid}</Text>
			<SimpleButton btnTitle={'LogOut'} onPress={logOutHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0
});

export default HomeScreen;
