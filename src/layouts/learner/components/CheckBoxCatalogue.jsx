import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Chip } from "primereact/chip";
import PropTypes from 'prop-types';
import { Tag } from 'primereact/tag';


const CheckBoxCatalogue = (props) => {
    let { lstKeyWord } = props;
    const [checked, setchecked] = useState("");
    const [lstKeywords, setlstKeywords] = useState([]);
    const [showLstKey, setShowLstKey] = useState(false);
    const [lstidCheck, setlstidCheck] = useState("");
    const [lstKeyChip, setlstKeyChip] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    // const sendData = (data) => {
    //     props.getLstCheckBox(data);
    // };

    const changInputKey = (e) => {
        let valIn = e.target.value;
        // let valIn1 = valIn.toUpperCase();
        if (valIn != "") {
            setShowLstKey(true)
            for (let i = 0; i < lstKeyWord.length; i++) {
                lstKeyWord[i].key = lstKeyWord[i].TagId;
            }
            let arrNew = Object.assign([], lstKeyWord.filter(x => x.TagName.indexOf(valIn) >= 0));
            // let arrNew1 = Object.assign([], lstKeyWord.filter(x => x.TagName.indexOf(valIn1) >= 0));
            // let newArr = arrNew.concat(arrNew1);
            setlstKeywords(arrNew);
        }
        else {
            setlstKeywords("")
        }

    }

    // const onchangCheckBox = async (item, idx) => {
    //     let arrU = lstidCheck;
    //     if (arrU != "") {
    //         if (arrU.includes((item) + idx)) {
    //             if (arrU.includes((',') + (item) + idx)) {
    //                 arrU = arrU.replace((',' + (item) + idx), '')
    //             }
    //             else if (arrU.includes((item) + idx + (','))) {
    //                 arrU = arrU.replace(((item) + idx + ','), '')
    //             }
    //             else {
    //                 arrU = arrU.replace((item) + idx, '');
    //             }
    //         }
    //         else {
    //             arrU = arrU + ',' + (item) + idx;
    //         }
    //     }
    //     else {
    //         arrU = arrU + (item) + idx;
    //     }
    //     setlstidCheck(arrU)
    //     console.log('arru', arrU)
    //     setchecked(arrU)
    //     let arr = lstKeyChip;
    //     let arrchecked = arrU.split(',')
    //     for (let i = 0; i < arrchecked.length; i++) {
    //         for (let j = 0; j < lstKeyWord.length; j++) {
    //             if (arrchecked[i] == (lstKeyWord[j].TagName + lstKeyWord[j].TagId)) {
    //                 if (lstKeyChip.includes(lstKeyWord[j]) == false) {
    //                     arr.push(lstKeyWord[j]);

    //                 }

    //             }
    //         }

    //     }
    //     if (arrU == "") {
    //         setlstKeyChip([])
    //     }
    //     else {
    //         setlstKeyChip(arr)
    //     }

    // }
    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
        } else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }

        setSelectedCategories(_selectedCategories);
        props.getLstCheckBox(_selectedCategories)
    };

    const clickChip = (item) => {
        const new_arr = Object.assign([], selectedCategories.filter(it => it !== item))
        setSelectedCategories(new_arr)
        props.getLstCheckBox(new_arr)
        console.log('new_arr', new_arr)
        // let itemInfo = item.TagName + item.TagId
        // setchecked(checked.replace(itemInfo, ""));
        // setlstidCheck(lstidCheck.replace(itemInfo, ""));
        // const new_arr = lstKeyChip.filter(it => it !== item);
        // setlstKeyChip(new_arr)
    }
    return (
        <div>
            {console.log('selectedCategories', selectedCategories)}
            <div className="card-body">
                <InputText style={{ width: "100%" }} id="username1" onChange={(e) => changInputKey(e)} aria-describedby="username1-help" className="block" />
                <small style={{ margin: "0.5rem 0", fontWeight: "400" }} id="username1-help" className="block">Nhập văn bản để nhận đề xuất từ khóa</small>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {selectedCategories && selectedCategories.map((item, index) => {
                        return (
                            <div key={index} style={{ margin: "0.5rem 0" }}>
                                {/* <span style={{marginLeft:"4px", fontSize:"16px"}} onClick={() => clickChip(item)}>x</span> */}
                                <Tag style={{ paddingBottom: "5px", background: "#3333", color: "black", fontWeight: "400", borderRadius: "25px", fontSize: "14px", lineHeight: "20px", textAlign: "center" }} className="mr-2" value={item.TagName}><i style={{ marginLeft: "6px", lineHeight: "20px", textAlign: "center", color: "#3333339c", cursor: "pointer", marginTop: "2px" }} className="fa-sharp fa-solid fa-circle-xmark" onClick={() => clickChip(item)}></i></Tag>
                                {/* <Chip id={index} label={item.TagName} className="mb-2" removable onRemove={() => clickChip(item)} /> */}

                            </div>
                        )
                    })}
                </div>
                <div>
                    {lstKeywords && lstKeywords.map((item, index) => {
                        return (
                            <div key={index}>
                                {showLstKey == true ?
                                    // <div>
                                    //     <Checkbox inputId={item.TagId} onChange={() => onchangCheckBox(item.TagName, item.TagId)} checked={checked.includes((item.TagName) + (item.TagId)) == true ? true : false} name='SelectedIDCheckbox'></Checkbox>
                                    //     <label htmlFor={item.TagId}>{item.TagName}</label>
                                    // </div>
                                    <div style={{ margin: "0.5rem 0" }}>
                                        <Checkbox inputId={item.TagId}
                                            value={item}
                                            onChange={onCategoryChange} checked={selectedCategories.some(
                                                (it) => it.TagId === item.TagId
                                            )} name='SelectedIDCheckbox'></Checkbox>
                                        <label style={{ marginLeft: "1rem" }} htmlFor={item.TagId}>{item.TagName}</label>
                                    </div>
                                    : ""
                                }

                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}


CheckBoxCatalogue.propTypes = {
    getLstCheckBox: PropTypes.func,
};
CheckBoxCatalogue.defaultProps = {
    getLstCheckBox: () => { },
}
export default CheckBoxCatalogue;