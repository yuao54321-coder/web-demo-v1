import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 格式化价格
export function formatPrice(price) {
  return price.toLocaleString('zh-CN');
}

// 获取标签颜色类
export function getTagColorClass(tag) {
  if (tag.includes('历史低价') || tag.includes('尾单') || tag.includes('闪购')) {
    return 'bg-red-100 text-red-700 border-red-200';
  }
  if (tag.includes('便宜') || tag.includes('含行李') || tag.includes('可退改')) {
    return 'bg-green-100 text-green-700 border-green-200';
  }
  if (tag.includes('暗号') || tag.includes('限时')) {
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  }
  if (tag.includes('早鸟') || tag.includes('30天') || tag.includes('7天')) {
    return 'bg-blue-100 text-blue-700 border-blue-200';
  }
  return 'bg-gray-100 text-gray-700 border-gray-200';
}

// 获取来源标签颜色
export function getSourceColorClass(sourceType) {
  switch (sourceType) {
    case 'platform':
      return 'text-orange-600 bg-orange-50';
    case 'code':
      return 'text-yellow-600 bg-yellow-50';
    case 'lastMinute':
      return 'text-red-600 bg-red-50';
    case 'student':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// 国家emoji映射
export const countryEmoji = {
  '日本': '🇯🇵',
  '泰国': '🇹🇭',
  '韩国': '🇰🇷',
  '马来西亚': '🇲🇾',
  '新加坡': '🇸🇬',
  '越南': '🇻🇳',
  '菲律宾': '🇵🇭',
  '印度尼西亚': '🇮🇩',
  '中国': '🇨🇳',
};
