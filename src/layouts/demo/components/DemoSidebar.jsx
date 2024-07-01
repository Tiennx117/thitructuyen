import './demo.scss';
import { Link } from 'react-router-dom';
const DemoSideBar = () => {
    return (
        <div className="flex-shrink-0 p-3 bg-white">
            <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <svg className="bi me-2" width={30} height={24}><use xlinkHref="#bootstrap" /></svg>
                <span className="fs-5 fw-semibold">Demo component</span>
            </a>
            <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                        LMS Components
                    </button>
                    <div className="collapse show" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <Link className="link-dark rounded" to={'/demo/lms-container'}>
                                    Progress circle
                                </Link>
                                {/* <a href="#" className="link-dark rounded">Progess circle</a> */}
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/demotest'}>
                                    Background image
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/dragdrop'}>
                                    Drag drop
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/dragdrophook'}>
                                    Drag drop hook list
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/cardresponsive'}>
                                    DemoCardResponive
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/calendar'}>
                                    Calendar
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/fixscroll'}>
                                    Fix scroll height
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/hooklist'}>
                                    Demo List
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/focus-scroll'}>
                                    Focus-scroll
                                </Link>
                                
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/demo-cancelrequest'}>
                                    Demo cancel request
                                </Link>
                                
                            </li>
                            {/* <li>
                                <Link className="link-dark rounded" to={'/demo/demowaka'}>
                                    Demo Waka reader
                                </Link>
                            </li>

                            <li>
                                <Link className="link-dark rounded" to={'/demo/demowaka2'}>
                                    Demo Waka jwplayer
                                </Link>
                            </li>

                            <li>
                                <Link className="link-dark rounded" to={'/demo/jwplayer'}>
                                    Demo jwplayer
                                </Link>
                            </li> */}
                            <li>
                                <Link className="link-dark rounded" to={'/demo/demowakaapi'}>
                                    Demo waka epub
                                </Link>
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/demowakaaudio'}>
                                    Demo waka audio
                                </Link>
                            </li>

                            <li>
                                <Link className="link-dark rounded" to={'/demo/demowakaapi-list'}>
                                    Demo waka api
                                </Link>
                            </li>
                            <li>
                                <Link className="link-dark rounded" to={'/demo/tree-checkbox'}>
                                    Demo tree checkbox
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                        Chart
                    </button>
                    <div className="collapse show" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <Link className="link-dark rounded" to={'/demo/columnchart'}>
                                    Column chart
                                </Link>
                            </li>

                            <li>
                                <Link className="link-dark rounded" to={'/demo/gaugechart'}>
                                    GaugeChart
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </li>
                
            </ul>
        </div>

    )
}
export default DemoSideBar;