// import '../../index.css';
import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Card } from 'primereact/card';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { videoService } from "services/videoService";
import PropTypes from 'prop-types';
const MyUploadForm = (props) => {
    const onScreenData = useRef(null);
    const [highlight, sethighlight] = useState([0])
    const [visible, setvisible] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [videoHighLightCollection, setvideoHighLightCollection] = useState([])
    const [videoMinuteCollection, setvideoMinuteCollection] = useState([])
    const [videoSecondCollection, setvideoSecondCollection] = useState([])
    const [formFileVideo, setformFileVideo] = useState({});
    const [channel, setChannel] = useState([])
    const [videodetail, setvideodetail] = useState([])
    const [filedetail, setfiledetail] = useState([])
    const paramsChannel = {
        "PageNumber": 1,
        "RecordsPerPage": 10,
        SortBy: "RECENT",
    }
    const paramsvideo = {
        AllowFileSize
            :
            "1073741824",
        AllowedFileTypes
            :
            "VIDEOLIBRARY",
        FileId
            :
            1,
        FileLabel
            :
            ""
    }
    const paramsFile = {
        AllowFileSize
            :
            "1073741824",
        AllowedFileTypes
            :
            "TRANSCRIPT",
        FileId
            :
            2,
        FileLabel
            :
            ""
    }
    // const countryservice = new CountryService();
    const defaultValues = {
        VideoTitle: '',
        VideoDescription: '',
        Keywords: '',
        ChannelId: null,
    }
    useEffect(() => {
        if (props.openform) {
            setvisible(props.openform || false)
            loadApi()
        }

    }, [props.openform]);
    // useEffect(() => {
    //     console.log('useEffect',highlight)
    //     sethighlight(highlight)
    // }, [addInputHighlight]);
    const loadApi = async () => {
        //
        let result = await videoService.getavailablechannellist(paramsChannel);
        let result3 = await videoService.getchannellist(paramsChannel);
        let result1 = await videoService.getfilecontroldetails(paramsvideo);
        let result2 = await videoService.getfilecontroldetails(paramsFile);
        setvideodetail(result1.data)
        setfiledetail(result2.data)
        setChannel(result3.data?.channelLst)
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error">{errors[fieldName].message}</small>
    };
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append("uploadFile", formFileVideo);
        formData.append("CorporateID", '1');
        formData.append('Culture', 'vi-VN');
        formData.append('AllowFileType', videodetail?.AllowedDisplayFileTypes);
        // const fileAllow = ['docx', 'doc', 'xls', 'xlsx', 'jpg', 'ipeg', 'png', 'icon', 'pdf', 'mp4'];
        let file = formFileVideo;
        let fileextend = file.name.split('.').pop();
        // console.log(fileextend);

        if (fileextend !== "png" && fileextend !== "jpg" && fileextend !== "gif" && fileextend !== "jpeg" && fileextend !== "bmp" &&
            fileextend !== "doc" && fileextend !== "docx" && fileextend !== "ppt" && fileextend !== "pptx" && fileextend !== "xls" && fileextend !== "xlsx" && fileextend !== "pdf" && fileextend !== "txt" &&
            fileextend !== "mp4" && fileextend !== "mp3" &&
            fileextend !== "zip") {
            window.alert("File is not supported. You must choose correct file type.");
            return false;
        } else if (file.size > 1000000000) {
            window.alert("Please upload a file smaller than 1024 MB");
            return false;
        } else {
            let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            let strvideoHighLightCollection = videoHighLightCollection.toString()
            let strvideoMinuteCollection = videoMinuteCollection.toString()
            let strvideoSecondCollection = videoSecondCollection.toString()
            let bodySumbit = { ...data, ...{ FilePath: result.data.SaveFilePath, VideoHighLightCollection: strvideoHighLightCollection, VideoMinuteCollection: strvideoMinuteCollection, VideoSecondCollection: strvideoSecondCollection } };
            bodySumbit.ChannelId = data.ChannelId.ChannelId;
            // bodySumbit.HomeworkAnswerFilePath = result.data.SaveFilePath;
            // bodySumbit.HomeworkRemarks = data.txtRemarks;
            await videoService.addvideosbylearner(bodySumbit);
            setvisible(false)
            props.onChange(false)
            //showBottomRight();
        }
        reset()
    };
    const closevisible = () => {
        setvisible(false)
        props.onChange(false)
    }
    const deleteHighlight = (index) => {
        highlight.splice(index, 1)
        let temp = [...highlight]
        sethighlight(temp)

    }
    const videoHighLight = (value, index) => {
        videoHighLightCollection.splice(index, 1)
        videoHighLightCollection.push(value)
        let temp = [...videoHighLightCollection];
        setvideoHighLightCollection(temp);
    }
    const videoMinute = (value, index) => {
        videoMinuteCollection.splice(index, 1)
        videoMinuteCollection.push(value)
        let temp = [...videoMinuteCollection];
        setvideoMinuteCollection(temp);
    }
    const videoSecond = (value, index) => {
        videoSecondCollection.splice(index, 1)
        videoSecondCollection.push(value)
        let temp = [...videoSecondCollection];
        setvideoSecondCollection(temp);
    }
    const renderHighlight = (value) => {
        return (
            highlight?.map((dataItem, index) => {
                return (
                    <>
                        <div key={index} className='d-flex flex-row'>
                            <div className='col-2'>
                                <label>&nbsp;</label>
                            </div>
                            <div className='col-4 d-flex flex-column'>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name={'VideoHighLightCollection' + index} control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} value='' {...field} onChange={e => videoHighLight(e.target.value, index)} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                    </span>
                                </div>
                            </div>

                            <div className='col-2 d-flex flex-column'>
                                <div className="field d-flex flex-row">
                                    <span className="p-float-label">
                                        <Controller name={'VideoMinuteCollection' + index} control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} onChange={e => videoMinute(e.target.value, index)} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                    </span>
                                    <span className='d-flex align-self-center' style={{ paddingLeft: '0.5rem' }} >Phút</span>
                                </div>
                            </div>
                            <div className='col-2 d-flex flex-column'>
                                <div className="field d-flex flex-row">
                                    <span className="p-float-label">
                                        <Controller name={'VideoSecondCollection' + index} control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} onChange={e => videoSecond(e.target.value, index)} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                    </span>
                                    <span className='d-flex align-self-center' style={{ paddingLeft: '0.5rem' }} >Giây</span>
                                </div>
                            </div>

                            <div className='col-2 d-flex flex-column'>
                                {index == 0 ? <label><FaPlusSquare onClick={() => addInputHighlight()} /></label> : <label><FaMinusSquare onClick={() => deleteHighlight(index)} /></label>}
                            </div>
                        </div>
                    </>
                )
            })
        )
    }
    const addInputHighlight = () => {
        debugger;
        highlight.push(highlight.length)
        //let temp = [...highlight, 'H'];
        let temp = [...highlight];
        sethighlight(temp);
        //renderHighlight(highlight)
    }

    const closeForm = () => {
        setvisible(false)
        props.onChange(false)
    }
    return (
        <>
            <Dialog header="Thêm video" visible={visible} style={{ width: '50vw', height: "100vh" }} onHide={() => closevisible()}>
                <div style={{ height: "100%", overflow: 'auto' }}>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Tiêu đề video <label className='text-danger'>*</label></label>
                            </div>
                            <div className="col-10 field">
                                <span className="p-float-label">
                                    <Controller name="VideoTitle" placeholder="Nhập tên Video" control={control} rules={{ required: 'Tiêu đề video không được để trống' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus value={field.value ?? ''} />
                                    )} />

                                </span>
                                {getFormErrorMessage('VideoTitle', errors)}
                            </div>
                        </div>

                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Mô tả </label>
                            </div>
                            <div className="col-10 field">
                                <span className="p-float-label">
                                    <Controller name="VideoDescription" control={control} render={({ field, fieldState }) => (
                                        <InputTextarea id={field.name} {...field} autoFocus className={classNames({ 'p-invalid r-3': fieldState.invalid })} autoResize style={{ minHeight: '5rem' }} />
                                    )} />

                                </span>

                            </div>
                        </div>

                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Kênh<label className='text-danger'>*</label></label>
                            </div>
                            <div className="col-10 field">
                                <span className="p-float-label">
                                    <Controller name="ChannelId" control={control} rules={{ required: 'Kênh không được để trống' }} render={({ field, fieldState }) => (
                                        <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={channel} optionLabel="ChannelTitle" />
                                    )} />
                                    {/* <label htmlFor="channel" className={classNames({ 'p-error': !!errors.channel })}>Chọn kênh</label> */}
                                </span>
                                {getFormErrorMessage('ChannelId', errors)}
                            </div>
                        </div>

                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Từ khóa </label>
                            </div>
                            <div className="col-10 field">
                                <span className="p-float-label">
                                    <Controller name="Keywords" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="Keywords" className={classNames({ 'p-error': !!errors.Keywords })}>Nhập văn bản để nhận đề xuất từ khóa</label>
                                </span>
                                {getFormErrorMessage('Keywords')}
                            </div>
                        </div>

                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Đính kèm video <label className='text-danger'>*</label></label>
                            </div>
                            <div className="col-5 mb-3 mr-3">
                                <label for="formVideo" className="form-label">{videodetail?.FileLabel}</label>
                                <input onChange={(e) => setformFileVideo(e.target.files[0])} className="form-control" type="file" />
                            </div>
                            <div style={{ float: 'left', fontSize: '12px' }}>
                                <span>Chú ý:</span><br /><span>- Kích thước tệp tối đa tải lên là 1024 MB</span><br /><span>- Các định dạng tệp được phép là: {videodetail?.AllowedDisplayFileTypes}</span>
                            </div>
                        </div>

                        <div className='d-flex flex-row'>
                            <div className='col-2'>
                                <label>Điểm nổi bật </label>
                            </div>
                            <div className='col-4 d-flex flex-column'>
                                <label>Văn bản nổi bật</label>
                            </div>

                            <div className='col-2 d-flex flex-column'>
                                <label>Thời lượng</label>
                            </div>
                            <div className='col-2 d-flex flex-column'>
                                <label>&nbsp;</label>
                            </div>

                            <div className='col-2 d-flex flex-column'>


                                {/* <label style={{ paddingTop: '3rem' }}><FaMinusSquare /></label> */}

                            </div>
                        </div>
                        {renderHighlight(highlight)}


                        <div className='d-flex flex-row'>
                            <div className='col-2'>
                                <label>Tệp đính kèm (Tệp SRT)</label>
                            </div>
                            <div className="col-5 mb-3 mr-3">
                                <label htmlFor="formFile" className="form-label">{filedetail?.FileLabel}</label>
                                <input className="form-control" type="file" id="formFile" />
                            </div>
                            <div style={{ float: 'left', fontSize: '12px' }}>
                                <span>Chú ý:</span><br /><span>- Kích thước tệp tối đa tải lên là 1024 MB</span><br /><span>- Các định dạng tệp được phép là: {filedetail?.AllowedDisplayFileTypes}</span>
                            </div>
                        </div>
                        <div className='mt-5 d-flex justify-content-end'>
                            <button style={{ minWidth: '7rem' }} type="submit" className="btn btn-primary mr-3" label="Submit">Lưu</button>
                            <button style={{ minWidth: '7rem' }} onClick={() => closeForm()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>

    )
}
MyUploadForm.propTypes = {
    onChange: PropTypes.func
};
MyUploadForm.defaultProps = {
    onChange: () => { }
}

export default MyUploadForm;