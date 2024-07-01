import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { userService } from 'modules/user/userService';
import { useTranslation } from 'react-i18next'
import { mapPaginator } from 'shared/utils';
import dayjs from 'dayjs';
import Permission from 'components/Permission';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [users, setUsers] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const { t, i18n } = useTranslation();
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 20,
        page: 0,
        sortField: 'VC_FRST_NM',
        sortOrder: true,
        key_search: null
    });
    useEffect(() => {
        loadLazyData();
    }, [lazyParams])
    const loadLazyData = () => {
        setLoading(true);
        let advanceSearch = mapPaginator(lazyParams);
        console.log(advanceSearch);
        userService.filterPage(advanceSearch).then(res => {
            setTotalRecords(res.data.TotalRecords);
            setUsers(res.data.Data);
            setLoading(false);
        });
    }
    const onPage = (event) => {
        setLazyParams(event);
    }
    const onSort = (event) => {
        setLazyParams(event);
    }
    const onChangeKeySearch = (text) => {
        setLazyParams((state) => {
            state.key_search = text;
            return state;
        });
    }
    const onFilter = (event) => {
        event['first'] = 0;
        setLazyParams(event);
    }
    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedCustomers(value);
        setSelectAll(value.length === totalRecords);
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }
    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => loadLazyData()} />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    const columnCreatedDate = (rowData, column) => {
        return dayjs(rowData.created_at_utc).format('DD/MM/YYYY HH:mm')
    }
    const deleteItem = async (id) => {
        await userService.delete(id);
        loadLazyData();
    }
    const confirmDelete = (data) => {
        confirmDialogGlobal({
            message: t('rbkey_IsRprtngAthrtyDltMSG', 'Bạn có chắc chắn xoá bản ghi này không?'),
            accept: () => deleteItem(data.NM_USR_ID)
        });
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex flex-row justify-content-end' >
                    <Link to={'/admin/user-form/' + rowData.NM_USR_ID}><i className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center"></i></Link>
                    <a onClick={() => confirmDelete(rowData)}><i className="p-button-rounded p-button p-button-text p-1 pi pi-trash mr-2 flex align-items-center"></i></a>
                </div>

            </React.Fragment>
        );
    }
    const stateBody = (rowData) => {
        if (rowData.state) {
            return (<i className='pi pi-lock' title={t('rbkey_ct_ov111rvw', 'Bị khoá')}></i>)
        } else return (<></>)

    }
    const onEnterKeySearch = (e) => {
        if (e.key === 'Enter') {
            loadLazyData();
        }
    }
    return (
        <Card title={t('rbkey_ct_ov111rvw', 'Danh sách người dùng')}>
            <div className='row mb-2'>
                <div className="col-4 col-sm-8">
                    <Permission code='USER_ADD'>
                        <Link to={'/admin/user-form/new'}><Button label='Add' />
                        </Link>
                    </Permission>
                </div>
                <div className="col-8 col-sm-4">
                    <div className="p-inputgroup">
                        <InputText autoFocus placeholder={t('rbkey_ct_ov111rvw', 'Từ khoá...')} onKeyDown={onEnterKeySearch} onChange={(e) => onChangeKeySearch(e.target.value)} />
                        <Button icon="pi pi-search" className="p-button-outlined p-button-secondary" onClick={()=>loadLazyData()} />
                    </div>
                </div>
            </div>
            
            <DataTable showGridlines  size="small" value={users} lazy responsiveLayout="stack" dataKey="NM_USR_ID"
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
                <Column field="VC_LGN_CD" header={t('rbkey_ct_ov111rvw', 'Tài khoản')} />
                <Column field="VC_FRST_NM" header={t('rbkey_ct_ov111rvw', 'Tên đầy đủ')} />
                <Column field="VC_EML_ADDRSS" sortable header={t('rbkey_ctrbkey_ct_ov111rvw_ovrvw', 'Email')} />
                <Column field="DT_CRTN_DT" body={columnCreatedDate} header={t('rbkey_ct_ov111rvw', 'Ngày tạo')} />
                <Column body={stateBody} />
                <Column style={{ width: '80px' }} body={actionBodyTemplate} header={<i className='pi pi-cog'></i>} exportable={false} ></Column>
            </DataTable>
        </Card>
    )
};
export default UserList;