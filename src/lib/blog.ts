import index from "@/content/blog-index.json";
import full from "@/content/blog.json";

// Content is imported from the old WordPress blog by `node scripts/import-blog.mjs`.

export type PostImage = { src: string; width: number; height: number };
export type PostSummary = {
  slug: string; title: string; excerpt: string; date: string; categories: string[];
  image: PostImage | null; imageAlt: string; readMinutes: number;
};
export type Post = PostSummary & {
  seoTitle?: string; description: string; modified: string; toc: { id: string; label: string }[]; html: string;
};

const summaries = index as PostSummary[];
const posts = full as Post[];

export const getPosts = () => summaries;
export const getLatestPosts = (limit = 6) => summaries.slice(0, limit);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Posts sharing the most categories with the given one, newest first. */
export function getRelatedPosts(post: Post, limit = 3) {
  return summaries
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.categories.filter((c) => post.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
