import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native'

const CatagoryGridTile = props => {
    return (
        <TouchableOpacity 
            style={styles.gridItem} 
            onPress={props.onSelect}>
                <View style={{...styles.container, ...{backgroundColor: props.color}}}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    gridItem: {
        height: 150,
        flex:1,
        margin: 15, 
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 25,
        fontFamily: 'teko-med',
    }

});

export default CatagoryGridTile;