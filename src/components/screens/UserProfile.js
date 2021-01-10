import React, { useState, useEffect, useContext } from "react"
import { userContext } from "../../App"
import { useParams } from "react-router-dom"

const Profile = () => {
    const [userprofile, setuserprofile] = useState(null)
    const [showFollow,setShowFollow]=useState(true)
    const { state, dispatch } = useContext(userContext)
    const { userid } = useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`https://afternoon-tundra-00775.herokuapp.com/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setuserprofile(result)
            })
    }, [])

    const FollowUser=()=>{
        fetch("https://afternoon-tundra-00775.herokuapp.com/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            setShowFollow(false)
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setuserprofile(prevState=>{
                return{
                    ...prevState,
                    user:{...prevState.user,followers:[...prevState.user.followers,data._id]}
                }
            })
        })
    }

    const unFollowUser=()=>{
        fetch("https://afternoon-tundra-00775.herokuapp.com/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setuserprofile(prevState=>{
                const newFollower=prevState.user.followers.filter(item=>item!=data._id)
                return{
                    ...prevState,
                    user:{...prevState.user,followers:newFollower}
                }
            })
            setShowFollow(true)

        })
    }


    return (
        <>
            {userprofile ?
                <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid grey" }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src="https://images.unsplash.com/photo-1469259943454-aa100abba749?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Zmxvd2Vyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
                            />
                        </div>
                        <div>
                            <h4>{userprofile.user.name}</h4>
                            <h4>{userprofile.user.email}</h4>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{userprofile.posts.length} posts</h6>
                                <h6>{userprofile.user.followers.length} followers</h6>
                                <h6>{userprofile.user.following.length} following</h6>
                            </div>
                            {showFollow?<button style={{margin:"10px"}}
                            className="btn waves-effect waves-light $64b5f6 blue darken-1" onClick={FollowUser}>Follow</button>:
                            <button style={{margin:"10px"}}
                            className="btn waves-effect waves-light $64b5f6 blue darken-1" onClick={unFollowUser}>Un Follow</button>
                            }
                        </div>
                    </div>
                    <div className="gallery">
                        {userprofile.posts.map(item => (
                            <img key={item._id} className="item" src={item.photo} />
                        ))}
                    </div>
                </div> :<h4>loading.........!</h4>
            }

        </>
    )
}

export default Profile