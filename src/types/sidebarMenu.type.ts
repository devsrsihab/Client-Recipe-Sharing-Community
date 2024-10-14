import { ElementType } from "react";

// make menu type with interface
export interface IMenu {
  name: string;
  href: string;
  icon: ElementType;
  current?: boolean;
  children?: IMenu[];
}
