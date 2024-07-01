import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Chip } from "primereact/chip";
import PropTypes from 'prop-types';
import { Tag } from 'primereact/tag';


const CheckBoxTopicCatalogi = (props) => {
    let { lstTopic } = props;
    const [checked, setchecked] = useState("");
    const [lstKeywords, setlstKeywords] = useState([]);
    const [showLstKey, setShowLstKey] = useState(false);
    const [lstidCheck, setlstidCheck] = useState("");
    const [lstKeyChip, setlstKeyChip] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const changInputKey = (e) => {
        let valIn = e.target.value;
        // let valIn1 = valIn.toUpperCase();
        if (valIn != "") {
            setShowLstKey(true)
            for (let i = 0; i < lstTopic.length; i++) {
                lstTopic[i].key = lstTopic[i].TopicId;
            }
            let arrNew = Object.assign([], lstTopic.filter(x => x.TopicName.indexOf(valIn) >= 0));
            // let arrNew1 = Object.assign([], lstTopic.filter(x => x.TopicName.indexOf(valIn1) >= 0));
            // let newArr = arrNew.concat(arrNew1);

            setlstKeywords(arrNew);
        }
        else {
            setlstKeywords("")
        }

    }

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
        props.getLstCheckBoxTopic(_selectedCategories)
    };

    const clickChip = (item) => {
        const new_arr = selectedCategories.filter(it => it !== item);
        setSelectedCategories(new_arr)
        props.getLstCheckBoxTopic(new_arr)
    }
    return (
        <div>
            <div className="card-body">
                <InputText style={{ width: "100%" }} id="username1" onChange={(e) => changInputKey(e)} aria-describedby="username1-help" className="block" />
                <small style={{margin:"0.5rem 0", fontWeight:"400"}} id="username1-help" className="block">Nhập văn bản để nhận đề xuất từ khóa</small>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {selectedCategories && selectedCategories.map((item, index) => {
                        return (
                            <div key={index} style={{margin:"0.5rem 0"}} >
                                {/* <Chip label={item.TopicName} className="mb-2" removable onRemove={() => clickChip(item)} /> */}
                                <Tag style={{paddingBottom:"5px", background: "#3333", color: "black", fontWeight: "400", borderRadius: "25px", fontSize: "14px", lineHeight: "20px", textAlign: "center" }} className="mr-2" value={item.TopicName}><i style={{ marginLeft: "6px", lineHeight: "20px", textAlign: "center", color: "#3333339c", cursor: "pointer", marginTop:"2px" }} className="fa-sharp fa-solid fa-circle-xmark" onClick={() => clickChip(item)}></i></Tag>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {lstKeywords && lstKeywords.map((item, index) => {
                        return (
                            <div key={index}>
                                {showLstKey == true ?
                                    <div style={{margin:"0.5rem 0"}}>
                                        <Checkbox inputId={item.TopicId}
                                            value={item}
                                            onChange={onCategoryChange} checked={selectedCategories.some(
                                                (it) => it.TopicId === item.TopicId
                                            )} name='SelectedIDCheckbox'></Checkbox>
                                        <label style={{ marginLeft: "1rem" }} htmlFor={item.TopicId}>{item.TopicName}</label>
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

CheckBoxTopicCatalogi.propTypes = {
    getLstCheckBoxTopic: PropTypes.func,
};
CheckBoxTopicCatalogi.defaultProps = {
    getLstCheckBoxTopic: () => { },
}

export default CheckBoxTopicCatalogi;