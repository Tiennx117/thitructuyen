import { RenderCounter } from "components/rendercounter";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useListState } from "shared/hooks/useListState";


const DemoHookListSate = () => {
    const [values, handlers] = useListState([]);
    const append = () => handlers.append({ title: 'new task' });
    const remove = (index) => {
        handlers.remove(index);
    }
    const setItem = (index, item) => {
        handlers.setItem(index, { ...item, title: 'test' });
    }
    const complete = (index, item) => {
        handlers.setItem(index, {...item, status: true});
    }

    return (<>
        <Card>
            <RenderCounter label='example-list' />
            
                <Button onClick={append} >Add</Button>
          
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">task</th>
                        <th scope="col">status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((item, index) => {
                        return (<tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {item.title}
                            </td>
                            <td>
                                {item.status?.toString()}
                            </td>
                            <td>
                                <Button onClick={() => setItem(index, item)}>Update</Button>
                                <Button className="ml-2" onClick={() => complete(index, item)}>Complete</Button>
                                <Button className="ml-2" onClick={() => remove(index)}>Remove</Button>
                            </td>

                        </tr>)
                    })}
                </tbody>
            </table>

        </Card>

    </>)
}
export default DemoHookListSate;