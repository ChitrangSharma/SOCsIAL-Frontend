import React,{useContext} from 'react'
import "./Navbar.css"
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../App"
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { makeStyles } from '@material-ui/core/styles';
import CollectionsIcon from '@material-ui/icons/Collections';
import ForumIcon from '@material-ui/icons/Forum';
const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor:"gray",
   
  },
}));

const Navbar=()=> {
  const classes = useStyles();
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList=()=>{
if(state){
 return [
  <li><Link to="/profile"> <Button style={{color:"white"}}startIcon={<AccountCircleIcon style={{color:"white"}} />}>Profile</Button></Link></li>,
  <li><Link to="/createpost"> <Button style={{color:"white"}}startIcon={<AddToQueueIcon style={{color:"white"}}  />}>CreatePost</Button></Link></li>,
  <li><Link to="/myfollowingspost"><Button style={{color:"white"}}startIcon={<CollectionsIcon style={{color:"white"}}  />}>My Follwings</Button></Link></li>,
  <li><Link to="/chat"><Button style={{color:"white"}}startIcon={<ForumIcon style={{color:"white"}}  />}>Chat</Button></Link></li>,
  <li>
    
     <Button
     
     style={{marginRight:"10px"}}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ExitToAppIcon />}
        onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
          }}
      >
       Logout
      </Button>
  </li>
 ]
}
else{
  return[
    <li><Link to="/signin"><Button style={{color:"white"}}startIcon={<AccountCircleIcon style={{color:"white"}} />}>Login</Button></Link></li>,
    <li><Link to="/signup"><Button style={{color:"white"}}startIcon={<AccountCircleIcon style={{color:"white"}} />}>Sign-up</Button></Link></li>
  ]
}
  }
  return (

        <div className="topmost">
             <nav >
    <div className="nav-wrapper" >
      <Link to={state?"/":"/signin"} className="brand-logo left"><img className="logo" src="/socsial1.png" alt="image" /></Link>
      <ul id="nav-mobile" className="right ">
        {/* <li><Link to="/signin">Sign-in</Link></li>
        <li><Link to="/signup">Sign-up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/createpost">Create Post</Link></li> */}
        {renderList()}
      </ul>
         </div>
        </nav>
        </div>
    )
}

export default Navbar