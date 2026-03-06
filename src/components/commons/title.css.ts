import { styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const titleSize = styleVariants({
  large: { fontSize: '2rem' },
  medium: { fontSize: '1.5rem' },
  small: { fontSize: '1rem' },
});

export const titleColor = styleVariants({
  primary: { color: vars.color.primary },
  background: { color: vars.color.background },
  secondary: { color: vars.color.secondary },
  third: { color: vars.color.third },
  border: { color: vars.color.border },
  text: { color: vars.color.text },
  background_light: { color: vars.color.background_light },
});
