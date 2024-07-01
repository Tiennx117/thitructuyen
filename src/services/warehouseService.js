import axios from 'axios'
let path = '/api/warehouse'
const warehouseService = {
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
    filterProductInStock(advanceSearch){
        const items_per_page = advanceSearch.items_per_page
        const current_page = advanceSearch.current_page
        const sort_by = advanceSearch.sort_by
        const descending = advanceSearch.descending
        const key_search = advanceSearch.key_search
        let url = path+ '/FilterProductInStock?items_per_page=' + items_per_page
        url += '&current_page=' + current_page
        url += '&sort_by=' + sort_by
        url += '&key_search=' + key_search
        url += '&descending=' + descending
        if(advanceSearch.warehouse_id) url += '&warehouse_id=' + advanceSearch.warehouse_id;
        if(advanceSearch.fromdate) url += '&fromdate=' + advanceSearch.fromdate;
        if(advanceSearch.todate) url += '&todate=' + advanceSearch.todate;
        
        return axios.get(url);
    },
    
    getStatisticInventory(advanceSearch){
        const items_per_page = advanceSearch.items_per_page
        const current_page = advanceSearch.current_page
        const sort_by = advanceSearch.sort_by
        const descending = advanceSearch.descending
        const key_search = advanceSearch.key_search
        let url = path+ '/StatisticInventory?items_per_page=' + items_per_page
        url += '&current_page=' + current_page
        url += '&sort_by=' + sort_by
        url += '&key_search=' + key_search
        url += '&descending=' + descending
        if(advanceSearch.warehouse_id) url += '&warehouse_id=' + advanceSearch.warehouse_id;
        if(advanceSearch.fromdate) url += '&fromdate=' + advanceSearch.fromdate;
        if(advanceSearch.todate) url += '&todate=' + advanceSearch.todate;
        
        return axios.get(url);
    },
}
export { warehouseService };
