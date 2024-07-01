import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { storeService } from 'services/storeService';
import { useParams } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';

import { useNavigate } from "react-router-dom";

import getFormErrorMessage from 'shared/components/getFormErrorMessage';


const StoreForm = () => {
    let navigate = useNavigate();
    const defaultValues = {
        name: '',
        address: '',
        manager_name: '',
        is_default: true
    }
    let { store_id } = useParams();
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const onSubmit = async (formData) => {
        formData.path_img = formData.img?.path;
        if(store_id ==='new' ){
            //console.log(formData);
            await storeService.create(formData);
        }else{
            await storeService.update(formData);
        }
        navigate('/admin/store-list');
    }
    const getById = async (store_id)=>{
        let result = await storeService.getById(store_id);
        result.data.img={
            path: result.data.path_img
        }
        reset(result.data);
    }
    useEffect(() => {
        if(store_id !=='new' ) getById(store_id);
       
    },[]);
    return (<Card title='Thông tin cửa hàng'>
        <form className="p-fluid container" onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
                <div className='col-12'>
                    <Button label='Lưu' icon='fa fa-save' style={{ width: '100px' }} />
                </div>
                <div className="col-6">
                    <label htmlFor="name">
                        Tên
                    </label>
                    <Controller name="name" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                        <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    {getFormErrorMessage('name', errors)}
                </div>

                <div className="col-6">
                    <label htmlFor="address">
                        Địa chỉ
                    </label>
                    <Controller name="address" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                        <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    {getFormErrorMessage('address', errors)}
                </div>
               
                <div className="col-6">
                    <label htmlFor="manager_name">
                       Quản lý
                    </label>
                    <Controller name="manager_name" control={control} render={({ field, fieldState }) => (
                        <InputText {...field} value={field.value??''} />
                    )} />
                   
                </div>
            </div>
        </form>

    </Card>)
}
export default StoreForm;