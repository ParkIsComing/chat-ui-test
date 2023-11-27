import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let token = localStorage.getItem("bagtoken");

let stompClient;

const onMessage = message => {
  //서버에서 메세지 받으면 실행하는 함수
  console.log(message);
  if (message.body) {
    alert("got message with body " + message.body);

    const datas = JSON.parse(message.body);
    console.log("message", datas);
  } else {
    alert("got empty message");
  }
};

export const connectClient = roomId => {
  stompClient = Stomp.over(() => {
    const sock = new SockJS("http://localhost:8080/chat");
    return sock;
  });

  stompClient.connect(
    {
      Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRyaWRpc3doMjQyNEBld2hhaW4ubmV0IiwiaWF0IjoxNjk2MDEyNzM1LCJleHAiOjE2OTYwOTkxMzV9.qj0j15vf_XuBTjE9ciNM0ZQAl3mnBd96aKNl2xjm5SQ",
      roomId:2,
    },
    () => {
      console.log("연결 완료");
      stompClient.subscribe(`/topic/group/${roomId}`, onMessage, {
        Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRyaWRpc3doMjQyNEBld2hhaW4ubmV0IiwiaWF0IjoxNjk2MDEyNzM1LCJleHAiOjE2OTYwOTkxMzV9.qj0j15vf_XuBTjE9ciNM0ZQAl3mnBd96aKNl2xjm5SQ",

      });
    },
  );

};

export const disconnectClient = () => {
  console.log("접속 끊음");
  stompClient.deactivate();
  //stompClient.unsubscribe();
};

export const publishMessage = (roomId, isImage) => {
//   if (!stompClient.connected) {
//     return;
//   }

const imgUrl = "3번 메시지"
stompClient.send(
    "/app/updateMessage",
    {
      Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRyaWRpc3doMjQyNEBld2hhaW4ubmV0IiwiaWF0IjoxNjk2MDEyNzM1LCJleHAiOjE2OTYwOTkxMzV9.qj0j15vf_XuBTjE9ciNM0ZQAl3mnBd96aKNl2xjm5SQ",
    },
    JSON.stringify({
      roomId: "6516b9584ceaf4286d8cae38",
      contentType: "talk",
      type: isImage,
      content: "hi",
      isRead : false
    }),
  );
};
