import {GET_MESSAGES, PUSH_MESSAGE} from "../actions/messages";

const initialState = {
    items: []
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES: {
            return {
                items: action.data
            }
        }
        case PUSH_MESSAGE: {
            return {
                items: state.items.concat([action.data])
            }
        }
        default:
            return state;
    }
}
