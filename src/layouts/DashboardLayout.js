import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Dashboard from '../pages/Dashboard'

function DashboardLayout(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="main">
                <Dashboard/>
            </div>
            <Footer />
        </div>
    )
}

export default DashboardLayout;