import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"
import "./profile.css"
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Badge from '@material-ui/core/Badge';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import {Paper, Typography,Container,Box} from '@material-ui/core';
// import tileData from './tileData';
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
      overflowY:"hidden"
    },
    gridList: {
      width: 600,
      height: 550,
    },
    iconStyle:{
      color:"white"
    }
  }));

function Profile() {
    const classes = useStyles();
    const [mypics, setPics]=useState([])
    const {state, dispatch} = useContext(UserContext)
    const [image, setImage]= useState("")
    const [url, setUrl]= useState("")
    useEffect(()=>{
        fetch("/mypost", {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }
        ).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setPics(result.mypost)
        })
    },[])
    useEffect(() => {
        if(image){
            const data= new FormData()
            data.append("file",image)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","chit")
            fetch("https://api.cloudinary.com/v1_1/chit/image/upload",{
              method:"post",
              body:data
            })
            .then(res=>res.json())
            .then(data=>{
            //   console.log(data)
              setUrl(data.url)
            //   localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            //   dispatch({type:"UPDATEPIC",payload:data.url})

              fetch("/updatepic",{
                  method:"put",
                  headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Bearer "+localStorage.getItem("jwt")
                  },
                  body:JSON.stringify({
                      pic:data.url
                  })

              })
              .then(res =>res.json())
              .then(result=>{
                  console.log(result)
                  localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                  dispatch({type:"UPDATEPIC",payload:result.pic})
              })

            })
            .catch(err =>{console.log("the error is caught in this", err)})
        }
       
      
    }, [image])
    const updatePhoto =(file)=>{
        setImage(file)
        
 
    }
    return (
        <div style={{maxWidth:'900px', margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px0px",
                borderBottom:"1px solid gray"
            }}>
                <div>

                <Badge className="badge__edit"  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }} overlap="circle" badgeContent={ 
        <div className={classes.root}>
        <input onChange={(e)=>{updatePhoto(e.target.files[0])}} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file" >
          Update Profile
   
         </label>
         </div>}
     color="primary">

 <img style={{width:"160px", height:"160px", borderRadius:"80px", marginTop:"10px", marginBottom:"10px"}} src={state?state.pic:"loading"} alt="image" />
        </Badge>




                    {/* <img style={{width:"160px", height:"160px", borderRadius:"80px", marginTop:"10px", marginBottom:"10px"}} src={state?state.pic:"loading"} alt="image" />
                    <div className={classes.root}>
      <input onChange={(e)=>{updatePhoto(e.target.files[0])}} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div> */}
                </div>
                {/* <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
          onClick={()=>updatePhoto()}
          >
         Update pic
          <i className="fa fa-bandcamp" aria-hidden="true"></i>
          </button> */}



          {/* <div className="file-field input-field">
        <div className="btn #4527a0 deep-purple darken-3">
        <span>Update pic </span>
        <input type="file" onChange={(e)=>{updatePhoto(e.target.files[0])}} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div> */}


{/* 
    <div className={classes.root}>
      <input onChange={(e)=>{updatePhoto(e.target.files[0])}} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div> */}
     
            
                <div>
                <Container style={{marginLeft:"20px", marginRight:"10px"}}>
                <Paper className="make__transparent ">
                  <h4 style={{color:"rgb(214, 212, 211)",marginLeft:"10px"}}>   {state?state.name:<Skeleton height={20}  style={{marginLeft:"20em"}} width={400}    />}</h4>
                    <h5 style={{color:"rgb(214, 212, 211)",marginLeft:"10px"}}> {state?state.email:<Skeleton height={20}  style={{marginLeft:"20em"}} width={400}    />} <MailOutlineIcon style={{color:"tomato"}}/></h5>
                    <div style={{display:"flex",justifyContent:"space-between", width:"100%"}}>
                        <h6 style={{color:"rgb(214, 212, 211)",marginLeft:"10px"}}>{mypics.length} posts <PhotoLibraryIcon style={{color:"rgb(128, 180, 240)"}}/></h6>
                        <h6 style={{color:"rgb(214, 212, 211)"}}>{state?state.followers.length:"0"} followers <EcoIcon style={{color:"rgb(95, 241, 151)"}}/></h6>
                        <h6 style={{color:"rgb(214, 212, 211)"}}>{state?state.following.length:"0"} following <DoneAllIcon style={{color:"rgb(224, 253, 117)"}}/></h6>
                    </div>
                    </Paper>
                    </Container>
                </div>
            </div>
            {/* below */}
        {/* <div className="gallery">
        {
            mypics.map(item=>{
                return(
                    <img key={item.id} className="item" src={item.photo} alt={item.title} />
                )
            })
        }
           
             </div> */}


             {/* material magic */}
             {/* <div className={classes.root1}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {mypics.map((item) => (
         
          <GridListTile key={item.id} cols={1}>
            <img src={item.photo} alt={item.title} />
          </GridListTile>
     
        ))}

      </GridList>
    </div> */}
    {/* {console.log("profile info =",mypics)} */}
    <div className={classes.root1}>
      <GridList style={{ overflow: "hidden" }} cellHeight={180} className={classes.gridList}>
        {mypics.map((item) => (
          <GridListTile  key={item.id}>
            <img src={item.photo} alt={item.title} />
            <GridListTileBar
              title={item.title}
              // subtitle={<span>by: {item.title}</span>}
              actionIcon={
                <IconButton className={classes.iconStyle} >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}icon
      </GridList>
    </div>
        </div>
    )
}

export default Profile
