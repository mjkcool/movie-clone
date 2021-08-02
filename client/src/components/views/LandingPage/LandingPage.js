import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import { Button } from 'antd'
import 'antd/dist/antd.css'

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello') //get request: 포트가 같아야함
        .then(response => console.log(response))
    }, [])


    function onClickHandler() {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    alert("로그아웃 성공")
                }else{
                    alert("로그아웃 실패")
                }
            })
    }


    return (
        <div 
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'}}
        >   
            <Button onClick={onClickHandler}>로그아웃</Button>
            <h1>시작 페이지</h1>
        </div>
    )
}

export default withRouter(LandingPage)
