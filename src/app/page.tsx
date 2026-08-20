import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Hero />
      <Story />
      <Events />
      <Gallery />
      <Countdown />
      <RSVP />
      <Location />
      <Footer />
    </main>
  );
}
