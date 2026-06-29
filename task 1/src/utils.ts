import { Member } from "./Member";

// Generics search function
export function searchItems<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate);
}

// Union Types example
export type SearchKey = string | number;

export function formatId(id: SearchKey): string {
  return `ID-${id.toString().toUpperCase()}`;
}

// Intersection Types example
export type PremiumMember = Member & {
  membership: string;
};
