import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import ReactPlayer from 'react-player'
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { videoService } from "services/videoService";
import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types';
import axios from 'axios';
const MyVideoDetail = (props) => {
    const [courseLauchID, setcourseLauchID] = useState(props.dataObj.dataItem.VideoId);
    const [dataDetai, setdataDetai] = useState(props.dataObj.dataItem)
    const [dataItem, setDataItem] = useState({});
    const [videodetail, setvideodetail] = useState([]);
    // const [highlight, sethighlight] = useState({
    //     Id: 0,
    //     HighLightText: '',
    //     Minutes: '',
    //     Seconds: ''
    // });
    const [highlight, sethighlight] = useState([]);
    const [filedetail, setfiledetail] = useState([])
    const [channel, setChannel] = useState([])
    const [dataHeight, setdataHeight] = useState(props.dataObj.dataHeight)
    const [videoHighLightCollection, setvideoHighLightCollection] = useState([])
    const [videoMinuteCollection, setvideoMinuteCollection] = useState([])
    const [videoSecondCollection, setvideoSecondCollection] = useState([]);
    const [taiLenFile, settaiLenFile] = useState([]);

    const [defaultValues, setdefaultValues] = useState({
        ChannelId: props.dataObj.dataItem.VideoChannelId,
        ChannelName: props.dataObj.dataItem.VideoChannelTitle,
        FilePath: "",
        Keywords: props.dataObj.dataItem.Keywords,
        TranscriptPath: "",
        VideoDescription: props.dataObj.dataItem.VideoDescription,
        VideoHighLightCollection: '',
        VideoId: props.dataObj.dataItem.VideoId,
        VideoMinuteCollection: '',
        VideoSecondCollection: '',
        VideoTitle: props.dataObj.dataItem.VideoTitle,
        //dataListInput: props.dataObj.dataHeight || []
        dataListInput: props.dataObj.dataHeight || [],

    })


    const [formFileVideo, setformFileVideo] = useState({});
    const { control, formState: { errors }, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name: "dataListInput",
    });
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error">{errors[fieldName].message}</small>
    };
    const loadApi = async () => {
        var obj = {
            CorporateID: 1,
            CorporateId: 1,
            IsViewCountDisable: true,
            PageNumber: 1,
            RecordsPerPage: 10,
            VideoChannelId: "null",
            videoId: courseLauchID
        }
        let result = await videoService.getvideosuploadbylearner(obj);
        setDataItem(result.data?.ChannelList[0]?.VideoDetailList[0])
    }
    const onChangeFile = async (e) => {
        const file = e.target.files[0];

        let formData = new FormData();
        formData.append("uploadFile", file);
        formData.append("CorporateID", '1');
        formData.append('Culture', 'vi-VN');
        formData.append('AllowFileType', 'doc, docx, ppt, pptx, xls, xlsx, txt, pdf,jpeg, jpg, gif, png, bmp,mp4,mp3,zip');

        let result = await axios.post('/AppService/api/FileUpload/UploadJsonFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        setValue('FilePath', result.data.SaveFilePath);
        setValue('TranscriptPath', result.data.TempPath);
        settaiLenFile(result.data)

    }

    const getFormErrorMessageArray = (index, fieldColumn) => {
        try {
            return errors['dataListTime'] && <small className="p-error">{errors['dataListTime'][index.toString()][fieldColumn]['message']}</small>
        }
        catch { }


    };

    const onSubmit = async (data) => {
        videoHighLight(data);
        videoMinute(data);
        videoSecond(data);
        data.Keywords = ',' + data.Keywords
        await videoService.editvideosbylearner(data);
        props.onChange();
    };

    const videoHighLight = (data) => {
        let stringvideoHigh = '';
        for (let i = 0; i < data.dataListInput.length; i++) {
            if (data.dataListInput[i].HighLightText != '')
                if (i == 0) {
                    stringvideoHigh += data.dataListInput[i].HighLightText
                }
                else {
                    stringvideoHigh += ',' + data.dataListInput[i].HighLightText
                }
        }
        data.VideoHighLightCollection = stringvideoHigh;
    }
    const videoMinute = (data) => {
        let stringvideoMinute = '';
        for (let i = 0; i < data.dataListInput.length; i++) {
            if (data.dataListInput[i].Minutes != '')
                if (i == 0) {
                    stringvideoMinute += data.dataListInput[i].Minutes
                }
                else {
                    stringvideoMinute += ',' + data.dataListInput[i].Minutes
                }
        }
        data.VideoMinuteCollection = stringvideoMinute;
    }
    const videoSecond = (data) => {
        let stringvideoSecond = '';
        for (let i = 0; i < data.dataListInput.length; i++) {
            if (data.dataListInput[i].Seconds != '')
                if (i == 0) {
                    stringvideoSecond += data.dataListInput[i].Seconds
                }
                else {
                    stringvideoSecond += ',' + data.dataListInput[i].Seconds
                }
        }
        data.VideoSecondCollection = stringvideoSecond;
    }
    const renderHighlight = (value) => {
        return (


            fields?.map((dataItem, index) => {
                return (
                    <div key={index}>
                        <div className='d-flex flex-row'>
                            <div className='col-2'>
                            </div>
                            <div className='col-4 d-flex flex-column'>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller
                                            name={`dataListInput.${index}.HighLightText`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputText  {...field} value={field.value ?? ''} type='text'
                                                />
                                            )} />
                                        {getFormErrorMessageArray(index, 'HighLightText')}

                                    </span>
                                </div>
                            </div>

                            <div className='col-2 d-flex flex-column'>
                                <div className="field d-flex flex-row">
                                    <span className="p-float-label">
                                        <Controller
                                            name={`dataListInput.${index}.Minutes`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputText  {...field} value={field.value ?? ''} type='text'
                                                />
                                            )} />
                                        {getFormErrorMessageArray(index, 'Minutes')}
                                    </span>
                                    <span className='d-flex align-self-center' style={{ paddingLeft: '0.5rem' }} >Phút</span>
                                </div>
                            </div>
                            <div className='col-2 d-flex flex-column'>
                                <div className="field d-flex flex-row">
                                    <span className="p-float-label">
                                        <Controller
                                            name={`dataListInput.${index}.Seconds`}
                                            control={control}
                                            render={({ field }) => (
                                                <InputText  {...field} value={field.value ?? ''}
                                                />
                                            )} />
                                        {getFormErrorMessageArray(index, 'Seconds')}
                                    </span>
                                    <span className='d-flex align-self-center' style={{ paddingLeft: '0.5rem' }} >Giây</span>
                                </div>
                            </div>

                            <div className='col-2 d-flex flex-column'>
                                <label><FaMinusSquare onClick={() => deleteHighlight1(index)} /></label>
                            </div>
                        </div>
                    </div>
                )
            })

            
        )
    }
    const addInputHighlight = () => {
        highlight.push(highlight)
        //let temp = [...highlight, 'H'];
        let temp = [...highlight];
        sethighlight(temp);
        //renderHighlight(highlight)
    }
    const addInputHighlight1 = () => {
        append({
            HighLightText: '',
            Minutes: 0,
            Seconds: 0
        })
    }
    const deleteHighlight = (index) => {
        highlight.splice(index, 1)
        let temp = [...highlight]
        sethighlight(temp)

    }
    const deleteHighlight1 = (index) => {
        remove(index)
    }
    useEffect(() => {
        loadApi();
    }, []);




    return (
        <>
            <Card>
                <div className="" style={{ width: '100%', height: '70vh', paddingLeft: '0px', paddingRight: '0px' }}>
                    <ReactPlayer
                        url={appSetting.ADMIN_URL + dataDetai?.URLAttachment}
                        width='100%'
                        height='100%'
                        pip={true}
                        playing={false}
                        controls={true}
                        loop={false}
                        volume={true}
                        muted={false}>
                    </ReactPlayer>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Tiêu đề video <label className='text-danger'>*</label></label>
                            </div>
                            <div className="col-10 field">
                                <span className="p-float-label">
                                    <Controller name="VideoTitle" control={control} rules={{ required: 'Tiêu đề video không được để trống' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} name='VideoTitle' />
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
                                        <InputTextarea id={field.name} {...field} style={{ minHeight: '5rem' }} />
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
                                    <Controller name="ChannelName" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} disabled />
                                    )} />
                                </span>
                                {getFormErrorMessage('ChannelName', errors)}
                            </div>
                        </div>

                        <div className=' d-flex flex-row'>
                            <div className='col-2'>
                                <label>Từ khóa </label>
                            </div>
                            <div className="col-10 field">
                                <span className="p-float-label">
                                    <Controller name="Keywords" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} />
                                    )} />
                                    <label htmlFor="Keywords" className={classNames({ 'p-error': !!errors.Keywords })}>Nhập văn bản để nhận đề xuất từ khóa</label>
                                </span>
                                {getFormErrorMessage('Keywords')}
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
                                <label><FaPlusSquare onClick={() => addInputHighlight1()} /></label>
                            </div>
                        </div>

                        {renderHighlight(dataDetai)}


                        <div className='d-flex flex-row'>
                            <div className='col-2'>
                                <label>Tệp đính kèm (Tệp SRT)</label>
                            </div>
                            <div className="col-5 mb-3 mr-3">
                                <label htmlFor="formFile" className="form-label">{taiLenFile?.FileLabel}</label>
                                <input accept="doc, docx, xls, xlsx, ppt, pptx, txt, pdf " className="form-control" type="file" id="formFile" onChange={onChangeFile} />
                            </div>
                            <div style={{ float: 'left', fontSize: '12px' }}>
                                <span>Chú ý:</span><br /><span>- Kích thước tệp tối đa tải lên là 1024 MB</span><br /><span>- Các định dạng tệp được phép là: {taiLenFile?.AllowedDisplayFileTypes}</span>
                            </div>
                        </div>
                        <div className='mt-5 d-flex justify-content-end'>
                            <button style={{ minWidth: '7rem' }} type="submit" className="btn btn-primary mr-3" label="Submit">Lưu</button>
                            <button style={{ minWidth: '7rem' }} onClick={() => props.onChange(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
                        </div>
                        <hr />
                        <div>
                            Được ra mắt vào ngày {dataDetai.UploadVideoDate}
                        </div>
                    </form>
                </div>
            </Card>



        </>
    )
}

MyVideoDetail.propTypes = {
    onChange: PropTypes.func
};
MyVideoDetail.defaultProps = {
    onChange: () => { }
}
export default MyVideoDetail;