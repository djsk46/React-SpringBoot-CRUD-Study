import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:80/users";

class ApiService {

    fetchUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserByID(userID){
        return axios.get(USER_API_BASE_URL+'/'+userID);
    }

    detailByID(userID){
        return axios.get(USER_API_BASE_URL+'/detail/'+userID);
    }

    deleteUser(userID){
        return axios.delete(USER_API_BASE_URL+'/'+userID);
    }

    addUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }

    editUser(user){
        return axios.put(USER_API_BASE_URL+'/'+user.id,user);
    }
}

export default new ApiService();