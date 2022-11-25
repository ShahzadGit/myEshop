import React, { useState, useEffect } from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.action'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})
const SignIn = (props) => {
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            resetForm()
            //dispatch(resetAllAuthForms())
            navigate('/')
        }
    }, [currentUser])

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(emailSignInStart({ email, password }))

    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart())
    }

    const configAuthWrapper = {
        headline: 'Login'
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Button type="submit">
                        Login
                        </Button>

                    <div className="socialSignin">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign In With Google
                               </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to='/recovery'>
                            Reset Password
                            </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignIn; 
