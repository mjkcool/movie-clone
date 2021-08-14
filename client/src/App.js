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
import { Layout, Menu, Breadcrumb } from 'antd';
const { Content, Footer } = Layout;



function App() {
  return (
        <Router>
          <Layout className="layout">
            <NavBar /> {/*Header*/}
            <Content>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, false)} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Movie site. 2021</Footer>
          </Layout>
        </Router>
  )
}

export default App