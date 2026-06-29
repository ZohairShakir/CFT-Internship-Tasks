import { Book } from "./Book";

export class Member {
  public borrowedBooks: Book[] = [];

  constructor(
    public id: string | number,
    public name: string
  ) {}

  borrowBook(book: Book): boolean {
    if (book.borrow()) {
      this.borrowedBooks.push(book);
      return true;
    }
    return false;
  }

  returnBook(book: Book): boolean {
    const index = this.borrowedBooks.indexOf(book);
    if (index !== -1) {
      book.returnBook();
      this.borrowedBooks.splice(index, 1);
      return true;
    }
    return false;
  }
}
