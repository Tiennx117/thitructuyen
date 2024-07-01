import { Card } from "primereact/card";
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from "react";
import { Sidebar } from 'primereact/sidebar';
import SearchFile from "layouts/collaborate/components/SearchSurvay";
import { shopService } from "services/shopService";
import { Dialog } from 'primereact/dialog';
import SearchList from './SearchList';
import { Image } from 'components/Image';
import './ShopContainer.scss';
import { Toast } from 'primereact/toast';


const ShopContainer = () => {
    const { } = useTranslation();
    const [shopmenulist, setshopmenulist] = useState([])
    const [datapointsofuser, setdatapointsofuser] = useState([])
    const [datacatalogueitemlist, setcatalogueitemlist] = useState([])
    const [checkoutitemdetail, setcheckoutitemdetail] = useState([])
    const [dataaddtocart, setaddtocart] = useState()
    const [datafavroiteitemlist, setdatafavroiteitemlist] = useState([])
    const [datapurchasehistory, setdatapurchasehistory] = useState()
    const [addremovefavouritecatalogueitem, setaddremovefavouritecatalogueitem] = useState([])
    const [removeitemfromviewcart, setremoveitemfromviewcart] = useState()
    const [updatequantity1, setupdatequantity1] = useState();
    const [selectedId, setSelectedId] = useState(null);
    const [visibleRight, setVisibleRight] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [count, setCount] = useState(0);
    const [totalPoint, settotalPoint] = useState(0);
    const [totalCount, settotalCount] = useState(0);
    const [detailItem, setdetailItem] = useState(false);
    const [dataDetailItem, setdataDetailItem] = useState({});
    const [boxItem, setboxItem] = useState('');
    const [defaultColor, setdefaultColor] = useState('activeDefault');
    const toast = useRef(null);

    useEffect(() => {
        // call api here
        setsearch(search)
        loadPointApi()
        loaditemApi(body)
        loadfavroiteitemlist(body)
        loadpurchasehistory(body)
        loadmenuList()
        loadcheckoutItem(body1)
        loadaddremovefavouritecatalogueitem(add)
        loadsavecontinueshopping(body)
    }, []);

    const body1 = {
        "order": "",
        "orderby": "",
        "searchText": "",
        "userMobile": "",
        "usermailid": ""
    }
    const add = {
        "order": "DESC",
        "orderby": "DT_CRTN_DT",
        "searchText": "",
    }

    const loadmenuList = async (body) => {
        let result = await shopService.getshopmenulist(body);
        setshopmenulist(result.data.ShopMenuListItem)
    }

    const loadPointApi = async (body) => {
        let result = await shopService.getpointsofuser(body);
        setdatapointsofuser(result.data.PointsList)
    }
    const loaditemApi = async (body) => {
        let result = await shopService.getcatalogueitemlist(body);
        newFunction(result);
        setcatalogueitemlist(result.data.CatalogueItemDetailsList)
    }
    const loadcheckoutItem = async (body) => {
        let result = await shopService.getcheckoutitemdetail(body);
        let total = 0
        let count = 0
        for (let i = 0; i < result.data.CheckoutCatalogueItemList.length; i++) {
            total += result.data.CheckoutCatalogueItemList[i].TotalPoints
            let a = parseInt(result.data.CheckoutCatalogueItemList[i].PurchaseQuantity);
            count = count + a
        }
        settotalCount(count);
        settotalPoint(total);
        setcheckoutitemdetail(result.data.CheckoutCatalogueItemList)
    }
    const loadsavecontinueshopping = async (body) => {
        let result = await shopService.getcheckoutitemdetail(body);
        setVisibleRight(false);
        let obj = {
            CheckoutCatalogueItemList: result.data.CheckoutCatalogueItemList
        }
        await shopService.savecontinueshopping(obj);
    }
    const loadsavecheckoutshopping = async () => {
        let result = await shopService.getcheckoutitemdetail();
        await shopService.savecheckoutshopping(result.data.CheckoutCatalogueItemList);
    }
    const loadremoveitemfromviewcart = async (body) => {
        let result = await shopService.removeitemfromviewcart(body);
        setremoveitemfromviewcart(result.data)
    }
    const loadaddtocart = async (item) => {
        let filteraddtocart = { ...body2, ...{ CatalogueItemId: item.CatalogueItemId, CataloguePoints: item.CataloguePoints, CatalogueQuantity: item.CatalogueQuantity, PageNumber: 1, RecordsPerPage: 9 } }
        let result = await shopService.addtocart(filteraddtocart);
        if (result.data.TransactionResult == "SUCCESS") {
            setaddtocart(result.data)
            loadcheckoutItem(body1)
            setVisibleRight(true)
        }
        else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Số lượng mua đã vượt quá số lượng từ kho' });
        }

    }
    const ThemVaoGio = async (item) => {
        let filteraddtocart = { ...body2, ...{ CatalogueItemId: item.CatalogueItemId, CataloguePoints: item.CataloguePoints, CatalogueQuantity: item.CatalogueQuantity, PageNumber: 1, RecordsPerPage: 9 } }
        let result = await shopService.addtocart(filteraddtocart);
        if (result.data.TransactionResult == "SUCCESS") {
            setaddtocart(result.data);
            loadcheckoutItem(body1);
        }
        else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Số lượng mua đã vượt quá số lượng từ kho' });
        }

    }
    const loadfavroiteitemlist = async (body) => {
        let result = await shopService.getcataloguefavroiteitemlist(body);
        setdatafavroiteitemlist(result.data.CatalogueItemDetailsList)
    }
    const loadpurchasehistory = async (body) => {
        let result = await shopService.getuserpurchasehistory(body)
        setdatapurchasehistory(result.data)
    }
    const loadaddremovefavouritecatalogueitem = async (add) => {
        let result = await shopService.addremovefavouritecatalogueitem(add);
        setaddremovefavouritecatalogueitem(result.data.CatalogueItemDetailsList)
    }
    const loadupdatequantity = async (update) => {
        let result = await shopService.updatequantity(update);
        setupdatequantity1(result.data.CheckoutCatalogueItemList)
    }
    const body = {
        "order": "DESC",
        "searchText": "",
        "orderBy": "DT_CRTN_DT",
        "PageNumber": 1,
        "RecordsPerPage": 9,
    }
    const [body2, setbody2] = useState({
        "order": "DESC",
        "searchText": "",
        "orderBy": "DT_CRTN_DT",
        CatalogueItemId: '',
        CataloguePoints: '',
        CatalogueQuantity: ''
    })

    const [search, setsearch] = useState({
        "orderby": "DT_CRTN_DT",
        "order": "DESC",
        "PageNumber": 1,
        "RecordsPerPage": 9,
        searchText: ""
    })

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }
    function changeIcon(item) {
        if (item.IsFavourite == true) {
            item.IsFavourite = false
        }
        else {
            item.IsFavourite = true
        }
        const params = {
            CatalogueItemId: item.CatalogueItemId,
            CorporateId: 1,
            IsFavourite: item.IsFavourite,
            PageNumber: 1,
            RecordsPerPage: 9,
            order: 'DESC',
            orderby: 'DT_CRTN_DT',
            searchText: ""
        };
        shopService.addremovefavouritecatalogueitem(params);
        loaditemApi(body);
        loadfavroiteitemlist(body);
    }
    // function changeIcon1(value, body) {
    //     const params = { CatalogueItemId: value };
    //     shopService.addremovefavouritecatalogueitem(params);
    //     loadfavroiteitemlist(body);
    // }
    function newFunction(result) {
        setdatafavroiteitemlist(result.data.CatalogueItemDetailsList);
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            position(position);
        }
    }
    const ClickImg = (item) => {
        setdetailItem(true);
        setdataDetailItem(item)
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const [url, setUrl] = useState('home');
    const [name, setName] = useState('');
    const [selectedName, setSelectedName] = useState('');

    const changeTab = async (data, idx) => {
        setUrl(data.Url);
        setSelectedName(data.name);
        setboxItem('boxItem' + idx);
        setdefaultColor('0')
        //await loadfavroiteitemlist(body);
    }
    const changename = async (data) => {
        setName(data.CatalogueItemName);
    }

    function rendershopmemulist() {
        return (
            shopmenulist.map((dataItem, index) => {
                return (
                    <div key={index}>
                        <a style={{ textTransform: "uppercase", fontWeight: "500" }} className="nav-link d-flex rounded " id={boxItem == 'boxItem' + index ? 'tiletActive' : defaultColor + index} role="tab" type="button" aria-selected="true" onClick={() => { changeTab(dataItem, index); search.searchText = ""; setsearch(search) }} >{dataItem.name}</a>
                    </div>
                )
            })
        )
    }

    function renderpointsofuser() {
        return (
            datapointsofuser.map((dataItem, index) => {
                return (
                    <div key={index} className="card-title bd-highlight" style={{ width: '100%' }}>
                        <span>Đếm điểm</span>
                        <br />
                        <ul className="list-group list-group-horizontal text-center" style={{ fontSize: '11px', display: "flex", backgroundColor: "white" }}>
                            <li style={{ listStyle: "none" }} className="shop-li">
                                <div style={{ color: "#333333c2", fontSize: "14px" }}>Kiếm được</div>
                                <div style={{ fontWeight: "700" }}>{dataItem.TotalPoints}</div>
                            </li>
                            <li style={{ listStyle: "none" }} className="shop-li">
                                <div style={{ color: "#333333c2", fontSize: "14px" }}>Đã đổi</div>
                                <div style={{ fontWeight: "700" }}>{dataItem.RedeemedPoints}</div>
                            </li>
                            <li style={{ listStyle: "none" }} className="shop-li">
                                <div style={{ color: "#333333c2", fontSize: "14px" }}>Có sẵn</div>
                                <div style={{ fontWeight: "700" }}>{dataItem.AvailablePoints}</div>
                            </li>
                        </ul>
                    </div>
                )
            })

        )
    }
    //trang chu
    function rendercatalogueitemlist() {
        return (
            datacatalogueitemlist.map((dataItem1, index1) => {
                return (
                    <div key={index1} className="card border border-3 rounded-3" style={{ width: '18rem', marginRight: "16px" }}>
                        <Image style={{ cursor: "pointer" }} onClick={() => ClickImg(dataItem1)} src={dataItem1.CatalogueItemImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <div className="card-title">
                                <button onClick={() => changeIcon(dataItem1)} className="btn1 btn btn-light" id="btn1"><i style={{ color: 'red' }} className={dataItem1?.IsFavourite == false ? "fa-regular fa-heart" : "fa-solid fa-heart"}></i></button>
                                <span className="left-text" style={{ color: 'black' }}>{dataItem1.CatalogueItemName}</span>
                                <span style={{ float: 'right' }}><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i> {dataItem1.CataloguePoints} </span>
                            </div>
                        </div>

                        <div >
                            <button className="border-end btn btn-light" onClick={() => loadaddtocart(dataItem1)} style={{ width: '50%', border: 'none', height: "100%" }}>MUA NGAY</button>
                            <button className="btn btn-dark" onClick={() => ThemVaoGio(dataItem1)} style={{ width: '50%', border: 'none' }}>THÊM VÀO GIỎ HÀNG</button>
                        </div>
                    </div>
                )
            })

        )
    }
    // yêu thích
    function rendercataloguefavroiteitemlist() {
        return (
            datafavroiteitemlist.map((dataItem2, index2) => {
                return (
                    dataItem2.IsFavourite == true ?
                        <div key={index2} className="card border border-3 rounded-3" style={{ width: '18rem', marginRight: "16px" }}>
                            <Image style={{ cursor: "pointer" }} onClick={() => ClickImg(dataItem2)} src={dataItem2.CatalogueItemImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <div className="card-title">
                                    <button onClick={() => changeIcon(dataItem2)} className="btn2 btn btn-light" id="btn2"><i style={{ color: 'red', border: 'none' }} className={dataItem2?.IsFavourite == true ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></button>
                                    <span className="left-text" style={{ color: 'black' }}>{dataItem2.CatalogueItemName}</span>
                                    <span style={{ float: 'right' }}><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i> {dataItem2.CataloguePoints} </span>
                                </div>
                            </div>

                            <div>
                                <button className="border-end btn btn-light" onClick={() => loadaddtocart(dataItem2)} style={{ width: '50%', border: 'none', height: "100%" }}>MUA NGAY</button>
                                <button className="btn btn-dark" onClick={() => ThemVaoGio(dataItem2)} style={{ width: '50%', border: 'none' }}>THÊM VÀO GIỎ HÀNG</button>
                            </div>
                        </div> : ""
                )
            })

        )
    }

    function rendercheckoutitemlist() {
        return (
            checkoutitemdetail.map((dataItem2, index1) => {
                return (
                    <tr key={index1}>
                        <td scope="row"><button className="btn3" id="btn3" style={{ border: 'none', backgroundColor: 'white', color: 'black' }}>{dataItem2.CatalogueItemName}</button></td>
                        <td><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i> {dataItem2.CataloguePoints} </td>
                        <td>
                            <i className="fa-solid fa-minus" type='button' onClick={() => decrement(dataItem2)}></i><span>  {dataItem2.PurchaseQuantity} </span><i className="fa-solid fa-plus" type='button' onClick={() => increment(dataItem2)}></i>
                        </td>
                        <td><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i> {dataItem2.TotalPoints} </td>
                        <td><button className="rounded-pill" onClick={() => remoteItem(dataItem2)}><a>Xóa mục</a></button></td>
                    </tr>
                )
            })
        )
    }

    function searchValue(keySearch) {
        search.searchText = keySearch;
        setsearch(search);
        loaditemApi(search)
    }
    function searchValue1(keySearch) {
        search.searchText = keySearch;
        setsearch(search);
        loadfavroiteitemlist(search)
    }
    function searchValue2(keySearch) {
        search.searchText = keySearch;
        setsearch(search);
        loadpurchasehistory(search)
    }

    function increment(item) {
        debugger;
        let a = parseInt(item.PurchaseQuantity);
        a += 1;
        if (a <= item.CatalogueQuantity) {
            let obj = {
                CartId: item.CartId,
                CatalogueItemId: item.CatalogueItemId,
                PurchaseQuantity: a,
                TotalPoints: item.CataloguePoints * a,
            }
            loadupdatequantity(obj);
            loadcheckoutItem(body1)
        }
        else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Số lượng mua đã vượt quá số lượng từ kho' });
        }

    }

    function decrement(item) {
        let a = parseInt(item.PurchaseQuantity);
        a -= 1;
        if (a >= 1 && a <= item.CatalogueQuantity) {
            let obj = {
                CartId: item.CartId,
                CatalogueItemId: item.CatalogueItemId,
                PurchaseQuantity: a,
                TotalPoints: item.CataloguePoints * a,
            }
            loadupdatequantity(obj);
            loadcheckoutItem(body1)
        }

    }
    function remoteItem(item) {
        let obj = {
            CatalogueItemId: item.CatalogueItemId,
            CorporateId: 1
        }
        shopService.removeitemfromviewcart(obj);
        loadcheckoutItem(body1);

    }

    return (
        <>
            <Toast ref={toast}></Toast>
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)} style={{ width: '40%' }}>
                <Card title="Giỏ hàng của bạn">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"> CÁC MỤC </th>
                                <th scope="col"> GIÁ BÁN </th>
                                <th scope="col"> SỐ LƯỢNG </th>
                                <th scope="col"> TOÀN BỘ </th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rendercheckoutitemlist()}
                        </tbody>
                    </table>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td scope="row" className="fw-bold">Tổng cộng</td>
                                <td></td>
                                <td></td>
                                <td><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i> {totalPoint} </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
                <br />
                <button className="btn btn-light btn-outline-dark rounded-pill" onClick={() => loadsavecontinueshopping()} style={{ marginLeft: '15px' }}>Tiếp tục mua sắm</button>
                <button className="btn btn-dark  rounded-pill" onClick={() => loadsavecheckoutshopping()} style={{ float: 'right', marginRight: '10px' }}>Thủ tục thanh toán</button>
            </Sidebar>
            <div className="my-learning-container row">
                <div className="col-3 scroll-wrapper">
                    <Card>
                        <div style={{ backgroundColor: "#33333321" }} className="nav flex-column nav-pills nav-justified mb-3 p-3 mb-2  text-dark  border border-5 shadow-sm" id="v-pills-tab" role="tablist" aria-orientation="vertical" >
                            <div className="d-flex flex-column mb-4" style={{ height: '50vh' }} >
                                <div className="mb-auto p-2 text-dark">
                                    {rendershopmemulist()}
                                </div>
                            </div>

                            {renderpointsofuser()}

                        </div>
                    </Card>
                </div>
                <div className="col-9 scroll-wrapper">
                    <div className="d-flex align-items-start">
                        <div className="tab-content w-100" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <Card title={selectedName}>
                                    <div className="row flex-box">
                                        <div className="input-group">
                                            <div className="nav-item">
                                                <a style={{ position: "relative" }} className="nav-link" onClick={() => setVisibleRight(true)} href="#">
                                                    <i style={{ fontSize: "18px", color: "#333" }} className="fa-solid fa-cart-shopping"></i><span style={{ position: "absolute", top: "-5px", left: "21px", height: "20px", width: "25px", margin: "0 auto", backgroundColor: "#1AA1DC", color: "white", textAlign: "center", borderRadius: "50%" }}>{totalCount}</span>
                                                    <span style={{ marginLeft: "20px", color: '#1AA1DC' }}>Xem giỏ hàng</span>
                                                </a>
                                            </div>
                                            {url == 'home' ?
                                                <SearchList title1={search.searchText} onChange={data => searchValue(data.trim())} />
                                                : ''
                                            }
                                            {url == 'favourite' ?
                                                <SearchList title1={search.searchText} onChange={data => searchValue1(data.trim())} />
                                                : ''
                                            }
                                            {url == 'history' ?
                                                <SearchList title1={search.searchText} onChange={data => searchValue2(data.trim())} />
                                                : ''
                                            }
                                        </div>
                                    </div>
                                    <br />
                                    {
                                        datacatalogueitemlist == null && datafavroiteitemlist == null && datapurchasehistory == null
                                            ?
                                            'Không có dữ liệu'
                                            :
                                            <div>
                                                {url == 'home' ?
                                                    <div className="container">
                                                        <div className="row">
                                                            <div style={{ display: "flex" }} className="row-cols-1 row-cols-md-3">
                                                                {rendercatalogueitemlist()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''
                                                }
                                                {url == 'favourite' ?
                                                    <div className="container">
                                                        <div className="row">
                                                            <div style={{ display: "flex" }} className=" row-cols-1 row-cols-md-3">
                                                                {rendercataloguefavroiteitemlist()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''
                                                }
                                                {url == 'history' ?
                                                    <div className="container">
                                                        <div className="row">
                                                            <div style={{ display: "flex" }} className=" row-cols-1 row-cols-md-3">
                                                                <p className="fst-italic fs-5">Không có mục nào để hiển thị.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''
                                                }
                                            </div>

                                    }
                                    <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                                        <div className="card-header">
                                            <h6>
                                                {name}
                                            </h6>

                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col d-flex">
                                                    <div className="col-6">
                                                        <span style={{ fontSize: '12px', color: 'grey' }}>Description</span>
                                                        <p style={{ fontSize: '13px', fontWeight: "bold" }}>No description available. </p>
                                                        <div className="d_flex">
                                                            <span style={{ fontSize: '12px', color: 'grey' }}>Price</span>
                                                            <p style={{ fontSize: '13px', fontWeight: "bold" }}><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i> 1 </p>
                                                            <span style={{ fontSize: '12px', color: 'grey' }}>Stock</span>
                                                            <p style={{ fontSize: '13px', fontWeight: "bold", marginLeft: '7px' }}> 1 </p>
                                                        </div>

                                                    </div>

                                                    <div className="col-6">
                                                        <div className="card border border-3 rounded-3" style={{ height: '14rem', width: '20rem', float: 'right' }}>
                                                            <Image src="https://e.eps.lms.com/Control/ThumbnailGenerator.aspx?LoggedIn=0&ImageWidth=200&ImageHeight=100&ImageFile=..%2fWCR%2fWCRGMFMNGCTLGImages%2f4%2fNew+Bitmap+Image.bmp" className="card-img-top" alt="..." />
                                                            <div>
                                                                <button className="rounded-pill border-end btn btn-light " style={{ width: '50%', border: 'none', height: "100%" }}>MUA NGAY</button>
                                                                <button className="rounded-pill btn btn-dark" style={{ width: '50%', border: 'none' }}>THÊM VÀO GIỎ HÀNG</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog>

                                    <Dialog visible={detailItem} style={{ width: '50vw' }} onHide={() => setdetailItem(false)}>
                                        <div className="card-header">
                                            <h6>
                                                {dataDetailItem.CatalogueItemName}
                                            </h6>

                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col d-flex">
                                                    <div className="col-6">
                                                        <span style={{ fontSize: '12px', color: 'grey' }}>Mô tả </span>
                                                        <p style={{ fontSize: '13px', fontWeight: "bold" }}>{dataDetailItem.CatalogueDescription}</p>
                                                        <div style={{ display: "flex" }}>
                                                            <div>
                                                                <span style={{ fontSize: '12px', color: 'grey' }}>Giá bán</span>
                                                                <p style={{ fontSize: '13px', fontWeight: "bold" }}><i className="fa-brands fa-bitcoin" style={{ color: 'orange' }}></i>{dataDetailItem.CataloguePoints}</p>
                                                            </div>
                                                            <div style={{ marginLeft: "20%" }}>
                                                                <span style={{ fontSize: '12px', color: 'grey' }}>Kho</span>
                                                                <p style={{ fontSize: '13px', fontWeight: "bold", marginLeft: '7px' }}>{dataDetailItem.CatalogueQuantity}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="col-6">
                                                        <div className="card border border-3 rounded-3" style={{ height: '14rem', width: '20rem', float: 'right' }}>
                                                            <Image src={dataDetailItem.CatalogueItemImage} className="card-img-top" alt="..." />
                                                            <div>
                                                                <button className="rounded-pill border-end btn btn-light " onClick={() => loadaddtocart(dataDetailItem)} style={{ width: '50%', border: 'none', height: "100%" }}>MUA NGAY</button>
                                                                <button className="rounded-pill btn btn-dark" onClick={() => ThemVaoGio(dataDetailItem)} style={{ width: '50%', border: 'none' }}>THÊM VÀO GIỎ HÀNG</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog>


                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default ShopContainer;