import React, { Link } from 'react'
import './NavBar.css'
import { Layout, Menu } from 'antd'
const { Header } = Layout

function NavBar() {
    return (
        <Header className="nav">
            <div className="logo">MOVIESITE</div>
            <Menu theme="light" mode="horizontal" style={{float: 'left'}}>
                <Menu.Item>Menu1</Menu.Item>
                <Menu.Item>Menu2</Menu.Item>
            </Menu>
            <Menu theme="light" mode="horizontal" style={{float: 'right'}}>
                <Menu.Item>Sign In</Menu.Item>
                <Menu.Item>Sign Up</Menu.Item>
            </Menu>
        </Header>
    )
}

export default NavBar
