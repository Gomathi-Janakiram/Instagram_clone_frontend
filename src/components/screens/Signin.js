import React, { useState ,useContext} from "react"
import { Link, useHistory } from "react-router-dom"
import M from "materialize-css"
import {userContext} from "../../App"

const Signin = () => {
    const {state,dispatch}=useContext(userContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("https://afternoon-tundra-00775.herokuapp.com/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res =>res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    // as soon as the user is logged in we send a token to him and the token along with the user details is stored in local storage
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))  //bcoz localstorage will save only in string
                    dispatch({type:"USER",payload:data.user})
                    M.toast({ html: "SignedIn successfull", classes: "#00e676 green accent-3" })
                    history.push("/")
                    console.log(state)
                }
            }).catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Log In</h2>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light $64b5f6 blue darken-1" onClick={PostData}>Login</button>
                <span className="subtitleHolder">
                    <Link className="subtitle" to="/signup">Don't have an account?</Link>
                </span>
            </div>
        </div>
    )
}

export default Signin