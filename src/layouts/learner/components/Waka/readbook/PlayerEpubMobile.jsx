import { useEffect, useState, useRef,useCallback } from 'react';
import './styleepubmobile.scss';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
const browserEpub = (props) =>{  
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const touchStartRef = useRef(null);
    const touchEndRef = useRef(null);
    const [visibleRight, setVisibleRight] = useState(false);
    const [chapter, setChapter] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [renditionView, setrenditionView] = useState(null);
    const book = ePub(props?.url);
    let rendition = book.renderTo("viewer", {
        width: window.outerWidth,
        height: window.innerHeight - 20
    });
    
    // let getIndexSectionEpub = localStorage.getItem('indexSectionEpub');
    // let getCfiSectionEpub = localStorage.getItem('cfiSectionEpub');
    // let getIdSectionEpub = localStorage.getItem('IdSectionEpub');
    const keyListener = function (e) {
        if ((e.keyCode || e.which) == 37) {           
            book.package?.metadata?.direction === "rtl" ? rendition?.next() : rendition.prev();            
        }
        if ((e.keyCode || e.which) == 39) {
            book.package?.metadata?.direction === "rtl" ? rendition?.prev() : rendition.next();
        }
    };
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50 

    
    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }
    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = (e) => {
        //alert('Vui lòng nhập nội dung');
        let touchStart = `${touchStartRef.current}`;
        let touchEnd = `${touchEndRef.current}`;
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        // add your conditional logic here
        {
            if(isLeftSwipe)
            {
                rendition.next();
            }
            if(isRightSwipe)
            {
                rendition.prev();
            }
        }
    }

    const onChangeSelect = (value) => {
        if(value != chapter[0])
        {
            setChapter([value]);
            let index = book.spine.spineById[value];
            renditionView.display(index);
            setVisibleRight(false);
            return false;
        }
        
    }
    
    useEffect(() => {
        touchStartRef.current = touchStart;
        touchEndRef.current = touchEnd;
    });
    useEffect(() => {
        rendition.display(0);
        rendition.on("keyup", keyListener);
        document.addEventListener("keyup", keyListener, false);
        rendition.on("touchstart", onTouchStart);
        document.addEventListener("touchstart",onTouchStart, false);
        rendition.on("touchend", onTouchEnd);
        document.addEventListener("touchend", onTouchEnd, false);
        rendition.on("touchmove", onTouchMove);
        document.addEventListener("touchmove", onTouchMove, false );
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
        setTimeout(() => {
            setrenditionView(rendition);
            book.loaded.navigation.then(function (toc) {    
                let lst_data = [];
                toc.forEach(function (chapter, index) {
                    let obj = { value: chapter.href.replace('#', ''), name: chapter.label };
                    lst_data.push(obj);
                });
                setChapters(lst_data);
            })
        }, 1000);
        
    }, []);
    function closeDetail() {
        setVisibleRight(false);
    }
    return (
        <>
            <div style={{  height: 20}} > 
                <Button style={{ position: 'absolute', right: 10 }} size="large" icon="pi pi-align-justify" className="p-button-rounded p-button-secondary p-button-text"  onClick={() => setVisibleRight(true)} />
            </div>
            <div style={{width: window.innerWidth, height: window.innerHeight - 20, position: 'absolute',zIndex: 1000}}>
                
            </div>
            <div id="viewer" className="spreads"></div>
            <Sidebar className='sidebar-header-none' visible={visibleRight} onHide={() => closeDetail()} position='right'>
                {
                    <>
                        <Button style={{ position: 'absolute', right: 5,  }} size="large" icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-text" aria-label="Cancel" onClick={() => closeDetail()} />
                        <div id='epub-detail'>
                        <ul style={{listStyleType:'none'}}>
                            {chapters.map((item, index) => {
                                return (
                                    <li key={index}
                                        onClick={() => onChangeSelect(item.value)}
                                        className={`mb-20 py-2 flex-row-center ${chapter[0] == item.value ? 'text-0ba' : 'text-white-default'}`}>
                                        {item.name}
                                    </li>
                                )
                            })}
                        </ul>
                        </div>
                       
                        
                    </>
                }
            </Sidebar>
        </>

    );
}
export default browserEpub;