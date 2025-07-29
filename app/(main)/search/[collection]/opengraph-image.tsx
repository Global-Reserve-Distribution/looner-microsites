import OpengraphImage from 'components/opengraph-image';
import { fetchCollection } from 'lib/shopify/server-actions';

export default async function Image({
  params
}: {
  params: { collection: string };
}) {
  const collection = await fetchCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
