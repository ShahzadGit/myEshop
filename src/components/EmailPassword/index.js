import React from 'react'
import './styles.scss'
import Button from './../Forms/Button'
import Input from './../Forms/Input'
import AuthWrapper from './../AuthWrapper'
import { auth } from './../../firebase/utils'
// import {withRouter} from './../withRouter'
import { Navigate } from 'react-router-dom'

const initialState = {
    email: ''

}

class EmailPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState, 
            submitted: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit = async e => {
        e.preventDefault()
        try {
            const { email } = this.state
            const config = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    console.log('Password Reset')
                    // this.props.history.push('/login')
                    // this.props.navigate('/login')
                     this.setState({submitted: true}) 
                    })
                .catch(() => {
                    console.log('Something went wrong')
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
        const { email, submitted } = this.state;
        const configAuthWrapper = {
            headline: 'Email Password'
        }
        console.log("Submitted: ", submitted)
        {submitted && <Navigate to='/login'/>}
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
                        {/* <Input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        /> */}
                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    }

}

export default EmailPassword; 
