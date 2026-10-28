import { Bar, BarChart } from 'recharts';
import { KpiChartData } from '../../features/dashboard/apiTypes';

interface BarChartComp {
  data: KpiChartData[];
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
