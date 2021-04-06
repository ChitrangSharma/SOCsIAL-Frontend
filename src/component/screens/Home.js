import React,{useState,useEffect,useContext} from 'react'
// import Card from './Card'
import "./home.css"
import {UserContext} from "../../App"
import {Link} from "react-router-dom";
import "./Card.css";
import Card from './Card';
function Home() {
  const [data,setData] =useState([] )
  const {state, dispatch}=useContext(UserContext)
  useEffect(()=>{
    fetch('/allposts',{
      headers:{
       "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      setData(result.posts)
      
    })
  },[])
  // const likePost=(id)=>{
  //   fetch('/like',{
  //     method:"put",
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":"Bearer "+localStorage.getItem("jwt")
  //     },
  //     body:JSON.stringify({
  //       postId:id
  //     })

  //   }).then(res=>res.json())
  //   .then(result=>{
  //     console.log(result)
  //     const newData= data.map(item=>{
  //       if(item._id ==result._id){
  //         return result
  //       }
  //       else{
  //         return item
  //       }
  //     })
  //     setData(newData)
  //   }).catch(err=>{console.log(err)})
  // }
  // const unlikePost=(id)=>{
  //   fetch('/unlike',{
  //     method:"put",
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":"Bearer "+localStorage.getItem("jwt")
  //     },
  //     body:JSON.stringify({
  //       postId:id
  //     })

  //   }).then(res=>res.json())
  //   .then(result=>{
  //     const newData= data.map(item=>{
  //       if(item._id ==result._id){
  //         return result
  //       }
  //       else{
  //         return item
  //       }
  //     })
  //     setData(newData)
  //   }).catch(err=>{console.log(err)})
  // }
// code for comments ...

  // const makeComment =(text, postId)=>{
  //   fetch('/comment',{
  //     method:"put",
  //     headers:{
  //       "Content-Type":"application/json",
  //       "Authorization":"Bearer "+localStorage.getItem('jwt')
  //     },
  //     body:JSON.stringify({
  //       postId:postId,
  //       text
  //     })
  //   }).then(res => res.json())
  //   .then(result =>{
  //     console.log(result)
  //     const newData= data.map(item=>{
  //       if(item._id ==result._id){
  //         return result
  //       }
  //       else{
  //         return item
  //       }
      
  //     })
  //     setData(newData)
  //   }).catch(err=>{console.log(err)})
  // }

  // const deleteComment =(postid,commentid)=>{
  //   fetch(`/deletecomment/${postid}/${commentid}`,{
  //     method:"delete",
  //     headers:{
  //       "Authorization":"Bearer "+localStorage.getItem("jwt")
  //     },
  //   }).then((res)=>{res.json()})
  //     .then((result)=>{
  //       const newData = data.map((item)=>{
  //         if(item._id ==result._id){
  //           return result
  //         }
  //         else{
  //           return item
  //         }
  //       });
  //       window.location.reload()
  //       setData(newData);
  //       window.location.reload()
  //     })
  // }

  // deleting post
  // const deletePost = (postId)=>{
  //   fetch(`/deletepost/${postId}`,{
  //     method:"delete",
  //     headers:{
  //       Authorization:"Bearer "+localStorage.getItem("jwt")
  //     }
  //   }).then(res=>res.json())
  //   .then(result=>{
  //     console.log(result)
  //     const newData = data.filter(item=>{
  //       return item._id !== result._id
  //     })
  //     setData(newData)
  //   })
  // }

    return (
        <div className="main">
        {/* {
          data.map(item =>{
          return( 
              <div className="card home-card" key={item._id}>
               <h5> <Link to={item.postedBy._id !== state._id ?"/profile/"+item.postedBy._id : "/profile/"}>{item.postedBy.name} </Link>{item.postedBy._id == state._id 
               && <i className="material-icons" onClick={()=>deletePost(item._id)} style={{color:"red",float:"right"}}>delete</i>
               }</h5>
            
               <div className="card-image">
                   <img src={item.photo} alt=""/>
               </div>
               <div className="card-content">
            

               {item.likes.includes(state._id)
               ?
               <i className="material-icons" onClick={()=>unlikePost(item._id)} style={{color:"red"}}> favorite</i>
               :
               <i className="material-icons" onClick={()=>likePost(item._id)} style={{color:"red"}}>favorite_border</i>
               }
               
               
               <h6>{item.likes.length}</h6>
                   <h6>{item.title}</h6>
                   <p>{item.body}</p>
                                   
                   {
                     item.comments.map(record=>
                     {
                       return(
                         <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}
                         {(item.postedBy._id || record.postedBy._id)== state._id &&(<i className="material-icons" style={{float:"right",}} onClick={()=>deleteComment(item._id,record._id)}>delete</i>)}
                         </h6>
                       )
                     })
                   }
                   <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value, item._id)
                   }}>
                   <input type="text" placeholder="comment" />
                   </form>
               </div>
           </div>


          )
        })} */}
          
          <Card className="card-edit"/>
        </div>
    )
}

export default Home
