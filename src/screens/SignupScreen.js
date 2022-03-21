import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import SimpleButton from '../components/SimpleButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigaion/AuthProvider';

const SignUpScreen = ({ navigation }) => {
	const [ name, setName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const { register, googleLogin, fbLogin } = useContext(AuthContext);

	const signUpHandler = () => {
		if (name === '' || phone === '' || email === '' || password === '') {
			Alert.alert('Empty Fields!', 'Please! Fill up all Fields.', [
				{ text: 'Okay', onPress: () => {}, style: 'cancel' }
			]);
		} else {
			console.log(name);
			console.log(phone);
			console.log(email);
			console.log(password);

			register(email, password);

			setName('');
			setPhone('');
			setEmail('');
			setPassword('');
		}
	};

	return (
		<View style={styles.screen}>
			<Text style={styles.textWrap}>Signin</Text>

			<Image source={require('../../assets/logo.png')} resizeMode="contain" style={styles.logoContainer} />

			<View style={styles.formContainer}>
				<InputField
					iconName={'user-o'}
					placeholder="Full Name"
					onChangeText={(data) => setName(data)}
					inputValue={name}
				/>

				<InputField
					iconName={'phone'}
					placeholder="Phone Number"
					keyboardType="phone-pad"
					onChangeText={(data) => setPhone(data)}
					inputValue={phone}
				/>

				<InputField
					iconName={'envelope-o'}
					placeholder="Email"
					keyboardType="email-address"
					onChangeText={(data) => setEmail(data)}
					inputValue={email}
				/>

				<InputField
					iconName={'lock'}
					placeholder="Password"
					secureTextEntry={true}
					onChangeText={(data) => setPassword(data)}
					inputValue={password}
				/>

				<SimpleButton btnTitle={'SignUp'} onPress={signUpHandler} />
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
				<Text style={styles.simpleText}>Already have an acount? Click here</Text>
			</TouchableOpacity>

			<View style={styles.socialContainer}>
				<SocialButton
					iconName={'facebook-official'}
					iconColor={'#4267B2'}
					btnBgColor={'#c7d9fc'}
					btnTitle={'Signin With Facebook'}
					onPress={() => fbLogin()}
				/>

				<SocialButton
					iconName={'google'}
					iconColor={'#EA4335'}
					btnBgColor={'#fcc9c5'}
					btnTitle={'Signin With Gmail'}
					onPress={() => googleLogin()}
				/>

				{Platform.OS === 'ios' ? (
					<SocialButton
						iconName={'apple'}
						iconColor={'black'}
						btnBgColor={'#ccc'}
						btnTitle={'Signin With Apple'}
						onPress={() => {}}
					/>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	simpleText: {
		fontSize: 18,
		fontWeight: '500',
		color: '#666',
		fontFamily: 'Ubuntu-Medium'
	},
	formContainer: {
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	socialContainer: {
		marginTop: 10
	},
	logoContainer: {
		width: 130,
		height: 130,
		marginBottom: 5
	},
	textWrap: {
		fontFamily: 'Ubuntu-Medium'
	},
	btnContainer: {
		marginTop: 10
	}
});

export default SignUpScreen;
