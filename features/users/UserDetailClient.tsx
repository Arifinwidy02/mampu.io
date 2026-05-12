"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserDetails } from "@/hooks/use-users";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function UserDetailClient({ id }: { id: string }) {
  const { isLoading, isError, data: user } = useUserDetails(id);

  if (isLoading || !user)
    return (
      <div className="container mx-auto py-10">
        Loading user details...
      </div>
    );
  if (isError)
    return (
      <div className="container mx-auto py-10 text-red-500">
        User not found or an error occurred.
      </div>
    );

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/users">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to list
        </Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle className="text-2xl">
            {user.name} (@{user.username})
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-2">
                Contact Info
              </h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
            </section>
            <section>
              <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-2">
                Company
              </h3>
              <p className="font-bold">{user.company.name}</p>
              <p className="italic text-sm">
                &ldquo;{user.company.catchPhrase}&rdquo;
              </p>
            </section>
          </div>
          <section className="border-t pt-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase text-center mb-2">
              Address
            </h3>
            <p className="text-center">
              {user.address.street}, {user.address.suite}, {user.address.city} (
              {user.address.zipcode})
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
