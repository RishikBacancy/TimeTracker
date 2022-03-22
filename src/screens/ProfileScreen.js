import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

import { AuthContext } from "../navigaion/AuthProvider";

const ProfileScreen = props =>
{

    const { user, forgotPswd } = useContext(AuthContext);

    return(
        <View style={styles.screen}>
            <Text>Profile Screen</Text>
            <Icon name="lock-reset" size={25} color="black" onPress={()=>{forgotPswd(auth().currentUser.email)}}/>
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