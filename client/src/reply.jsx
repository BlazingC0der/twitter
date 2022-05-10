import React, { useState, useEffect } from 'react';
import placeholder from "./img/Portrait_Placeholder.png"
import "./reply.scss"

const Reply = props => {
    const [reply, SetReply] = useState({})
    useEffect(() => {
        SetReply(props.reply)
    },[])
    return (
        <>
            <div className="MainWrapper">
                <img src={placeholder} alt="profile pic" />
                <div className="ReplyBody">
                    <h3>{reply.user}<span className="handle">  @nice_user</span></h3>
                    <p className="ReplyText">{reply.text}</p>
                </div>
            </div> 
        </>
    );
};

export default Reply;