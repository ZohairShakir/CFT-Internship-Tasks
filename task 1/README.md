# Library Management System

A small **Library Management System** built with **TypeScript**, demonstrating core Object-Oriented Programming (OOP) concepts including classes, interfaces, generics, union types, and intersection types.

---

## Features

- **Add Books & Members** — Register books and library members
- **Borrow & Return Books** — Track which member has borrowed which book
- **Availability Tracking** — Books automatically update their status when borrowed or returned
- **Generic Search** — Search books (or any collection) using a flexible generic utility function
- **Union Types** — Flexible ID system supporting both `string` and `number` IDs
- **Intersection Types** — Extend `Member` into a `PremiumMember` with additional membership data
- **Interface-driven Design** — `Book` implements the `Borrowable` interface for extensibility

---

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Language |
| Node.js | Runtime |
| tsc | TypeScript compiler |

---

## Getting Started

### Prerequisites

- **Node.js** v16+
- **npm** v8+

### Installation

```bash
# Navigate into the project directory
cd "task 1"

# Install dependencies
npm install
```

### Build & Run

```bash
# Compile TypeScript and run
npm start
```

This runs `tsc && node dist/index.js` — it compiles the TypeScript source into `dist/` and then executes it.

To compile only (without running):

```bash
npm run build
```

### Expected Output

```
Formatted Member 1 ID: ID-1
Formatted Book 2 ID: ID-B102
Premium Member: Alice, Tier: Gold

Initial Book List:
--- Library Books ---
[101] "The Hobbit" by J.R.R. Tolkien - Available
[B102] "1984" by George Orwell - Available
[103] "To Kill a Mockingbird" by Harper Lee - Available
----------------------

Alice is borrowing '1984'...
Borrow successful: true

Book List after borrowing:
--- Library Books ---
[101] "The Hobbit" by J.R.R. Tolkien - Available
[B102] "1984" by George Orwell - Borrowed
[103] "To Kill a Mockingbird" by Harper Lee - Available
----------------------

Alice is returning '1984'...
Return successful: true

Book List after returning:
--- Library Books ---
[101] "The Hobbit" by J.R.R. Tolkien - Available
[B102] "1984" by George Orwell - Available
[103] "To Kill a Mockingbird" by Harper Lee - Available
----------------------

Searching for books containing 'Hobbit' using generic search...
Search Results: [ Book { id: 101, title: 'The Hobbit', author: 'J.R.R. Tolkien', available: true } ]
```

---

## Project Structure

```
task 1/
├── src/
│   ├── interfaces.ts   # Borrowable interface
│   ├── Book.ts         # Book class (implements Borrowable)
│   ├── Member.ts       # Member class (borrow/return logic)
│   ├── Library.ts      # Library class (manages books & members)
│   ├── utils.ts        # Generic search, union types, intersection types
│   └── index.ts        # Entry point / demo script
├── package.json
└── tsconfig.json
```

---

## Key Concepts Demonstrated

### Interface — `Borrowable`
Defines the contract that any borrowable item must satisfy:
```ts
export interface Borrowable {
  id: string | number;
  title: string;
  available: boolean;
  borrow(): boolean;
  returnBook(): void;
}
```

### Generics — `searchItems<T>`
A reusable search utility that works on any typed array:
```ts
export function searchItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}
```

### Union Types — `SearchKey`
IDs can be either a string or a number:
```ts
export type SearchKey = string | number;
```

### Intersection Types — `PremiumMember`
Combines `Member` with an extra `membership` property:
```ts
export type PremiumMember = Member & { membership: string };
```

---

## License

ISC
