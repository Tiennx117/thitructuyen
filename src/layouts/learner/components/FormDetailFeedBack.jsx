
import './style/formHomeWork.scss';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { learningService } from 'services/learningService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import './style/formdetailfeedback.scss';

const FormDetailFeedBack = (props) => {
    const [editFeedBack, seteditFeedBack] = useState(false);
    const userDefault = getCurrentUserDefault();
    const [dataForm, setDataForm] = useState([]);
    const [idForm, setidForm] = useState(0);

    const params = {
        "iltID": props.iltID,
        "sessionID": props.sessionID,
        "formID": props.formID,
        "feedbackData": props.feedbackData,
        "ILTName": props.ILTName,
    }
    useEffect(() => {
        if (props.iltID) {
            loadApi();
        }
    }, [props.iltID]);

    const loadApi = async () => {
        // let feedBackForm = await learningService.getfeedbackdetailsapi(params);
        // setDataForm(feedBackForm.data);
        // setidForm(feedBackForm.data.formID);
        // //setDataFieldValues(feedBackForm.data.feedBackFormFieldValues);
        // let data1 = feedBackForm.data.feedBackFormFields.map(x => {
        //     x.fieldOptions = feedBackForm.data.feedBackFormFieldValues.filter(y => y.fieldID === x.fieldID);
        //     return x;
        // })
    }

    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    let { feedBackFormFields, feedBackFormFieldValues } = props.dataDetail;

    return (
        <>
            <div className="animated fadeInUpBig show" id="feedback">
                <div id="feedbackform">
                    {/* <div className="assignment-header border-bottom">
                        <span className="assignment-header assignment-header-span" style={{ fontWeight: 'bold' }}> {props.dataDetail.iltName} </span>
                    </div> */}
                    <div className=" assignment-header-span"> {props.dataDetail.iltName} </div>
                    <form >
                        <table id="feedbackFormTable" data-role="table" data-mode="reflow" style={{ margin: '0px 0 0 10px' }}>
                            <tbody>
                                {
                                    feedBackFormFields?.map((item, index) => {
                                        return (
                                            <>
                                                <tr className="big" key={index}>

                                                    <td style={{ width: '60%' }}>{item.fieldLebel} :</td>

                                                    {feedBackFormFieldValues.map((it, idx) => {
                                                        return (
                                                            it.fieldID == item.fieldID &&
                                                            <td>
                                                                <span className="left" style={{ color: '#8e99ab' }}>{it.fieldValue}</span>
                                                            </td>

                                                        )
                                                    })}

                                                </tr>
                                            </>

                                        )
                                    })



                                }
                            </tbody>
                        </table>
                        <a className="pop-cross-icon-custom" href="javascript:void(0);" /> {
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
FormDetailFeedBack.propTypes = {
    sessionID: PropTypes.oneOfType([ //Id ca học
        PropTypes.string,
        PropTypes.number
    ]),
    iltID: PropTypes.oneOfType([ //Id lớp học tập trung
        PropTypes.string,
        PropTypes.number
    ]),
    ILTName: PropTypes.string,
    formID: PropTypes.number,
    feedbackData: PropTypes.string,

};
export { FormDetailFeedBack }