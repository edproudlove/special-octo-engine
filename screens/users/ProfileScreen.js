import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux' 
import { logout } from '../../store/actions/authActions'


const ProfileScreen = props => {
    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <Text>This is the profile Screen</Text>
            <Button title='Log Out' onPress={() => dispatch(logout())}/> 

        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default ProfileScreen;