import axios from 'axios'
let path = '/api/role'
const roleService = {
    create(obj){
        return axios.post(path + '/create', obj);
    },  
    getById(id){
      return axios.get(path + '/getById?id='+ id);
    },
    update(obj){
        return axios.put(path + '/update', obj);
    },
    delete(id){
        return axios.delete(path + '/delete?id=' + id);
    },
    filterPage(advanceSearch){
        const items_per_page = advanceSearch.items_per_page
        const current_page = advanceSearch.current_page
        const sort_by = advanceSearch.sort_by
        const descending = advanceSearch.descending
        const key_search = advanceSearch.key_search
        let url = path+ '/filterPage?items_per_page=' + items_per_page
        url += '&current_page=' + current_page
        url += '&sort_by=' + sort_by
        url += '&key_search=' + key_search
        url += '&descending=' + descending
        return axios.get(url);
    },
    getAll(){
        return axios.get(path + '/getall');
    },
    validateName(name, id = 0){
        return axios.get(path + '/validate_name?name='+ name + '&id='+id);
    },
    validateCode(code, id = 0){
        return axios.get(path + '/validate_code?code='+ code + '&id='+id);
    },
    orderBy(id, up=true){
        return axios.get(path + '/orderby?id='+ id+'&up='+ up);
    }
}
export { roleService };
