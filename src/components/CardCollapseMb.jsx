const CardCollapseMb = (props) => {
    return (
        <div className="d-flex flex-column">
            <div className="d-lg-none">
                <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true">{props.title}</button>
                {/* <i className="pi pi-angle-double-right cursor-pointer rounded" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample"></i> */}
            </div>
            <div className="collapse show" id="collapseExample">
                {props.children}
            </div>
        </div>


    )
}
export default CardCollapseMb;