import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from './../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){

    //option: null-아무나출입가능, true-로그인유저만가능, false-로그인하지않은유저만
    function AuthenticationCheck(props){

        const dispatch = useDispatch()

        useEffect(() => {

            dispatch(auth()).then(response => {

                console.log(response)

                //status: logged out
                if(!response.payload.isAuth){
                    if(option){ //true
                        props.history.push('/login')
                    }
                } else { //status: logged in
                    //Only admin and they are not
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(!option){ //Only for logged out
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return(
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}