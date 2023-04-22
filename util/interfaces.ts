export interface manga {
  _id: string;
  title: string;
  image: string;
  views: number;
  rate: number;
  category: Icategory[];
  story?: string;
  banner?: string | null;
  status?: string;
  date?: string | null;
  auther?: auther[];
  chapters: chapter[];
}
export interface recommendations {
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

export interface auther {
  _id: string;
  autherName: string;
  autherManga?: manga[];
}
export interface ImangaAll {
  mangaData: manga[];
  mangaPages: number;
}

export interface Icategory {
  _id: string;
  category: string;
  catManga?: string[];
}

export type IcategoryAll = Icategory[];
