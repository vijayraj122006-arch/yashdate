import type { PlatformType } from '../types';

export const detectPlatform = (url: string): PlatformType => {
  const lower = url.toLowerCase();
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'instagram';
  if (lower.includes('linkedin.com')) return 'linkedin';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
  if (lower.startsWith('http://') || lower.startsWith('https://')) return 'website';
  return 'other';
};

export const getPlatformMeta = (platform: PlatformType) => {
  switch (platform) {
    case 'instagram':
      return {
        name: 'Instagram',
        badgeBg: 'bg-rose-600',
        textColor: 'text-rose-400',
        borderColor: 'border-rose-500/30',
      };
    case 'linkedin':
      return {
        name: 'LinkedIn',
        badgeBg: 'bg-blue-600',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/30',
      };
    case 'twitter':
      return {
        name: 'X (Twitter)',
        badgeBg: 'bg-slate-700',
        textColor: 'text-slate-200',
        borderColor: 'border-slate-500/30',
      };
    default:
      return {
        name: 'Website',
        badgeBg: 'bg-indigo-600',
        textColor: 'text-indigo-400',
        borderColor: 'border-indigo-500/30',
      };
  }
};
