import React from 'react'
import './styles.scss'
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {signOutUserStart} from './../../redux/User/user.action'

const mapState = ({user}) =>({
    currentUser: user.currentUser
})

function Header(props) {
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch()

    const signOut = () =>{
        dispatch(signOutUserStart())
    }
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
                               <Link onClick={() => signOut()}>Logout</Link>
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
