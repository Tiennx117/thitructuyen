import React from 'react'
import './style/ItemTopic.scss'
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'components/Image';
import { useState, useEffect } from "react";

const ItemBlog = (props) => {
    const [valueCommentText, setvalueCommentText] = useState("");
    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const handleChange = (event) => {
        console.log('b');
            let valueInput = event.target.value;
            setValue('CommentText', valueInput)
            setvalueCommentText(valueInput)
    }

    const onSubmit = async (dataSub) => {
        setvalueCommentText("")
        props.onComment(dataSub)
        reset();
    };
    useEffect(() => {
        setvalueCommentText("")
      },[props.BlogId]);
    let {BlogTitle, avatar, name, status, timeAgo,BlogDesc,IsCommentAllowed} = props;
    return (
        <>
            <div className='post-item'>
            <div className='flex-grow-1' style={{ fontSize: '15px',backgroundColor:'#00597f',color:'#fff',padding:10,textAlign: 'center' }}>
                        <b>{BlogTitle.toUpperCase()} </b>
                    </div>
            <div className="d-flex" style={{ margin: "10px" }}>
                </div>
                <div className="d-flex" style={{ margin: "10px" }}>
                    <div href="" className='flex-shrink-0'>
                        <Image src={avatar} alt="avataruser" style={{ width: '50px', height: '50px', borderRadius: '30px' }} />
                    </div>
                    <div className='flex-grow-1 ms-3' style={{ fontSize: '15px' }}>
                        <span>{name} </span><br />
                        <i style={{ color: 'gray' }}>{status}</i>
                    </div><br />
                    <div className='d-flex align-items-center' style={{ fontSize: '13px', marginRight: "2rem" }}>
                        <span>{timeAgo}</span><br />

                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #3333" }}>
                    <div className='image-post' style={{ margin: "10px" }}>
                        <div style={{ marginLeft: "20px" }}>
                            <span  dangerouslySetInnerHTML={{ __html: BlogDesc }}></span>
                        </div>
                    </div>
                </div>
                {IsCommentAllowed&&
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div className='comment-post '>
                    <div className="d-flex align-items-center" style={{ margin: "5px 0px 0px 0px", backgroundColor: "#f6f6f6" }}>
                        <div href="" className='flex-shrink-0'>
                            <Image src={avatar} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: "10px", border: "1px solid #3333" }} />
                        </div>
                        <div className='flex-grow-1 ms-3'  >
                            <input  value={valueCommentText} type="text" className="form-control" name='CommentText' onChange={handleChange} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Thêm nhận xét ở đây' />
                        </div>
                        <div className="d-flex flex-row-reverse bd-highlight">
                            <input className='p-1 bd-highlight' type="submit" value="Gửi"
                                style={{ marginRight: "10px", marginLeft: "10px", width: "60px" }}></input>
                        </div>
                    </div>

                </div>
            </form>
                }
                
            </div>
        </>
    );
}

ItemBlog.propTypes = {
    onDelete: PropTypes.func,
    onComment: PropTypes.func,
    onShare: PropTypes.func,
    onBaoCao: PropTypes.func
};
ItemBlog.defaultProps = {
    onDelete: () => { },
    onComment: () => { },
    onShare: () => { },
    onBaoCao: () => { },

}

export default ItemBlog;
