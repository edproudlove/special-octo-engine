import React, {useReducer, useCallback} from 'react'
import {StyleSheet, View, Button, Alert, Text,  KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import { createNewQuestion } from '../store/actions/quizActions'
import Input from '../componants/Input'
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

const AddQuestionScreen = props => {

    const dispatch = useDispatch();

    const [formSate, dispatchFormState] = useReducer(formReducer, {
            inputValues: {
                question: '',
                category: '',
                awnser: '',
                firstIncorrect: '',
                secondIncorrect: '',
                thirdIncorrect: '',
            }, 
            inputValidities: {
                question: false,
                category: false,
                awnser: false,
                firstIncorrect: false,
                secondIncorrect: false,
                thirdIncorrect: false,

            }, 
            formIsValid: false
        })
 
    const onSaveHandler = () => {
        if (!formSate.formIsValid) {
            //console.log(formSate)
            Alert.alert('Wrong Input', 'Please check the errors inside your form', [{text: 'Okay'}])
            return;
        }
        dispatch(createNewQuestion(
            formSate.inputValues.question, 
            formSate.inputValues.category, 
            formSate.inputValues.awnser, 
            formSate.inputValues.firstIncorrect, 
            formSate.inputValues.secondIncorrect, 
            formSate.inputValues.thirdIncorrect,
            'Test Author'
            ))
    }
    

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier,
        })
    }, [dispatchFormState])

   
    return(
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView >
                <View style={styles.screen}>

                    <Input 
                        containerStyle={{width: '90%'}}
                        id='question'
                        label='Question'
                        errorText='Please Input A Correctly Formatted Question'
                        onInputChange={inputChangeHandler}
                        required
                        
                        />
                    
                    <Input 
                        containerStyle={{width: '90%'}}
                        id='category'
                        label='Category'
                        autoCapitalize='none'
                        errorText='Please Input A Correctly Formatted Category'
                        onInputChange={inputChangeHandler}
                        required
                        />
                    
                    <Input 
                        containerStyle={{width: '90%'}}
                        id='awnser'
                        label='Awnser'
                        errorText='Please Input A Correctly Formatted Awnser'
                        onInputChange={inputChangeHandler}
                        required
                        />
                    
                    <Input 
                        containerStyle={{width: '90%'}}
                        id='firstIncorrect'
                        label='First Incorrect Awnser'
                        errorText='Please Input A Correctly Formatted Awnser'
                        onInputChange={inputChangeHandler}
                        required
                        />
                    
                    <Input 
                        containerStyle={{width: '90%'}}
                        id='secondIncorrect'
                        label='Second Incorrect Awnser'
                        errorText='Please Input A Correctly Formatted Awnser'
                        onInputChange={inputChangeHandler}
                        required
                        />
                    
                    <Input 
                        containerStyle={{width: '90%'}}
                        id='thirdIncorrect'
                        label='Third Incorrect Awnser'
                        errorText='Please Input A Correctly Formatted Awnser'
                        onInputChange={inputChangeHandler}
                        required
                        />

      
                


                    <TouchableOpacity onPress={() => onSaveHandler()} style={{flex: 1}}>
                        <View style={styles.submitButton} >
                            <Text style={styles.buttonText}> Submit </Text>
                        </View>
                    </TouchableOpacity> 


                </View>
                        
            </ScrollView>
        </KeyboardAvoidingView>



    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 15,
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        marginTop: 20,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.70,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        elevation: 3,
        padding: 15,
        backgroundColor: 'green',
        width: '30%'
    },
    buttonText: {
        fontFamily: 'teko-med',
        fontSize: 30,
    }
    


});

AddQuestionScreen.navigationOptions = (navigationData) => {

    return {
        headerTitle: 'Submit A Question',
    }
}


export default AddQuestionScreen;