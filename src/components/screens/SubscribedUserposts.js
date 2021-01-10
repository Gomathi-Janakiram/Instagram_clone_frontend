import React, { useState, useEffect, useContext } from "react"
import { userContext } from "../../App"
import {Link} from "react-router-dom"

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(userContext)

    useEffect(() => {
        fetch("https://afternoon-tundra-00775.herokuapp.com/getsubpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.posts)
                console.log(data)
                console.log(dispatch)
            })
            // eslint-disable-next-line
    },[])

    const likePost = (id) => {
        fetch("https://afternoon-tundra-00775.herokuapp.com/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        console.log(result)
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
                // setData(result)      this can also be implemented 
                console.log(data)
                console.log(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const UnlikePost = (id) => {
        fetch("https://afternoon-tundra-00775.herokuapp.com/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        console.log(result)
                        return result
                    } else {
                        console.log(item)
                        return item
                    }
                })
                setData(newData)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch("https://afternoon-tundra-00775.herokuapp.com/comment", {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                postId: postId
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
    }

    const deletepost = (postId) => {
        fetch(`https://afternoon-tundra-00775.herokuapp.com/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData=data.filter(item=>{
                    return item._id!==result._id
                })
                setData(newData)
            })
    }

    
    return (
        <div className="home">
            {data.map(item => (
                <div className="card home-card" key={item._id} >
                    <h5 style={{padding:"5px"}}><Link to={item.postedBy._id!==state._id ?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link> {item.postedBy._id===state._id && 
                    <i className="material-icons" style={{ float:"right" }}
                    onClick={()=>deletepost(item._id)}>delete</i>}
                       
                    </h5>
                    <div className="card-image">
                        <img src={item.photo} alt="pic5" />
                    </div>
                    <div className="card-content">
                        <i className="material-icons" style={{ color: "red" }}>favorite</i>
                        {item.likes.includes(state._id)
                            ? <i className="material-icons" onClick={() => { UnlikePost(item._id) }}>thumb_down</i> :
                            <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                        }
                        <h6>{item.likes.length} likes</h6>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        {item.comments.map(comment => (
                            <h6 key={comment._id}><span style={{ fontWeight: "500" }}>{comment.postedBy.name}   </span>{comment.text}</h6>
                        ))}
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            makeComment(e.target[0].value, item._id)
                        }}>
                            <input type="text" placeholder="Add comment" />
                        </form>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default Home