import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { provinceService } from 'services/provinceService';
import { useParams } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';

import { useNavigate } from "react-router-dom";

import getFormErrorMessage from 'shared/components/getFormErrorMessage';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ProvinceForm = () => {
    let navigate = useNavigate();
    const defaultValues = {
        name: '',
        code: '',
        description: '',
        state: true
    }
    let { province_id } = useParams();
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ 
        mode: "onBlur",
        defaultValues: defaultValues
     });
    const onSubmit = async (formData) => {
        formData.path_img = formData.img?.path;
        if(province_id ==='new' ){
            //console.log(formData);
            await provinceService.create(formData);
        }else{
            await provinceService.update(formData);
        }
        navigate('/admin/province-list');
    }
    const getById = async (province_id)=>{
        let result = await provinceService.getById(province_id);
        result.data.img={
            path: result.data.path_img
        }
        reset(result.data);
    }
    useEffect(() => {
        if(province_id !=='new' ) getById(province_id);
       
    },[]);
    return (<Card title='Tỉnh/thành phố'>
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
                        <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} 
                        {...register("name", {
                            validate: async (value) => {
                                let result = await provinceService.validateName(value, province_id);
                                return result.data || 'Tên đã tồn tại. Vui lòng nhập lại!';
                            }
                        })}
                        />
                    )} />

                    {getFormErrorMessage('name', errors)}
                </div>

                <div className="col-6">
                    <label htmlFor="address">
                        Mã
                    </label>
                    
                    <Controller name="code" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                        <InputText  {...field} className={classNames({ 'p-invalid': fieldState.invalid })}  
                            {...register("code", {
                                validate: async (value) => {
                                    let result = await provinceService.validateCode(value, province_id);
                                    return result.data || 'Mã đã tồn tại. Vui lòng nhập lại!';
                                }
                            })}
                          />
                    )} />
                    {getFormErrorMessage('code', errors)}
                </div>
               
                <div className="col-12">
                    <label htmlFor="description">
                        Mô tả
                    </label>
                    <Controller name="description" control={control} render={({ field, fieldState }) => (
                        <InputText {...field} value={field.value??''} />
                    )} />
                   
                </div>
                
                <div className='col-12'>
                    <label htmlFor="state">Sử dụng/ Không sử dụng</label><br/>
                    <Controller name="state" control={control} render={({ field, fieldState }) => (
                         <InputSwitch checked={field.value} onChange={(e) => field.onChange(e.target.value)} />
                    )} />
                </div>
            </div>
        </form>

    </Card>)
}
export default ProvinceForm;