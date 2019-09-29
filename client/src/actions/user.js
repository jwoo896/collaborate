import axios from 'axios';
import { FETCH_USER } from "./types";

//this gets imported into react component that logs user in. invoke along side pcloud oauth.
export function fetchUser() {
    //replace this with DB implementation of users, when ready
    const response = axios.get('http://jsonplaceholder.typicode.com/comments');

    return {
        type: FETCH_USER,
        payload: response
    };
}