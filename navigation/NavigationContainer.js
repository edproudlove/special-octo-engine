//this is for wrapping the navigation so that we can listen to is hte user logs out 
//and them we cam redirect them back to hte main screen


import React, {useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import QuizNav from './QuizNav'
import {NavigationActions} from 'react-navigation'

const NavigationContainer = props => {
    const navRef = useRef()
    const isAuth = useSelector(state => !!state.auth.token)

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}))
        }
    }, [isAuth])

    //this is just whatever we export from the file, below
    return <QuizNav ref={navRef}/>
}

export default NavigationContainer;