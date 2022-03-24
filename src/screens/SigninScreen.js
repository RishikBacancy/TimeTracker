import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import InputField from '../components/InputField';
import SimpleButton from '../components/SimpleButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigaion/AuthProvider';

const SigninScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  const signInHandler = () => {
    if (email === '' || password === '') {
      Alert.alert('Empty Fields!', 'Please! Fill up all Fields.', [
        {text: 'Okay', onPress: () => {}, style: 'cancel'},
      ]);
    } else {
      console.log(email);
      console.log(password);

      login(email, password);

      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.textWrap}>Signin</Text>

<<<<<<< HEAD
      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={styles.logoContainer}
      />
=======
			<Image source={require('../../assets/logo.png')} resizeMode="contain" style={styles.logoContainer} />
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0

      <View style={styles.formContainer}>
        <InputField
          iconName={'envelope-o'}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={data => setEmail(data)}
          inputValue={email}
        />

        <InputField
          iconName={'lock'}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={data => setPassword(data)}
          inputValue={password}
        />

<<<<<<< HEAD
        <SimpleButton btnTitle={'SignIn'} onPress={signInHandler} />
      </View>
=======
				<TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
					<Text style={styles.simpleText}>Forgot Password?</Text>
				</TouchableOpacity>

				<SimpleButton btnTitle={'SignIn'} onPress={signInHandler} />
			</View>
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.simpleText}>Don't have an acount? Create here</Text>
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

<<<<<<< HEAD
        {Platform.OS === 'android' ? (
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
=======
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
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  simpleText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    fontFamily: 'Ubuntu-Medium',
  },
  formContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialContainer: {
    marginTop: 10,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  textWrap: {
    fontFamily: 'Ubuntu-Medium',
  },
  btnContainer: {
    marginTop: 10,
  },
});

export default SigninScreen;
