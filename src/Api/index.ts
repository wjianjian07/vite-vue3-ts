import {API_PREFIX} from './types'
import home from './modules/home'

const prefix: API_PREFIX = {
    API: '/api',
    MANAGE: '/manage'
}

export default {
    home: home(prefix)
}

