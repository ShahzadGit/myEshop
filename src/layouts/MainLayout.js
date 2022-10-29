import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Registraion from '../pages/Registration'

function MainLayout(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="main">
                <Registraion/>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;