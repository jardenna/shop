import { DashboardPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';

interface KpiCartPopupProps {
  period: DashboardPeriod;
}

const KpiCartPopup = ({ period }: KpiCartPopupProps) => {
  console.log(145);

  return (
    <section>
      {period}
      <h3>Sammenligning med forrige periode</h3>
      Forrige 7 dage 11 kunder Seneste 7 dage 21 kunder Ændring +10
    </section>
  );
};

export default KpiCartPopup;
