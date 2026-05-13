import { Post, Todo, User, UserDetails } from "@/types";

export const fetchUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const [uRes, pRes, tRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/todos"),
  ]);

  if (!uRes.ok || !pRes.ok || !tRes.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const [users, posts, todos]: [User[], Post[], Todo[]] = await Promise.all([
    uRes.json(),
    pRes.json(),
    tRes.json(),
  ]);

  return users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id);
    const userTodos = todos.filter((t) => t.userId === user.id);

    return {
      ...user,
      totalPosts: userPosts.length,
      completedTodos: userTodos.filter((t) => t.completed).length,
      pendingTodos: userTodos.filter((t) => !t.completed).length,
    };
  });
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
