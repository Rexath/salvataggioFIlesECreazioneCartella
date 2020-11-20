import axios from 'axios'

const CONTROLLER_API_URL = 'http://localhost:8080'
const USER_API_URL = `${CONTROLLER_API_URL}/user`

class UserDataService {

    retrieveAllUsers() {
        return axios.get(`${USER_API_URL}/allUsers`); 
    }
}

export default new UserDataService()