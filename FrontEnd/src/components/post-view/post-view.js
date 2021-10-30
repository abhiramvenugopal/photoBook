import React from 'react';
import './post-view.css'
import icon  from "../../img/icon.png";
import cameraicon from "../../img/cameraicon.png";
import heart from "../../img/heart.svg"
import heartred from "../../img/heart-red.svg"
import paperplane from "../../img/paperplane.png"
import { BrowserRouter as Router ,Switch, Route, Link } from "react-router-dom";
import { getToken } from "../../utils/authOperations";
const axios = require('axios');

class CreatePost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    getData=()=>{
        let token=getToken()
        let header={Authorization:"bearer "+token}
        axios.get('http://localhost:3000/api/v1/posts/',{headers:header})
        .then(function (response) {
            this.setState({posts:response.data.posts.reverse()})
        }.bind(this))
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }
    componentDidMount(){
        this.getData();
    }
    like=(index)=>{
        console.log(index)
        var tempPosts=[...this.state.posts]
        tempPosts[index]={...tempPosts[index],liked:true}
        console.log(tempPosts[index].liked)
        this.setState({posts:tempPosts})

    }

    render(){
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return(
            <div className="container">
        <div className="postview">
            <div className="post-list-container">

            

            {this.state.posts.map((post,index)=>{
                return(
                    <div className="post-container" key={index}>
                        <div className="post-nav">
                            <div className="post-dtls">
                                <p className="name">{post.name}</p>
                                <p className="location">{post.location}</p>
                            </div>
                            <div className="options">
                                <span>...</span>
                            </div>

                        </div>
                        <div>
                            <img src={post.PostImage} alt="error" className="igpost" />
                        </div>
                        <div className="like-section">
                            <div className="heart-plane">
                                {!post.liked && <img src={heart} alt="error" onClick={this.like.bind(this,index)} />}
                                {post.liked && <img src={heartred} alt="error" />}
                                
                            </div>
                            <div className="heart-plane">
                                <img src={paperplane} alt="error" height="23px" width="23px" />
                            </div>
                            <div className="post-date">
                                <span className="date-class">{new Date(post.datetime).getDate()+" "+months[new Date(post.datetime).getMonth()]+" "+new Date(post.datetime).getFullYear()} </span>
                            </div>
                        </div>
                        <div>
                            <span className="likes-count">{post.likes} likes</span>
                        </div>
                        <div className="last-line">
                            <strong>{post.description}</strong>
                        </div>
                        
                        

                    </div>
                );
            })}
            </div>
            
        </div>
    </div>
            
        );
    }
}
export default CreatePost

