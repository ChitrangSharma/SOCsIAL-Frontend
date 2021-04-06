import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"
import "./profile.css"
import{useParams} from "react-router-dom"
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EcoIcon from '@material-ui/icons/Eco';
import DoneAllIcon from '@material-ui/icons/DoneAll';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    root1: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop:"10px",
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor:"transparent",
    },
    gridList: {
      width: 600,
      height: 550,
    },
    iconStyle:{
      color:"white"
    }
  }));



function UserProfile() {
    const classes = useStyles();
    const [userProfile, setProfile]=useState(null)
  
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const[showfollow, setShowFollow]=useState(state?!state.following.includes(userid):true)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`, {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }
        ).then(res=>res.json())
        .then(result=>{
            // console.log(result)
      
            setProfile(result)
            // setPics(result.mypost)
        })
    },[])

    // follow | unfollow
    const followUser =()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data =>{
            console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)

        })
    }

    // unfollow user 
    const unfollowUser =()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data =>{
            console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
                setShowFollow(true)
        })
    }


    return (
        <>
        {userProfile?
            <div style={{maxWidth:'900px', margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px0px",
                borderBottom:"1px solid gray"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px", marginTop:"10px", marginBottom:"10px"}} src={userProfile.user.pic} alt="image" />
                </div>
                <div>
                    <h4  style={{color:"rgb(214, 212, 211)"}}> {userProfile?userProfile.user.name:<Skeleton/>}</h4>
                    <h4 style={{color:"rgb(214, 212, 211)"}}>{userProfile?userProfile.user.email:<Skeleton/>}  <MailOutlineIcon style={{color:"tomato"}}/></h4>
                    <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
                        <h6 style={{color:"rgb(214, 212, 211)"}}>{userProfile.posts.length} posts <PhotoLibraryIcon style={{color:"rgb(128, 180, 240)"}}/></h6>
                        <h6 style={{color:"rgb(214, 212, 211)"}}>{userProfile.user.followers.length} followers <EcoIcon style={{color:"rgb(95, 241, 151)"}}/></h6>
                        {/* {console.log("the followers are ====>",userProfile.user.followers.length)} */}
                        <h6  style={{color:"rgb(214, 212, 211)"}}>{userProfile.user.following.length} following <DoneAllIcon style={{color:"rgb(224, 253, 117)"}}/></h6>
                    </div>

                {showfollow?
                <Button style={{color:"white"}} onClick={()=>followUser()}  startIcon={<AccessibilityNewIcon style={{color:"white",marginTop:"10px", marginBottom:"10px"}} />}>Follow</Button>    
        :
        <Button style={{color:"white"}}  onClick={()=>unfollowUser()}  startIcon={<AccessibilityNewIcon style={{color:"yellow",marginTop:"10px", marginBottom:"10px"}} />}>UnFollow</Button>  
        }
                  

        
                </div>
            </div>
            {/* below */}
            {/* {console.log("This is user profile",userProfile)} */}
            <div className={classes.root1}>
      <GridList cellHeight={180} className={classes.gridList}>
        {userProfile.posts.map((item) => (
          <GridListTile  key={item.id}>
            <img src={item.photo} alt={item.title} />
            <GridListTileBar
              title={item.title}
            
            //   actionIcon={
            //     <IconButton className={classes.iconStyle} >
            //       <InfoIcon />
            //     </IconButton>
            //   }
            />
          </GridListTile>
        ))}icon
      </GridList>
    </div>
        </div>
        :<SkeletonTheme height={100}  color="purple" highlightColor="pink">
  <div style={{display:'flex',justifyContent:"center", marginLeft:"35em", marginTop:"10rem"}} className="item">  <Skeleton circle={true} height={50} width={50} />
    <Skeleton height={20}  style={{marginLeft:"20em"}} width={400} count={3}   />
   
    </div>

</SkeletonTheme>}
        
        </>
    )
}

export default UserProfile
