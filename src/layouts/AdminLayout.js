import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Admin from '../pages/Admin'

function AdminLayout(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="main">
                <Admin/>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout;