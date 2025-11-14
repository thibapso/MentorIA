import Hero from '@/components/Hero/Hero'
import Discover from '@/components/Discover/Discover'
import Benefits from '@/components/Benefits/Benefits'
import Footer from '@/components/Footer/Footer'

import Navbar from '@/components/Navbar/Navbar'
import BackToTop from '@/components/BackToTop/BackToTop'
import SectionIndicator from '@/components/SectionIndicator/SectionIndicator'
import SmoothScroll from '@/lib/animations/smoothScroll'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <SectionIndicator />
      <Hero id="hero" />
      <Discover id="discover"/>
      <Benefits id="benefits"/>
      <Footer id="footer" />
      <BackToTop />
    </>
  )
}
