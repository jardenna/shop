import Icon from '../../../../components/icons/Icon';
import { BaseKpiCartProps } from './KpiCart';

interface KpiContentProps extends BaseKpiCartProps {
  kpiTotal: number | string;
  changePercentage?: number;
}

const KpiContent = ({
  iconName,
  description,
  title,
  kpiTotal,
  changePercentage,
}: KpiContentProps) => (
  <div className="kpi-content">
    <div className="kpi-icon">
      <Icon iconName={iconName} />
    </div>
    <section>
      <h2 className="kpi-title">{title}</h2>
      <p>
        <span className="kpi-total">{kpiTotal}</span>
        {changePercentage && (
          <span
            className={`changed-percentage ${changePercentage > 0 ? '' : 'down'}`}
          >
            {changePercentage > 0 ? '↑' : '↓'} {changePercentage}%
          </span>
        )}
      </p>
      <p className="kpi-description">{description}</p>
    </section>
  </div>
);

export default KpiContent;
