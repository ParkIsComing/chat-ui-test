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
            sender: username,
            content: text
        }

        console.log(msg);
        return api.post(`send`, msg);
    }
}


export default chatAPI;