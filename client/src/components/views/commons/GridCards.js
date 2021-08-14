import React from 'react'
import { Col } from 'antd' 

function GridCards(props) {
    return (
        <Col lg={6} md={8} sm={12} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${props.movieId}`}>
                    <img src={props.image} style={{width:'100%', height:'100%'}} alt={props.movieName}/>
                </a>
            </div>
        </Col>
    )
}

export default GridCards
