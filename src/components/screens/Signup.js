import React,{useState} from "react"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css"

const Signin = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")

    const PostData=()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
             return
        }
        fetch("https://afternoon-tundra-00775.herokuapp.com/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }else{
                M.toast({html:data.message,classes:"#00e676 green accent-3"})
                history.push("/signin")
            }
          
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>SignUp</h2>
                <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light $64b5f6 blue darken-1" onClick={PostData}>SignUp</button>
                <span className="subtitleHolder">
                    <Link className="subtitle" to="/signin">Already Registered?</Link>
                </span>
            </div>
        </div>
    )
}

export default Signin