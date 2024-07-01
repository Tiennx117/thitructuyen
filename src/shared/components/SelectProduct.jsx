import { useState, useEffect, useRef   } from "react";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from 'primereact/skeleton';
import productService from "services/productService";
import { pagingDefaults } from "shared/utils/appState";
import { mapPaginator } from 'shared/utils';
const SelectProduct = ()=>{
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedItem2, setSelectedItem2] = useState(null);
    let loadLazyTimeout = useRef(null);
    const onLazyLoad = (event) => {
        console.log('onLazyLoad', event);
        setLazyLoading(true);
        
        let advanceSearch = mapPaginator(pagingDefaults);
        //advanceSearch.key_search = 
        productService.filterPage(advanceSearch).then(res=>{
            console.log('products', res);
            setLazyItems(res.data.data);
        })

        // if (loadLazyTimeout) {
        //     clearTimeout(loadLazyTimeout);
        // }

        // //imitate delay of a backend call
        // loadLazyTimeout = setTimeout(() => {
        //     const { first, last } = event;
        //     const _lazyItems = [...lazyItems];

        //     for (let i = first; i < last; i++) {
        //         _lazyItems[i] = { label: `Item #${i}`, value: i };
        //     }

        //     setLazyItems(_lazyItems);
        //     setLazyLoading(false);
        // }, Math.random() * 1000 + 250);
    }
    const onLazyItemChange = (e) => {
        setSelectedItem2(e.value)
    }
    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }));
        setLazyLoading(false);
    },[]); 

    return(
        <Dropdown filter showClear onFilter={(e)=>console.log(e)} filterBy="name" value={selectedItem2} options={lazyItems} onChange={onLazyItemChange} virtualScrollerOptions={{ lazy: true, onLazyLoad: onLazyLoad, itemSize: 38, showLoader: true, loading: lazyLoading, delay: 250, loadingTemplate: (options) => {
            return (
                <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                    <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                </div>
            )}
        }} placeholder="Select Item"/>
    )
}
export { SelectProduct as default, SelectProduct }