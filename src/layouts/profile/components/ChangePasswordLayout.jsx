import 'styles/themes/offcanvas.scss';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useRef, useState, useEffect } from "react";
import { profileChangePasswordService } from 'services/profileChangePasswordService';
import { useForm, Controller } from 'react-hook-form';
import getFormErrorMessage from 'shared/components/getFormErrorMessage';

const ChangePasswordLayout = () => {
    const [data, setData] = useState({
        OldPasswordMsg: [],
        NewPasswordMsg: [],
        ConfirmPasswordMsg: []
    });

    const [oldMsg, setOldMsg] = useState([]);
    const [newMsg, setNewMsg] = useState([]);
    const [cfmMsg, setCfmMsg] = useState([]);

    const defaultValues = {
        name: ''
    }

    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({
        defaultValues: defaultValues
    });

    const loadPassword = async () => {
        let result = await profileChangePasswordService.getpwdmessage();
        setData(result.data);
        console.log(result.data)
    }

    const toast = useRef(null);

    const body = {
        OldPassword: '',
        NewPassword: '',
        ConfirmNewPassword: ''
    }

    const onSubmit = async (dt) => {
        body.OldPassword = dt.OldPassword;
        body.NewPassword = dt.NewPassword;
        body.ConfirmNewPassword = dt.ConfirmNewPassword;

        if (dt.OldPassword == undefined) {
            body.OldPassword = '';
        }

        if (dt.NewPassword == undefined) {
            body.NewPassword = '';
        }

        if (dt.ConfirmNewPassword == undefined) {
            body.ConfirmNewPassword = '';
        }

        let result = await profileChangePasswordService.validatechangepassword(body);
        setData(result.data);
        setOldMsg(result.data.OldPasswordMsg);
        setNewMsg(result.data.NewPasswordMsg);
        setCfmMsg(result.data.ConfirmPasswordMsg);

        if (result.data.OldPasswordMsg == '' && result.data.NewPasswordMsg == '' && result.data.ConfirmPasswordMsg == '') {
            toast.current.show({ severity: 'success', summary: 'e.eps.lms.com thông báo', detail: 'Mật khẩu của bạn đã được thay đổi thành công.', life: 3000 });
        }
    }

    function renderOldMsg() {
        return (
            oldMsg.map((data, index) => {
                return (
                    <div key={index} style={{ color: "red" }}>
                        {data.ErrorMessage}
                    </div>
                )
            })
        )
    }

    function renderNewMsg() {
        return (
            newMsg.map((data, index) => {
                return (
                    <div key={index} style={{ color: "red" }}>
                        {data.ErrorMessage}
                    </div>
                )
            })
        )
    }

    function renderCfmMsg() {
        return (
            cfmMsg.map((data, index) => {
                return (
                    <div key={index} style={{ color: "red" }}>
                        {data.ErrorMessage}
                    </div>
                )
            })
        )
    }

    useEffect(() => {
    }, [])

    const handleSubmitSave = async () => {
        handleSubmit((e) => onSubmit(e))();
    }

    function passwordCheck(text) {
        return {
            upper: (text.match(/[a-z]/g) || []).length,
            lower: (text.match(/[A-Z]/g) || []).length
        };
    }

    function validatePassword(password) {
        var caseStats = passwordCheck(password);

        return caseStats.lower >= 1 && caseStats.upper >= 1;
    }

    return (
        <>
            <Card style={{ height: '80vh', overflow: 'auto' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-fluid container">
                        <h5>ĐỔI MẬT KHẨU</h5>
                        <div>
                            <div className="col-12 row">
                                <div>
                                    <h6>Mật khẩu cũ<a style={{ color: 'red' }}>*</a></h6>
                                    <Controller placeholder="Mật khẩu cũ" name="OldPassword" control={control} render={({ field, fieldState }) => (
                                        <InputText {...field} type="password" value={field.value ?? ''} />
                                    )} />
                                    {renderOldMsg()}
                                </div>
                                <div className="col-12">
                                    <h6>Mật khẩu mới<a style={{ color: 'red' }}>*</a></h6>
                                    <Controller placeholder="Mật khẩu mới" name="NewPassword"
                                        rules={{
                                            pattern: {
                                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                                message: 'Mật khẩu phải chứa tối thiếu 8 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt!',
                                            },
                                        }}
                                        control={control} render={({ field, fieldState }) => (
                                            <InputText {...field} type="password" value={field.value ?? ''} />
                                        )} />
                                    {getFormErrorMessage('NewPassword', errors)}
                                    {renderNewMsg()}
                                </div>
                                <div className="col-12">
                                    <h6>Xác nhận mật khẩu mới<a style={{ color: 'red' }}>*</a></h6>
                                    <Controller placeholder="Xác nhận mật khẩu mới" name="ConfirmNewPassword" control={control} render={({ field, fieldState }) => (
                                        <InputText {...field} type="password" value={field.value ?? ''} />
                                    )} />
                                    {renderCfmMsg()}
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            {/* <Button onClick={(e) => handleSubmitSave(e)} label="Lưu thay đổi" className="p-button-primary" /> */}
                            <a className="btn btn-primary" style={{ opacity: '0.5', cursor: 'default' }}>Lưu thay đổi</a>
                            <Toast ref={toast} />
                        </div>
                    </div>
                </form>
            </Card>
        </>
    )
}
export default ChangePasswordLayout;