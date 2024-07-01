import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { productService } from 'services/productService';
import { mapPaginator } from 'shared/utils';
import dayjs from 'dayjs';
import { Image } from 'components/Image';
import { appSetting } from 'shared/app-settings';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import { InputText } from 'primereact/inputtext';
import { productStateText, RETRACT, PUBLISH, DRAFT, pagingDefaults } from 'shared/utils/appState';
import { Tag } from 'components/tag';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { warehouseService } from 'services/warehouseService';
const SelectProductInStockModal = (props) => {
    const [listWarehouse, setListWarehouse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [items, setItems] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [lazyParams, setLazyParams] = useState({
        warehouse_id: props.warehouseId,
        ...pagingDefaults
    });
    useEffect(() => {
        setLazyParams((state) => {
            return { ...state, warehouse_id: props.warehouseId, todate: props.toDate };
        });
    }, [props.warehouseId, props.toDate])
    const getListWarehouse = async () => {
        let result = await warehouseService.getAll();
        setListWarehouse(result.data);
    }

    const loadLazyData = () => {
        setLoading(true);
        let advanceSearch = mapPaginator(lazyParams);
        warehouseService.filterProductInStock(advanceSearch).then(res => {
            setTotalRecords(res.data.total);
            setItems(res.data.data);
            setLoading(false);
        })
    }
    const onPage = (event) => {
        console.log(event);
        setLazyParams((state) => { return { ...state, ...event } });
        loadLazyData();
    }
    const onSort = (event) => {
        setLazyParams((state) => { return { ...state, ...event } });
        loadLazyData();
    }


    const onSelectionChange = (event) => {
        const value = event.value;
       
        let fal = false;
        if(!props.allowNegative){
            value.forEach((item)=>{
                if(item.total_quantity_in_stock==0){
                    alert(item.product_name +' - Mã ' +item.product_variant_key+': tồn kho không đủ!');
                    fal = true;
                    return;
                }
            })
        }
        
        if(fal!==true){
            console.log(fal);
            setSelectedItems(value);
        }
        
    }


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={() => loadLazyData()} />;
    const columnCreatedDate = (rowData, column) => {

        return dayjs(rowData.created_at_utc).format('DD/MM/YYYY HH:mm:ss')
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex flex-row justify-content-end' >
                    <Link to={'/admin/product-form/' + rowData.id}><i className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center"></i></Link>
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
        return (<Image width='60' src={appSetting.ADDRESS_API + '/' + rowData.avatar_url} />)
    }
    const deleteItem = async (id) => {
        await productService.delete(id);
        loadLazyData();
    }
    const confirmDelete = (data) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn xoá bản ghi này không?',
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
            return { ...state, key_search: text };
        });
    }
    const onChangeWarehouse = (e) => {
        console.log(e)
        setLazyParams((state) => {
            return { ...state, warehouse_id: e.value };
        });
    }
    const onPublish = () => {
        confirmDialogGlobal({
            message: 'Bạn có muốn xuất bản không?',
            accept: () => onUpdateState(PUBLISH)
        });

    }
    const onReject = () => {
        confirmDialogGlobal({
            message: 'Bạn có muốn thu hồi không?',
            accept: () => onUpdateState(RETRACT)
        });
    }
    const onUpdateState = async (state) => {
        let obj = {
            ids: selectedItems.map(x => x.id),
            state: state
        }
        await productService.updateState(obj);
        setSelectedItems([]);
        loadLazyData();
    }
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        if(!props.warehouseId){
            alert('Vui lòng chọn kho!');
            return;
        }
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
        loadLazyData();
        getListWarehouse();

    }
    const onChosen = (name) => {

        dialogFuncMap[`${name}`](false);
        props.onSelected(selectedItems);
        setSelectedItems([]);
    }
    const onCancel = (name) => {

        dialogFuncMap[`${name}`](false);
        props.onSelected([]);
        setSelectedItems([]);
    }
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Huỷ" icon="pi pi-times" onClick={() => onCancel(name)} className="p-button-text" />
                <Button label="Chọn" icon="pi pi-check" onClick={() => onChosen(name)} />
            </div>
        );
    }
    return (
        <>
            {props.showStore}
            <Button label={props.label} style={{ width: 60 }} className="m-2" type='button' onClick={() => onClick('displayBasic')} />
            <Dialog header="Chọn sản phẩm" style={{ width: '80vw' }} visible={displayBasic} onHide={() => onCancel('displayBasic')} footer={renderFooter('displayBasic')}>

                <div className='row mb-2'>
                    <div className="col-4 col-sm-8">
                        {props.showStore ? <>
                            <div className="field">
                                <Dropdown className='w-100' value={lazyParams.warehouse_id} onChange={(e) => onChangeWarehouse(e)} options={listWarehouse} optionLabel='name' optionValue='id' filter showClear filterBy='name' placeholder="--Chọn kho--" />
                            </div>
                        </> : ''}


                    </div>
                    <div className="col-8 col-sm-4">

                        <div className="p-inputgroup">
                            <InputText placeholder="Từ khoá..." value={lazyParams.key_search} onKeyDown={(e) => onEnterKeySearch(e)} onChange={(e) => onChangeKeySearch(e.target.value)} autoFocus />
                            <Button icon="pi pi-search" className="p-button-outlined p-button-secondary" onClick={() => loadLazyData()} />
                        </div>
                    </div>
                </div>

                <DataTable showGridlines size="small" value={items} lazy responsiveLayout="stack" dataKey="id"
                    paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} - {last} / {totalRecords}" rows={lazyParams.rows} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                    loading={loading}
                    onSelectionChange={onSelectionChange}
                    selection={selectedItems}
                    metaKeySelection={false}
                    selectionMode="checkbox"
                >
                    <Column className='text-center' style={{ width: '40px' }} body={(rowData, item) => {
                        return (<>{item.rowIndex + 1}</>)
                    }} header="#" />
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column style={{ width: '100px' }} field="avatar" header="Ảnh đại diện" body={columnBodyAvatar} />
                    <Column style={{ width: '150px' }} field="product_code" sortable header="Mã SP" />
                    <Column style={{ width: '150px' }} field="product_variant_key" sortable header="Mã mẫu" />
                    <Column field="product_name" sortable header="Tên" />
                    <Column body={(row)=>{
                    if( row.product_variant_values.length>0){
                        let attrs = row.product_variant_values.map(el=>{
                            return el.attribute_name +': '+ el.value;
                        })
                        let attr_description = attrs.join(', ');
                        return attr_description;
                    }else return <span>(Không có thuộc tính)</span>

                }} header="Thuộc tính" />
                    <Column field='total_quantity_in_stock' header='Tồn kho' />
                    {/* <Column style={{ width: '150px' }} field="created_at_utc" body={columnCreatedDate} sortable header="Ngày tạo" /> */}
                    <Column style={{ width: '10%' }} field="state" body={(rowData) => {
                        let severity = ''
                        if (rowData.state == PUBLISH) severity = 'success';
                        if (rowData.state == RETRACT) severity = 'warning';
                        return (<Tag severity={severity} value={productStateText[rowData.state]} />)
                    }} sortable header="Trạng thái" />

                </DataTable>

            </Dialog>
        </>
    )
};

SelectProductInStockModal.propTypes = {
    showStore: PropTypes.bool,
    warehouseId: PropTypes.string,
    toDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]),
    allowNegative:PropTypes.bool
};
SelectProductInStockModal.defaultProps = {
    showStore: false,
    allowNegative: false
    
}
export default SelectProductInStockModal;