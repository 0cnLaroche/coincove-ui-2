import axios from 'axios';

const HOST = `${process.env.REACT_APP_HOST}`;
const API = `${HOST}/api`;

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

/**
 * Get the host URI
 */
export const getHost = () => {
    return HOST;
}
/**
 * Get API URL
 */
export const getApi = () => {
    return API;
}

export const fetchItemList = async () => {
    var { data } = await axios.get(`${API}/items`);
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
    return axios.post(`${API}/login`, {email: email, password: password});
}

export const fetchItem = async (id) => {
    const { data } = await axios.get(`${API}/items/${id}`);
    return data;
}

export const postItem = async (item, authentication) => {
    try {
        return axios.post(`${API}/items`, item, config(authentication))
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
        return axios.put(`${API}/items/${itemId}`, item, config(authentication))
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
    
    return axios.post(`${API}/files/picture`, data, config(authentication))
        .then(response => {
            if(response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response);
        })
}

/** PATCH order 
 * @param id Order ID
 * @param updates object containing key/value pair of fields to be updated
 * @param authentication authentication object from API
 * @returns updated order object
 */
export const patchOrder = async (id, updates, authentication) => {
    try {
        let { data } = await axios.patch(`${API}/orders/${id}`, updates, config(authentication));
        return data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

/**
 * Post a new order to server. Will be validated. 201 if 
 * payment is good and order is good.
 * @returns {Promise<Order>} order
 */
export const postOrder = (order) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API}/orders`, order)
        .then(response => {
            if (response.status === 201) {
                resolve(response.data);
            } else {
                reject(response.data);
            }
        }).catch(e => {
            reject(e);
        })
    })
}

export const getOrders = async (authentication) => {
    const { data } = await axios.get(`${API}/orders`, config(authentication));
    return data;
}

export const getOrder = async (id, authentication) => {
    const { data } = await axios.get(`${API}/orders/${id}`, config(authentication));
    return data;
}

export const postContactForm = (form) => {
    return axios.post(`${API}/contact`, form);
}

export const getConfig = async () => {
    const { data } = await axios.get(`${HOST}/config`);
    if (data) {
        return data;
    } else {
        throw new Error("Could not get configurations");
    }
}

