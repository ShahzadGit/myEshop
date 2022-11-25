import userTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    resetPasswordSuccess: false,
    userErr: ''
    // signInSuccess: false,
    // signUpSuccess: false,
    // signUpError: '',
    // resetSuccess: false,
    // resetError: ''
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: ''
            }
        case userTypes.USER_ERROR:
            return {
                ...state,
                userErr: action.payload
            }
        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}
export default userReducer;

// const userReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case userTypes.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser: action.payload
//             }
//         case userTypes.SIGN_IN_SUCCESS:
//             return {
//                 ...state,
//                 signInSuccess: action.payload
//             }
//         case userTypes.SIGN_UP_SUCCESS:
//             return {
//                 ...state,
//                 signUpSuccess: action.payload
//             }
//         case userTypes.SIGN_UP_ERROR:
//             return {
//                 ...state,
//                 signUpError: action.payload
//             }
//         case userTypes.RESET_SUCCESS:
//             return {
//                 ...state,
//                 resetSuccess: action.payload
//             }
//         case userTypes.RESET_ERROR:
//             return {
//                 ...state,
//                 resetError: action.payload
//             }
//         case userTypes.RESET_AUTH_FORMS:
//             return {
//                 ...state,
//                 signInSuccess: false,
//                 signUpSuccess: false,
//                 signUpError: '',
//                 resetSuccess: false,
//                 resetError: ''
//             }
//         default:
//             return state;
//     }
// }
