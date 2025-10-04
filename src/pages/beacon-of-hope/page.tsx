import { Button } from "../../components/ui/button"
import { HopeCard } from "../../components/hope-card"
import { Link } from "react-router-dom"
import { Menu, Phone, Mail } from "lucide-react"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import { useRef, useState, useEffect } from "react"
import { updateSEO, pageSEOConfig } from "../../lib/seo"
import logoImg from '../../images/home/download.png';
import aboutUsImg from '../../images/gallery/about us 1.png';
import c4 from '../../images/home/c4 1.png';
import cc1Img from '../../images/gallery/municiple workers 1.png';
import c8Img from '../../images/gallery/c8 2.png';
import k1Img from '../../images/gallery/k1 1.png';
import m1 from '../../images/home/migrants1 1.png';
import c8 from '../../images/gallery/c8 2.png';
import p1 from '../../images/home/poloice food 1.png';
import getInTouchImg from '../../images/home/food distribution1 1.png';
import qrCodeImg from '../../images/home/qr-code.png';
import imb1 from '../../images/home/Image-box.png';
import fo1 from '../../images/home/food orphans 1.png';
import cc1 from '../../images/gallery/cc1.png';
import k2 from '../../images/gallery/k2 1.png';
import cc2 from '../../images/gallery/cc2.png';

export default function BeaconOfHopePage() {
  const hopeGalleryRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
    // Total number of cards in the Hope Needs Action section
  const totalCards = 10

  // SEO implementation
  useEffect(() => {
    updateSEO(pageSEOConfig.beaconOfHope);
  }, []);
  
  useEffect(() => {
    const gallery = hopeGalleryRef.current
    if (!gallery) return

    const handleScroll = () => {
      // Update current card index based on scroll position
      const cardWidth = gallery.scrollWidth / totalCards
      const newIndex = Math.round(gallery.scrollLeft / cardWidth)
      setCurrentCardIndex(newIndex)
    }

    gallery.addEventListener("scroll", handleScroll)
    return () => gallery.removeEventListener("scroll", handleScroll)
  }, [totalCards])
  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrollPaused) return

    const autoScrollInterval = setInterval(() => {
      const gallery = hopeGalleryRef.current
      if (!gallery) return

      setCurrentCardIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalCards
        
        // Calculate the scroll position for the next card
        const cardWidth = gallery.scrollWidth / totalCards
        const targetScrollLeft = nextIndex * cardWidth
        
        gallery.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        })
        
        return nextIndex
      })
    }, 3000) // 3 seconds interval

    return () => clearInterval(autoScrollInterval)
  }, [isAutoScrollPaused, totalCards, currentCardIndex])

  // Functions to handle hover pause/resume
  const handleMouseEnter = () => setIsAutoScrollPaused(true)
  const handleMouseLeave = () => setIsAutoScrollPaused(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Donate QR Modal */}
      {showDonateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowDonateModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 relative max-w-xs w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowDonateModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Scan to Donate</h2>
            <img
              src={qrCodeImg}
              alt="Donate QR Code"
              className="w-48 h-48 mx-auto object-contain"
            />
            <p className="mt-4 text-center text-gray-600 text-sm">Scan this QR code with your payment app to donate.</p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/80 border-b border-white/30 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-2 sm:px-4 py-2">
            <div className="hidden md:flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50 bg-[#0E0E30] p-1 text-white m-0">            <div className="flex items-center space-x-4">
              <Mail />
              <p>contact@ihrcdpo.com</p>
              <Phone />
              <p>(+91) 8374892433</p>
            </div>            <div className="flex items-center space-x-4">
              <FaFacebookF />
              <FaThreads />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logoImg} alt="Logo" className="h-16 max-w-none object-contain" />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-medium text-gray-900 hover:text-red-600">Home</Link>
              <Link to="/about-us" className="font-medium text-gray-900 hover:text-red-600">About Us</Link>
              <Link to="/get-involved" className="font-medium text-gray-900 hover:text-red-600">Get Involved</Link>
              <Link to="/gallery" className="font-medium text-gray-900 hover:text-red-600">Gallery</Link>
              <Link to="/contact" className="font-medium text-gray-900 hover:text-red-600">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => setShowDonateModal(true)}>Donate</Button>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col md:hidden transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-white shadow-lg p-6 w-full max-w-xs ml-auto h-full relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl" onClick={() => setMobileMenuOpen(false)} aria-label="Close">×</button>
              <nav className="flex flex-col space-y-6 mt-8">
                <Link to="/" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/about-us" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                <Link to="/get-involved" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Get Involved</Link>
                <Link to="/gallery" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
                <Link to="/contact" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <Button className="bg-red-600 hover:bg-red-700 w-full" onClick={() => { setShowDonateModal(true); setMobileMenuOpen(false); }}>Donate</Button>
              </nav>
            </div>
          </div>
        )}
      </header>      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[450px]">
          <img
            src={aboutUsImg}
            alt="Children in need"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">HOPE</h1>
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white p-2 mb-4">
                <img
                  src={cc1}
                  alt="Our mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">              <p className="mb-4">
                In the darkest of times, even a single act of kindness can ignite a flame of hope. The International Human Rights Commission and Domestic Protection Organisation (IHRCDPO) stands as a beacon of hope for countless individuals and families across Telangana and beyond — offering protection, compassion, and unwavering support when it is needed most.
                When the COVID-19 pandemic ravaged communities, stripping people of livelihoods, safety, and stability, we rose to meet the moment. We extended helping hands to the homeless, the hungry, frontline workers, orphans, and vulnerable families. Whether it was a warm meal, a life-saving oxygen cylinder, a safe journey home, or simply someone to listen — our team showed up with empathy and resolve. Our mission transcends immediate aid; it is about restoring dignity, inspiring resilience, and reminding people they are not alone.
              </p>
              <p className="mb-4">
                Our beacon shines not only in crises but in everyday struggles — advocating for human rights, offering legal aid, protecting women and children from abuse, and empowering underrepresented voices. Through our dedicated volunteers, generous donors, and compassionate partners, we bring light to places overshadowed by injustice and despair.
                We believe hope is contagious. With every life uplifted and every hand held, our light spreads farther and brighter. Together, we can ensure no one is left in the shadows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In Service of Humanity */}
      <section className="py-16 bg-[#0E0E30] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">In Service of Humanity</h2>
          <div className="grid grid-cols-3 grid-rows-2 gap-4 items-stretch min-h-[500px]">
            {/* Top left (1) */}
            <div className="col-span-1 row-span-1">
              <img
                src={k1Img}
                alt="Gallery image 1"
                className="w-full h-full object-cover rounded-lg min-h-[180px] max-h-[300px]"
              />
            </div>
            {/* Top middle (2) */}
            <div className="col-span-1 row-span-1">
              <img
                src={k2}
                alt="Gallery image 2"
                className="w-full h-full object-cover rounded-lg min-h-[180px] max-h-[300px]"
              />
            </div>
            {/* Right (4) - large, spans both rows */}
            <div className="col-span-1 row-span-2">
              <img
                src={cc2}
                alt="Gallery image 4"
                className="w-full h-full object-cover rounded-lg min-h-full max-h-full"
              />
            </div>
            {/* Bottom left (3) - wide */}
            <div className="col-span-2 row-span-1">
              <img
                src={c8Img}
                alt="Gallery image 3"
                className="w-full h-full object-cover object-top rounded-lg min-h-[180px] max-h-[300px]"
              />
            </div>
          </div>
        </div>
      </section>      {/* Hope Needs Action */}
      <section className="py-16 bg-[#0E0E30] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Hope Needs Action</h2>
          <div>
            <div
              ref={hopeGalleryRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Each HopeCard in a flex-shrink-0 container */}
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Food Distribution Throughout COVID-19"
                  description="During the devastating waves of the COVID-19 pandemic, countless families across Telangana faced food insecurity like never before. IHRCDPO launched an extensive food donation and distribution campaign that ran continuously throughout the lockdown period."
                  imageSrc={getInTouchImg}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Blanket Distribution To The Homeless"
                  description="During the harsh nights of the COVID lockdown, Telangana’s homeless population faced brutal conditions with no access to shelter, warmth, or food. IHRCDPO organized emergency blanket distribution drives, covering railway stations, footpaths, under-bridges, and roadside camps."
                  imageSrc={c4}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Ration Distribution For The Underprivileged"
                  description="The extended lockdown left many vulnerable families without income, food, or security. Recognizing the severity of the situation, IHRCDPO organized systematic ration distribution drives across urban slums, villages, and migrant communities."
                  imageSrc={cc1Img}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Food Distribution to Hospitals and COVID-19 Patients"
                  description="Hospitals became battlegrounds during COVID-19, and both patients and healthcare staff faced immense hardship. IHRCDPO launched an initiative to supply cooked meals, fruits, snacks, and immunity boosters to hospitals treating COVID patients."
                  imageSrc={c8}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Lunch Provided to Police during Lockdown"
                  description="The police forces of Telangana played a crucial role during the lockdown, working overtime to ensure public safety, manage check-posts, and enforce pandemic protocols. Understanding the physical and mental toll of their duties"
                  imageSrc={p1}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Bus Arrangement for Migrant Returning Home"
                  description="The sudden lockdowns left thousands of migrant workers stranded, desperate to return to their hometowns outside Telangana. Moved by their plight, IHRCDPO coordinated with local authorities and transport agencies to arrange special buses for safe and organized travel."
                  imageSrc={m1}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Food and Ration Donation for Orphans and Orphanages"
                  description="Children in orphanages were among the hardest hit during the pandemic, with supply chains disrupted and donations dwindling. Recognizing their vulnerability, IHRCDPO extended dedicated support to orphanages and childcare homes, delivering food kits, ration supplies, hygiene products, and essential medicines."
                  imageSrc={fo1}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Oxygen Cylinder Donation"
                  description="As COVID-19 cases surged across Telangana, hospitals faced an overwhelming shortage of oxygen supplies. Lives were at stake every minute. IHRCDPO stepped in by arranging and distributing life-saving oxygen cylinders."
                  imageSrc={imb1}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Fruits and Ration Distributed to Municipal Workers"
                  description="While the rest of the world stayed home, sanitation workers, municipal cleaners, and daily-wage laborers remained on the frontlines, keeping our cities clean and safe. IHRCDPO launched a special outreach program to distribute fresh fruits, ration kits, and hygiene supplies to these unsung heroes."
                  imageSrc={imb1}
                />
              </div>
              <div className="flex-shrink-0 w-full md:w-1/3" style={{ scrollSnapAlign: "start" }}>
                <HopeCard
                  title="Protecting Lives with masks and PPE kits"
                  description="During the peak of COVID-19, we distributed thousands of free masks and PPE kits to frontline workers, vulnerable communities, and those most at risk. Our mission was to safeguard lives, curb the spread of the virus, and empower people with the protection they deserved."
                  imageSrc={imb1}
                />
              </div>            </div>
            {/* Pagination dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalCards }, (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentCardIndex === index ? 'bg-red-600' : 'bg-gray-400 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    const gallery = hopeGalleryRef.current
                    if (!gallery) return

                    // Calculate the target scroll position
                    const cardWidth = gallery.scrollWidth / totalCards
                    const targetScrollLeft = index * cardWidth

                    // Scroll to the target position
                    gallery.scrollTo({
                      left: targetScrollLeft,
                      behavior: 'smooth'
                    })

                    setCurrentCardIndex(index)
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0E0E30] text-white py-8">
        <div className="container mx-auto px-4">          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
                </li>
                <li>
                  <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link>
                </li>
                <li>
                  <Link to="/get-involved" className="text-gray-400 hover:text-white transition-colors duration-300">Get Involved</Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors duration-300">Gallery</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Email: contact@ihrcdpo.com
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Phone: (+91) 8374892433
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Phone: (+91) 9505413133
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 mb-4"></div>
          {/* Bottom copyright */}          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">            <p className="text-sm text-white/80">
              2025 Copyright <span className="font-bold text-white">International Human Rights Commission and Domestic Protection Organization </span> 
              | <br/>
              Passionately crafted by <span className="font-bold text-white">Vasam IT Solutions</span>. All rights are reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaYoutube className="h-5 w-5" />
              </a>
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaThreads className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}