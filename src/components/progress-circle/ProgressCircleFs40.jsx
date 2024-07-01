import './progress-circle.scss';
import { classNames } from 'primereact/utils';
const ProgressCircleFs40 = (props) => {

    return <>
        <div className={classNames('c100', 'p' + props.value, 'small-40')}>
            {/* <span>{props.value}%</span> */}
            <span>
                <i class="fa-solid fa-caret-right" style={{ fontSize: 40, color: '#1AA1DC', cursor: 'pointer' }}></i>
            </span>
            <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
            </div>
        </div>
    </>
}
export { ProgressCircleFs40 }