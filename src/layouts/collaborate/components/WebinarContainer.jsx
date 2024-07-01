import { Card } from "primereact/card";
import { Checkbox } from 'primereact/checkbox';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { webinarService } from 'services/webinarService';
import { Image } from 'components/Image';
import { InputText } from 'primereact/inputtext';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { Tag } from 'primereact/tag';


const WebinarContainer = () => {

    const [lstcheckDefault, setlstcheckDefault] = useState("");
    const [checkboxall, setcheckboxall] = useState(false);
    const [checked, setchecked] = useState("");
    const [lstidCheck, setlstidCheck] = useState("");
    const [lstwebinar, setLstWebinar] = useState([]);
    const [totalkey, settotalkey] = useState(0);
    const [lstkeyword, setLstkeyword] = useState([]);
    const [keySearch, setKeysearch] = useState('');
    const [filterDown, setFilterDown] = useState("");
    const [sortColumnlst, setsortColumnlst] = useState("");
    const [sortOrderlst, setsortOrderlst] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation()
    const [checkboxSelected, setCheckboxSelected] = useState([]);
    const onCityChange = (e) => {
        let selectedCities = [...checkboxSelected];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setCheckboxSelected(selectedCities);
    }


    const [advanceSearch, setAdvanceSearch] = useState({
        CorporateId: 1,
        FilterType: "All",
        WebinarId: 0,
        WebinarKeywords: " ",
        pageNumber: 1,
        pageSize: 10,
        searchText: "",
        sortColumn: "DT_ASSGNMNT_DT",
        sortOrder: "DESC",
    });
    const [advanceSearch1, setAdvanceSearch1] = useState({
        CorporateId: 1,
        FilterType: "All",
        WebinarId: 0,
        WebinarKeywords: " ",
        pageNumber: 1,
        pageSize: 10,
        searchText: "",
        sortColumn: "DT_ASSGNMNT_DT",
        sortOrder: "DESC",
    });

    const filterItems = [
        {
            value: 'Tất cả',
            text: 'Tất cả'
        },
        {
            value: 'Trực tuyến',
            text: 'Trực tuyến'
        },
        {
            value: 'Ngoại tuyến',
            text: 'Ngoại tuyến'
        }
    ]
    const filterItems1 = [
        {
            sortOrder: 'DESC',
            sortColumn: 'DT_ASSGNMNT_DT',
            text: 'Gần đây'
        },
        {
            sortOrder: 'ASC',
            sortColumn: 'VC_WBMNR_NM',
            text: 'Từ A đến Z'
        }
        ,
        {
            sortOrder: 'DESC',
            sortColumn: 'VC_WBMNR_NM',
            text: 'Từ Z đến A'
        }
    ]
    function onKeySearchChange(text) {
        let textTrim = text.trim();
        setKeysearch(textTrim);
    }

    const filterCourse = async (value) => {
        setLoading(true);
        let result = await webinarService.getwebinarlist(value);
        setLstWebinar(result.data.WebinarDetails)
        setLoading(false);
    }
    const onChangeFilter = (item) => {
        setFilterDown(item.value);
        setAdvanceSearch({ ...advanceSearch, FilterType: item.value });
    }
    const onChangeFilter1 = (item) => {
        setsortColumnlst(item.sortColumn);
        setsortOrderlst(item.sortOrder);
        setAdvanceSearch({ ...advanceSearch, sortColumn: item.sortColumn, sortOrder: item.sortOrder });
    }
    function keyDown(e) {
        if (e.key == 'Enter') {
            setAdvanceSearch({ ...advanceSearch, searchText: e.target.value.trim(), sortColumn: sortColumnlst, sortOrder: sortOrderlst, FilterType: filterDown });
        }
    }
    const onchangCheckBox = async (item, idx) => {
        let arrU = lstidCheck;
        if (arrU != "") {
            if (arrU.includes(item)) {
                if (arrU.includes((',') + item)) {
                    arrU = arrU.replace((',' + item), '')
                }
                else if (arrU.includes(item + (','))) {
                    arrU = arrU.replace((item + ','), '')
                }
                else {
                    arrU = arrU.replace(item, '');
                }
            }
            else {
                arrU = arrU + ',' + item;
            }
        }
        else {
            arrU = arrU + item;
        }
        setlstidCheck(arrU)
        console.log('arr', arrU)
        setchecked(arrU)
        // let obj = { ...advanceSearch1, ...advanceSearch, WebinarKeywords: arrU };
        // console.log(obj)
        // let lstconversation = await webinarService.getwebinarlist(obj);
        // setLstWebinar(lstconversation.data.WebinarDetails);
        setAdvanceSearch({ ...advanceSearch, WebinarKeywords: arrU });
        // if (checked == ('check' + idx)) {
        //     setchecked("")
        // }
        // else {
        //     setchecked('check' + idx)
        // }
    }

    const checkAll = () => {
        if (checkboxall == false) {
            let ele = document.getElementsByName('SelectedIDCheckbox');
            let arrU = lstcheckDefault;
            for (let i = 0; i < ele.length; i++) {
                if (ele[i].type == 'checkbox') {
                    if (arrU != "") {
                        if (arrU.includes(ele[i].id)) {
                            if (arrU.includes((',') + ele[i].id)) {
                                arrU = arrU.replace((',' + ele[i].id), '')
                            }
                            else if (arrU.includes(ele[i].id + (','))) {
                                arrU = arrU.replace((ele[i].id + ','), '')
                            }
                            else {
                                arrU = arrU.replace(ele[i].id, '');
                            }
                        }
                        else {
                            arrU = arrU + ',' + ele[i].id;
                        }
                    }
                    else {
                        arrU = arrU + ele[i].id;
                    }

                    // setValue('SelectedUserIds', arrUser)
                    // setAdvanceSearch({ ...advanceSearch, WebinarKeywords: "" })
                }
                setchecked(arrU);
                setlstcheckDefault(arrU);
                setcheckboxall(true);
                setAdvanceSearch({ ...advanceSearch, WebinarKeywords: "" })
            }
        }
        else {
            setchecked("");
            setlstcheckDefault("")
            setcheckboxall(false)
        }

    }
    const loadApi = async (val) => {
        let lstconversation = await webinarService.getwebinarlist(val);
        settotalkey(lstconversation.data.TotalRecords);
        setLstWebinar(lstconversation.data.WebinarDetails);

        let obj = {
            CorporateId: 1,
        }
        let lstkeyword = await webinarService.getwebinarsummary(obj);
        setLstkeyword(lstkeyword.data.WebinarKeywords);

    }
    useEffect(() => {
        filterCourse(advanceSearch);
    }, [advanceSearch]);
    useEffect(() => {
        // call api here
        loadApi(advanceSearch);
    }, []);
    return (
        <>
            <div className="my-learning-container row">
                <div className="col-3 scroll-wrapper">
                    <div id="collapseTwo" aria-labelledby="headingTwo">
                        <div className="card-body bg-light">
                            <div className="card-header mb-3" style={{ backgroundColor: "#3333" }}>
                                <span style={{ fontSize: "16px", fontWeight: "700" }}>TỪ KHÓA</span>
                            </div>
                            <div className="field-checkbox ml-3">
                                {/* <input type="checkbox" onChange={() => checkAll()}></input> */}
                                <Checkbox inputId="checkboxFilterAll" onChange={() => checkAll()} checked={checkboxall}></Checkbox>
                                <label htmlFor="checkboxFilterAll">TẤT CẢ ({totalkey})</label>
                            </div>
                            {lstkeyword && lstkeyword.map((item, index) => {
                                return (
                                    <div key={index} className="field-checkbox ml-3">
                                        <Checkbox inputId={item.Keyword} onChange={() => onchangCheckBox(item.Keyword, index)} checked={checked.includes(item.Keyword) == true ? true : false} name='SelectedIDCheckbox'></Checkbox>
                                        {/* <input id={item.Webinar[0]} type="checkbox" onChange={() => onchangKey(item.Keyword)} name='SelectedIDCheckbox'></input> */}
                                        <label style={{ textTransform: "uppercase" }} htmlFor={item.Keyword}>{item.Keyword}({item.Count})</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-9 scroll-wrapper">
                    <Card title={t('key-title', 'Hội thảo trực tuyến')}>
                        <div style={{ display: "flex", marginBottom: "14px" }}>
                            <div className="p-inputgroup" style={{ width: '488px' }}>
                                <InputText onKeyDown={(e) => keyDown(e)} onChange={(e) => onKeySearchChange(e.target.value)} placeholder="Nhập từ khoá tìm kiếm" />
                                <Button onClick={() => {
                                    setAdvanceSearch({ ...advanceSearch, searchText: keySearch });
                                }} icon="pi pi-search" />

                            </div>
                            <div className=''>
                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                            </div>
                            <div className=''>
                                <DropdownFilter items={filterItems1} onChange={onChangeFilter1} />
                            </div>
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                            {lstwebinar && lstwebinar.map((item, index) => {
                                return (
                                    <div key={index} className="row" style={{ border: '1px solid #dddddd', marginBottom: "16px", marginLeft: "0.1rem" }}>
                                        <div className="col-2 align-items-center justify-content-center text-center">
                                            <a href={item.WebinarPath} target="_blank">
                                                <Image src="/images/media2.png" style={{ height: '100px' }}></Image>
                                            </a>
                                        </div>
                                        <div style={{ paddingLeft: "1rem" }} className="col-4">
                                            <h5>{item.WebinarName}</h5>
                                            <label className="p-float-label">{item.WebinarDescription}</label>
                                            <h6>Từ khóa: {item.Keywords || "Không khả dụng"}</h6>
                                        </div>
                                        <div className="col-2 align-items-center justify-content-center text-center">
                                            {/* <kbd style={{ height: "30px", color: "black", backgroundColor: "#e3e3e3", borderColor: "#4e596b", borderRadius: "4px", fontSize: "16px" }}>{item.Mode}</kbd> */}
                                            <Tag className="mr-2" value={item.Mode} rounded></Tag>
                                        </div>
                                        <div className="col-2" style={{ border: '1px solid #dddddd', borderBottom: 'none', borderTop: 'none' }}>
                                            <h6 style={{ fontSize: "14px" }} className="align-items-center justify-content-center text-center">BẮT ĐẦU VÀO</h6>
                                            <h5 className="align-items-center justify-content-center text-center">-</h5>
                                        </div>
                                        <div className="col-2">
                                            <h6 className="align-items-center justify-content-center text-center">THỜI LƯỢNG</h6>
                                            <h5 style={{ fontSize: "16px" }} className="align-items-center justify-content-center text-center">{item.Duration == 0 ? "NA" : item.Duration}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                            {lstwebinar.length == 0 && 'Không có mục nào để hiển thị'}
                        </div>
                    </Card>
                </div>

            </div>
        </>
    )
}
export default WebinarContainer;