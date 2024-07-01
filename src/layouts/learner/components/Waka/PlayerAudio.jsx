import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player';
import './player.scss'
import Duration from './Duration';
import ChapterItem from './ChapterItem';
import SpeedAudio from './SpeedAudio';
import { wakaService } from 'services/wakaService';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayerAudioItem } from "store/playeraudio/detailplayer";
import { setDetailPlayerAudio } from "store/playeraudio/detailaudio";
import { setStatusProgress } from "store/playeraudio/statusProgress";
import { setDetailUrlAudio } from "store/playeraudio/detailurl";
import { setVoicePlayer } from "store/playeraudio/voiceplayer";
import { getCurrentUserDefault } from 'shared/utils/getCurrentUserDefault';

const WakaAudio = () => {
    const dispatch = useDispatch();
    const lstAudioBookStore = useSelector(state => state.detailplayaudio) || [];
    const detailUrlAudio = useSelector(state => state.detailUrlAudio) || [];
    const playerAudioItem = useSelector(state => state.playerAudioItem) || [];
    const voicePlayer = useSelector(state => state.voicePlayer) || [];
    const pageCurrent = useSelector(state => state.pageCurrent);
    const localUrl = lstAudioBookStore?.url;
    const localName = lstAudioBookStore?.name;
    const localThumb = lstAudioBookStore?.thumb;
    const localNameChapter = lstAudioBookStore?.title;
    const ref = useRef();
    const [url, setUrl] = useState(detailUrlAudio?.data)
    const [pip, setPip] = useState(lstAudioBookStore?.pip ? lstAudioBookStore?.pip : false)
    const [playing, setPlaying] = useState(lstAudioBookStore?.playing)
    const [controls, setControls] = useState(lstAudioBookStore?.controls ? lstAudioBookStore?.controls : true)
    const [light, setLight] = useState(lstAudioBookStore?.light ? lstAudioBookStore?.light : false)
    const [volume, setVolume] = useState(lstAudioBookStore?.volume ? lstAudioBookStore?.volume : 0.8)
    const [muted, setMuted] = useState(lstAudioBookStore?.muted ? lstAudioBookStore?.muted : false)
    const [played, setPlayed] = useState(lstAudioBookStore?.played ? lstAudioBookStore?.played : 0)
    const [loaded, setLoaded] = useState(lstAudioBookStore?.loaded ? lstAudioBookStore?.loaded : 0)
    const [duration, setDuration] = useState(lstAudioBookStore?.duration ? lstAudioBookStore?.duration : 0)
    const [playbackRate, setPlaybackRate] = useState(lstAudioBookStore?.playbackRate ? lstAudioBookStore?.playbackRate : 1.0)
    const [loop, setLoop] = useState(lstAudioBookStore?.loop ? lstAudioBookStore?.loop : false)
    const [seeking, setSeeking] = useState(lstAudioBookStore?.seeking ? lstAudioBookStore?.seeking : false)
    const [playerSeekTo, setPlayerSeekTo] = useState(lstAudioBookStore?.playerSeekTo ? lstAudioBookStore?.playerSeekTo : 0)
    const [isHovering, setIsHovering] = useState(false);
    const [voice, setVoice] = useState();
    const [indexChapter, setIndexChapter] = useState(lstAudioBookStore?.indexItem);
    const [dataChapters, setDataChapters] = useState(playerAudioItem?.data?.data);
    const getStreamingLink = lstAudioBookStore?.data?.audio_data;
    const content_id = lstAudioBookStore?.content_id;
    const [secondsPrev, setSecondsPrev] = useState((new Date().getTime()) / 1000);
    const [secondsCurrent, setSecondsCurrent] = useState((new Date().getTime()) / 1000);
    const userDefault = getCurrentUserDefault()
    const userID = userDefault.UserId;
    const intervalSeconds = 30;
    const intervalMiliSeconds = 30000;



    useEffect(() => {
        setDataChapters(playerAudioItem?.data?.data)
        setUrl(detailUrlAudio?.data)
        setPlaying(lstAudioBookStore?.playing)
        setIndexChapter(lstAudioBookStore?.indexItem)
        setPlayerSeekTo(lstAudioBookStore?.playerSeekTo);
       // F5 lại trình duyệt -> dừng playing
        window.onbeforeunload =async function () {
            if (playing){
                let seconds_run = Math.round((new Date().getTime()) / 1000 - secondsPrev);
                
                // const currentTime = await wakaService.getCurrentListeningTime(dataChapters[indexChapter].id, dataChapters[indexChapter].audio_id, userID);
                var obj = {
                    id: lstAudioBookStore.data.id,
                    audio_id: lstAudioBookStore.data.audio_id,
                    name: lstAudioBookStore.data.name,
                    description: '',
                    trang_thai: 'S',
                    duration: lstAudioBookStore.data.duration,
                    user_id: userID,
                    listening_time: seconds_run,
                    current_listening_time: Math.round(ref.current.getCurrentTime())
                    // current_listening_time: currentTime
                };
                wakaService.playAudioBook(obj);
                setSecondsPrev((new Date().getTime()) / 1000);
            }

            if (lstAudioBookStore?.playing == true) {
                let obj = { ...lstAudioBookStore, playing: false };
                dispatch(setDetailPlayerAudio(obj));
            }
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, [playerAudioItem, lstAudioBookStore, detailUrlAudio]);
    
    const closePlayerAudio = () => {
        if (playing){
            let seconds_run = Math.round((new Date().getTime()) / 1000 - secondsPrev);

            var obj = {
                id: lstAudioBookStore.data.id,
                audio_id: lstAudioBookStore.data.audio_id,
                name: lstAudioBookStore.data.name,
                description: '',
                trang_thai: 'S',
                duration: lstAudioBookStore.data.duration,
                user_id: userID,
                listening_time: seconds_run,
                current_listening_time: Math.round(ref.current.getCurrentTime())
            };
            wakaService.playAudioBook(obj);
            setSecondsPrev((new Date().getTime()) / 1000);
        }
        dispatch(setDetailPlayerAudio(null))
        dispatch(setPlayerAudioItem(null))
        dispatch(setDetailUrlAudio(null))
    }

    const handlePlay = () => {
        let time = (new Date().getTime()) / 1000;
        setSecondsPrev(time);

        if (playerSeekTo > 0) {
            ref.current.seekTo(playerSeekTo);
        }
        setPlaying(true);
    }
    const handleEnablePIP = () => {
        setPip(true)
    }
    const handleDisablePIP = () => {
        setPip(false)
    }
    const handlePause = () => {
        if (playerSeekTo > 0) {
            ref.current.seekTo(playerSeekTo);
        }

        let newAudioBookStore = {
            ...lstAudioBookStore,
            playing: false,
            playerSeekTo: playerSeekTo
        }
        dispatch(setDetailPlayerAudio(newAudioBookStore));

        setPlaying(false);
    }
    const handleOnPlaybackRateChange = (speed) => {
        setPlaybackRate(parseFloat(speed))
    }

    const handleStarted = async () => {
        let time = (new Date().getTime()) / 1000;
        setSecondsPrev(time);
        setSecondsCurrent(time);
    }

    const handleEnded = async () => {
        // update trạng thái hoàn thành chapter
        updateChapterComplated(indexChapter);

        // kết thúc 1 chương và tự động chương tiếp theo
        if (loop) {
            setPlaying(true)
        } else {
            let nextItem = indexChapter + 1;
            if (nextItem > dataChapters.length) return;
            if (nextItem <= dataChapters.length) {
                setIndexChapter(nextItem);
                await nextBackItem(dataChapters[nextItem], nextItem)
            }
            setPlaying(true)
        }
    }

    const updateChapterComplated = async(indexChapter) => {
        let seconds_run = Math.round(((new Date().getTime()) / 1000) - secondsPrev);

        let chapter = dataChapters.filter(x => x.id == lstAudioBookStore.data.id)[0];
        var obj = {
            id: chapter.id,
            audio_id: chapter.audio_id,
            name: chapter.name,
            description: '',
            trang_thai: 'C',
            duration: chapter.duration,
            user_id: userID,
            listening_time: seconds_run,
            current_listening_time: Math.round(ref.current.getCurrentTime())
        };
        await wakaService.playAudioBook(obj);
        setSecondsPrev((new Date().getTime()) / 1000);
    }

    const handleDuration = (duration) => {
        setDuration(duration)
    }
    const handleSeekMouseDown = e => {
        setSeeking(true);
    }
    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value))

    }
    const handlePlayPause = () => {
        // nếu đang run
        if (playing){
            setSecondsCurrent((new Date().getTime()) / 1000);
        }
        else{ // đang pause
            setSecondsPrev((new Date().getTime()) / 1000);
        }

        setPlaying(!playing);
    }

    // gọi api update thời gian nghe thực tế
    useEffect(() => {
        if(dataChapters){
            console.log('lstAudioBookStore.data.id', lstAudioBookStore.data.id);
            let chapter = dataChapters.filter(x => x.id == lstAudioBookStore.data.id)[0];
            if(playing && chapter) {
                let seconds_run = Math.round(((new Date().getTime()) / 1000) - secondsPrev);
                var obj = {
                    id: chapter.id,
                    audio_id: chapter.audio_id,
                    name: chapter.name,
                    description: '',
                    trang_thai: 'S',
                    duration: chapter.duration,
                    user_id: userID,
                    listening_time: seconds_run,
                    current_listening_time: Math.round(ref.current.getCurrentTime())
                };
                wakaService.playAudioBook(obj);
                setSecondsPrev((new Date().getTime()) / 1000);

                setTimeout(() => {
                    dispatch(setStatusProgress({
                        time: (new Date().getTime()) / 1000,
                        audio_id: lstAudioBookStore?.content_id,
                        user_id: userID
                    }));
                }, 0)
            }
        }
    }, [secondsCurrent, dataChapters, lstAudioBookStore.data.id]);

    // cứ intervalSeconds giây update thời gian nghe thực tế 1 lần
    useEffect(() => {
        const interval = setInterval(async() => {
            let chapter = dataChapters.filter(x => x.id == lstAudioBookStore.data.id)[0];
            if(playing && dataChapters && ((Math.round(new Date().getTime()) / 1000 - secondsPrev) > intervalSeconds) && chapter){
                let thoiGian = (new Date().getTime()) / 1000;
                var obj = {
                    id: chapter.id,
                    audio_id: chapter.audio_id,
                    name: chapter.name,
                    description: '',
                    trang_thai: 'S',
                    duration: chapter.duration,
                    user_id: userID,
                    listening_time: intervalSeconds,
                    current_listening_time: Math.round(ref.current.getCurrentTime())
                };
                wakaService.playAudioBook(obj);
                setSecondsPrev(thoiGian);
            }
        }, intervalMiliSeconds);
        return () => clearInterval(interval);
    }, [playing, dataChapters, lstAudioBookStore.data.id]);

    const handleStop = () => {
        setPlaying(false);
        setUrl(null);
    }
    const handleSeekMouseUp = e => {
        setSeeking(false)
        ref.current.seekTo(parseFloat(e.target.value))
    }

    const handleProgress = (e) => {
        setPlayed(parseFloat(e.played ? e.played : played));
        if (playing == true) {
            let obj = {
                content_id: lstAudioBookStore?.content_id,
                data: lstAudioBookStore?.data,
                chapter_id: lstAudioBookStore?.chapter_id,
                thumb: lstAudioBookStore?.thumb,
                name: lstAudioBookStore?.name,
                playerSeekTo: duration * e.played,
                playing: playing,
                url: localUrl,
                pip: pip,
                controls: controls,
                light: light,
                volume: volume,
                muted: muted,
                played: played,
                loaded: loaded,
                duration: duration,
                playbackRate: playbackRate,
                loop: loop,
                seeking: seeking,
                title: lstAudioBookStore?.title,
                indexItem: lstAudioBookStore?.indexItem
            }
            dispatch(setDetailPlayerAudio(obj));
        }
    }

    const handleClickNext = (e) => {
        let timeCurent = (duration * played);
        ref.current.seekTo(timeCurent + 15);
        dispatch(setStatusProgress({
            time: (new Date().getTime()) / 1000,
            audio_id: lstAudioBookStore?.content_id,
            user_id: userID
        }));
    }

    const handleClickBack = (e) => {
        let timeCurent = (duration * played);
        if (timeCurent > 15) {
            ref.current.seekTo(timeCurent - 15);
        } else {
            ref.current.seekTo(0);
        }
        dispatch(setStatusProgress({
            time: (new Date().getTime()) / 1000,
            audio_id: lstAudioBookStore?.content_id,
            user_id: userID
        }));
    }

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
        if (e.target.value > 0) {
            setMuted(false);
        } else {
            setMuted(true);
        }
    }
    const handleToggleMuted = () => {
        setMuted(!muted);
        setIsHovering(false);
    }
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const onShowLoop = () => {
        setLoop(!loop)
    }

    const onPlayPauseChapter = () => {
        setPlaying(!playing);
    }

    const onPlayChapter = async (id, index) => {
        // update chapter cũ trước khi chuyển sang chapter mới
        if (playing) {
            let chapter = dataChapters.filter(x => x.id == lstAudioBookStore.data.id)[0];
            var obj_chapter_old = {
                id: chapter.id,
                audio_id: chapter.audio_id,
                name: chapter.name,
                description: '',
                trang_thai: 'S',
                duration: chapter.duration,
                user_id: userID,
                listening_time: Math.round((new Date().getTime()) / 1000 - secondsPrev),
                current_listening_time: Math.round(ref.current.getCurrentTime())
            };
            await wakaService.playAudioBook(obj_chapter_old);
            setSecondsPrev((new Date().getTime()) / 1000);
        }
        // setPlaying(true);
        let paramsStream = {
            iss: 262,
            did: 1231231,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ci: id
        }
        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(paramsStream, tokenStream.data);

        let itemVoicePlayer = resultStream?.data?.data?.audio_data.find(x => x.voice === voicePlayer.voice);
        let urlVoice = resultStream?.data?.data?.audio_data[0].url
        if (itemVoicePlayer && voicePlayer && voicePlayer.voice) {
            urlVoice = itemVoicePlayer.url
        }

        let obj = {
            content_id: content_id,
            data: resultStream?.data?.data,
            chapter_id: id,
            thumb: resultStream?.data?.data?.thumb,
            // name: resultStream?.data?.data?.name,
            name: lstAudioBookStore?.title,
            playerSeekTo: 0,
            url: urlVoice,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            seeking: false,
            title: resultStream?.data?.data?.name,
            indexItem: index
        }
        dispatch(setDetailPlayerAudio(obj));
        dispatch(setDetailUrlAudio({ 'data': urlVoice }));

        let seconds_run = Math.round((new Date().getTime()) / 1000 - secondsPrev);
        var obj_chapter = {
            id: obj.data.id,
            audio_id: obj.data.audio_id,
            name: obj.data.name,
            description: '',
            trang_thai: 'S',
            duration: obj.data.duration,
            user_id: userID,
            listening_time: 0,
            current_listening_time: Math.round(ref.current.getCurrentTime())
        };

        await wakaService.playAudioBook(obj_chapter);
        let t = (new Date().getTime()) / 1000;
        await setSecondsPrev(t);
        setIndexChapter((index))
    }


    const changeVoice = (url, voice) => {
        dispatch(setVoicePlayer({ 'voice': voice }));
        setUrl(url);
        dispatch(setDetailUrlAudio({ 'data': url }));
        setVoice(voice);
    }

    const onSpeedAudio = (value) => {
        setPlaybackRate(parseFloat(value))
    }

    const nextBackItem = async (itemChapter, indexChapter) => {
        let paramsStream = {
            iss: 262,
            did: 1231231,
            os: 'web',
            iat: Math.floor(Date.now() / 1000),
            ci: itemChapter?.id
        }
        let tokenStream = await wakaService.tokenStreamingLinkWaka(paramsStream);
        let resultStream = await wakaService.getStreamingLink(paramsStream, tokenStream.data);

        let itemVoicePlayer = resultStream?.data?.data?.audio_data.find(x => x.voice === voicePlayer.voice);
        let urlVoice = resultStream?.data?.data?.audio_data[0].url
        if (itemVoicePlayer && voicePlayer && voicePlayer.voice) {
            urlVoice = itemVoicePlayer.url
        }
        console.log('dataChapters', dataChapters);
        const currentTime = await wakaService.getCurrentListeningTime(itemChapter?.id, itemChapter?.audio_id, userID);

        let obj1 = {
            content_id: lstAudioBookStore?.content_id,
            data: resultStream?.data?.data,
            chapter_id: itemChapter?.id,
            thumb: lstAudioBookStore?.thumb,
            name: lstAudioBookStore?.name,
            playerSeekTo: currentTime ? ((currentTime == '0' || currentTime == 0) ? 0 : (Object.keys(currentTime.data).length === 0 && currentTime.data.constructor === Object ? 0 : currentTime.data)) : 0,
            url: urlVoice,
            // playing: playing,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            seeking: false,
            title: resultStream?.data?.data?.name,
            indexItem: indexChapter
        }
        dispatch(setDetailPlayerAudio(obj1));
        dispatch(setDetailUrlAudio({ 'data': urlVoice }));
        setIndexChapter(indexChapter);
        // setActivePlayerItem(itemChapter?.id, dataChapters)
    }

    const goToNext = async () => {
        // update chapter cũ trước khi chuyển sang chapter mới
        let chapter = dataChapters.filter(x => x.id == lstAudioBookStore.data.id)[0];
        if (playing){
            let seconds_run = Math.round((new Date().getTime()) / 1000 - secondsPrev);
            var obj_chapter = {
                id: chapter.id,
                audio_id: chapter.audio_id,
                name: chapter.name,
                description: '',
                trang_thai: 'S',
                duration: chapter.duration,
                user_id: userID,
                listening_time: seconds_run,
                current_listening_time: Math.round(ref.current.getCurrentTime())
            };
            await wakaService.playAudioBook(obj_chapter);
            setSecondsPrev((new Date().getTime()) / 1000);
        }

        setSecondsPrev((new Date().getTime()) / 1000);

        const nextItem = indexChapter + 1;
        if (nextItem > dataChapters.length) return;
        if (nextItem <= dataChapters.length) {
            // setIndexChapter(nextItem);
            nextBackItem(dataChapters[nextItem], nextItem)
        }

        dispatch(setStatusProgress({
            time: (new Date().getTime()) / 1000,
            audio_id: chapter.audio_id,
            user_id: userID
        }));
    }
    const goToBack = async () => {
        // update chapter cũ trước khi chuyển sang chapter mới
        let chapter = dataChapters.filter(x => x.id == lstAudioBookStore.data.id)[0];
        if (playing){
            let seconds_run = Math.round((new Date().getTime()) / 1000 - secondsPrev);
            var obj_chapter = {
                id: chapter.id,
                audio_id: chapter.audio_id,
                name: chapter.name,
                description: '',
                trang_thai: 'S',
                duration: chapter.duration,
                user_id: userID,
                listening_time: seconds_run,
                current_listening_time: Math.round(ref.current.getCurrentTime())
            };
            await wakaService.playAudioBook(obj_chapter);
            
            setSecondsPrev((new Date().getTime()) / 1000);
        }
        
        setSecondsPrev((new Date().getTime()) / 1000);

        const backItem = indexChapter - 1;
        if (indexChapter < 0) return;
        if (backItem >= 0 && backItem < dataChapters.length) {
            // setIndexChapter(backItem);
            nextBackItem(dataChapters[backItem], backItem)
        }

        dispatch(setStatusProgress({
            time: (new Date().getTime()) / 1000,
            audio_id: chapter.audio_id,
            user_id: userID
        }));
    }



    const handleUpdateTimeListen = (time) => {
        if(loop){
            console.log(time);
        }
    } 

    return (
        <>
            <div className="audio-book-list">
                {/* {activePlayer && */}
                <>
                    <ReactPlayer
                        ref={ref}
                        className='react-player hidden' //hidden
                        url={url}
                        pip={pip}
                        playing={playing}
                        controls={controls}
                        light={light}
                        loop={loop}//
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        // url="https://112aa93c5.vws.vegacdn.vn/5kh21f7kGNyENnUaey-axw/1696015047/waka_audio/_definst_/amlst:fm_audio_file_encoded/0/0/0/27/14186/14186_aac_north.m4a/playlist.m3u8"
                        onReady={() => console.log()}
                        onStart={handleStarted}
                        onPlay={handlePlay}
                        onEnablePIP={handleEnablePIP}
                        onDisablePIP={handleDisablePIP}
                        onPause={handlePause}
                        onBuffer={() => console.log()}
                        onPlaybackRateChange={handleOnPlaybackRateChange}
                        onSeek={e => handleUpdateTimeListen(e)}
                        onEnded={handleEnded}
                        onError={e => console.log()}
                        onProgress={(e) => handleProgress(e)}
                        onDuration={handleDuration}
                    />


                    <div className="container-player h-22-5 w-full z-50 ">
                        <div className="w-full container h-full flex-row-center justify-between">
                            <div className="flex-row-center w-87-5">
                                <div className="w-15 h-15">
                                    <img src={localThumb} className="object-cover wh-full rounded-full" />
                                </div>
                                <div className="ml-5 flex-1 flex flex-col">
                                    <span className="w-full h-5 overflow-hidden">
                                        {(!playing) ?
                                            <p className="text-white-default text-sm-15-18 t-ellipsis-1 h-5-25">
                                                {localNameChapter ? localNameChapter + ' - ' : ''}{localName}
                                            </p>
                                            :
                                            <marquee className="text-white-default text-sm-15-18">
                                                {localNameChapter ? localNameChapter + ' - ' : ''}{localName}
                                            </marquee>
                                        }

                                    </span>
                                    <p className="text-xs-13-15 text-white-default mt-0-5 t-ellipsis-1 h-5-5 opacity-50">
                                        Sách nói
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-[300px] xl:w-[400px] 2xl:w-[500px] flex-col items-center">
                                <div className="w-full flex flex-column items-center justify-between">
                                    <div className="w-full flex items-center flex-col justify-center">
                                        <div className="flex items-center justify-center">
                                            <div className="w-15 hidden"></div>
                                            <div className="flex-row-center justify-between flex-1 mb-1">
                                                <div className="flex-row-center justify-between">
                                                    <div className="cursor-pointer rounded-full flex justify-center mx-1-25">
                                                        <div className="icon-action-item w-6 h-6 m-auto mx-2-5 mr-5">
                                                            <div
                                                                onClick={() => handleClickBack()}
                                                                className="w-full h-full relative grid-center cursor-pointer">
                                                                <img src="/images/player/icon-back-15s.svg" alt="icon-back-15s" className="cursor-pointer absolute-full icon-action-visible" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cursor-pointer rounded-full flex justify-center mx-1-25 ml-2 mr-3">
                                                        <div className="icon-action-item w-6 h-6 m-auto mx-2-5">
                                                            {dataChapters && dataChapters.length > 1 ?
                                                                <div
                                                                    title="Chương trước"
                                                                    onClick={() => goToBack()}
                                                                    className="w-full h-full relative grid-center cursor-pointer">
                                                                    <img src="/images/player/icon-back-dk.svg" alt="icon-back-dk" className="cursor-pointer absolute-full icon-action-visible" />
                                                                </div>
                                                                :
                                                                <div
                                                                    title="Chương trước"
                                                                    className="w-full h-full relative grid-center cursor-pointer">
                                                                    <img src="/images/player/icon-disable-back.svg" alt="icon-disable-back" class="cursor-pointer absolute-full" />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="icon-action-item w-12 h-12 mx-1-25 mx-2-5">
                                                        <div className="w-full h-full relative grid-center cursor-pointer"
                                                            onClick={handlePlayPause}>
                                                            {(!playing) ?
                                                                <>
                                                                    <img src="/images/player/icon-play-mini-dk.svg" alt="icon-play-mini-dk" className="cursor-pointer absolute-full icon-action-visible" />
                                                                </>
                                                                :
                                                                <>
                                                                    <img src="/images/player/icon-pause-mini-dk.svg" alt="icon-play-mini-dk" className="cursor-pointer absolute-full icon-action-visible" />
                                                                </>
                                                            }


                                                        </div>
                                                    </div>
                                                    <div className="cursor-pointer rounded-full flex justify-center mx-1-25 ml-2 mr-3">
                                                        <div className="icon-action-item w-6 h-6 m-auto mx-2-5">
                                                            {dataChapters && dataChapters.length > 1 ?
                                                                <>
                                                                    <div
                                                                        title="Chương tiếp theo"
                                                                        onClick={() => goToNext()}
                                                                        className="w-full h-full relative grid-center cursor-pointer">
                                                                        <img src="/images/player/icon-next-dk.svg" alt="icon-next-dk" className="cursor-pointer absolute-full icon-action-visible" />
                                                                        <img src="/images/player/icon-next-disable-dk.svg" alt="icon-next-disable-dk" class="cursor-pointer absolute-full"></img>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div
                                                                        title="Chương tiếp theo"
                                                                        className="w-full h-full relative grid-center cursor-pointer">
                                                                        <img src="/images/player/icon-next-disable-dk.svg" alt="icon-next-disable-dk" class="cursor-pointer absolute-full"></img>
                                                                    </div></>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="cursor-pointer rounded-full flex justify-center mx-1-25">
                                                        <div className="icon-action-item w-6 h-6 m-auto mx-2-5 ml-5">
                                                            <div
                                                                onClick={(e) => handleClickNext()}
                                                                className="w-full h-full relative grid-center cursor-pointer">
                                                                <img src="/images/player/icon-next-15s.svg" alt="icon-next-15s" className="cursor-pointer absolute-full icon-action-visible" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full relative flex items-center justify-center">
                                            <span className="text-sm-14-16 text-white-default mr-3" style={{ width: '55px' }}>
                                                <Duration seconds={duration * played} />
                                            </span>
                                            <div className="w-full h-6 flex-row-center relative w-[350px] 2xl:w-[480px]">
                                                <input
                                                    type='range' min={0} max={0.999999} step='any'
                                                    value={played.toFixed(6)}
                                                    onMouseDown={handleSeekMouseDown}
                                                    onChange={handleSeekChange}
                                                    onMouseUp={handleSeekMouseUp}
                                                    style={{ width: "100%" }}
                                                />
                                            </div>

                                            <span className="text-sm-14-16 text-white-default ml-4">
                                                <Duration seconds={duration} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center h-full">
                                <div className="mr-4 w-6">
                                    <div className="icon-action-item group cursor-pointer flex flex-col items-center"><span><span className="el-popover__reference-wrapper">
                                        <div style={{ position: 'relative' }} className="flex flex-col items-center cursor-pointer el-popover__reference" aria-describedby="el-popover-8997" >
                                            <p data-bs-toggle="dropdown" aria-expanded="false"
                                                title="Tốc độ phát"
                                                className="dropdown w-max font-medium  font-medium text-sm-15-18  text-white-default m-0">
                                                x {parseFloat(playbackRate)}
                                            </p>
                                            <div className="dropdown-menu dropdown-menu-end" style={{ background: 'transparent' }}>
                                                <SpeedAudio onSpeedAudio={onSpeedAudio} speed={playbackRate} />
                                            </div>
                                        </div>
                                    </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="mr-3 w-6 h-6">
                                    <div className="cursor-pointer hover:bg-white-6 rounded-full flex justify-center mx-1 items-center">
                                        <div className="flex justify-center items-center">
                                            <div className="icon-action-item w-6 h-6 m-auto">
                                                <div
                                                    onClick={() => onShowLoop()}
                                                    className="w-full h-full relative grid-center cursor-pointer">
                                                    {!loop ?
                                                        <img title="Lặp lại" src="/images/player/icon-repeat-repeat.svg" alt="icon-repeat-repeat" className="cursor-pointer absolute-full icon-action-visible" />
                                                        :
                                                        <img title="Bỏ lặp" src="/images/player/icon-repeat-default.svg" alt="icon-repeat-default" class="cursor-pointer absolute-full icon-action-visible" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mr-4">
                                    <span size="50vh">
                                        <span className="el-popover__reference-wrapper">
                                            <div className="cursor-pointer el-popover__reference" aria-describedby="el-popover-3651" >
                                                <div style={{ position: 'relative' }} className="icon-action-item cursor-pointer w-6 h-6 m-auto">
                                                    <div
                                                        data-bs-toggle="dropdown" aria-expanded="false"
                                                        title="Giọng đọc"
                                                        className="dropdown w-full h-full relative grid-center cursor-pointer">
                                                        <img src="/images/player/icon-audio.svg" alt="icon-audio" className="cursor-pointer absolute-full icon-action-visible" />
                                                    </div>

                                                    <div className="dropdown-menu dropdown-menu-end el-popover el-popper popover-player-accent show-box-voice"  >
                                                        <div className="p-2-5 w-full h-full rounded-t-xl px-2-5">
                                                            <ul className="text-sm-15-18 font-medium m-0 pl-2 pr-2">
                                                                {getStreamingLink.length > 1 ?
                                                                    <>
                                                                        {getStreamingLink.map(item => {
                                                                            return (
                                                                                <>
                                                                                    <li key={item.voice}
                                                                                        onClick={() => changeVoice(item.url, item.voice)}
                                                                                        className={`mb-2-5 hover:text-0ba cursor-pointer py-2 flex-row-center ${voicePlayer?.voice == item.voice ? 'text-0ba' : 'text-white-default'}`}>
                                                                                        {item.label}
                                                                                    </li>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <li key={getStreamingLink[0].voice}
                                                                            onClick={() => changeVoice(getStreamingLink[0].url, getStreamingLink[0].voice)}
                                                                            className={`mb-2-5 hover:text-0ba cursor-pointer py-2 flex-row-center text-0ba`}>
                                                                            {getStreamingLink[0].label}
                                                                        </li>
                                                                    </>
                                                                }

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </span>
                                </div>
                                <div className="mr-4">
                                    <div className="w-max icon-action-item group relative cursor-pointer flex flex-col items-center">
                                        <span>
                                            <span className="el-popover__reference-wrapper">
                                                <div className="flex flex-col items-center el-popover__reference" aria-describedby="el-popover-4506" >
                                                    <div className="icon-action-item w-6 h-6">
                                                        <div
                                                            data-bs-toggle="dropdown" aria-expanded="false"
                                                            title="Danh sách phát"
                                                            className="dropdown w-full h-full relative grid-center cursor-pointer">
                                                            <img src="/images/player/icon-chapter.svg" alt="icon-chapter" className="cursor-pointer absolute-full icon-action-visible" />
                                                        </div>
                                                        <div
                                                            style={{ position: 'absolute' }}
                                                            className={`dropdown-menu dropdown-menu-end el-popper popover-player popover-player-chapter ${dataChapters && dataChapters.length <= 1 ? 'custom-width' : 'custom-width-multi'}`}>
                                                            <div className="py-4 pr-2 overflow-hidden bg-222 rounded-lg min-w-[760px]">
                                                                <h3 className="px-4 font-medium text-lg-18-21 text-white-default mb-3">
                                                                    Danh sách các chương khác
                                                                </h3>
                                                                <div className="w-full overflow-y-auto style-scroll-player max-h-[420px] h-full">

                                                                    {dataChapters && dataChapters.map((item, index) => {
                                                                        return (
                                                                            <ChapterItem
                                                                                onPlayChapter={onPlayChapter}
                                                                                onPlayPauseChapter={onPlayPauseChapter}
                                                                                index={index}
                                                                                item={item}
                                                                                thumbnail={localThumb}
                                                                                playingItem={playing}
                                                                                idActive={lstAudioBookStore?.chapter_id} />
                                                                        )
                                                                    })}

                                                                </div >
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="mr-4"><span><span className="el-popover__reference-wrapper">
                                    <div
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                        className="h-[90px] flex items-center el-popover__reference" aria-describedby="el-popover-44" >
                                        <div>
                                            <div className="icon-action-item cursor-pointer w-6 h-6 m-auto">
                                                <div
                                                    title="Âm thanh"
                                                    className="w-full h-full relative grid-center cursor-pointer"
                                                    onClick={() => handleToggleMuted()}
                                                >
                                                    {!muted ?
                                                        <img src="/images/player/icon-volume-dk.svg" alt="icon-volume-dk" className="cursor-pointer absolute-full icon-action-visible" />
                                                        :
                                                        <img src="/images/player/icon-mute.svg" alt="icon-volume-dk-active" className="cursor-pointer absolute-full icon-action-visible" />
                                                    }
                                                </div>
                                                {isHovering &&
                                                    <div
                                                        style={{ minWidth: '20px !important', right: 'auto' }}
                                                        className="el-popover el-popover-volume el-popper popover-player-accent popover-player-volumn" >
                                                        <input type='range' min={0} max={1} step='any' value={volume} onChange={(e) => handleVolumeChange(e)} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </span>
                                </span>
                                </div>
                                <div className="mr-4">
                                    <div className="icon-action-item cursor-pointer w-6 h-6 m-auto">
                                        <div title="Đóng"
                                            onClick={closePlayerAudio}
                                            className="w-full h-full relative grid-center cursor-pointer">
                                            <img src="/images/player/icon-close-white.svg" alt="icon-close-white" className="cursor-pointer absolute-full icon-action-visible" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >


                </>
            </div>
            {/* } */}
        </>)
}

export default WakaAudio;