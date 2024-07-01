import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { roleService } from 'services/roleService';
import { mapPaginator } from 'shared/utils';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { generateTreePrime } from 'shared/utils/generateTree';
import { TreeTable } from 'primereact/treetable';
import { Tree } from 'primereact/tree';
import { moduleService } from 'services/moduleService';
import dayjs from 'dayjs';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const RoleList = () => {
    const toastBR = useRef(null);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [selectedNodeKeys3, setSelectedNodeKeys3] = useState([]);
    const loadTree = async () => {
        let result = await moduleService.getAll();
        setNodes(generateTreePrime(result.data));
    }
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: 'name',
        sortOrder: false,
        filters: {
            'name': { value: '', matchMode: 'contains' },
            'country.name': { value: '', matchMode: 'contains' },
            'company': { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' },
        }
    });
    const defaultValues = {
        name: '',
        code: '',
        type: '',
        router_path: '',
        icon: '',
        module_ids:{}
    }
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const onSubmit = async (values) => {
        console.log(values);
        values.list_module_id = Object.getOwnPropertyNames(values.module_ids);
        if(values.id>0){
            let result = await roleService.update(values);
        }else{
            let result = await roleService.create(values);
            
        }
        toastBR.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
        loadLazyData();

    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    useEffect(() => {
        loadLazyData();
        loadTree();
    }, [lazyParams])
    const loadLazyData = () => {
        setLoading(true);
        let advanceSearch = mapPaginator(lazyParams);
        console.log(advanceSearch);
        roleService.filterPage(advanceSearch).then(res => {
            setTotalRecords(res.data.total);
            setCustomers(res.data.data);
            setLoading(false);
        })

        //imitate delay of a backend call

    }
    const onPage = (event) => {
        setLazyParams(event);
    }
    const onSort = (event) => {
        setLazyParams(event);
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
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={()=>loadLazyData()} />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    const columnCreatedDate = (rowData, column) => {

        return rowData.created_at_utc ? dayjs(rowData.created_at_utc).format('DD/MM/YYYY HH:mm') : ''
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex flex-row justify-content-end' >
                    <a onClick={()=>selectedItem(rowData)}><i className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center"></i></a>
                    <a onClick={()=>confirmDelete(rowData)}><i className="p-button-rounded p-button p-button-text p-1 pi pi-trash mr-2 flex align-items-center"></i></a>
                </div>

            </React.Fragment>
        );
    }
    const stateBody = (rowData) => {
        if (rowData.state) {
            return (<i className='pi pi-lock' title='Bị khoá'></i>)
        } else return (<></>)

    }
    const selectedItem = async (item)=>{
        let result = await roleService.getById(item.id);
        let data = result.data;
        if(data.list_module_id.length>0){
            let object = Object.assign(...result.data.list_module_id.map(k => ({ [k]: { checked: true } })));
            data.module_ids = object;
        }
        
        reset(data);
    }
    const deleteRole = async (id)=>{
        await roleService.delete(id);
        loadLazyData();
    }
    const confirmDelete = (data) => {
        confirmDialog({
            message: 'Bạn có chắc chắn xoá bản ghi này không?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=>deleteRole(data.id)
        });
    };
    const add = ()=>{
        reset(defaultValues);
    }
    return (

        <div className="row">
              
             <Toast ref={toastBR} position="bottom-right" />
            <div className="col-12 col-md-6 col-lg-6">
                <Card title='Role List'>
                <Button label='Add' onClick={()=>add()}/>
                <DataTable showGridlines  size="small" value={customers} lazy responsiveLayout="stack" dataKey="id"
                    paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} - {last} / {totalRecords}" rows={50} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} first={lazyParams.first} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                    loading={loading}
                    onSelectionChange={onSelectionChange}

                >
                    <Column className='text-center' style={{ width: '40px' }} body={(rowData, item)=>{
                        return(<>{item.rowIndex +1}</>)
                        }} header="#" />
                    <Column field="name" sortable header="Name" />

                    <Column field="created_at_utc" body={columnCreatedDate} sortable header="Ngày tạo" />
                    <Column body={stateBody} />
                    <Column style={{ width: '80px' }} body={actionBodyTemplate} exportable={false} ></Column>
                </DataTable>
                </Card>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
                <Card title="Role info">
                    <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <label htmlFor="code">Code</label>
                            <Controller name="code" control={control} rules={{ required: 'Code is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.code} {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            {getFormErrorMessage('code')}
                        </div>

                        <div className="field">
                            <label htmlFor="module_ids">Permission</label>


                            <Controller name="module_ids" control={control} render={({ field, fieldState }) => (

                                <Tree className='tree-background-hidden' name="module_ids" {...field} value={nodes} selectionMode="checkbox" selectionKeys={field.value ?? ''} onSelectionChange={(e) => {
                                    debugger;
                                    let object = e.value;
                                    console.log(object);
                                    if(object!=null){
                                        for (const property in object) {
                                            object[property]['partialChecked'] = false;
                                            object[property]['checked'] = true;
                                        }
                                    }
                                    field.onChange(object);
                                     
                                }}>
                                    {/* <Column field="name" header="Name" expander></Column>

                                    <Column field="type" header="Type"></Column> */}
                                </Tree>
                            )} />



                        </div>
                        <Button type="submit" label="Save" className="mt-2" style={{ width: 100 }} />
                    </form>

                </Card>
            </div>
        </div>


    )
};
export default RoleList;