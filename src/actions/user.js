export const GET_USER = 'GET_USER';
import {request} from "./main";

function responseUser(data) {
    return {
        type: GET_USER,
        data: data
    }
}

export function getUser() {
    return async dispatch => {
        const {data} = await request('users/findByEmail/' + localStorage.getItem('login'))
        dispatch(responseUser(data))
    }
}
