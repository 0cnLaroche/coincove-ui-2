import def from '../config/default.json';
import local from '../config/local.json';

const doc = {};

/**
 * Reads and overrides configuration files within 
 * the /config directory in this order :
 *  1. default
 *  2. production
 *  3. local
 * 
 * Singleton pattern, configs are only read once
 */
const Config = () => {

    if (Object.keys(doc).length === 0) {
    //if (true) {
        console.debug("Loading configurations");

        Object.assign(doc, def);
        if (local) {
            Object.assign(doc, local);
        }
        return doc;
    } else {
        return doc;
    }
}

export default Config();