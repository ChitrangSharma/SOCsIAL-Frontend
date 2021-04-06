import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CommentIcon from '@material-ui/icons/Comment';
import "./Card.css"
// Home.js replication dependency 
import {UserContext} from "../../App"
import {Link} from "react-router-dom";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';


// import ScrollableFeed from 'react-scrollable-feed'










const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor:"rgb(179, 178, 178, 0.90  )",
    maxWidth: 400,
  },
  media: {
    height: 0,
    margin:"10",
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {     
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor:"gray",
  },
}));

export default function CardPost    () {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data,setData] =useState([] )
  const [smile,setSmile]=useState([])
  const {state, dispatch}=useContext(UserContext)
  useEffect(()=>{
    fetch('/allposts',{
      headers:{
       "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      setData(result.posts)
      
    })
  },[])
  const likePost=(id)=>{
    fetch('/like',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })

    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      const newData= data.map(item=>{
        if(item._id ==result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{console.log(err)})
  }
  const unlikePost=(id)=>{
    fetch('/unlike',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })

    }).then(res=>res.json())
    .then(result=>{
      const newData= data.map(item=>{
        if(item._id ==result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{console.log(err)})
  }
// code for comments ...

  const makeComment =(text, postId)=>{
    fetch('/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:postId,
        text
      })
    }).then(res => res.json())
    .then(result =>{
      // console.log(result)
      const newData= data.map(item=>{
        if(item._id ==result._id){
          return result
        }
        else{
          return item
        }
      
      })
      setData(newData)
      
    }).catch(err=>{console.log(err)})
  }

  const deleteComment =(postid,commentid)=>{
    fetch(`/deletecomment/${postid}/${commentid}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
    }).then((res)=>{res.json()})
      .then((result)=>{
        const newData = data.map((item)=>{
          // logic is not up to the mark but iam refreshing the page to make comments functionality work for now....
          window.location.reload()
        
          if(item._id ===result._id){
            return result
          }
          else{
            return item
          }
        });
        
        setData(newData);
      

        
        // window.location.reload()
      })
  }

  // deleting post
  const deletePost = (postId)=>{
    fetch(`/deletepost/${postId}`,{
      method:"delete",
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      const newData = data.filter(item=>{
        return item._id !== result._id
      })
      setData(newData)
    })
  }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // smile making...
  const makeSmile =(id)=>{
    fetch('/smile',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      // logic to make state change intantainiously
      const newSmile =data.map(item=>{
        if(item._id == result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newSmile)
    }).catch(err=>{console.log("error",err)})
  }

  // unsmile
  const makeunSmile =(id)=>{
    fetch('/unsmile',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      const newSmile =data.map(item=>{
        if(item._id == result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newSmile)
    }).catch(err=>{console.log("error",err)})
  }

  return (

    <div className="custom">
    {data.map(item =>{
        return(
            
            <Card className= {classes.root}>

            <CardHeader
        avatar={
          <Link to={item.postedBy._id !== state._id ?"/profile/"+item.postedBy._id : "/profile/"}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            SC
            {/* <Link to={item.postedBy._id !== state._id ?"/profile/"+item.postedBy._id : "/profile/"}>c</Link> */}

          </Avatar>
          </Link>
         
                }
        action={
          <IconButton aria-label="settings">
            {item.postedBy._id == state._id 
               && <HighlightOffIcon className="delete-icon" onClick={()=>deletePost(item._id)} style={{float:"right"}} />
               }
          </IconButton>
                 }
        title= {item.postedBy.name}
        subheader={item.title}
      />
             <CardMedia
        className={classes.media}
        image={item.photo} alt=""
        title={item.title}
      />
      {/* content of card */}
      {/* {console.log("im looking for", state.pic)} */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {item.title}
        <Typography style={{}} variant="body2" color="textSecondary" component="p">
        {item.body}
        </Typography>
        </Typography>
        
      </CardContent>

      {/* likes actions */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {item.likes.includes(state._id)
               ?
               <FavoriteIcon  onClick={()=>unlikePost(item._id)} style={{color:"red"}} />
               :
               <FavoriteIcon className="heart-icon" onClick={()=>likePost(item._id)}  />
               }
        </IconButton>
        {item.likes.length} Likes    



        <IconButton aria-label="share">
        {/* maybe we can do smiles count here .... */}

        {item.smile.includes(state._id)
               ?
               <EmojiEmotionsIcon onClick={()=>makeunSmile(item._id)}style={{color:"yellow"}}/>
               :
               <EmojiEmotionsIcon className="smile-icon" onClick={()=>makeSmile(item._id)}/>
               }
        

       
        </IconButton>
               {item.smile.length} smiles


        {/*comments action  */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments "
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

        {
                     item.comments.map(record=>
                     {
                       return(
                        <Typography key={record._id}><span style={{fontWeight:"700"}}>{record.postedBy.name}:</span>{""} {record.text}
                         {/* {(item.postedBy._id || record.postedBy._id)=== state._id &&( <HighlightOffIcon  onClick={()=>deleteComment(item._id,record._id)} style={{float:"right"}} /> )} */}

                         {/* commented above logic this siple below logic allows anyone to delete the comment from anyone's post but it is more reliable i will let it be untill i got some better logic for the above one */}
                         <HighlightOffIcon  onClick={()=>deleteComment(item._id,record._id)} style={{float:"right",color:"#525252 "}} />
                         </Typography>
                       )
                     })
                   }

                   <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value, item._id)
              
                   }}>
                   <input type="text" placeholder="Wanna Add Comment ?" />
                   </form>  
        </CardContent>
      </Collapse>
            </Card>
          
        )
    })}

    </div>
  
  );
}

