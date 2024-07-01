import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useForm, Controller } from 'react-hook-form';
import { generateTreePrime } from 'shared/utils/generateTree';
import { categoryService } from 'services/categoryService';
import { classNames } from 'primereact/utils';
import { TreeSelect } from 'primereact/treeselect';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputSwitch } from 'primereact/inputswitch';
import { categoryTypeStates, cateogryTypeText } from 'shared/utils/appState';

const CategoryList = () => {
    const [nodes, setNodes] = useState([]);
    const [treeParent, setTreeParent] = useState([]);
    const toastBR = useRef(null);
    useEffect(() => {
        //setNodes(tree);
        loadTree();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadTree = async ()=>{
        let result  = await categoryService.getAll();
        setTreeParent(generateTreePrime(result.data));
        setNodes(generateTreePrime(result.data));
    }

    const actionTemplate = (node, column) => {
        return (
            <React.Fragment>
                <div className='flex flex-row justify-content-end' >
                <i className="p-button-rounded p-button p-button-text p-1 pi pi-angle-up mr-2 flex align-items-center" onClick={()=>orderBy(node.data.id, true)}></i>
                <i className="p-button-rounded p-button p-button-text p-1 pi pi-angle-down mr-2 flex align-items-center" onClick={()=>orderBy(node.data.id, false)}></i>
                    <i className="p-button-rounded p-button p-button-text p-1 pi pi-pencil mr-2 flex align-items-center" onClick={()=>selectedItem(node.data)}></i>
                    <i className="p-button-rounded p-button p-button-text p-1 pi pi-trash mr-2 flex align-items-center" onClick={()=>confirm2(node.data)}></i>
                </div>
            </React.Fragment>
        );
        
    }

    const footer = <Button type="button" icon="pi pi-refresh" className="p-button-text" onClick={()=>loadTree()} />;
    const defaultValues = {
        name: '',
        code: '',
        type: '',
        router_path: '',
        icon:'',
        parent_id: '',
        state: true
    }
    const [formData, setFormData] = useState(defaultValues);

    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue  } = useForm({ defaultValues });
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const onSubmit =  async (values) => {
        
        if(values.id!=null){
            await categoryService.update(values);
            let result  = await categoryService.getAll();
            setNodes(generateTreePrime(result.data));
        }else{
            await categoryService.create(values);
            reset(defaultValues);
            loadTree();
        }
        showBottomRight();
    }
    const selectedItem = (item)=>{
        categoryService.getTreeParent(item.id).then(res=>{
            setTreeParent(generateTreePrime(res.data));
            reset(item);
        })
    }
    const add = ()=>{
        reset(defaultValues);
        loadTree();
    }
    const showBottomRight = () => {
        toastBR.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }
    const confirm2 = (data) => {
        confirmDialog({
            message: 'Khi xoá sẽ xoá hết các module con. Bạn có chắc chắn xoá không?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: ()=>deleteModule(data.id)
        });
    };
    const deleteModule = async (module_id)=>{
        await categoryService.delete(module_id);
        loadTree();
    }
    const orderBy = async (id, up)=>{
        await categoryService.orderBy(id, up);
        loadTree();
    }
    return (
       
            <div className="row">
                 <Toast ref={toastBR} position="bottom-right" />
            <div className="col-12 col-lg-6">
                
                <Card>
                    <Button label='Add' onClick={()=>add()}/>
                    <TreeTable showGridlines  value={nodes} footer={footer}>
                        <Column field="name" header="Tên" expander></Column>
                        <Column field="type" header="Loại" body={(rowData)=> {return(cateogryTypeText[rowData?.type])}}/>
                        <Column body={actionTemplate} style={{ textAlign: 'center', width: '120px' }} />
                    </TreeTable>
                </Card>
            </div>
            <div className="col-12 col-lg-6">
                <Card title="Thông tin danh mục">
                <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name">Tên</label>
                    <Controller name="name" control={control} rules={{ required: 'Trường dữ liệu không được để trống!' }} render={({ field, fieldState }) => (
                        <InputText  id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                     {getFormErrorMessage('name')}
                </div>
                <div className="field">
                    <label htmlFor="type">Phân loại</label>
                    <Controller name="type" control={control} render={({ field, fieldState }) => (
                         <Dropdown value={field?.value} onChange={(e) => field.onChange(e.value)} options={categoryTypeStates} showClear optionLabel='text' optionValue='value'/>
                    )} />
                </div>
                <div className="field">
                    <label htmlFor="parent_id">Danh mục cha</label>
                     <div className="grid">
                         <div className="col-10">
                            <Controller name="parent_id" control={control} render={({ field, fieldState }) => (
                            <TreeSelect name="parent_id" id={field.parent_id} {...field} value={field.value ??''} options={treeParent} onChange={(e) => field.onChange(e.value)} filter placeholder="Select Items" />
                        )} />
                        </div>
                        <div className='col-2'>
                        <Button type='button' label="Clear" className="p-button-outlined p-button-secondary" onClick={()=>setValue('parent_id', null)}/>
                        </div>
                     </div>
                </div>
                <div className='field'>
                    <label htmlFor="state">Trạng thái</label><br/>
                    <Controller name="state" control={control} render={({ field, fieldState }) => (
                        <InputSwitch checked={field.value} tooltip={field.value ? 'Sử dụng' : 'Không sử dụng' } onChange={(e) => field.onChange(e.target.value)} />
                    )} />
                </div>  
                <Button type="submit" label="Save" className="mt-2" style={{width:100}} />
                </form>
                
                </Card>
            </div>
           
        
            
        </div>
    );
}
export default CategoryList;