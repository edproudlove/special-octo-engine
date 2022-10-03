import React from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native'
import { createAnimatedPropAdapter } from 'react-native-reanimated'
import { useSelector, useDispatch  } from 'react-redux'
import { resetState } from '../store/actions/quizActions'

const EndGameScreen = props => {

    const prevAwnsers = useSelector(state => state.quizReducer.userAwnsers)
    const userScore = useSelector(state => state.quizReducer.score)

    const dispatch = useDispatch();


    const renderPastQuestions = ({item, index}) => {
        return (<View style={{...styles.pastAwnserTile, backgroundColor: item.wasCorrect ? '#7feb4d' : '#fa3e3e'}}>
                    <Text style={styles.questionText}>{index + 1}) {item.question}</Text>
                    <Text style={styles.questionText} >Your Awnser -   {item.userAwnser}</Text>
                    <Text style={styles.questionText} >Correct Awnser - {item.awnser}</Text>
            </View>)}

    return (
        <View style={styles.screen}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center',
        alignItems: 'center',}}>
                <View style={styles.scoreTile}>
                    <Text style={styles.scoreFont}>{userScore}/10</Text>
                </View>
                <TouchableOpacity style={{...styles.scoreTile, backgroundColor: '#fa8237'}} onPress={() => {
                    dispatch(resetState())
                    props.navigation.popToTop()
                }}>
                        <Text style={styles.scoreFont}>New Game</Text>
                </TouchableOpacity>
            </View> 
            <FlatList 
            data={prevAwnsers}
            renderItem={renderPastQuestions} 
            keyExtractor={(item, index) => index.toString() }
            />
        </View>
    )
}

EndGameScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Finished',
        headerLeft: () => (
            <Text> </Text>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    pastAwnsers: {

    },
    scoreFont: {
        fontFamily: 'teko-med',
        fontSize: 25,
        color: 'white'
    },
    scoreTile: {
        marginVertical: 10,
        marginHorizontal: 15,
        width: '40%',
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
    questionText: {
        fontFamily: 'teko-med',
        fontSize: 20
    },
    pastAwnserTile: {
        margin: 15,
        padding: 12,
        borderRadius: 8,


    }


})


export default EndGameScreen;