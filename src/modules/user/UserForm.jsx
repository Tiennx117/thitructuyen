import React, { useEffect, useState,useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'components/Calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { roleService } from 'services/roleService';
import { userService } from 'modules/user/userService';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { useNavigate } from "react-router-dom";
import { CreatedComponent } from 'components/CreatedComponent';
import { useTranslation } from 'react-i18next'
dayjs.extend(utc)
const UserForm = () => {
    let navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [listRole, setListRole] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    let { user_id } = useParams();
    const { t, i18n } = useTranslation();
    const defaultValues = {
        user_name: '',
        full_name: '',
        email: '',
        password: '',
        confirm_password:'',
        date_of_birth: new Date(),
        list_role: [],
    }
    const  getUserById = async (userId)=>{
        let result = await userService.getById(userId);
        result.data.date_of_birth = result.data.DOBMonth + "/" + result.data.DOBDay + "/" + result.data.DOBYear;
        setFormData(result.data);
        reset(result.data)
        console.log(result)
        //console.log(dayjs(result.data.date_of_birth).format('DD/MM/YYYY'), new Date('2022/06/06'))
        //const date1 = dayjs('2020-01-1');
        //const date2 = dayjs();
        //console.log(dayjs.utc(result.data.date_of_birth).$d)
    }
    const fetchData = async () => {
        //let res = await roleService.getAll();
        //setListRole(res.data);
        if(user_id!='new'){
            await getUserById(user_id);
        }
        else {
            setEditMode(true);
        }
    }
    const close = async () => {
        navigate('/admin/user-list');
        //navigate(-1);
    }

    useEffect(() => {
         fetchData();
        // countryservice.getCountries().then(data => setCountries(data));
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues  } = useForm({ defaultValues });
    const onSubmit = async (data) => {
        console.log(data);
        setFormData(data);
        if(editMode){
            await userService.create(data);
        }else{
            await userService.update(user_id, data);
        }
        navigate('/admin/user-list');
    };
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div >
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <Card title={t('rbkey_ct_ov111rvw', 'Thông tin người dùng')}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid  form-float-label">
                    <div className='grid'>
                        <Button type="submit" label={t('rbkey_ct_ov111rvw', 'Lưu')} className="ml-2" style={{width:100}} />
                        
                        <Button className="btnClose" style={{width:100}} onClick={close.bind(this)} label={t('rbkey_ct_ov111rvw', 'Đóng')}></Button>
                    </div>
                    <div className="field"></div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="SelectedLogOnCode" control={control} rules={{ required: t('rbkey_ct_ov111rvw', 'User Name is required.') }} render={({ field, fieldState }) => (
                                <InputText disabled={!editMode} id={field.SelectedLogOnCode} {...field} value={field.value ?? ''} 
                                autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} 
                                {...register("SelectedLogOnCode", {
                                    validate: async (value) => {
                                        if(user_id != 'new')
                                            return true;
                                        else {
                                            let result = await userService.validateUserName(value, user_id);
                                            return result.data || t('rbkey_ct_ov111rvw', 'Tên tài khoản đã tồn tại. Vui lòng nhập lại!');
                                        }
                                    }
                                })}
                                />
                            )} />
                            <label htmlFor="SelectedLogOnCode" className={classNames({ 'p-error': errors.user_name })}>{t('rbkey_ct_ov111rvw', 'Tài khoản')} *</label>
                        </span>
                        {getFormErrorMessage('user_name')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="FirstName" control={control} rules={{ required: 'Full Name is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.FirstName} {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="FirstName" className={classNames({ 'p-error': errors.full_name })}>{t('rbkey_ct_ov111rvw', 'Tên đầy đủ')} *</label>
                        </span>
                        {getFormErrorMessage('full_name')}
                    </div>
                    <div className="field">
                        <span className="p-float-label p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <Controller name="UserEmail" control={control}
                                rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.UserEmail} {...field} value={field.value ?? ''} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            <label htmlFor="UserEmail" className={classNames({ 'p-error': !!errors.email })}>{t('rbkey_ct_ov111rvw', 'Email')} *</label>
                        </span>
                        {getFormErrorMessage('email')}
                    </div>
                    {editMode?<>
                        <div className="field">
                        <span className="p-float-label">
                            <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                <Password id={field.password} {...field} feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>{t('rbkey_ct_ov111rvw', 'Password')} *</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller  name="confirm_password" control={control} 
                                rules={{ required: 'Password is required.' ,validate:value=>{
                                    return value === getValues('password') || 'The confirm password do not match'
                                }}} render={({ field, fieldState }) => (
                                <Password id={field.confirm_password} {...field} feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} 
                                
                                 />
                            )} />
                            <label htmlFor="confirm_password" className={classNames({ 'p-error': errors.confirm_password })}>{t('rbkey_ct_ov111rvw', 'Confirm password')} *</label>
                        </span>
                        {getFormErrorMessage('confirm_password')}
                    </div>
                    </>:''}
                    
                    <div className="field">
                        <span className="p-float-label">
                            {/* <Controller name="date_of_birth" control={control} render={({ field }) => (
                                <Calendar showButtonBar={true} style={{ width: 120 }} id={field.name}  value={dayjs(field.value).$d ?? ''} onChange={(e) => {field.onChange(e.value);console.log(e.value)}} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                            )} /> */}
                            <Controller name="date_of_birth" control={control} render={({ field, fieldState }) => (
                                        <Calendar
                                        showButtonBar={true}
                                        dateFormat="dd/mm/yy"
                                        {...field}
                                        name="date_of_birth"
                                        value={dayjs(field.value).$d ?? ''}
                                        onChange={(e) => {
                                            field.onChange(e.value?.toLocaleDateString().slice(0, 10)??'');
                                        }}
                                        mask="99/99/9999" 
                                        showIcon
                                        />
                                    )} />

                            <label htmlFor="date_of_birth">{t('rbkey_ct_ov111rvw', 'Ngày sinh')} </label>
                        </span>
                    </div>
                    <div className='field '>
                        <span className="p-float-label">
                        {/* <MultiSelect  showSelectAll={false} selectAll value={['1','2',null]}  options={['1','2']}  display="chip" /> */}
                            <Controller name="list_role" control={control} render={({ field }) =>  (
                                <MultiSelect inputId={field.name} id={field.name} showSelectAll={false} selectAll value={field.value} onChange={(e) =>field.onChange(e.value)} options={listRole}  optionLabel="name" optionValue="id"  display="chip" />
                            )} />
                            {/* <Controller name="list_role" control={control} render={({ field }) =>  (
                                <h1>{field.value}</h1>
                            )} /> */}
                            <label htmlFor="list_role">{t('rbkey_ct_ov111rvw', 'Quyền')} </label>
                        </span>



                    </div>
                    
                </form>
                <CreatedComponent created_by={formData.created_by} created_at_utc={formData.created_at_utc} updated_by={formData.updated_by} updated_at_utc={formData.updated_at_utc} />
            </Card>
        </div>
    );
}
export default UserForm;