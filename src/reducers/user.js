import {GET_USER} from "../actions/user";

const initialState = {
    id: null,
    email: '',
    friends: [],
    NotAllowed: [],
    Banned: []
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_USER: {
            const {_id, email, friends, NotAllowed, Banned} = action.data
            return {
                _id: _id,
                email: email,
                friends: friends,
                NotAllowed: NotAllowed,
                Banned: Banned
            }
        }
        default:
            return state;
    }
}
