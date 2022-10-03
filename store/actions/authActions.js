import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type: AUTHENTICATE, userId: userId, token: token})
    }
}


export const signup = (email, password) => {
    return async (dispatch, getState) => {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtSfm23jzWzRu5pcc-xPo9N5cS82BQp1I', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,

                })
            })
            if(!response.ok) {
                const errorResData = await response.json()
                const errorId = errorResData.error.message;
                let message = 'Somthing Went Wrong'

                if (errorId === 'EMAIL_EXISTS') {
                    message = 'Email already Registerd, please try another.'
                } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                    message = 'You have tried too many registration attempts, please try again later'
                }

                throw new Error(message)
            }

            const resData = await response.json()
            //console.log(resData)


        //dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId, })
        dispatch(authenticate(
            resData.localId, 
            resData.idToken, 
            parseInt(resData.expiresIn) * 1000 ))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtSfm23jzWzRu5pcc-xPo9N5cS82BQp1I', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,

                })
            })
            if(!response.ok) {
                const errorResData = await response.json()
                const errorId = errorResData.error.message;
                let message = 'Somthing Went Wrong'

                if (errorId === 'EMAIL_NOT_FOUND') {
                    message = 'Email Not Registerd, please try another.'
                } else if (errorId === 'INVALID_PASSWORD') {
                    message = 'This password is not valid'
                }

                throw new Error(message)
            }

            const resData = await response.json()

        dispatch(authenticate(
            resData.localId, 
            resData.idToken,
            parseInt(resData.expiresIn) * 1000, 
            ))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000).toISOString
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString,
    }))
}
const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}


export const logout = () => { 
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {type: LOGOUT}
}