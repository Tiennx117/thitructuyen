import Image from "components/Image"
import { ProgressBar } from "primereact/progressbar"
import { appSetting } from "shared/app-settings"
import { classNames } from "primereact/utils"
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../components/style/statisticLearning.scss'

function StatisticLearningItem(props) {
    console.log('props', props);
    const urlImage = (type) => {
        let url = appSetting.ADDRESS_WEB + '/images/statistic-learning-all.png';
        switch (type) {
            case 0:
                // code block
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-all.png';
                break;
            case 1:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-baithi.png';
                break;
            case 2:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-baitap.png';
                break;
            case 3:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-hoctructuyen.png';
                break;

            case 4:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-lophoc-taptrung.png';
                break;

            case 6:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-tailieu.png';
                break;
            case 9:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-video.png';
                break;
            case 11:
                url = appSetting.ADDRESS_WEB + '/images/statistic-learning-baikiemtra.png';
                break;

            default:
            // code block
        }
        return url;
    }

    return (<>

        {/* <li
            className={classNames('hand-cursor', props.active ? 'active' : '')} onClick={() => props.onClick()}>
            <div className='d-flex align-items-center'>
                <div className='pie-title-center progress-circle-green'>
                    <CircularProgressbar value={props.percent} text={`${props.percent}%`} styles={{
                        text: {
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            fill: "#3c4856",
                        },
                        background: {
                            fill: '#000000',
                        },
                        path: {
                            stroke: props.mod % 2 ? '#f46567' : '#2ab4ce',
                        },
                        trail: {
                            color: '#d6d6d6'
                        },
                    }} />
                </div>
                <div className='canv-name'>{props.title}  <br /> <span>({props.total})</span></div>
            </div>
        </li> */}

        <ul>
            <li>
                <div className={classNames('canv-name', 'hand-cursor', props.active ? 'active' : '')} onClick={() => props.onClick()}>{props.title} <span>({props.total})</span></div>
            </li>
        </ul>


        {/* <div onClick={()=>props.onClick()} className={classNames('d-flex flex-column justify-content-between statistic-learning-item p-3 m-2 cursor-pointer', props.active?'statistic-learning-active bg-primary':'')}>
            <div className="d-flex flex-row justify-content-between">
                <Image width={50} height={50} src={urlImage(props.type)} />
                <span className="p-1 flex-grow-1">{props.title}</span>
                <div className="static-learning-total border-1 text-center">
                    <span className="fw-bold static-learning-text">{props.total}</span>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between pd-2  align-bottom">
                <div className="d-block w-100">
                <ProgressBar color="#0CEBCC"  value={props.percent} showValue={false} style={{height:'8px'}}></ProgressBar>
                </div>
                
                <span style={{height:'8px',position: 'relative',
    bottom: '4px'}} className="fsx-11px pl-2">{props.percent}%</span>
            </div>
            
        </div> */}
    </>)
}
StatisticLearningItem.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
    percent: PropTypes.number,
    active: PropTypes.bool,
    type: PropTypes.number,
    onClick: PropTypes.func
};
StatisticLearningItem.defaultProps = {
    active: false,
    total: 0,
    percent: 0,
    onClick: () => { }
}
export { StatisticLearningItem }