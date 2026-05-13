"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LottieState from "@/components/client/LottieState";
import { UserDetailSkeleton } from "@/components/client/UserDetailSkeleton";
import { useUserDetails } from "@/hooks/use-users";
import { ChevronLeft, CheckCircle2, Circle } from "lucide-react";

export default function UserDetailClient({ id }: { id: string }) {
  const { isLoading, isError, data: user, refetch } = useUserDetails(id);
  const [activeTab, setActiveTab] = useState<"posts" | "todos">("posts");
  const router = useRouter();

  if (isLoading) return <UserDetailSkeleton />;

  if (isError || !user)
    return (
      <div className="container mx-auto py-10">
        <LottieState
          src="/lottie/empty_state.json"
          description="Failed to load user details. Please try again."
        >
          <Button onClick={() => refetch()}>Try Again</Button>
        </LottieState>
      </div>
    );

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Button
        variant="ghost"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/users");
          }
        }}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to list
      </Button>

      <Card className="max-w-4xl mx-auto shadow-md">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-2xl">
            {user.name}{" "}
            <span className="text-muted-foreground font-normal text-lg">
              (@{user.username})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <section>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Contact Info
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="text-muted-foreground">Website:</span>{" "}
                  {user.website}
                </p>
              </div>
            </section>
            <section>
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Company & Address
              </h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{user.company.name}</p>
                <p className="text-muted-foreground italic">
                  &ldquo;{user.company.catchPhrase}&rdquo;
                </p>
                <p className="mt-2 text-xs">
                  {user.address.street}, {user.address.city},{" "}
                  {user.address.zipcode}
                </p>
              </div>
            </section>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">User Activity Signals</h3>

            <div className="flex bg-muted p-1 rounded-lg w-full mb-6">
              <div
                onClick={() => setActiveTab("posts")}
                className={`flex-1 text-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
                  activeTab === "posts"
                    ? "bg-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Posts ({user.posts?.length})
              </div>
              <div
                onClick={() => setActiveTab("todos")}
                className={`flex-1 text-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
                  activeTab === "todos"
                    ? "bg-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Todos ({user.todos?.length})
              </div>
            </div>

            {activeTab === "posts" && (
              <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-300">
                {user.posts?.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors"
                  >
                    <h4 className="font-bold capitalize text-primary mb-1">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "todos" && (
              <div className="space-y-2 animate-in fade-in duration-300">
                {user.todos?.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/5 text-sm"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-orange-400 shrink-0" />
                    )}
                    <span
                      className={
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : "font-medium"
                      }
                    >
                      {todo.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
