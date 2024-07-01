import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { catalogueService } from 'services/catalogueService';
import { Sidebar } from 'primereact/sidebar';
import LearningDetailContainer from './LearningDetailContainer';
import { LoadingPanel } from '../../../components/loader-ui/LoadingPanel';
import DropdownFilter from '../my-learning/DropdownFilter';
import { CourseItemV2 } from '../my-learning/CourseItemV2';
import './style/MultiSelect.scss';
import './style/catalogue.scss';

const PublicCourseByTopicContainer = (props) => {
    const [loading, setLoading] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [courseType, setCourseType] = useState("");
    const [visibleRight, setVisibleRight] = useState(false);
    const [publicCourseByTopicItems, setPublicCourseByTopicItems] = useState([]);
    const [Keysearch, setKeysearch] = useState("");

    const [filterBy1, setfilterBy1] = useState({
        sortOrder: "DESC",
        filterBy: "",
        pageNumber: 1,
        pageSize: 12,
        sortBy: "DT_STRT_DT",
        searchBy: "",
        customFilterBy: {
            keywords: [],
            topics: [],
            learningTypes: ["0"],
            creditHrs: 0,
            ratings: ""
        },
        topicId: props.topicID ? props.topicID : 0,
        registered: 0
    });

    useEffect(() => {

        let _filter = { ...filterBy1 }
        _filter = { ...filterBy1, pageNumber: 1 };
        loadApi(_filter);
    }, [filterBy1, Keysearch, props.topicID])

    const [visibleMore, setVisibleMore] = useState(false);
    const onShowMore = async () => {
        let dataTemp;
        filterBy1.pageNumber++;
        setfilterBy1(filterBy1);
        const params = {
            sortOrder: filterBy1.sortOrder,
            filterBy: filterBy1.filterBy,
            pageNumber: filterBy1.pageNumber,
            pageSize: filterBy1.pageSize,
            sortBy: filterBy1.sortBy,
            searchBy: Keysearch,
            customFilterBy: {
                keywords: [],
                topics: [],
                learningTypes: ["0"],
                creditHrs: 0,
                ratings: ""
            },
            topicId: props.topicID ? props.topicID : 0,
            registered: filterBy1.registered
        }
        let result = await catalogueService.getpubliccoursesbytopic(params);
        //xem thêm
        if (result.data.totalRecords <= result.data.pageSize || result.data.totalRecords <= result.data.pageSize * result.data.pageNumber) {
            setVisibleMore(false);
        }
        if (result.data.publicCourseByTopicItems.length > 0) {
            dataTemp = [...publicCourseByTopicItems, ...result.data.publicCourseByTopicItems]
            setPublicCourseByTopicItems(dataTemp)
        }
    }

    const loadApi = async (body) => {
        setLoading(true);
        const params = {
            sortOrder: body.sortOrder,
            filterBy: body.filterBy,
            pageNumber: body.pageNumber,
            pageSize: body.pageSize,
            sortBy: body.sortBy,
            searchBy: Keysearch,
            customFilterBy: {
                keywords: [],
                topics: [],
                learningTypes: ["0"],
                creditHrs: 0,
                ratings: ""
            },
            topicId: props.topicID ? props.topicID : 0,
            registered: body.registered
        }
        let result = await catalogueService.getpubliccoursesbytopic(params)
        setPublicCourseByTopicItems(result.data.publicCourseByTopicItems);

        if (result.data.totalRecords > result.data.pageSize && result.data.publicCourseByTopicItems.length == body.pageSize) {
            setVisibleMore(true);
        }
        else {
            setVisibleMore(false);
        }

        setLoading(false);
    }


    const onClickTitleIner = async (data) => {
        props.onClickTitle(data);
        if (data.LearningType === "T") {
            setCourseId(data.ILTID);
            setCourseType(data.LearningType);
        } else {
            setCourseId(data.CourseID);
            setCourseType(data.LearningType);
        }
        setVisibleRight(true);
    }

    const filterStatus = [
        {
            value: 0,
            text: 'Tất cả'
        },
        {
            value: 2,
            text: 'Chưa đăng ký'
        },
        {
            value: 1,
            text: 'Đã đăng ký'
        }

    ]

    const onChangeFilterStatus = (item) => {
        filterBy1.registered = item.value ? item.value : null;
        filterBy1.pageNumber = 1;
        setfilterBy1({ ...filterBy1, registered: item.value ? item.value : null, pageNumber: 1 });
    }

    const filterItems = [
        {
            value: 'DT_STRT_DT',
            text: 'Gần đây'
        },
        {
            value: 'DT_END_DT',
            text: 'Ngày kết thúc'
        },
        {
            value: 'VC_ILT_CRS_LNCH_NM',
            text: 'A đến Z'
        },
        {
            value: 'VC_ILT_CRS_LNCH_NM',
            text: 'Z đến A'
        },
        {
            value: 'VIEW_COUNT',
            text: 'Lượt xem'
        },
        {
            value: 'NM_AVG_RTNG',
            text: 'Đánh giá'
        }

    ]

    const onChangeFilter = (item) => {
        let sortOd;
        switch (item.text) {
            case "Gần đây":
                filterBy1.sortOrder = 'DESC';
                sortOd = 'DESC';
                break;
            case "A đến Z":
                filterBy1.sortOrder = 'ASC';
                sortOd = 'ASC';
                break;
            case "Z đến A":
                filterBy1.sortOrder = 'DESC';
                sortOd = 'DESC';
                break;
            case "Ngày kết thúc":
                if(filterBy1.sortBy == item.value && filterBy1.sortOrder == 'ASC')
                {
                    sortOd = 'DESC';
                    filterBy1.sortOrder = 'DESC';
                }
                else
                {
                    sortOd = 'ASC';
                    filterBy1.sortOrder = 'ASC';
                }
                break;
            case "Lượt xem":
                if(filterBy1.sortBy == item.value && filterBy1.sortOrder == 'DESC')
                {
                    sortOd = 'ASC';
                    filterBy1.sortOrder = 'ASC';
                }
                else
                {
                    sortOd = 'DESC';
                    filterBy1.DESC = 'DESC';
                }
                break;
            case "Đánh giá":
                if(filterBy1.sortBy == item.value && filterBy1.sortOrder == 'DESC')
                {
                    sortOd = 'ASC';
                    filterBy1.sortOrder = 'ASC';
                }
                else
                {
                    sortOd = 'DESC';
                    filterBy1.DESC = 'DESC';
                }
                break;
        }
        filterBy1.sortBy = item.value;
        filterBy1.pageNumber = 1;
        setfilterBy1({ ...filterBy1, sortBy: item.value, pageNumber: 1, sortOrder: sortOd });
        //onSubmit(filter);
    }

    const [ChangeText, onChangeText] = useState("");
    function keyDown(e) {
        if (e.key == 'Enter') {
            let newText = e.target.value.trim()
            setKeysearch(newText);
            if(newText == Keysearch){
                loadApi(filterBy1); // Nếu text search không thay đổi thì sẽ call lại search
            }
        }
    }
    function onKeySearchChange(textSearch) {
        let newText = textSearch.trim()

        setKeysearch(newText);


    }

    function closeDetail() {
        setVisibleRight(false);
        loadApi(filterBy1)
    }

    const onReSet = (e) => {
        onChangeText('')
    }


    const [value, setValue] = useState('')
    return (
        <>
            <div style={{ padding: '0.5rem 1rem' }}>
                <div className='d-flex justify-content-between card-title-reponsive' style={{ marginBottom: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <b className='font-size-tieude' style={{ color: 'black' }}>
                            {(props.title != '' && props.title != null) ? props.title : ''}

                        </b>
                        <span className='bottom-title-learning learning-public'></span>
                    </div>

                    <div className='d-flex flex-row justify-content-end align-items-center' >
                        <span className='d-flex flex-row border-end' style={{ marginRight: '10px', alignItems: 'center' }}>
                            <span className='d-flex align-self-center'>
                                <i className='pi pi-filter' style={{ marginRight: '-10px' }} />
                            </span>
                            <div style={{}}>
                                <DropdownFilter items={filterStatus} onChange={onChangeFilterStatus} />
                            </div>
                        </span>

                        <span className='d-flex flex-row justify-content-end'>
                            <span className='d-flex align-self-center' style={{ marginRight: '-10px' }}>
                                BỞI
                            </span>
                            <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                        </span>
                    </div>
                </div>
                <span className='d-flex flex-row justify-content-start mb-2'>
                    <div className="input-field">
                        <input value={value} className="search-box" id="topicSearch" type="text" onKeyDown={(e) => keyDown(e)} onChange={(e) => { setValue(e.target.value) }} placeholder="Tìm kiếm dựa trên Tên / Mô tả / Chủ đề / Từ khoá / Mã khoá học / Nội dung" />
                        {/* <input className="search-box-responsive" id="topicSearch-responsive" type="text" onKeyDown={(e) => keyDown(e)} onChange={(e) => setValue('searchBy', e.target.value)} placeholder="Tìm kiếm" /> */}
                        {/* <button className="close-icon" type="reset" onClick={() => onReSet()} /> */}
                        <button className="search-icon" icon="pi pi-search" onClick={(e) => onKeySearchChange()} />
                    </div>
                </span>

                <LoadingPanel loading={loading}>
                    <div className="card-deck card-small-device" style={{ flexWrap: 'wrap !important', marginLeft: '-3px' }}>
                        {publicCourseByTopicItems.map((dataItem, index) => {
                            return (<CourseItemV2 isMyLearning={false} onClickTitle={(data) => onClickTitleIner(data)} key={index} dataItem={dataItem} />)
                        })}
                        <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                            {
                                <>
                                    <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                                    <LearningDetailContainer isMyLearning={false} idCourse={courseId} nameCourseType={courseType} isCatalogue={true} />
                                </>
                            }
                        </Sidebar>
                    </div>
                </LoadingPanel>
                <div>
                    {publicCourseByTopicItems == '' ? <div className='no-more-responsive'><span className='mt-4'>Không có mục nào để hiển thị.</span></div> : ''}
                    {
                        visibleMore &&
                        <div className="d-flex justify-content-end" style={{ right: '20px', left: '20px' }}>
                            <Button className='btn-showmore' label="Xem nhiều hơn" onClick={onShowMore} style={{ backgroundColor: 'white', color: '#1aa1dc', borderColor: 'white' }} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

PublicCourseByTopicContainer.defaultProps = {
    onChange: () => { },
    onClickTitle: () => { }
}

PublicCourseByTopicContainer.propTypes = {
    topicID: PropTypes.number,
    idCourse: PropTypes.number,
    tabIndex: PropTypes.number,
    nameCourseType: PropTypes.string,
    onChange: PropTypes.func,
    onClickTitle: PropTypes.func
};
export default PublicCourseByTopicContainer;