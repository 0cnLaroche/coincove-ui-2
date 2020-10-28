import { getConfig } from '../api'

const doc = {};

const load = async () => {
    return new Promise((resolve, reject) => {
        getConfig()
        .then(data => {
            Object.assign(doc, data);
            resolve(doc);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}

const config = () => {

    if (Object.keys(doc).length === 0) {
        load();
        return doc;
    } else {
        return doc;
    }
}

export default config();