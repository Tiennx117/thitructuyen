import './progress-circle.scss';
import { classNames } from 'primereact/utils';
const ProgressCircle = (props) => {

    return <>
        <div className={classNames('c100', 'p' + props.value, 'small')}>
            <span>{props.value}%</span>
            <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
            </div>
        </div>
    </>
}
export { ProgressCircle }