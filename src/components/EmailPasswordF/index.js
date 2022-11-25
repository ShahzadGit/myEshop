import React, { useState, useEffect } from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
// import { auth } from './../../firebase/utils'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetPasswordStart, resetUserState } from './../../redux/User/user.action'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})

function EmailPasswordF(props) {
    const { resetPasswordSuccess, userErr } = useSelector(mapState)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (resetPasswordSuccess) {
            // dispatch(resetAllAuthForms())
            dispatch(resetUserState())
            navigate('/login')
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (userErr.length > 0) {
            setError(userErr)
        }
    }, [userErr])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetPasswordStart({ email }))
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
