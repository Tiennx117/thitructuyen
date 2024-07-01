import styles from './style/learningDetail.module.scss';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Image } from 'components/Image';
import { conversationService } from 'services/conversationService';
import { learningService } from 'services/learningService';
import { Dialog } from 'primereact/dialog';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ConversationCommentItem from './ConversationCommentItem';
import { Sidebar } from 'primereact/sidebar';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import DropdownFilter from 'layouts/learner/my-learning/DropdownFilter';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import da from 'date-fns/esm/locale/da/index.js';



const ConversationTopicItem = (props) => {
    const [dataCommentList, setDataCommentList] = useState({
        CommentList: []
    });
    const [loading, setLoading] = useState(false);
    const [btnReport, setBtnReport] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, reset, setValue, getValues } = useForm({});
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    const [showCommentItem, setshowCommentItems] = React.useState(false)
    // const handleChange = (event) => {
    //     let valueInput = event.target.value;
    //     setValue('CommentText', valueInput)
    // };


    const [data] = useState(props.dataConversation);

    // useEffect(() => {
    //     // console.log(props.dataConversation)
    //     // call api here
    //     if (props.dataConversation) {
    //         setData(props.dataConversation);
    //     }
    //     // console.log('cmt', props.dataConversation.comment[0].CommentText)
    //     // console.log('cmt1', data.comment[0].CommentText)
    // }, [props.dataConversation]);

    //#region Xóa Topic Conversation
    const confirmDelete = (id) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn xoá chủ đề này không?',
            accept: () => deleteTopic(id)
        });
    };
    const deleteTopic = async (id) => {
        const params = {
            "conversationId": props.dataConversation.conversationId,
            "topicId": id,
            "LoggedInUserId": userDefault.UserId,
        }
        await conversationService.deletetopics(params);
        props.onLoadApi();
    };

    //#endregion


    //#region Gửi lý do báo cáo lạm dụng
    const sentReport = async (data, reasonReport) => {
        // debugger
        if (reasonReport) {
            const params = {
                "ItemId": data.conversationId,
                "ThreadId": data.topicId,
                "ItemType": "C",

                "PostedContentUserId": data.userId,
                "reportAbuseComment": reasonReport,
            }
            await learningService.addrebusereportcomment(params);
            setBtnReport(false);
            props.onLoadApi();
        }

    };
    const onSubmitKTG = (data) => {

        reset();
    };
    //#endregion

    // show comment

    const onClickShowComment = () => setshowCommentItems(true)


    //#region gửi cmt
    const onSubmit = async (dataSub) => {

        const paramsSentCMT = {
            "ConversationId": data.conversationId,
            "ParentThreadId": data.topicId,
            "ThreadId": 0,
            "CommentText": dataSub.comment,
            "Flag": "I",
            "recordsCount": data.recordsCount,
            "pageNumber": 1,
            "Type": data.Type,
            "Commentcount": 0,
        }
        await conversationService.insertupdatedeletecomments(paramsSentCMT);
        await conversationService.getlatestcomment(paramsSentCMT);
        props.onLoadApi();
        reset();
    };
    //#endregion

    const loadMore = async (dataItem) => {
        setLoading(true);
        const params = {
            "ConversationId": dataItem.conversationId,
            "ParentThreadId": dataItem.comment[0].ParentThreadId,
            "ThreadId": dataItem.comment[0].ThreadId,
            "CommentText": "", //cái bình luận mới post đi nếu có, hoặc để trống cũng chưa thấy problem gì
            "Flag": "", //trống còn lấy từ cmt thì null
            "recordsCount": 5, //lấy bao nhiêu cmt
            "pageNumber": dataItem.comment.length,
            "Type": "Topic",
            "Commentcount": 0,
        }
        let result4 = await conversationService.getprevcommentslisting(params);
        // setDataCommentList(result4.data);
        if (result4.data.CommentList != null) {
            result4.data.CommentList = [...dataItem.comment, ...result4.data.CommentList];
            setDataCommentList(result4.data);
            dataItem.comment = result4.data.CommentList;
        }
        else {
            alert('Không còn bình luận nào để hiển thị.')
        }
        setLoading(false);
    }

    const userDefault = getCurrentUserDefault()
    return (
        <>
            <div >
                <LoadingPanel loading={loading}>
                    <div className={classNames('d-flex flex-row justify-content-between bg-white mb-3 p-3 list-comments shadow-2', styles.conversation1)} style={{ borderRadius: '8px', boxShadow: '2px 3px #e1dfdf' }}>
                        <div className='d-flex flex-6 mr-3'>
                            <Image className='mr-3 col-1rem' style={{ height: '70px' }} src={data.TopicImagePath} alt="Topic Image" />

                            <div className="d-flex flex-column ">
                                <p className='mb-1'>
                                    <span style={{ fontWeight: 700, fontStyle: 'normal', color: '#000', fontSize: '1.3rem' }}>{data.topicTitle} <br /></span>
                                </p>
                                <p className='mb-2'>
                                    <span style={{ fontWeight: 400, fontStyle: 'normal', color: '#7F7F7F' }}>Mô tả: </span>
                                    <span style={{ fontWeight: 400, fontStyle: 'normal', color: '#7F7F7F' }}>{data.topicDesc}</span><br />
                                </p>
                                <p className=''>
                                    <span style={{ color: '#7F7F7F' }}>{data.topicSpan}</span> &nbsp;&nbsp;&nbsp;
                                    <span style={{ fontWeight: 700, fontStyle: 'normal' }}>
                                        <icon className="pi pi-comment">
                                            <span style={{ position: 'relative', top: '-4px', left: '4px' }}>{data.numberOfComments} </span>
                                        </icon>
                                    </span>
                                    <span onClick={onClickShowComment} className='ml-4' style={{ fontStyle: 'normal', cursor: 'pointer' }}>
                                        <i style={{ color: 'rgb(127 127 127)' }} class="fa fa-reply-all" aria-hidden="true"></i>
                                        <span style={{ fontStyle: 'normal', cursor: 'pointer', color: '#1aa1dc' }}>Trả lời </span>
                                    </span>
                                </p>
                            </div>
                        </div>


                        <div className={classNames('d-flex flex-2 align-items-center', styles.rightSide)} >
                            <div className='flex-2'>
                                <Image style={{ width: '46px', height: '46px' }} src={data.UserImagePath} className="" alt="..." />
                            </div>
                            <div className="flex-5" style={{ fontSize: '13px' }}>
                                <p>
                                    <span>{data.userName}<br /></span>
                                    <span style={{ color: '#AAAAAA' }}>{data.jobRole} <br /></span>

                                </p>
                            </div>
                            <div className='flex-1 mb-auto -mr-3'>
                                {userDefault.UserId == data.userId ?
                                    <a className='' onClick={() => confirmDelete(data.topicId)} style={{ alignSelf: 'center', cursor: 'pointer' }}>
                                        <icon className="pi pi-trash" title='Xóa chủ đề' style={{ color: '#8e8e8e', fontSize: '18px' }} />
                                    </a> :
                                    <>
                                        {
                                            data.IsReportedRebuse == true ?
                                                <a className='' style={{ alignSelf: 'center', }}>
                                                    <icon className="fa fa-flag " style={{ color: 'rgb(243, 100, 100)', fontSize: '18px' }} title='Bạn đã báo cáo' />
                                                </a>
                                                :
                                                <a className='' onClick={() => setBtnReport(true)} style={{ alignSelf: 'center', cursor: 'pointer' }}>
                                                    <icon className="fa fa-flag" title='Báo cáo lạm dụng' style={{ color: '#8e8e8e', fontSize: '18px' }} />
                                                </a>
                                        }
                                    </>
                                }
                            </div>
                        </div>

                    </div>

                    {
                        data.comment.map((itemOnly, indexOnly) => (
                            <ConversationCommentItem onLoadApiCmt={() => props.onLoadApi()} onLoadkey={indexOnly} dataComment={itemOnly} />))

                    }

                    {showCommentItem ?
                        <div className='d-flex flex-row justify-content-end' style={{ width: '100%', background: '#eef0f3' }}>
                            <div className={classNames('d-flex flex-column  col-md-10 mr-5', styles.conversation2)} style={{ background: 'transparent' }}>
                                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className={classNames('d-flex flex-column justify-content-end')}>
                                        <span >
                                            <Controller name="comment" control={control} rules={{ required: 'Nhận xét không được để trống' }} render={({ field, fieldState }) => (
                                                <InputTextarea id={field.name} {...field} maxLength={250} placeholder="Viết bình luận" style={{ width: '100%', borderRadius: '15px' }} />
                                            )} />
                                            {/* <Button className={classNames('p-button-sm justify-content-center', styles.btnSend1)} type='submit'>Gửi</Button> */}
                                        </span>
                                        {getFormErrorMessage('comment', errors)}

                                        {/* <InputText value={value2} className={styles.inputBox1} onChange={(e) => setValue2(e.target.value)} placeholder="Nhận xét" /> */}
                                        <Button className={classNames('pl-4 pr-4 p-button-sm justify-content-center ml-auto', styles.btnSend1)} type='submit' style={{ color: 'white' }}>Gửi</Button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        : ''}


                    {props.dataConversation.comment[0].NumberOfMoreComment > 0 ?
                        <div className='pl-4' style={{ width: '100%', background: '#eef0f3', textAlign: 'left', paddingBottom: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                            <a style={{ color: '#016FA0', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', textDecoration: 'underline' }} onClick={() => loadMore(data)}>
                                Hiển thị thêm bình luận
                            </a>
                        </div>
                        : ''
                    }

                    <Dialog header="Bạn có chắc chắn muốn báo cáo lạm dụng không? Nêu lý do *" visible={btnReport} onHide={() => setBtnReport(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '37vw' }} >
                        <form className="row g-3" onSubmit={handleSubmit(onSubmitKTG)}>
                            <div className=" field">
                                <span className="p-float-label">
                                    <Controller name="reasonReport" control={control} rules={{ required: 'Lý do không được để trống' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} value={field.value ?? ''} style={{ width: '100%' }} />
                                    )} />
                                </span>
                                {getFormErrorMessage('reasonReport', errors)}
                            </div>
                            <div className="col-12 d-flex justify-content-end">
                                <Button className="btn btn-primary mr-3" label="Đồng ý" type="submit" onClick={() => sentReport(data, getValues('reasonReport'))} />
                                <Button label="Hủy bỏ" onClick={() => setBtnReport(false)} className="p-button-text" />
                            </div>
                        </form>
                    </Dialog>
                </LoadingPanel>
            </div>
        </>
    );
}

ConversationTopicItem.propTypes = {

    dataConversation: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),

    onLoadApi: PropTypes.func,


};
ConversationTopicItem.defaultProps = {
    onLoadApi: () => { },


}

export default ConversationTopicItem;
