import React, { useState, useEffect } from 'react';
import placeholder from "./img/placeholder.jpeg"
import "./reply.scss"

const Reply = props => {
    const [reply, SetReply] = useState({})
    useEffect((props) => {
        SetReply(props.reply)
    },[])
    return (
        <>
            <div className="MainWrapper">
                <img src={placeholder} alt="profile pic" />
                <div className="ReplyBody">
                    <h3>user 69<span className="handle">  @nice_user</span></h3>
                    <p className="ReplyText">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            </div> 
        </>
    );
};

export default Reply;