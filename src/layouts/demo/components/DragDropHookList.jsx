import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useListState } from "shared/hooks/useListState";
// fake data generator
const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `id-${k+1}`,
        content: `Câu trả lời ${k+1}`,
    }));

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

const DragDropHookList = ()=>{
    //khởi tạo list ban đầu
    const [items, handlers] = useListState(getItems(5));
    const onDragEnd=(result)=> {
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
    
    return(<>
        <Card title='DragDrop hook list state'>

            <div className='d-flex flex-column'>
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                        {(droppableProvided, droppableSnapshot) => (
                            <div
                                ref={droppableProvided.innerRef}
                                style={getListStyle(droppableSnapshot.isDraggingOver)}
                            >
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Button label='Gửi' className='mt-3' style={{ width: '100px' }} onClick={() => {
                    console.log(items);
                }}></Button>
            </DragDropContext>
            </div>
        </Card>
    </>)

}
export default DragDropHookList;
