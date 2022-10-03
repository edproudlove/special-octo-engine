import { QUESTIONS } from '../../data/dummy'
import Question from '../../models/question'
import { ADD_AWNSERD_QUESTION, SET_CATEGORY, RESET_STATE, ADD_QUESTION, SET_QUESTIONS, REMOVE_QUESTION_FROM_QUIZ } from '../actions/quizActions'

 
const initialState = {
    userAwnsers: [],
    avalibleQuestions: QUESTIONS, 
    score: 0,
    questionsAwnserd: 0,
}



const quizReducer = (state = initialState, action) => { 
    switch (action.type) {
        case ADD_AWNSERD_QUESTION:
            if (action.questionDetails.wasCorrect){
                return {...state, userAwnsers: [...state.userAwnsers, action.questionDetails], score: state.score + 1, questionsAwnserd: state.questionsAwnserd + 1 }
            }
            return {...state, userAwnsers: [...state.userAwnsers, action.questionDetails], questionsAwnserd: state.questionsAwnserd + 1}

        case SET_CATEGORY:
            const category = action.category;
            if (category === 'c11'){
                return state
            } else {
                const filterdQuestions = state.avalibleQuestions.filter(question => {return question.category.includes(category)})
                const authFilterdQuestions = filterdQuestions.filter(question => {return question.isAuthorized})
                return {...state, avalibleQuestions: authFilterdQuestions}
            }

        case RESET_STATE:
            return initialState
            
        case ADD_QUESTION:
            const newQuestion = new Question(
                action.questionData.id, 
                action.questionData.question, 
                action.questionData.awnser, 
                action.questionData.firstIncorrect,
                action.questionData.secondIncorrect,
                action.questionData.thirdIncorrect,
                action.questionData.awnser,
                [action.questionData.category],
                action.questionData.authorId,
                action.questionData.authorName,
                action.questionData.isAuthorized,
            );
 
            //console.log(state.avalibleQuestions)
            return { ...state, avalibleQuestions: state.avalibleQuestions.concat(newQuestion) }
        
        case SET_QUESTIONS:
            return {
                ...state,
                avalibleQuestions: action.questions, 
                //althought three is no filter in this action I think it still workes as this is executed before th other action.
            }
        case REMOVE_QUESTION_FROM_QUIZ:
            return {
                ...state,
                avalibleQuestions: state.avalibleQuestions.filter(question => {return question.id != action.questionId})
            }
            

        default:
            return state


    }

}


export default quizReducer;