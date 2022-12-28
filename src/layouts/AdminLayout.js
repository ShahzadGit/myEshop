import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Admin from '../pages/Admin'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutUserStart } from './../redux/User/user.action'
import VerticalNav from './../components/VerticalNav'

function AdminLayout(props) {
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(signOutUserStart())
    }

    return (
        <div className="adminLayout">
            <Header {...props} />

            <div className="controlPanel">
                <div className="sidebar">
                    <VerticalNav>
                        <ul>
                            <li>
                                <Link to="/admin">
                                    Home
                            </Link>
                            </li>
                            <li>
                                <span className="signOut" onClick={() => signOut()}>
                                    Sign Out
                            </span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>
                <div className="content">
                    <Admin />
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default AdminLayout;