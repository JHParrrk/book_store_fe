import "styled-components";
import { Theme } from '@/styles/theme.css';

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
