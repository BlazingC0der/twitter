import React, { useState, useEffect } from 'react';
import "./tweet.scss";
import placeholder from "./img/placeholder.jpeg"
import Reply from './reply';

const Tweet = props => {
    const [tweet, SetTweet] = useState({})
    const [replies, SetReplies] = useState([])
    const [likes, SetLikes] = useState(0)
    const [ShowReplies, SetShowReplies] = useState(false)
    const [like, SetLike] = useState(false)
    const [ReplyText, SetReplyText] = useState("")
    const [account, SetAccount] = useState(null)
    const [contract, SetContract] = useEffect(null)
    useEffect((props) => {
        SetTweet(props.post)
        SetReplies(props.post.replies)
        SetAccount(props.account)
        SetContract(props.contract)
    },[])
    const reply = () => {
        ShowReplies ? document.querySelector(".replies").style.display = "none" : document.querySelector(".replies").style.display = "block"
        SetShowReplies(!ShowReplies)
    }
    const liker = () => {
        const LikeBtn =  document.querySelector(".like")
        if (!like) {
            LikeBtn.style.color="red"
            SetLikes(likes + 1)
            contract.methods.liker(tweet.text,!like).send({ from: account })
        }
        else {
            LikeBtn.style.color="black"
            SetLikes(likes - 1)
            contract.methods.liker(tweet.text,!like).send({ from: account })
        }
        SetLike(!like)
    }
    const ReplySubmitter = async (e) => {
        e.preventDefault()
        // await contract.methods.replies(text,"user420").send({ from: accounts[0] })
    }

    const ReplyGen = async (e) => {
        e.preventDefault()
        SetReplyText(e.target.value)
    }
    return (
        <>
            <div className='tweet'>
                <div className="TweetHeader">
                    <img src={placeholder} alt="profile pic" />
                    <h1>user 420<span className="handle">  @nice_user</span></h1>
                </div>
                <p className="TweetBody">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod minus repellat ea assumenda enim hic corrupti. Possimus ipsa temporibus, nobis provident expedita quam iure. Pariatur ratione quam quasi unde ullam.</p>
                <div className="BtnWrapper">
                    <button className="interaction like" onClick={liker}>
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                        <span>{likes}</span>
                    </button>
                    <button className="interaction reply" onClick={reply}>
                        <span class="material-symbols-outlined">
                            reply
                        </span>
                    </button>
                </div>
                <div className="ReplyInput">
                    <form onsubmit={ReplySubmitter}>
                        <input type="text" name="reply" id="reply" placeholder="Write a reply" onChange={ReplyGen} />
                    </form>
                </div>
                {/* <div className="replies"><Reply /></div> */}
                <div className="replies">
                    {replies.map((reply) => {
                    <Reply reply={reply}/>
                    })}
                </div>
            </div>
        </>
    );
};

export default Tweet;