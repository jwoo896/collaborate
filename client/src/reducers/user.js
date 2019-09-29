import { FETCH_USER } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_USER:
            console.log(action.payload);
            // return action.payload;
            return state;
        default:
            return state;
    }
}