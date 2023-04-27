export interface mangaType {
  _id: string;
  title: string;
  image: string;
  views: number;
  rate: number;
  category: categoryType[];
  story?: string;
  banner?: string | null;
  status?: string;
  date?: string | null;
  auther?: autherType[];
  chapters: chapter[];
}
export interface recommendationsType {
  _id: string;
  title: string;
  image: string;
}

export interface searchMangaType {
  _id: string;
  title: string;
  image: string;
}

export interface chapter {
  chapterNum: string;
  name: string;
  chapter?: string[];
  views: number;
  date: string;
  _id: string;
}

export interface autherType {
  _id: string;
  autherName: string;
  autherManga?: mangaType[];
}
export interface ImangaAll {
  mangaData: mangaType[];
  mangaPages: number;
}

export interface userType {
  admin: boolean;
  username: string;
  image: string;
  email: string;
  superuser: boolean;
  userId: string;
}

export interface categoryType {
  _id: string;
  category: string;
  catManga?: string[];
}

export type IcategoryAll = categoryType[];
