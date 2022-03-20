import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import '../styling/Chat.css';

const ChatBody = () => {
  return (
     <ChatEngine
          height='93vh'
          width="70%"
          userName='sourav'
          userSecret='Password2021'
          projectID='73e534c0-033e-45a3-af5a-ff43046d50ec'
	/>
  )
}

export default ChatBody;