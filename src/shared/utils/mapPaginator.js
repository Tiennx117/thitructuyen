const mapPaginator = (params)=>{
    return {
        ...params,
        key_search:params.key_search ?? '',
        items_per_page: params.rows,
        sort_by : params.sortField || 'created_at_utc',
        current_page: params.page>0 ? params.page +1 : 1,
        descending : params.sortOrder==true ? true : false,
        
    }
}
//mapp pagination Table Antd 
const mapAdvanceSearch = (pagination, filters, sorter, advanceSearch)=>{
    return {
        ...advanceSearch,
        current_page: pagination.current,
        items_per_page: pagination.pageSize,
        sort_by: sorter.field ? sorter.field:'created_at_utc',
        descending: sorter.order !== 'ascend'? true : false
    }
}

export { mapPaginator, mapAdvanceSearch }