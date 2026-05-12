import { fetchUser } from "@/services/api";
import type { Metadata } from "next";
import UserDetailClient from "@/features/users/UserDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const user = await fetchUser(id);
    return {
      title: `${user.name} (@${user.username})`,
      description: `${user.name} — ${user.email} | ${user.company.name}`,
    };
  } catch {
    return {
      title: "User Details",
      description: "View user details",
    };
  }
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UserDetailClient id={id} />;
}
