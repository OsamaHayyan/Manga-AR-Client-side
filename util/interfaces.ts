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
