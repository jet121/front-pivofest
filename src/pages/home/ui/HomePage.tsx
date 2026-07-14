import { About } from "@widgets/About";
import { FAQ } from "@widgets/FAQ";
import { Footer } from "@widgets/Footer";
import { Hero } from "@widgets/Hero";
import { HowToWin } from "@widgets/HowToWin";
import { UserSection } from "@widgets/UserSection";
import { Video } from "@widgets/Video";

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <UserSection />
      <HowToWin />
      <Video />
      <About />
      <FAQ />
      <Footer />
    </main>
  );
};
