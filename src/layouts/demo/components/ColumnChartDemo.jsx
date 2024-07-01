import { Card } from 'primereact/card';
import Chart from 'react-apexcharts'
const ColumnChartDemo = ()=>{
    const colors = ['#26A0FC','#26E7A6','#FEBC3B']
    const options = {
        series: [{
        data: [21, 22, 10]
      }],
        chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
      };
    return(<>
    <Card>
        <Chart options={options} series={options.series} type="bar" width={500} />
      </Card>
    </>)
}
export default ColumnChartDemo