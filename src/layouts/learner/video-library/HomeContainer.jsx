import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import styles from "./style/videoLibrary.module.scss";
import { videoService } from "services/videoService";
import DetailVideo from "./detailVideo/detailVideo";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect, useState, useRef } from "react";
import "./style/HomeContainer.scss";
import VideoNoiBat from "./VideoNoiBat";
import { InputText } from "primereact/inputtext";
import { useSelector, useDispatch } from "react-redux";
import { setListChannel } from "store/listchannel/listChannelSlice";
import ListVideoChannel from "./ListVideoChannel";
import { useLocation } from "react-router-dom";
import VideoTatCa from "./VideoTatCa";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
const HomeContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [filterCha, setfilterCha] = useState('RECENT')
  const [detailVD, setdetailVD] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [idItem, setidItem] = useState("");
  const [showRight, setShowRight] = useState(false);
  const [calloneDetail, setcalloneDetail] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [ChangeText, onChangeText] = useState("");
  const [check, setcheck] = useState(false);
  const [onReset, setonReset] = useState(false);
  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 10,
    SortBy: "RECENT",
  });
  useEffect(() => {
    // call api here
    if (lastSegment !== "video-library" && lastSegment !== "null" && lastSegment !== "home") {
      loadApiDetails(lastSegment);
    }
  }, [lastSegment]);
  const loadApiDetails = async (datalocation) => {
    let paramApiDetails = {
      VideoChannelId: "null",
      VideoURLFRL: datalocation,
      PageNumber: 1,
      RecordsPerPage: 10,
    };
    let result = await videoService.getvideourlfrlplaydetails(paramApiDetails);
    setDataItem(result.data);
    setcheck(false)
    setdetailVD(true);
    setVisibleRight(true);
  };
  //const[filter,setfilter]=useState('Gần đây')
  useEffect(() => {
    // call api here
    loadApi(filterBy1);
  }, [filterBy1]);
  function closeDetail() {
    if (detailVD == true) {
      setVisibleRight(false);
      loadApi(filterBy1);
    } else {
      // window.location.href = appSetting.ADMIN_URL + "/collaborate/briefcase";
      setVisibleRight(false);
      loadApi(filterBy1);
    }
  }
  const [Keysearch, setKeysearch] = useState("");
  const loadApi = async (value) => {
    // let result4 = await videoService.getchannelnamelist();
    //dispatch(setListChannel(result4.data.channelLst));
  };

  const ClickTitle = (item) => {
    setcheck(false)
    setdetailVD(true);
    setVisibleRight(true);
    setDataItem(item);
  };
  function onKeySearchChange() {
    let newText = ChangeText
    setKeysearch(newText);
    setonReset(!onReset);
  }
  function keyDown(e) {
    if (e.key == 'Enter') {
      let newText = e.target.value.trim()
      setKeysearch(newText);
      setonReset(!onReset);
      //setAdvanceSearch({ ...advanceSearch, searchBy: newText });
    }
  }

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
    setfilterCha(item.value);
  };

  return (
    <>
      {showRight == false ? (
        <Card>
          <div className="mb-5 slickAlignLeft">
            <div
              className={classNames(
                "d-flex flex-row justify-content-between",
                styles.titleHead
              )}
            >
              <b
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                THƯ VIỆN VIDEO
              </b>
              <span
                style={{
                  top: "57px",
                  float: "left",
                  width: "130px",
                  height: "4px",
                  background: "#f36464",
                  position: 'absolute'
                }}
              ></span>
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
              <div className={classNames("dropdown", styles.sortdropdown)}>
                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
              </div>
            </div>

            <div style={{ paddingTop: "25px" }} className="mt-2 slickAlignLeft">
              <VideoNoiBat
                Keysearch={Keysearch}
                check={check}
                onClickTitle={(it) => ClickTitle(it)}
                filterCha={filterCha}
                onReset = {onReset}
              />
              <VideoTatCa
                filterCha={filterCha}
                Keysearch={Keysearch}
                check={check}
                onReset = {onReset}
                onClickTitle={(it) => ClickTitle(it)} />
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <ListVideoChannel
            idChannel={idItem}
            subcribeStatus={true}
          ></ListVideoChannel>
        </Card>
      )}

      <Sidebar
        className="sidebar-header-none"
        visible={visibleRight}
        onHide={() => {
          closeDetail(), setcheck(true);
        }}
        position="right"
        style={{ width: "70%" }}
      >
        {
          <>
            <Button
              style={{ position: "absolute", right: "0" }}
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary p-button-text"
              aria-label="Cancel"
              onClick={() => {
                closeDetail(), setcheck(true);
              }}
            />
            <DetailVideo dataObj={dataItem} version="v1" />
          </>
        }
      </Sidebar>
    </>
  );
};
export default HomeContainer;
