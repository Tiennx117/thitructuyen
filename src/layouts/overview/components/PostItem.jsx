import React, { useState } from 'react'
import './PostItem.scss';
import { AiFillLike } from 'react-icons/ai'
import { FaComment, FaShareSquare } from 'react-icons/fa'
import { RiMore2Fill } from 'react-icons/ri'
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Image } from 'components/Image';


const PostItem = (props) => {
    const [commentItem, setCommentItem] = useState("")
    const { register, control, formState: { errors }, handleSubmit, reset, setValue } = useForm({});
    const handleChange = (event) => {
        setCommentItem(event.target.value);
        // setValue('ConversationText', valueInput)
    };

    const onSubmit = async (dataSub) => {
        dataSub.ConversationText = commentItem;
        props.onComment(dataSub)
        reset();
        setCommentItem("")
    };
    const [onClickShowCommentOver, onClickShowCommentOverView] = React.useState(false)
    const onClickShowComment = () => onClickShowCommentOverView(true)
  

    let { id, avatar, name, status, timeAgo, description, image, isShow, 
        onclickSearch, likeCount, comment, share, colorLike, onclickLike, 
        colorRepost, Attachement, AttachementName, showLamDung,
        SharedByUserName, isShareAction,item
    } = props;

    return (
        <>
            <div className='post-item'>
                <div className="d-flex " style={{ padding: "10px" }}>
                    <div href="" className='flex-shrink-0'>
                        <Image src={avatar} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '30px' }} />
                    </div>
                    <div className='flex-grow-1 ms-3' style={{ fontSize: '15px' }}>
                        <span> 
                        {
                            SharedByUserName ? 
                            <span><span>Chia sẻ bởi</span> <strong>{SharedByUserName}</strong></span>
                            :
                            <><strong>{name}</strong></>
                        }
                        </span>&nbsp;<span style={{ color: 'gray', fontSize: '12px' }}>({status})</span>
                       
                        <div className='d-flex align-items-center mt-1' style={{ fontSize: '13px', marginRight: "2rem" }}>                                                        
                            <span style={{ color: 'gray', fontSize: '13px' }}><i class="fas fa-clock-rotate-left" aria-hidden="true"></i>&nbsp;{timeAgo}</span>
                            { SharedByUserName ? 
                                <>&nbsp;&nbsp;<i class="fa-solid fa-share-from-square"></i></>
                            :
                            <>&nbsp;&nbsp;<i class="fa-solid fa-earth-asia"></i></>
                        }
                        </div>
                    </div>
                    
                    {
                        isShow == true ?
                            <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px" }}></RiMore2Fill> */}
                                    <i class="fa fa-ellipsis-h" aria-hidden="true" style={{ cursor: "pointer", color: "#656565" }}></i>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a onClick={() => props.onDelete()} className="dropdown-item" >Xóa</a></li>
                                    <li><a onClick={() => props.onShare()} className="dropdown-item" >Chia sẻ</a></li>
                                </ul>
                            </div> : ""
                    }
                    {isShareAction == true ?

                        <div className="cb-right" style={{ display: "flex" }} >
                            {/* <div className="days-text">{item.SharedDuration}</div> */}

                            <div className="sort-dropdown dropdown" style={{ width: "20px" }}>
                                <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <RiMore2Fill style={{ cursor: "pointer", color: "#656565", fontSize: "20px", marginTop: "4px", width: "20px" }}></RiMore2Fill> */}
                                    <i class="fa fa-ellipsis-h" aria-hidden="true" style={{ cursor: "pointer", color: "#656565" }}></i>
                                </a>
                                
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a onClick={() => props.onShowBaoCao(item)} className="dropdown-item" href="">Báo cáo lạm dụng</a></li>
                                    <li><a onClick={() => props.onClickSearchPost(item.TileId)} className="dropdown-item" href="">Chia sẻ</a></li>
                                    <li><a onClick={() => props.onRemoveItem(item.ShareId, item.TileId)} className="dropdown-item" href="">Ẩn bài đăng</a></li>
                                    <li><a onClick={() => props.onBlockItem(item)} className="dropdown-item" href="">Chặn bài đăng khỏi <span style={{ fontWeight: '700' }}>{SharedByUserName}</span></a></li>
                                </ul>

                            </div>
                        </div>
                        : ''
                        }

                </div>
                
                <div className='pt-2 pb-3 pl-3 pr-3'>
                    <div className='mb-2' dangerouslySetInnerHTML={{ __html: description }}></div>
                    
                    <div className='image-post'>
                        <Image className='center' style={{ maxHeight: "260px", margin: "0 auto",  width: "100%", objectFit: 'cover' }} src={image} alt="image" />
                    </div>
                    <div className='mt-3' style={{ }}>
                        <a href={Attachement}>{AttachementName}</a>
                    </div>
                    <div className='item-post d-flex justify-content-start'>
                        <AiFillLike className='icon-postitem ' onClick={onclickLike} style={{ color: colorLike }}></AiFillLike>
                        <span style={{ marginRight: "10px" }}><span style={{ fontSize: '13px', color: 'rgb(167, 164, 164)'}}>Like </span> {likeCount}</span>
                        <span onClick={onClickShowComment} style={{ cursor: 'pointer'}}>
                            <FaComment className='icon-postitem'  ></FaComment>
                            <span style={{ fontSize: '13px', color: 'rgb(167, 164, 164)'}}>Comment</span> 
                            &nbsp;<span style={{ marginRight: "10px" }}>{comment}</span>
                        </span>
                        {showLamDung == true
                            ?
                            <>
                            <i className='fa fa-flag' style={{ color: colorRepost, marginLeft: "7px", marginRight: "10px" }}></i> 
                            <span style={{ fontSize: '13px', color: 'rgb(167, 164, 164)'}}>Report</span>
                            </>
                            : ""}

                        <FaShareSquare className='icon-postitem ml-auto' onClick={onclickSearch} ></FaShareSquare>
                        <span style={{ marginRight: "3px", fontSize: '13px', color: 'rgb(167, 164, 164)'}}>Share</span>{share}


                    </div>
                    {onClickShowCommentOver ? 
                     <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                     <div className='comment-post '>
                         <div className="d-flex align-items-center" style={{ margin: "5px 0px 0px 0px" }}>
                             <div href="" className='flex-shrink-0'>
                                 <Image src={avatar} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '30px', margin: "10px" }} />
                             </div>
                             <div className='flex-grow-1 ms-3'  >
                                 <input type="text" className="form-control" value={commentItem} name='ConversationText' onChange={(e) => handleChange(e)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Thêm nhận xét ở đây'/>
                             </div>
                             <div className="d-flex flex-row-reverse bd-highlight">
                                 <input className='btn btn-default bd-highlight' type="submit" value="Gửi"
                                     style={{ marginRight: "10px", marginLeft: "10px", width: "60px", background: '#cccccc61', border: '1px solid #ccc' }}></input>
                             </div>
                         </div>
                     </div>
                 </form>
                    : ''}
                   
                </div>
            </div>
        </>
    );
}

PostItem.propTypes = {
    onDelete: PropTypes.func,
    onComment: PropTypes.func,
    onShare: PropTypes.func
};
PostItem.defaultProps = {
    onDelete: () => { },
    onComment: () => { },
    onShare: () => { }
}

export default PostItem;
