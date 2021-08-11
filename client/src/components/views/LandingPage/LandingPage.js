import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { API_URL, API_KEY } from './../../../Config'

import { Button } from 'antd'
import 'antd/dist/antd.css'
import { Layout, Menu, Breadcrumb } from 'antd'

function LandingPage() {

    // useEffect(() => {
    //     axios.get('/api/hello') //get request: 포트가 같아야함
    //     .then(response => console.log(response))
    // }, [])


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

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`
        return () => {
            fetch(endpoint).then(response => response.json())
            .then(response => console.log(response))
        }
    }, [])



    return (
        <div style={{width:'100%', margin:'0'}}>
            {/* Main Image*/}
            <div style={{width:'85%', margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>
                {/* Movie Grid Cards */}
                음..
            </div>
        </div>

    )
}

//<Button onClick={onClickHandler}>로그아웃</Button>
export default withRouter(LandingPage)
