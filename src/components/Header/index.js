import React from 'react'
import './styles.scss'
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom'
import { auth } from './../../firebase/utils'
import {useSelector} from 'react-redux'

const mapState = ({user}) =>({
    currentUser: user.currentUser
})

function Header(props) {
    const { currentUser } = useSelector(mapState)

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to='/'>
                        <img src={Logo} alt="myEshop LOGO" />
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                               <Link to='/dashboard'>My Account</Link>
                            </li>
                            <li>
                               <Link onClick={() => auth.signOut()}>Logout</Link>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            {/* <li>
                               <Link to='/dashboard'>Dashboard</Link>
                            </li> */}
                            <li>
                                <Link to='/registration'>Register</Link>
                            </li>

                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    )}

                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}


export default Header;
