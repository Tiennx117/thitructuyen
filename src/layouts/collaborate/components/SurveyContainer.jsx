import { Card } from "primereact/card";
import { Checkbox } from 'primereact/checkbox';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import SearchSurvay from './SearchSurvay';
import { surveyService } from "services/surveyService";
import Post from '../../overview/components/Post';
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
import { RadioButton } from "primereact/radiobutton";
import PieSurvey from "./PieSurvey";
import './style/surveyContainer.scss'
import { overViewService } from 'services/overViewService';
import { useQuery } from "shared/hooks/useQuery";
import { FaShareSquare } from 'react-icons/fa'

const SurveyContainer = () => {
    let query = useQuery();
    let itemId = query.get('id');

    const { t } = useTranslation()
    const [datasurveylist, setdatasurveylist] = useState([])
    const [datasurveydetails, setdatasurveydetails] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [selectedName, setselectedName] = useState(null);
    const [visibleFullScreen1, setvisibleFullScreen1] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [disable, setDisable] = useState(false);
    const [des, setDes] = useState("");
    const [listroll, setlistroll] = useState([]);
    const [defaultColor, setdefaultColor] = useState('');
    const [boxItem, setboxItem] = useState('');
    const [shareTree, setshareTree] = useState([]);

    // let { onclickSearch } = props;
    function onClickSearchPost() {
        setvisibleFullScreen1(true)
    }
    const defaultValues = {
        name: ''
    }
    const { control, formState: { errors }, handleSubmit, reset, getValues, setValue, watch } = useForm({
        defaultValues: defaultValues
    });
    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name: "ListSurveyQuestion",
    });
    const body = {
        "OrderBy": "VC_ATTEMPT",
        "PageNumber": 1,
        "RecordCount": 10,
        "SearchText": "",
        "SearchType": "L",
        "SurveyId": 0
    }
    const [body1, setbody1] = useState({
        "Order": "asc",
        "OrderBy": "VC_ATTEMPT",
        "PageNumber": 1,
        "RecordCount": 10,
        "SearchText": "",
        "SearchType": "L",
        "SortOrder": "",
        SurveyId: 0,
        SurveyDescription: ""
    })
    const [body2, setbody2] = useState({
        "Order": "asc",
        "OrderBy": "VC_ATTEMPT",
        "PageNumber": 1,
        "RecordCount": 10,
        "SearchText": "",
        "SearchType": "L",
        "SortOrder": "",
        SurveyId: "",
        QuestionIdList: 39
    })

    useEffect(() => {
        // call api here
        setsearch(search)
        loadApi(body)
        renderdatasurveylist()
        if (itemId != null) {
            setbody1({ SurveyId: itemId });
            loaddeatailsApiItem(body1)
        }
        // loaddeatailsApi(body1)
        // loadresultApi(body2)
    }, []);
    const [search, setsearch] = useState({
        "OrderBy": "VC_ATTEMPT",
        "PageNumber": 1,
        "RecordCount": 10,
        SearchText: "",
        "SearchType": "L",
        "SurveyId": 0
    })

    const filterItems = [
        {
            value: 'Recent',
            text: 'Bộ lọc'
        },
        {
            value: 'ĐÃ LÀM',
            text: 'Đã làm'
        },
        {
            value: 'Chưa làm',
            text: 'Chưa làm'
        }
    ]

    const onSubmit = async (data) => {
        //console.log(data);for (let i = 0; i < data.ListSurveyQuestion.length; i++) {
        for (let i = 0; i < data.ListSurveyQuestion.length; i++) {
            if (data.ListSurveyQuestion[i].UserResponse == "") {
                toast.current.show({ severity: 'error', summary: 'THÔNG BÁO', detail: 'Vui lòng chọn câu trả lời!', life: 2000 });
            } else {
                await surveyService.savesurveyanswer(data);
                await surveyService.getsurveypollresult(data);
                toast.current.show({ severity: 'success', summary: 'THÔNG BÁO', detail: 'Câu trả lời của bạn đã được gửi thành công!', life: 3000 });
            }
        }
    }


    const onChangeFilter = async (item) => {
        search.OrderBy = item.value;
        setsearch(search);
        await loadApi(search);
    }
    function printList(singleLinkedList) {
        let p = singleLinkedList;

        while (p) {
            p.children = p.childs;
            p.key = p.id;
            for (let k = 0; k < p.childs.length; k++) {
                p = p.childs[k];
                p.key = p.id;
                p.children = p.childs;
                for (let j = 0; j < p.children.length; j++) {
                    p.children[j].key = p.children[j].id;
                    p.children[j].children = p.children[j].childs;
                    if (p.children[j].childs == null) {
                        return ""
                    }
                }
                if (p.childs == null) {
                    return ""
                }
            }
        }
    }

    function printList1(singleLinkedList) {
        let p = singleLinkedList;

        while (p) {
            for (let k = 0; k < p.childs.length; k++) {
                if (p.label.indexOf('<b>') >= 0) {
                    let del_str = p.label.replace('<b>', '');
                    p.label = del_str;
                }
                if (p.label.indexOf('</b>') >= 0) {
                    let del_str = p.label.replace('</b>', '');
                    p.label = del_str;
                }
                p = p.childs[k];
                if (p.childs == null) {
                    return ""
                }
            }
        }
    }

    const loadApi = async (body) => {
        if (itemId != null) {
            body.SurveyId = parseInt(itemId);
        }
        let result = await surveyService.getsurveylist(body);
        let lstTree = await overViewService.getsharetreejson();
        let arrTree = JSON.parse(lstTree.data.TreeJson);
        setdatasurveylist(result.data);
        printList1(arrTree[0]);
        printList(arrTree[0]);
        setshareTree(arrTree);
        loaddeatailsApi(result.data[0], body1, 0)
    }
    const loaddeatailsApi = async (data, paramsgetsurveydetails, idx) => {
        paramsgetsurveydetails = { ...paramsgetsurveydetails, ...{ SurveyId: data.SurveyId } }
        if (itemId != null) {
            paramsgetsurveydetails.SurveyId = parseInt(itemId);
        }
        let result = await surveyService.getsurveydetails(paramsgetsurveydetails);
        if (result.data.SurveyMode == "review") {
            let pollres = result.data.QuestionIDList;
            paramsgetsurveydetails = { ...paramsgetsurveydetails, ...{ QuestionIDList: pollres } }
            let poll = await surveyService.getsurveypollresult(paramsgetsurveydetails);
            setlistroll(poll.data.ListSurveyAnswer)

            setDisable(true);
        } else if (result.data.SurveyMode == "open") {
            setDisable(false);
        }

        setDes(result.data.SurveyDescription);
        setSelectedId(data.SurveyId);
        setdatasurveydetails(result.data.ListSurveyQuestion)
        setselectedName(data.SurveyTitle);
        //console.log(result.data);
        result.data.ListSurveyQuestion.forEach((item) => {
            ////console.log(item)
            if (item.QuestionType === 'R') {
                {
                    item.UserResponseArray = item.UserResponse.split(',');
                }
            }
        });
        reset(result.data);
        setboxItem('boxItem' + idx);
        setdefaultColor("0")
    }

    const loaddeatailsApiItem = async (paramsgetsurveydetails) => {
        paramsgetsurveydetails = { ...paramsgetsurveydetails, ...{ SurveyId: parseInt(itemId) } }
        let result = await surveyService.getsurveydetails(paramsgetsurveydetails);
        if (result.data.SurveyMode == "review") {
            let pollres = result.data.QuestionIDList;
            paramsgetsurveydetails = { ...paramsgetsurveydetails, ...{ QuestionIDList: pollres } }
            let poll = await surveyService.getsurveypollresult(paramsgetsurveydetails);
            setlistroll(poll.data.ListSurveyAnswer)

            setDisable(true);
        } else if (result.data.SurveyMode == "open") {
            setDisable(false);
        }

        setDes(result.data.SurveyDescription);
        setSelectedId(result.data.SurveyId);
        setdatasurveydetails(result.data.ListSurveyQuestion)
        setselectedName(result.data.SurveyTitle);
        //console.log(result.data);
        result.data.ListSurveyQuestion.forEach((item) => {
            ////console.log(item)
            if (item.QuestionType === 'R') {
                {
                    item.UserResponseArray = item.UserResponse.split(',');
                }
            }
        });
        reset(result.data);
        setboxItem('boxItem0');
        setdefaultColor("0")
    }

    function renderdatasurveylist() {
        return (
            datasurveylist.map((dateItem, index) => {
                ////console.log('datasurveylist', datasurveylist)
                return (
                    <div key={index} className="row border active" id={boxItem == 'boxItem' + index ? 'bodyItem1' : defaultColor + index}>
                        <div className="col-8 ">
                            <a className="cursor-pointer" onClick={() => loaddeatailsApi(dateItem, body1, index)} style={{ border: 'none', backgroundColor: 'white', color: 'black' }}>
                                <h6>{dateItem.SurveyTitle}</h6>
                            </a>
                            <label className="p-float-label" style={{ fontSize: 12 }}>Hết hạn ngày: {dateItem.SurveyEndDate} | Số lần truy cập: {dateItem.SurveyAttempt}

                                {/* <a style={{ cursor: "pointer", paddingLeft: '10px' }} className="share" title="Chia sẻ" onClick={() => setvisibleFullScreen1(true)}>
                                    <i><FaShareSquare /></i>
                                </a> */}
                            </label>
                        </div>
                        <div className="col-4">
                            <span>
                                <h6 style={{ fontSize: 12 }}>{dateItem.UserName}</h6>
                            </span>
                            <label className="p-float-label" style={{ fontSize: 12 }}>{dateItem.SurveyDuration}</label>
                        </div>
                    </div>
                )
            })

        )
    }

    function searchValue(keySearch) {
        ////console.log('keySearch', keySearch)
        search.SearchText = keySearch;
        setsearch(search);
        loadApi(search)
    }
    // const onClickFilter = (OrderBy) => {
    //     search.OrderBy = OrderBy;
    //     setsearch(search)
    //     loadApi(search)
    // }

    // function closeDetail() {
    //     setVisibleRight(false);
    //     loadApi(body);
    // }

    const toast = useRef(null);

    // const showSuccess = () => {
    //     handleSubmit((e) => onSubmit(e))();
    //     toast.current.show({ severity: 'success', summary: 'THÔNG BÁO', detail: 'Câu trả lời của bạn đã được gửi thành công.', life: 3000 });
    // }
    const getFormErrorMessageArray = (index, fieldColumn) => {
        try {
            return errors['ListSurveyQuestion'] && <small className="p-error">{errors['ListSurveyQuestion'][index.toString()][fieldColumn]['message']}</small>
        }
        catch { }


    };
    const onChecked = (e, index) => {

        let _selectedCategoriesStr = getValues(`ListSurveyQuestion.${index}.UserResponse`);
        //console.log('_selectedCategoriesStr beffore', _selectedCategoriesStr)
        let _selectedCategories = [..._selectedCategoriesStr.split(',')]
        ////console.log(_selectedCategories.length - 1)
        _selectedCategories.splice(_selectedCategories.length - 1, 1);
        if (e.checked) {
            _selectedCategories.push(e.value);
        } else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];

                if (selectedCategory === e.target.value) {
                    //console.log('herre', typeof(_selectedCategories[i]), typeof(e.value))
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setValue(`ListSurveyQuestion.${index}.UserResponseArray`, _selectedCategories);
        if (_selectedCategories.length > 0) {
            setValue(`ListSurveyQuestion.${index}.UserResponse`, _selectedCategories.toString() + ',');
        } else {
            setValue(`ListSurveyQuestion.${index}.UserResponse`, _selectedCategories.toString());
        }

        let _selectedCategoriesStr2 = getValues(`ListSurveyQuestion.${index}.UserResponse`);
        //console.log('_selectedCategoriesStr2 after', _selectedCategoriesStr2)
    }
    return (
        <>
            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-learning-container row">
                        <h3 style={{ marginTop: '5px' }}>KHẢO SÁT</h3>
                        <div className="col-5 scroll-wrapper">
                            <div className="input-group justify-content-end">
                                <DropdownFilter items={filterItems} onChange={onChangeFilter} />
                                <SearchSurvay onChange={data => searchValue(data.trim())} />
                            </div>
                            <br />
                            {renderdatasurveylist()}
                            <Post shareTree={shareTree} onclickshow={() => setvisibleFullScreen1(false)}
                                visiblefull={visibleFullScreen1}
                            >
                            </Post>

                        </div>
                        <div className="col-7 scroll-wrapper">
                            <div style={{
                                border: '1px solid #dddddd', borderRadius: '5px', borderBottom: 'none', padding: '10px'
                            }}>
                                <span><h5>{selectedName}</h5></span>
                                <div className="d-flex flex-column">
                                    <div className="col-12 border rounded-2 m-2">
                                        <h6>Mô tả</h6>
                                        <label>
                                            {des == '' ? 'Không có miêu tả'
                                                : <span dangerouslySetInnerHTML={{ __html: des }}></span>
                                            }
                                        </label>

                                    </div>
                                    {fields?.map((item, index) => {
                                        return (
                                            <div key={index} className="col-12 border rounded-2 m-2">
                                                <div className="row">
                                                    <label className="p-float-label" style={{ 'padding': '5px' }}>Q{index + 1}: <span dangerouslySetInnerHTML={{ __html: item?.QuestionText }}></span></label>
                                                    {item.QuestionType === 'D' &&
                                                        <>
                                                            <div >
                                                                <Controller
                                                                    render={({ field }) => <textarea className="col-8" disabled={disable} {...field} value={field.value ?? ''} type='text' style={{ minHeight: 100, marginLeft: '10px' }} />}
                                                                    // rules={{ required: 'Vui lòng nhập!' }}
                                                                    name={`ListSurveyQuestion.${index}.UserResponse`}
                                                                    control={control} />
                                                                {getFormErrorMessageArray(index, 'UserResponse')}

                                                            </div>
                                                        </>}
                                                </div>

                                                {item.QuestionType === 'C' &&
                                                    <>
                                                        <div className="row ">
                                                            <div>
                                                                {item?.OptionList?.map(((item2, index2) => {
                                                                    return (
                                                                        <div key={index2} className="field-radiobutton">
                                                                            <Controller
                                                                                // rules={{ required: 'Vui lòng nhập!' }}
                                                                                render={({ field }) => <><RadioButton
                                                                                    disabled={disable}
                                                                                    value={field.value ?? ''} onChange={(e) => {
                                                                                        setValue(`ListSurveyQuestion.${index}.UserResponse`, e.value);
                                                                                        field.onChange(e.value);
                                                                                    }} checked={watch(`ListSurveyQuestion.${index}.UserResponse`) === item2.OptionId.toString()} />
                                                                                    <label htmlFor={item2.OptionId}>{item2.OptionText}</label>
                                                                                </>}

                                                                                name={`ListSurveyQuestion.${index}.OptionList.${index2}.OptionId`}
                                                                                control={control} />
                                                                        </div>
                                                                    )
                                                                }))}
                                                                <hr />
                                                                {
                                                                    disable == true ?
                                                                        <PieSurvey
                                                                            labels={listroll[index].SurveyChartDataList.map(x => x.label)}
                                                                            data={listroll[index].SurveyChartDataList.map(x => x.data)}
                                                                            colors={listroll[index].SurveyChartDataList.map(x => x.color)} />
                                                                        : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        {/* {getFormErrorMessageArray(index, 'UserResponse')}  check lại*/}
                                                    </>}

                                                {item.QuestionType === 'R' &&
                                                    <>
                                                        <div className="row ">
                                                            <div>
                                                                {item?.OptionList?.map(((item2, index2) => {
                                                                    return (<>
                                                                        <div key={index2} className="field-radiobutton">
                                                                            <Controller
                                                                                // rules={{ required: 'Vui lòng nhập!' }}
                                                                                render={({ field }) => <><Checkbox
                                                                                    disabled={disable}
                                                                                    value={field.value ?? ''} onChange={(e) => {
                                                                                        onChecked(e, index);
                                                                                    }}
                                                                                    checked={watch(`ListSurveyQuestion.${index}.UserResponseArray`)?.some((item) => item === item2.OptionId)}
                                                                                />
                                                                                    <label htmlFor={item2.OptionId}>{item2.OptionText}</label>
                                                                                </>}
                                                                                name={`ListSurveyQuestion.${index}.OptionList.${index2}.OptionId`}
                                                                                control={control} />
                                                                        </div>
                                                                    </>
                                                                    )
                                                                }))}
                                                                <hr />
                                                                {
                                                                    disable == true ?
                                                                        <PieSurvey
                                                                            labels={listroll[index].SurveyChartDataList.map(x => x.label)}
                                                                            data={listroll[index].SurveyChartDataList.map(x => x.data)}
                                                                            colors={listroll[index].SurveyChartDataList.map(x => x.color)} />
                                                                        : ''
                                                                }
                                                            </div>
                                                        </div>
                                                    </>}

                                                {item.QuestionType === 'T' &&
                                                    <>
                                                        <div className="field-radiobutton">
                                                            <Controller
                                                                // rules={{ required: 'Vui lòng nhập!' }}
                                                                render={({ field }) => <>
                                                                    <RadioButton disabled={disable} id="flexRadioDefault1" defaultValue={field.value ?? ''} value={'True'} onChange={(e) => {
                                                                        setValue(`ListSurveyQuestion.${index}.UserResponse`, e.value);
                                                                        field.onChange(e.value);
                                                                        //console.log(e.value)
                                                                    }} checked={watch(`ListSurveyQuestion.${index}.UserResponse`) === 'True'} />
                                                                    <label htmlFor="flexRadioDefault1">True</label>

                                                                    <RadioButton disabled={disable} id="flexRadioDefault2" defaultValue={field.value ?? ''} style={{ marginLeft: '15px' }} value={'False'} onChange={(e) => {
                                                                        setValue(`ListSurveyQuestion.${index}.UserResponse`, e.value);
                                                                        field.onChange(e.value);
                                                                        //console.log(e.value)
                                                                    }} checked={watch(`ListSurveyQuestion.${index}.UserResponse`) === 'False'} />
                                                                    <label htmlFor="flexRadioDefault2">False</label>

                                                                </>}
                                                                name={`ListSurveyQuestion.${index}.UserResponse`}
                                                                control={control} />
                                                        </div>
                                                        <hr />
                                                        {
                                                            disable == true ?
                                                                <PieSurvey
                                                                    labels={listroll[index].SurveyChartDataList.map(x => x.label)}
                                                                    data={listroll[index].SurveyChartDataList.map(x => x.data)}
                                                                    colors={listroll[index].SurveyChartDataList.map(x => x.color)} />
                                                                : ''
                                                        }
                                                    </>}
                                            </div>)
                                    })}
                                </div>
                                <div className="col-9 align-self-end" style={{ 'right': '5px' }}>
                                    {
                                        disable ? ''
                                            :
                                            <Button type="submit" label="Gửi đi" className="p-button-primary" />
                                    }

                                </div>
                                <Toast ref={toast} />
                            </div>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    )
}
export default SurveyContainer;