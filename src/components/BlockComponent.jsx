
const BlockComponent = (props)=>{
    return(<>
    <div className={props.disabled ? 'block-component' : null}>
        <div className={props.disabled ? 'pointer-events-none ' : null}>
            {props.children}
            </div>
        </div>
    </>)
}
export default BlockComponent;