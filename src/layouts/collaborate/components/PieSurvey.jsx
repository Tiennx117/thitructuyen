import React, { useState, useEffect} from 'react';
import { Chart } from 'primereact/chart';
import PropTypes from 'prop-types';
const PieSurvey = (props)=>{
    const [chartData, setChartData] = useState({
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: props.colors,
                // hoverBackgroundColor: [
                //     "#64B5F6",
                //     "#81C784",
                //     "#FFB74D"
                // ]
            }
        ]
    });

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });
    useEffect(()=>{
        setChartData({
            labels: props.labels,
            datasets: [
                {
                    data: props.data,
                    backgroundColor: props.colors,
                }
            ]
        });
    },[props.labels, props.data, props.colors])
    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
        </div>
    )
}
PieSurvey.propTypes = {
    
    labels: PropTypes.array,
    data: PropTypes.array,
    colors: PropTypes.array,
};
export default PieSurvey;