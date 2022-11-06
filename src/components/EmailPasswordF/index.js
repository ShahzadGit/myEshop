import React, { useState, useEffect } from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
// import { auth } from './../../firebase/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword, resetAllAuthForms } from './../../redux/User/user.action'

const mapState = ({ user }) => ({
    resetSuccess: user.resetSuccess,
    resetError: user.resetError
})

function EmailPasswordF(props) {
    const { resetSuccess, resetError } = useSelector(mapState)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (resetSuccess) {
            dispatch(resetAllAuthForms())
            navigate('/login')
        }
    }, [resetSuccess])

    useEffect(() => {
        if (resetError.length > 0) {
            setError(resetError)
        }
    }, [resetError])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetPassword({ email }))
    }
    const configAuthWrapper = {
        headline: 'e-mail Password'
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
