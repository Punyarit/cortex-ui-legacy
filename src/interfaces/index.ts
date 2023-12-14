export interface SideMenu {
  name: string;
  path: string;
  icon: string;
  service?: string;
  active?: string[];
  disabled?: boolean;
  pageTitle?: string;
  isNotice?: boolean;
  scope?: string;
}

export * from './options';

// medicaition list
export interface Type {
  id: string;
  value: string;
  display: string;
}

export interface ProfileConfig {
  header: boolean;
  seeMore: boolean;
  seeAll: boolean;
  mapHn: boolean;
  uploadPhoto: boolean;
  fitContent: boolean;
  preferredAction: boolean;
}

export interface ProfileInfoConfig {
  title: string;
  desc: string;
  line: string;
}

export type SortStatusType = 'inactive' | 'descending' | 'ascending';
