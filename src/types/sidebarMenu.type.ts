// make menu type with interface
export interface IMenu {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
  children?: IMenu[];
}
