export const GET_ROOMS = 'GET_ROOMS';
import {request} from "./main";

function responseRooms(data) {
    return {
        type: GET_ROOMS,
        data: data
    }
}

export function getRooms() {
    return async dispatch => {
        const {data} = await request('rooms/user/' + localStorage.getItem('login'))
        dispatch(responseRooms(data))
    }
}


export function createRoom(params) {
    return async dispatch => {
        await request('rooms', 'POST', params)
        dispatch(getRooms());
    }
}
