import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import FeaturedCategories from '../components/featured-categories/FeaturedCategories';
import LimitedTimeOffer from '../components/limited-time-offer/LimitedTimeOffer';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <FeaturedCategories />
      <LimitedTimeOffer />
      <Footer />
    </div>
  );
}
