import OpengraphImage from 'components/opengraph-image';
import { fetchPage } from 'lib/shopify/server-actions';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await fetchPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
