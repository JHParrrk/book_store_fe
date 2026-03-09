import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
  maxWidth: '400px',
  margin: '0 auto',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.borderRadius.default,
  backgroundColor: vars.color.background_light,
});

export const title = style({
  fontSize: vars.fontSize.large,
  fontWeight: 'bold',
  color: vars.color.text,
  textAlign: 'center',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const input = style({
  padding: '12px',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.borderRadius.default,
  fontSize: '14px',
  backgroundColor: vars.color.background_light,
  color: vars.color.text,
  ':focus': {
    borderColor: vars.color.primary,
    outline: 'none',
  },
});

export const errorText = style({
  color: 'red',
  fontSize: '12px',
});

export const submitButton = style({
  padding: '12px',
  backgroundColor: vars.color.primary,
  color: 'white',
  border: 'none',
  borderRadius: vars.borderRadius.default,
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  ':disabled': {
    backgroundColor: vars.color.secondary,
    cursor: 'not-allowed',
  },
});
