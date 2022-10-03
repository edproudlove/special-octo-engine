import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { ScrollView, View, KeyboardAvoidingView, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native'
import Input from '../../componants/Input'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/authActions'

const   FORM_UPDATE = 'UPDATE'


const formReducer = (state, action) => {
    if( action.type === FORM_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        }

        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }
    return state;
} 



const AuthScreen = props => {
    const [error, setError] = useState()
    const [isSignUp, setIsSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const authHandler = async () => {
        let action = authActions.login(formState.inputValues.email, formState.inputValues.password)

        if (isSignUp) { 
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password)
        } 
        setIsLoading(true)
        setError(null)
        try{
            await dispatch(action)
            props.navigation.navigate('Quiz')

        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
        
        


        
    }

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        }, 
        inputValidities: {
            email: false,
            password: false,

        }, 
        formIsValid: false
    })
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred', error, [{text: 'Okay'}])
        }

    }, [error])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier,
        })
    }, [dispatchFormState])



    return (
        <KeyboardAvoidingView 
        style={styles.screen}
        keyboardVerticalOffset={50}
        behavior='padding'
        >
            <LinearGradient colors={['#bc5dc7','white']} style={styles.gradient}>
                <View style={styles.card}>
                    <ScrollView
                        style={{width: '100%'}}>
                        <Input 
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please Input A Valid Email'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input 
                            id='password'
                            label='Password'
                            keyboardType='default'
                            required
                            minLength={5}
                            secureTextEntry
                            autoCapitalize='none'
                            errorText='Please Input A Valid Password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        {isLoading ? <ActivityIndicator /> : <Button title={isSignUp ? 'Sign Up' : 'Login'} color='black' onPress={authHandler}/>}
                        <Button title={isSignUp ? 'Switch To Log In' : 'Switch To Sign Up'} color='black' onPress={() => {setIsSignUp(prevState => !prevState)}}/>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>

    )

}

AuthScreen.navigationOptions = {
    headerTitle: 'Log In'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        padding: 20,
        height: '100%'

    },
    card: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: "center",
        alignItems: 'center',
        padding: 15

    }
})

export default AuthScreen;