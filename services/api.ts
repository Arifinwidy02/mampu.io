import { Post, Todo, User, UserDetails } from "@/types";

export const fetchUser = async (userId: string): Promise<User> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

export const fetchUserDetails = async (
  userId: string,
): Promise<UserDetails> => {
  const [uRes, pRes, tRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
  ]);
  if (!uRes.ok) throw new Error("Failed to fetch user details");

  const [user, posts, todos] = await Promise.all([
    uRes.json(),
    pRes.json(),
    tRes.json(),
  ]);

  return { ...user, posts, todos };
};
