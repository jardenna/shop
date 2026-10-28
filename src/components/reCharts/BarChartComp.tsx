import { Bar, BarChart } from 'recharts';
import { KpiChartData } from '../../features/dashboard/apiTypes';

interface BarChartComp {
  data: KpiChartData[];
}

const BarChartComp = ({ data }: BarChartComp) => {
  console.log(data);

  return (
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
      <Bar dataKey="value" barSize={7} fill="#40b64a" />
    </BarChart>
  );
};

export default BarChartComp;
