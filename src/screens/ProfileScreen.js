import React, {useContext} from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

import { AuthContext } from "../navigaion/AuthProvider";

const ProfileScreen = props =>
{

    const { user, forgotPswd } = useContext(AuthContext);

    const resetHandler = () => {
		forgotPswd(auth().currentUser.email);
		Alert.alert('Password Reset', 'Password Reset link has been sent!', [
			{
				text: 'OK',
				onPress: () => {},
				style: 'cancel'
			}
		]);
	};

    return(
        <View style={styles.screen}>
            <Text>Profile Screen</Text>
            <Icon name="lock-reset" size={25} color="black" onPress={resetHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },  
});

export default ProfileScreen;