import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from './../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './LoginPage.css'

function LoginPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = () => {
        // event.preventDefault()

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) //call reducer
        .then(response => {
            if(response.payload.loginSuccess){ //로그인 성공
                alert("로그인 성공")
                props.history.push('/') //페이지 이동
            }else{ //로그인 실패
                alert("로그인 실패")
            }
        })
    }

    return (
        <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'}}
        >
            <Form 
                onFinish={onSubmitHandler}
                name="normal_login"
                className="login-form"
                // initialValues={{ remember: true }}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email.' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        type="email" value={Email} onChange={onEmailHandler} placeholder="Email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password.' }]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} 
                        type="password" value={Password} onChange={onPasswordHandler} placeholder="Password"/>
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/register">register now</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(LoginPage)