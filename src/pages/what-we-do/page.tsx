import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Menu, MapPin, Phone, Mail } from "lucide-react"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import { useState, useEffect, useRef } from "react"
import { updateSEO, pageSEOConfig } from "../../lib/seo"
import logoImg from '../../images/home/download.png';
import whatWeDoImg from '../../images/what-we-do/what we doup 2.png';
import domesticViolenceImg from '../../images/home/Domestic Violence 1.png';
import humanRightsImg from '../../images/home/human rights advocacy image 1.png';
import emergencyResponseImg from '../../images/home/emergency respose 1.png';
import qrCodeImg from '../../images/home/qr-code.png';
import communityEducationImg from '../../images/home/community education 1.png';
import youthEmpowermentImg from '../../images/home/youth empowerment 1.png';

// ServiceCard component
function ServiceCard({
  title,
  description,
  imageSrc,
}: {
  title: string
  description: string
  imageSrc: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full w-full min-h-[420px] min-w-[340px] max-h-[480px] max-w-[400px]">
      <div className="relative h-48 w-full">
        <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{description}</p>
        <Link to="/what-we-do">
          <Button variant="link" className="text-red-600 p-0 h-auto">
            Read More
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-red-600 text-red-600 ml-2">
              &gt;
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function WhatWeDoPage() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
  // SEO implementation
  useEffect(() => {
    updateSEO(pageSEOConfig.whatWeDo);
  }, []);
  
  useEffect(() => {
      const gallery = galleryRef.current
      if (!gallery) return
  
      const handleScroll = () => {
        // Update current card index based on scroll position
        const cardWidth = 360 + 32 // card width + gap
        const newIndex = Math.round(gallery.scrollLeft / cardWidth)
        setCurrentCardIndex(newIndex)
      }
  
      gallery.addEventListener("scroll", handleScroll)
      return () => gallery.removeEventListener("scroll", handleScroll)
    }, [])
  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrollPaused) return

    const totalServices = 5 // Total number of service cards
    const autoScrollInterval = setInterval(() => {
      const gallery = galleryRef.current
      if (!gallery) return

      setCurrentCardIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalServices
        
        // Calculate the scroll position for the next card
        const cardWidth = 360 + 32 // card width + gap
        const targetScrollLeft = nextIndex * cardWidth
        
        gallery.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        })
        
        return nextIndex
      })
    }, 2000) // 2 seconds interval

    return () => clearInterval(autoScrollInterval)
  }, [isAutoScrollPaused, currentCardIndex])

  // Functions to handle hover pause/resume
  const handleMouseEnter = () => setIsAutoScrollPaused(true)
  const handleMouseLeave = () => setIsAutoScrollPaused(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#0E0E30]">
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
        <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[500px]">
          <img
            src={whatWeDoImg}
            alt="Children in need"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">What We Do</h1>
        </div>
      </section>

      {/* Mission Content */} 
      <section className="py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-200 h-100 w-100">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Our mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="mb-6">
                At the International Human Rights Commission and Domestic Protection Organisation (IHRCDPO), our mission is rooted in the belief that every human being deserves dignity, protection, and equal opportunity. We work tirelessly to safeguard the rights of the underprivileged and respond swiftly to crises affecting vulnerable populations. During the COVID-19 pandemic, our team mobilized across Telangana to deliver food, medical supplies, and emotional support to thousands of individuals and families struggling to survive. Our services extended to frontline workers, migrant laborers, orphans, and the elderly — ensuring no one was left behind. Beyond immediate aid, we actively advocate for the rights of those facing domestic violence, poverty, and systemic injustice, connecting them to legal aid, social services, and safety resources. At every stage, our goal remains the same: to restore hope and protect humanity where it’s most at risk.
              </p>
              <p className="mb-6">
                Beyond emergency relief, IHRCDPO is deeply committed to building long-term, sustainable support systems that uplift communities from within. We believe that lasting change comes through empowerment, not charity alone. That’s why we partner with grassroots organizations, local authorities, and corporate sponsors to run welfare programs that address core issues like hunger, homelessness, child protection, and women’s safety. Our volunteer network — made up of passionate individuals from all walks of life — plays a vital role in identifying community needs, organizing field activities, and delivering aid with compassion and integrity. Each initiative we undertake is guided by our principles of equality, transparency, and inclusivity, ensuring that every voice is heard and every person matters.
              </p>
              <p className="mb-6">
                Education and awareness are equally critical to our mission. We conduct workshops, seminars, and community campaigns to educate people about their basic rights, domestic protection laws, and the channels available to seek justice. From hosting legal literacy sessions for women in rural areas to engaging youth in civic education, our goal is to equip individuals with the knowledge and tools to advocate for themselves and others. In every action, we blend emergency response with capacity building — not only helping people survive difficult times but empowering them to thrive in the future. At IHRCDPO, we don’t just respond to crises — we work to prevent them by addressing their root causes, one family, one neighborhood, and one life at a time.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Do</h2>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={galleryRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
              }}
            >
              {[
                {
                  title: "Domestic Protection Services",
                  description: "Our Domestic Protection Services are focused on safeguarding individuals—especially women, children, and marginalized groups—who are facing domestic abuse, violence, or threats to personal safety.",
                  imageSrc: domesticViolenceImg,
                },
                {
                  title: "Human Rights Advocacy",
                  description: "Our Human Rights Advocacy programs aim to shine a spotlight on injustice, amplify marginalized voices, and influence meaningful change through education, legal reform, and public campaigns.",
                  imageSrc: humanRightsImg,
                },
                {
                  title: "Emergency Relief & Crisis Management",
                  description: "Our Emergency Relief and Crisis Response teams are trained to act quickly in high-risk areas to help those most affected.",
                  imageSrc: emergencyResponseImg,
                },
                {
                  title: "Youth Empowerment and Leadership development",
                  description: "Young people are not just beneficiaries of change—they are drivers of it. IHRCDPO fosters leadership, resilience, and vision among youth from underserved and at-risk communities.",
                  imageSrc: youthEmpowermentImg,
                },
                {
                  title: "Commnity Education and Awareness",
                  description: "We empower communities through rights education. Our programs are accessible and culturally sensitive. We equip people to stand up for themselves and others.",
                  imageSrc: communityEducationImg,
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[360px] h-[460px] min-w-[360px] min-h-[460px] max-w-[360px] max-h-[460px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ServiceCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#1B1926] text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Driven by Compassion, Guided by Purpose</h2>
          <p className="mb-8">
            We don't just serve – we stand with those in need.
            <br />
            Through every action, we restore dignity, hope, and human rights.
          </p>
          <Link to="/contact">
            <Button className="bg-red-600 hover:bg-red-700">Join Us</Button>
          </Link>
        </div>
      </section>

      {/* Copyright */}      <footer className="bg-[#0E0E30] text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Other Links */}
            <div>
              <h3 className="text-2xl font-bold mb-2">Other Links</h3>
              <div className="w-12 h-0.5 bg-white/30 mb-6"></div>              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-base">
                <div className="flex flex-col gap-2">
                  <Link to="/" className="hover:underline">Home</Link>
                  <Link to="/about-us" className="hover:underline">About us</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/get-involved" className="hover:underline">Get involved</Link>
                  <Link to="/" className="hover:underline">Donate</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/certifications" className="hover:underline">Certifications</Link>
                  <Link to="/contact" className="hover:underline">Contact</Link>
                </div>
              </div>
            </div>
            
            {/* Contact Us */}
            <div>
              <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
              <div className="w-12 h-0.5 bg-white/30 mb-6"></div>
              <ul className="space-y-6 text-base">
                <li className="flex items-start gap-4">
                  <span className="mt-1">
                    <MapPin className="h-6 w-6 text-white" />
                  </span>                  <span>
                    Gayatri Co-Operative Urban Bank Ltd,<br />
                    Opp: Railway Station, Bhongir-508116,<br />
                    Yadadri Bhongir Dist.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1">
                    <Phone className="h-6 w-6 text-white" />
                  </span>                  <span>
                    Phone (+91) 8374892433<br />
                    Phone (+91) 9505413133
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1">
                    <Mail className="h-6 w-6 text-white" />
                  </span>
                  <span>
                    contact@ihrcdpo.com<br />
                    For Support & Help
                  </span>
                </li>
              </ul>
            </div>          </div>          {/* Divider */}
          <div className="border-t border-white/20 mt-12 mb-4"></div>
          {/* Bottom copyright with social media icons */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">            <p className="text-sm text-white/80">
              2025 Copyright <span className="font-bold text-white">International Human Rights Commission and Domestic Protection Organization </span> 
              | <br/>
              Passionately crafted by <span className="font-bold text-white">Vasam IT Solutions</span>. All rights are reserved.
            </p>
            <div className="flex gap-4">                
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaFacebookF className="h-5 w-5" />
              </a>                
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaThreads className="h-5 w-5" />
              </a>
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="border border-white/40 rounded-full p-2 hover:bg-white/10 transition">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

