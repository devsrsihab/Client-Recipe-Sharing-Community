import { ThemeProviderProps } from "next-themes/dist/types";
import { ReactNode } from "react";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}
