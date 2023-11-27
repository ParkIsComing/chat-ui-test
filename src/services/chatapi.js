import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://localhost:8080/api/',
    withCredentials:true
});

const chatAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        return api.get(`messages/${groupId}`);
    },

    sendMessage: (username, text) => {
        let msg = {
            roomId: 2,
            contentType: "talk",
            type: 0,
            content: "안녕",
            isRead : false
        }

        console.log(msg);
        return api.post(`send`, msg);
    }
}


export default chatAPI;