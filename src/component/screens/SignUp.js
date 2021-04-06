import React,{useState,useEffect} from 'react'
import M from "materialize-css";
import {Link , useHistory} from "react-router-dom"
import Button from '@material-ui/core/Button';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import "./signup.css";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
function SignUp() {
    const history =useHistory()
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const [image, setImage]= useState("")
    const [url, setUrl]= useState(undefined)
    useEffect(() => {
        if(url){
            uploadFields()
        }
       
    }, [url])

    const uploadPic =()=>{
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
          // console.log(data)
          setUrl(data.url)
        })
        .catch(err =>{console.log("the error is caught in this", err)})
        // fetch("createpost")}
    }
    const uploadFields =()=>{
          // console.log("the function is working")
          if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email", classes:"#f44336 red"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:name,
                password:password,
                email:email,
                pic:url
            })

        }).then(res =>res.json())
        .then(data=>{
            // console.log(data)
            if(data.error){
           
             M.toast({html:data.error, classes:"#f44336 red"})

            }
            else{
               
             M.toast({html:data.message, classes:"#6a1b9a purple darken-3"})
                history.push('/signin')
            }


        }).catch(err =>{console.log(err)})

    }
    // network request to node js
    const PostData=()=>{
        if(image){
            uploadPic() 

        }
        else{
            uploadFields()
        }
      
    }

    return (
        <div>
            <div className="mycard">
        <div className="card auth-card input-field">
        {/* <h2>Instagram</h2> */}
        {/* <img className="logo__main" src="/socsial1.png" alt="logo" /> */}
        <h2 className="signup-text">
            Signup
        </h2>
        <input
        type="text" 
        placeholder=" Enter Name"
        value={name}
        onChange={(e)=>{setName(e.target.value)}} />
             <input
        type="text" 
            placeholder=" Enter Email" 
            value={email}
        onChange={(e)=>{setEmail(e.target.value)}}

            />
        
        <input 
        type="password" 
            placeholder=" Enter Password"
            value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
            />

        <div className="file-field input-field">
        <div className="btn #4527a0 deep-purple darken-3">
        <span>Upload Profile </span>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>


          {/* <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
          onClick={()=>PostData()}>
          Signup
          <i className="fa fa-bandcamp" aria-hidden="true"></i>
        </button> */}

        <Button  onClick={()=>PostData()} variant="contained" color="primary" disableElevation startIcon={<VpnKeyIcon />} >
             SignUp
        </Button>
        <p>
            <Link to="/signin" >Already have an account <LiveHelpIcon/></Link>
        </p>
        </div>
        
      </div>
        </div>
    )
}

export default SignUp
