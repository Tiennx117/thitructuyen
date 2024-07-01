import PropTypes from 'prop-types';

const Accordion = (props) => {
    const { expand, onClick, title, answer, filename, filepath } = props;
    const handleOpenNewTab = (filepath) => {
        window.open(filepath);
      };
    return (
        <div>
            <div className='p-card' style={{marginTop:'15px'}}>
                <dt className={expand ? 'title is-expanded' : 'title'} onClick={onClick}>
                    {title}
                </dt>
                <dd className={expand ? 'content is-expanded' : 'content'}>
                    <p>
                        {answer}
                    </p>
                    <p>
                        <a onClick={()=>handleOpenNewTab(filepath)}>
                            {filename}
                        </a>
                    </p>
                </dd>
            </div>
            <div className='row'>
                <p>

                </p>
            </div>
        </div>
    );

}

Accordion.propTypes = {
    expand: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    answer: PropTypes.string,
    filename: PropTypes.string,
    filepath: PropTypes.string,
};

export default Accordion;