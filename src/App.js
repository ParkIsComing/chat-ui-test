import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Input from './components/Input/Input';
import LoginForm from './components/LoginForm/LoginForm';
import Messages from './components/Messages/Messages';
import chatAPI from './services/chatapi';
import { randomColor } from './utils/common';
import { connectClient, disconnectClient, publishMessage } from "../src/stomp"; 
import { useEffect } from 'react';

// import File from 'C:\Users\gy502\Documents\chat-test\chat-ui\src\test_image.png';

const SOCKET_URL = 'http://localhost:8080/chat/';

const App = () => {
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null)
  // const imageFile = imgD
  let onConnected = () => {
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);
    setMessages(messages.concat(msg));
  };

  let onSendMessage = (msgText) => {
    chatAPI.sendMessage(user.username, msgText).then(res => {
      console.log('Sent', res);
    }).catch(err => {
      console.log('Error Occured while sending message to api');
    });
  };

  let handleLoginSubmit = (username) => {
    console.log(username, " Logged in..");

    setUser({
      username: username,
      color: randomColor()
    });

  };

  // function createPresinedURL(e) {
  //   axios
  //     .post('API gateway의 배포 스테이지 URL', {filename: 'test'})
  //     .then((response) => {
  //           const presignedUrl = "https://kuddy_bucket.s3.ap-northeast-2.amazonaws.com/image/31a07166-5d25-492d-bdd1-26acb0c64d6aimage1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220626T084527Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4EAIYFA45U7IOW6L%2F20220626%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=20efb322e9ae20ccc939afd1f9e18352266b1d449d7b123b1c16ad84f5f0c924";
  //           console.log(presignedUrl);
  //           uploadImageToS3(presignedUrl, File);
  //       })
  //     .catch((error) => console.error(error));
  // }

  // function uploadImageToS3(const url, Fi) {
  //   axios
  //       .put(url, File)
  //       .then((response) => console.log(response))
  //       .catch((error) => console.error(error));
  // }
  useEffect(() => {
    //클라이언트 생성 및 연결
    connectClient(2);
    return () => disconnectClient();
  }, []);

  return (
    <div className="App">
      {!!user ?
        (
          <>
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/group']}
              onConnect={onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => onMessageReceived(msg)}
              debug={false}
            />
            <Messages
              messages={messages}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage} />
          </>
        ) :
        <LoginForm onSubmit={handleLoginSubmit} />
      }
      <div onClick={()=>publishMessage(2, 0)}>Send</div>
    </div>

  )
}

export default App;

