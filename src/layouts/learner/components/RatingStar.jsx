import styles from './style/learningDetail.module.scss';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';

const RatingStar = (props) => {
    const max = 5;
    const active = props.activeStar;
    const renderStarActive = () => {
        let items = [];
        for (let i = 0; i < active; i++) {

            items.push(<i className={classNames('fa fa-star', styles['rating-color'])} ></i>);
        }
        return (<>{items}</>);
    }
    const renderStarActiveNone = () => {
        let items = [];
        for (let i = 0; i < (5 - active); i++) {
            items.push(<i className="fa fa-star"></i>)
        }
        return (<>{items}</>);
    }

    return (
        <div className={styles['small-ratings']}>
            {renderStarActive()}
            {renderStarActiveNone()}
            {props.isReportedRebuse == true ?
                <a className='fa-report-abuse fa fa-flag' style={{ color: '#f36464' }} />
                : ''}
        </div>
    )
}

RatingStar.propTypes = {
    activeStar: PropTypes.number,
    isReportedRebuse: PropTypes.bool,
};
export default RatingStar;