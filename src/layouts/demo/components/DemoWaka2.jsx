import axios from 'axios';
import { Image } from 'components/Image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState, useRef, useEffect } from 'react'
import { ReactReader } from "react-reader";
import ReactJWPlayer from 'react-jw-player';
const DemoWaka2 = () => {
    const viewerRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [inputValue, setInputValue] = useState('https://beta-api.waka.vn/ilearn/detailContent?content_type=book&content_id=14988');
    const renditionRef = useRef(null);
    const [data, setData] = useState(null);
    const locationChanged = epubcifi => {
        console.log(epubcifi)
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi);
    }
    const getApi = async (url) => {
        let result = await axios.get(url);
        console.log(result.data);
        setData(result.data);
    }
    useEffect(() => {
        getApi();

    }, []);
    const playlist = [{
        file: 'https://112aa93c5.vws.vegacdn.vn/BRLbKjP8QTL1Kj7dWxGpVg/1693230731/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28241/28241_aac_north.m4a/playlist.m3u8',

        tracks: [{
            file: 'https://link-to-subtitles.vtt',
            label: 'English',
            kind: 'captions',
            'default': true
        }],
    },
    {
        file: 'https://112aa93c5.vws.vegacdn.vn/TTG5kqffWCGTYTMDOp8u6g/1693230731/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28241/28241_aac_central.m4a/playlist.m3u8',
        image: 'https://link-to-my-other-poster.jpg',
    }];
    return (<>
        <div style={{ height: '100vh' }}>
            <InputText className='w-50' value={inputValue} />
            <Button onClick={()=>getApi(inputValue)}>Get</Button>

            <div className='w-100 d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>Name</div>
                    <span>{data?.response.data.name}</span>
                </div>
                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>published_time</div>
                    <span>{data?.response.data.published_time}</span>
                </div>

                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>authors</div>
                    <span>{data?.response.data.authors.item.name}</span>
                </div>

                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>categories</div>
                    <span>{data?.response.data.categories.item.name}</span>
                </div>

                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>Image</div>
                    <Image width={220} src={data?.response.data.thumbnail} />
                </div>

                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>Description</div>
                    <div dangerouslySetInnerHTML={{ __html: data?.response.data.description ? data?.response.data.description : "Không có mô tả." }}></div>
                </div>
                <div className='d-flex flex-column'>
                    <div style={{ width: '120px' }}>Chapters</div>
                    {data?.response.data.chapters?.item.map(item => {
                        return (<div key={item.id}>
                            {item.name}
                        </div>)
                    })}
                </div>

                <div className='d-flex flex-row mb-2'>
                    <div style={{ width: '120px' }}>waka file11111</div>
                    <div>
                    <span>https://112aa93c5.vws.vegacdn.vn/TTG5kqffWCGTYTMDOp8u6g/1693230731/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28241/28241_aac_central.m4a/playlist.m3u8</span>
                        <ReactJWPlayer
                        licenseKey="3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4="
                        playerId='my-unique-id1'
                        playerScript='http://localhost:3000/jwplayer-8.8.2/jwplayer.js'
                        file={'https://112aa93c5.vws.vegacdn.vn/mbJBY9GfIYwEFE-XZtk2nw/1693493594/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28223/28223_aac_north.m4a/playlist.m3u8'}
                        //file={'https://112aa93c5.vws.vegacdn.vn/TTG5kqffWCGTYTMDOp8u6g/1693230731/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28241/28241_aac_central.m4a/playlist.m3u8'}
                        
                    />
                    </div>
                        

                   
                </div>

                <div className='d-flex flex-row mb-2'>
                    <div style={{ width: '120px' }}>m3u8 link test</div>
                    <div>
                        <span>https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8</span>
                        <ReactJWPlayer
                        licenseKey="3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4="
                        playerId='my-unique-id2'
                        playerScript='http://localhost:3000/jwplayer-8.8.2/jwplayer.js'
                        //playlist={playlist}
                        //file={'https://112aa93c5.vws.vegacdn.vn/BkPAOIlQCaJBFAINfM7c_g/1692718872/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28316/28316_aac_north.m4a/playlist.m3u8'}
                        file={'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'}
                    />

                    </div>
                </div>


                <div className='d-flex flex-row'>
                    <div style={{ width: '120px' }}>Link test oceans.mp4</div>
                    <ReactJWPlayer
                        licenseKey="3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4="
                        playerId='my-unique-id3'
                        playerScript='http://localhost:3000/jwplayer-8.8.2/jwplayer.js'
                        file='http://vjs.zencdn.net/v/oceans.mp4'

                    />
                </div>
                <div>


                </div>

            </div>
            <div className='d-flex flex-row'>
                <div style={{ width: '120px' }}>Link Test</div>
                <div className='flex-1'><ReactReader

                    ref={renditionRef}
                    location={location}
                    locationChanged={locationChanged}
                    //url="https://react-reader.metabits.no/files/alice.epub"
                    url="https://307a0e78.vws.vegacdn.vn/static/book_paper/0/0/0/43625_5_drm.epub"
                    getRendition={(rendition) => {
                        renditionRef.current = rendition;
                        const spine_get = rendition.book.spine.get.bind(
                            rendition.book.spine
                        );
                        rendition.book.spine.get = function (target) {
                            var t = spine_get(target);
                            if (!t) {
                                t = spine_get(undefined);
                            }
                            return t;
                        }
                    }}
                /></div>

            </div>
            <div>


            </div>

        </div>

    </>)
}
export default DemoWaka2;