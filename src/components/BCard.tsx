import { memo } from 'react'
import { classNames } from 'primereact/utils';

interface PropsBCard extends React.HTMLAttributes<HTMLDivElement>{
    title: string;
    subtitle: string;
    children: JSX.Element;
  }
const BCardLocal = (props: PropsBCard) => {
    return (
        <div className={classNames('p-card', props.className)}>
            <div className="card-body">
                {props.title ? <h5 className="card-title">{props.title}</h5>:null} 
                {props.subtitle ? <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>:null} 
                
                {props.children}
            </div>
        </div>

    )
}
const BCard = memo(BCardLocal);
export { BCard }
