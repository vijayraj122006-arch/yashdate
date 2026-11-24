import type { PlatformType } from '../types';

export const detectPlatform = (url: string): PlatformType => {
  const lower = url.toLowerCase();
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'instagram';
  if (lower.includes('linkedin.com')) return 'linkedin';
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
  if (lower.includes('github.com')) return 'github';
  if (lower.includes('tiktok.com')) return 'tiktok';
  if (lower.startsWith('http://') || lower.startsWith('https://')) return 'website';
  return 'other';
};

export const getPlatformMeta = (platform: PlatformType) => {
  switch (platform) {
    case 'instagram':
      return {
        name: 'Instagram',
        badgeBg: 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500',
        textColor: 'text-pink-400',
        borderColor: 'border-pink-500/30',
        cardBg: 'bg-pink-950/20',
        iconName: 'instagram',
        placeholder: 'https://instagram.com/username',
      };
    case 'linkedin':
      return {
        name: 'LinkedIn',
        badgeBg: 'bg-blue-600',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/30',
        cardBg: 'bg-blue-950/20',
        iconName: 'linkedin',
        placeholder: 'https://linkedin.com/in/username',
      };
    case 'twitter':
      return {
        name: 'X (Twitter)',
        badgeBg: 'bg-slate-700',
        textColor: 'text-slate-200',
        borderColor: 'border-slate-500/30',
        cardBg: 'bg-slate-900/50',
        iconName: 'twitter',
        placeholder: 'https://x.com/username',
      };
    case 'github':
      return {
        name: 'GitHub',
        badgeBg: 'bg-zinc-800',
        textColor: 'text-zinc-200',
        borderColor: 'border-zinc-500/30',
        cardBg: 'bg-zinc-900/50',
        iconName: 'github',
        placeholder: 'https://github.com/username',
      };
    case 'tiktok':
      return {
        name: 'TikTok',
        badgeBg: 'bg-cyan-600',
        textColor: 'text-cyan-400',
        borderColor: 'border-cyan-500/30',
        cardBg: 'bg-cyan-950/20',
        iconName: 'tiktok',
        placeholder: 'https://tiktok.com/@username',
      };
    default:
      return {
        name: 'Web Profile / Portfolio',
        badgeBg: 'bg-indigo-600',
        textColor: 'text-indigo-400',
        borderColor: 'border-indigo-500/30',
        cardBg: 'bg-indigo-950/20',
        iconName: 'globe',
        placeholder: 'https://portfolio-or-site.com',
      };
  }
};
