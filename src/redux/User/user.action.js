import userTypes from './user.types'

export const emailSignInStart = userCredentials => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
})

export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION
}) 

export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
})

export const signOutSuccess = () => ({
    type: userTypes.SIGN_OUT_SUCCESS
})

export const signUpStart = userCredentials => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials
})

export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload: err
})

export const resetPasswordStart = userCredentials => ({
    type: userTypes.RESET_PASSWORD_START,
    payload: userCredentials
})

export const resetPasswordSuccess = () => ({
    type: userTypes.RESET_PASSWORD_SUCCESS,
    payload: true
})

export const resetUserState = () => ({
    type: userTypes.RESET_USER_STATE
})

export const googleSignInStart = () => ({
    type: userTypes.GOOGLE_SIGN_IN_START
})


export const setCurrentUser = user =>({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})



// export const signInUser = ({  email, password }) => async dispatch => {
//     try {
//         await auth.signInWithEmailAndPassword(email, password)
//         dispatch({
//             type: userTypes.SIGN_IN_SUCCESS,
//             payload: true
//         })
//     } catch (error) {

//     }
// }

// export const signUpUser = ({ displayName, email, password, confirmPassword}) => async dispatch => {
//     if (password !== confirmPassword) {
//         const err = 'Password Don\'t match'
//         dispatch({
//             type: userTypes.SIGN_UP_ERROR,
//             payload: err
//         })
//         return;
//     }

//     try {
//         const { user } = await auth.createUserWithEmailAndPassword(email, password);

//         await handleUserProfile(user, { displayName })
//         dispatch({
//             type: userTypes.SIGN_UP_SUCCESS,
//             payload: true
//         })

//     } catch (err) {
//         console.log(err)
//     }
// }

/*   resetPassword
export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url: 'http://localhost:3000/login'
    }
    try {
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_SUCCESS,
                    payload: true
                })
             
            })
            .catch(() => {
                dispatch({
                    type: userTypes.RESET_ERROR,
                    payload: 'Email not found...'
                })
            })
        
    } catch (error) {
        console.log(error)
    }
}
 */

 /* signInWithGoogle
 export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({
                    type: userTypes.SIGN_IN_SUCCESS,
                    payload: true
                })
            })    
    } catch (error) {
        
    }
    
}
*/

// export const resetAllAuthForms = () => ({
//     type: userTypes.RESET_AUTH_FORMS    
// })