export interface Deal {
  id: number;
  name: string;
  categoryId: number;
  desc: string;
  amount: number;
  date: string;
  time: string;
}

export interface DealGroup {
  name: string;
  total: number;
  value: Deal[];
}