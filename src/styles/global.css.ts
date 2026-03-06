import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

globalStyle('*', {
  boxSizing: 'inherit',
});
