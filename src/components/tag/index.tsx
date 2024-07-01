import { Tag as TagPrime, TagProps } from "primereact/tag";
const Tag = (props: TagProps)=> {
    return(<TagPrime rounded {...props}   />)
}
export { Tag as default, Tag }