// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Tweets {
    struct tweet {
        string user;
        string text;
        uint256 likes;
        reply[] replies;
        // mapping(bytes32=>reply);
    }
    struct reply {
        string user;
        string text;
        // uint likes;
    }
    mapping(bytes32 => tweet) public TweetDb;

    function Tweet(string memory txt, string memory username) public {
        bytes32 HashCode = keccak256(abi.encodePacked(txt));
        tweet memory temp;
        temp.text = txt;
        temp.user = username;
        temp.likes = 0;
        TweetDb[HashCode] = temp;
    }

    function liker(string memory txt, bool inc) public {
        inc
            ? TweetDb[keccak256(abi.encodePacked(txt))].likes++
            : TweetDb[keccak256(abi.encodePacked(txt))].likes--;
    }

    function replies(
        string memory TweetText,
        string memory ReplyText,
        string memory username
    ) public {
        TweetDb[keccak256(abi.encodePacked(TweetText))].replies.push(
            reply(username, ReplyText)
        );
    }

    /* function GetTweets() public view returns(tweet[] memory){

    } */
}
