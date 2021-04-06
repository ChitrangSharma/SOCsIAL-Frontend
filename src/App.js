import React,{useEffect, createContext, useReducer, useContext} from "react"
// import "App.css"
import Navbar from "./component/Navbar"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Home from "./component/screens/Home"
import Profile from "./component/screens/Profile"
import Signin from "./component/screens/Login"
import SignUp from "./component/screens/SignUp"
import CreatePost from "./component/screens/CreatePost"
import {initialState, reducer} from "./reducer/userReducer"
import UserProfile from "./component/screens/UserProfile"

import SubscribedUserPosts from "./component/screens/SubscribedUserPosts"
import Chat from "./component/screens/Chat"
export const UserContext = createContext()



const Routing =()=>{

  const history = useHistory()
  const {state, dispatch}= useContext(UserContext)
useEffect(()=>{
const user =JSON.parse(localStorage.getItem("user"))
console.log(typeof(user),user)

if(user){
  dispatch({type:"USER",payload:user})
// history.push('/')
}
else{
  history.push("/signin")
}
},[])
  return (
    <Switch>
    <Route path="/" exact>
    <Home />
  </Route>
  <Route exact path="/profile" exact>
    <Profile />
  </Route>
  <Route path="/signin" exact>
    <Signin />
  </Route>
  <Route path="/signup" exact>
    <SignUp />
  </Route>
  <Route path="/createpost" exact>
    <CreatePost />
  </Route>
  <Route path="/profile/:userid" exact>
    <UserProfile/>
  </Route>
  <Route path="/myfollowingspost" exact>
    <SubscribedUserPosts/>
  </Route>
  <Route path="/chat" exact>
    <Chat/>
  </Route>
  </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
     <BrowserRouter>

     <Navbar />
     <Routing />
    
    </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
