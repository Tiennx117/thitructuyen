import './player.scss'

const SpeedAudio = (props) => {
    const handleSetPlaybackRate = (value) => {
        if (props.onSpeedAudio) {
            props.onSpeedAudio(parseFloat(value));
        }
    }
    
    return (
        <>
            <div             
            className="popover-player-accent"
                style={{ position: 'absolute', minWidth: '85px', right: '-32px', bottom: '58px' }}
            >
                <div className="h-max overflow-hidden p-y-2-5 px-4">
                    <div className="w-full px-0">
                        <div className="w-full h-11 group cursor-pointer flex-row-center grid-center">
                            <div className="w-full flex items-center justify-center"><span className={`hover:text-0ba text-sm-15-18 font-medium text-white-default ${props.speed == "0.5" && 'text-0ba'}`}
                                onClick={(e) => handleSetPlaybackRate(0.5)}>0.5</span>

                            </div>
                        </div>
                        <div className="w-full h-11 group cursor-pointer flex-row-center grid-center">
                            <div className="w-full flex items-center justify-center"><span className={`hover:text-0ba text-sm-15-18 font-medium text-white-default ${props.speed == "0.8" && 'text-0ba'}`}
                                onClick={(e) => handleSetPlaybackRate(0.8)} >0.8</span>

                            </div>
                        </div>
                        <div className="w-full h-11 group cursor-pointer flex-row-center grid-center">
                            <div className="w-full flex items-center justify-center"><span className={`hover:text-0ba text-sm-15-18 font-medium text-white-default ${props.speed == "0.9" && 'text-0ba'}`}
                                onClick={(e) => handleSetPlaybackRate(0.9)} >0.9</span>

                            </div>
                        </div>
                        <div className="w-full h-11 group cursor-pointer flex-row-center grid-center text-0ba">
                            <div className="w-full flex items-center justify-center">
                                <span className={`hover:text-0ba text-sm-15-18 font-medium text-white-default ${props.speed == "1" && 'text-0ba'}`}
                                    onClick={(e) => handleSetPlaybackRate(1.0)} >1.0</span>

                            </div>
                        </div>
                        <div className="w-full h-11 group cursor-pointer flex-row-center grid-center">
                            <div className="w-full flex items-center justify-center"><span className={`hover:text-0ba text-sm-15-18 font-medium text-white-default ${props.speed == "1.2" && 'text-0ba'}`}
                                onClick={(e) => handleSetPlaybackRate(1.2)} >1.2</span>

                            </div>
                        </div>
                        <div className="w-full h-11 group cursor-pointer flex-row-center grid-center">
                            <div className="w-full flex items-center justify-center"><span className={`hover:text-0ba text-sm-15-18 font-medium text-white-default ${props.speed == "1.5" && 'text-0ba'}`}
                                onClick={(e) => handleSetPlaybackRate(1.5)} >1.5</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default SpeedAudio;