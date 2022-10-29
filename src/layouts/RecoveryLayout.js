import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Recovery from '../pages/Recovery'

function RecoveryLayout(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="main">
                <Recovery/>
            </div>
            <Footer />
        </div>
    )
}

export default RecoveryLayout;