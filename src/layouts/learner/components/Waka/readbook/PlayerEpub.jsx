import { useEffect, useRef, useState } from "react";
import './styleepub.scss'
const browserEpub = (props) => {  
    // console.log('props', props)
    const [currentSection, setCurrentSection] = useState(null);
    const [chapter, setChapter] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
    const [renditionView, setrenditionView] = useState(null);
    const [toc, setToc] = useState([]);
    const [titleEpub, setTitleEpub] = useState(null);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    //const [book, setBook] = useState(null);    
    const selectRef = useRef(null);
    const viewerRef = useRef(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const book = ePub(props?.url);
    
    let rendition = book.renderTo("viewer", {
        width: '100%',
        height: screenHeight - 150,
    });

    let getIndexSectionEpub = localStorage.getItem('indexSectionEpub');
    let getCfiSectionEpub = localStorage.getItem('cfiSectionEpub');
    let getIdSectionEpub = localStorage.getItem('IdSectionEpub');

    const onPrev = () => {
        renditionView.prev();
    }

    const onNext = () => {
        renditionView.next();
    }
    const onChangeSelect = (e) => {
        if(chapters[e.target.selectedIndex].value != chapter[0])
        {
            setChapter([chapters[e.target.selectedIndex].href]);
            let index1 = e.target.selectedIndex,
            url = e.target.options[index1].ref;
            let index = book.spine.spineById[url];
            renditionView.display(index);
            return false;
        }
        
    }

    const keyListener = function (e) {
        if ((e.keyCode || e.which) == 37) {           
            book.package?.metadata?.direction === "rtl" ? rendition?.next() : rendition.prev();            
        }
        if ((e.keyCode || e.which) == 39) {
            book.package?.metadata?.direction === "rtl" ? rendition?.prev() : rendition.next();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setrenditionView(rendition);
            let selectToc = document.getElementById("toc"), docfrag = document.createDocumentFragment();
            book.loaded.navigation.then(function (toc) {            
                book.opened.then(function () {
    
                    if (getIdSectionEpub == props?.bookId) {  
                        console.log('getCfiSectionEpub', getCfiSectionEpub)                                 
                        // rendition.display(getIndexSectionEpub ? getIndexSectionEpub : 0);
                        rendition.display(getCfiSectionEpub ? getCfiSectionEpub : 0);
                    } else {
                        rendition.display(0);
                    }
                });
                let lst_data = [];
                toc.forEach(function (chapter, index) {
                    let option = document.createElement("option");
                    option.innerHTML = chapter.label;
                    option.value = chapter.href.replace('#', '');
                    option.ref = chapter.href.replace('#', '');
                    option.className = 'option-epub';
                    docfrag.appendChild(option);
                    let obj = { value: chapter.href.replace('#', ''), name: chapter.label };
                    lst_data.push(obj);
                });
                setChapters(lst_data);
                //setChapter([lst_data[0].value])
                selectToc.appendChild(docfrag);
            })
            
            rendition.on("keyup", keyListener);
            document.addEventListener("keyup", keyListener, false);
    
    
            rendition.on("relocated", function (location) {
                localStorage.setItem('indexSectionEpub', location.start.index);
                localStorage.setItem('cfiSectionEpub', location.end.cfi);
                localStorage.setItem('IdSectionEpub', props?.bookId);
                let next = book.package.metadata.direction === "rtl" ? document.getElementById("prev") : document.getElementById("next");
                let prev = book.package.metadata.direction === "rtl" ? document.getElementById("next") : document.getElementById("prev");
    
                if (location.atEnd) {
                    next.style.visibility = "hidden";
                } else {
                    next.style.visibility = "visible";
                }
    
                if (location.atStart) {
                    prev.style.visibility = "hidden";
                } else {
                    prev.style.visibility = "visible";
                }
            })
    
    
            rendition.on("rendered", function (section) {
                let titleBook = book.navigation.get(section.href.replace("contents/", ""));
                if (titleBook) {
                    if(titleBook.href != chapter[0])
                    {
                        setChapter([titleBook.href]);
                    }
                    document.getElementById("chapter-epub").innerHTML = titleBook.label + ' - ';
                }
    
                let current = book.navigation && book.navigation.get(section.href.replace("contents/", ""));
                if (current) {
                    let select = document.getElementById("toc");
                    let selected = select.querySelector("option[selected]");
                    if (selected) {
                        selected.removeAttribute("selected");
                    }
                    let options = select.querySelectorAll("option");
                    for (let i = 0; i < options.length; ++i) {
                        let selected = options[i].ref === current.href;
                        if (selected) {
                            options[i].setAttribute("selected", "");
                        }
                    }
                }
            });   
        }, 300);
             
    }, []);
    return (
        <>

            <div className="container-fluid" id="epub-detail">
                <div className="row">
                    <div className="col-lg-3 left-menu-epub pt-5" style={{ height: '99vh' }}>
                        <div className="title-top-epub">
                            <p className=""><strong>{props.title}</strong></p>
                            <p className="publishing">{props.publishing}</p>
                        </div>
                        <hr />
                        <select value={chapter} multiple id="toc" onChange={(e) => onChangeSelect(e)}></select>
                    </div>
                    <div className="col-lg-9">
                        <div className="mt-1 ml-5 mb-3 pt-2">
                            <div className="col-lg-9">
                                <strong><span id="chapter-epub" style={{ fontStyle: 'italic' }}></span></strong>{props.title}
                            </div>
                            <div className="col-lg-3">
                                <div id="prev" className="arrow "
                                        onClick={() => onPrev()}>‹</div>
                                <div id="next" className="arrow "
                                        onClick={() => onNext()}>›</div>
                            </div>
                        </div>
                        <div id="viewer" className="spreads"></div>
                    </div>
                </div>
            </div>

        </>

    );
}
export default browserEpub;