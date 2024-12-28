import { Banner } from 'components/banner';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description: 'missing metatdata',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <Banner />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
