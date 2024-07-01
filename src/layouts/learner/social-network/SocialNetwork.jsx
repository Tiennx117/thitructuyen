import React, { useEffect, useState, useRef } from 'react';
import './style.css'
import { InputTextarea } from 'primereact/inputtextarea';
import { socialNetworkService } from 'services/socialNetworkService';
import { useSelector, useDispatch } from 'react-redux';
import { el } from 'date-fns/locale';
import { Dialog } from 'primereact/dialog';
import ShareSocialNetwork from '../components/ShareSocialNetwork';
import TopicSocialNetwork from './TopicSocialNetwork';
import Image from 'components/Image';
import { right } from '@popperjs/core';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
// import { useWindowSize } from 'react-window-size-listener';
import useInfiniteScroll from 'react-infinite-scroll-hook';
const SocialNetwork = (props) => {
    const [loading, setLoading] = useState(false);
    const [dataContent, setdataContent] = useState([])
    const [comment, setcomment] = useState('')
    const [comment0, setcomment0] = useState('')
    const [valueCMT, setValueCMT] = useState('')
    const [valueCMT0, setValueCMT0] = useState('')
    const UserId = useSelector(state => state.oauth.UserId) || '';
    const UserImage = useSelector(state => state.oauth.UserImage) || '';
    const [valueCmtEdit, setvalueCmtEdit] = useState('')
    const [inputEditCmt, setinputEditCmt] = useState('')
    const [visibleShare, setvisibleShare] = useState(false)
    const [idContent, setidContent] = useState()
    const [idTopic, setIdTopic] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [visibleMore, setVisibleMore] = useState(false);
    const [listStrId, setlistStrId] = useState('');
    const divRef = useRef();
    useEffect(() => {
        document.body.classList.add('overflow-y-disable');
    }, []);

    useEffect(() => {
        return () => {
            document.body.classList.remove('overflow-y-disable');
        };
    }, []);
    useEffect(() => {
        loadApi()
    }, [idTopic]);
    useEffect(() => {
        const handleScroll = () => {
            const scrollableDiv = document.getElementById('scrollableDiv');
            if (
                scrollableDiv.scrollTop + scrollableDiv.clientHeight ===
                scrollableDiv.scrollHeight
            ) {
                if (visibleMore == true) {
                    loadApi1(idTopic,listStrId)
                }
            }
        };
        const scrollableDiv = document.getElementById('scrollableDiv');
        scrollableDiv.addEventListener('scroll', handleScroll);
        return () => {
            scrollableDiv.removeEventListener('scroll', handleScroll);
        };
    }, [visibleMore,idTopic,listStrId]);
    const loadApi = async () => {
        setLoading(true)
        const divElement = divRef.current;
        divElement.scrollTop = 0;
        let param = {
            IdTopic: idTopic,
            UserID: UserId,
            iscmt: 1,
            NumberOfRecordsPerPage: 5,
            lstIdContent: ''
        }
        let result = await socialNetworkService.getSocialNetwork(param)
        let data = result.data
        if (data.length > 0) {
            let arrid = data.map(x => x.IdContent)
            let strid = arrid.join(',')
            setlistStrId(strid)
            if (data.length < data[0].totalRecords) {
                setVisibleMore(true);
            }
            else {
                setVisibleMore(false);
            }
        }
        setdataContent(data)
        setLoading(false);
    }
    const loadApi2 = async () => {
        let param = {
            IdTopic: idTopic,
            UserID: UserId,
            iscmt: 2,
            NumberOfRecordsPerPage: 5,
            lstIdContent: listStrId
        }
        let result = await socialNetworkService.getSocialNetwork(param)
        let data = result.data
        // if (data.length > 0) {
        //     let arrid = data.map(x => x.IdContent)
        //     let strid = arrid.join(',')
        //     setlistStrId(strid)
        //     console.log(strid)
        //     if (data.length < data[0].totalRecords) {
        //         setVisibleMore(true);
        //     }
        //     else {
        //         setVisibleMore(false);
        //     }
        // }
        setdataContent(data)
    }
    const loadApi1 = async (idTopic1,listStrId1) => {
        let param = {
            IdTopic: idTopic1,
            UserID: UserId,
            iscmt: 1,
            NumberOfRecordsPerPage: 5,
            lstIdContent: listStrId1
        }
        let result = await socialNetworkService.getSocialNetwork(param)
        let data = result.data
        if (data.length > 0) {
            let dataTemp = [...dataContent, ...data]
            setdataContent(dataTemp)
            let arrid = dataTemp.map(x => x.IdContent)
            let strid = arrid.join(',')
            setlistStrId(strid)
            console.log(strid)
            console.log('dataTemp',dataTemp)
            if (dataTemp.length < dataTemp[0].totalRecords) {
                setVisibleMore(true);
            }
            else {
                setVisibleMore(false);
            }
        }
    }
    const feedBack = (id) => {
        setcomment('cmt-' + id)
    }
    const handleKeyDown = async (e, IdComment, IdContent) => {
        let loadList = '';
        if (e.key == 'Enter') {
            // console.log('valueCMT', valueCMT)
            let param = {
                ParentId: IdComment,
                IdContent: IdContent,
                Comment: valueCMT
            }
            let result = await socialNetworkService.createComment(param)
            loadList = result.data
        }
        if (loadList == 'True') {
            loadApi2()
            setValueCMT('')
        }
    }
    const handleKeyDown0 = async (e, IdComment, IdContent) => {
        let loadList = '';
        if (e.key == 'Enter') {
            // console.log('valueCMT', valueCMT)
            let param = {
                ParentId: IdComment,
                IdContent: IdContent,
                Comment: valueCMT0
            }
            let result = await socialNetworkService.createComment(param)
            loadList = result.data
        }
        if (loadList == 'True') {
            loadApi2()
            setValueCMT0('')
        }
    }
    const handleKeyDownEdit = async (e, IdComment) => {
        let loadList = '';
        if (e.key == 'Enter') {
            // console.log('valueCMT', valueCMT)
            let param = {
                IdComment: IdComment,
                Comment: valueCmtEdit
            }
            let result = await socialNetworkService.editComment(param)
            loadList = result.data
        }
        if (loadList == 'True') {
            loadApi2()
            setvalueCmtEdit('')
            setinputEditCmt('')
        }
    }
    const onchangCMT = (value) => {
        setValueCMT(value)
    }
    const onchangCMT0 = (value) => {
        setValueCMT0(value)
    }
    const onchangEditCMT = (value) => {
        setvalueCmtEdit(value)
    }
    const handleLikeButtonClick = async (UserId, idContent, idComment) => {
        let param = {
            IdComment: idComment,
            IdContent: idContent,
            User_Id: UserId
        }
        let loadList = '';
        let result = await socialNetworkService.createLike(param)
        loadList = result.data
        if (loadList == 'True') {
            loadApi2()
        }
    }
    const handleUnLikeButtonClick = async (UserId, idContent, idComment) => {
        let param = {
            IdComment: idComment,
            IdContent: idContent,
            User_Id: UserId
        }
        let loadList = '';
        let result = await socialNetworkService.unLike(param)
        loadList = result.data
        if (loadList == 'True') {
            loadApi2()
        }
    }
    const deleteCMT = async (idComment) => {
        let param = {
            IdComment: idComment
        }
        let loadList = '';
        let result = await socialNetworkService.deleteComment(param)
        loadList = result.data
        if (loadList == 'True') {
            loadApi2()
        }
    }
    const editCMT = (idComment, Comment) => {
        setvalueCmtEdit(Comment)
        setinputEditCmt('editcmt-' + idComment)
    }
    const onChangeImage = (htmlImage) => {
        let screenWidth = screen.width
        let screenHeight = screen.height
        let width = 0
        let height = 0
        let decodedString ='';
        try {
             decodedString = decodeURIComponent(htmlImage);
        } catch (error) {
            console.error("URI decoding error:", error);
        }
        let styleMatch = decodedString.match(/style="([^"]*)"/);
        if (styleMatch && styleMatch[1]) {
            const styleValue = styleMatch[1];
            const widthMatch = styleValue.match(/width:(\d+)px/);
            const heightMatch = styleValue.match(/height:(\d+)px/);
            if (widthMatch && widthMatch[1] && heightMatch && heightMatch[1]) {
                width = parseInt(widthMatch[1], 10);
                height = parseInt(heightMatch[1], 10);
            }
        }
        const divElement = document.createElement('div');
        divElement.innerHTML = decodedString;
        const imgElement = divElement.querySelector('img');
        let ratioWidth = width / screenWidth
        if (ratioWidth > 0.51) {
            if (imgElement) {
                imgElement.style.width = '100%';
                imgElement.style.height = '';
            }
        }
        const modifiedHtmlString = divElement.innerHTML;

        return modifiedHtmlString
    }
    const renderTime = (time) => {
        const specificDate = new Date(time);
        const currentDate = new Date();
        const timeDifferenceInSeconds = Math.floor((currentDate - specificDate) / 1000);
        if (timeDifferenceInSeconds >= 31536000) {
            let timeCount = Math.floor(timeDifferenceInSeconds / 31536000);
            return (
                <>{timeCount + ' năm'}</>
            )
        }
        else if (timeDifferenceInSeconds >= 2592000) {
            let timeCount = Math.floor(timeDifferenceInSeconds / 2592000);
            return (
                <>{timeCount + ' tháng'}</>
            )
        }
        else if (timeDifferenceInSeconds >= 604800) {
            let timeCount = Math.floor(timeDifferenceInSeconds / 604800);
            return (
                <>{timeCount + ' tuần'}</>
            )
        }
        else if (timeDifferenceInSeconds >= 86400) {
            let timeCount = Math.floor(timeDifferenceInSeconds / 86400);
            return (
                <>{timeCount + ' ngày'}</>
            )
        }
        else if (timeDifferenceInSeconds >= 3600) {
            let timeCount = Math.floor(timeDifferenceInSeconds / 3600);
            return (
                <>{timeCount + ' giờ'}</>
            )
        }
        else if (timeDifferenceInSeconds >= 60) {
            let timeCount = Math.floor(timeDifferenceInSeconds / 60);
            return (
                <>{timeCount + ' phút'}</>
            )
        }
        else {
            return (
                <>{timeDifferenceInSeconds + ' giây'}</>
            )
        }
    }
    const openShare = (IdContent) => {
        setvisibleShare(true)
        setidContent(IdContent)
    }
    const onChangIdTopic = async (id) => {
        setIdTopic(id);
        // else {
        //     let param = {
        //         lstIdTopic: id,
        //         UserID: UserId
        //     }
        //     let result = await socialNetworkService.getAllSocialNetwork(param)
        //     let data = result.data
        //     setdataContent(data)
        // }
    }
    const renderlikeContent = (useid, idContent, idComment, data) => {
        let like = 'false';
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (useid == data[i].User_Id && idContent == data[i].IdContent) {
                    like = 'true'
                    return (
                        <>
                            <i className="fa fa-thumbs-up" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleUnLikeButtonClick(UserId, idContent, 0)} alt="" />
                        </>
                    )
                }
            }
            if (like == 'false') {
                return (
                    <>
                        <i className="fa fa-thumbs-up" style={{ cursor: 'pointer' }} onClick={() => handleLikeButtonClick(UserId, idContent, 0)} alt="" />
                    </>
                )
            }

        }
        else {
            return (
                <>
                    <i className="fa fa-thumbs-up" style={{ cursor: 'pointer' }} onClick={() => handleLikeButtonClick(UserId, idContent, 0)} alt="" />
                </>
            )
        }
    }
    const renderLikeCMT = (useid, idContent, idComment, data) => {
        let like = 'false';
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (useid == data[i].User_Id && idComment == data[i].IdComment) {
                    like = 'true'
                    return (<>
                        <a href="#" onClick={() => handleUnLikeButtonClick(useid, 0, idComment)} >{'Thích '} </a>
                    </>)
                }
            }
            if (like == 'false') {
                return (
                    <>
                        <a href="#" onClick={() => handleLikeButtonClick(useid, 0, idComment)} style={{ color: "#626262" }}>{'Thích '} </a>
                    </>
                )
            }

        }
        else {
            return (
                <>
                    <a href="#" onClick={() => handleLikeButtonClick(useid, 0, idComment)} style={{ color: "#626262" }}>{'Thích '} </a>
                </>
            )
        }
    }
    const renderCommnet = (data, idContent) => {
        let reversedData = data.slice().reverse();
        return (
            reversedData.map((item1, index) => {
                if (item1?.IdContent == idContent && item1?.ParentId == 0) {
                    return (
                        <>
                            <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "hide-cmt row" : "row"} style={{ padding: '10px' }}>
                                <div className="col">
                                    <div className="d-flex flex-start">
                                        <Image className="rounded-circle shadow-1-strong me-3" src={item1?.UserImg} alt="avatar" width={65} height={65} />
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-1">
                                                        <span style={{ fontWeight: '600' }}>{item1?.Poster}</span>
                                                    </p>
                                                    <div className="dropdown">
                                                        <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v" />
                                                        </a>
                                                        <ul className="dropdown-menu" style={{}}>
                                                            {item1?.IdPoster == UserId ? <>
                                                                <li><a style={{ cursor: 'pointer' }} onClick={() => deleteCMT(item1?.IdComment)} className="dropdown-item" >Xóa</a></li>
                                                                <li><a style={{ cursor: 'pointer' }} onClick={() => { editCMT(item1?.IdComment, item1?.Comment) }} className="dropdown-item" >Chỉnh sửa</a></li>
                                                            </> :
                                                                <>
                                                                    <li><a className="dropdown-item" style={{ cursor: 'pointer' }} >Báo cáo</a></li>
                                                                </>
                                                            }

                                                        </ul>
                                                    </div>
                                                </div>
                                                <p className="small mb-0">
                                                    {item1?.Comment}
                                                </p>
                                                <div className="activity-icons">
                                                    <div>{renderTime(item1?.CreatedAt)}</div>
                                                    <div>{renderLikeCMT(UserId, item1?.IdContent, item1?.IdComment, item1?.ListSocialNetworkLike)} <span style={{ marginLeft: '0.5rem' }}>{item1?.CountLike}</span></div>
                                                    <div><a href="#" style={{ color: "#626262" }} onClick={() => feedBack(item1?.IdComment)}>Phản hồi</a></div>
                                                </div>
                                            </div>
                                            <div className={comment == ('cmt-' + item1?.IdComment) ? "d-flex flex-start mt-4" : "hide-cmt flex-start mt-4"} >
                                                <a className="me-3" href="#">
                                                    <Image className="rounded-circle shadow-1-strong" src={UserImage} alt="avatar" width={65} height={65} />
                                                </a>
                                                <div className="flex-grow-1 flex-shrink-1">
                                                    <div>
                                                        <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, item1?.IdComment, item1?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                reversedData.map((dataItem, key) => {
                                                    if (dataItem?.ParentId == item1?.IdComment) {
                                                        return (
                                                            <>
                                                                <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "hide-cmt d-flex flex-start mt-4" : "flex-start mt-4"}>
                                                                    <a className="me-3" href="#">
                                                                        <Image className="rounded-circle shadow-1-strong" src={dataItem?.UserImg} alt="avatar" width={65} height={65} />
                                                                    </a>
                                                                    <div className="flex-grow-1 flex-shrink-1">
                                                                        <div>
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <p className="mb-1">
                                                                                    <span style={{ fontWeight: '600' }}>{dataItem?.Poster}</span>
                                                                                </p>
                                                                                <div className="dropdown">
                                                                                    <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <i className="fas fa-ellipsis-v" />
                                                                                    </a>
                                                                                    <ul className="dropdown-menu" style={{}}>
                                                                                        {dataItem?.IdPoster == UserId ? <>
                                                                                            <li><a style={{ cursor: 'pointer' }} onClick={() => deleteCMT(dataItem?.IdComment)} className="dropdown-item" >Xóa</a></li>
                                                                                            <li><a style={{ cursor: 'pointer' }} className="dropdown-item" >Chỉnh sửa</a></li>
                                                                                        </> :
                                                                                            <>
                                                                                                <li><a style={{ cursor: 'pointer' }} className="dropdown-item" >Báo cáo</a></li>
                                                                                            </>
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <p className="small mb-0">
                                                                                {dataItem?.Comment}
                                                                            </p>
                                                                            <div className="activity-icons">
                                                                                <div>{renderTime(dataItem?.CreatedAt)}</div>
                                                                                <div>{renderLikeCMT(UserId, dataItem?.IdContent, dataItem?.IdComment, dataItem?.ListSocialNetworkLike)}<span style={{ marginLeft: '0.5rem' }}>{dataItem?.CountLike}</span></div>
                                                                                <div><a href="#" style={{ color: "#626262" }} onClick={() => feedBack(dataItem?.IdComment)}>Phản hồi</a></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "d-flex flex-start mt-4" : "hide-cmt flex-start mt-4"} >
                                                                    <a className="me-3" href="#">
                                                                        <Image className="rounded-circle shadow-1-strong" src={UserImage} alt="avatar" width={65} height={65} />
                                                                    </a>
                                                                    <div className="flex-grow-1 flex-shrink-1">
                                                                        <div>
                                                                            <InputTextarea value={valueCmtEdit} onKeyDown={(e) => handleKeyDownEdit(e, dataItem?.IdComment, dataItem?.IdContent)} onChange={(e) => onchangEditCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={comment == ('cmt-' + dataItem?.IdComment) ? "d-flex flex-start mt-4" : "hide-cmt flex-start mt-4"} >
                                                                    <a className="me-3" href="#">
                                                                        <Image className="rounded-circle shadow-1-strong" src={UserImage} alt="avatar" width={65} height={65} />
                                                                    </a>
                                                                    <div className="flex-grow-1 flex-shrink-1">
                                                                        <div>
                                                                            <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, item1?.IdComment, item1?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                })
                                            }

                                        </div >
                                    </div>
                                </div>
                            </div>
                            <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "row" : "hide-cmt row"} style={{ padding: '10px' }}>
                                <div className="col">
                                    <div className="d-flex flex-start">
                                        <Image className="rounded-circle shadow-1-strong me-3" src={UserImage} alt="avatar" width={65} height={65} />
                                        <InputTextarea value={valueCmtEdit} onKeyDown={(e) => handleKeyDownEdit(e, item1?.IdComment)} onChange={(e) => onchangEditCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            })
        )

    }
    const renderLikeCMT1 = (useid, idContent, idComment, data) => {
        let like = 'false';
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (useid == data[i].User_Id && idComment == data[i].IdComment) {
                    like = 'true'
                    return (<>
                        <i className="fa fa-thumbs-up" onClick={() => handleUnLikeButtonClick(useid, 0, idComment)} style={{ color: 'blue' }} />
                        {/* <a href="#" onClick={() => handleUnLikeButtonClick(useid, 0, idComment)} >{'Thích '} </a> */}
                    </>)
                }
            }
            if (like == 'false') {
                return (
                    <>
                        <i className="fa fa-thumbs-up" onClick={() => handleLikeButtonClick(useid, 0, idComment)} />
                        {/* <a href="#" onClick={() => handleLikeButtonClick(useid, 0, idComment)} style={{ color: "#626262" }}>{'Thích '} </a> */}
                    </>
                )
            }

        }
        else {
            return (
                <>
                    <i className="fa fa-thumbs-up" onClick={() => handleLikeButtonClick(useid, 0, idComment)} />
                    {/* <a href="#" onClick={() => handleLikeButtonClick(useid, 0, idComment)} style={{ color: "#626262" }}>{'Thích '} </a> */}
                </>
            )
        }
    }
    const renderCommnet1 = (data, idContent, IdPosterContent, CommentsAllowed) => {
        let reversedData = data.slice().reverse();
        console.log(CommentsAllowed)
        return (
            reversedData.map((item1, index) => {
                if (item1?.IdContent == idContent && item1?.ParentId == 0) {
                    return (
                        <>
                            <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "hide-cmt media-block" : "media-block"}>
                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item1?.UserImg} /></a>
                                <div className="media-body">
                                    <div className="mar-btm">
                                        <span style={{ color: '#6a6a6a', fontWeight: 600 }} className="btn-link text-semibold media-heading box-inline">{item1?.Poster}</span>
                                        <div className="dropdown" style={{ float: 'right' }}>
                                            <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fas fa-ellipsis-v" />
                                            </a>
                                            <ul className="dropdown-menu" >
                                                {item1?.IdPoster == UserId ? <>
                                                    <li><a style={{ cursor: 'pointer' }} onClick={() => deleteCMT(item1?.IdComment)} className="dropdown-item" >Ẩn</a></li>
                                                    <li><a style={{ cursor: 'pointer' }} onClick={() => { editCMT(item1?.IdComment, item1?.Comment) }} className="dropdown-item" >Chỉnh sửa</a></li>
                                                </> :
                                                    <>
                                                        {IdPosterContent == UserId ? <li><a className="dropdown-item" onClick={() => deleteCMT(item1?.IdComment)} style={{ cursor: 'pointer' }} >Ẩn</a></li> : <></>}
                                                    </>
                                                }

                                            </ul>
                                        </div>
                                        <p className="text-muted text-sm"> {renderTime(item1?.CreatedAt)}</p>
                                    </div>
                                    <p>{item1?.Comment}</p>
                                    <div className="pad-ver">
                                        <div className="btn-group">
                                            <a className="btn btn-sm btn-default btn-hover-success">{renderLikeCMT1(UserId, item1?.IdContent, item1?.IdComment, item1?.ListSocialNetworkLike)}<span style={{ marginLeft: '0.5rem' }}>{item1?.CountLike}</span></a>
                                            {CommentsAllowed == 'True' ? <><a className="btn btn-sm btn-default btn-hover-primary" onClick={() => feedBack(item1?.IdComment)}>Phản hồi</a></> : <></>}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={comment == ('cmt-' + item1?.IdComment) ? "media-block" : "hide-cmt media-block"}>
                                        <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                        <div className="media-body">
                                            <textarea autofocus value={valueCMT} onKeyDown={(e) => handleKeyDown(e, item1?.IdComment, item1?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                        </div>
                                    </div>
                                    {/* Comments */}
                                    <div>
                                        {
                                            reversedData.map((dataItem, key) => {
                                                if (dataItem?.ParentId == item1?.IdComment) {
                                                    return (
                                                        <>
                                                            <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "hide-cmt media-block" : "media-block"}>
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={dataItem?.UserImg} /></a>
                                                                <div className="media-body">
                                                                    <div className="mar-btm">
                                                                        <span style={{ color: '#6a6a6a', fontWeight: 600 }} className="btn-link text-semibold media-heading box-inline">{dataItem?.Poster}</span>
                                                                        <div className="dropdown" style={{ float: 'right' }}>
                                                                            <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <i className="fas fa-ellipsis-v" />
                                                                            </a>
                                                                            <ul className="dropdown-menu" style={{}}>
                                                                                {dataItem?.IdPoster == UserId ? <>
                                                                                    <li><a style={{ cursor: 'pointer' }} onClick={() => deleteCMT(dataItem?.IdComment)} className="dropdown-item" >Ẩn</a></li>
                                                                                    <li><a style={{ cursor: 'pointer' }} className="dropdown-item" >Chỉnh sửa</a></li>
                                                                                </> :
                                                                                    <>
                                                                                        {IdPosterContent == UserId ? <li><a className="dropdown-item" onClick={() => deleteCMT(dataItem?.IdComment)} style={{ cursor: 'pointer' }} >Ẩn</a></li> : <></>}
                                                                                    </>
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                        <p className="text-muted text-sm">{renderTime(dataItem?.CreatedAt)}</p>
                                                                    </div>
                                                                    <p>{dataItem?.Comment}</p>
                                                                    <div className="pad-ver">
                                                                        <div className="btn-group">
                                                                            <a className="btn btn-sm btn-default btn-hover-success active">{renderLikeCMT1(UserId, dataItem?.IdContent, dataItem?.IdComment, dataItem?.ListSocialNetworkLike)}<span style={{ marginLeft: '0.5rem' }}>{dataItem?.CountLike}</span></a>
                                                                            {CommentsAllowed == 'True' ? <><a className="btn btn-sm btn-default btn-hover-primary" onClick={() => feedBack(dataItem?.IdComment)}>Phản hồi</a></> : <></>}
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                            <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "media-block" : "hide-cmt media-block"} >
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                                                <div className="media-body">
                                                                    <textarea autofocus value={valueCmtEdit} onKeyDown={(e) => handleKeyDownEdit(e, dataItem?.IdComment, dataItem?.IdContent)} onChange={(e) => onchangEditCMT(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                                                </div>
                                                                {/* <div className="flex-grow-1 flex-shrink-1">
                                                                    <div>
                                                                        <InputTextarea value={valueCmtEdit} onKeyDown={(e) => handleKeyDownEdit(e, dataItem?.IdComment, dataItem?.IdContent)} onChange={(e) => onchangEditCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                            <div className={comment == ('cmt-' + dataItem?.IdComment) ? "media-block" : "hide-cmt media-block"} >
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                                                <div className="media-body">
                                                                    <textarea autofocus value={valueCMT} onKeyDown={(e) => handleKeyDown(e, item1?.IdComment, item1?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                                                </div>
                                                                {/* <div className="flex-grow-1 flex-shrink-1">
                                                                    <div>
                                                                        <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, item1?.IdComment, item1?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                        {/* <div className="media-block">
                                            <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar2.png" /></a>
                                            <div className="media-body">
                                                <div className="mar-btm">
                                                    <a className="btn-link text-semibold media-heading box-inline">Bobby Marz</a>
                                                    <p className="text-muted text-sm"> 7 min ago</p>
                                                </div>
                                                <p>Sed diam nonummy nibh euismod tincidunt ut </p>
                                                <div className="pad-ver">
                                                    <div className="btn-group">
                                                        <a className="btn btn-sm btn-default btn-hover-success active"><i className="fa fa-thumbs-up" /> </a>
                                                        <a className="btn btn-sm btn-default btn-hover-primary">Phản hồi</a>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="media-block">
                                            <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar3.png" />
                                            </a>
                                            <div className="media-body">
                                                <div className="mar-btm">
                                                    <a className="btn-link text-semibold media-heading box-inline">Lucy Moon</a>
                                                    <p className="text-muted text-sm"> 2 min ago</p>
                                                </div>
                                                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate ?</p>
                                                <div className="pad-ver">
                                                    <div className="btn-group">
                                                        <a className="btn btn-sm btn-default btn-hover-success"><i className="fa fa-thumbs-up" /></a>
                                                        <a className="btn btn-sm btn-default btn-hover-primary">Comment</a>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className={inputEditCmt == ('editcmt-' + item1?.IdComment) ? "media-block" : "hide-cmt media-block"} >
                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                <div className="media-body">
                                    <textarea autofocus value={valueCmtEdit} onKeyDown={(e) => handleKeyDownEdit(e, item1?.IdComment)} onChange={(e) => onchangEditCMT(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                </div>
                                {/* <div className="col">
                                    <div className="d-flex flex-start">
                                        <Image className="rounded-circle shadow-1-strong me-3" src={UserImage} alt="avatar" width={65} height={65} />
                                        <InputTextarea value={valueCmtEdit} onKeyDown={(e) => handleKeyDownEdit(e, item1?.IdComment)} onChange={(e) => onchangEditCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                    </div>
                                </div> */}
                            </div>
                        </>
                    )
                }
            })
        )
        // return (<>
        //     {/* Newsfeed Content */}
        //     {/*===================================================*/}
        //     <div className="media-block">
        //         <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>
        //         <div className="media-body">
        //             <div className="mar-btm">
        //                 <a className="btn-link text-semibold media-heading box-inline">Lisa D.</a>
        //                 <p className="text-muted text-sm"> 11 min ago</p>
        //             </div>
        //             <p>consectetuer adipiscing elit, sed diam nonummy n</p>
        //             <div className="pad-ver">
        //                 <div className="btn-group">
        //                     <a className="btn btn-sm btn-default btn-hover-success"><i className="fa fa-thumbs-up" /></a>
        //                     <a className="btn btn-sm btn-default btn-hover-primary">Phản hồi</a>
        //                 </div>
        //             </div>
        //             <hr />
        //             {/* Comments */}
        //             <div>
        //                 <div className="media-block">
        //                     <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar2.png" /></a>
        //                     <div className="media-body">
        //                         <div className="mar-btm">
        //                             <a className="btn-link text-semibold media-heading box-inline">Bobby Marz</a>
        //                             <p className="text-muted text-sm"> 7 min ago</p>
        //                         </div>
        //                         <p>Sed diam nonummy nibh euismod tincidunt ut </p>
        //                         <div className="pad-ver">
        //                             <div className="btn-group">
        //                                 <a className="btn btn-sm btn-default btn-hover-success active"><i className="fa fa-thumbs-up" /> </a>
        //                                 <a className="btn btn-sm btn-default btn-hover-primary">Phản hồi</a>
        //                             </div>
        //                         </div>
        //                         <hr />
        //                     </div>
        //                 </div>
        //                 <div className="media-block">
        //                     <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar3.png" />
        //                     </a>
        //                     <div className="media-body">
        //                         <div className="mar-btm">
        //                             <a className="btn-link text-semibold media-heading box-inline">Lucy Moon</a>
        //                             <p className="text-muted text-sm"> 2 min ago</p>
        //                         </div>
        //                         <p>Duis autem vel eum iriure dolor in hendrerit in vulputate ?</p>
        //                         <div className="pad-ver">
        //                             <div className="btn-group">
        //                                 <a className="btn btn-sm btn-default btn-hover-success"><i className="fa fa-thumbs-up" /></a>
        //                                 <a className="btn btn-sm btn-default btn-hover-primary">Comment</a>
        //                             </div>
        //                         </div>
        //                         <hr />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>)
    }
    return (
        <>
            <div className='row' style={{ backgroundColor: '#ebe8e8' }}>
                <div className='col-3' >
                    <TopicSocialNetwork onChange={data => onChangIdTopic(data)}></TopicSocialNetwork>
                </div>
                <div className='col-9'>
                    <div className="body-status" id="scrollableDiv" ref={divRef}>
                        <LoadingPanel loading={loading}>
                            {
                                dataContent.map((item, index) => (
                                    <>
                                        {index == 0 ? <>
                                            {item?.BT_ADMN == 1 ? <>
                                                <div className='body-content' style={{ marginTop: '-2rem' }}>
                                                    <div className="status-field-container write-post-container" style={{ backgroundColor: '#fff' }}>
                                                        <div className="user-profile-box">
                                                            <div className="user-profile">
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item?.UserImg} /></a>
                                                                {/* <Image style={{ width: '120', height: '120' }} src={item?.UserImg} alt="" /> */}
                                                                <div>
                                                                    <p> {item?.Poster}</p>
                                                                    <small>{renderTime(item?.CreatedAt)}</small>
                                                                </div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                        <div className="status-field">
                                                            <p>
                                                                <div dangerouslySetInnerHTML={{ __html: onChangeImage(item?.Content) }}></div>
                                                            </p>
                                                            {item?.FileName == "" ? <></> : <><a href={item?.FilePath}>{item?.FileName}</a></>}
                                                        </div>
                                                        <div className="post-reaction">
                                                            <div className="activity-icons">
                                                                <div>{renderlikeContent(UserId, item?.IdContent, 0, item?.ListSocialNetworkLike)}&nbsp;{item?.CountLike}</div>
                                                                <div><i className="fa fa-comment" style={{ cursor: 'pointer' }} onClick={() => setcomment0('cmt-' + item?.IdContent)} alt="" />&nbsp;{' ' + item?.CountCMT}</div>
                                                                <div><i className="fa fa-share-alt" style={{ cursor: 'pointer' }} onClick={() => openShare(item?.IdContent)} alt="" />&nbsp;{item?.CountShare}</div>
                                                            </div>
                                                            {/* <div className={comment == ('cmt-0') ? "post-profile-picture" : "hide-cmt post-profile-picture"}>
                                                        <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png" alt="" /> <i className=" fas fa-caret-down" />
                                                    </div> */}
                                                        </div>
                                                        <div style={{ borderTop: '1px solid #959494' }}>
                                                            {/* <div className={"row"} style={{ padding: '10px' }}>
                                                        <div className="col">
                                                            <div className="d-flex flex-start">
                                                                <Image className="rounded-circle shadow-1-strong me-3" src={UserImage} alt="avatar" width={65} height={65} />
                                                                <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, 0, item?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                            {/* {renderCommnet(item?.ListSocialNetworkCMT, item?.IdContent)} */}
                                                            <div className="container bootdey">
                                                                <div className="col-md-12 bootstrap snippets">
                                                                    <div className="panel">
                                                                        <div className="panel-body">
                                                                            {console.log('comment0', comment0)}
                                                                            {console.log('item?.CommentsAllowed', item?.CommentsAllowed)}
                                                                            {item?.CommentsAllowed == 'True' ? <>
                                                                                <div className={comment0 == ('cmt-' + item?.IdContent) ? "" : "hide-cmt"}>
                                                                                    <div className="media-block" style={{ marginTop: '1rem' }}>
                                                                                        <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                                                                        <div className="media-body">
                                                                                            <textarea value={valueCMT0} onKeyDown={(e) => handleKeyDown0(e, 0, item?.IdContent)} onChange={(e) => onchangCMT0(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </> : <></>}
                                                                            {renderCommnet1(item?.ListSocialNetworkCMT, item?.IdContent, item?.IdPoster, item?.CommentsAllowed)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <>
                                                <div className='body-content' style={{ marginTop: '-2rem' }}>
                                                    <div className="status-field-container write-post-container" style={{ backgroundColor: '#fff' }}>
                                                        <div className="user-profile-box">
                                                            <div className="user-profile">
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item?.ImageUserShare} /></a>
                                                                <div>
                                                                    <p> {item?.NameUserShare + ' - ' + item?.NameUnit}<span> <i style={{ fontWeight: 400 }}>{' đã chia sẻ'}</i></span> </p>
                                                                    <small>{renderTime(item?.DateShare)}</small>
                                                                </div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                        <div className="status-field">
                                                            <p>
                                                                <div style={{ marginLeft: '1rem' }} dangerouslySetInnerHTML={{ __html: item?.ContentShare }}></div>
                                                            </p>
                                                        </div>
                                                        <div className="post-reaction" style={{ borderRadius: '5px', border: '2px solid rgb(201 201 201)' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <div className="status-field-container write-post-container" style={{ backgroundColor: '#fff' }}>
                                                                    <div className="user-profile-box">
                                                                        <div className="user-profile">
                                                                            <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item?.UserImg} /></a>
                                                                            <div>
                                                                                <p> {item?.Poster}</p>
                                                                                <small>{renderTime(item?.CreatedAt)}</small>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="status-field">
                                                                        <p>
                                                                            <div dangerouslySetInnerHTML={{ __html: onChangeImage(item?.Content) }}></div>
                                                                        </p>
                                                                        {item?.FileName == "" ? <></> : <><a href={item?.FilePath}>{item?.FileName}</a></>}
                                                                    </div>
                                                                    <div className="post-reaction">
                                                                        <div className="activity-icons">
                                                                            <div>{renderlikeContent(UserId, item?.IdContent, 0, item?.ListSocialNetworkLike)}&nbsp;{item?.CountLike}</div>
                                                                            <div><i className="fa fa-comment" style={{ cursor: 'pointer' }} onClick={() => setcomment0('cmt-' + item?.IdContent)} alt="" />&nbsp;{' ' + item?.CountCMT}</div>
                                                                            <div><i className="fa fa-share-alt" style={{ cursor: 'pointer' }} onClick={() => openShare(item?.IdContent)} alt="" />&nbsp;{item?.CountShare}</div>
                                                                        </div>
                                                                        {/* <div className={comment == ('cmt-0') ? "post-profile-picture" : "hide-cmt post-profile-picture"}>
                                                                    <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png" alt="" /> <i className=" fas fa-caret-down" />
                                                                </div> */}
                                                                    </div>
                                                                    <div style={{ borderTop: '1px solid #959494' }}>
                                                                        {/* <div className={"row"} style={{ padding: '10px' }}>
                                                                    <div className="col">
                                                                        <div className="d-flex flex-start">
                                                                            <img className="rounded-circle shadow-1-strong me-3" src={UserImage} alt="avatar" width={65} height={65} />
                                                                            <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, 0, item?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {renderCommnet(item?.ListSocialNetworkCMT, item?.IdContent)} */}
                                                                        <div className="container bootdey">
                                                                            <div className="col-md-12 bootstrap snippets">
                                                                                <div className="panel">
                                                                                    <div className="panel-body">
                                                                                        {console.log('comment0', comment0)}
                                                                                        {console.log('item?.CommentsAllowed', item?.CommentsAllowed)}
                                                                                        {item?.CommentsAllowed == 'True' ? <>
                                                                                            <div className={comment0 == ('cmt-' + item?.IdContent) ? "" : "hide-cmt"}>
                                                                                                <div className="media-block" style={{ marginTop: '1rem' }}>
                                                                                                    <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                                                                                    <div className="media-body">
                                                                                                        <textarea value={valueCMT0} onKeyDown={(e) => handleKeyDown0(e, 0, item?.IdContent)} onChange={(e) => onchangCMT0(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                        </> : <></>}
                                                                                        {renderCommnet1(item?.ListSocialNetworkCMT, item?.IdContent, item?.IdPoster, item?.CommentsAllowed)}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>}
                                        </> : <>
                                            {item?.BT_ADMN == 1 ? <>
                                                <div className='body-content' style={{ marginTop: '2rem' }}>
                                                    <div className="status-field-container write-post-container" style={{ backgroundColor: '#fff' }}>
                                                        <div className="user-profile-box">
                                                            <div className="user-profile">
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item?.UserImg} /></a>
                                                                {/* <Image style={{ width: '120', height: '120' }} src={item?.UserImg} alt="" /> */}
                                                                <div>
                                                                    <p> {item?.Poster}</p>
                                                                    <small>{renderTime(item?.CreatedAt)}</small>
                                                                </div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                        <div className="status-field">
                                                            <p>
                                                                <div dangerouslySetInnerHTML={{ __html: onChangeImage(item?.Content) }}></div>
                                                            </p>
                                                            {item?.FileName == "" ? <></> : <><a href={item?.FilePath}>{item?.FileName}</a></>}
                                                        </div>
                                                        <div className="post-reaction">
                                                            <div className="activity-icons">
                                                                <div>{renderlikeContent(UserId, item?.IdContent, 0, item?.ListSocialNetworkLike)}&nbsp;{item?.CountLike}</div>
                                                                <div><i className="fa fa-comment" style={{ cursor: 'pointer' }} onClick={() => setcomment0('cmt-' + item?.IdContent)} alt="" />&nbsp;{' ' + item?.CountCMT}</div>
                                                                <div><i className="fa fa-share-alt" style={{ cursor: 'pointer' }} onClick={() => openShare(item?.IdContent)} alt="" />&nbsp;{item?.CountShare}</div>
                                                            </div>
                                                            {/* <div className={comment == ('cmt-0') ? "post-profile-picture" : "hide-cmt post-profile-picture"}>
                                                        <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png" alt="" /> <i className=" fas fa-caret-down" />
                                                    </div> */}
                                                        </div>
                                                        <div style={{ borderTop: '1px solid #959494' }}>
                                                            {/* <div className={"row"} style={{ padding: '10px' }}>
                                                        <div className="col">
                                                            <div className="d-flex flex-start">
                                                                <Image className="rounded-circle shadow-1-strong me-3" src={UserImage} alt="avatar" width={65} height={65} />
                                                                <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, 0, item?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                            {/* {renderCommnet(item?.ListSocialNetworkCMT, item?.IdContent)} */}
                                                            <div className="container bootdey">
                                                                <div className="col-md-12 bootstrap snippets">
                                                                    <div className="panel">
                                                                        <div className="panel-body">
                                                                            {console.log('comment0', comment0)}
                                                                            {console.log('item?.CommentsAllowed', item?.CommentsAllowed)}
                                                                            {item?.CommentsAllowed == 'True' ? <>
                                                                                <div className={comment0 == ('cmt-' + item?.IdContent) ? "" : "hide-cmt"}>
                                                                                    <div className="media-block" style={{ marginTop: '1rem' }}>
                                                                                        <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                                                                        <div className="media-body">
                                                                                            <textarea value={valueCMT0} onKeyDown={(e) => handleKeyDown0(e, 0, item?.IdContent)} onChange={(e) => onchangCMT0(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </> : <></>}
                                                                            {renderCommnet1(item?.ListSocialNetworkCMT, item?.IdContent, item?.IdPoster, item?.CommentsAllowed)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <>
                                                <div className='body-content' style={{ marginTop: '2rem' }}>
                                                    <div className="status-field-container write-post-container" style={{ backgroundColor: '#fff' }}>
                                                        <div className="user-profile-box">
                                                            <div className="user-profile">
                                                                <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item?.ImageUserShare} /></a>
                                                                <div>
                                                                    <p> {item?.NameUserShare + ' - ' + item?.NameUnit}<span> <i style={{ fontWeight: 400 }}>{' đã chia sẻ'}</i></span> </p>
                                                                    <small>{renderTime(item?.DateShare)}</small>
                                                                </div>
                                                            </div>
                                                            <div>
                                                            </div>
                                                        </div>
                                                        <div className="status-field">
                                                            <p>
                                                                <div style={{ marginLeft: '1rem' }} dangerouslySetInnerHTML={{ __html: item?.ContentShare }}></div>
                                                            </p>
                                                        </div>
                                                        <div className="post-reaction" style={{ borderRadius: '5px', border: '2px solid rgb(201 201 201)' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <div className="status-field-container write-post-container" style={{ backgroundColor: '#fff' }}>
                                                                    <div className="user-profile-box">
                                                                        <div className="user-profile">
                                                                            <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={item?.UserImg} /></a>
                                                                            <div>
                                                                                <p> {item?.Poster}</p>
                                                                                <small>{renderTime(item?.CreatedAt)}</small>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="status-field">
                                                                        <p>
                                                                            <div dangerouslySetInnerHTML={{ __html: onChangeImage(item?.Content) }}></div>
                                                                        </p>
                                                                        {item?.FileName == "" ? <></> : <><a href={item?.FilePath}>{item?.FileName}</a></>}
                                                                    </div>
                                                                    <div className="post-reaction">
                                                                        <div className="activity-icons">
                                                                            <div>{renderlikeContent(UserId, item?.IdContent, 0, item?.ListSocialNetworkLike)}&nbsp;{item?.CountLike}</div>
                                                                            <div><i className="fa fa-comment" style={{ cursor: 'pointer' }} onClick={() => setcomment0('cmt-' + item?.IdContent)} alt="" />&nbsp;{' ' + item?.CountCMT}</div>
                                                                            <div><i className="fa fa-share-alt" style={{ cursor: 'pointer' }} onClick={() => openShare(item?.IdContent)} alt="" />&nbsp;{item?.CountShare}</div>
                                                                        </div>
                                                                        {/* <div className={comment == ('cmt-0') ? "post-profile-picture" : "hide-cmt post-profile-picture"}>
                                                                    <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwMzQtZWxlbWVudC0wNi0zOTcucG5n.png" alt="" /> <i className=" fas fa-caret-down" />
                                                                </div> */}
                                                                    </div>
                                                                    <div style={{ borderTop: '1px solid #959494' }}>
                                                                        {/* <div className={"row"} style={{ padding: '10px' }}>
                                                                    <div className="col">
                                                                        <div className="d-flex flex-start">
                                                                            <img className="rounded-circle shadow-1-strong me-3" src={UserImage} alt="avatar" width={65} height={65} />
                                                                            <InputTextarea value={valueCMT} onKeyDown={(e) => handleKeyDown(e, 0, item?.IdContent)} onChange={(e) => onchangCMT(e.target.value)} style={{ width: '95%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></InputTextarea>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {renderCommnet(item?.ListSocialNetworkCMT, item?.IdContent)} */}
                                                                        <div className="container bootdey">
                                                                            <div className="col-md-12 bootstrap snippets">
                                                                                <div className="panel">
                                                                                    <div className="panel-body">
                                                                                        {console.log('comment0', comment0)}
                                                                                        {console.log('item?.CommentsAllowed', item?.CommentsAllowed)}
                                                                                        {item?.CommentsAllowed == 'True' ? <>
                                                                                            <div className={comment0 == ('cmt-' + item?.IdContent) ? "" : "hide-cmt"}>
                                                                                                <div className="media-block" style={{ marginTop: '1rem' }}>
                                                                                                    <a className="media-left"><img className="img-circle img-sm" alt="Profile Picture" src={UserImage} /></a>
                                                                                                    <div className="media-body">
                                                                                                        <textarea value={valueCMT0} onKeyDown={(e) => handleKeyDown0(e, 0, item?.IdContent)} onChange={(e) => onchangCMT0(e.target.value)} style={{ width: '100%', borderRadius: '5px' }} title='Phản hồi' placeholder='Phản hồi...'></textarea>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                        </> : <></>}
                                                                                        {renderCommnet1(item?.ListSocialNetworkCMT, item?.IdContent, item?.IdPoster, item?.CommentsAllowed)}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>}
                                        </>}


                                    </>
                                ))
                            }

                        </LoadingPanel>
                    </div>
                </div>
            </div>
            <ShareSocialNetwork visibleShare={visibleShare} IdContent={idContent} onChange={() => setvisibleShare(false)}></ShareSocialNetwork>
        </>
    )
}
export default SocialNetwork;