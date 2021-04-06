import React from 'react'
import "./chat.css";
import ChatFeed from "./comps/ChatFeed";
import LoginForm from './comps/LoginForm';
import {ChatEngine} from "react-chat-engine"
const projectID = '12da9dc2-a0eb-4988-838c-952ba3622aed';

function Chat() {
    if (!localStorage.getItem('username')) return <LoginForm />;
    return (
        <div >
      
           <ChatEngine 
               height="90vh"
               projectID="12da9dc2-a0eb-4988-838c-952ba3622aed"
               userName={localStorage.getItem('username')}
            //    123123
               userSecret={localStorage.getItem('passwordchat')}
               renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps} />}
               

           />
        </div>
    )
}

export default Chat
