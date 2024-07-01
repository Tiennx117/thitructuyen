export const PUBLISH = 'publish';
export const DRAFT = 'draft';
export const RETRACT = 'retract';
export const ACTIVE = 'active';
export const DEACTIVE = 'deactive';

export const pagingDefaults = {
    key_search:'',
    first: 0,
    rows: 20,
    page: 0,
    sortField: 'created_at_utc',
    sortOrder: true
}
export const postStatusText = {
    active:'Hiển thị trên trang chủ',
    deactive:'Bản nháp',
}

export const statusText = {
    active:'Hoạt động',
    deactive:'Không hoạt động',
}

export const productStateText = {
    publish:'Xuất bản',
    draft:'Bản nháp',
    retract:'Thu hồi'
}
export const productStates = [
    { text: 'Xuất bản', value:'publish'},
    { text: 'Bản nháp', value:'draft'},
    { text: 'Thu hồi', value:'retract'}
]

// phân loại category
export const categoryTypeStates = [
    { text: 'Tin tức, bài viết', value:'post'},
    { text: 'Sản phẩm', value:'product'},
]
export const cateogryTypeText = {
    post: 'Tin tức, bài viết',
    product:'Sản phẩm',
}
export const ticketStateText = {
    new:'Mới',
    done:'Hoàn thành',
    cancel:'Đã huỷ'
}