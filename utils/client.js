import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';



export const client = createClient({
    projectId:'jzme8bpp',
    dataset: 'production',
    apiVersion: '2023-04-03' ,
    useCdn: true,
    token:process.env.NEXT_PRIVATE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
 