import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from './../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import 'antd/dist/antd.css'
import './RegisterPage.css'

function RegisterPage(props) {
    const dispatch = useDispatch()

    const [Name, setName] = useState("")
    const [Lastname, setLastname] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onComfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onLastnameHandler = (event) => {
        setLastname(event.currentTarget.value)
    }

    const onSubmitHandler = () => {
        // event.preventDefault()

        // if(Password !== ConfirmPassword){
        //     return alert("비밀번호 확인이 다릅니다.")
        // }

        let body = {
            name: Name,
            email: Email,
            password: Password,
            lastname: Lastname
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.registSuccess){ //회원가입 성공
                    alert("회원가입 성공")
                    props.history.push('/') //페이지 이동
                }else{ //회원가입 실패
                    alert("회원가입 실패")
                }
            })
        
    }

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
    }

    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
    }

    return (
        <div
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'}}>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                className="register-form"
                onFinish={onSubmitHandler}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail',
                    },
                    ]}
                >
                    <Input value={Email} onChange={onEmailHandler}/>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    // tooltip="What do you want others to call you?"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your nickname',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input value={Name} onChange={onNameHandler}/>
                </Form.Item>

                <Form.Item
                    name="lastname"
                    label="Last name"
                    rules={[
                    {
                        required: false,
                        whitespace: true,
                    },
                    ]}
                >
                    <Input value={Lastname} onChange={onLastnameHandler}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password at least 8 characters',
                        min: 8,
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password value={Password} onChange={onPasswordHandler}/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        min: 8,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match'));
                        },
                    }),
                    ]}
                >
                    <Input.Password value={ConfirmPassword} onChange={onComfirmPasswordHandler}/>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                    {
                        validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                    I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(RegisterPage)
