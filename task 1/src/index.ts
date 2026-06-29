import { Library } from "./Library";
import { Book } from "./Book";
import { Member } from "./Member";
import { searchItems, formatId, PremiumMember } from "./utils";

// 1. Create a Library
const library = new Library();

// 2. Add a few books
const book1 = new Book(101, "The Hobbit", "J.R.R. Tolkien");
const book2 = new Book("B102", "1984", "George Orwell");
const book3 = new Book(103, "To Kill a Mockingbird", "Harper Lee");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// 3. Add a few members
const member1 = new Member(1, "Alice");
const member2 = new Member(2, "Bob");

library.addMember(member1);
library.addMember(member2);

// Demonstrate Union Types utility
console.log(`Formatted Member 1 ID: ${formatId(member1.id)}`);
console.log(`Formatted Book 2 ID: ${formatId(book2.id)}`);

// Demonstrate Intersection Types
const premiumAlice: PremiumMember = Object.assign(member1, { membership: "Gold" });
console.log(`Premium Member: ${premiumAlice.name}, Tier: ${premiumAlice.membership}`);

console.log("\nInitial Book List:");
library.displayBooks();

// 4. Borrow a book
console.log(`\nAlice is borrowing '1984'...`);
const borrowSuccess = library.borrowBook(1, "B102");
console.log(`Borrow successful: ${borrowSuccess}`);

console.log("\nBook List after borrowing:");
library.displayBooks();

// 5. Return a book
console.log(`\nAlice is returning '1984'...`);
const returnSuccess = library.returnBook(1, "B102");
console.log(`Return successful: ${returnSuccess}`);

console.log("\nBook List after returning:");
library.displayBooks();

// 6. Search for a book using the generic function
console.log("\nSearching for books containing 'Hobbit' using generic search...");
const searchResults = searchItems(library.books, (book) =>
  book.title.toLowerCase().includes("hobbit")
);
console.log("Search Results:", searchResults);
