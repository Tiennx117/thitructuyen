import styles from './style/learningDetail.module.scss';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Image } from 'components/Image';
import { conversationService } from 'services/conversationService';
import { learningService } from 'services/learningService';
import { Dialog } from 'primereact/dialog';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { InputText } from 'primereact/inputtext';
import { FormAddTopicConversation } from './FormAddTopicConversation';
import { Sidebar } from 'primereact/sidebar';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import DropdownFilter from 'layouts/learner/my-learning/DropdownFilter';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import ConversationTopicItem from './ConversationTopicItem';
import { Toast } from 'primereact/toast';


const ConversationContainer = (props) => {
    // console.log('s', props.visibleAddTopicBtn)
    const [dataConversation, setDataConversation] = useState({
        ConversationTopics: []
    });
    const [dataCommentList, setDataCommentList] = useState({
        CommentList: []
    });

    const [topicNumber, setTopicNumber] = useState(0);
    const [value2, setValue2] = useState('');
    const userDefault = getCurrentUserDefault();
    const [btnReport, setBtnReport] = useState(false);
    const [reasonReport, setReasonReport] = useState('');
    const [loading, setLoading] = useState(false);
    // const userFirstName = useSelector(state => state.oauth.UserFirstName) || '';
    const [keySearch, setKeysearch] = useState('');
    const [sortColumn, setSortColumn] = useState('FR');
    const filterItems = [
        {
            value: 'FR',
            text: 'LÀM MỚI'
        },
        {
            value: 'CR',
            text: 'NGÀY TẠO'
        }
    ];
    const [visibleRight, setVisibleRight] = useState(false);
    function closeRight() {
        setVisibleRight(false);
        // showBottomRight();
        loadApi();
    }
    const toastBR = useRef(null);
    const showBottomRight = () => {
        toastBR.current.show({ severity: 'success', summary: 'e.eps.lms.com thông báo', detail: 'Thêm chủ đề thành công', life: 3000 });
    }

    useEffect(() => {
        // call api here
        if (props.conversationID) {
            loadApi();
        }

    }, [props.conversationID, sortColumn]);

    //#region Tìm kiếm và loadAPI
    const loadApi = async () => {

        setLoading(true);
        const params = {
            "serchType": "",
            "sortColumn": sortColumn,
            "sortOrder": "desc",
            "searchText": keySearch,
            "recordsCount": 10,
            "pageNumber": 1,
            "conversationId": props.conversationID,
            "IsConversation": props.isAttachConversation,

        }
        let result = await conversationService.getconversationtopics(params);
        setDataConversation(result.data);
        setTopicNumber(result.data.ConversationTopics.length);
        setLoading(false);
    }

    const pressEnter = async (e) => {

        if (e.key == 'Enter') {
            let newText = e.target.value.trim();
            setKeysearch(newText);
            loadApi();

        }
    }

    const onChangeFilter = async (valueSort) => {
        setLoading(true);
        setSortColumn(valueSort);
        setLoading(false);
    }
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
            "pageNumber": 1,
            "Type": "Topic",
            "Commentcount": 0,
        }
        let result4 = await conversationService.getprevcommentslisting(params);
        setDataCommentList(result4.data);
        setLoading(false);
    }

    const { register, control, formState: { errors }, handleSubmit, reset, setValue, getValues } = useForm({ reasonReport });
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    const onSubmit = async (data) => {
        debugger
        const params = {
            "ConversationId": 9253,
            "ParentThreadId": 1239,
            "ThreadId": 0,

            "CommentText": data.comment,
            "Flag": "I",
            "recordsCount": 0,
            "pageNumber": 1,
            "Type": "Topic",
            "Commentcount": 0,
        }

        await conversationService.insertupdatedeletecomments(params);
        //gọi api getlatestcomment
    };
    const onSubmitKTG = (data) => {
        setFormData(data);
        reset();
    };

    return (
        <>
            <Toast ref={toastBR} position="bottom-right" />
            <div className={styles.conversation}>
                {/* <div>
                    <p>
                        <span style={{ fontWeight: 400 }}>Tiêu đề cuộc thảo luận s- </span>
                        <span style={{ fontWeight: 700, color: '#910012' }}>{dataConversation.ConversationTitle}</span>
                    </p>
                </div> */}
                <div className='d-flex flex-row justify-content-between mb-3'>
                    <div className='p-topic'>
                        <span style={{ fontWeight: '700' }}>CHỦ ĐỀ CUỘC THẢO LUẬN ({topicNumber})</span>
                    </div>
                    <div className='p-search'>
                        <div style={{ display: "flex" }}>
                            {/* <div className="p-inputgroup" style={{ width: '488px', height: '40px', alignSelf: 'center' }}>
                            <InputText onKeyDown={(e) => pressEnter(e)} onChange={(e) => setKeysearch(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                            <Button onClick={() => {
                                loadApi()
                            }} icon="pi pi-search" style={{backgroundColor:'#ced4da', color:'black', border:'none'}}/>
                        </div> */}

                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText style={{ width: '300px', borderRadius: '20px' }} onKeyDown={(e) => pressEnter(e)} onChange={(e) => setKeysearch(e.target.value.trim())} placeholder="Nhập từ khoá tìm kiếm..." />
                            </span>
                            {/* <div className='flex-grow-1'>
                            <DropdownFilter items={filterItems} onChange={(e) => onChangeFilter(e.value)} />
                        </div> */}
                        </div>
                    </div>
                </div>

                <LoadingPanel loading={loading}>
                    {dataConversation.ConversationTopics ?
                        <>
                            {dataConversation.ConversationTopics.map((item, index) => (
                                <div key={index} className='mb-3' style={{ background: 'rgb(238, 240, 243)' }}>
                                    <ConversationTopicItem dataConversation={item} onLoadApi={() => loadApi()} />
                                </div>
                            ))}
                        </>
                        :
                        <>
                            <i>Không có mục nào để hiển thị.</i>
                        </>
                    }
                </LoadingPanel>

                <div>
                    <Button icon="pi pi-plus" title='Thêm chủ đề' onClick={() => setVisibleRight(true)} className={classNames('p-button-rounded p-button-info', styles.btnAddTopic)} aria-label="User" style={{ color: 'white' }} />
                </div>
                <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeRight()} position='right' style={{ width: '70%' }}>
                    {
                        <>
                            <Button style={{ position: 'absolute', right: '10px', zIndex: '999' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeRight()} />
                            <FormAddTopicConversation conversationID={props.conversationID} onCloseForm={() => closeRight()} /></>
                    }
                </Sidebar>
            </div>
        </>

    )
}

ConversationContainer.propTypes = {
    conversationID: PropTypes.number,
    isAttachConversation: PropTypes.bool,

    // iLTStatus: PropTypes.string,
};
export { ConversationContainer };