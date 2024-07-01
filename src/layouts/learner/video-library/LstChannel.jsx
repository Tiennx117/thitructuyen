
import { Image } from 'components/Image';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const LstChannel = (props) => {
    const lstValueStore = useSelector(state => state.listChannel.videolibrary_my_listChannel) || [];

    return (
        <>
            <div>
                {lstValueStore && lstValueStore?.map((item, index) => {
                    return (
                        <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: 'center' }}>
                            <Image style={{ marginLeft: "20px", width: "25px", height: "25px", borderRadius: "25px", border: "1px solid #3333", marginRight: "4px" }} src={item.ChannelThumbnailUrl}></Image>
                            <NavLink style={({ isActive }) => isActive ?
                                { color: 'white', background: '#1AA1DC', lineHeight: "23px", paddingLeft: "10px", borderRadius: "5px", width: "100%", fontSize: '13px', paddingRight: '15px', marginRight: '15px' }
                                :
                                { color: '#545e6f', lineHeight: "23px", paddingLeft: "10px", borderRadius: "5px", width: "100%", fontSize: '13px', paddingRight: '15px', marginRight: '15px' }}
                                to={'/learner/video-library/videochannel/item' + index} >
                                <div style={{ display: "flex", cursor: "pointer" }} onClick={() => props.clickTilteItem(item.ChannelId)}>
                                    <span style={{ textTransform: "uppercase", fontWeight: "500" }}>{item.ChannelTitle}</span>
                                    <span style={{ position: "absolute", float: "right", right: "12px", color: 'black' }}>{item.NoOfVideos}</span>
                                </div>
                            </NavLink>
                        </div>

                    )
                })}
            </div>

        </>
    )
}
export default LstChannel;