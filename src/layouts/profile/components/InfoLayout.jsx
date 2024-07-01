import 'styles/themes/offcanvas.scss';
import React, { useRef, useState, useEffect } from "react";
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { profileInfoService } from 'services/profileInfoService';
import { useForm, Controller } from 'react-hook-form';
import getFormErrorMessage from 'shared/components/getFormErrorMessage';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import dayjs from 'dayjs';
import parse from 'date-fns/parse';
import { RadioButton } from 'primereact/radiobutton';
import { Link } from 'react-router-dom';
import './profile.scss';
import moment from 'moment';

const InfoLayout = () => {
    const [profile, setProfile] = useState({});
    const [profileData, setProfileData] = useState({});
    const [objUserTitles, setObjUserTitles] = useState([]);
    const [objGender, setObjGender] = useState([]);
    const [objTimeZone, setObjTimeZone] = useState([]);

    const [primaryRole, setPrimaryRole] = useState("");
    const [secondaryRole, setSecondaryRole] = useState("");

    const [objCountries, setObjCountries] = useState([]);
    const [objReportingAuthority, setObjReportingAuthority] = useState([]);
    const [checked, setChecked] = useState(0);
    const [authority, setAuthority] = useState(0);

    const [fieldTable, setFieldTable] = useState([]);
    const [fieldValue, setFieldValue] = useState([]);
    const [fieldDDL, setFieldDDL] = useState([]);

    const defaultValues = {
        name: ''
    }
    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({
        defaultValues: defaultValues
    });

    function onChangeValue(e) {
        setChecked(e);
    }

    useEffect(() => {
        loadAllProfile();
    }, [])

    useEffect(() => {
        return (() => {
            console.log('unmount');
        })
    }, [])

    const [enableUserTitle, setEnableUserTitle] = useState(false);
    const [enableFirstName, setEnableFirstName] = useState(false);
    const [enableMiddleName, setEnableMiddleName] = useState(false);
    const [enableLastName, setEnableLastName] = useState(false);
    const [enableEmpNo, setEnableEmpNo] = useState(false);
    const [enableDateOfBirth, setEnableDateOfBirth] = useState(false);
    const [enableGender, setEnableGender] = useState(false);
    const [enableEmail, setEnableEmail] = useState(false);
    const [enablePhone, setEnablePhone] = useState(false);
    const [enableOfficeNo, setEnableOfficeNo] = useState(false);

    const [enableJobTitle, setEnableJobTitle] = useState(false);
    const [enableStartingDate, setEnableStartingDate] = useState(false);
    const [enableLeavingDate, setEnableLeavingDate] = useState(false);
    const [enableIsAuthority, setEnableIsAuthority] = useState(false);
    const [enableAuthority, setEnableAuthority] = useState(false);

    const [enableHouseNumber, setEnableHouseNumber] = useState(false);
    const [enableStreet, setEnableStreet] = useState(false);
    const [enableLocality, setEnableLocality] = useState(false);
    const [enableCity, setEnableCity] = useState(false);
    const [enableState, setEnableState] = useState(false);
    const [enableZipCode, setEnableZipCode] = useState(false);
    const [enableCountry, setEnableCountry] = useState(false);
    const [timezone, settimezone] = useState('');

    const loadAllProfile = async () => {
        let result = await profileInfoService.getuserdetails();
        let resultData = await profileInfoService.getuserprofiledata();

        setProfile(result.data);
        setProfileData(resultData.data);
        setFieldTable(resultData.data.ObjFieldDetails.Table);
        setFieldDDL(resultData.data.ObjFieldDetails.Table2);
        setFieldValue(resultData.data.ObjSelectedFieldValues);
        setObjUserTitles(resultData.data.objUserTitles);
        setObjGender(resultData.data.ObjGender);
        setObjTimeZone(resultData.data.ObjTimeZone);
        setObjCountries(resultData.data.Countries);
        setObjReportingAuthority(resultData.data.ObjReportingAuthority);
        setPrimaryRole(resultData.data.PrimaryRoleName);
        setSecondaryRole(resultData.data.SecondaryRole);

        setEnableUserTitle(JSON.parse(resultData.data.ObjListData.UsrTtlLBL[2].toLowerCase()));
        setEnableFirstName(JSON.parse(resultData.data.ObjListData.FrstNmLBL[2].toLowerCase()));
        setEnableMiddleName(JSON.parse(resultData.data.ObjListData.MddlNmLBL[2].toLowerCase()));
        setEnableLastName(JSON.parse(resultData.data.ObjListData.LstNmLBL[2].toLowerCase()));
        setEnableEmpNo(JSON.parse(resultData.data.ObjListData.EmpNoLBL[2].toLowerCase()));
        setEnableDateOfBirth(JSON.parse(resultData.data.ObjListData.DtOfBrthLBL[2].toLowerCase()));
        setEnableGender(JSON.parse(resultData.data.ObjListData.GndrLBL[2].toLowerCase()));
        setEnableEmail(JSON.parse(resultData.data.ObjListData.UsrEmlLBL[2].toLowerCase()));
        setEnablePhone(JSON.parse(resultData.data.ObjListData.MblNmbrLBL[2].toLowerCase()));
        setEnableOfficeNo(JSON.parse(resultData.data.ObjListData.OffcNmbrLBL[2].toLowerCase()));

        setEnableJobTitle(JSON.parse(resultData.data.ObjListData.JbTtlLBL[2].toLowerCase()));
        setEnableStartingDate(JSON.parse(resultData.data.ObjListData.StrtDtLBL[2].toLowerCase()));
        setEnableLeavingDate(JSON.parse(resultData.data.ObjListData.LvngDtLBL[2].toLowerCase()));
        setEnableIsAuthority(JSON.parse(resultData.data.ObjListData.IsRprtngAthrtyLBL[2].toLowerCase()));
        setEnableAuthority(JSON.parse(resultData.data.ObjListData.RprtngAthrtyLBL[2].toLowerCase()));

        setEnableHouseNumber(JSON.parse(resultData.data.ObjListData.HsNmbrLBL[2].toLowerCase()));
        setEnableStreet(JSON.parse(resultData.data.ObjListData.StrtBlckLBL[2].toLowerCase()));
        setEnableLocality(JSON.parse(resultData.data.ObjListData.LcltyLBL[2].toLowerCase()));
        setEnableCity(JSON.parse(resultData.data.ObjListData.CtyClnLBL[2].toLowerCase()));
        setEnableState(JSON.parse(resultData.data.ObjListData.SttLBL[2].toLowerCase()));
        setEnableZipCode(JSON.parse(resultData.data.ObjListData.ZpCdLBL[2].toLowerCase()));
        setEnableCountry(JSON.parse(resultData.data.ObjListData.CntryLBL[2].toLowerCase()));

        reset(resultData.data);

    }

    const toast = useRef(null);

    const onSubmit = async (data) => {
        data.IsReportingAuthority = authority;
        await profileInfoService.saveuserdetails(data);
        if (data.FirstName != '' && data.LastName != '' && data.UserEmail != '' && data.MobileNumber != '') {
            toast.current.show({ severity: 'success', summary: 'e.eps.lms.com thông báo', detail: 'Hồ sơ của bạn đã được lưu thành công.', life: 3000 });
        }
    }

    const handleSubmitSave = () => {
        handleSubmit((e) => onSubmit(e))();
    }

    const openLink_downloadFile = async () => {
        let result = await profileInfoService.getuserpersonaldata();
        let a = document.createElement('a');
        a.href = result.data.DataFilePath;
        a.target = "_blank";
        a.click();
    }

    function toExamDetail() {
        openLink_downloadFile();
    }
    function locdulieu(data, data1) {
        let obj = []
        for (let i = 0; i <= data1.length; i++) {
            if (data.NM_FLD_ID == data1[i]?.NM_FLD_ID) {
                obj = [...obj, ...[data1[i]]]
            }
        }
        return obj
    }
    function additionalInfo() {
        return (
            fieldTable.map((data, index) => {
                return (
                    <div className="col-4" key={index}>
                        <h6>{data.VC_FLD_NM}</h6>
                        <div>
                            {
                                fieldValue.map((data1, index1) => {
                                    return (
                                        <div key={index1}>
                                            {
                                                data.CH_FLD_VL_TYP == "T" && data.NM_FLD_ID == data1.NM_FLD_ID ?
                                                    <InputText value={data1.VC_FLD_VL} />
                                                    : ""
                                            }
                                            {
                                                data.CH_FLD_VL_TYP == "D" && data.NM_FLD_ID == data1.NM_FLD_ID ?
                                                    <Dropdown options={locdulieu(data, fieldDDL)} optionLabel="VC_FLD_VL_TXT" optionValue="NM_FLD_VL_ID" id={data1.NM_FLD_VL_ID} value={data1.VC_FLD_VL_TXT} />
                                                    : ""
                                            }
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                )
            })
        )
    }

    function convert(str) {
        var date = new Date(str),
            mnth = ("" + (date.getMonth() + 1)),
            day = ("" + date.getDate());
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        if (parseInt(mnth) < 10) {
            mnth = "0" + mnth;
        }
        return [day, mnth, date.getFullYear().toString()].join("/");
    }

    function convertTwo(str) {
        var date = moment(str, "DD/MM/YYYY").toDate(),
            mnth = ("" + (date.getMonth() + 1)),
            day = ("" + date.getDate());
        if (parseInt(day) < 10) {
            day = "0" + day;
        }
        if (parseInt(mnth) < 10) {
            mnth = "0" + mnth;
        }
        return [date.getFullYear().toString(), mnth, day].join("-");
    }

    return (
        <>
            <Card style={{ height: '80vh', overflow: 'auto' }}>
                <form onSubmit={handleSubmit()}>
                    <div className="p-fluid container">
                        <h5>THÔNG TIN CƠ BẢN</h5>
                        <div className="row">
                            {
                                enableUserTitle == true ?
                                    <div className="col-4">
                                        <h6>Danh xưng người dùng</h6>
                                        <Controller placeholder="Chọn danh xưng" name="UserTitle" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableUserTitle} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objUserTitles} optionLabel="mstrText" optionValue='mstrText' />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Danh xưng người dùng</h6>
                                        <Controller placeholder="Chọn danh xưng" name="UserTitle" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableUserTitle} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objUserTitles} optionLabel="mstrText" optionValue='mstrText' style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableFirstName == true ?
                                    <div className="col-4">
                                        <h6>Họ và tên <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Họ và tên" name="FirstName" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableFirstName} {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.value)} />
                                        )} />
                                        {getFormErrorMessage('FirstName', errors)}
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Họ và tên <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Họ và tên" name="FirstName" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableFirstName} {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.value)} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {/* {
                                enableMiddleName == true ?
                                    <div className="col-4">
                                        <h6>Tên đệm</h6>
                                        <Controller placeholder="Tên đệm" name="MiddleName" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableMiddleName} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Tên đệm</h6>
                                        <Controller placeholder="Tên đệm" name="MiddleName" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableMiddleName} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            } */}
                        </div>
                        <div className="row">
                            {/* {
                                enableLastName == true ?
                                    <div className="col-4">
                                        <h6>Họ <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Họ" name="LastName" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableLastName} {...field} value={field.value ?? ''} />
                                        )} />
                                        {getFormErrorMessage('LastName', errors)}
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Họ <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Họ" name="LastName" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableLastName} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                            } */}
                            {
                                enableEmpNo == true ?
                                    <div className="col-4">
                                        <h6>Mã nhân viên</h6>
                                        <Controller placeholder="Mã nhân viên" name="UIDAI" rules={{ required: 'Giá trị này phải nhập dạng số, bao gồm 8 ký tự.' }} control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableEmpNo} {...field} value={field.value ?? ''} />
                                        )} />
                                        <small className="block">Giá trị này phải nhập dạng số, bao gồm 8 ký tự.</small>
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Mã nhân viên</h6>
                                        <Controller placeholder="Mã nhân viên" name="UIDAI" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableEmpNo} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                        <small className="block">Giá trị này phải nhập dạng số, bao gồm 8 ký tự.</small>
                                    </div>
                            }
                            {
                                enableDateOfBirth == true ?
                                    <div className="col-4">
                                        <h6>Ngày sinh</h6>
                                        <Controller placeholder="Ngày sinh" name="FullDateOfBirth" control={control} render={({ field }) => (
                                            <Calendar
                                                showButtonBar={true}
                                                dateFormat="dd/mm/yy"
                                                {...field}
                                                id="FullDateOfBirth"
                                                value={dayjs(convertTwo(field.value)).$d ?? null}
                                                onChange={(e) => {
                                                    field.onChange(convert(e.value) ?? '');
                                                }}
                                                mask="99/99/9999"
                                                showIcon
                                                disabled={!enableDateOfBirth}
                                            />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Ngày sinh</h6>
                                        <Controller placeholder="Ngày sinh" name="FullDateOfBirth" control={control} render={({ field }) => (
                                            <Calendar
                                                showButtonBar={true}
                                                dateFormat="dd/mm/yy"
                                                {...field}
                                                id="FullDateOfBirth"
                                                value={dayjs(convertTwo(field.value)).$d ?? null}
                                                onChange={(e) => {
                                                    field.onChange(convert(e.value) ?? '');
                                                }}
                                                mask="99/99/9999"
                                                showIcon
                                                disabled={!enableDateOfBirth}
                                                style={{ backgroundColor: 'grey', color: 'white' }}
                                            />
                                        )} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            {
                                enableGender == true ?
                                    <div className="col-4">
                                        <h6>Giới tính</h6>
                                        <Controller placeholder="Chọn giới tính" name="Gender" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field }) => (
                                            <Dropdown disabled={!enableGender} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objGender} optionLabel="mstrText" optionValue='mstrValue' />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Giới tính</h6>
                                        <Controller placeholder="Chọn giới tính" name="Gender" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableGender} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objGender} optionLabel="mstrText" optionValue='mstrValue' style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            <div className="col-4">
                                <h6>Múi giờ</h6>
                                <Controller placeholder="Chọn múi giờ" name="TimeZoneValue" control={control} rules={{ required: 'Vui lòng nhập!' }} render={({ field }) => (
                                    <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objTimeZone} optionLabel="mstrText" optionValue='mstrValue' />
                                )} />
                                <small className="block">Vui lòng đăng nhập lại để áp dụng các thay đổi múi giờ.</small>
                            </div>
                        </div>
                        <label>Thông tin liên lạc</label>
                        <div className="row">
                            {
                                enableEmail == true ?
                                    <div className="col-4">
                                        <h6>Email <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Email" name="UserEmail"
                                            rules={{
                                                required: 'Vui lòng nhập!',
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Email chưa đúng định dạng!',
                                                },
                                            }}
                                            control={control} render={({ field, fieldState }) => (
                                                <InputText disabled={!enableEmail} {...field} type="email" value={field.value ?? ''} />
                                            )} />
                                        {getFormErrorMessage('UserEmail', errors)}
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Email <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Email" name="UserEmail" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableEmail} {...field} type="email" value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enablePhone == true ?
                                    <div className="col-4">
                                        <h6>Số điện thoại di động <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Số điện thoại di động" name="MobileNumber"
                                            rules={{
                                                required: 'Vui lòng nhập!',
                                                minLength: {
                                                    value: 10,
                                                    message: "Số điện thoại chưa đúng định dạng!"
                                                }
                                            }}
                                            control={control} render={({ field, fieldState }) => (
                                                <InputText disabled={!enablePhone} {...field} type="number" value={field.value ?? ''} />
                                            )} />
                                        {getFormErrorMessage('MobileNumber', errors)}
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Số điện thoại di động <a style={{ color: 'red' }}>*</a></h6>
                                        <Controller placeholder="Số điện thoại di động" name="MobileNumber" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enablePhone} {...field} type="number" value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableOfficeNo == true ?
                                    <div className="col-4">
                                        <h6>Số điện thoại văn phòng</h6>
                                        <Controller placeholder="Số điện thoại văn phòng" name="OfficeNumber"
                                            rules={{
                                                required: 'Vui lòng nhập!',
                                                minLength: {
                                                    value: 10,
                                                    message: "Số điện thoại chưa đúng định dạng!"
                                                }
                                            }}
                                            control={control} render={({ field, fieldState }) => (
                                                <InputText disabled={!enableOfficeNo} type="number" {...field} value={field.value ?? ''} />
                                            )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Số điện thoại văn phòng</h6>
                                        <Controller placeholder="Số điện thoại văn phòng" name="OfficeNumber" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableOfficeNo} type="number" {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                        </div>
                        <label>Vai trò</label>
                        <div className="row">
                            <div className="col-4">
                                <h6>Vai trò chính</h6>
                                {primaryRole}
                            </div>
                            <div className="col-4">
                                <h6>Vai trò phụ</h6>
                                {secondaryRole}
                            </div>
                        </div>
                        <label>Thông tin thêm</label>
                        <div className="row">
                            {additionalInfo()}
                        </div>
                    </div>
                    <div className="p-fluid container">
                        <h5>HỒ SƠ CÔNG VIỆC</h5>
                        <div className="row">
                            {
                                enableEmpNo == true ?
                                    <div className="col-4">
                                        <h6>Số nhân viên</h6>
                                        <Controller placeholder="Số nhân viên" name="StaffId" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableEmpNo} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Số nhân viên</h6>
                                        <Controller placeholder="Số nhân viên" name="StaffId" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableEmpNo} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableStartingDate == true ?
                                    <div className="col-4">
                                        <h6>Ngày bắt đầu làm việc</h6>
                                        <Controller placeholder="Ngày bắt đầu" name="SDate" control={control} render={({ field }) => (
                                            <Calendar
                                                showButtonBar={true}
                                                dateFormat="dd/mm/yy"
                                                {...field}
                                                id="SDate"
                                                value={dayjs(field.value).$d ?? null}
                                                onChange={(e) => {
                                                    field.onChange(e.value?.toLocaleDateString().slice(0, 10) ?? '');
                                                    console.log(e.value?.toLocaleDateString().slice(0, 10))
                                                }}
                                                mask="99/99/9999"
                                                showIcon
                                                disabled={!enableStartingDate}
                                            />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Ngày bắt đầu làm việc</h6>
                                        <Controller style={{ backgroundColor: 'grey', color: 'white' }} placeholder="Ngày bắt đầu" name="SDate" control={control} render={({ field }) => (
                                            <Calendar
                                                showButtonBar={true}
                                                dateFormat="dd/mm/yy"
                                                {...field}
                                                id="SDate"
                                                value={dayjs(field.value).$d ?? null}
                                                onChange={(e) => {
                                                    field.onChange(e.value?.toLocaleDateString().slice(0, 10) ?? '');
                                                    console.log(e.value?.toLocaleDateString().slice(0, 10))
                                                }}
                                                mask="99/99/9999"
                                                showIcon
                                                disabled={!enableStartingDate}
                                                style={{ backgroundColor: 'grey', color: 'white' }}
                                            />
                                        )} />
                                    </div>
                            }
                            {
                                enableLeavingDate == true ?
                                    <div className="col-4">
                                        <h6>Ngày nghỉ việc</h6>
                                        <Controller placeholder="Ngày kết thúc" name="LeavingDate" control={control} render={({ field }) => (
                                            <Calendar
                                                showButtonBar={true}
                                                dateFormat="dd/mm/yy"
                                                {...field}
                                                id="LeavingDate"
                                                value={parse(field.value, 'dd/MM/yyyy', new Date()) ?? null}
                                                onChange={(e) => {
                                                    field.onChange(e.value?.toLocaleDateString().slice(0, 10) ?? '');
                                                    console.log(e.value?.toLocaleDateString().slice(0, 10))
                                                }}
                                                mask="99/99/9999"
                                                showIcon
                                                disabled={!enableLeavingDate}
                                            />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Ngày nghỉ việc</h6>
                                        <Controller placeholder="Ngày kết thúc" name="LeavingDate" control={control} render={({ field }) => (
                                            <Calendar
                                                showButtonBar={true}
                                                dateFormat="dd/mm/yy"
                                                {...field}
                                                id="LeavingDate"
                                                value={parse(field.value, 'dd/MM/yyyy', new Date()) ?? null}
                                                onChange={(e) => {
                                                    field.onChange(e.value?.toLocaleDateString().slice(0, 10) ?? '');
                                                    console.log(e.value?.toLocaleDateString().slice(0, 10))
                                                }}
                                                mask="99/99/9999"
                                                showIcon
                                                disabled={!enableLeavingDate}
                                                style={{ backgroundColor: 'grey', color: 'grey' }}
                                            />
                                        )} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h6>Cơ quan báo cáo</h6>
                                <Controller
                                    rules={{ required: 'Vui lòng nhập!' }}
                                    render={({ field }) => <>
                                        <RadioButton
                                            disabled={!enableIsAuthority}
                                            id="auth1" defaultValue={field.value ?? ''} value="1" onChange={(e) => {
                                                setValue("IsReportingAuthority", e.value);
                                                field.onChange(e.value);
                                            }} checked={watch("IsReportingAuthority") == "1"} />
                                        <label htmlFor="auth1">Có</label>
                                        <RadioButton
                                            disabled={!enableIsAuthority}
                                            id="auth2" defaultValue={field.value ?? ''} style={{ marginLeft: '15px' }} value="0" onChange={(e) => {
                                                setValue("IsReportingAuthority", e.value);
                                                field.onChange(e.value);
                                            }} checked={watch("IsReportingAuthority") == "0"} />
                                        <label htmlFor="auth2">Không</label>
                                    </>}
                                    name="IsReportingAuthority"
                                    control={control} />
                            </div>
                            {
                                enableAuthority == true ?
                                    <div className="col-4">
                                        <h6>Cơ quan báo cáo</h6>
                                        <Controller name="ReportingAuthority" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableAuthority} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objReportingAuthority} optionLabel="mstrText" optionValue='mstrValue' />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Cơ quan báo cáo</h6>
                                        <Controller name="ReportingAuthority" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableAuthority} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objReportingAuthority} optionLabel="mstrText" optionValue='mstrValue' style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <h6>Chức vụ</h6>
                                <Controller placeholder="Chức vụ" name="JobTitle" control={control} render={({ field, fieldState }) => (
                                    <InputText disabled={!enableJobTitle} {...field} value={field.value ?? ''} />
                                )} />
                            </div>
                        </div>
                    </div>
                    <div className="p-fluid container">
                        <h5>THÔNG TIN KHÁC</h5>
                        <div className="row">
                            {
                                enableHouseNumber == true ?
                                    <div className="col-4">
                                        <h6>Số nhà</h6>
                                        <Controller placeholder="Số nhà" name="HouseNumber" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableHouseNumber} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Số nhà</h6>
                                        <Controller placeholder="Số nhà" name="HouseNumber" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableHouseNumber} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableStreet == true ?
                                    <div className="col-4">
                                        <h6>Đường</h6>
                                        <Controller placeholder="Đường" name="StreetBlock" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableStreet} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Đường</h6>
                                        <Controller placeholder="Đường" name="StreetBlock" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableStreet} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableLocality == true ?
                                    <div className="col-4">
                                        <h6>Địa phương</h6>
                                        <Controller placeholder="Địa phương" name="Locality" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableLocality} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Địa phương</h6>
                                        <Controller placeholder="Địa phương" name="Locality" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableLocality} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            {
                                enableCity == true ?
                                    <div className="col-4">
                                        <h6>Thành phố</h6>
                                        <Controller placeholder="Thành phố" name="City" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableCity} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Thành phố</h6>
                                        <Controller placeholder="Thành phố" name="City" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableCity} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableState == true ?
                                    <div className="col-4">
                                        <h6>Bang/Vùng miền/Quốc gia</h6>
                                        <Controller placeholder="Bang/Vùng miền/Quốc gia" name="State" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableState} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Bang/Vùng miền/Quốc gia</h6>
                                        <Controller placeholder="Bang/Vùng miền/Quốc gia" name="State" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableState} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                            {
                                enableZipCode == true ?
                                    <div className="col-4">
                                        <h6>Mã bưu điện</h6>
                                        <Controller placeholder="Mã bưu điện" name="ZipCode" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableZipCode} {...field} value={field.value ?? ''} />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Mã bưu điện</h6>
                                        <Controller placeholder="Mã bưu điện" name="ZipCode" control={control} render={({ field, fieldState }) => (
                                            <InputText disabled={!enableZipCode} {...field} value={field.value ?? ''} style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            {
                                enableCountry == true ?
                                    <div className="col-4">
                                        <h6>Quốc gia</h6>
                                        <Controller placeholder="Quốc gia" name="Country" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableCountry} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objCountries} optionLabel="mstrText" optionValue='mstrValue' />
                                        )} />
                                    </div>
                                    :
                                    <div className="col-4">
                                        <h6>Quốc gia</h6>
                                        <Controller placeholder="Quốc gia" name="Country" control={control} render={({ field }) => (
                                            <Dropdown disabled={!enableCountry} id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={objCountries} optionLabel="mstrText" optionValue='mstrValue' style={{ backgroundColor: 'grey', color: 'white' }} />
                                        )} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            {/* <div className="col-2">
                                <Button className="btn btn-primary" onClick={() => handleSubmitSave()} style={{ cursor: "pointer" }}>Lưu thay đổi</Button>
                                <Toast ref={toast} />
                            </div> */}
                            {/*<div className="col-3">
                                <a className="btn btn-primary" onClick={() => toExamDetail()}>Xuất thông tin của tôi</a>
                            </div>*/}
                            <div className="col-2">
                                <a className="btn btn-primary" style={{ opacity: '0.5', cursor: 'default' }}>Lưu thay đổi</a>
                                <Toast ref={toast} />
                            </div>
                            <div className="col-3">
                                <a style={{ opacity: '0.5', cursor: 'default' }} className="btn btn-primary" >Xuất thông tin của tôi</a>
                            </div>
                        </div>
                    </div >
                </form>
            </Card>
        </>
    )
}
export default InfoLayout;