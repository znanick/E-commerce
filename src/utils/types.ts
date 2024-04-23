export type SysType = {
  id: string;
};

export type FileType = {
  url: string;
  defaultSource?: number;
};

export type PhotoType = {
  sys: SysType;
  title: string;
  file: FileType;
};
