import axios from 'axios';
import { useAuth } from '../context/auth';
import mockedItemList from './mockedItemList.json';
import mockedUserList from './mockedUserList.json';

const config = (token) => {
    let config = {headers:{}};
    if (token) {
        config.headers = {
            "Authorization" : `Bearer ${token}`
        }
    }
}

export const fetchItemList = () => {
    try {
        // make rest api call here
        return mockedItemList;
    } catch (error) {
        console.error(error);
    }
}

export const fetchUser = (token) => {
    try {
        axios.get(".../user/data", config(token))
        .then(result => {
            if (result.status === 200) {
                return result.data;
            } else {
                return false;
            }
        })
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const authenticate = (userName, pwd) => {
    try {
        //return null;
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjb2luY292ZS11aS0yIiwibmFtZSI6IlNhbXVlbCBMYXJvY2hlIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJzYW11ZWxsYXJvY2hlQGxpdmUuY2EiLCJpYXQiOjE1MTYyMzkwMjJ9.hlUVKoHw1dFJq0keEhPeWQ-dkXFYf2n4FcK4e2Y6qEg";
        /*
        axios.post("...user/login", {userName, pwd})
        .then(result => {
            if (result.status === 200) {
                return result.data;
            } else {
                return false;
            }
        })
        */

    } catch (error) {
        console.error(error);
        return false;
    }
}

export const fetchItem = (id) => {
    for (let item of mockedItemList) {
        if (item.id == id) {
            console.log("matched")
            return item;
        }
    }
}

