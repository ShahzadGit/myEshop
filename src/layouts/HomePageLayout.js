import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
// import './../default.scss'
import Homepage from '../pages/Homepage'

function HomePageLayout(props) {
    return (
        <div className="fullHeight">
            <Header {...props} />
                {/* {props.children} */}
                <Homepage />
            <Footer />
        </div>
    )
}

export default HomePageLayout;