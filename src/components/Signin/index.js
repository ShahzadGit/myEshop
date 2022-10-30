import React, { useState } from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
import { signInWithGoogle, auth } from './../../firebase/utils'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await auth.signInWithEmailAndPassword(email, password)
            resetForm()
            navigate('/')
        } catch (error) {

        }

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
                            <Button onClick={signInWithGoogle}>
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
