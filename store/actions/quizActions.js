import Question from '../../models/question'

export const ADD_AWNSERD_QUESTION = 'ADD_AWNSERD_QUESTION'
export const SET_CATEGORY = 'SET_CATEGORY'
export const RESET_STATE = 'RESET_STATE'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SET_QUESTIONS = 'SET_QUESTIONS'
export const REMOVE_QUESTION_FROM_QUIZ = 'REMOVE_QUESTION_FROM_QUIZ'



export const removeQuestionFromQuiz = (id) => {
    return ({type:REMOVE_QUESTION_FROM_QUIZ, questionId: id})
}


export const fetchQuestions = (category) => {
    return async dispatch => { 

        try {
        const response = await fetch('https://rn-quiz-test-project-default-rtdb.firebaseio.com/questions.json'); 

        if (!response.ok) {
            //if there is an error this message will be shown on the screen
            throw new Error('Somthing Went Wrong!')
        }

        const resData = await response.json();
        const loadedQuestions = [];

        for (const key in resData) {
            loadedQuestions.push(new Question(key, 
                resData[key].question,
                resData[key].awnser, 
                resData[key].firstIncorrect,
                resData[key].secondIncorrect,
                resData[key].thirdIncorrect,
                resData[key].awnser,
                [resData[key].category],
                resData[key].authorId,
                resData[key].authorName,
                resData[key].isAuthorized,


                ));
        }

        dispatch({type: SET_QUESTIONS, questions:loadedQuestions, category: category })
    } catch (err) {
        throw err
    }
    } 
}


export const addAwnserdQuestion = questionDetails => {
    return { type: ADD_AWNSERD_QUESTION, questionDetails: questionDetails}
}

export const setCategory = category => {
    return { type: SET_CATEGORY, category: category}
}

export const resetState = () => {
    return {type: RESET_STATE}

}


export const createNewQuestion = (question, category, awnser, firstIncorrect, secondIncorrect, thirdIncorrect) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId;
        //to submit a quation I am going to say that you must be logged in with this token param in url
        const response = await fetch(`https://rn-quiz-test-project-default-rtdb.firebaseio.com/questions.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question,
                awnser,
                category, 
                firstIncorrect,
                secondIncorrect,
                thirdIncorrect,
                authorId: userId,
                authorName: 'Garry Tonan',
                isAuthorized: false,
                    })
        }); 
        const resData = await response.json();

        dispatch({
            type: ADD_QUESTION, 
            questionData: {
                id: resData.name,
                question,
                awnser,
                category, 
                firstIncorrect,
                secondIncorrect,
                thirdIncorrect,
                authorId: userId,
                authorName: 'Garry Tonan',
                isAuthorized: false,
                    }
                })
            }
}
