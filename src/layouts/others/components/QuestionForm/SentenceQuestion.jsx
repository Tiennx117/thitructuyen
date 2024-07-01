/* eslint-disable flowtype/require-valid-file-annotation */
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { BsFlagFill } from "react-icons/bs";
import React, { Component } from 'react';
import '../exam.scss';
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
const randomQuestion = (value) => {

    let arrQuestion = value.sort(function () { return 0.5 - Math.random() });
    return arrQuestion
}
const SentenceQuestion = (props) => {
    //khởi tạo list ban đầu
    // console.log('anwesersleft',props.anwesersleft)
    const { dataSentence, anwesersleft } = props
    const [itemsleft, dataitemsleft] = useState(props.anwesersleft || [])
    const [items, handlers] = useListState([]);
    const offautosb = useSelector(state => state.exam.offautosb);
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
    const randomQuestion = (value) => {
        let arrQuestion = value.sort(function () { return 0.5 - Math.random() });
        return arrQuestion
    }
    useEffect(() => {
        props.onChange(items)
    }, [onDragEnd])
    // useEffect(() => {
    //     if (offautosb == false) {
    //         upDateDataLocal(props.useID,props.nodeId,props.time5s)
    //     }
    // }, [props.time5s])
    useEffect(() => {
        if (props.count == 0) {
            props.onChange(items)
            props.onSubmit('submit')
        }
    }, [onDragEnd])
    // useEffect(() => {
    //     if (props.anwesers) {
    //         let arrSentenceQuestion=Object.assign([],props.anwesers)
    //         handlers.setState([...randomQuestion(arrSentenceQuestion)]);
    //     }
    //     console.log(props.anwesers);
    // }, [props.anwesers])
    useEffect(() => {
        let arrSortQuestion = Object.assign([], props.anwesers)
        handlers.setState([...randomQuestion(arrSortQuestion)]);
    }, [props.anwesers])
    useEffect(() => {
        if (props.anwesers1.length > 0) {
            handlers.setState([...props.anwesers1]);
        }
    }, [props.anwesers1])
    const renderImg = () => {
        if (dataSentence?.InlineImage == "True") {
            if (dataSentence?.AttachedFile == "0") {
                return (
                    <></>
                )
            }
            else {
                const lastThreeCharacters = dataSentence.AttachedFileURL.substr(dataSentence.AttachedFileURL.length - 3);
                if (lastThreeCharacters == 'mp3') {
                    return (
                        <>
                            <audio controls>
                                <source src={dataSentence.AttachedFileURL} type="audio/mpeg" />
                            </audio>
                        </>
                    )
                }
                else {
                    return (
                        <>
                            {dataSentence.AttachedFileURL.indexOf('mp4') > 0 ?
                                <div className="col-md-4" style={{ width: '380px', height: '200px', paddingLeft: '0px', paddingRight: '0px', cursor: 'pointer' }} onClick={() => openVideo()}>
                                    <ReactPlayer
                                        // https://10.0.0.120:3001/WCR/WCRGlobalBank/10752/10752.mp4
                                        url={dataSentence.AttachedFileURL}
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
                                <div> <ImagePreview width={270} height={170} preview src={dataSentence.AttachedFileURL} /></div>
                            }

                        </>
                    )
                }
            }

        }
        else {
            return (
                <>
                    <div> <a style={{ cursor: 'pointer' }} onClick={() => window.open(dataSentence.AttachedFileURL)}>{dataSentence.AttachedFile} </a></div>
                </>
            )
        }

    }
    const { overflow, rounded, borderWidth, cursor, ...rest } = props;
    const convertDataSentence = (anwesers, anwesers1) => {
        let arr = Object.assign([], anwesers1)
        //let arr = [...anwesers1]
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < anwesers.length; j++) {
                if (arr[i].VC_CHC_TXT == anwesers[j].VC_CHC_TXT) {
                    arr[i].VC_CRRCT_MTCH = anwesers[j].VC_CRRCT_MTCH
                    arr[i].NM_ANSWR_ID = anwesers[j].NM_ANSWR_ID
                }
            }
        }
        return arr
    }


    return (<>
        <div className="overflow-y-auto card-body" style={{ height: 'calc(100vh - 330px)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}> Câu&nbsp;{(props.oder)}:&nbsp;</div>
            <p dangerouslySetInnerHTML={{ __html: props.title }}></p>
            {dataSentence.Attachment == "True" && renderImg()}
            <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                    {anwesersleft?.map((item, index) => (
                        <div index={index} style={{ backgroundColor: 'rgb(221, 221, 221)', padding: '8px', border: '1px soid black' }}>
                            <div className="question-type5">
                                <div dangerouslySetInnerHTML={{ __html: item.VC_CHC_TXT }}></div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="p-2 bd-highlight">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(droppableProvided, droppableSnapshot) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                    style={getListStyle(droppableSnapshot.isDraggingOver)}
                                >
                                    {items?.map((item, index) => (
                                        <Draggable key={item.NM_ANSWR_ID} draggableId={item.NM_ANSWR_ID.toString()} index={index}>
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
                                                    <div dangerouslySetInnerHTML={{ __html: item.VC_CRRCT_MTCH }}></div>
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
            </div>

        </div>
    </>)

}
SentenceQuestion.propTypes = {
    title: PropTypes.string,
    anwesers: PropTypes.array,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};
SentenceQuestion.defaultProps = {
    onChange: () => { },
    onSubmit: () => { },
}
export default SentenceQuestion;
