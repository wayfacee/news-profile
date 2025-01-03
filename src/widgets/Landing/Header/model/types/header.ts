export interface PathLink {
  path?: string | ((id: string) => string);
  onClick?: () => void;
  isLoading?: boolean;
  label: string;
  authOnly?: boolean;
}

// interface HasPath {
//   label: string;
//   path: string | ((id: string) => string);
//   authOnly?: boolean;
// }

// interface HasOnClick {
//   label: string;
//   onClick: () => void;
//   isLoading?: boolean;
// }

// export type PathLink = HasPath | HasOnClick;
