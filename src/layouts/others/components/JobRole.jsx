import Image from "components/Image";
import PropTypes from 'prop-types';
import './skillpath.scss';
import { useState } from "react";

function JobRole(props) {
    const [skillStyle, setSkillStyle] = useState("");

    return (
        <>
            {
                props.role == "parent" ?
                    <div onClick={() => (props.onClick(), setSkillStyle(""))} style={props.clicked == true ? { cursor: "pointer", border: "5px solid red" } : { cursor: "pointer" }}>
                        <div className="align-self-center" style={{ height: '130px', backgroundImage: `url('/images/overview-user-bg.jpg')`, margin: '0px auto' }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Image src='/images/user1.png' height="46px" style={{ borderRadius: "50%", marginTop: "5%" }} width="46px" alt="Ảnh đại diện" />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", fontWeight: "700", color: "white" }}>{props.name}</div>
                            <div>{props.current}</div>
                        </div>
                        <div className="p-card-body">
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='d-flex flex-column text-center'>
                                    <span>
                                        Kỹ năng
                                    </span>
                                    <span className="fsx-16px"><i className="fa fa-gear mr-2" style={{ color: '#41ad00' }}></i>{props.skill}</span>
                                </div>
                                <div className='d-flex flex-column text-center'>
                                    <span>
                                        Cấp độ yêu cầu
                                    </span>
                                    <span className="fsx-16px"><i className="fa fa-bars-progress mr-2" style={{ color: '#b7585d' }}></i>{props.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div onClick={() => (props.onClick(), setSkillStyle("role"))}
                        style={
                            props.current == 'Hiện tại'
                                ?
                                (props.clicked == true && skillStyle == "role"
                                    ?
                                    { cursor: "pointer", border: "5px solid red" }
                                    :
                                    { cursor: "pointer", border: "5px solid orange" })
                                :
                                (props.clicked == true && skillStyle == "role"
                                    ?
                                    { cursor: "pointer", border: "5px solid red" }
                                    :
                                    { cursor: "pointer", border: "5px" })
                        }
                    >
                        <div className="align-self-center" style={{ height: '130px', backgroundImage: `url('/images/overview-user-bg.jpg')`, margin: '0px auto' }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Image src='/images/user1.png' height="46px" style={{ borderRadius: "50%", marginTop: "5%" }} width="46px" alt="Ảnh đại diện" />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", fontWeight: "700", color: "white" }}>{props.name}</div>
                            {
                                props.current != null ?
                                    <div style={{ display: "flex", backgroundColor: "white", borderRadius: "10px", marginTop: "10%", marginLeft: "30%", marginRight: "30%", justifyContent: "center", padding: "10px", withd: "max-content" }}>
                                        {props.current}
                                    </div>
                                    :
                                    ''
                            }
                        </div>
                        <div className="p-card-body">
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='d-flex flex-column text-center'>
                                    <span>
                                        Kỹ năng
                                    </span>
                                    <span className="fsx-16px"><i className="fa fa-gear mr-2" style={{ color: '#41ad00' }}></i>{props.skill}</span>
                                </div>
                                <div className='d-flex flex-column text-center'>
                                    <span>
                                        Cấp độ yêu cầu
                                    </span>
                                    <span className="fsx-16px"><i className="fa fa-bars-progress mr-2" style={{ color: '#b7585d' }}></i>{props.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

JobRole.propTypes = {
    role: PropTypes.string,
    name: PropTypes.string,
    current: PropTypes.string,
    skill: PropTypes.number,
    level: PropTypes.number,
    onClick: PropTypes.func,
    clicked: PropTypes.bool
};

JobRole.defaultProps = {
    skill: 0,
    level: 0,
    onClick: () => { },
    clicked: false
}

export { JobRole }