import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { API_URL, API_KEY, IMAGE_BASE_URL } from './../../../Config'
import MainImage from './Sections/MainImage'

import { Button } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'

function LandingPage() {

    function onLogoutHandler() { //logout
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success){
                    alert("로그아웃 성공")
                }else{
                    alert("로그아웃 실패")
                }
            })
    }

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)


    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`
        fetch(endpoint).then(response => response.json())
            .then(response => {
                setMovies([response.results]);
                setMainMovieImage(response.results[0]);
            })
    }, [])


    return (
        <div style={{width:'100%', margin:'0'}}>
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={`${MainMovieImage.title}`} 
                    text={`${MainMovieImage.overview}`}/>
            }
            <div style={{width:'85%', margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>
                <Button>Learn more</Button>
            </div>
        </div>

    )
}

export default withRouter(LandingPage)
