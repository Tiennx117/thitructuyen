import React, { useRef } from 'react';
import { Link } from 'react-scroll';

function FocusScroll() {
    const ref = useRef(null);

    function handleClick() {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div id="list-example" className="list-group overflow-y-auto card-body scrollspy-example" 
                data-spy="scroll"
                data-target="#list-example"
                data-offset={0}
                // className="overflow-y-auto card-body scrollspy-example"
                style={{ height: 'calc(100vh - 360px)' }}
            >
                <a id="list-item-1" className="list-group-item list-group-item-action" href="#list-item-1">
                    Item 1
                </a>
                <a id="list-item-2" className="list-group-item list-group-item-action" href="#list-item-2">
                    Item2
                </a>
                <a id="list-item-3" className="list-group-item list-group-item-action" href="#list-item-3">
                    Item 3
                </a>
                <a id="list-item-4" className="list-group-item list-group-item-action" href="#list-item-4">
                    Item 4
                </a>
                <a id="list-item-5" className="list-group-item list-group-item-action" href="#list-item-5">
                    Item 5
                </a>
                <a id="list-item-6" className="  list-group-item list-group-item-action" href="#list-item-6">
                    Item 6
                </a>
                <a id="list-item-7" className="list-group-item list-group-item-action" href="#list-item-7">
                    Item 7
                </a>
                <a id="list-item-8" className="active list-group-item list-group-item-action" href="#list-item-8">
                    Item 8
                </a>
            </div>
            {/* <div
                data-spy="scroll"
                data-target="#list-example"
                data-offset={0}
                className="overflow-y-auto card-body scrollspy-example"
                style={{ height: 'calc(100vh - 360px)' }}
            >
                <h4 id="list-item-1">Item 1</h4>
                <p>...</p>
                <h4 id="list-item-2">Item 2</h4>
                <p>...</p>
                <h4 id="list-item-3">Item 3</h4>
                <p>...</p>
                <h4 id="list-item-4">Item 4</h4>
                <p>...</p>
                <h4 id="list-item-5">Item 5</h4>
                <p>...</p>
                <h4 id="list-item-6">Item 6</h4>
                <p>...</p>
                <h4 id="list-item-7">Item 7</h4>
                <p>...</p>
                <h4 id="list-item-8">Item 8</h4>
                <p>...</p>
            </div> */}
        </>
    );
}

export default FocusScroll;