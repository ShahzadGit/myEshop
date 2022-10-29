import React from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
import { signInWithGoogle, auth } from './../../firebase/utils'
import { Link } from 'react-router-dom'


const initialState = {
    email: '',
    password: '',
}

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit = async e => {
        e.preventDefault()
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                ...initialState
            })
        } catch (error) {

        }

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        const { email, password } = this.state;
        const configAuthWrapper = {
            headline: 'Login'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
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

}

export default SignIn; 
