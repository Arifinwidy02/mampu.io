export const mockUser = {
  id: 1,
  name: "Leanne Graham",
  email: "leanne@test.com",
  username: "Bret",
  phone: "1-770-736-8031",
  website: "hildegard.org",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
  posts: [
    { userId: 1, id: 1, title: "Post One", body: "Body of post one" },
    { userId: 1, id: 2, title: "Post Two", body: "Body of post two" },
  ],
  todos: [
    { userId: 1, id: 1, title: "Buy groceries", completed: true },
    { userId: 1, id: 2, title: "Walk the dog", completed: false },
  ],
};

export const mockUserClient = (overrides = {}) => ({
  id: 1,
  name: "Leanne Graham",
  email: "leanne@test.com",
  username: "Bret",
  phone: "1-770-736-8031",
  website: "hildegard.org",
  totalPosts: 10,
  completedTodos: 15,
  pendingTodos: 5,
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
  ...overrides,
});

export const mockUsersArray = [
  mockUserClient(),
  mockUserClient({
    id: 2,
    name: "Ervin Howell",
    email: "ervin@test.com",
    username: "Antonette",
  }),
  mockUserClient({
    id: 3,
    name: "Clementine Bauch",
    email: "clem@test.com",
    username: "Samantha",
    pendingTodos: 0,
  }),
];
