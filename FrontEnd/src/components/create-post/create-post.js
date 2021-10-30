import axios from "axios";
import React from "react";
import { getToken } from "../../utils/authOperations";
import './create-post.css'
import heartred from "../../img/heart-red.svg"
import paperplane from "../../img/paperplane.png"

class CreatePost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:"",
            description:"",
            PostImage:"",
            success:false

        }
        this.createPost=this.createPost.bind(this)
    }

    createPost=async ()=>{
        const data=new FormData();
        data.append("file",this.state.image)
        data.append("upload_preset","instaclone")
        data.append("cloud_name","mycloudabhi")
        await axios.post('https://api.cloudinary.com/v1_1/mycloudabhi/image/upload',data)
        .then(function (response) {
            this.setState({PostImage:response.data.url})
            
        }.bind(this))
        .catch(function (error) {
            // handle error
            console.log(error);
        })


        let token=getToken()

        let header={Authorization:"bearer "+token}
        let body={
            location:this.state.location,
            description:this.state.description,
            PostImage:this.state.PostImage
        }
        
        await axios.post('http://localhost:3000/api/v1/posts/create',body,{headers:header})
        .then(function (response) {
            console.log(response)
            if(response.status===200){
                this.setState({post:response.data.posts})
                this.setState({success:true})
               
                console.log(response.data.posts)
            
            }
        }.bind(this))
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    }
    render(){
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return(
            <div>
                {
                    (!this.state.success) &&
                    <div>
                    
                    <form>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" onChange={(e)=>{this.setState({location:e.target.value});}} value={this.state.location}/>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={(e)=>{this.setState({description:e.target.value});}} value={this.state.description} />
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" onChange={(e)=>{this.setState({image:e.target.files[0]})}}/>
                        <button type="button" className="btn btn-info" onClick={()=>this.createPost()}>Submit Post</button>
                    </form>
                    
                    </div>
                        
                }
                
                {this.state.success &&
                <div>
                    <div className="heading-post-success">
                        <h1>Post Created Sucessfully</h1>
                        <span>Review your post here</span> 
                    </div>
                    <div className="post-container" key={1}>
                    <div className="post-nav">
                        <div className="post-dtls">
                            <p className="name">{this.state.post.name}</p>
                            <p className="location">{this.state.post.location}</p>
                        </div>
                        <div className="options">
                            <span>...</span>
                        </div>

                    </div>
                    <div>
                        <img src={this.state.post.PostImage} alt="error" className="igpost" />
                    </div>
                    <div className="like-section">
                        <div className="heart-plane">
                            {this.state.post.liked && <img src={heartred} alt="error" />}
                            
                        </div>
                        <div className="heart-plane">
                            <img src={paperplane} alt="error" height="23px" width="23px" />
                        </div>
                        <div className="post-date">
                            <span className="date-class">{new Date(this.state.post.datetime).getDate()+" "+months[new Date(this.state.post.datetime).getMonth()]+" "+new Date(this.state.post.datetime).getFullYear()} </span>
                        </div>
                    </div>
                    <div className="last-line">
                        <strong>{this.state.post.description}</strong>
                    </div>
                    </div>
                </div> 
                }
            </div>
        );
    }
}
export default CreatePost