import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const blogs = defineCollection({
  name: "blogs",
  directory: "data/blogs",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    authorAvatar: z.string(),
    description: z.string(),
    image: z.string(),
    categories: z.array(z.string()),
    slug: z.string().optional(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
      ],
    });
    const slug = document.slug ?? document._meta.path;
    return {
      ...document,
      body,
      slug,
    };
  },
});

export default defineConfig({
  collections: [blogs],
});
