import axios from "axios";
import { useEffect, useRef, useState } from "react";
import './player.scss'
import Duration from './Duration';
import { formatDateTime } from "shared/hooks/useCurrentUserDefault";
const ChapterItem = (props) => {    
    const onPlayItemAudio = (id, index) => {
        if (props.onPlayChapter) {
            props.onPlayChapter(id, index);
        }
    }
    const onPlayPauseItem = (id, index) => {
        if (props.onPlayChapter) {
            props.onPlayPauseChapter(id, index);
        }
    }    

    return (
        <>
            <div className="w-full p-4 cursor-pointer icon-action-item flex-row-center popover-chapter-item group justify-between cursor-pointer h-24">
                <div className="w-15 h-15">
                    <img src={props.thumbnail} alt="" className="object-cover w-full h-full rounded-full lazyLoad isLoaded" />
                </div>
                <div
                    onClick={(e) => onPlayItemAudio(props.item.id, props.index)}
                    className="flex flex-1 ml-5 mr-10 flex-col">
                    <p className="text-sm-15-18 group-hover:text-orange-573 text-0ba">
                        {props.item.name}
                    </p>
                    <div className="flex-row-center sm-14-16 text-white-179"><span>{formatDateTime(props.item.created_time)}</span> <span className="mx-2 mt-2">•</span> <span><Duration seconds={props.item.duration} /></span>
                    </div>
                </div>

                <div class="flex-row-center cursor-pointer justify-end">
                    <div
                        onClick={(e) => onPlayPauseItem(props.item.id, props.index)}
                        class="flex flex-col">
                        {props.item.id == props.idActive &&
                            <img src="/images/player/icon-playing.gif" />
                        }
                    </div>
                    <div class="w-6 h-6 ml-6">
                        <div class="icon-action-item w-6 h-6">
                            <div
                                class="w-full h-full relative grid-center cursor-pointer">                                
                                {props.item.id != props.idActive ?
                                    <img
                                        onClick={(e) => onPlayItemAudio(props.item.id, props.index)}
                                        src="/images/player/icon-play-chapter.svg" alt="icon-play-chapter-active" className="cursor-pointer absolute-full icon-action-visible" />
                                    :
                                    <>
                                        {props.playingItem ?
                                            <img
                                                onClick={(e) => onPlayPauseItem(props.item.id, props.index)}
                                                src="/images/player/icon-pause-chapter-active.svg" alt="icon-pause-chapter-active" class="cursor-pointer absolute-full icon-action-visible" />
                                            :
                                            <img
                                                onClick={(e) => onPlayPauseItem(props.item.id, props.index)}
                                                src="/images/player/icon-play-chapter.svg" alt="icon-play-chapter-active" className="cursor-pointer absolute-full icon-action-visible" />
                                        }
                                    </>
                                }


                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>)
}

export default ChapterItem;