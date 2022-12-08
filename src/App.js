import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePageLayout from './layouts/HomePageLayout'
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'
import RecoveryLayout from './layouts/RecoveryLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'
import AdminToolbar  from './components/AdminToolbar'
import './default.scss'
import { checkUserSession } from './redux/User/user.action'
import WithAuth from './HOC/withAuth' 
import WithAdminAuth from './HOC/withAdminAuth' 
import { useDispatch } from 'react-redux'

const App = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
    console.log("Hi")
  }, [])


  return (
    <div className="App">
      <AdminToolbar />
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

        <Route path="/admin" element={<WithAdminAuth><AdminLayout /></WithAdminAuth>} />

      </Routes>
    </div>
  );

}

export default App;

// useEffect(() => {
  //   //componentDidMount
  //   const authListener = auth.onAuthStateChanged(async userAuth => {
  //     if (userAuth) {
  //       console.log("User-->", userAuth)
  //       const userRef = await handleUserProfile(userAuth)
  //       userRef.onSnapshot(snapshot => {
  //         dispatch(
  //           setCurrentUser({
  //             id: snapshot.id,
  //             ...snapshot.data()
  //           })
  //         )
  //       })
  //     }
  //     dispatch(setCurrentUser(userAuth))
  //   })
  //   //componentWillUnmount()
  //   return () => {
  //     authListener();
  //   }
  // }, [])