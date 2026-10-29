import { Bar, BarChart } from 'recharts';
import { ChartData } from '../../types/types';

interface BarChartComp {
  data: ChartData[];
}

const BarChartComp = ({ data }: BarChartComp) => (
  <BarChart
    style={{
      width: '100%',
      maxWidth: '72px',
      maxHeight: '40px',
      aspectRatio: 1.618,
    }}
    responsive
    data={data}
  >
    <Bar dataKey="value" barSize={7} fill="currentColor" />
  </BarChart>
);

export default BarChartComp;
