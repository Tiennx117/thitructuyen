import { Card } from 'primereact/card';
import GaugeChart from 'react-gauge-chart';

const GaugeChartDemo = () => {
  return (<Card>
    <GaugeChart id="gauge-chart2"
      nrOfLevels={20}
      percent={0.86}
    />
  </Card>)
}
export default GaugeChartDemo;