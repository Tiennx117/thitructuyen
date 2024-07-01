import { formatTime } from 'shared/hooks/useCurrentUserDefault';
const Duration = ({ className, seconds }) => {        
    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={className}>
            {formatTime(seconds)}
        </time>
    )
}

export default Duration;