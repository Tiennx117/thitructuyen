import { Card } from "primereact/card";
import { BsFlagFill } from "react-icons/bs";
import { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import PropTypes from 'prop-types';
import '../../exam.scss';
import { useSelector, useDispatch } from 'react-redux';
import Image, { ImagePreview } from "components/Image";
const SortQuestionRV = (props) => {
    const { item, index, sortQuestionReview } = props
    const [dataSortReview, setdataSortReview] = useState([])
    useEffect(() => {
        let arr = [...item?.data]
        arr.sort(function (a, b) { return a.NM_RESPONSE_6 - b.NM_RESPONSE_6 });
        setdataSortReview(arr)
    }, [item])
    return (
        <>
            <div className="d-flex flex-column bd-highlight mb-1">
                <div className="p-2 bd-highlight"><span class="badge bg-secondary">Sắp xếp câu</span>
                    {item?.aswer === 'N' ?
                        <span className="p-2 bd-highlight" style={{ color: 'red' }}>Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                        :
                        <>
                            <span className="p-2 bd-highlight">Câu&nbsp;{index + 1}:&nbsp;<span dangerouslySetInnerHTML={{ __html:item?.data[0].VC_QSTN_TXT  }}></span></span>
                            <div className="pt-2 bd-highlight">
                                <div className="d-flex flex-row bd-highlight mb-1">
                                    <div className="p-2 bd-highlight">
                                        {dataSortReview.map((item, index) => (
                                            <div index={index} style={{ backgroundColor: 'rgb(221, 221, 221)', padding: '8px', border: '1px soid black' }}>
                                                <div className="question-type5">
                                                    <div dangerouslySetInnerHTML={{ __html: item?.VC_ANSWR_TXT }}></div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </>

                    }
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
SortQuestionRV.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};
SortQuestionRV.defaultProps = {
    onChange: () => { },
    onSubmit: () => { }
}
export default SortQuestionRV;
