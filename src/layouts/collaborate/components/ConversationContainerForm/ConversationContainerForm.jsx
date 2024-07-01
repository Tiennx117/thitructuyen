import { Card } from "primereact/card";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './conversationContainerForm.scss'
import { InputTextarea } from 'primereact/inputtextarea';
import FileUpload from "../FileUpload/FileUpload";
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { conversationService } from 'services/conversationService';
import { overViewService } from 'services/overViewService';
import axios from 'axios';

export default function ConversationContainerForm(props) {
    const [checkImg, setcheckImg] = useState(true);
    const { onShow, onHiden, idConversation } = props;
    const [taiLenImg, settaiLenImg] = useState([]);
    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const [getFileImg, setgetFileImg] = useState([]);
    const changChuDe = (value) => {
        let val = value.trim();
        setValue('topicTitle', val)
    }
    const changMoTa = (value) => {
        let val = value.trim();
        setValue('topicDesc', val)
    }
    const onChangeImg = async (e) => {
        const file = e.target.files[0];
        let name = file.name;
        let a = name.split('.');
        let val = a[1];
        if (val != 'jpeg' && val != 'jpg' && val != 'gif' && val != 'png' && val != 'bmp') {
            alert('Ảnh không được hỗ trợ. \nVui lòng chọn ảnh khác.')
            setcheckImg(false)
        }
        else {
            let formData = new FormData();
            formData.append("uploadFile", file);
            formData.append("CorporateID", '1');
            formData.append('Culture', 'vi-VN');
            formData.append('AllowFileType', 'HÌNH ẢNH:jpeg, jpg, gif, png, bmp');

            let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setcheckImg(true)
            settaiLenImg(result)
        }
    }
    const loadApi = async () => {
        let result1 = await overViewService.getfileimgcontroldetails();
        setgetFileImg(result1.data)
    }
    useEffect(() => {
        loadApi();

    }, []);
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    const onSubmit = async (dataSub) => {
        dataSub.conversationId = idConversation;
        if (taiLenImg.data) {
            dataSub.TopicImagePath = taiLenImg.data.SaveFilePath;
        }
        if (checkImg == false) {
            alert('Vui lòng chọn đúng định dạng ảnh')
        }
        if (checkImg == true) {
            await conversationService.addtopic(dataSub);
            reset();
            onHiden();
        }
    };
    const close = () => {
        reset();
        onHiden()
    }
    return (
        <>
            <Dialog header='Thêm mới cuộc trò chuyện' className="form-chude" visible={onShow} onHide={close} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="mt-4">Chủ đề <span style={{ color: 'red' }}>*</span></h5>

                    <Controller name="topicTitle" control={control} rules={{ required: 'Không được để trống' }} render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} style={{ width: '100%' }} />
                    )} />
                    {getFormErrorMessage('topicTitle', errors)}
                    <h5 className="mt-4">Mô tả <span style={{ color: 'red' }}>*</span></h5>

                    <Controller name="topicDesc" control={control} rules={{ required: 'Không được để trống' }} render={({ field, fieldState }) => (
                        <InputTextarea id={field.name} {...field} value={field.value ?? ''} style={{ width: '100%' }} />
                    )} />
                    {getFormErrorMessage('topicDesc', errors)}
                    <div style={{ marginTop: '20px' }}>
                        <h5>{getFileImg.FileLabel}</h5>
                        <div className="mb-3">
                            <input accept="image/*" name='InlineFilePath' className="form-control" type="file" onChange={onChangeImg} />
                        </div>
                        <div style={{ backgroundColor: "#3333", marginTop: "6px", height: "20px", width: "100%" }}></div>
                        <div>Ghi chú: </div>
                        <div>-Kích thước tệp tối đa tải lên là {getFileImg.AllowFileSize} MB</div>
                        <div>-Các định dạng tệp được phép là:</div>
                        <div dangerouslySetInnerHTML={{ __html: getFileImg.AllowedDisplayFileTypes }}></div>
                    </div>
                    <button type="button" className="btn-tacvu btn btn-secondary" onClick={() => close()}>HỦY BỎ</button>
                    <button type="submit" className="btn-tacvu btn btn-primary mr-3">LƯU</button>
                </form>
            </Dialog>
        </>
    )
}