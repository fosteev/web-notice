import {request} from "./main";

export const GET_MESSAGES = 'GET_MESSAGES';
export const PUSH_MESSAGE = 'PUSH_MESSAGE';

function resMessages(data) {
    return {
        type: GET_MESSAGES,
        data: data
    }
}

export function getMessages(id, limit, page) {
    return async dispatch => {
        const {data} = await request(`message/${id}?limit=${limit}&page=${page}`)
        dispatch(resMessages(data))
    }
}

export function pushMessage(data) {
    return {
        type: PUSH_MESSAGE,
        data: data
    }
}

export function sendMessage(params) {
    return async dispatch => {
        const {data} = await request(`message`, 'POST', params)
        dispatch(resMessages(data))
    }
}
