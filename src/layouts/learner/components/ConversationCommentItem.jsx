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
import { FormAddTopicConversation } from './FormAddTopicConversation';
import { Sidebar } from 'primereact/sidebar';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import DropdownFilter from 'layouts/learner/my-learning/DropdownFilter';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';

const ConversationCommentItem = (props) => {
    const [btnReport, setBtnReport] = useState(false);
    const userDefault = getCurrentUserDefault();
    const [isEdit, setIsEdit] = useState(false);
    const { register, control, formState: { errors }, handleSubmit, reset, setValue, getValues } = useForm({});
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    const [data] = useState(props.dataComment);

    //#region Xóa nhận xét Conversation
    const confirmDelete = (item) => {
        confirmDialogGlobal({
            message: 'Bạn có chắc chắn xoá nhận xét này không?',
            accept: () => deleteTopic(item)
        });
    };
    const deleteTopic = async (item) => {
        const params = {
            "ConversationId": 0,
            "ParentThreadId": 0,
            "ThreadId": item.ThreadId,
            "UserId": item.UserId,
            "CommentText": "",
            "Flag": "D",
            "recordsCount": item.RecordsCount,
            "pageNumber": 1,
            "Type": "",
            "Commentcount": 0,
        }
        await conversationService.insertupdatedeletecomments(params);
        const param = {
            "ConversationId": item.ConversationId,
            "ParentThreadId": item.ParentThreadId,
            "ThreadId": item.ThreadId,
            "UserId": item.UserId,
            "CommentText": "",
            "Flag": "D",
            "recordsCount": item.RecordsCount,
            "pageNumber": 1,
            "Type": item.Type,
            "Commentcount": 0,
        }
        await conversationService.getlatestcomment(params);
        props.onLoadApiCmt();
    };

    //#endregion


    //#region Gửi lý do báo cáo lạm dụng
    const sentReport = async (data, reasonReport) => {

        if (reasonReport) {
            const params = {
                "ItemId": data.ConversationId,
                "ThreadId": data.ThreadId,
                "ItemType": "C",

                "PostedContentUserId": data.UserId,
                "reportAbuseComment": reasonReport,


            }
            await learningService.addrebusereportcomment(params);

            props.onLoadApiCmt();

            const paramsLoadMore = {
                "ConversationId": data.ConversationId,
                "ParentThreadId": data.ParentThreadId,
                "ThreadId": data.ThreadId,

                "CommentText": "", //đôi khi có giá trị của cmt mới thêm hoặc mới sửa
                "Flag": "",//nếu CommentText có giá trị thì Flag: U
                "recordsCount": 5,
                "pageNumber": 1,
                "Type": "Topic",
                "Commentcount": 0,
            }
            await conversationService.getprevcommentslisting(paramsLoadMore);
            setBtnReport(false);
        }

    };
    const onSubmitKTG = (data) => {

        reset();
    };
    //#endregion



    //#region gửi cmt
    const onSubmit = async (dataSub) => {
        debugger
        const paramsUpdateCMT = {
            "ConversationId": data.conversationId,
            "ParentThreadId": data.topicId,
            "ThreadId": data.ThreadId,
            "UserId": data.UserId,
            "CommentText": dataSub.comment,
            "Flag": "U",
            "recordsCount": data.recordsCount,
            "pageNumber": 1,
            "Type": data.Type,
            "Commentcount": 0,
        }
        await conversationService.insertupdatedeletecomments(paramsUpdateCMT);
        setIsEdit(false)
        props.onLoadApiCmt();
        reset();
    };
    //#endregion

    return (
        <>
            <div >
                {data.UserId != userDefault.UserId ?
                    <div className='d-flex flex-row' style={{ width: '100%', background: '#eef0f3', paddingBottom: '0px' }}>
                        <div className='mr-3' style={{ paddingTop: '5px' }}>
                            <Image style={{ width: '46px', height: '46px' }} src={data.UserImagePath} className="" />
                        </div>
                        <div className={classNames('d-flex flex-column p-3 mt-2 mr-3 mb-2 col-md-8 custom-comment-item', styles.conversation2)}>
                            <div className='d-flex justify-content-start'>
                                <span className='font-weight-bold'>{data.UserName}&nbsp;&nbsp; </span>
                                <span style={{ color: '#AAAAAA' }}>{data.JobRole}</span>
                                <span className='ml-auto'>
                                    {isEdit != true ?
                                        <>
                                            {data.IsReportedRebuse == true ?
                                                <i className="fa fa-flag" style={{ color: 'rgb(243, 100, 100)', fontSize: '18px' }} title='Bạn đã báo cáo' />
                                                :
                                                <i className="fa fa-flag cursor-pointer" style={{ color: '#8e8e8e', fontSize: '18px' }} onClick={() => setBtnReport(true)} title='Báo cáo lạm dụng' />
                                            }
                                        </>
                                        : ''
                                    }

                                </span>
                            </div>
                            <div>
                                {/* {setValue('comment', data.CommentText)} */}
                                {isEdit == true ?
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className={classNames('d-flex flex-column justify-content-end', styles.conversation2)}>
                                            <div className='field '>
                                                <span className="p-float-label">
                                                    <Controller name="comment" control={control} rules={{ required: 'Nhận xét không được để trống' }} render={({ field, fieldState }) => (
                                                        <InputTextarea id={field.name} {...field} name maxLength={250} style={{ width: '100%' }} />
                                                    )} />
                                                </span>
                                                {getFormErrorMessage('comment', errors)}

                                            </div>
                                            <Button className={classNames('p-button-sm justify-content-center', styles.btnSend1)} type='submit'>Gửi </Button>
                                        </div>
                                    </form>
                                    :
                                    <span className={classNames('p-input-icon-right', styles.conversation2)}>
                                        {/* <InputTextarea readOnly className={styles.boxComment} value={data.CommentText} onChange={(e) => setValue4(e.target.value)} style={{ backgroundColor: '#fff', border: 'none', color: '#000'}}/> */}
                                        <p readOnly className={classNames('mb-0', styles.boxComment)} onChange={(e) => setValue4(e.target.value)} style={{ backgroundColor: '#fff', border: 'none', color: '#000' }}>
                                            {data.CommentText}
                                        </p>
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    :
                    <>
                        {data.CommentText != "" &&

                            <div className='d-flex flex-row justify-content-end' style={{ width: '100%', background: '#eef0f3', paddingBottom: '0px' }}>
                                <div style={{ background: '#cde1ff', borderRadius: '15px' }} className={classNames('d-flex flex-column p-1 mt-2 mr-3 mb-2 col-md-8', styles.conversation2)}>
                                    <div>
                                        {/* {setValue('comment', data.CommentText)} */}
                                        {isEdit == true ?
                                            <form onSubmit={handleSubmit(onSubmit)} >
                                                <div className={classNames('m-3 d-flex flex-column justify-content-end', styles.conversation2)} style={{ background: 'transparent' }}>
                                                    <div className='field'>
                                                        <span className="p-float-label">
                                                            <Controller name="comment" control={control} rules={{ required: 'Nhận xét không được để trống' }} render={({ field, fieldState }) => (
                                                                <InputTextarea id={field.name} {...field} name maxLength={250} style={{ width: '95%', border: 'none' }} />
                                                            )} />
                                                        </span>
                                                        {getFormErrorMessage('comment', errors)}

                                                    </div>
                                                    <Button className={classNames('p-button-sm justify-content-center', styles.btnSend1)} type='submit' style={{ color: '#fff' }}>Gửi </Button>
                                                </div>
                                            </form>
                                            :
                                            <span style={{ background: 'transparent' }} className={classNames('p-input-icon-right p-1', styles.conversation2)}>
                                                {/* <InputTextarea  readOnly className={styles.boxComment} value={data.CommentText} onChange={(e) => setValue4(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#000'}} /> */}
                                                <p readOnly className={classNames('mb-0 p-2', styles.boxComment)} onChange={(e) => setValue4(e.target.value)} style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }}>
                                                    {data.CommentText}
                                                </p>
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className='mr-3 box-action' style={{ paddingTop: '5px' }}>
                                    <Image style={{ width: '46px', height: '46px' }} src={data.UserImagePath} className="" />
                                    <a id="dropdownMenuButton" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false" className={classNames('', styles.boxactionshow)}>
                                        <i style={{ fontSize: '2rem', color: '#8e8e8e' }} class="fas fa-solid fa-ellipsis"></i>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li>
                                            <a onClick={() => { setIsEdit(true); setValue('comment', data.CommentText) }} className="dropdown-item cursor-pointer">Chỉnh sửa</a>
                                            <a onClick={() => confirmDelete(data)} className="dropdown-item cursor-pointer">Xóa</a>
                                        </li>
                                    </ul>

                                </div>

                            </div>
                        }
                    </>
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
            </div>
        </>
    );
}

ConversationCommentItem.propTypes = {
    dataComment: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    onLoadApiCmt: PropTypes.func,
};
ConversationCommentItem.defaultProps = {
    onLoadApiCmt: () => { },
}

export default ConversationCommentItem;
