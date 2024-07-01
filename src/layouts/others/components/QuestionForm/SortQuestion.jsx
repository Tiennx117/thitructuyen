/* eslint-disable flowtype/require-valid-file-annotation */
import { useEffect } from 'react'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { BsFlagFill } from "react-icons/bs";
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { upDateDataLocal } from "../upDateLocalTime";
import { useSelector, useDispatch } from 'react-redux';
import { useListState } from "shared/hooks/useListState";
import Image, { ImagePreview } from "components/Image";
import ReactPlayer from 'react-player';
// fake data generator
const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `id-${k + 1}`,
        content: `Câu trả lời ${k + 1}`,
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#ccc' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '#ddd',
    padding: grid,
    width: 250,
});
const SortQuestion = (props) => {
    //khởi tạo list ban đầu
    const { dataSort } = props
    const [items, handlers] = useListState([]);
    const offautosb = useSelector(state => state.exam.offautosb);
    const randomQuestion = (value) => {
        let arrQuestion = value.sort(function () { return 0.5 - Math.random() });
        return arrQuestion
    }
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        };
        // hook reorder list state: handlers.reorder({ from: 2, to: 0 });
        handlers.reorder({
            from: result.source.index,
            to: result.destination.index,
        });
    }
    useEffect(() => {

        props.onchange(updateSort(items))
    }, [onDragEnd])
    useEffect(() => {
        if (props.count == 0) {
            props.onchange(updateSort(items))
            props.onSubmit('submit')
        }
    }, [onDragEnd])
    // useEffect(() => {
    //     if (offautosb == false) {
    //         upDateDataLocal(props.useID,props.nodeId,props.time5s)
    //     }
    // }, [props.time5s])
    useEffect(() => {
        console.log('anwesers', props.anwesers)
        let arrSortQuestion = Object.assign([], props.anwesers)
        handlers.setState([...randomQuestion(arrSortQuestion)]);
    }, [props.anwesers])
    useEffect(() => {
        if (props.anwesers1.length > 0) {
            console.log('anwesers1', props.anwesers1)
            handlers.setState([...props.anwesers1]);
        }
    }, [props.anwesers1])
    function updateSort(item) {
        let arr = []
        for (let i = 0; i < item.length; i++) {
            arr.push(item[i].NM_OBJCT_ID)
        }
        let text = arr.join("~");
        return text
    }
    const renderImg = () => {
        if (dataSort?.InlineImage == "True") {
            if (dataSort?.AttachedFile == "0") {
                return (
                    <></>
                )
            }
            else {
                const lastThreeCharacters = dataSort.AttachedFileURL.substr(dataSort.AttachedFileURL.length - 3);
                if (lastThreeCharacters == 'mp3') {
                    return (
                        <>
                            <audio controls>
                                <source src={dataSort.AttachedFileURL} type="audio/mpeg" />
                            </audio>
                        </>
                    )
                }
                else {
                    return (
                        <>
                            {dataSort.AttachedFileURL.indexOf('mp4') > 0 ?
                                <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={dataSort.AttachedFileURL}
                                        width='100%'
                                        height='100%'
                                        pip={true}
                                        playing={true}
                                        controls={true}
                                        loop={true}
                                        volume={true}
                                        muted={false}>
                                    </ReactPlayer>

                                </div>
                                :
                                <div> <ImagePreview width={270} height={170} preview src={dataSort.AttachedFileURL}></ImagePreview></div>
                            }

                        </>
                    )
                }
            }

        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(dataSort.AttachedFileURL)}>{dataSort.AttachedFile} </a></div>
                </>
            )
        }

    }
    const { overflow, rounded, borderWidth, cursor, ...rest } = props;
    return (<>
        {/* <div className="card">
        <div className="question-title card-header bg-transparent">
            <div className="media align-items-center">
                <div className="question-form media-left">
                    <span class="badge bg-secondary">Trình tự đối tượng</span>
                </div>
                <div className="media-body">

                </div>
                <div className="media-right" style={{ float: 'right' }}>
                    <span>Điểm:&nbsp;2</span>&nbsp;&nbsp;<BsFlagFill />
                </div>
            </div>
        </div> */}
        <div className="overflow-y-auto card-body" style={{ height: 'calc(100vh - 330px)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{(props.oder)}:&nbsp;</div>
            <p dangerouslySetInnerHTML={{ __html: props.title }}></p>
            {dataSort.Attachment == "True" && renderImg()}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(droppableProvided, droppableSnapshot) => (
                        <div
                            ref={droppableProvided.innerRef}
                            style={getListStyle(droppableSnapshot.isDraggingOver)}
                        >
                            {items?.map((item, index) => (
                                <Draggable key={item.NM_OBJCT_ID} draggableId={item.NM_OBJCT_ID.toString()} index={index}>
                                    {(draggableProvided, draggableSnapshot) => (
                                        <div
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                            style={getItemStyle(
                                                draggableSnapshot.isDragging,
                                                draggableProvided.draggableProps.style,
                                            )}
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: item.VC_OBJCT_VL }}></div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* <Button label='Gửi' className='mt-3' style={{ width: '100px' }} onClick={() => {
                    //console.log(items);
                }}></Button> */}
            </DragDropContext>
        </div>
        {/* </div> */}
    </>)

}
SortQuestion.propTypes = {
    title: PropTypes.string,
    anwesers: PropTypes.array,
    onSubmit: PropTypes.func,
    onchange: PropTypes.func
};
SortQuestion.defaultProps = {
    onSubmit: () => { },
    onchange: () => { }
}
export default SortQuestion;