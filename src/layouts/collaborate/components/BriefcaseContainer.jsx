import { isFulfilled } from "@reduxjs/toolkit";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { briefcaseService } from "services/briefcaseService";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import './style/Heart.scss';
import { Paginator } from "primereact/paginator";
import { FaSearch } from 'react-icons/fa';
import { Tooltip } from 'primereact/tooltip';

function BriefcaseContainer() {
  const [searchBy, setsearchBy] = useState('')
  const [valInput, setvalInput] = useState('');
  const [tab, settab] = useState('brf');
  const [pageNb, setpageNb] = useState(0);
  const [pageNb1, setpageNb1] = useState(0);
  const [pageNb2, setpageNb2] = useState(0);
  const [parentData, setParentData] = useState([]);

  const [isBrfItem, setIsBrfItem] = useState(false);
  const [datasharedbriefcase, setdatasharedbriefcase] = useState([])
  const [databriefcasefavlist, setdatabriefcasefavlist] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [filterInDetail, setFilterInDetail] = useState({
    FileType: 'A',
    ParentID: 0,
    pageNumber: 1,
    pageSize: 10,
    recordCount: 10,
    searchBy: '',
    sortColumn: "DT_MDFCTN_DT",
    sortOrder: 'DESC'
  })

  const [filterBy1, setfilterBy1] = useState({
    FileType: 'A',
    ParentID: 0,
    pageNumber: 1,
    pageSize: 10,
    recordCount: 10,
    searchBy: '',
    sortColumn: "DT_MDFCTN_DT",
    sortOrder: 'DESC'
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [basicFirst, setBasicFirst] = useState(0);

  const onBasicPageChange = (event) => {
    settab('brf');
    if (event.first > 0) {
      let filterBy2 = { ...filterBy1, pageNumber: (event.first / 10) + 1, searchBy: valInput }
      setfilterBy1(filterBy2)
    }
    else {
      let filterBy2 = { ...filterBy1, pageNumber: 1, searchBy: valInput }
      setfilterBy1(filterBy2)
    }
    setBasicFirst(event.first);
  };
  //phân trang fav tab
  const [filterBy2, setfilterBy2] = useState({
    FileType: 'A',
    ParentID: 0,
    pageNumber: 1,
    pageSize: 10,
    recordCount: 10,
    searchBy: '',
    sortColumn: "DT_MDFCTN_DT",
    sortOrder: 'DESC'
  });
  const [totalRecords1, setTotalRecords1] = useState(0);
  const [basicFirst1, setBasicFirst1] = useState(0);

  const onBasicPageChange1 = (event) => {
    settab('brffv')
    if (event.first > 0) {
      let filterBy3 = { ...filterBy2, pageNumber: (event.first / 10) + 1 }
      setfilterBy2(filterBy3)
    }
    else {
      let filterBy3 = { ...filterBy2, pageNumber: 1 }
      setfilterBy2(filterBy3)
    }
    setBasicFirst1(event.first);

  };

  const [folderHistory, setFolderHistory] = useState([]); //create empty stack
  const [parentDataMiddle, setParentDataMiddle] = useState([]); //create middle stack

  function addToFolderHistory(parentData) {
    if (parentData.ParentFolderName == '') {
      setFolderHistory([])
      setParentDataMiddle(parentData)
    } else {
      if (parentData.FileType == 'D') {
        setFolderHistory(prevHistory => [...prevHistory, parentDataMiddle]);
        setParentDataMiddle(parentData)
      }
    }

  }
  function navigateBack() {
    setvalInput('');
    setsearchBy('');
    setIsBrfItem(false);
    if (folderHistory.length > 1) {
      // Lấy đường dẫn của thư mục trước đó
      const previousFolder = folderHistory.pop();

      // Chuyển đến thư mục trước đó
      loadDetailBriefCase(previousFolder);
      //setParentDataMiddle(null)
    } else {
      // let _filterBy1 = { ...filterBy1, pageNumber: pageNb }
      // let _filterBy2 = { ...filterBy2, pageNumber: pageNb }

      setfilterBy1({ ...filterBy1, pageNumber: pageNb1, searchBy: '' });
      setfilterBy2({ ...filterBy2, pageNumber: pageNb2, searchBy: '' });

      // loadApi(filterBy1)
      // loadfavApi(filterBy2)
    }
  }

  const filterItemsFileType = [
    {
      value: 'A',
      sortColumn: "DT_MDFCTN_DT",
      sortOrder: "DESC",
      text: 'Tất cả'
    },
    {
      value: 'F',
      sortColumn: "DT_MDFCTN_DT",
      sortOrder: "DESC",
      text: 'Tập tin',
    },
    {
      value: 'D',
      sortColumn: "DT_MDFCTN_DT",
      sortOrder: "DESC",
      text: 'Thư mục'
    }
  ]
  const filterItems = [
    {
      sortColumn: "DT_MDFCTN_DT",
      sortOrder: "DESC",
      text: 'Gần đây'
    },
    {
      sortColumn: "VC_BRFCS_FL_NM",
      sortOrder: "ASC",
      text: 'Tên'
    },
    {
      sortColumn: "VC_OWNER_NM",
      sortOrder: "ASC",
      text: 'Người chia sẻ'
    }
  ]
  const sortFavItems = [
    {
      sortColumn: "DT_MDFCTN_DT",
      sortOrder: "DESC",
      text: 'Gần đây'
    },
    {
      sortColumn: "VC_BRFCS_FL_NM",
      sortOrder: "ASC",
      text: 'Tên'
    }
  ]
  const filterItemsDetail = [
    {
      sortColumn: "DT_MDFCTN_DT",
      sortOrder: "DESC",
      text: 'Gần đây'
    },
    {
      sortColumn: "VC_BRFCS_FL_NM",
      sortOrder: "ASC",
      text: 'Tên'
    }
  ]

  const onChangeFileType = (item) => {
    setfilterBy1({ ...filterBy1, FileType: item.value });

  }
  const onChangeFileTypeFav = (item) => {
    setfilterBy2({ ...filterBy2, FileType: item.value });

  }

  const onChangeFilter = (item) => {
    setfilterBy1({ ...filterBy1, sortColumn: item.sortColumn, sortOrder: item.sortOrder });
  }
  const onChangeFilterFav = (item) => {
    setfilterBy2({ ...filterBy2, sortColumn: item.sortColumn, sortOrder: item.sortOrder });
  }

  const onChangeFilterDetail = async (item) => {
    let params = {
      FileType: filterInDetail.FileType,
      ParentID: parentData.BriefCaseID,
      pageNumber: filterInDetail.pageNumber,
      pageSize: filterInDetail.pageSize,
      recordCount: filterInDetail.recordCount,
      searchBy: searchBy,
      sortColumn: item.sortColumn,
      sortOrder: item.sortOrder
    }

    let result = await briefcaseService.getbriefcasedetailslist(params);
    setdatasharedbriefcase(result.data.BriefcaseItemsList)

    //fav
    setdatabriefcasefavlist(result.data.BriefcaseItemsList)
  }

  const loadBRFItem = async (params) => {
    let params1 = { ...params }
    if (tab == 'brffv') {
      params1 = { ...params1, pageNumber: filterBy2.pageNumber }
    }
    let result = await briefcaseService.getsharedbriefcaselist(params1);
    setdatasharedbriefcase(result.data.BriefcaseItemsList)
    setTotalRecords1(result.data.totalRecords)
    //fav
    setdatabriefcasefavlist(result.data.BriefcaseItemsList)

    if (parentData.BriefCaseID != 0) {
      let result1 = await briefcaseService.getbriefcasedetailslist(params1);
      setSelectedName(result1.data.ParentFolderName);
    }

  }

  useEffect(() => {
    if (isBrfItem) {

      let params = {
        FileType: filterInDetail.FileType,
        ParentID: parentData.BriefCaseID,
        pageNumber: filterBy1.pageNumber,
        pageSize: filterInDetail.pageSize,
        recordCount: filterInDetail.recordCount,
        searchBy: searchBy,
        sortColumn: filterInDetail.sortColumn,
        sortOrder: filterInDetail.sortOrder
      }

      loadBRFItem(params)
    }
    else {

      setpageNb1(filterBy1.pageNumber);
      setpageNb2(filterBy2.pageNumber);

      loadApi(filterBy1);
      loadfavApi(filterBy2);
    }

  }, [filterBy1, filterBy2]);



  const loadApi = async (body) => {
    setSelectedName(null);
    let result = await briefcaseService.getsharedbriefcaselist(body);
    setTotalRecords(result.data.totalRecords)
    setdatasharedbriefcase(result.data.BriefcaseItemsList)

    setFolderHistory([])
    setParentDataMiddle([])
  }
  const loadfavApi = async (body1) => {
    setSelectedName(null);
    let result = await briefcaseService.getbriefcasefavlist(body1);
    setTotalRecords1(result.data.totalRecords)
    setdatabriefcasefavlist(result.data.BriefcaseItemsList)


    setFolderHistory([])
    setParentDataMiddle([])
  }

  function likeBriefCase(data) {
    const params = { BriefCaseID: data.BriefCaseID };
    briefcaseService.markbriefcasefav(params);

    if (selectedName == null) {
      loadApi(filterBy1)
      loadfavApi(filterBy2)
    } else {
      loadDetailBriefCaseCheckFV(parentData)
    }

  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function selectIconType(FileExtItem, FileType) {
    switch (FileExtItem) {
      case "pdf":
        return <i className="fa-solid fa-file-pdf" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "doc":
        return <i className="fa-solid fa-file-word" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "docx":
        return <i className="fa-solid fa-file-word" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "ppt":
        return <i className="fa-solid fa-file-powerpoint" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "jpg":
        return <i className="fa-solid fa-file-image" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "png":
        return <i className="fa-solid fa-file-image" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "rar":
        return <i className="fa-solid fa-file-zipper" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "zip":
        return <i className="fa-solid fa-file-zipper" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "pptx":
        return <i className="fa-solid fa-file-powerpoint" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "xls":
        return <i className="fa-solid fa-file-excel" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      case "xlsx":
        return <i className="fa-solid fa-file-excel" style={{ color: 'grey', fontSize: 16, paddingRight: '9px' }}></i>;
      default:
        return FileType == 'V' ? <i className="fa-solid fa-video" style={{ color: 'grey', marginTop: '2px', marginRight: 4 }}></i> : <i className="fa-solid fa-folder mr-2" style={{ color: 'grey', marginTop: '2px' }}></i>;
    }
  }

  const loadDetailBriefCaseCheckFV = async (briefCaseItem) => {
    setIsBrfItem(true)
    if (briefCaseItem.FileType != "F") {
      let params = {
        FileType: filterInDetail.FileType,
        ParentID: briefCaseItem.BriefCaseID,
        pageNumber: filterBy1.pageNumber,
        pageSize: filterInDetail.pageSize,
        recordCount: filterInDetail.recordCount,
        searchBy: filterInDetail.searchBy,
        sortColumn: filterInDetail.sortColumn,
        sortOrder: filterInDetail.sortOrder
      };

      try {
        const [result, result1] = await Promise.all([
          briefcaseService.getsharedbriefcaselist(params),
          briefCaseItem.BriefCaseID !== 0
            ? briefcaseService.getbriefcasedetailslist(params)
            : Promise.resolve(null) // Trả về promise giả để đảm bảo không xảy ra lỗi
        ]);
        setdatasharedbriefcase(result.data.BriefcaseItemsList)
        setTotalRecords(result.data.totalRecords);
        // // fav
        setdatabriefcasefavlist(result.data.BriefcaseItemsList)

        setParentData(briefCaseItem);
        setParentDataMiddle(briefCaseItem);
        setBasicFirst(0);
        if (briefCaseItem.BriefCaseID !== 0 && result1 !== null) {
          setSelectedName(result1.data.ParentFolderName);
        }
      } catch {
        console.error("Error in loadDetailBriefCase:", error);
      }

    } else {
      window.open(briefCaseItem.FilePath);
    }
  }

  const loadDetailBriefCase = async (briefCaseItem) => {
    setIsBrfItem(true)
    if (briefCaseItem.FileType != "F") {
      let params = {
        FileType: filterInDetail.FileType,
        ParentID: briefCaseItem.BriefCaseID,
        pageNumber: filterInDetail.pageNumber,
        pageSize: filterInDetail.pageSize,
        recordCount: filterInDetail.recordCount,
        searchBy: filterInDetail.searchBy,
        sortColumn: filterInDetail.sortColumn,
        sortOrder: filterInDetail.sortOrder
      };

      try {
        const [result, result1] = await Promise.all([
          briefcaseService.getsharedbriefcaselist(params),
          briefCaseItem.BriefCaseID !== 0
            ? briefcaseService.getbriefcasedetailslist(params)
            : Promise.resolve(null) // Trả về promise giả để đảm bảo không xảy ra lỗi
        ]);
        setdatasharedbriefcase(result.data.BriefcaseItemsList)
        setTotalRecords(result.data.totalRecords);
        // // fav
        setdatabriefcasefavlist(result.data.BriefcaseItemsList)

        setParentData(briefCaseItem);
        setParentDataMiddle(briefCaseItem);
        setBasicFirst(0);
        if (briefCaseItem.BriefCaseID !== 0 && result1 !== null) {
          setSelectedName(result1.data.ParentFolderName);
        }
      } catch {
        console.error("Error in loadDetailBriefCase:", error);
      }

      // let result = await briefcaseService.getsharedbriefcaselist(params);
      // setdatasharedbriefcase(result.data.BriefcaseItemsList)
      // setTotalRecords(result.data.totalRecords);
      // // fav
      // setdatabriefcasefavlist(result.data.BriefcaseItemsList)
      // setParentData(briefCaseItem);
      // setParentDataMiddle(briefCaseItem);
      // setBasicFirst(0);
      // if (briefCaseItem.BriefCaseID != 0) {
      //   let result1 = await briefcaseService.getbriefcasedetailslist(params);
      //   setSelectedName(result1.data.ParentFolderName);
      // }

      // setfilterBy1({ ...filterBy1, pageNumber: 1 });
    } else {
      window.open(briefCaseItem.FilePath);
    }
  }

  const loadDetailBriefCasefv = async (briefCaseItem) => {
    setIsBrfItem(true);
    if (briefCaseItem.FileType != "F") {
      let params = {
        FileType: filterInDetail.FileType,
        ParentID: briefCaseItem.BriefCaseID,
        pageNumber: filterInDetail.pageNumber,
        pageSize: filterInDetail.pageSize,
        recordCount: filterInDetail.recordCount,
        searchBy: filterInDetail.searchBy,
        sortColumn: filterInDetail.sortColumn,
        sortOrder: filterInDetail.sortOrder
      }

      let result = await briefcaseService.getsharedbriefcaselist(params);
      setdatasharedbriefcase(result.data.BriefcaseItemsList)
      setTotalRecords1(result.data.totalRecords)
      //fav
      setdatabriefcasefavlist(result.data.BriefcaseItemsList)

      if (briefCaseItem.BriefCaseID != 0) {
        let result1 = await briefcaseService.getbriefcasedetailslist(params);
        setSelectedName(result1.data.ParentFolderName);
      }
      setParentData(briefCaseItem)
      setParentDataMiddle(briefCaseItem);
      setBasicFirst1(0);
      // setfilterBy2({ ...filterBy2, pageNumber: 1 });
    } else {
      window.open(briefCaseItem.FilePath);
    }
  }


  function renderDataSharedBriefCase() {
    return (
      <>
        {datasharedbriefcase.map((dataItem, index) => {
          return (
            <tr key={index} className="border rounded rounded-3">
              <td scope="row" style={{ display: 'inline-flex', border: 'none' }}>
                {dataItem?.FileName.length > 30 &&
                  <Tooltip style={{ width: '30%' }} target={".lh-tight-" + index}>
                    <div dangerouslySetInnerHTML={{ __html: dataItem?.FileName }} ></div>
                  </Tooltip>
                }
                {selectIconType(dataItem.FileExt, dataItem.FileType)}
                {dataItem.FileType == 'V' ?
                  <a style={{ color: 'black', cursor: 'pointer' }}
                    href={dataItem.UrlVideo}
                    className={"lh-tight-" + index}
                  >
                    {dataItem?.FileName.length > 30 ? dataItem?.FileName.substring(0, 30) + "..." : dataItem?.FileName}
                  </a>
                  :
                  <a style={{ color: 'black', cursor: 'pointer' }}
                    onClick={() => {
                      loadDetailBriefCase(dataItem);
                      //search.searchBy = "";
                      //setsearch(search)
                      addToFolderHistory(dataItem);
                      setvalInput('');
                    }}
                    className={"lh-tight-" + index}
                  >
                    {dataItem?.FileName.length > 30 ? dataItem?.FileName.substring(0, 30) + "..." : dataItem?.FileName}
                  </a>
                }

              </td>
              <td>{dataItem?.FileTags}</td>
              <td>{dataItem?.CreatedBy}</td>
              <td style={{ width: '18%' }}>{dataItem?.ModifiedDate}</td>
              <td>{dataItem?.FileSizeKB}</td>
              <td style={{ textAlign: 'center' }}>
                {
                  <a style={{ cursor: 'pointer' }} onClick={() => likeBriefCase(dataItem)}>
                    <i style={{ color: 'red' }}
                      className={dataItem?.IsFav == 0 ? "fa-regular fa-heart" : "fa-solid fa-heart"}>
                    </i>
                  </a>
                }
              </td>
            </tr>
          )
        })}</>
    )
  }

  function renderDataBriefCaseFavList() {
    return (
      databriefcasefavlist.map((dataItem1, index) => {
        let urlVD = dataItem1.UrlVideo;
        var startIndex = urlVD.indexOf("/learner");
        var value = urlVD.substring(startIndex);
        return (
          <tr key={index} className="border rounded rounded-3">
            <td scope="row" style={{ display: 'inline-flex', border: 'none' }}>
              {selectIconType(dataItem1.FileType)}
              {dataItem1.FileType == 'V' ?
                <a style={{ color: 'black', cursor: 'pointer' }}
                  href={value}
                >
                  {dataItem1?.FileName.length > 30 ? dataItem1?.FileName.substring(0, 30) + "..." : dataItem1?.FileName}
                </a>
                :
                <a type="button" style={{ color: 'black' }}
                  onClick={() => {
                    loadDetailBriefCasefv(dataItem1);
                    // search.searchBy = "";
                    // setsearch(search)
                    addToFolderHistory(dataItem1);
                    setvalInput('');
                  }}
                >
                  {dataItem1?.FileName.length > 30 ? dataItem1?.FileName.substring(0, 30) + "..." : dataItem1?.FileName}
                </a>
              }
              {/* <a type="button" style={{ color: 'black' }}
                onClick={() => {
                  loadDetailBriefCase(dataItem1);
                  // search.searchBy = "";
                  // setsearch(search)
                  addToFolderHistory(dataItem1)
                }}
              >
                {dataItem1?.FileName.length > 30 ? dataItem1?.FileName.substring(0, 30) + "..." : dataItem1?.FileName}
              </a> */}
            </td>
            <td>{dataItem1?.FileTags}</td>
            <td>{dataItem1?.CreatedBy}</td>
            <td style={{ width: '18%' }}>{dataItem1?.ModifiedDate}</td>
            <td>{dataItem1?.FileSizeKB}</td>
            <td style={{ textAlign: 'center' }}>
              {
                <a style={{ cursor: 'pointer' }}>
                  <i style={{ color: 'red' }}
                    className={dataItem1?.IsFav == 0 ? "fa-regular fa-heart" : "fa-solid fa-heart"}
                    onClick={() => likeBriefCase(dataItem1)}>
                  </i>
                </a>
              }
            </td>
          </tr>
        )
      })
    )
  }



  function searchValue(keySearch) {
    setfilterBy1({ ...filterBy1, searchBy: keySearch });
  }

  function searchValue1(keySearch) {
    setfilterBy2({ ...filterBy2, searchBy: keySearch });
  }



  const searchDetails = async (keySearch) => {
    let params = {
      FileType: filterInDetail.FileType,
      ParentID: parentData.BriefCaseID,
      pageNumber: filterInDetail.pageNumber,
      pageSize: filterInDetail.pageSize,
      recordCount: filterInDetail.recordCount,
      searchBy: keySearch,
      sortColumn: filterInDetail.sortColumn,
      sortOrder: filterInDetail.sortOrder
    }
    // let result = await briefcaseService.getbriefcasedetailslist(params);
    let result = await briefcaseService.getsharedbriefcaselist(params);
    setdatasharedbriefcase(result.data.BriefcaseItemsList)
    setTotalRecords(result.data.totalRecords)
    setTotalRecords1(result.data.totalRecords)
    //fav
    setdatabriefcasefavlist(result.data.BriefcaseItemsList)
  }

  function keyDown(e) {
    if (e.key == 'Enter') {
      searchValue(valInput);
    }
  }
  const searchfile = () => {
    searchValue(valInput);
  }

  function keyDown2(e) {
    if (e.key == 'Enter') {
      searchValue1(valInput);
    }
  }
  const searchfile2 = () => {
    searchValue1(valInput);
  }

  function keyDown1(e) {
    if (e.key == 'Enter') {
      setsearchBy(valInput);
      searchDetails(valInput);
    }
  }
  const searchfile1 = () => {
    setsearchBy(valInput);
    searchDetails(valInput);
  }



  const newLocal = <div className="nav flex-column nav-pills nav-justified mb-3 p-3 mb-2 bg-light text-dark" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button className="nav-link active d-flex" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
      onClick={() => {//tab transfer
        //loadApi(body);
        setIsBrfItem(false);
        setBasicFirst(0);
        filterBy1.pageNumber = 1;
        filterBy1.searchBy = '';
        filterBy1.FileType = 'A';
        filterInDetail.pageNumber = 1;
        filterInDetail.searchBy = '';
        setFilterInDetail(filterInDetail);
        setfilterBy1(filterBy1);
        setvalInput('');
        setsearchBy('');
        loadApi(filterBy1)
      }}
      role="tab" aria-controls="v-pills-home" aria-selected="true">
      KHO TÀI LIỆU DÙNG CHUNG
    </button>

    <button className="nav-link d-flex" id="v-pills-fav-tab" data-bs-toggle="pill" data-bs-target="#v-pills-fav"
      onClick={() => {
        setIsBrfItem(false);
        setBasicFirst1(0);
        filterBy2.pageNumber = 1;
        filterBy2.searchBy = '';
        filterInDetail.pageNumber = 1;
        filterInDetail.searchBy = '';
        setFilterInDetail(filterInDetail);
        setvalInput('');
        setsearchBy('');
        setfilterBy2(filterBy2);
        loadfavApi(filterBy2);
      }}
      role="tab" aria-controls="v-pills-fav" aria-selected="false">YÊU THÍCH</button>
  </div>;

  return (
    <>
      <div className="my-learning-container row">
        <div className="col-3 scroll-wrapper"> {newLocal} </div>
        <div className="col-9 scroll-wrapper">
          <div className="d-flex align-items-start">
            <div className="tab-content w-100" id="v-pills-tabContent">

              <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <Card title={<div>
                  {selectedName !== null ?
                    <>
                      <button
                        style={{ border: 'none', backgroundColor: 'white' }}
                        onClick={() => { //back btn

                          //loadApi(filterBy1);
                          navigateBack()
                        }}>
                        <i className="fa-solid fa-arrow-left" style={{ color: 'black' }}></i>
                      </button>
                      &nbsp;
                      <i className="fa-solid fa-folder" style={{ color: 'grey' }}></i> {selectedName}
                    </>
                    : 'KHO TÀI LIỆU DÙNG CHUNG'}
                </div>}>

                  {/* --Card Header-- */}
                  <div className="row">
                    <div className="input-group">
                      {
                        selectedName == null ?
                          <div className="input-group-append search-box" style={{ width: '60%', borderRadius: '5px' }}>
                            <input id="search-file" onKeyDown={(e) => keyDown(e)} value={valInput} type="text" onChange={(e) => setvalInput(e.target.value)} className="form-search form-control form-search" style={{ borderRight: 'none' }} placeholder="Nhập từ khóa tìm kiếm" aria-describedby="button-addon01"></input>
                            <label style={{ borderLeft: 'none', marginLeft: "-6px", height: '33px' }} className="input-group-text rounded" type="button" onClick={searchfile} htmlFor="inputGroupSelect02" id="button-addon01"><FaSearch /></label>
                          </div>
                          :
                          <div className="input-group-append search-box" style={{ width: '60%', borderRadius: '5px' }}>
                            <input id="search-file" onKeyDown={(e) => keyDown1(e)} value={valInput} type="text" onChange={(e) => setvalInput(e.target.value)} className="form-search form-control form-search" style={{ borderRight: 'none' }} placeholder="Nhập từ khóa tìm kiếm" aria-describedby="button-addon01"></input>
                            <label style={{ borderLeft: 'none', marginLeft: "-6px", height: '33px' }} className="input-group-text rounded" type="button" onClick={searchfile1} htmlFor="inputGroupSelect02" id="button-addon01"><FaSearch /></label>
                          </div>
                      }
                      {/* {
                        selectedName == null ?
                          <DropdownFilter items={filterItemsFileType} onChange={onChangeFileType} />
                          : ''
                      } */}
                      {
                        selectedName == null ?
                          <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                          :
                          <DropdownFilter items={filterItemsDetail} onChange={onChangeFilterDetail} />
                      }
                    </div>
                  </div>
                  {/* --Body Card-- */}
                  <br></br>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"> TÊN </th>
                        <th scope="col"> THẺ </th>
                        <th scope="col"> NGƯỜI CHIA SẺ </th>
                        <th scope="col"> SỬA LẦN CUỐI </th>
                        <th scope="col"> KÍCH THƯỚC </th>
                        <th scope="col"> YÊU THÍCH </th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* {renderdatasharedbriefcase()} */}
                      {renderDataSharedBriefCase()}
                    </tbody>
                  </table>


                  <Paginator first={filterBy1.pageSize * (filterBy1.pageNumber - 1)}
                    rows={filterBy1.pageSize}
                    totalRecords={totalRecords}
                    onPageChange={onBasicPageChange}>
                  </Paginator>


                </Card>
              </div>

              <div className="tab-pane fade" id="v-pills-fav" role="tabpanel" aria-labelledby="v-pills-fav-tab">
                <Card title={<div>
                  {selectedName !== null ?
                    <>
                      <a style={{ border: 'none', backgroundColor: 'white' }} type="button"
                        onClick={() => { //tab transfer ?

                          //loadfavApi(filterBy2);
                          navigateBack()
                        }}>
                        <i className="fa-solid fa-arrow-left" style={{ color: 'black' }}></i>
                      </a>
                      &nbsp;
                      <i className="fa-solid fa-folder" style={{ color: 'grey' }}></i> {selectedName}
                    </>
                    : 'YÊU THÍCH'}
                </div>}>

                  {/* --Card Header-- */}
                  <div className="row">
                    <div className="input-group">
                      {
                        selectedName == null ?
                          <div className="input-group-append search-box" style={{ width: '60%', borderRadius: '5px' }}>
                            <input id="search-file" onKeyDown={(e) => keyDown2(e)} value={valInput} type="text" onChange={(e) => setvalInput(e.target.value)} className="form-search form-control form-search" style={{ borderRight: 'none' }} placeholder="Nhập từ khóa tìm kiếm" aria-describedby="button-addon01"></input>
                            <label style={{ borderLeft: 'none', marginLeft: "-6px", height: '33px' }} className="input-group-text rounded" type="button" onClick={searchfile2} htmlFor="inputGroupSelect02" id="button-addon01"><FaSearch /></label>
                          </div>
                          :
                          <div className="input-group-append search-box" style={{ width: '60%', borderRadius: '5px' }}>
                            <input id="search-file" onKeyDown={(e) => keyDown1(e)} value={valInput} type="text" onChange={(e) => setvalInput(e.target.value)} className="form-search form-control form-search" style={{ borderRight: 'none' }} placeholder="Nhập từ khóa tìm kiếm" aria-describedby="button-addon01"></input>
                            <label style={{ borderLeft: 'none', marginLeft: "-6px", height: '33px' }} className="input-group-text rounded" type="button" onClick={searchfile1} htmlFor="inputGroupSelect02" id="button-addon01"><FaSearch /></label>
                          </div>
                      }
                      {
                        selectedName == null ?
                          <DropdownFilter items={filterItemsFileType} onChange={onChangeFileTypeFav} />
                          : ''
                      }
                      {
                        selectedName == null ?
                          <DropdownFilter items={sortFavItems} onChange={onChangeFilterFav} />
                          : <DropdownFilter items={filterItemsDetail} onChange={onChangeFilterDetail} />
                      }

                    </div>
                  </div>
                  {/* --Body Card-- */}

                  <br></br>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"> TÊN </th>
                        <th scope="col"> THẺ </th>
                        <th scope="col"> NGƯỜI CHIA SẺ </th>
                        <th scope="col"> SỬA LẦN CUỐI </th>
                        <th scope="col"> KÍCH THƯỚC </th>
                        <th scope="col"> YÊU THÍCH </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {renderdatabriefcasefavlist()} */}
                      {renderDataBriefCaseFavList()}
                    </tbody>
                  </table>

                  <Paginator first={filterBy2.pageSize * (filterBy2.pageNumber - 1)}
                    rows={filterBy2.pageSize}
                    totalRecords={totalRecords1}
                    onPageChange={onBasicPageChange1}>
                  </Paginator>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BriefcaseContainer;