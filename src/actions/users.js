export const GET_USERS = 'GET_USERS';
import {request} from "./main";

function responseUser(data) {
    return {
        type: GET_USERS,
        data: data
    }
}

export function getUsers(params) {
    return async dispatch => {
        const {data} = await request('users', 'GET', params)
        dispatch(responseUser(data))
    }
}
