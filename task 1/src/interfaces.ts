export interface Borrowable {
  id: string | number;
  title: string;
  available: boolean;
  borrow(): boolean;
  returnBook(): void;
}
