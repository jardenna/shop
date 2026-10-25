import VisuallyHidden from '../../../components/VisuallyHidden';
import { useLanguage } from '../../language/useLanguage';

const KpiTargetTable = () => {
  const { language } = useLanguage();

  return (
    <table className="size-guide-table">
      <VisuallyHidden as="caption">{language.bodyMeasurements}</VisuallyHidden>
      <thead>
        <tr>
          <th scope="col">KPI</th>
          <th scope="col">7 dage</th>
          <th scope="col">30 dage</th>
          <th scope="col">12 måneder</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>Nye kunder</span>
            <span>Antal nye kunder registreret</span>
          </td>
          <td>Number</td>
          <td>Number</td>
          <td>Number</td>
        </tr>
      </tbody>
    </table>
  );
};

export default KpiTargetTable;
