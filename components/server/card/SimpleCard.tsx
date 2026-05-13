import { Post } from "@/types";

interface SimplePost {
  post: Post;
}

export const SimpleCard = ({ post }: SimplePost) => {
  return (
    <div
      key={post.id}
      className="p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors"
    >
      <h4 className="font-bold capitalize text-primary mb-1">{post.title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {post.body}
      </p>
    </div>
  );
};
