import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

import { publishedByNewest } from '../lib/content';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const posts = publishedByNewest(await getCollection('writing'));

  return rss({
    title: `${site.title} — Writing`,
    description: site.intro,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/writing/${post.id}/`,
    })),
    customData: '<language>en</language>',
  });
}
