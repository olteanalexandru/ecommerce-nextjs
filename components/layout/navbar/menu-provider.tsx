import { getMenu } from 'lib/shopify';

export async function MenuProvider() {
  try {
    const menuData = await getMenu('main-menu');
    // Store the menu data in a global window object
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_MENU_DATA__ = ${JSON.stringify(menuData)};`
        }}
      />
    );
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return null;
  }
}
