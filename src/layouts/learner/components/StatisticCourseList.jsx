import Image from "components/Image"
import { ProgressBar } from "primereact/progressbar"
import { appSetting } from "shared/app-settings"
import { classNames } from "primereact/utils"
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function StatisticCourseList(props) {
    const urlImage = (type) => {
        let url = appSetting.ADDRESS_WEB + '/images/statistic-learning-all.png';
        switch (type) {
            case 0:
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

        }
        return url;
    }

    return (<>
        <li
            className={props.active ? 'course-list-li' : ''} style={{ height: '4rem', borderBottom: '3px ridge' }} onClick={() => props.onClick()}>
            <div className='d-flex align-items-center'>
                <div className='canv-name' style={{ marginTop: '1rem', marginLeft: '1rem', fontWeight: 500, fontSize: '1.1rem' }}>{props.title}</div>
            </div>
        </li>

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
StatisticCourseList.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number,
    percent: PropTypes.number,
    active: PropTypes.bool,
    type: PropTypes.number,
    onClick: PropTypes.func
};
StatisticCourseList.defaultProps = {
    active: false,
    total: 0,
    percent: 0,
    onClick: () => { }
}
export { StatisticCourseList }