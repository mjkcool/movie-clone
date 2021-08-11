import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import NavBar from './components/views/NavBar/NavBar'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

import { Layout } from 'antd'
const { Content } = Layout

function App() {
  return (
    <Layout className="layout">
      <NavBar />
      <Content>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
            </Switch>
          </div>
        </Router>
      </Content>
    </Layout>

    
  )
}

export default App