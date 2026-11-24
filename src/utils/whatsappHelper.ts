export function cleanPhoneNumber(phone?: string): string {
  if (!phone) return '919487548740';
  const digits = phone.replace(/[^\d]/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

export function createVouchWhatsAppUrl(phone: string | undefined, friendName: string, description: string): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yashdate.vercel.app';
  const text = `Hey Yash! ${friendName} just posted a new vouch for you on YashDate:\n\n"${description}"\n\nCheck it out here: ${baseUrl}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function createMatchWhatsAppUrl(
  phone: string | undefined,
  friendName: string,
  candidateName: string,
  platform: string,
  link: string,
  pitchNote?: string
): string {
  const cleanPhone = cleanPhoneNumber(phone);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yashdate.vercel.app';
  const noteSnippet = pitchNote ? `\nWhy you two would vibe: "${pitchNote}"` : '';
  const text = `Hey Yash! ${friendName} just scouted a prospective match for you on YashDate!\n\nCandidate: ${candidateName} (${platform})\nProfile Link: ${link}${noteSnippet}\n\nReview it in your matches on YashDate: ${baseUrl}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
