import Vue from 'vue'
import axios from 'axios'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'https://bugzbackend.herokuapp.com'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export async function uploadFile(selectedFileFormData) {
    const fileSavedName = axios.post(`${baseApiUrl}/uploadFile`, selectedFileFormData).then( res => {
        return res.data
    })
    return fileSavedName
}

export default { baseApiUrl, showError, userKey, uploadFile }