import axios from 'axios';
import { useAuthContext } from '../context/auth';

const HOST = process.env.REACT_APP_API;

const config = (token) => {
    let config = {headers:{}};
    if (token) {
        config.headers = {
            "Authorization" : `Bearer ${token}`
        }
    }
    return config;
}

export const fetchItemList = async () => {
    var { data } = await axios.get(`${HOST}/items`);
    return data;
}

export const fetchUser = async (id, token) => {
    try {
        return axios.get(`${HOST}/users/${id}`, config(token))
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

export const authenticate = async (email, password) => {
    return axios.post(`${HOST}/login`, {email: email, password: password})
    .then(result => {
        if(result.status === 200) {
            console.log(result.data);
            return result.data;
        }
    })
    .catch(error => console.error(error));
}

export const fetchItem = async (id) => {
    const { data } = await axios.get(`${HOST}/items/${id}`);
    return data;
}

export const postItem = async (item, authToken) => {
    try {
        return axios.post(`${HOST}/items`, item, config(authToken))
        .then(result => {
            if (result.status === 201) {
                return result.data;
            } else {
                return false;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const putItem = async (item, itemId, authToken) => {
    try {
        return axios.put(`${HOST}/items/${itemId}`, item, config(authToken))
        .then(result => {
            if (result.status === 200) {
                return result.data;
            } else {
                return false;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const postImage = async (data, authToken) => {
    
    return axios.post(`${HOST}/files/picture`, data, config(authToken))
        .then(result => {
            if(result.status === 201) {
                return result.data;
            }
        })
        .catch(error => {
            console.log(error.response);
        })
}

