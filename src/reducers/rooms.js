import {GET_ROOMS} from "../actions/rooms";

const initialState = {
    items: []
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS: {
            return {
                items: action.data
            }
        }
        default:
            return state;
    }
}
