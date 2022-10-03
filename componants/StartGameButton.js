import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const StartGameButton = props => {
    return (

        <TouchableOpacity style={styles.container} onPress={props.onSelect}>
            <Text style={styles.title}>Start Game</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'teko-med',
        fontSize: 30,
        color: 'black',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        //width: 200,
        //height: 100,
        backgroundColor: '#d044e3',
        margin: 30,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,


    },

});

export default StartGameButton;