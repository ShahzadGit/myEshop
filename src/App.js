import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePageLayout from './layouts/HomePageLayout'
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'
import RecoveryLayout from './layouts/RecoveryLayout'
// import Homepage from './pages/Homepage'
// import Registration from './pages/Registration'
import './default.scss'

import { auth, handleUserProfile } from './firebase/utils'

const initialState = {
  currentUser: null
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
  }

  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        console.log("User-->", userAuth)
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Routes>
          {/* <Route exact path="/" render={() => (
            <HomePageLayout>
              <Homepage />
            </HomePageLayout>
          )} />
          <Route path="/registration" render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} /> */}

          <Route path="/" element={<HomePageLayout currentUser={currentUser} />} />
          
          <Route path="/registration" element={
            currentUser ? <Navigate replace to="/" /> :
            <MainLayout currentUser={currentUser} />} />

          <Route path="/login" element={
            currentUser ? <Navigate replace to="/" /> :
              <LoginLayout currentUser={currentUser} />} 
          />

          <Route path="/recovery" element={<RecoveryLayout currentUser={currentUser} />} />

        </Routes>
      </div>
    );
  }

}

export default App;
