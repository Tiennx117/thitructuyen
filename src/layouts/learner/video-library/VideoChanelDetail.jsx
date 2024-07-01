import { Card } from "primereact/card"
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import styles from './style/videoLibrary.module.scss';

import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import { videoService } from "services/videoService";
import { Paginator } from "primereact/paginator";
import DetailVideo from './detailVideo/detailVideo'
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState, useRef } from 'react';
import './style/HomeContainer.scss';
import VideoYeuThich from "./VideoYeuThich";
import LichSuVideo from "./LichSuVideo";
import VideoTopChannel from "./VideoTopChannel";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
const VideoChanelDetail = () => {
    const [lstfavoritevideos, setlstfavoritevideos] = useState([]);
    const [libraryhistoryvideolist, setlibraryhistoryvideolist] = useState([]);
    const [topchannelslst, settopchannelslst] = useState([]);
    const [visibleRight, setVisibleRight] = useState(false);
    const [dataItem, setDataItem] = useState({})
    const [dataTitle, setdataTitle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterBy1, setfilterBy1] = useState({
        PageNumber: 1,
        RecordsPerPage: 10,
        SortBy: "RECENT",
    });
    const [basicFirst, setBasicFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0)
    //const[filter,setfilter]=useState('Gần đây')
    useEffect(() => {
        // call api here
        loadApi(filterBy1);
    }, [filterBy1]);
    // useEffect(() => {
    //     filterCourse(filterBy1);
    // }, [filterBy1]);
    function closeDetail() {
        setVisibleRight(false);
        loadApi(filterBy1);
    }
    const onBasicPageChange = (event) => {
        if (event.first > 0) {
            let filterBy2 = { ...filterBy1, PageNumber: (event.first / 10) + 1 }
            setfilterBy1(filterBy2)
        }
        else {
            let filterBy2 = { ...filterBy1, PageNumber: 1 }
            setfilterBy1(filterBy2)
        }
        setBasicFirst(event.first);
    };
    const loadApi = async (value) => {
        //
        setLoading(true)
        let result = await videoService.getVideoList(value);
        let result5 = await videoService.videolibraryhistoryvideolist(value);
        let result2 = await videoService.getfavoritevideos(value);
        let result3 = await videoService.gettopchannels(value);
        settopchannelslst(result3.data.ChannelList);
        setlstfavoritevideos(result2.data.VideoDetailList);
        setlibraryhistoryvideolist(result5.data.VideoDetailList);
        setdataTitle(result.data?.VideoDetailList);
        setTotalRecords(result.data?.TotalRecords);
        setLoading(false);

    }

    const filterItems = [
        {
            value: 'RECENT',
            text: 'Gần đây'
        },
        {
            value: 'NAMEASC',
            text: 'A đến Z'
        },
        {
            value: 'NAMEDESC',
            text: 'Z đến A'
        }
    ]

    // const filterCourse = async (value) => {
    //     setLoading(true);
    //     let result2 = await videoService.getfavoritevideos(value);
    //     setlstfavoritevideos(result2.data.VideoDetailList);
    //     setLoading(false);
    // }
    const onChangeFilter = (item) => {
        setfilterBy1({ ...filterBy1, SortBy: item.value });
    }
    const rendertime = (value) => {
        let countDownDate = new Date(value).getTime();
        let now = new Date().getTime();
        let distance = now - countDownDate;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        return days
    }
    const clickTitle = (item) => {
        debugger;
        setVisibleRight(true)
        setDataItem(item)
    }
    const onClickSortList = (sortBy) => {
        let filterBy2 = { ...filterBy1, SortBy: sortBy }
        setfilterBy1(filterBy2)
        loadApi(filterBy2);
    }

    return (
        <>
            <Card title="Video channel">
                <div className="mb-5">
                    <div className={classNames("flex-row d-flex justify-content-end", styles.titleHead)}>
                        <div className="d-flex flex-row">
                            <div className={classNames("dropdown", styles.sortdropdown)}>
                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                            </div>

                        </div>

                    </div>
                    <hr></hr>

                    <div >
                        <VideoTopChannel lstvideo={topchannelslst} />
                    </div>

                </div>
            </Card>

            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right' style={{ width: '70%' }}>
                {
                    <>
                        <Button style={{ position: 'absolute', right: '0' }} icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <DetailVideo dataObj={dataItem} />
                    </>
                }
            </Sidebar>


        </>
    )
}
export default VideoChanelDetail;