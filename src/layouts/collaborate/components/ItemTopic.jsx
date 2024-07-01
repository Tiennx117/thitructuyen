import React from 'react'
import './style/ItemTopic.scss'
import { AiFillLike } from 'react-icons/ai'
import { FaComment, FaShareSquare } from 'react-icons/fa'
import { RiMore2Fill } from 'react-icons/ri'
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';
import { Image } from 'components/Image';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


const ItemTopic = (props) => {

    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const handleChange = (event) => {
        let valueInput = event.target.value;
        setValue('CommentText', valueInput);
    };

    const getFormErrorMessage = (fieldName) => {
        return errors[fieldName] && <small className="p-error" style={{ float: 'left' }}>{errors[fieldName].message}</small>
    };
    const onSubmit = async (dataSub) => {
        let a = dataSub.CommentText;
        let textVal = a.trim();
        if (textVal != '') {
            dataSub.CommentText = textVal;
            props.onComment(dataSub);
            setValue('CommentText', '');
        }
        else {
            alert('Vui lòng nhập nội dung');
        }

    };

    let { conversationTitle, TopicImagePath, id, avatar, name, status, timeAgo, description, image, isShow, onclickSearch, likeCount, comment, share, colorLike, onclickLike, colorRepost, topicTitle, topicSpan } = props;
    const userDefault = getCurrentUserDefault()
    const userID = userDefault.UserId;
    return (
        <>
            <div className='post-item'>
                <div className="d-flex" style={{ margin: "10px" }}>
                    <div href="" className='flex-shrink-0'>
                        <Image src={avatar} alt="avataruser" style={{ width: '50px', height: '50px', borderRadius: '30px', border: "3px solid #3333" }} />
                    </div>
                    <div className='flex-grow-1 ms-3' style={{ fontSize: '15px' }}>
                        <span>{name} </span><br />
                        <i style={{ color: 'gray' }}>{status}</i>
                    </div><br />
                    <div style={{ marginRight: '8px' }}>
                        <div style={{ fontWeight: '600' }}>Chủ đề</div>
                        <div>{conversationTitle}</div>
                    </div>
                    <div style={{ marginRight: '6px' }}>
                        <Image src={TopicImagePath} style={{ width: '70px', height: '50px', border: "3px solid #3333" }}></Image>
                    </div>
                    <div className='d-flex align-items-center' style={{ fontSize: '13px', marginRight: "2rem" }}>
                        <span>{timeAgo}</span><br />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #3333" }}>
                    <div className='image-post' style={{ margin: "10px", width: '100%' }}>
                        <div className='d-flex' style={{ width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <Image src={image} alt="TopicImage" style={{ width: '50px', height: '50px', borderRadius: '50%', border: "3px solid #3333" }} />
                                <div style={{ marginLeft: "20px" }}>
                                    <span style={{ display: "flex", fontWeight: '600' }}>{topicTitle}</span>
                                    <span style={{ display: "flex" }}>{topicSpan}</span>
                                </div>
                            </div>
                            {userID == id ?
                                <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                    <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px" }}></RiMore2Fill>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a onClick={() => props.onDelete()} className="dropdown-item" >Xóa</a></li>
                                    </ul>
                                </div> : ''}
                        </div>


                    </div>
                    <div style={{ display: "flex" }}>
                        <div>
                            {userID != id ?
                                <i className='fa fa-flag' style={{ color: colorRepost, marginLeft: "10px", marginRight: "10px", marginTop: "12px" }}></i>
                                :
                                ""}
                        </div>
                        {
                            userID != id ?
                                <div className="sort-dropdown dropdown" style={{ width: "10%" }}>
                                    <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px" }}></RiMore2Fill>
                                    </a>

                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a onClick={() => props.onBaoCao()} className="dropdown-item" href="">Báo cáo lạm dụng</a></li>
                                    </ul>

                                </div>
                                :
                                ''
                        }
                    </div>
                </div>
                <div className='item-post'>
                    <FaComment className='icon-postitem'></FaComment><span style={{ marginRight: "10px" }}>{comment}</span>
                </div>
                <form className="row g-3 formPost" onSubmit={handleSubmit(onSubmit)}>
                    <div className='comment-post '>
                        <div className="d-flex align-items-center" style={{ margin: "5px 0px 0px 0px" }}>
                            <div href="" className='flex-shrink-0'>
                                <Image src={avatar} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: "10px", border: "3px solid #3333" }} />
                            </div>
                            <div className='flex-grow-1 ms-3'  >
                                {/* <input type="text" className="form-control" name='CommentText' onChange={handleChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Thêm nhận xét ở đây' /> */}
                                <Controller name="CommentText" control={control} rules={{ required: 'Vui lòng nhập nội dung!' }} render={({ field, fieldState }) => (
                                    <InputTextarea id={field.name} {...field} value={field.value ?? ''} style={{ width: '100%' }} />
                                )} />
                                {getFormErrorMessage('CommentText', errors)}
                            </div>
                            <div className="d-flex flex-row-reverse bd-highlight">
                                <input className='p-1 bd-highlight' type="submit" value="Gửi"
                                    style={{ marginRight: "10px", marginLeft: "10px", width: "60px" }}></input>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
}

ItemTopic.propTypes = {
    onDelete: PropTypes.func,
    onComment: PropTypes.func,
    onShare: PropTypes.func,
    onBaoCao: PropTypes.func
};
ItemTopic.defaultProps = {
    onDelete: () => { },
    onComment: () => { },
    onShare: () => { },
    onBaoCao: () => { },

}

export default ItemTopic;
