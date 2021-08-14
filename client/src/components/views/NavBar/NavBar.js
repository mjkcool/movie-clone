import React from 'react'
import './NavBar.css'
import { Layout, Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
const { Header } = Layout

function NavBar() {
    const history = useHistory()
    function ToMain() { history.push('/') }
    function ToSignIn() { history.push('/login') }
    function ToSignUp() { history.push('/register') }
    return (
        <Header className="nav">
            <div className="logo" onClick={ToMain} style={{cursor:'pointer', color:'white'}}>MOVIESITE</div>
            <Menu theme="dark" mode="horizontal" style={{float: 'left'}}>
                <Menu.Item>Menu1</Menu.Item>
                <Menu.Item>Menu2</Menu.Item>
            </Menu>
            <Menu theme="dark" mode="horizontal" style={{float: 'right'}}>
                <Menu.Item onClick={ToSignIn}>Sign In</Menu.Item>
                <Menu.Item onClick={ToSignUp}>Sign Up</Menu.Item>
            </Menu>
        </Header>
    )
}

export default NavBar
