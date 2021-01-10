import React,{useState,useEffect,useContext} from "react"
import {userContext} from "../../App"

const Profile=()=>{
    const [mypics,setMypics]=useState([])
    const {state,dispatch}=useContext(userContext)
    useEffect(()=>{
        fetch("https://afternoon-tundra-00775.herokuapp.com/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMypics(result.mypost)
            console.log(dispatch)
        })
    },[])
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} alt="pics"
                        src="https://images.unsplash.com/photo-1469259943454-aa100abba749?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Zmxvd2Vyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:0} followers</h6>
                        <h6>{state?state.following.length:0} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {mypics.map(item=>(
                    <img key={item._id}className="item" src={item.photo} alt="pic3"/>
                ))}
            </div>
        </div>
    )
}

export default Profile