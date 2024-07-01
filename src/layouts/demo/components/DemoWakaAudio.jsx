import axios from "axios";
import { Image } from "components/Image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import ReactJWPlayer from 'react-jw-player';
import '../player.scss'

const DemoWakaAudio = () => {
    const [data, setData] = useState();
    const [contentId, setContentId] = useState(2237)
    const renditionRef = useRef(null);
    const [location, setLocation] = useState(null)
    useEffect(() => {

        getEpub(contentId)
    }, [])

    const getEpub = async (contentId) => {
        let result = await axios.get('http://10.0.1.132:1900/Demo/GetAudioBook?content_id=' + contentId);
        //console.log(result.data?.data?.epub_link);
        setData(result.data);
    }
    const locationChanged = epubcifi => {
        console.log('epubcifi', epubcifi)
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }
    return (<>
        <div className="d-flex flex-column">
            <div className="d-flex flex-row">
                <InputText value={contentId} onChange={(e) => setContentId(e.target.value)} />
                <Button onClick={() => getEpub(contentId)}>Get epub</Button>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between">
                    <div className="flex-1">
                        Name
                    </div>
                    <div className="flex-3">
                        <span>{data?.data?.name}</span>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <div className="flex-1">
                        description
                    </div>
                    <div className="flex-3">
                        <div dangerouslySetInnerHTML={{ __html: data?.data?.description ? data?.data?.description : "Không có mô tả." }}></div>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <div className="flex-1">
                        thumbnail
                    </div>
                    <div className="flex-3">
                        <Image src={data?.data?.thumbnail} />
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <div style={{ width: '120px' }}>Chapters</div>
                    {data?.data?.chapters?.map(item => {
                        return (<div key={item.id}>
                            <div className="d-flex flex-column">
                                {item.name}
                                {item?.audio_data?.map((audio,index) => {
                                    return (<>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex flex-row ml-4">
                                                <span className="flex-1">{audio.label}</span>
                                                <div className="flex-3 mb-3">
                                                    <ReactJWPlayer
                                                    className="player-wrapper"
                                                        licenseKey="3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4="
                                                        playerId={item.name+index}
                                                        playerScript='http://localhost:3000/jwplayer-8.8.2/jwplayer.js'
                                                        //file={'https://112aa93c5.vws.vegacdn.vn/mbJBY9GfIYwEFE-XZtk2nw/1693493594/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28223/28223_aac_north.m4a/playlist.m3u8'}
                                                        file={audio.url}
                                                        customProps={{ 
                                                            skin: {
                                                                controlbar: {
                                                                  icons: '#ffffff',
                                                                  iconsActive: '#0061b4'
                                                                }
                                                              },
                                                              primary: 'html5',
                                                              innerWidth:20
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>)
                                })}


                            </div>



                        </div>)
                    })}
                </div>
            </div>

        </div>
    </>)
}

export default DemoWakaAudio;