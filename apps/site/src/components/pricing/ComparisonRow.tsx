import { useTranslation } from '@pavy/i18n';
import { FeatureRow } from '../../lib/pricing-data';
import { Check, X } from 'lucide-react';

interface ComparisonRowProps {
  feature: FeatureRow;
}

export default function ComparisonRow({ feature }: ComparisonRowProps) {
  const { t } = useTranslation('site');

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-slate-300 mx-auto" />
      );
    }
    return <span className="text-slate-700 font-medium text-sm">{t(value)}</span>;
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4 px-6 py-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
      <div className="col-span-1 flex items-center mb-2 lg:mb-0">
        <span className="text-sm font-medium text-slate-700">{t(feature.nameKey)}</span>
      </div>
      <div className="lg:col-span-3 grid grid-cols-3 gap-4 text-center items-center">
        <div>{renderValue(feature.free)}</div>
        <div>{renderValue(feature.pro)}</div>
        <div>{renderValue(feature.enterprise)}</div>
      </div>
    </div>
  );
}
