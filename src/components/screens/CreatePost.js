import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import M from "materialize-css"

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    const PostDetails = () => {
        const data = new FormData()   //if we have to post a file,we have to do this
        data.append("file", image)
        data.append("upload_preset", "insta-clone")  //insta-clone is the name we gave in cloudinary
        data.append("cloud_name", "cloudinary-imaginary")        //cloud name
        fetch("https://api.cloudinary.com/v1_1/cloudinary-imaginary/image/upload", {   //base url specified in cloudinary
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (url) {
            postBackend()
        }
    }, [url])

    const postBackend = () => {
        fetch("https://afternoon-tundra-00775.herokuapp.com/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt") //when the user is signed in his jwt token is stored in localstorage and we it here to allow him inside the protected resource
            },
            body: JSON.stringify({
                title: title,
                body: body,
                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: "Created post", classes: "#00e676 green accent-3" })
                    history.push("/")
                }
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="card input-field"
            style={{ margin: "30px auto", maxWidth: "500px", padding: "20px", textAlign: "center" }}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
            <div className="file-field input-field">
                <div className="btn  #64b5f6 blue darken-1">
                    <span>UPLOAD IMAGE</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={PostDetails}>Submit Post</button>
        </div>
    )
}

export default CreatePost