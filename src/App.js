import React, { useEffect, createContext, useReducer,useContext } from "react"
import { BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import NavBar from "./components/Navbar"
import "./App.css"
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import Signin from "./components/screens/Signin"
import Signup from "./components/screens/Signup"
import CreatePost from "./components/screens/CreatePost"
import { Reducer, initialState } from "./Reducers/UserReducer"
import UserProfile from "./components/screens/UserProfile"
import SubscribedUserposts from "./components/screens/SubscribedUserposts"

export const userContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch}=useContext(userContext)
  useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"))
      if(user){
        console.log(state)
        dispatch({type:"USER",payload:user})
      }else{
        history.push("/signin")
      }
  },[])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/create">
        <CreatePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/myfollowingspost" >
        <SubscribedUserposts/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <>
      <userContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
      </userContext.Provider>

    </>
  );
}

export default App;
