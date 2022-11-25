import { takeLatest, call, all, put } from 'redux-saga/effects'
import userTypes from './user.types'
import { signInSuccess, signOutSuccess, resetPasswordSuccess, userError } from './user.action'
import { auth, handleUserProfile, GoogleProvider, getCurrentUser } from './../../firebase/utils'
import { handleResetPasswordAPI } from './user.helpers'

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData })
        const snapshot = yield userRef.get()
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        )
    } catch (error) {

    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)

    } catch (error) {

    }
}

export function* onEmailSingInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {

    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
    try {
        yield auth.signOut()
        yield put(
            signOutSuccess()
        )

    } catch (error) {

    }
}

export function* onSignOutStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* onSignUpStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
} }) {
    if (password !== confirmPassword) {
        const err = 'Password Don\'t match'
        yield put(
            userError(err)
        )
        return
        // dispatch({
        //     type: userTypes.SIGN_UP_ERROR,
        //     payload: err
        // })
    }

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        // yield call(handleUserProfile, {userAuth: user, additionalData: { displayName }} )
        const additionalData = { displayName }
        yield getSnapshotFromUserAuth(user, additionalData)

        // yield put(
        //     signUpStart(user)
        // )
        // dispatch({
        //     type: userTypes.SIGN_UP_SUCCESS,
        //     payload: true
        // })

    } catch (err) {
        console.log(err)
    }
}

export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* resetPassword({ payload: { email } }) {
    try {
        yield call(handleResetPasswordAPI, email)
        yield put(
            resetPasswordSuccess()
        )

    } catch (error) {
        yield put (
            userError(error)
        )
    }
}


export function* googleSignIn() {
    try {
        const {user} = yield auth.signInWithPopup(GoogleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
    yield all([
        call(onEmailSingInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart)
    ])
}