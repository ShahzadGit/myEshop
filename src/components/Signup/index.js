import React from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import { handleUserProfile, auth } from './../../firebase/utils'
import AuthWrapper from '../AuthWrapper'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
}


class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            const err = ['Password Don\'t match']
            this.setState({
                errors: err
            })
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName })
            this.setState({
                ...initialState
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
        const configAuthWrapper = {
            headline: 'Registration'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>

                <div className="formWrap">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            onChange={this.handleChange}
                        />
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />

                        <Input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
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

}

export default SignUp; 
