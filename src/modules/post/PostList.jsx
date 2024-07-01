import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { postService } from 'services/postService';
import { mapPaginator } from 'shared/utils';
import dayjs from 'dayjs';
import { Image } from 'components/Image';
import { appSetting } from 'shared/app-settings';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { postStatusText, ACTIVE, DEACTIVE } from 'shared/utils/appState';
import { Tag } from 'components/tag';
const PostList = () => {
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [items, setItems] = useState(null);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 20,
        page: 0,
        sortField: 'created_at_utc',
        sortOrder: true,
        filters: {
            'name': { value: '', matchMode: 'contains' },
            'country.name': { value: '', matchMode: 'contains' },
            'company': { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' },
        }
    });
    useEffect(() => {
        loadLazyData();
    }, [lazyParams])
    const loadLazyData = () => {
        setLoading(true);
        let advanceSearch = mapPaginator(lazyParams);
        postService.filterPage(advanceSearch).then(res => {
            setTotalRecords(res.data.total);
            setItems(res.data.data);
            setLoading(false);
        })

    }
    const onPage = (event) => {
        setLazyParams(event);
    }
    const onSort = (event) => {
        setLazyParams(event);
    }


    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedCustomers(value);
        setSelectAll(value.length === totalRecords);
    }


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => loadLazyData()} />;
    const columnCreatedDate = (rowData, column) => {

        return dayjs(rowData.created_at_utc).format('DD/MM/YYYY HH:mm:ss')
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex flex-row justify-content-end' >
                    <Link to={'/admin/post-form/' + rowData.id}><i className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center"></i></Link>
                    <a onClick={() => confirmDelete(rowData)}><i className="p-button-rounded p-button p-button-text p-1 pi pi-trash mr-2 flex align-items-center"></i></a>
                </div>

            </React.Fragment>
        );
    }
    const stateBody = (rowData) => {
        if (rowData.state) {
            return (<i className='pi pi-lock' title='Bị khoá'></i>)
        } else return (<></>)

    }
    const columnBodyAvatar = (rowData) => {
        return (<Image width='80' src={appSetting.ADDRESS_API + '/' + rowData.avatar} />)
    }
    const deleteItem = async (id) => {
        await postService.delete(id);
        loadLazyData();
    }
    const confirmDelete = (data) => {
        confirmDialog({
            message: 'Bạn có chắc chắn xoá bản ghi này không?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteItem(data.id)
        });
    };
    const onEnterKeySearch = (e) => {
        if (e.key === 'Enter') {
            loadLazyData();
        }
    }
    const onChangeKeySearch = (text) => {
        setLazyParams((state) => {
            state.key_search = text;
            return state;
        });
    }
    return (
        <Card title="Bài viết">
            <div className='row mb-2'>
                <div className="col-4 col-sm-8">

                    <Link to={'/admin/post-form/new'}><Button icon='fa fa-plus' label='Thêm mới' />
                    </Link>

                </div>
                <div className="col-8 col-sm-4">
                    <div className="p-inputgroup">
                        <InputText autoFocus placeholder="Từ khoá..." onKeyDown={onEnterKeySearch} onChange={(e) => onChangeKeySearch(e.target.value)} />
                        <Button icon="pi pi-search" className="p-button-outlined p-button-secondary" onClick={()=>loadLazyData()}/>
                    </div>
                </div>
            </div>

            <DataTable showGridlines  size="small" value={items} lazy responsiveLayout="stack" dataKey="id"
                paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="{first} - {last} / {totalRecords}" rows={lazyParams.rows} rowsPerPageOptions={[10, 20, 50]}
                paginatorLeft={paginatorLeft} first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                loading={loading}
                onSelectionChange={onSelectionChange}

            >
                <Column className='text-center' style={{ width: '40px' }} body={(rowData, item)=>{
                   return(<>{item.rowIndex +1}</>)
                }} header="#" />
                <Column style={{ width: '100px' }} field="avatar" header="Ảnh đại diện" body={columnBodyAvatar} />
                <Column field="title" sortable header="Tiêu đề" />
                <Column field="summary" sortable header="Mô tả" />
                <Column style={{ width: '150px' }} field="created_at_utc" body={columnCreatedDate} sortable header="Ngày tạo" />
                <Column style={{ width: '10%' }} field="state" body={(rowData)=>{
                    let severity = ''
                    if(rowData.state==ACTIVE )severity='success';
                    if(rowData.state==DEACTIVE )severity='warning';
                    return(<Tag severity={severity} value={postStatusText[rowData.state]} />)
                }} sortable header="Trạng thái" />
                <Column style={{ width: '80px' }} body={actionBodyTemplate} header={<i className='pi pi-cog'></i>} exportable={false} ></Column>
            </DataTable>
        </Card>
    )
};
export default PostList;