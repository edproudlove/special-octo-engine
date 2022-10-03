import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
//props.onSelect}>
//onPress={console.log('Hello')}>
const CatagoryGridTile = props => {

    return (
        <TouchableOpacity 
            style={styles.gridItem} 
            onPress={props.onSelect}>
                <View style={{...styles.container, backgroundColor: props.bgColor }}>
                    <Text style={styles.title}>{props.awnser}</Text>
                </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    gridItem: {
        width: '90%',
        flex:1,
        marginBottom: 15,
        marginHorizontal: 10,
        textAlign: 'center',
        
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 3,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'teko-med'
    }

});

export default CatagoryGridTile;