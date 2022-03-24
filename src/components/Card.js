import React from "react";
import { Text, View, StyleSheet, Platform} from "react-native";

const Card = props =>
{
    return(
        <View style={[ styles.cardContaiiner, props.style]}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContaiiner:{
        backgroundColor:"white",
        borderRadius:7,
        elevation:10,
        paddingVertical:15,
        paddingHorizontal:15,
        justifyContent:"center",
    },
});

export default Card;