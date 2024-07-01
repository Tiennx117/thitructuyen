import React, { useState, useRef } from 'react'
import { ReactReader } from "react-reader";

function spine_get(target) {
    var index = 0;

    if (typeof target === "undefined") {
        while (index < this.spineItems.length) {
            let next = this.spineItems[index];

            if (next && next.linear) {
                break;
            }

            index += 1;
        }
    } else if (this.epubcfi.isCfiString(target)) {
        let cfi = new _epubcfi.default(target);
        index = cfi.spinePos;
    } else if (typeof target === "number" || isNaN(target) === false) {
        index = target;
    } else if (typeof target === "string" && target.indexOf("#") === 0) {
        index = this.spineById[target.substring(1)];
    } else if (typeof target === "string") {
        // Remove fragments
        target = target.split("#")[0];
        index = this.spineByHref[target] || this.spineByHref[encodeURI(target)];
    }

    return this.spineItems[index] || null;
}

const DemoWaka = () => {
    const viewerRef = useRef(null);
    const [location, setLocation] = useState(null)
    const renditionRef = useRef(null)
    const locationChanged = epubcifi => {
        console.log(epubcifi)
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }
    return (<>
        <div style={{ height: '100vh' }}>
            <ReactReader
                ref={renditionRef}
                location={location}
                locationChanged={locationChanged}
                url="https://react-reader.metabits.no/files/alice.epub"
                //url="https://307a0e78.vws.vegacdn.vn/static/book_paper/0/0/0/43625_5_drm.epub"
                getRendition={(rendition) => {
                    renditionRef.current = rendition;
                    const spine_get = rendition.book.spine.get.bind(
                        rendition.book.spine
                    );
                    rendition.book.spine.get = function (target) {
                        var t = spine_get(target);
                        if (!t) {
                            t = spine_get(undefined);
                        }
                        return t;
                    }
                }}
            />
        </div>
        
    </>)
}
export default DemoWaka;