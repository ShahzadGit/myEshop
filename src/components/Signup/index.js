import React, { useState, useEffect } from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
// import { handleUserProfile, auth } from './../../firebase/utils'
import AuthWrapper from '../AuthWrapper'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.action'

const mapState = ({user}) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})
const SignUp = () => {
    const {signUpSuccess, signUpError} = useSelector(mapState)
    const dispatch = useDispatch()
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if(signUpSuccess){
            resetForm()
            dispatch(resetAllAuthForms())
            navigate('/')
        }
    },[signUpSuccess])

    useEffect(() => {
        if(signUpError.length > 0){
            setError(signUpError)
        }
    },[signUpError])

    const resetForm = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setError('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        dispatch(signUpUser({
            displayName, email, password, confirmPassword
        }))
       
    }

    const configAuthWrapper = {
        headline: 'Registration'
    }
    return (
        <AuthWrapper {...configAuthWrapper}>

            <div className="formWrap">
                {error.length > 0 && (
                    <ul>
                        <li>
                           {error}
                        </li>
                    </ul>
                )}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        onChange={(e)=>{setDisplayName(e.target.value)}}
                    />
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />

                    <Input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />

                    <div className="socialSignin">
                        <div className="row">
                            <Button type="submit" >
                                Register
                               </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignUp; 
