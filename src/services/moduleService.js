import axios from 'axios'
let path = '/api/module'
const moduleService =  {
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
        const itemsPerPage = advanceSearch.itemsPerPage
        const currentPage = advanceSearch.currentPage
        const sortBy = advanceSearch.sortBy
        const descending = advanceSearch.descending
        const filter = JSON.stringify(advanceSearch.filter)
        const keySearch = advanceSearch.keySearch
        let url = path+ '/filterPage?itemsPerPage=' + itemsPerPage
        url += '&currentPage=' + currentPage
        url += '&sortBy=' + sortBy
        url += '&filter=' + filter
        url += '&keySearch=' + keySearch
        url += '&descending=' + descending
        return axios.get(url);
    },
    getTree(){
        return axios.get(path + '/gettree');
    },
    getAll(){
        return axios.get(path + '/getAll');
    },
    getTreeParent(id){
        return axios.get(path + '/getTreeParent?id='+ id);
    },
    orderBy(id, up=true){
        return axios.get(path + '/orderby?id='+ id+'&up='+ up);
    }
}
export { moduleService };
