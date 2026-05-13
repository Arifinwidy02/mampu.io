export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  totalPosts: number;
  completedTodos: number;
  pendingTodos: number;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserDetails extends User {
  posts: Post[];
  todos: Todo[];
}

export type SortOrder = "asc" | "desc";
export type FilterType = "all" | "pending" | "completed";

export interface LottieStateProps {
  src: string;
  description: string;
  children?: React.ReactNode;
}
