import React, {useReducer, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE: 
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR: 
            return {
                ...state,
                touched: true
            }

        default: 
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        touched: false,
    })

    const textChangeHandler = text => {
        //this code below is copied from the tutorial:
        //it allows you to give props to input thtat will diplay and check for diffrent errors:
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        if (props.category) {
            //I will replace this with a picker later on.
            if (text != 'c10' || text != 'c9' || text != 'c8' || text != 'c7' || text != 'c6' || text != 'c5' || text != 'c4' || text != 'c3' || text != 'c2' || text != 'c1') {
                isValid = false
            }
        }

        dispatch({
            type: INPUT_CHANGE, 
            value: text,
            isValid: isValid,
        })
    }

    const lostFocusHandler = () => {
        dispatch({
            type: INPUT_BLUR
        })

    }

    const { onInputChange, id } = props;

    //this allows us to forward info to the screen
    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [id, inputState, onInputChange])

    return (
        <View style={{margin:15, ...props.containerStyle}}>
            <View style={styles.inputTile}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput 
                    {...props}
                    value={inputState.value} 
                    onChangeText={textChangeHandler}
                    onBlur={lostFocusHandler}
                />
                
            </View>
                {!inputState.isValid && inputState.touched && <Text style={{fontFamily: 'teko-med', fontSize: 17}}>{props.errorText}</Text>}
        </View>
        )

}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'teko-med',
        fontSize: 20,
    },
    inputTile: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '100%'
    }
})

export default Input