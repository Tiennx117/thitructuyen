
import './style/formHomeWork.scss';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { learningService } from 'services/learningService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { RiInfraredThermometerFill } from 'react-icons/ri';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const FormFeedBackContainer = (props) => {
    const [editFeedBack, seteditFeedBack] = useState(false);
    const [dataForm, setDataForm] = useState([]);
    const [idForm, setidForm] = useState(0);
    const { onHiden } = props;

    useEffect(() => {
        if (props.iltID) {
            loadApi();
        }
    }, [props.iltID]);

    const loadApi = async () => {
        const params = {
            "iltID": props.iltID,
            "sessionID": props.sessionID,
            "formID": 0,
            "feedbackData": '',
            "ILTName": '',
        }
        let feedBackForm = await learningService.getfeedbackformapi(params);
        setDataForm(feedBackForm.data);
        console.log('dataaa', feedBackForm.data);
        setidForm(feedBackForm.data.formID)
        //setDataFieldValues(feedBackForm.data.feedBackFormFieldValues);
        let data1 = feedBackForm.data.feedBackFormFields.map(x => {
            x.fieldOptions = feedBackForm.data.feedBackFormFieldValues.filter(y => y.fieldID === x.fieldID);
            return x;
        })
    }

    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    const changInputTextBox = (event, id) => {
        let text = id.toString();
        setValue(text, event)
    }
    const changInputTextArea = (event, id) => {
        let text = id.toString();
        setValue(text, event)
    }

    const onSubmit = async (data) => {
        var array = Object.keys(data).map((key) => [Number(key), data[key]]);
        debugger;
        const params1 = {
            "iltID": props.iltID,
            "sessionID": props.sessionID,
            "formID": 0,
            "feedbackData": '',
            "ILTName": '',
        }

        let feedBackForm = await learningService.getfeedbackformapi(params1);
        setDataForm(feedBackForm.data);

        var str = "";
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var str4 = "";

        for (var i = 0; i < feedBackForm.data.feedBackFormFields.length; i++) {
            var field = feedBackForm.data.feedBackFormFields[i];
            for (var j = 0; j < array.length; j++) {
                if (array[j][0] == field.fieldID) {
                    if (field.fieldType == "TextBox") {
                        str1 += field.fieldID.toString() + '#~#' + array[j][1] + '~**~';
                    }
                }
            }
        }

        for (var i = 0; i < feedBackForm.data.feedBackFormFields.length; i++) {
            var field = feedBackForm.data.feedBackFormFields[i];
            for (var j = 0; j < array.length; j++) {
                if (array[j][0] == field.fieldID) {
                    if (field.fieldType == "Radio") {
                        str2 += field.fieldID.toString() + '~*~0#~#' + array[j][1] + '~**~';
                    }
                }
            }
        }

        for (var i = 0; i < feedBackForm.data.feedBackFormFields.length; i++) {
            var field = feedBackForm.data.feedBackFormFields[i];
            for (var j = 0; j < array.length; j++) {
                if (array[j][0] == field.fieldID) {
                    if (field.fieldType == "TextArea") {
                        str3 += field.fieldID.toString() + '~*~0#~#' + array[j][1] + '~**~';
                    }
                }
            }
        }

        for (var i = 0; i < feedBackForm.data.feedBackFormFields.length; i++) {
            var field = feedBackForm.data.feedBackFormFields[i];
            for (var j = 0; j < array.length; j++) {
                if (array[j][0] == field.fieldID) {
                    if (field.fieldType == "Select") {
                        str4 += field.fieldID.toString() + '~*~0#~#' + array[j][1].valueID + '~**~';
                    }
                }
            }
        }

        debugger
        str = str1 + str2 + str3 + str4;

        const userDefault = getCurrentUserDefault();
        const params = {
            "sessionID": props.sessionID,
            "formID": idForm,
            "iltID": props.iltID,
            ILTName: '',
            feedbackData: str,
            userID: userDefault.UserId
        }

        await learningService.saveiltfeedbackapi(params);

        // await learningService.getfeedbackdetailsapi(data);
        seteditFeedBack(true)
        onHiden();
    };

    return (
        <>
            {console.log('dataForm', dataForm.feedBackFormFields)}
            <div className="animated fadeInUpBig show" id="feedback">
                <div id="feedbackform">
                    <div className=" assignment-header-span"> {dataForm.iltName} </div>
                    <form onSubmit={handleSubmit(onSubmit)} onHide={close}>
                        <table id="feedbackFormTable" data-role="table" data-mode="reflow" style={{ margin: '0px 0 0 10px' }}>
                            <tbody>
                                {dataForm.feedBackFormFields?.map((item, index) => (
                                    <tr key={index} >
                                        <td className="feedbackLblTd">
                                            <span>{item.fieldLebel}</span>
                                        </td>
                                        <td className="feedbackCtlTd">
                                            {item.fieldType == "TextBox" &&
                                                <>
                                                    <InputText type="text" id={item.fieldID} name={item.fieldID} onChange={(e) => changInputTextBox(e.target.value, item.fieldID)} />
                                                </>
                                            }

                                            {item.fieldType == "TextArea" &&
                                                <>
                                                    <InputTextarea id={item.fieldID} name={item.fieldID} style={{ width: '525px', height: '126px' }} onChange={(e) => changInputTextArea(e.target.value, item.fieldID)} />
                                                </>
                                            }

                                            {item.fieldType == "Select" &&
                                                <>
                                                    <div>
                                                        <Controller
                                                            name={item.fieldID.toString()}
                                                            control={control}
                                                            rules={{ required: 'Không được để trống' }}
                                                            render={({ field, fieldState }) => (
                                                                <Dropdown
                                                                    value={field.value}
                                                                    optionLabel="formText"
                                                                    placeholder="Select a Value"
                                                                    name={item.fieldID}
                                                                    options={item.fieldOptions}
                                                                    control={control}
                                                                    onChange={(e) => {
                                                                        field.onChange(e.value)
                                                                    }}
                                                                // className={classNames({ 'p-invalid': fieldState.error })}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    {getFormErrorMessage(item.fieldID)}
                                                </>
                                            }

                                            {item.fieldType == "Radio" &&
                                                <>
                                                    <Controller
                                                        name={item.fieldID.toString()}
                                                        control={control}
                                                        rules={{ required: 'Không được để trống' }}
                                                        render={({ field }) => (
                                                            <>
                                                                <div className="flex align-items-center">
                                                                    {item.fieldOptions?.map((option, index2) => {
                                                                        return (
                                                                            <>
                                                                                <RadioButton key={index2} inputId={item.fieldID} {...field} inputRef={field.ref} value={option.valueID} checked={field.value === option.valueID} />
                                                                                <label htmlFor={item.fieldID} className="ml-1 mr-3">
                                                                                    {option.formText}
                                                                                </label>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </div>
                                                                {getFormErrorMessage(field.name)}
                                                            </>
                                                        )}
                                                    />
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                        <a className="pop-cross-icon-custom" href="javascript:void(0);" /> {
                        }

                        <Button style={{ margin: '30px' }} className="btn btn-primary mr-3" label={"Gửi phản hồi"} autoFocus type="submit" />
                    </form>
                </div>
            </div>
        </>
    )
}
FormFeedBackContainer.propTypes = {
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
export { FormFeedBackContainer }