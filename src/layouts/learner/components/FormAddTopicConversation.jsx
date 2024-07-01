
import './style/formAddTopicConversation.scss';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'components/Image';
import { useState, useEffect, useRef } from 'react';
import { conversationService } from 'services/conversationService';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const FormAddTopicConversation = (props) => {

    useEffect(() => {
        loadApi();
    }, []);

    const loadApi = async () => {
        const params = {
            "AllowedFileTypes": "IMAGE",
            "FileLabel": "Đính kèm hình ảnh chủ đề",
        }

        let result = await conversationService.getfilecontroldetails(params);
        // setDataNode(result.data);
        // setValue('txtRemarks', result.data.HomeworkRemarks);
        // setValue('formFile', result.data.HomeworkAnswerFilePath);
        // console.log('formFile', result.data.HomeworkAnswerFilePath);
        // const paramsUpload = {
        //     "AllowedFileTypes": "DOCUMENT|IMAGE|ZIP|VIDEO|AUDIO",
        //     "FileLabel": "rbkey_AnswrFlUpldLBL",
        //     "id": "1",
        // }
        // let uploadRequired = await learningService.getfilecontroldetails(paramsUpload);
        // setRequiredUpload(uploadRequired.data);

    }

    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const onSubmit = async (data) => {

        if (data.formFile[0]) {
            let formData = new FormData();
            formData.append("uploadFile", data.formFile[0]);
            formData.append("CorporateID", '1');
            formData.append('Culture', 'vi-VN');
            formData.append('AllowFileType', 'IMAGE:jpeg, jpg, gif, png, bmp');



            let file = data.formFile[0];
            let fileextend = file.name.split('.').pop();

            if (fileextend !== "png" && fileextend !== "jpg" && fileextend !== "gif" && fileextend !== "jpeg" && fileextend !== "bmp") {
                window.alert("File không được hỗ trợ. Bạn phải chọn đúng định dạng file.");

            } else if (file.size > 1.024e+9) {
                window.alert("Vui lòng tải lên file có dung lượng nhỏ hơn 1024 MB.");

            } else {

                let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                // console.log(result);

                let bodySumbit = {
                    "conversationId": props.conversationID,
                    "topicTitle": data.topicTitle,
                    "topicDesc": data.topicDesc,
                    "TopicImagePath": result.data.SaveFilePath,
                };
                await conversationService.addtopic(bodySumbit);
                // showBottomRight();
                loadApi();
                reset();
                props.onCloseForm();
            }
        } else {
            let bodySumbit = {
                "conversationId": props.conversationID,
                "topicTitle": data.topicTitle,
                "topicDesc": data.topicDesc,
                "TopicImagePath": "",
            };
            await conversationService.addtopic(bodySumbit);
            // showBottomRight();
            loadApi();
            reset();
            props.onCloseForm();
        }


    };

    const toastBR = useRef(null);
    const showBottomRight = () => {
        toastBR.current.show({ severity: 'success', summary: 'e.eps.lms.com thông báo', detail: 'Thêm chủ đề thành công', life: 3000 });
    }

    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };

    return (
        <>
            <Toast ref={toastBR} position="bottom-right" />
            <div className="conversation-editer animated fadeInUpBig show" id="">
                <div className="conversation-editer-inner">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="">
                        <div className="topic-form">
                            <div className="topic-title">
                                {/* <input autofocus id="topicTitle" maxLength={100} name="topicTitle"  required type="text" placeholder="Nhập tên chủ đề của bạn ở đây *" className="ng-pristine ng-invalid ng-touched" />
                                <div >
                                    <label className="validateTopic" id="lblTopicTitle">Vui lòng nhập tiêu đề chủ đề.</label>
                                </div> */}

                                <span >
                                    <Controller name="topicTitle" control={control} rules={{ required: 'Tên chủ đề không được để trống' }} render={({ field, fieldState }) => (
                                        <InputText className='inputTextTitle ' autoFocus id={field.name} {...field} maxLength={250} rows={1} placeholder="Nhập tên chủ đề của bạn ở đây *" />
                                    )} />
                                </span>
                                {getFormErrorMessage('topicTitle', errors)}


                            </div>
                        </div>
                        <div className="topic-form">
                            <span >
                                <Controller name="topicDesc" control={control} rules={{ required: 'Mô tả không được để trống' }} render={({ field, fieldState }) => (
                                    <InputTextarea className="form-control wysiwyg   border-secondary" autoFocus id={field.name} {...field} maxLength={250} style={{ height: '350px', maxHeight: '350px', marginBottom: '15px' }} placeholder="Thêm mô tả *" defaultValue={""} />

                                )} />
                            </span>
                            {getFormErrorMessage('topicDesc', errors)}
                        </div>

                        <div className="topic-form">
                            <div className="ec-attach-file">
                                <div className="mb-3">
                                    <label for="formFile" className="form-label" style={{ fontSize: '13px', fontWeight: "bold" }}>Tải lên</label>
                                    <input id="formFile" name='formFile' className="form-control" type="file"
                                        {...register("formFile", {
                                            required: false,
                                            // validate: {
                                            //     acceptedFormats: (filet) => {
                                            //         console.log('9999', filet);
                                            //         return true;
                                            //     }
                                            // }
                                        })}

                                    />
                                    {errors.formFile && errors.formFile.type === "required" && (
                                        <small className="p-error" style={{ float: 'left' }}>Vui lòng chọn file đính kèm!</small>
                                    )}
                                </div>

                                <div className="assignment-attach-file-note">
                                    Ghi chú: <br />
                                    -Kích thước tệp tối đa tải lên là&nbsp;1024 MB<br />
                                    - Các định dạng tệp được phép là:<br />
                                    <div className="span-filetype">HÌNH ẢNH:jpeg, jpg, gif, png, bmp</div>
                                    <br />
                                </div>

                            </div>
                        </div>
                        <div className="ce-bottom-buttons">
                            <button href="javascript:void(0);" id="AddTopic" className="ce-cancel-btn disabled" type='submit'>Gửi chủ đề</button>
                            <a className="ce-cancel-btn" href="javascript:void(0);" onClick={() => props.onCloseForm()}>Huỷ bỏ</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
FormAddTopicConversation.propTypes = {
    conversationID: PropTypes.number,
    onCloseForm: PropTypes.func,
};
FormAddTopicConversation.defaultProps = {
    onCloseForm: () => { }
}
export { FormAddTopicConversation }