import React,{useState, useContext, } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from "../../App"
import M from "materialize-css";
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import "./login.css"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
function Login() {
    const {state,dispatch}= useContext(UserContext)
    const history =useHistory()
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const[type,setType]=useState("text")
    
    // network request to node js
    const PostData=()=>{
        // console.log("the function is working")
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email", classes:"#f44336 red"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password:password,
                email:email
            })

        }).then(res =>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
           
             M.toast({html:data.error, classes:"#f44336 red"})

            }
            else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
             M.toast({html:"signed in successfully", classes:"#6a1b9a purple darken-3"})
             
                history.push('/')
            }


        }).catch(err =>{console.log(err)})
    }
    return (
        <div>
            <div className="mycard">
        
        <div className="card auth-card input-field">
        {/* <h2>Instagram</h2> */}
        {/* <img className="logo__main" src="/socsial1.png" alt="logo" /> */}
        <h2 className="logo-text">
            Login
        </h2>
        {/* <input
        type="text" 
            placeholder=" email" />
        <input 
        type="password" 
            placeholder=" password"/> */}
             <input
        type="text" 
        autoComplete="true" 
            placeholder=" Enter Email" 
            value={email}
        onChange={(e)=>{setEmail(e.target.value)}}

            />
        
        <input 
        type="password"
        autoComplete="true" 
            placeholder=" Enter Password"
            value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
            />
           


{/* 
          <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
          onClick={()=>PostData()}
          >
          Login
          <i className="fa fa-bandcamp" aria-hidden="true"></i>
        </button> */}
        <Button  onClick={()=>PostData()} variant="contained" color="primary" disableElevation startIcon={<LockOpenIcon />}>
             Login
        </Button>
       <p> <Link to="/signup" >Don't have an account  <LiveHelpIcon /></Link></p>
        </div>
        
      </div>
        </div>
    )
}

export default Login
