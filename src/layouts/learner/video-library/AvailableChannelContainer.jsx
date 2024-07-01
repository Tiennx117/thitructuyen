import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { classNames } from "primereact/utils";
import styles from "./style/AvailableChannel.scss";
import "./style/AvailableChannel.scss";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import React, { useEffect, useState, useRef } from "react";
import { videoService } from "services/videoService";
import { Paginator } from "primereact/paginator";
import AvailableChannelListChannel from "./AvailableChannelListChannel";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ListVideoChannel from "./ListVideoChannel";
const AvailableChannelContainer = () => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const [Keysearch, setKeysearch] = useState("");

  const [filterBy1, setfilterBy1] = useState({
    PageNumber: 1,
    RecordsPerPage: 5,
    SortBy: "RECENT",
    SeartchText: ""
  });
  const [basicFirst, setBasicFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [idItem, setidItem] = useState("");
  const [hiddenTT, sethiddenTT] = useState(true);


  useEffect(() => {
    // call api here
    loadApi(filterBy1);
  }, [filterBy1, Keysearch]);

  const loadApi = async (filter) => {
    setLoading(true);
    filter.SeartchText = Keysearch
    let result = await videoService.getavailablechannellist(filter);
    let data = result.data.ChannelList;
    if (data) {
      data = data.map((x) => {
        x.isSubcribe = false;
        return x;
      });
    }
    setChannel(data);
    setTotalRecords(result.data?.Recordcount);
    setLoading(false);
  };

  const onBasicPageChange = (event) => {
    setLoading(true);
    if (event.first > 0) {
      let filterBy2 = { ...filterBy1, PageNumber: event.first / 5 + 1 };
      setfilterBy1(filterBy2);
    } else {
      let filterBy2 = { ...filterBy1, PageNumber: 1 };
      setfilterBy1(filterBy2);
    }
    setBasicFirst(event.first);
    setLoading(false);
  };
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
    setfilterBy1({ ...filterBy1, SortBy: item.value });
  };
  const clickTitleChanel = async (data) => {
    setShowRight(true);
    setidItem(data.ChannelId);
    // let obj = {
    //   ChannelId: data.ChannelId,
    //   CorporateId: 1,
    //   PageNumber: 1,
    //   RecordsPerPage: 10,
    //   SortBy: "RECENT",
    // };
    // let result = await videoService.videolibrarysubscribedvideolist(obj);

    // setlstItemChanel(result.data);
    // setlstVideo(result.data.VideoDetailList);
    // //showMoreBtn
    // if (result.data.TotalRecords > result.data.RecordsPerPage) {
    //   setVisibleMore(true);
    // }
    // if (
    //   result.data.TotalRecords <= result.data.RecordsPerPage ||
    //   result.data.PageNumber * result.data.RecordsPerPage >=
    //     result.data.totalRecords
    // ) {
    //   setVisibleMore(false);
    // }
  };


  //Đổi trạng thái
  function changeIsSubcribe(channelId) {
    let channelTemp = [...channel];
    const index = channelTemp.findIndex((object) => {
      return object.ChannelId === channelId;
    });
    if (index != -1) {
      channelTemp[index].isSubcribe = !channelTemp[index].isSubcribe;
    }

    setChannel(channelTemp);
  }

  // useEffect(() => {
  //     // call api here
  //     loadDetailChannel(search);
  // }, [search]);

  const setShow = (data) => {
    sethiddenTT(data);
  }



  const renderChannel = () => {
    return channel.map((dataItem, index) => {
      return (
        <>
          <div key={index}>
            {dataItem.TotalRecords > 0 && (
              <div
                style={{
                  borderBottom: "1px solid #E0E0E0",
                  paddingBottom: "2rem",
                  paddingTop: "10px",
                }}
              >
                <AvailableChannelListChannel
                  onSetShow={(data) => setShow(data)}
                  clickTitleChanel={(data) => clickTitleChanel(data)}
                  changeIsSubcribeStatus={(id) => changeIsSubcribe(id)}
                  loadApi={() => loadApi(filterBy1)}
                  dataChannel={dataItem}
                />
              </div>
            )}
          </div>
        </>
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
      {showRight == false ? (
        <Card>
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
              KÊNH KHẢ DỤNG
            </b>
            <span
              style={{
                float: "left",
                width: "135px",
                height: "4px",
                background: "#f36464",
                position: 'absolute',
                top: "57px",
              }}
            ></span>
            <div style={{ width: '100%' }}>
              <div className="p-input-icon-right ">


                <div className="col-12 md:col-4">
                  <div className="p-inputgroup">
                    <InputText
                      onKeyDown={(e) => keyDown(e)}
                      onChange={(e) => onChangeText(e.target.value)}
                      placeholder="Nhập từ khóa tìm kiếm theo kênh"
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

          <div className="">
            <LoadingPanel loading={loading}>{renderChannel()}</LoadingPanel>
          </div>

          <div>
            <Paginator
              first={basicFirst}
              rows={filterBy1.RecordsPerPage}
              totalRecords={totalRecords}
              onPageChange={onBasicPageChange}
            ></Paginator>
          </div>
        </Card>
      ) : (
        <Card>
          <ListVideoChannel
            idChannel={idItem}
            subcribeStatus={false}
            hiddenTT={hiddenTT}
          ></ListVideoChannel>
        </Card>
      )}


    </>
  );
};
export default AvailableChannelContainer;
