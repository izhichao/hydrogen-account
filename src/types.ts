export interface Account {
  id: number;
  name: string;
  amount: number;
}

export interface BaseCategory {
  id: number;
  name: string;
}

export interface Category extends BaseCategory {
  desc: string;
}

export interface PieChart {
  name: string;
  value: number;
}
export interface Show {
  category: boolean;
  day: boolean;
  month: boolean;
  year: boolean;
}

export interface BaseDeal {
  id: number;
  desc: string;
  amount: number;
  categoryId: number;
  date: string;
  time: string;
}

export interface Deal extends BaseDeal {
  name?: string
}

export interface DealStats {
  id: number;
  name: string;
  desc: string;
  amount: number;
}

export interface DealGroup {
  name: string;
  total: number;
  value: Deal[];
}