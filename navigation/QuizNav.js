import React from 'react'
import {Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import StartGameScreen from '../screens/StartGameScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import QuestionsScreen from '../screens/QuestionScreen'
import EndGameScreen from '../screens/EndGameScreen'
import AddQuestionScreen from '../screens/AddQuestionScreen'
import AuthScreen from '../screens/users/AuthScreen'
import StartUpScreen from '../screens/users/StartUpScreen'
import ProfileScreen from '../screens/users/ProfileScreen'


const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: '#bc5dc7'
    },
    headerTintColor:  'white',
    headerTitleStyle: {
        fontFamily: 'teko-med',
        fontSize: 25,
    },
    headerBackTitleStyle: {
        fontFamily: 'teko-med',
        fontSize: 25,

    }
}

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen,
}, {defaultNavigationOptions: defaultStackNavOptions})




const QuizNavagator = createStackNavigator({
    Categories: CategoriesScreen,
    StartGame: StartGameScreen,
    QuestionScreen: QuestionsScreen,
    EndGameScreen: EndGameScreen,
    AddQuestionScreen: AddQuestionScreen,
}, {defaultNavigationOptions: defaultStackNavOptions})



const QuizTabNavigator = createBottomTabNavigator({
    Quiz: {screen: QuizNavagator},
    Profile: {screen: ProfileNavigator},
}, {
    tabBarOptions: {
        activeTintColor: '#bc5dc7',
        labelStyle: {
            fontFamily: 'teko-med',
            fontSize: 20,

        }
    }
});

const AuthScreenNavigator = createStackNavigator({
    Auth: AuthScreen,
}, {defaultNavigationOptions: defaultStackNavOptions})

const MainNavigator = createSwitchNavigator({
    StartUp: StartUpScreen,
    Auth:AuthScreen,
    Quiz:QuizTabNavigator,
}, {defaultNavigationOptions: defaultStackNavOptions})

export default createAppContainer(MainNavigator);