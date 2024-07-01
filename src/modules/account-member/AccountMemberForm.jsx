import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { accountMemberService } from 'services/accountMemberService';
import { useParams } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';
import { useNavigate } from "react-router-dom";
import { SelectImgItem } from 'components/SelectImgItem';
import getFormErrorMessage from 'shared/components/getFormErrorMessage';
import { statusText, ACTIVE, DEACTIVE } from 'shared/utils/appState';
const types = [
    { text: 'Hiện thị trang chủ', value: 'home' },
]
const AccountMemberForm = () => {
    let navigate = useNavigate();
    const defaultValues = {
        name: '',
        url: '',
        img: null,
        index: 1,
        path_img: null,
        description: '',
        state: ACTIVE
    }
    let { account_member_id } = useParams();
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({ defaultValues });
    const onSubmit = async (formData) => {
        formData.path_img = formData.img?.path;
        if(account_member_id ==='new' ){
            //console.log(formData);
            await accountMemberService.create(formData);
        }else{
            await accountMemberService.update(formData);
        }
        navigate('/admin/slide-list');
    }
    const getById = async (account_member_id)=>{
        let result = await accountMemberService.getById(account_member_id);
        result.data.img={
            path: result.data.path_img
        }
        reset(result.data);
    }
    useEffect(() => {
        if(account_member_id !=='new' ) getById(account_member_id);
       
    },[]);
    return (<Card title='Thành viên'>
        <form className="p-fluid container" onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
                <div className='col-12'>
                    <Button label='Lưu' icon='fa fa-save' style={{ width: '100px' }} />
                </div>
                <div className="col-6">
                    <label htmlFor="exampleInputPassword1">
                        Tên
                    </label>
                    <Controller name="name" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                        <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    {getFormErrorMessage('name', errors)}
                </div>

                <div className=" col-6">
                    <label htmlFor="index">
                        STT
                    </label>
                    <Controller name="index" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                        <InputNumber inputId="integeronly" value={field.value} onValueChange={(e) => {
                            field.onChange(e.value)
                        }} className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    {getFormErrorMessage('index', errors)}
                </div>
               
                <div className="col-12">
                    <label htmlFor="description">
                        Mô tả
                    </label>
                    <Controller name="description" control={control} render={({ field, fieldState }) => (
                        <InputTextarea value={field.value??''} onChange={(e)=> field.onChange(e.target.value)} />
                    )} />

                </div>
                <div className='col-12'>
                    <label htmlFor="url" >
                        Url
                    </label>
                    <Controller name="url" control={control} render={({ field, fieldState }) => (
                        <InputText value={field.value??''} onChange={(e)=> field.onChange(e.target.value)} />
                    )} />
                </div>
                <div className="col-12" >
                    <div style={{ width: '220px' }}>
                        <Controller name="img" control={control} render={({ field, fieldState }) => (
                            <SelectImgItem label='Ảnh' {...field} value={field.value} onSelectImage={(e) => {
                                field.onChange(e);
                            }} />
                        )} />

                    </div>

                </div>
                <div className='col-12'>
                    <Controller name="state" control={control} render={({ field, fieldState }) => (
                         <InputSwitch trueValue={ACTIVE} falseValue={DEACTIVE}  tooltip={field.value ==ACTIVE ? statusText.active : statusText.deactive }  checked={field.value} onChange={(e) => field.onChange(e.target.value)} />
                    )} />
                </div>
            </div>
        </form>

    </Card>)
}
export default AccountMemberForm;