import { getMenu } from 'lib/shopify';

export async function getServerMenu() {
  try {
    return await getMenu('main-menu');
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return [];
  }
}
