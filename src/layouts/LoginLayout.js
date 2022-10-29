import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Login from '../pages/Login'

function LoginLayout(props) {
    return (
        <div>
            <Header {...props} />
            <div className="main">
                <Login/>
            </div>
            <Footer />
        </div>
    )
}

export default LoginLayout;