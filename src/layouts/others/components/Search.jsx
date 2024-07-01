import './search.scss';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from '../../learner/components/LearningDetailContainer';
import { globalSearchService } from 'services/globalSearchService';
import { Image } from 'components/Image';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import DetailVideo from 'layouts/learner/video-library/detailVideo/detailVideo';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [courseType, setCourseType] = useState("");
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleRightVideo, setvisibleRightVideo] = useState(false);
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [isMyLearning, setIsMyLearning] = useState(true);
    const [isNodeClick, setIsNodeClick] = useState(false);

    const [learningData, setLearningData] = useState({
        SearchItems: []
    });
    const [conversationData, setConversationData] = useState({
        SearchItems: []
    });
    const [surveyData, setSurveyData] = useState({
        SearchItems: []
    });
    const [videoData, setVideoData] = useState({
        SearchItems: []
    });

    const [learningRecords, setLearningRecords] = useState(0);
    const [conversationRecords, setConversationRecords] = useState(0);
    const [surveyRecords, setSurveyRecords] = useState(0);
    const [videoRecords, setVideoRecords] = useState(0);

    const [learningNo, setLearningNo] = useState("");
    const [conversationNo, setConversationNo] = useState("");
    const [surveyNo, setSurveyNo] = useState("");
    const [videoNo, setVideoNo] = useState("");

    const [keysearch, setKeySearch] = useState("");
    const [dataVideo, setDataVideo] = useState({})
    const defaultValues = {
        keysearch: ''
    }

    const { register, control, formState: { errors }, handleSubmit, reset, watch, getValues, setValue } = useForm({
        defaultValues: defaultValues
    });

    useEffect(() => {
        // Kiểm tra xem có từ khóa trong sessionStorage không
        const storedSearchTerm = sessionStorage.getItem('searchTerm');
        if (storedSearchTerm) {
            setKeySearch(storedSearchTerm);
            loadApi(storedSearchTerm);

            // Xóa từ khóa sau khi lấy nó để tránh render lại
            sessionStorage.removeItem('searchTerm');
        }
    }, []);

    function openLearning(data) {
        setVisibleRight(true);
        setActiveIndex1(0);
        setId(data.ItemId);
        setCourseType(data.CourseType);
        //CatalogueCourse -> LearningModule == "A", MyLearning -> "M", TrainingHistory -> "H"
        if (data.LearningModule == "A") {
            setIsMyLearning(false)
            setIsNodeClick(false)
        } else {
            setIsMyLearning(true)
            setIsNodeClick(true)
        }

    };
    function openVideo(data) {
        setvisibleRightVideo(true);
        let dataItem = { VideoId: data?.ItemId }
        setDataVideo(dataItem)

    };
    function closeDetailVideo() {
        setvisibleRightVideo(false);
    }
    function closeDetail() {
        setVisibleRight(false);
    }



    function keyDown(e) {
        if (e.key == 'Enter') {
            setKeySearch(e.target.value);
            loadApi(keysearch);
        }
    }

    function onKeySearchChange(text) {
        setKeySearch(text);
    }

    const loadApi = async (key) => {
        setLoading(true);
        let learningResult = await globalSearchService.getglobalsearchdata(key, "L");
        setLearningData(learningResult.data);
        setLearningRecords(learningResult.data.TotalRecords);

        if (learningResult.data.TotalRecords == 0) {
            setLearningNo('Không có bản ghi phù hợp.');
        }

        let conversationResult = await globalSearchService.getglobalsearchdata(key, "D");
        setConversationData(conversationResult.data);
        setConversationRecords(conversationResult.data.SearchItems.length);

        if (conversationResult.data.SearchItems.length == 0) {
            setConversationNo('Không có bản ghi phù hợp.');
        }

        let surveyResult = await globalSearchService.getglobalsearchdata(key, "S");
        setSurveyData(surveyResult.data);
        setSurveyRecords(surveyResult.data.SearchItems.length);

        if (conversationResult.data.SearchItems.length == 0) {
            setSurveyNo('Không có bản ghi phù hợp.');
        }

        let videosResult = await globalSearchService.getglobalsearchdata(key, "V");
        setVideoData(videosResult.data);
        setVideoRecords(videosResult.data.SearchItems.length);

        if (conversationResult.data.SearchItems.length == 0) {
            setVideoNo('Không có bản ghi phù hợp.');
        }
        setLoading(false);
    }

    const onSubmit = async (key) => {
        //setKeySearch(key);
        learningList(keysearch);
        loadApi(keysearch);
    }

    const learningList = async (keysearch) => {
        let learningResult = await globalSearchService.getglobalsearchdata(keysearch, "L");
        setLearningData(learningResult.data);
        setLearningRecords(learningResult.data.TotalRecords);
    }

    const ranges = [{
        divider: 1E3,
        suffix: 'K'
    }, {
        divider: 1E6,
        suffix: 'M'
    }, {
        divider: 1E9,
        suffix: 'B'
    }];

    function formatNumber(input) {
        if (input != null && input != undefined && input != "") {
            for (let index = ranges.length - 1; index >= 0; index--) {
                if (input > ranges[index].divider) {
                    let quotient = input / ranges[index].divider;

                    if (quotient < 10) {
                        quotient = Math.floor(quotient * 10) / 10;
                    } else {
                        quotient = Math.floor(quotient);
                    }
                    return quotient.toString() + ranges[index].suffix;
                }
            }
            return input.toString();
        } else {
            return 0;
        }
    }

    return (
        <>
            <div className='card' >
                <div className="content-header">
                    <div className="input-group">
                        <InputText autoFocus value={keysearch} style={{ minWidth: '200px' }} onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} placeholder="Tìm kiếm tất cả khóa học" />
                        <Button className="pi pi-search" style={{ padding: '0.5rem 0.5rem' }} onClick={e => onSubmit(e.target.value)} ></Button>
                    </div>
                </div>
                <div className='content-body'>
                    <div className='text-result mb-2'>Có <span>{learningRecords + conversationRecords + surveyRecords + videoRecords}</span> kết quả được tìm thấy... <span><i></i></span></div>
                    <div>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-learning-tab" data-bs-toggle="pill" data-bs-target="#pills-learning" type="button" role="tab" aria-controls="pills-learning" aria-selected="true" onClick={(e) => keyDown(e)}>HỌC TẬP ({learningRecords})</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-surveying-tab" data-bs-toggle="pill" data-bs-target="#pills-surveying" type="button" role="tab" aria-controls="pills-surveying" aria-selected="false" onClick={(e) => keyDown(e)}>KHẢO SÁT ({surveyRecords})</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-conversation-tab" data-bs-toggle="pill" data-bs-target="#pills-conversation" type="button" role="tab" aria-controls="pills-conversation" aria-selected="false" onClick={(e) => keyDown(e)}>CUỘC TRÒ CHUYỆN ({conversationRecords})</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-video-tab" data-bs-toggle="pill" data-bs-target="#pills-video" type="button" role="tab" aria-controls="pills-video" aria-selected="false" onClick={(e) => keyDown(e)}>VIDEO ({videoRecords})</button>
                            </li>
                        </ul>
                        <LoadingPanel loading={loading} >
                            <div className="tab-content overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }} id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-learning" role="tabpanel" aria-labelledby="pills-learning-tab">
                                    {
                                        learningRecords == 0 ?
                                            <div className="ad-search-box" >
                                                Không có bản ghi phù hợp.
                                            </div>
                                            :
                                            <div>
                                                {learningData.SearchItems.map((item, index) => (
                                                    <div key={index} className="ad-search-box" >
                                                        <div className="ad-search-box-top">
                                                            <span className="left-text">{item.ItemHeader}</span>
                                                            <span className="right-text">Được tạo vào {item.CreatedDate}</span>
                                                        </div>
                                                        <div className="ad-search-box-mid d-flex flex-column">
                                                            <div className='d-flex flex-row'>
                                                                <div className="left-user" style={{ width: '50%' }}>
                                                                    <Image alt="Icon" className="icon-left" src={item.Image} />
                                                                    <div className="text"> {item.ItemType}</div>
                                                                </div>
                                                                <div className='d-flex justify-content-end' style={{ width: '100%' }}>
                                                                    <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>
                                                                        <i className="pi pi-eye" style={{ marginRight: '3px', verticalAlign: 'middle' }}></i>
                                                                        {formatNumber(item.ViewCount)}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <a className="block-section" onClick={() => openLearning(item)}>
                                                                    <div className='d-flex flex-row'>
                                                                        <div className="heading"><div dangerouslySetInnerHTML={{ __html: item.Tittle }}></div></div>
                                                                        <div className='col-4 heading-right'>{item.LearningFlag}</div>
                                                                    </div>
                                                                    <div className="description">
                                                                        <i>{item.Description ? item.Description : "Không có mô tả."}</i>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                    }
                                </div>
                                <div className="tab-pane fade" id="pills-conversation" role="tabpanel" aria-labelledby="pills-conversation-tab">
                                    {
                                        conversationRecords == 0 ?
                                            <div className="ad-search-box" >
                                                Không có bản ghi phù hợp.
                                            </div>
                                            :
                                            <div>
                                                {conversationData.SearchItems.map((item, index) => (
                                                    <div key={index} className="ad-search-box" >
                                                        <div className="ad-search-box-top">
                                                            <span className="left-text">{item.ItemHeader}</span>
                                                            <span className="right-text">Được tạo vào {item.CreatedDate}</span>
                                                        </div>
                                                        <div className="ad-search-box-mid d-flex flex-column">
                                                            <div className="left-user">
                                                                <Image alt="Icon" className="icon-left" src={item.Image} />
                                                                <span className="text"> {item.ItemType}</span>
                                                            </div>
                                                            <div>
                                                                <Link to={{ pathname: '/collaborate/conversation', search: "?id=" + item.ItemId }} className='fsx-14px'>
                                                                    <a className="block-section">
                                                                        <div className='d-flex flex-row'>
                                                                            <div className="heading">{item.Tittle}</div>
                                                                            {/* <div className='col-1 heading-right'>Đã gán</div> */}
                                                                        </div>
                                                                        <div className="description">
                                                                            <i>{item.Description ? item.Description : "Không có mô tả."}</i>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                    }
                                </div>
                                <div className="tab-pane fade" id="pills-surveying" role="tabpanel" aria-labelledby="pills-surveying-tab">
                                    {
                                        surveyRecords == 0 ?
                                            <div className="ad-search-box" >
                                                Không có bản ghi phù hợp.
                                            </div>
                                            :
                                            <div>
                                                {surveyData.SearchItems.map((item, index) => (
                                                    <div key={index} className="ad-search-box" >
                                                        <div className="ad-search-box-top">
                                                            <span className="left-text">{item.ItemHeader}</span>
                                                            <span className="right-text">Được tạo vào {item.CreatedDate}</span>
                                                        </div>
                                                        <div className="ad-search-box-mid d-flex flex-column">
                                                            <div className="left-user">
                                                                <Image alt="Icon" className="icon-left" src={item.Image} />
                                                                <span className="text"> {item.ItemType}</span>
                                                            </div>
                                                            <div>
                                                                <Link to={{ pathname: '/collaborate/survey', search: "?id=" + item.ItemId }} className='fsx-14px'>
                                                                    <a className="block-section">
                                                                        <div className='d-flex flex-row'>
                                                                            <div className="heading">{item.Tittle}</div>
                                                                            <div className='col-1 heading-right'>{item.LearningFlag}</div>
                                                                        </div>
                                                                        <div className="description">
                                                                            <i>{item.Description ? item.Description : "Không có mô tả."}</i>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                    }
                                </div>
                                <div className="tab-pane fade" id="pills-video" role="tabpanel" aria-labelledby="pills-video-tab">
                                    {
                                        videoRecords == 0 ?
                                            <div className="ad-search-box" >
                                                Không có bản ghi phù hợp.
                                            </div>
                                            :
                                            <div>
                                                {videoData.SearchItems.map((item, index) => (
                                                    <div key={index} className="ad-search-box" >
                                                        <div className="ad-search-box-top">
                                                            <span className="left-text">{item.ItemHeader}</span>
                                                            <span className="right-text">Được tạo vào {item.CreatedDate}</span>
                                                        </div>
                                                        <div className="ad-search-box-mid d-flex flex-column">
                                                            <div className='d-flex flex-row'>
                                                                <div className="left-user" style={{ width: '50%' }}>
                                                                    <Image alt="Icon" className="icon-left" src={item.Image} />
                                                                    <div className="text"> {item.ItemType}</div>
                                                                </div>
                                                                <div className='d-flex justify-content-end' style={{ width: '100%' }}>
                                                                    <span className="fsx-10px p-2" style={{ backgroundColor: 'white', color: 'black', border: 'none', fontSize: '20' }}>
                                                                        <i className="pi pi-eye" style={{ marginRight: '3px', verticalAlign: 'middle' }}></i>
                                                                        {formatNumber(item.ViewCount)}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <a className="block-section" onClick={() => openVideo(item)}>
                                                                    <div className='d-flex flex-row'>
                                                                        <div className="col-9 heading">{item.Tittle}</div>
                                                                        <div className='col-3 heading-right'>{item.LearningFlag == "" ? "Chưa đăng ký" : item.LearningFlag}</div>
                                                                    </div>
                                                                    <div className="description">
                                                                        <i dangerouslySetInnerHTML={{ __html: item.Description ? item.Description : "Không có mô tả." }}></i>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                    }
                                </div>
                            </div>
                        </LoadingPanel>
                    </div>
                    <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                <LearningDetailContainer tabIndex={activeIndex1} idCourse={id} nameCourseType={courseType} isMyLearning={isMyLearning} isNodeClick={isNodeClick} /></>
                        }
                    </Sidebar>
                    <Sidebar className='sidebar-header-none' visible={visibleRightVideo} onHide={() => closeDetailVideo()} position='right' style={{ width: '70%' }}>
                        {
                            <>
                                <Button style={{ position: 'absolute', right: '10px', zIndex: '9' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetailVideo()} />
                                <DetailVideo dataObj={dataVideo} version='v1' />
                            </>
                        }
                    </Sidebar>
                </div>
            </div>
        </>
    )
}

export default Search;