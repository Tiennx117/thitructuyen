import { useEffect, useState } from 'react';
import { wakaService } from 'services/wakaService';
import ReactJWPlayer from 'react-jw-player';
import { Button } from 'primereact/button';

const WakaChapter = (props) => {
    const [chapters, setChapters] = useState([]);
    const [audioUrl, setAudioUrl] = useState('');
    const [params, setParams] = useState({
        iss: 262,
        did: 1231231,
        os: 'android',
        iat: Math.floor(Date.now() / 1000),
        ct: props.ct || 52,
        ci: props.id,
        type: 0,
        pn: 1,
        ps: 10,
        sort: 0
    })
    const loadChaper = async (params) => {
        if (props.id) {
            let token = await wakaService.tokenChapterAudio(params);
            let result = await wakaService.listChapterAudio(token.data);
            console.log(result.data);
            setChapters(result.data.data);
        }

    }
    const onGetStream = async (id) => {
        let paramsStream = {
            iss: 262,
            did: 1231231,
            os: 'android',
            iat: Math.floor(Date.now() / 1000),
            ci: id
        }
        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(tokenStream.data);
        // sẽ có 3 giọng đọc
        let url = resultStream.data.data.audio_data[0].url;
        setAudioUrl(url)
    }

    useEffect(() => {
        loadChaper(params);
    }, [props.id])

    return (<>
        <div className='d-flex flex-column'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Duration</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {chapters?.map((item, index) => {
                        return (<tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.duration}</td>
                            <td><Button onClick={() => onGetStream(item.id)}>Get Audio</Button></td>
                            <td>

                            </td>
                        </tr>)
                    })}


                </tbody>
            </table>

            <div>
                {audioUrl &&
                    <ReactJWPlayer
                        className="player-wrapper"
                        licenseKey="3SYLbRo6MN5cBDxwpZh3dl1gb0lMTUOos31M5hoAlf4="
                        playerId={'123'}
                        playerScript='/jwplayer-8.8.2/jwplayer.js'
                        //file={'https://112aa93c5.vws.vegacdn.vn/mbJBY9GfIYwEFE-XZtk2nw/1693493594/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/55/28223/28223_aac_north.m4a/playlist.m3u8'}
                        file={audioUrl}
                        customProps={{
                            skin: {
                                controlbar: {
                                    icons: '#ffffff',
                                    iconsActive: '#0061b4'
                                }
                            },
                            primary: 'html5',
                            innerWidth: 20
                        }}
                    />}

            </div>

        </div>
    </>)
}
export { WakaChapter };