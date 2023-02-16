// declare global {
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
// [计] 可变址的；[计] 可加索引的
declare type Indexable<T = any> = {
  [key: string]: T;
};
declare type Nullable<T> = T | null;

declare interface ViteEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
// }
