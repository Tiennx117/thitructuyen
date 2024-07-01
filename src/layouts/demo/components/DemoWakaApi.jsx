import axios from "axios";
import { Image } from "components/Image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";



const DemoWakaApi = () => {
    const [data, setData] = useState();
    const [contentId, setContentId] = useState(14988)
    const renditionRef = useRef(null);
    const [location, setLocation] = useState(null)
    useEffect(() => {


    }, [])

    const getEpub = async (contentId) => {
        let result = await axios.get('http://10.0.1.132:1900/Demo/GetBookepub?content_id=' + contentId);
        //console.log(result.data?.data?.epub_link);
        setData(result.data);
    }
    const locationChanged = epubcifi => {
        console.log('epubcifi', epubcifi)
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }
    return (<>
        <div className="d-flex flex-column">
            <div className="d-flex flex-row">
                <InputText value={contentId} onChange={(e) => setContentId(e.target.value)} />
                <Button onClick={() => getEpub(contentId)}>Get epub</Button>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between">
                    <div className="flex-1">
                        Name
                    </div>
                    <div className="flex-3">
                        <span>{data?.data?.name}</span>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <div className="flex-1">
                        description
                    </div>
                    <div className="flex-3">
                        <div dangerouslySetInnerHTML={{ __html: data?.data?.description ? data?.data?.description : "Không có mô tả." }}></div>
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <div className="flex-1">
                    thumbnail
                    </div>
                    <div className="flex-3">
                        <Image src={data?.data?.thumbnail} />
                    </div>
                </div>
                
            </div>

            <div style={{ height: '100vh' }}>
                <ReactReader
                    ref={renditionRef}
                    location={location}
                    locationChanged={locationChanged}
                    url={data?.data?.epub_link}
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


        </div>
    </>)
}

export default DemoWakaApi;