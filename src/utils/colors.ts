import { FieldColor } from '../types';

export function getTextColorClass(color?: FieldColor, isDark?: boolean) {
  switch (color) {
    case 'blue': return 'text-blue-500';
    case 'red': return 'text-red-500';
    case 'purple': return 'text-purple-500';
    default: return isDark ? 'text-white' : 'text-gray-900';
  }
}

export const colorOptions = [
  { value: 'blue' as const, label: 'Azul - Estado atual', bgClass: 'bg-blue-500' },
  { value: 'red' as const, label: 'Vermelho - Gaps', bgClass: 'bg-red-500' },
  { value: 'purple' as const, label: 'Roxo - Insights para os Gaps', bgClass: 'bg-purple-500' }
] as const;