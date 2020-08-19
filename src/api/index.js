import axios from 'axios';

const HOST = process.env.REACT_APP_API;

const config = (authentication) => {
    let { token } = authentication;
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

export const fetchUser = async (id, authentication) => {
    try {
        return axios.get(`${HOST}/users/${id}`, config(authentication))
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
    return axios.post(`${HOST}/login`, {email: email, password: password});
}

export const fetchItem = async (id) => {
    const { data } = await axios.get(`${HOST}/items/${id}`);
    return data;
}

export const postItem = async (item, authentication) => {
    try {
        return axios.post(`${HOST}/items`, item, config(authentication))
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

export const putItem = async (item, itemId, authentication) => {
    try {
        return axios.put(`${HOST}/items/${itemId}`, item, config(authentication))
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

// fix me : remove async?
export const postImage = async (data, authentication) => {
    
    return axios.post(`${HOST}/files/picture`, data, config(authentication))
        .then(response => {
            if(response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response);
        })
}

export const postOrder = (order) => {
    axios.post(`${HOST}/orders`, order)
    .then(response => {
        if (response.status === 201) {
            return response.data;
        }
    })
    .catch(error => {
        console.log(error);
    })
}

export const getOrders = async (authentication) => {
    const { data } = await axios.get(`${HOST}/orders`, config(authentication));
    return data;
}

export const getOrder = async (id, authentication) => {
    const { data } = await axios.get(`${HOST}/orders/${id}`, config(authentication));
    return data;
}

