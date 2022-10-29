import React, { useState } from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
import { auth } from './../../firebase/utils'
import { useNavigate } from 'react-router-dom'

function EmailPasswordF(props) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const config = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log('Password Reset...', email)
                    navigate('/login')
                })
                .catch(() => {
                    setError("Email not found...")

                })
            
        } catch (error) {
            console.log(error)
        }
    }
    const configAuthWrapper = {
        headline: 'Email Password'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {error.length > 0 &&
                    <ul>
                        <li>{error}</li>
                    </ul>
                }
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}
export default EmailPasswordF; 
