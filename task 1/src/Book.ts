import { Borrowable } from "./interfaces";

export class Book implements Borrowable {
  constructor(
    public id: string | number,
    public title: string,
    public author: string,
    public available: boolean = true
  ) {}

  borrow(): boolean {
    if (this.available) {
      this.available = false;
      return true;
    }
    return false;
  }

  returnBook(): void {
    this.available = true;
  }
}
