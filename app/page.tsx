import Hero from '@/components/Hero/Hero'
import Discover from '@/components/Discover/Discover'
import Footer from '@/components/Footer/Footer'

import Navbar from '@/components/Navbar/Navbar'
import BackToTop from '@/components/BackToTop/BackToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Discover id="discover"/>
      <Footer />
      <BackToTop />
    </>
  )
}
