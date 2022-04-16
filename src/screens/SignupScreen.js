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

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {register, googleLogin, fbLogin} = useContext(AuthContext);

  const signUpHandler = () => {
    if (name === '' || phone === '' || email === '' || password === '') {
      Alert.alert('Empty Fields!', 'Please! Fill up all Fields.', [
        {text: 'Okay', onPress: () => {}, style: 'cancel'},
      ]);
    } else {
      console.log(name);
      console.log(phone);
      console.log(email);
      console.log(password);

      register(name, email, password, phone);

      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={styles.logoContainer}
      />

      <View style={styles.formContainer}>
        <InputField
          iconName={'user-o'}
          placeholder="Full Name"
          onChangeText={data => setName(data)}
          inputValue={name}
          numberOfLines={1}
        />

        <InputField
          iconName={'phone'}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={data => setPhone(data.replace(/[^0-9]/g, ''))}
          maxLength={10}
          inputValue={phone}
          numberOfLines={1}
        />

        <InputField
          iconName={'envelope-o'}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={data => setEmail(data)}
          inputValue={email}
          numberOfLines={1}
        />

        <InputField
          iconName={'lock'}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={data => setPassword(data)}
          inputValue={password}
          numberOfLines={1}
        />

        <SimpleButton btnTitle={'SignUp'} onPress={signUpHandler} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.simpleText}>
          Already have an acount? Click here
        </Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <SocialButton
          iconName={'facebook-official'}
          iconColor={'#4267B2'}
          btnBgColor={'#c7d9fc'}
          btnTitle={'Signup With Facebook'}
          onPress={() => fbLogin()}
        />

        <SocialButton
          iconName={'google'}
          iconColor={'#EA4335'}
          btnBgColor={'#fcc9c5'}
          btnTitle={'Signup With Gmail'}
          onPress={() => googleLogin()}
        />

        {Platform.OS === 'ios' ? (
          <SocialButton
            iconName={'apple'}
            iconColor={'black'}
            btnBgColor={'#ccc'}
            btnTitle={'Signup With Apple'}
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
    width: 130,
    height: 130,
    marginBottom: 5,
  },
  textWrap: {
    fontFamily: 'Ubuntu-Medium',
  },
  btnContainer: {
    marginTop: 10,
  },
});

export default SignUpScreen;
