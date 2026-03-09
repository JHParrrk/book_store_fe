import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('html, body, #root', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  minHeight: '100%',
});

globalStyle('*', {
  boxSizing: 'inherit',
});
