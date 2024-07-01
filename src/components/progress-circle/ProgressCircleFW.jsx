import './progress-circle.scss';
import { classNames } from 'primereact/utils';
const ProgressCircleFW = (props) => {

    return <>
        <div className={classNames('c100', 'p' + props.value, 'small-40')}>
            <span>{props.value}%</span>
            <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
            </div>
        </div>
    </>
}
export { ProgressCircleFW }