import {useAxiosHandler} from "hooks/useAxiosHandler";
import { Button } from "primereact/button";
import { useEffect } from "react";

const DemoCancelRequest = () => {
    let bodyStr = '{"WebAppFlag":"W","filterBy":0,"assignedFilterBy":"","pageNumber":1,"pageSize":10,"searchBy":"","sortBy":"RECENT","statusBy":"A","Culture":"vi-VN","CorporateId":1,"UserId":43096,"TimeZoneValue":"SE Asia Standard Time","EmailId":"learner1@eps.lms.com","UserRoles":[],"AccessibleCategories":[{"mnCategoryId":1,"mnParentCategoryId":0,"mbIsRootLevel":true,"mstrCategoryName":"Public","mbIsEnabled":true}],"UserRoleId":"3"}'
    let body = JSON.parse(bodyStr);
    const { data, loading, handlers } = useAxiosHandler();
    //console.log('loading',loading)
    const onStop = ()=>{
        handlers.onCancel();
    }
    const onRequest = ()=>{
        handlers.post('/AppService/api/v2/learning/getmylearnings', body);
        console.log(data);
    }
    useEffect(()=>{
        handlers.post('/AppService/api/v2/learning/getmylearnings', body);
    },[])
    return (<>
        <div className="d-flex flex-row">
            <ul className="flex-1">
                <li className="cursor-pointer mb-2"> Câu 1</li>
                <li className="cursor-pointer mb-2"> Câu 2</li>
                <li className="cursor-pointer mb-2"> Câu 3</li>
                <li className="cursor-pointer mb-2"> Câu 4</li>
                <li className="cursor-pointer mb-2"> Câu 5</li>
            </ul>
            <div className="flex-3">
            loading: {loading?.toString()}<br/>
            {data?.LearningCompletedItems?.length}
            <br/>
                <Button className="ml-2" onClick={onRequest}>Request</Button>
                <Button className="ml-2" onClick={onStop}>Stop</Button>
            </div>
        </div>

    </>)
}
export default DemoCancelRequest;