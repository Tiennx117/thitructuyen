import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { orderService } from 'services/orderService';
import { mapPaginator } from 'shared/utils';
import dayjs from 'dayjs';
import { Image } from 'components/Image';
import { appSetting } from 'shared/app-settings';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { InputText } from 'primereact/inputtext';
import { statusText, ACTIVE, DEACTIVE, pagingDefaults } from 'shared/utils/appState';
import { SplitButton } from 'primereact/splitbutton'
import { Tag } from 'components/tag'
import { stateService } from 'services/stateService';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'components/Calendar';
const OrderList = () => {
    
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [items, setItems] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [lazyParams, setLazyParams] = useState({
        ...pagingDefaults,
        state:'',
        from_date: '',
        end_date: ''
    });
    const [stateOptions, setStateOptions] = useState([]);
    const [stateOrderSelected, setStateOrderSelected] = useState(null);
    useEffect(() => {
        loadLazyData();
        loadStateOptions();
    }, [lazyParams])

    useEffect(() => {
        loadStateOptions();
    }, [])

    const loadStateOptions = async ()=>{
        let result = await stateService.orders();
        let arr = []
        result.data.forEach(item=>{
            let obj = {
                label: item.text,
                value: item.value,
                command: (e) => {
                    setStateOrderSelected(e.item);
                }
            }
            arr.push(obj);
        })
        setStateOptions(arr);
    }
    const toast = useRef(null);
    const changeOrderState = async (state, orders)=>{
        if(state){
            let ids = orders.map(x=>x.id);
            await orderService.changeState(ids,state.value)
            toast.current.show({severity:'success', summary:'Thông báo', detail: "Đã cập nhật sang '"+ state.label + "'"});
            setSelectedItems([]);
            setStateOrderSelected(null);
            await loadLazyData();
        }
        
    }

    const loadLazyData = async () => {
        setLoading(true);
        let advanceSearch = mapPaginator(lazyParams);
        let result = await orderService.filterPage(advanceSearch);
        setItems(result.data.data);
        setTotalRecords(result.data.total);
        setLoading(false);
    }
    const onPage = (event) => {
        setLazyParams(event);
    }
    const onSort = (event) => {
        setLazyParams(event);
    }


    // const onSelectionChange = (event) => {
    //     const value = event.value;
    //     setSelectedCustomers(value);
    //     setSelectAll(value.length === totalRecords);
    // }
    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedItems(value);
    }


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => loadLazyData()} />;
    const columnCreatedDate = (rowData, column) => {

        return dayjs(rowData.created_at_utc).format('DD/MM/YYYY HH:mm:ss')
    }
    const columnOrderDate = (rowData, column) => {
        return dayjs(rowData.order_date).format('DD/MM/YYYY HH:mm:ss')
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex flex-row justify-content-end' >
                    <Link to={'/admin/order-form/' + rowData.id}><i className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center"></i></Link>
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
        return (<Image width='60' src={appSetting.ADDRESS_API + '/' + rowData.path_img} />)
    }
    const deleteItem = async (id) => {
        await orderService.delete(id);
        loadLazyData();
    }
    const confirmDelete = (data) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn xoá slide này không?',
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
    const itemStates = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({severity:'success', summary:'Updated', detail:'Data Updated'});
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://facebook.github.io/react/'
            }
        },
        {   label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                window.location.hash = "/fileupload"
            }
        }
    ];
    return (
        <Card title="Danh sách đơn hàng">
            <Toast ref={toast} />
            <div className='row mb-2'>
                <div className="col-12 col-sm-7">
                    <Link to={'/admin/order-form/new'}>
                        <Button className="p-button-sm mr-2 mb-2"  icon='fa fa-plus' label='Thêm mới' />
                    </Link>
                    {selectedItems?.length>0? 
                    <SplitButton label="Chuyển trạng thái" model={stateOptions} onHide={e=>changeOrderState(stateOrderSelected,selectedItems)} className="p-button-outlined p-button-sm mr-2 mb-2" >
                        
                    </SplitButton>
                    // <Dropdown maxLength={100} options={stateOptions} onChange={(e)=>console.log(e)}  placeholder="--Tất cả--" />
                    :null}
                   
                </div>
                <div className="col-12 col-sm-5">
                    <div className="p-inputgroup d-flex flex-sm-row">
                        <Calendar
                            className='mr-2'
                            showButtonBar={true}
                            dateFormat="dd/mm/yy"
                            id="from_date"
                            value={dayjs(lazyParams.from_date).$d ?? null}
                            onChange={(e) => {
                            setLazyParams(data=>{
                                data.from_date = e.value?.toLocaleDateString().slice(0, 10) ?? ''
                                return {...data};
                            })
                            }}
                            mask="99/99/9999"
                            showIcon
                            placeholder='Từ ngày'
                            />
                        <Calendar
                            className='mr-2'
                            showButtonBar={true}
                            dateFormat="dd/mm/yy"
                            id="end_date"
                            value={dayjs(lazyParams.end_date).$d ?? null}
                            onChange={(e) => {
                                setLazyParams(data=>{
                                    data.end_date = e.value?.toLocaleDateString().slice(0, 10) ?? ''
                                    return {...data};
                                })
                            }}
                            mask="99/99/9999"
                            showIcon
                            placeholder='Đến ngày'
                            />
                        <Dropdown options={stateOptions} scrollHeight={'600px'} style={{width:'30px'}} className='mr-2'
                            value={lazyParams.state??''}
                            onChange={(e)=>{
                                console.log(e)
                                setLazyParams(data=>{
                                    data.state = e.value
                                    return {...data};
                                })
                            }}
                            placeholder='--Tình trạng--'
                            showClear={lazyParams.state??false}
                        />
                        <InputText autoFocus placeholder="Từ khoá..." onKeyDown={onEnterKeySearch} onChange={(e) => onChangeKeySearch(e.target.value)} />
                        <Button icon="pi pi-search" className="p-button-outlined p-button-secondary" onClick={()=>loadLazyData()} />
                    </div>
                </div>
            </div>

            <DataTable showGridlines emptyMessage='Không có kết quả'
            size="small" value={items} lazy responsiveLayout="stack" dataKey="id"
                paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="{first} - {last} / {totalRecords}" rows={lazyParams.rows} rowsPerPageOptions={[10, 20, 50]}
                paginatorLeft={paginatorLeft} first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                loading={loading}
                onSelectionChange={onSelectionChange}
                selection={selectedItems}
                selectionMode="checkbox" 
            >
                <Column className='text-center' style={{ width: '40px' }} body={(rowData, item)=>{
                   return(<>{item.rowIndex +1}</>)
                }} header="#" />
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column body={(row)=>{
                    return (<strong className='text-success'>{row.total}</strong>)
                }} sortable header="Tổng tiền (đ)" />
                <Column field="code" sortable header="Mã đơn hàng" />
                <Column field="full_name" sortable header="Họ tên" />
                <Column field="phone" sortable header="SĐT" />
                
                <Column style={{ width: '150px' }} body={columnOrderDate} sortable header="Ngày tạo đơn" />
                <Column style={{ width: '150px' }} field="created_at_utc" body={columnCreatedDate} sortable header="Ngày tạo" />
                <Column style={{ width: '10%' }} field="state" body={(rowData)=>{
                    let severity = ''
                    if(rowData.state==ACTIVE )severity='success';
                    if(rowData.state==DEACTIVE )severity='warning';
                    return(<Tag severity={severity} value={rowData.state_text} />)
                }} sortable header="Trạng thái" />
                <Column style={{ width: '80px' }} body={actionBodyTemplate} header={<i className='pi pi-cog'></i>} exportable={false} ></Column>
            </DataTable>
        </Card>
    )
};
export default OrderList;