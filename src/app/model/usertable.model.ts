export interface Site {
  sid: string;
  url: string;
}

export interface UserTable {
  catId: string;
  sites: Site[];
}
