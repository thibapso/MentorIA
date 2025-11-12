import Hero from '@/components/Hero/Hero'
import Discover from '@/components/Discover/Discover'
import Footer from '@/components/Footer/Footer'

import Navbar from '@/components/Navbar/Navbar'
import BackToTop from '@/components/BackToTop/BackToTop'
import SectionIndicator from '@/components/SectionIndicator/SectionIndicator'

export default function Home() {
  return (
    <>
      <Navbar />
      <SectionIndicator />
      <Hero />
      <Discover id="discover"/>
      <Footer />
      <BackToTop />
    </>
  )
}
