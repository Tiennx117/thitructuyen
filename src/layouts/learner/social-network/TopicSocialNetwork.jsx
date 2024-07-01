import { useState, useEffect } from 'react';
import { socialNetworkService } from 'services/socialNetworkService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
import { useTranslation } from 'react-i18next';
import { LoadingPanel } from 'components/loader-ui/LoadingPanel';
import 'layouts/collaborate/components/style/conversationContainer.scss';
import PropTypes from 'prop-types';
const TopicSocialNetwork = (props) => {
    const { t } = useTranslation();
    const [boxItem, setboxItem] = useState('');
    const [defaultColor, setdefaultColor] = useState('activeDefault');
    const [dataTopic, setDataTopic] = useState([]);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState({
        SeartchText: '',
        SortBy: 'VC_TPC_NM',
        SortOrder: 'ASC',
        PageNumber: 1,
        RecordsPerPage: 6
    });
    useEffect(() => {
        loadApi(body);
    }, []);
    const loadApi = async (body) => {
        setLoading(true);
        let result = await socialNetworkService.getalltopic(body);
        let data = result.data.TopicSocialNetworkLst;
        var Id = [];
        var PostsCount = 0;
        var Title;

        for (let i = 0; i < data.length; i++) {
            Id.push(data[i].Id);
            PostsCount += data[i].PostsCount;
            Title = "Tất cả chủ đề"
        }
        var newArr = [
            {
                // Id: Id.toString(),
                 Id: 0,
                PostsCount: PostsCount,
                Title: Title
            }
        ]
        data = [...newArr, ...data]
        setDataTopic(data);
        setLoading(false);
        props.onChange(data[0].Id)
    }
    const getdetailTopic = async (item, idx) => {

        setboxItem('boxItem' + idx);
        setdefaultColor("0");
    }
    return (
        <div >
            <div className="card text-center list-card">
                <span style={{ borderTop: "1px solid #dee2e6", borderRight: "1px solid #dee2e6", borderLeft: "1px solid #dee2e6", lineHeight: "50px", fontSize: "24px", fontWeight: '600' }}>CHỦ ĐỀ</span>
                <div style={{ height: "73.5vh", overflow: 'auto' }}>
                    <LoadingPanel loading={loading} >
                        <div>
                            {
                                dataTopic && dataTopic.map((item, idx) => {
                                    return (
                                        <div title={item.Title} onClick={() => props.onChange(item?.Id)} id={"coversation" + idx} className={boxItem == 'boxItem' + idx ? 'bodyItem1' : defaultColor + idx} key={idx} style={{ height:"50px",borderTop: "1px solid #dee2e6", borderRight: "1px solid #dee2e6", borderLeft: "1px solid #dee2e6" }}>
                                            <div className=" w-100" style={{height:"30px"}}>
                                                <div style={{ width: '100%' }} onClick={() => getdetailTopic(item, idx)} >
                                                    <span style={{ float: 'left', textAlign: 'left', width: '100%', paddingLeft: "10px", cursor: "pointer", overflow: 'hidden', textOverflow:"ellipsis",fontWeight: '600', height: '20px', marginTop:'5px'}}>{item.Title}</span>
                                                </div>
                                            </div>
                                            <div style={{  textAlign: 'right', width: '100%', paddingRight: "20px", cursor: "pointer"}} onClick={() => getdetailTopic(item, idx)}>
                                                <span style={{ fontSize: "13px", fontStyle: "italic" }}>{item.PostsCount} bài viết</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </LoadingPanel>
                </div>

            </div>
        </div>
    )
}
TopicSocialNetwork.propTypes = {
    onChange: PropTypes.func
};
TopicSocialNetwork.defaultProps = {
    onChange: () => { }
}
export default TopicSocialNetwork;