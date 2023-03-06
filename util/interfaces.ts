export interface manga {
  _id: string;
  title: string;
  image: string;
  views: number;
  rate: number;
  category: Icategory[];
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
