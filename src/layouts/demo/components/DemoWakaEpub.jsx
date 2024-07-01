import { useEffect, useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import '../styleepub.scss'
function DemoWakaEpub() {
    const [currentSection, setCurrentSection] = useState(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [toc, setToc] = useState([]);
    //const [book, setBook] = useState(null);

    const selectRef = useRef(null);
    const viewerRef = useRef(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const url1 = 'https://waka.vn/static/enterprise/0/0/0/15029_4/OEBPS/content.opf?token=9c6b7fb2749854a360ea891d092567ed';
    const url2 = 'https://waka.vn/static/enterprise/0/0/1/44576_5/OEBPS/content.opf?token=ca0eb6807b3878557a626e0cffcac891'
    const book = ePub(url1);

    const renderBook = (index) => {
        index = index + 2;// fix lỗi list book spine nhiều hơn list select 2 record, các epub khác thì kiểm tra lại
        const section = book.spine.get(index);
        console.log('section', section)
        if (section) {
            section.render().then(function (html) {
                console.log('html', html);
                //sử dụng iframe fix lỗi ảnh hưởng global style app
                // Loại bỏ khung viền của iframe
                const viewer = document.getElementById('viewer');
                let iframe = document.getElementById('myIframe');
                if (!iframe) {
                    iframe = document.createElement('iframe');
                    iframe.id = 'myIframe';
                    iframe.style.width = '100%'; // Thiết lập chiều rộng
                    iframe.style.height = '100%'; // Thiết lập chiều cao
                    iframe.frameBorder = 0;
                    viewer.appendChild(iframe);
                }
                // Đặt nội dung vào iframe
                iframe.contentDocument.open();
                iframe.contentDocument.write(html);
                iframe.contentDocument.close();

            });
        }
    }

    const onChangeSelect = (e) => {
        console.log(e.target.value);
        //let index = book.spine.spineById[e.target.value];
        setCurrentSection(e.target.value);
        let IndexTemp = toc.findIndex(x => x.href === e.target.value);
        console.log(IndexTemp);
        setCurrentSectionIndex(IndexTemp);
        renderBook(IndexTemp)
    }

    const onPrev = (index) => {
        if (index > 0) {
            setCurrentSectionIndex(index - 1);
            const section = toc[index - 1];
            setCurrentSection(section.href);
            renderBook(index - 1);
        }

    }

    const onNext = (index) => {
        if (index < toc.length - 1) {
            setCurrentSectionIndex(index + 1);
            const section = toc[index + 1];
            setCurrentSection(section.href);
            renderBook(index + 1);
        }

    }

    useEffect(() => {
        console.log('book', book)

        book.loaded.navigation.then(function (res) {
            console.log(res);
            setToc(res.toc);
            const section = res.toc[currentSectionIndex]
            setCurrentSection(section.href);
            console.log(section)
            renderBook(currentSectionIndex)
        })

    }, []);

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <div className="flex-1">
                    {/* <select ref={selectRef} id="toc" onChange={(e) => onChangeSelect(e)}>
                        {toc.map((chapter, index) => (
                            <option key={index} value={chapter.href} >{chapter.label}</option>
                        ))}
                    </select> */}

                    <Dropdown style={{ width: 460 }} value={currentSection} onChange={(e) => onChangeSelect(e)} options={toc} optionValue="href" optionLabel="label"
                        placeholder="--Chọn chương--" />
                </div>
            </div>
            <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                    <div ref={prevRef} id="prev" className="arrow align-self-center" onClick={() => onPrev(currentSectionIndex)}>‹</div>
                </div>

                <div className="flex-1">
                    <div ref={viewerRef} id="viewer" className="scrolled"></div>
                </div>

                <div className="d-flex flex-column">
                    <div ref={nextRef} id="next" className="arrow align-self-center" onClick={() => onNext(currentSectionIndex)}>›</div>
                </div>

            </div>
        </div>
    );
}
export default DemoWakaEpub;