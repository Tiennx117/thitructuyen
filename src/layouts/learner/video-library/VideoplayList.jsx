import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import styles from "./style/videoLibrary.module.scss";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import MyUploadForm from "./MyUploadForm";
import ReactPlayer from "react-player";
import { Sidebar } from "primereact/sidebar";
import { Paginator } from "primereact/paginator";
import React, { useEffect, useState, useRef } from "react";
import { videoService } from "services/videoService";
import Search from "layouts/others/components/Search";
import { getCurrentUserDefault } from "shared/utils/getCurrentUserDefault";
import PropTypes from "prop-types";
import "./style/HistoryVideo.scss";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { InputText } from "primereact/inputtext";
import { Image } from 'components/Image';
import { confirmDialogGlobal } from 'shared/components/confirmDialogGlobal';
import FormAddVideoPLYLst from "./FormAddVideoPLYLst";
import VideoPlayItem from "./VideoPlayItem";
import DetailVideoPLY from "./detailVideo/DetailVideoPLY";
const VideoplayList = () => {
  const userDefault = getCurrentUserDefault();
  const [Keysearch, setKeysearch] = useState("");
  const { t } = useTranslation();
  const [videolist, setvideolist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openform, setopenform] = useState(false);
  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 6,
    SortBy: "RECENT",
  });
  const [visibleRight, setVisibleRight] = useState(false);
  const [totalRecordsLst, setTotalRecordsLst] = useState(0);
  const [dataItem, setDataItem] = useState({});
  const [visiblefull, setvisiblefull] = useState(false);
  const [visibleVDIT, setvisibleVDIT] = useState(false);
  const [editCheck, seteditCheck] = useState(false);
  const [valueTitle, setvalueTitle] = useState('');
  const [iDPlaylist, setiDPlaylist] = useState(0);
  const [videoPlyIt, setvideoPlyIt] = useState([]);
  const [iDPlay, setiDPlay] = useState(0);
  const [onDetail, setonDetail] = useState(false);
  const [btnrepeat, setbtnrepeat] = useState('');
  const [indexDT, setindexDT] = useState(0);


  useEffect(() => {
    // call api here
    let _filter = { ...filterBy1 }
    _filter = { ...filterBy1, PageNumber: 1 };
    loadApi(_filter);
  }, [filterBy1, Keysearch]);

  const filterItems = [
    {
      value: "RECENT",
      text: "Gần đây",
    },
    {
      value: "NAMEASC",
      text: "A đến Z",
    },
    {
      value: "NAMEDESC",
      text: "Z đến A",
    },
  ];
  const onChangeFilter = (item) => {
    setfilterBy1({ ...filterBy1, SortBy: item.value, PageNumber: 1 });
  };

  const loadApi = async (filterBy1) => {
    setLoading(true);
    const params = {
      UserID: userDefault.UserId,
      PageNumber: 1,
      RecordsPerPage: filterBy1.RecordsPerPage,
      SortBy: filterBy1.SortBy,
      SeartchText: Keysearch
    };
    let result = await videoService.getvideoplay(params);

    setTotalRecordsLst(result.data?.Recordcount);

    setvideolist(result.data?.PlayListDetailList);

    if (result.data.Recordcount > result.data.RecordsPerPage && result.data.PlayListDetailList.length == 6) {
      setVisibleMore(true);
    }
    else {
      setVisibleMore(false);
    }
    setLoading(false);
  };
  const closeDetail = async () => {
    let _filterBy1 = { ...filterBy1, PageNumber: 1 }
    setfilterBy1(_filterBy1);
    setVisibleRight(false);
    // loadApi(_filterBy1);
  };

  // const clickTitle = (item) => {
  //   setVisibleRight(true);
  //   setDataItem(item);
  // };

  const [visibleMore, setVisibleMore] = useState(false);

  const onShowMore = async () => {
    let videoTemp;
    filterBy1.PageNumber++;
    setfilterBy1(filterBy1);
    const params = {
      UserID: userDefault.UserId,
      PageNumber: filterBy1.PageNumber,
      RecordsPerPage: filterBy1.RecordsPerPage,
      SortBy: filterBy1.SortBy,
      SeartchText: Keysearch
    };
    let result = await videoService.getvideoplay(params);
    if (result.data.PlayListDetailList.length > 0) {
      videoTemp = [...videolist, ...result.data.PlayListDetailList];
      setvideolist(videoTemp);
    }
    if (
      result.data.Recordcount <= result.data.RecordsPerPage ||
      result.data.PageNumber * result.data.RecordsPerPage >=
      result.data.Recordcount
    ) {
      setVisibleMore(false);
    }
  };
  const defaultImg = window.location.origin + "/images/screenshot_1a.png";
  const handleImageError = (event) => {
    event.target.src = defaultImg; // Đường dẫn tới ảnh mặc định
  };

  const addList = () => {
    setvisiblefull(true);
  }

  const subAddList = async (data) => {
    if (data.editCheck) {
      let params = {
        Tilte: data.valueInput,
        VideoplayID: iDPlaylist
      }
      await videoService.updatevideoplay(params);
      let _filterBy1 = { ...filterBy1, PageNumber: 1 }
      loadApi(_filterBy1);
    }
    else {
      let params = {
        Tilte: data.valueInput
      }
      await videoService.addvideoplay(params);
      let _filterBy1 = { ...filterBy1, PageNumber: 1 }
      loadApi(_filterBy1);
    }
    setvisiblefull(false);
  }

  const onDeleteItem = (id) => {
    confirmDialogGlobal({
      message: 'Bạn có chắc chắn muốn xóa danh sách phát?',
      accept: () => deleteItem(id)
    });
  }
  const deleteItem = async (id) => {
    let params = {
      VideoplayID: id
    }
    await videoService.deletevideoplay(params);
    let _filterBy1 = { ...filterBy1, PageNumber: 1 }
    loadApi(_filterBy1);
  }
  const onEditItem = (id, title) => {
    setiDPlaylist(id);
    seteditCheck(true);
    setvalueTitle(title);
    setvisiblefull(true);
  }
  const onClickItem = (data, index) => {
    setonDetail(true);
    setiDPlay(data.VideoplayID)
    setvideoPlyIt(data);
    setvisibleVDIT(true);
    setindexDT(index);

  }
  const startVD = (data, index) => {
    // setonDetail(true);
    setVisibleRight(true);
    setiDPlay(data.VideoplayID)
    setvideoPlyIt(data);
    setindexDT(index);
    setDataItem(data.VideoDetailList[0])

  }
  const onClose = () => {
    setonDetail(false);
    setvisibleVDIT(false)
    let _filterBy1 = { ...filterBy1, PageNumber: 1 }
    loadApi(_filterBy1);
  }
  const onRepeat = (index) => {
    if (btnrepeat != '') {
      setbtnrepeat('');
    }
    else {
      setbtnrepeat('repeat' + index);
    }
  }
  const onRepeatItem = (index) => {
    if (btnrepeat != '') {
      setbtnrepeat('');
    }
    else {
      setbtnrepeat('repeat' + index);
    }
  }
  const rendervideolist = () => {
    return videolist.map((dataItem, index) => {
      let colorRepeat = 'repeat' + index;
      return (
        <div style={{
          width: '29%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2) ',
          borderRadius: '10px', marginRight: '20px', padding: 10, marginLeft: '0.5rem', marginTop: 20
        }} key={index}>
          <Image style={{ width: '90%' }} src="/images/VideoImage.png" onClick={() => onClickItem(dataItem, index)}></Image>
          <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'flex-start', cursor: 'pointer' }}>
            <span style={{ fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} onClick={() => onClickItem(dataItem, index)}>{dataItem.Tilte} ({dataItem.TotalRecords})</span>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: 30 }}>
            <i style={{ fontSize: 24, cursor: 'pointer' }} onClick={() => onEditItem(dataItem.VideoplayID, dataItem.Tilte)} className="fa-solid fa-pen-to-square"></i>
            <i style={{ fontSize: 24, cursor: 'pointer', marginLeft: 20 }} onClick={() => onDeleteItem(dataItem.VideoplayID)} className="fa-regular fa-trash-can"></i>
            {/* <i style={{ fontSize: 24, cursor: 'pointer', color: btnrepeat == colorRepeat ? '#1AA1DC' : '#333' }} onClick={() => onRepeat(index)} className="fa-solid fa-rotate-right"></i> */}
            {dataItem.VideoDetailList.length > 0 &&
              <Button onClick={() => startVD(dataItem, index)} style={{ width: '110px', height: '35px', cursor: 'pointer', borderRadius: 20, marginLeft: 50 }}>
                <i style={{ fontSize: '24px', marginRight: 10 }} className="fa-solid fa-caret-right"></i>
                <span style={{ fontSize: '16px' }}>Phát</span>
              </Button>
            }

          </div>
        </div>
      );
    });
  };
  function keyDown(e) {
    if (e.key == 'Enter') {
      let newText = e.target.value.trim()
      setKeysearch(newText);
    }
  }
  function onKeySearchChange() {
    let newText = ChangeText
    setKeysearch(newText);
  }
  const [ChangeText, onChangeText] = useState("");
  return (
    <>
      <Card className={styles.uploadContainer}>
        <div className="d-flex flex-row justify-content-between">
          <b
            style={{
              color: "black",
              fontSize: "16px",
              fontWeight: "700",
              paddingBottom: "8px",
              width: '250px'
            }}
          >
            DANH SÁCH PHÁT VIDEO
          </b>
          <span
            style={{
              top: "57px",
              float: "left",
              width: "200px",
              height: "4px",
              background: "#f36464",
              position: 'absolute'
            }}
          ></span>
          <div>
            <div className="p-input-icon-right">
              <div className="col-12 md:col-4">
                <div className="p-inputgroup">
                  <InputText
                    onKeyDown={(e) => keyDown(e)}
                    onChange={(e) => onChangeText(e.target.value)}
                    placeholder="Nhập từ khóa tìm kiếm"
                    style={{ width: "400px" }}
                  />
                  <Button
                    style={{ padding: 12, border: 0, color: 'black', background: '#ebebeb' }}
                    onClick={(e) => onKeySearchChange()}
                  >
                    <i style={{ fontWeight: '700' }} className="pi pi-search"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className={classNames("dropdown", styles.sortdropdown)}>
              <DropdownFilter items={filterItems} onChange={onChangeFilter} />
            </div>
          </div>
        </div>

        <div className="mt-3">
          {onDetail
            ?
            <VideoPlayItem
              visiblefull={visibleVDIT}
              closeVisibleIT={() => onClose()}
              dataPlyIt={videoPlyIt}
              iDPlay={iDPlay}
              btnrepeat={btnrepeat != '' ? true : false}
              onRepeatItem={(index) => onRepeatItem(index)}
              indexDT={indexDT}
            >
            </VideoPlayItem>
            :
            <div className="card mb-3" style={{ marginLeft: '-6px' }}>
              <div >
                <Button onClick={() => addList()}
                  style={{ padding: 6, border: 0, color: 'white', background: 'rgb(26, 161, 220)', marginLeft: '0.5rem' }}
                >
                  <i style={{ fontSize: '14px', marginRight: 4 }} className="fa-solid fa-plus"></i>
                  <span>Tạo danh sách phát mới</span>
                </Button>
              </div>
              <div className="d-flex flex-row justify-content-start flex-wrap" style={{ flexWrap: 'wrap !important' }}>
                <LoadingPanel loading={loading}> {rendervideolist()}</LoadingPanel>
              </div>
            </div>
          }
        </div>
        {visibleMore && (
          <div className="loadMoreBtn">
            <a style={{ cursor: 'pointer' }} onClick={() => onShowMore()}>Hiển thị thêm</a>
          </div>
        )}
      </Card>
      <FormAddVideoPLYLst
        valueTitle={valueTitle}
        subAddList={(data) => subAddList(data)}
        visiblefull={visiblefull}
        onclickshow={() => {
          setvisiblefull(false);
          seteditCheck(false);
        }}
        editCheck={editCheck} >
      </FormAddVideoPLYLst>

      <Sidebar
        className="sidebar-header-none"
        visible={visibleRight}
        onHide={() => {
          closeDetail();
        }}
        position="right"
        style={{ width: "80%" }}
      >
        {
          <>
            <Button
              style={{ position: "absolute", right: "0" }}
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary p-button-text"
              aria-label="Cancel"
              onClick={() => {
                closeDetail();
              }}
            />
            <DetailVideoPLY iDPlay={iDPlay} dataObj={dataItem} version="v1" btnrepeat={btnrepeat} />
          </>
        }
      </Sidebar>



    </>
  );
};
export default VideoplayList;
