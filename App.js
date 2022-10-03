import React, {useState} from 'react';
import QuizNavagator from './navigation/QuizNav'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import quizReducer from './store/reducers/quizReducers'
import authReducer from './store/reducers/authReducers'

import QuizNav from './navigation/QuizNav'
import NavigationContainer from './navigation/NavigationContainer'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  auth: authReducer,
  quizReducer: quizReducer,
})

const fetchFonts = () => {
  return Font.loadAsync({
    'teko-med': require('./assets/fonts/Teko-Medium.ttf'),
    'teko-bold': require('./assets/fonts/Teko-Bold.ttf'),
  })
}


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

