export interface Deal {
  id: number;
  name: string;
  desc: string;
  amount: number;
  categoryId: number;
  date: string;
  time: string;
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