import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
const CheckQuestionRV = (props) => {
    //console.log('dataradio',datamcqquestion?.MCQInfo.Table)
    const { item,index } = props
    //const [checked, setChecked]=useState(datamrqquestion?.MRQInfo.Table1)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];
        console.log('e',e)
        //console.log('_selectedCategories',_selectedCategories)
        if (e.checked) {
            _selectedCategories.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                let selectedCategory = _selectedCategories[i];
                if (selectedCategory == e.target.value) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setSelectedCategories(_selectedCategories);
    }
    useEffect(() => {
        let arr = []
        if(item?.data[0].NM_RESPONSE_4!==null){
            let ANSWR=item?.data[0].NM_RESPONSE_4
            arr=[...ANSWR.split(",").map(Number)]
        }
       
        setSelectedCategories(arr)
    }, [item])
    function renderCheckbox() {
        return (
            item?.data.map((dataItem, index) => {
                return (
                    <div key={dataItem?.NM_ANSWR_ID} className="field-checkbox">
                        <Checkbox disabled inputId={dataItem?.NM_ANSWR_ID} name="category" value={dataItem?.NM_ANSWR_ID} onChange={onCategoryChange} checked={selectedCategories.some((item) => item === dataItem?.NM_ANSWR_ID)} />
                        <label htmlFor={dataItem?.NM_ANSWR_ID} >
                            <div dangerouslySetInnerHTML={{ __html: dataItem?.VC_ANSWR_TXT }}></div>
                        </label>
                    </div>
                )
            })
        )
    }
    return (
        <>
            <div className="d-flex flex-column bd-highlight mb-2">
                <div className="pt-2 pl-2 pb-0 bd-highlight bd-highlight"><span class="badge bg-secondary">Chọn nhiều đáp án</span>
                    {item?.aswer==='N'?
                    <span className="p-2 bd-highlight" style={{color:'red'}}>Câu&nbsp;{index+1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    :
                    <>
                    <span className="p-2 bd-highlight">Câu&nbsp;{index+1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                    <div className="pt-2 pl-2 mt-2 bd-highlight">
                        {renderCheckbox()}
                    </div>
                    </>
                    
                    }
                </div>
                
            </div>
            {/* </div> */}
        </>
    )
}
CheckQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
CheckQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default CheckQuestionRV;
