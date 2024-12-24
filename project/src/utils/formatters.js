import { formatDistanceToNow, parseISO } from 'date-fns';

export function formatDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const parts = [];
  
  if (hours) parts.push(hours.padStart(2, '0'));
  parts.push(minutes ? minutes.padStart(2, '0') : '00');
  parts.push(seconds ? seconds.padStart(2, '0') : '00');

  return parts.join(':');
}

export function formatViews(count) {
  const num = parseInt(count);
  if (isNaN(num)) return '0';
  
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatPublishDate(dateString) {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return 'Unknown date';
  }
}