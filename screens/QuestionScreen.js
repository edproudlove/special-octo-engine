import React, { useState } from 'react'
import {StyleSheet, View, Text, FlatList, ActivityIndicator, Button} from 'react-native'
import QuestionsGridTile from '../componants/QuestionsGridTile'

import { QUESTION_COLORS } from '../assets/Colors'
import { useSelector, useDispatch  } from 'react-redux'
import { addAwnserdQuestion, removeQuestionFromQuiz } from '../store/actions/quizActions'
import { resetState } from '../store/actions/quizActions'

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}



const QuestionsScreen = props => {
    const avalibleQuestions = useSelector(state => state.quizReducer.avalibleQuestions);
    const numberOfQuestionsAwnserd = useSelector(state => state.quizReducer.questionsAwnserd)
    const dispatch = useDispatch();
    
    const prevAwnsers = useSelector(state => state.quizReducer.userAwnsers)

    const currentQuestion = avalibleQuestions[numberOfQuestionsAwnserd]

    if (!currentQuestion) {
        return(
            <View>
                <Text>The Quiz Is Over</Text>
                <Button title="Click Here" onPress={() => 
                    props.navigation.navigate({routeName: 'EndGameScreen'})
                }/>
                <Text>To See How You Did</Text> 
            </View>
        )
    }
    
    const handleAwnserdQuestion = (questionDetails, questionId) => {
        dispatch(addAwnserdQuestion(questionDetails))
        if (prevAwnsers.length > 8 ) {//|| avalibleQuestions.length < 1){
            //could aslo dispath a game finished action wherer it resets things
            props.navigation.navigate({routeName: 'EndGameScreen'})
        } else {
            props.navigation.push('QuestionScreen') //this works Howver I dont like the animation.
        }
    }

    const renderQuestionsGridData  = ({item, index}) => {
        return (<QuestionsGridTile 
        bgColor={QUESTION_COLORS[index]}
        awnser={item} 
        onSelect={() =>      
            handleAwnserdQuestion({
            question: currentQuestion.question,
            awnser: currentQuestion.correct,
            userAwnser: item,
            wasCorrect: (item === currentQuestion.correct)
            }, currentQuestion.id)}
        />)
    };

    return(
        <View style={styles.screen}>
            <View style={{flex: 1}}>
                <Text style={styles.question}>{prevAwnsers.length + 1}) {currentQuestion.question} </Text>
                
            </View>
            <View style={styles.awnserContainer}>
                <FlatList 
                    scrollEnabled={false}
                    style={styles.awnsers} 
                    data={shuffleArray(currentQuestion.awnsers)} 
                    renderItem={renderQuestionsGridData} 
                    keyExtractor={(item, index) => index.toString() }
                    />
            </View>
            <View style={styles.authorTab}>
                <Text style={styles.authorFont}>Written By: {currentQuestion.authorName}</Text>
            </View>
        </View>
    )
}

QuestionsScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Questions',
	    headerTitleStyle: {
            fontFamily: 'teko-med',
            fontSize: 25,
        },
        headerLeft: () => null,
    }
}



const styles = StyleSheet.create({
    awnserContainer: {
        //flex: 1,
        width: '100%',
          marginBottom: 20, 
          justifyContent: 'center', 
          alignItems: 'center',
        },

    screen: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    awnsers: {
        width: '100%',
    },
    question: {
        fontFamily: 'teko-med',
        fontSize: 30,
    },
    scoreTile: {
        marginVertical: 10,
        marginHorizontal: 15,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        //width: 200,
        //height: 100,
        backgroundColor: '#d044e3',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,

    },
    scoreFont: {
        fontFamily: 'teko-med',
        fontSize: 25,
        color: 'white'
    },
    authorFont: {
        fontFamily: 'teko-med',
        fontSize: 20,
        color: '#05a60a'
    },
    authorTab: {
        margin: 5,

    }

})

export default QuestionsScreen;