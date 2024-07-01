
import './style/formHomeWork.scss';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'components/Image';
import { useState, useEffect, useRef } from 'react';
import { learningService } from 'services/learningService';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const FormHomeWorkContainer = (props) => {
    const [dataNode, setDataNode] = useState([]);
    const [requiredUpload, setRequiredUpload] = useState([]);

    useEffect(() => {
        if (props.nodeID) {
            loadApi();
        }
    }, [props.nodeID]);

    const loadApi = async () => {
        const params = {
            "CourseID": props.courseID,
            "nodeID": props.nodeID,
            "CourseName": props.courseName,
        }
        let result = await learningService.gethomeworkitemdetails(params);
        setDataNode(result.data);
        setValue('txtRemarks', result.data.HomeworkRemarks);
        // setValue('formFile', result.data.HomeworkAnswerFilePath);

        const paramsUpload = {
            "AllowedFileTypes": "DOCUMENT|IMAGE|ZIP|VIDEO|AUDIO",
            "FileLabel": "rbkey_AnswrFlUpldLBL",
            "id": "1",
        }
        let uploadRequired = await learningService.getfilecontroldetails(paramsUpload);
        setRequiredUpload(uploadRequired.data);
    }



    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    function checkRequiredFile() {
        if (dataNode.HomeworkAnswerFile != "") {
            // setValue('formFile', dataNode.HomeworkAnswerFile);
            return false;
        }
        else
            return true;
    }

    const onSubmit = async (data) => {
        //debugger
        if (!data.formFile || data.formFile.length == 0) { //ẩn uploadfile
            let bodySumbit = { ...dataNode };
            bodySumbit.HomeworkAnswerFile = dataNode.HomeworkAnswerFile ? dataNode.HomeworkAnswerFile : '';//ẩn uploadfile
            bodySumbit.HomeworkAnswerFilePath = dataNode.HomeworkAnswerFilePath ? dataNode.HomeworkAnswerFilePath : '';//ẩn uploadfile
            bodySumbit.HomeworkRemarks = data.txtRemarks;
            await learningService.savehomeworkitemdetails(bodySumbit);
            showBottomRight();
            props.returnToPrevDisplay();
            loadApi();
            reset();
        } else {
            let formData = new FormData();
            formData.append("uploadFile", data.formFile[0]);
            formData.append("CorporateID", '1');
            formData.append('Culture', 'vi-VN');
            // formData.append('AllowFileType', 'DOCUMENTS:doc, docx, ppt, pptx, xls, xlsx, txt, pdf,IMAGE:jpeg, jpg, gif, png, bmp,VIDEO:mp4,AUDIO:mp3,ZIP:zip');
            formData.append('AllowFileType', requiredUpload.AllowedFileTypes);

            let file = data.formFile[0];
            let fileextend = file.name.split('.').pop();

            //AllowedFileTypes: "doc, docx, ppt, pptx, xls, xlsx, txt, pdf, jpeg, jpg, gif, png, bmp, mp4, mp3, zip"
            let filetypes = requiredUpload.AllowedFileTypes.split(', ');

            if (!filetypes.includes(fileextend)) {
                // window.alert("File is not supported. You must choose correct file type.");
                window.alert("File không được hỗ trợ. Bạn phải chọn đúng định dạng file.");

            } else if (file.size > (requiredUpload.AllowFileSize * 1048576)) {
                // window.alert("Please upload a file smaller than" + requiredUpload.AllowFileSize + " MB");
                window.alert("Vui lòng tải lên file có dung lượng nhỏ hơn " + requiredUpload.AllowFileSize + " MB");

            } else {
                let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                let bodySumbit = { ...dataNode };
                bodySumbit.HomeworkAnswerFile = result.data.FileName;
                bodySumbit.HomeworkAnswerFilePath = result.data.SaveFilePath;
                bodySumbit.HomeworkRemarks = data.txtRemarks;
                await learningService.savehomeworkitemdetails(bodySumbit);
                showBottomRight();
                props.returnToPrevDisplay();
                loadApi();
                reset();
            }
            //reset(); để ở đây thay vì dòng 102 sẽ gây ra lỗi sau khi check validate file k hợp lệ, bấm gửi sẽ bắt nhập Nhận xét
        }


    };

    const toastBR = useRef(null);
    const showBottomRight = () => {
        toastBR.current.show({ severity: 'success', summary: 'e.eps.lms.com thông báo', detail: 'Gửi bài tập thành công', life: 3000 });
    }
    // const showBottomRightErr = () => {
    //     toastBR.current.show({ severity: 'error', summary: 'e.eps.lms.com thông báo', detail: 'Đã có lỗi xảy ra', life: 3000 });
    // }

    // function getBase64(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         console.log(reader.result);
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };

    return (
        <>
            <Toast ref={toastBR} position="bottom-right" />
            <div className="assignment-popup animated fadeInUpBig show" id="homeWork">
                <div className="assignment-header">
                    <a className="ah-left-img" href="javascript:void(0);">
                        <Image className="img-icon" style={{ width: '50px', height: '48px' }} src={dataNode.UserImagePath} alt="Hình ảnh khóa học bài tập về nhà" />
                        <span className="img-heading">{dataNode.NodeName}</span>
                    </a>

                </div>
                <div className="assignment-popup-inner">
                    <div style={{ display: 'none' }}>
                        <span >{dataNode.HomeworkName}</span>
                    </div>
                    <div className="assignment-node-list-section">
                        <ul className="an-list">
                            <li className='' style={{ width: '40%' }}>
                                <span className="n-name">Tên nội dung học</span>
                                <span className="n-name-subtitle">{dataNode.HomeworkName}</span>
                            </li>
                            <li className='' style={{ width: '60%' }}>
                                <span className="n-name">Người cố vấn</span>
                                <span className="n-name-subtitle">{dataNode.HomeworkMentorName}</span>

                            </li>
                        </ul>
                        <div className="assignment-disc-sec">
                            <span className="n-description">Sự miêu tả </span>
                            <span className="n-sub-description">{dataNode.HomeworkDescription}</span>
                        </div>
                    </div>
                    <div className="assignment-upload-section">

                        <div className="assignment-attach-file margin_bottom10;">
                            <label className="control-label margin_top12">Tệp bài tập</label>
                            <div className="uploaded-file">
                                <a className="uf-link" target="_blank" href={dataNode.HomeworkAssignmentFilePath}>
                                    <i className="fa-paperclip fa" /> {dataNode.HomeworkAssignmentFile}
                                </a>
                            </div>
                        </div>

                        {dataNode.HomeworkAnswerFile ?
                            <div className="assignment-attach-file margin_bottom10">
                                <label className="control-label margin_top12">Tệp trả lời </label>
                                <div className="uploaded-file">
                                    <a className="uf-link" id="answerFile" target="_blank" rel={dataNode.HomeworkAnswerFilePath} href={dataNode.HomeworkAnswerFilePath} >
                                        <i className="fa-paperclip fa" /> {dataNode.HomeworkAnswerFile}
                                    </a>
                                </div>
                            </div>
                            : ''
                        }

                        {(dataNode.HomeworkReattemptAllowed == false && dataNode.HomeworkStatus == "C") ?
                            <>
                                <div className="assignment-comment-box">
                                    <a className="assignment-left-img cursor-default" href="javascript:void(0);">
                                        <Image style={{ height: '100%' }} src={dataNode.UserImagePath} alt="" />
                                    </a>
                                    <div className="assignment-right-comment-box field">
                                        <InputTextarea className="comment-input" readOnly maxLength={250} name rows={1} placeholder="* Vui lòng nhập nhận xét. ">{dataNode.HomeworkRemarks}</InputTextarea>
                                    </div>
                                </div>

                            </> :
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* <div>
                                        <div className="assignment-attach-file">
                                            <div className="">
                                                <label for="formFile" className="form-label" style={{ fontSize: '13px', fontWeight: "bold" }}>{requiredUpload.FileLabel}</label>
                                                <input id="formFile" name='formFile' className="form-control" type="file"
                                                    {...register("formFile", {
                                                        required: checkRequiredFile(),
                                                       
                                                    })}

                                                />
                                                {errors.formFile && errors.formFile.type === "required" && (
                                                    <small className="p-error" style={{ float: 'left' }}>Vui lòng chọn file đính kèm!</small>
                                                )}
                                            </div>

                                            <div className="assignment-attach-file-note">
                                                <br />Ghi chú: <br />
                                                - Kích thước tệp tối đa tải lên là&nbsp;{requiredUpload.AllowFileSize} MB<br />
                                                - Các định dạng tệp được phép là:<br />
                                                <div className="span-filetype" dangerouslySetInnerHTML={{ __html: requiredUpload.AllowedDisplayFileTypes }}></div>
                                            </div>
                                        </div>
                                    </div> */}


                                    <div className="assignment-comment-box">
                                        <a className="assignment-left-img cursor-default" href="javascript:void(0);">
                                            <Image style={{ height: '100%' }} src={dataNode.UserImagePath} alt="" />
                                        </a>
                                        <div className="assignment-right-comment-box field">
                                            <span className="p-float-label">
                                                <Controller name="txtRemarks" control={control} rules={{ required: '* Nhận xét không được để trống' }} render={({ field, fieldState }) => (
                                                    <InputTextarea className="comment-input" id={field.name} {...field} maxLength={250} name rows={1} placeholder="* Vui lòng nhập nhận xét. " />
                                                )} />
                                            </span>
                                            {getFormErrorMessage('txtRemarks', errors)}

                                        </div>
                                    </div>
                                    <div className="assignment-bottom-buttons">
                                        <Button className="btn btn-primary mr-3" label={dataNode.HomeworkRemarks ? "Gửi lại bài tập" : "Nộp bài tập"} autoFocus type="submit" />
                                    </div>

                                </form>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
FormHomeWorkContainer.propTypes = {
    nodeID: PropTypes.number,
    courseID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    courseName: PropTypes.string,
};
// FormHomeWorkContainer.defaultProps = {
//     onLoadApiCmt: () => { },
// }
export { FormHomeWorkContainer }