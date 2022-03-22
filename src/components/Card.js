import React from "react";
import { Text, View, StyleSheet, Platform} from "react-native";

const Card = props =>
{
    return(
        <View style={styles.cardContaiiner}>
            <Text style={styles.textContainer}>Rishik Karanjiya</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContaiiner:{
        backgroundColor:"white",
        elevation:10,
        paddingVertical:10,
        paddingHorizontal:10,
        justifyContent:"center",
    },
    textContainer:{
        fontFamily:"Ubuntu-Regular"
    },
});

export default Card;