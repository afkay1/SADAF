import Hero from "@/components/home/Hero";
import Arch from "@/components/home/Arch";
import Reasons from "@/components/home/Reasons";
import QuoteExpand from "@/components/home/QuoteExpand";
import Concept from "@/components/home/Concept";
import HScroll from "@/components/home/HScroll";
import Route from "@/components/home/Route";
import Types from "@/components/home/Types";
import Amenities from "@/components/home/Amenities";
import Architecture from "@/components/home/Architecture";
import Credits from "@/components/home/Credits";
import Closing from "@/components/home/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Arch />
      <Reasons />
      <QuoteExpand />
      <Concept />
      <HScroll />
      <Route />
      <Types />
      <Amenities />
      <Architecture />
      <Credits />
      <Closing />
      <Footer />
    </>
  );
}
