import axios from 'axios'

const CONTROLLER_API_URL = 'http://localhost:8080'
const USER_API_URL = `${CONTROLLER_API_URL}/user`

class UserServiceData {

    retrieveAllUsers() {
        return axios.get(`${USER_API_URL}/getTableData`);
    }

    upload(file, onUploadProgress) {
        let formData = new FormData();
    
        formData.append("file", file);
    
        return axios.post(`${USER_API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress,
        });
    }

    deleteFile(filename){

        //
        //alert("stampo filename " + filename)
        return axios.delete(`${USER_API_URL}/deleteSingleFile/${filename}`);
    }

    deleteFiles(){

        return axios.delete(`${USER_API_URL}/deleteFiles`);
    }

    getFiles() {
        return axios.get(`${USER_API_URL}/files`);
    }
}

export default new UserServiceData()
