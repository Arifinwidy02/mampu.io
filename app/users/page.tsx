import { Suspense } from "react";
import { UserClient } from "@/features/users/UserClient";

export default function UsersPage() {
  return (
    <Suspense>
      <UserClient />
    </Suspense>
  );
}