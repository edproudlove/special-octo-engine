//the idea is we show this screen when we are trying to fgure out weather the user is authenticated or not
import React, {useEffect} from 'react'
import { View, ActivityIndicator, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux'
import * as authActions from '../../store/actions/authActions'


const StartUpScreen = props => {
    const dispatch = useDispatch();


    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                //console.log('No User Data')
                props.navigation.navigate('Auth')
                return;
            }
            //console.log('Was User Data')
            
            const transformedUserData = JSON.parse(userData)
            const {token, userId, expiryDate} = transformedUserData
            const expirationData = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime()

            props.navigation.navigate('Quiz')
            dispatch(authActions.authenticate(userId, token, expirationTime))
        }
        tryLogin
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator />
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default StartUpScreen