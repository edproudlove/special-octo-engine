import React, {useEffect, useState, useCallback} from 'react'
import { CATEGORIES } from '../data/dummy'
import {StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import StartGameButton from '../componants/StartGameButton'
import { useDispatch } from 'react-redux' 
import { setCategory } from '../store/actions/quizActions'
import { fetchQuestions } from '../store/actions/quizActions'
import { set } from 'react-native-reanimated'

//the useEffect is for testing purposes of querying the database on object load:
//the useState is for the loading state


const StartGameScreen = props => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const catId = props.navigation.getParam('categoryId')
    const chosenCategory = CATEGORIES.find(
        category => category.id === catId
    );

    const loadQuestions = useCallback( async () => {
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(fetchQuestions(chosenCategory.id));
        } catch(err) {
            setError(err.message)
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        loadQuestions();
    }, [dispatch])

    if (error) {
        return( 
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
            <Button title='Try Again' onPress={loadQuestions}/>
        </View>
        )

    }

    if (isLoading) {
        return( <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large'/>
        </View>)

    }

    return(
        <View style={styles.screen}>
            <Text style={styles.title}> You Have Chosen {chosenCategory.title}, Are You Ready To Start? </Text>
            <StartGameButton onSelect={() => {
                dispatch(setCategory(chosenCategory.id))
                props.navigation.navigate({routeName: 'QuestionScreen'})
            }}/>
        </View>
    )
}

StartGameScreen.navigationOptions = (navigationData) => {

    const catId = navigationData.navigation.getParam('categoryId')
    const chosenCategory = CATEGORIES.find(
        category => category.id === catId
    );

    return {
        headerTitle: chosenCategory.title,
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title:{
        fontFamily: 'teko-med',
        fontSize: 20,
    }

})

export default StartGameScreen;