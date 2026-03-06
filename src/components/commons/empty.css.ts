import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  padding: '120px 0',
});

export const emptyIcon = style({
  fontSize: '4rem',
  fill: '#ccc',
});
