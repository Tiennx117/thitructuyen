import './login.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeToken, setTokenLMS } from 'store/oauth/oauthSlice';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { oauthService } from 'services/oauthService';
import { appSetting } from 'shared/app-settings';

const LoginComponent = () => {
    console.log('login lms111111111');
    const dispatch = useDispatch();
    let navigate = useNavigate();
    //const history = useHistory();
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const defaultValues = {
        username: '',
        password: '',
        keep_login: false
    }

    useEffect(() => {
        if (sessionStorage.getItem('aspSessionId') != null && sessionStorage.getItem('aspSessionId') + '' != '') {

            oauthService.loginLMS({ username: '', password: '' }).then((auth) => {
                console.log('login lms', auth);
                let token = auth.data;
                if (!sessionStorage.getItem('corporateID')) {
                    sessionStorage.clear();
                    sessionStorage.setItem('corporateID', token.CorporateId);
                    sessionStorage.setItem('selectedCultureID', token.Culture); //'vi-VN'); //
                    sessionStorage.setItem('selectedUserRoleID', token.SelectedUserRoleId);
                }
                dispatch(setTokenLMS(token));
                window.location.href = '/'
            }).catch(err => {
                console.log(err);
                if (err && err.error && err.error.Message == 'Session has been expired') {
                    //remove tokenb 
                    //dispatch(removeToken());
                    window.location.href = appSetting.ADMIN_URL + '/frmLogin.aspx';
                }
            });

        }
        else {
            //console.log('not login');
            //window.location.href = appSetting.ADMIN_URL + '/frmLogin.aspx';
        }



    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        setShowMessage(true);
        sessionStorage.clear();
        oauthService.loginLMS(data).then((auth) => {
            console.log('login lms', auth);
            let token = auth.data;
            if (!sessionStorage.getItem('corporateID')) {
                sessionStorage.clear();
                sessionStorage.setItem('corporateID', token.CorporateId);
                sessionStorage.setItem('selectedCultureID', token.Culture); //'vi-VN'); //
                sessionStorage.setItem('selectedUserRoleID', token.SelectedUserRoleId);
                sessionStorage.setItem('aspSessionId', 'xxx');
                sessionStorage.setItem('LMS_URL', document.referrer);
            }
            dispatch(setTokenLMS(token));
            window.location.href = '/'
        }).catch(err => {
            console.log(err);
            if (err && err.error && err.error.Message == 'Session has been expired') {
                //remove tokenb 
                //dispatch(removeToken());
                //window.location.href = appSetting.ADMIN_URL + '/frmLogin.aspx';
            }
        });
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className='login-page'>
            <div className='login-box'>
                <div className='login-logo'>

                    <b>LMS </b> <span style={{ fontSize: '0.8rem' }}>v1.0</span>

                </div>

                <Card>
                    <div className='card-body login-card-body'>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <span className="p-label">
                                    <label htmlFor="username" className={classNames({ 'p-error': errors.username })}>Tên tài khoản*</label>
                                    <Controller name="username" control={control} rules={{ required: 'Vui lòng nhập tên tài khoản!' }} render={({ field, fieldState }) => (
                                        <InputText id={field.username} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />

                                </span>
                                {getFormErrorMessage('username')}
                            </div>
                            <div className="field">
                                <span className="p-label">
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Mật khẩu*</label>
                                    <Controller name="password" control={control} rules={{ required: 'Vui lòng nhập mật khẩu' }} render={({ field, fieldState }) => (
                                        <Password id={field.password} {...field} feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />

                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <div className="field-checkbox">
                                <Controller name="keep_login" control={control} render={({ field, fieldState }) => (
                                    <Checkbox inputId={field.keep_login} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="keep_login" className={classNames({ 'p-error': errors.accept })}>Duy trì đăng nhập</label>
                            </div>
                            <Button type='submit' className="discord" aria-label="Đăng nhập">
                                <i className="pi pi-sign-in" ></i>
                                <span className="px-3">Đăng nhập</span>
                            </Button>
                            {message != null ? <div className="alert alert-danger mt-3" role="alert">
                                {message}
                            </div> : null}

                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default LoginComponent;