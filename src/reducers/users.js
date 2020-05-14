import {GET_USERS} from "../actions/users";

const initialState = {
    items: []
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case GET_USERS: {
            return {
                items: action.data
            }
        }
        default:
            return state;
    }
}
