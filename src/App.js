import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePageLayout from './layouts/HomePageLayout'
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'
import RecoveryLayout from './layouts/RecoveryLayout'
import DashboardLayout from './layouts/DashboardLayout'
import './default.scss'
import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/User/user.action'
import { connect } from 'react-redux'
import WithAuth from './HOC/withAuth'

const App = (props) => {
  const { setCurrentUser, currentUser } = props

  useEffect(() => {
    //componentDidMount
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log("User-->", userAuth)
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
    //componentWillUnmount()
    return () => {
      authListener();
    }
  }, [])

  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePageLayout />} />

        <Route path="/registration" element={
          //currentUser ? <Navigate replace to="/" /> :
            <MainLayout />} />

        <Route path="/login" element={
          //currentUser ? <Navigate replace to="/" /> :
            <LoginLayout />}
        />

        <Route path="/recovery" element={<RecoveryLayout />} />

        <Route path="/dashboard" element={<WithAuth><DashboardLayout /></WithAuth>} />
 
      </Routes>
    </div>
  );

}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
