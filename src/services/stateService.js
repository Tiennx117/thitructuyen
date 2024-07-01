import axios from 'axios'
let path = '/api/state'
const stateService = {
    
    orders(){
        return axios.get(path + '/orders');
    }
    
}
export { stateService };
