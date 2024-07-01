import './MissionTask.scss';
import { ProgressBar } from 'primereact/progressbar';

const MissionTask = (props) => {
    let { name, category, action, date, status, progress, onclick } = props;
    return (
        <>
            <div className='missiontask' style={{ backgroundColor: "white" }}>
                <div className="name-course">
                    <span style={{ display: 'inline-block', width: "150px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='titleName' title={name} onClick={onclick}>{name}</span>
                </div>
                <div className="bd-highlight mb-3" >
                    <span className=" bd-highlight" style={{ marginLeft: "10px", color: "gray" }}>{category}, </span>
                    <span className=" bd-highlight" style={{ color: "gray" }}>{action}</span>
                </div>
                <hr />
                <div>
                    <span style={{ marginLeft: "12px" }}>Hết hạn vào </span> <span style={{ fontWeight: "bold" }}>{date}</span>
                </div>
                <div className="d-flex bd-highlight mb-3">
                    <span className="p-2 bd-highlight" style={{ margin: '10px 0px -10px 6px' }} >{status}</span>
                    <span className="ms-auto p-2 bd-highlight" style={{ margin: '10px 0px -10px 10px', fontWeight: "600" }}>{progress}%</span>
                </div>
                <ProgressBar value={progress} showValue={false} style={{ height: '0.3rem' }}  ></ProgressBar>
            </div>
            <br />
        </>
    )
}
export default MissionTask;