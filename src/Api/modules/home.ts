import {API_PREFIX } from '../types'
export default function(prefix: API_PREFIX) {
    return {
        a: prefix.API + '/test/login'
    }
}