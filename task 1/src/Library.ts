import { Book } from "./Book";
import { Member } from "./Member";
import { searchItems } from "./utils";

export class Library {
  public books: Book[] = [];
  public members: Member[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  addMember(member: Member): void {
    this.members.push(member);
  }

  searchBook(predicate: (book: Book) => boolean): Book[] {
    return searchItems(this.books, predicate);
  }

  borrowBook(memberId: string | number, bookId: string | number): boolean {
    const member = this.members.find(m => m.id === memberId);
    const book = this.books.find(b => b.id === bookId);

    if (member && book) {
      return member.borrowBook(book);
    }
    return false;
  }

  returnBook(memberId: string | number, bookId: string | number): boolean {
    const member = this.members.find(m => m.id === memberId);
    const book = this.books.find(b => b.id === bookId);

    if (member && book) {
      return member.returnBook(book);
    }
    return false;
  }

  displayBooks(): void {
    console.log("--- Library Books ---");
    this.books.forEach(book => {
      console.log(
        `[${book.id}] "${book.title}" by ${book.author} - ${
          book.available ? "Available" : "Borrowed"
        }`
      );
    });
    console.log("----------------------");
  }
}
