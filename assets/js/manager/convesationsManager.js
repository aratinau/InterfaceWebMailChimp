import axios from 'axios';
import { CONVERSATIONS_URL } from "../config";

async function findAll()
{
    return axios
        .get(CONVERSATIONS_URL)
        .then(response => {
            return response.data.conversations;
        })
    ;
}

async function getMessagesByConversation(conversation_id)
{
    return axios
        .get(CONVERSATIONS_URL + '/' + conversation_id)
        .then(response => {
            return response.data.conversation_messages;
        })
    ;
}

export default {
    findAll,
    getMessagesByConversation
};
