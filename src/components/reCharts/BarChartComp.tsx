import { Bar, BarChart } from 'recharts';
import { ChartData } from '../../types/types';

interface BarChartCompProps {
  data: ChartData[];
}

const BarChartComp = ({ data }: BarChartCompProps) => (
  <BarChart
    style={{
      width: '100%',
      maxWidth: '72px',
      maxHeight: '40px',
      aspectRatio: 1.618,
    }}
    responsive
    data={data}
    tabIndex={-1}
  >
    <Bar dataKey="value" barSize={7} fill="currentColor" />
  </BarChart>
);

export default BarChartComp;
