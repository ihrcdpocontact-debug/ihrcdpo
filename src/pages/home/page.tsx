import { Link } from "react-router-dom"
import { PieChart } from "../../components/pie-chart"
import { Button } from "../../components/ui/button"
import { MapPin, Phone, Mail, Menu, MailIcon, X } from "lucide-react"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"
import { useRef, useState, useEffect } from "react"
import { updateSEO, pageSEOConfig } from "../../lib/seo"
import logoImg from '../../images/home/download.png';
import qrCodeImg from '../../images/home/qr-code.png';
import heroImg from '../../images/home/hero1.1.1.jpg';
import hero11Img from '../../images/home/hero11.jpg';
import hero12Img from '../../images/home/hero12.png';
import hero13Img from '../../images/home/hero13.png';
import upscaleImg from '../../images/home/whatwedo.jpg';
import domesticViolenceImg from '../../images/home/Domestic Violence 1.png';
import humanRightsImg from '../../images/home/human rights advocacy image 1.png';
import emergencyResponseImg from '../../images/home/emergency respose 1.png';
import youthEmpowermentImg from '../../images/home/youth empowerment 1.png';
import communityEducationImg from '../../images/home/community education 1.png';
import donate2Img from '../../images/home/donate2 1.png';
import c4Img from '../../images/home/c4 1.png';
import c5Img from '../../images/home/c5 1.png';
import c7Img from '../../images/home/c7 1.png';
import c9Img from '../../images/home/c9 1.png';
import collImg from '../../images/home/coll 1.png';
import collage1Img from '../../images/home/collage1 1.png';
import foodDistributionImg from '../../images/home/food distribution1 1.png';
import migrantsImg from '../../images/home/migrants1 1.png';
import rationDistributionImg from '../../images/home/ration distribution1 1.png';
import popupImage from '../../images/popup/download.png';
import logoMckImg from '../../images/sponsers/logomck.png';

export default function HomePage() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
    // Hero carousel state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = [hero11Img, hero12Img, hero13Img];
    // Hero carousel auto-rotation
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(heroInterval);
  }, [heroImages.length]);

  // Preload hero images for better quality and performance
  useEffect(() => {
    heroImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
      img.loading = 'eager';
      img.decoding = 'async';
    });
  }, [heroImages]);
  
  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (error) {
      return false
    }
  }
  
  // Show welcome modal when component mounts (first visit)
  useEffect(() => {
    // Add a small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      try {
        if (!isLocalStorageAvailable()) {
          console.warn('localStorage not available, showing popup as fallback')
          setShowWelcomeModal(true)
          return
        }

        const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeModal')
        console.log('Checking localStorage for hasSeenWelcomeModal:', hasSeenWelcome)
        
        // Only show if the user hasn't seen it before
        if (!hasSeenWelcome || hasSeenWelcome !== 'true') {
          console.log('Showing welcome modal')
          setShowWelcomeModal(true)
        } else {
          console.log('User has already seen welcome modal')
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error)
        // Fallback: show modal if localStorage fails
        setShowWelcomeModal(true)
      }
    }, 500) // Increased delay to ensure proper mounting

    return () => clearTimeout(timer)
  }, [])
  const closeWelcomeModal = () => {
    console.log('Closing welcome modal')
    setShowWelcomeModal(false)
    
    try {
      if (isLocalStorageAvailable()) {
        localStorage.setItem('hasSeenWelcomeModal', 'true')
        console.log('Set hasSeenWelcomeModal to true in localStorage')
        
        // Verify the value was set correctly
        const verification = localStorage.getItem('hasSeenWelcomeModal')
        console.log('Verification - localStorage value:', verification)
      } else {
        console.warn('localStorage not available, cannot persist popup state')
      }
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }
  // Add a debug function to manually trigger the popup (for testing)
  const showPopupManually = () => {
    setShowWelcomeModal(true)
  }

  // Function to reset popup (for testing)
  const resetPopup = () => {
    try {
      localStorage.removeItem('hasSeenWelcomeModal')
      setShowWelcomeModal(true)
      console.log('Popup reset - removed localStorage flag and showing modal')
    } catch (error) {
      console.error('Error resetting popup:', error)
    }
  }

  // Optional: Add keyboard event listeners for testing (remove in production)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl+P to show popup manually
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault()
        showPopupManually()
        console.log('Manual popup triggered via Ctrl+P')
      }
      // Ctrl+R to reset popup
      if (event.ctrlKey && event.key === 'r') {
        event.preventDefault()
        resetPopup()
        console.log('Popup reset triggered via Ctrl+R')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
  // Auto-scroll functionality for What We Do section
  useEffect(() => {
    if (isAutoScrollPaused) return

    const totalServices = 5 // Total number of service cards
      const autoScrollInterval = setInterval(() => {
      const gallery = galleryRef.current
      if (!gallery) return

      setCurrentServiceIndex((prevIndex) => {
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
  }, [isAutoScrollPaused, currentServiceIndex])

  // Functions to handle hover pause/resume for What We Do section
  const handleServiceMouseEnter = () => setIsAutoScrollPaused(true)
  const handleServiceMouseLeave = () => setIsAutoScrollPaused(false)

  // Debug logging for component lifecycle
  useEffect(() => {
    console.log('HomePage component mounted')
    return () => {
      console.log('HomePage component unmounted')
    }
  }, [])
  // Debug logging for modal state changes
  useEffect(() => {
    console.log('showWelcomeModal state changed to:', showWelcomeModal)
  }, [showWelcomeModal])

  // SEO Implementation - Update meta tags when component mounts
  useEffect(() => {
    updateSEO(pageSEOConfig.home);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={(e) => {
            // Only close if clicking the backdrop, not the modal content
            if (e.target === e.currentTarget) {
              closeWelcomeModal()
            }
          }}
        >
          <div 
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full mx-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >            {/* Close Button */}
            <button
              className="absolute top-1 right-1 z-20 w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded-full transition-all duration-200 hover:scale-110"
              onClick={closeWelcomeModal}
              aria-label="Close"
              type="button"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
            
            {/* Popup Image */}
            <div className="w-full">
              <img
                src={popupImage}
                alt="Special Offer"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error('Failed to load popup image:', e)
                  // Hide modal if image fails to load
                  closeWelcomeModal()
                }}
                onLoad={() => {
                  console.log('Popup image loaded successfully')
                }}
              />
            </div>
          </div>
        </div>
      )}

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
                <div className="hidden md:flex items-center justify-between w-full fixed top-0 left-0 right-0 z-50 bg-[#0E0E30] p-1 text-white m-0">                <div className="flex items-center space-x-4">
                  <MailIcon />
                  <p>contact@ihrcdpo.com</p>
                  <Phone />
                  <p>(+91) 8374892433</p>
                </div>                <div className="flex items-center space-x-4">
                  <FaFacebookF />
                  <FaThreads />
                  <FaInstagram />
                  <FaYoutube />
                </div>
                </div>
          <div className="flex items-center justify-between mt-10">            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                <img src={logoImg} alt="Logo" className="h-16 max-w-none object-contain" />
                </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-medium text-gray-900 hover:text-red-600">
                Home
              </Link>
              <Link to="/about-us" className="font-medium text-gray-900 hover:text-red-600">
                About Us
              </Link>
              <Link to="/get-involved" className="font-medium text-gray-900 hover:text-red-600">
                Get Involved
              </Link>
              <Link to="/gallery" className="font-medium text-gray-900 hover:text-red-600">
                Gallery
              </Link>
              <Link to="/contact" className="font-medium text-gray-900 hover:text-red-600">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setShowDonateModal(true)}
              >
                Donate
              </Button>
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
                <Link to="/" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/about-us" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
                <Link to="/get-involved" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>
                  Get Involved
                </Link>
                <Link to="/gallery" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>
                  Gallery
                </Link>
                <Link to="/contact" className="font-medium text-gray-900 hover:text-red-600" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
                <Button className="bg-red-600 hover:bg-red-700 w-full" onClick={() => { setShowDonateModal(true); setMobileMenuOpen(false); }}>
                  Donate
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">        {/* Hero Section */}        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10"></div>          <div className="relative h-96 sm:h-[500px] md:h-[600px] lg:h-[700px]">            <img
              src={heroImages[currentHeroIndex]}
              alt="IHRCDPO Hero"
              className="w-full h-full object-cover hero-img"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            {/* Animated Progress Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
              {heroImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 bg-white/40 rounded-full transition-all duration-300 ${
                    index === currentHeroIndex 
                      ? 'w-12 bg-white' 
                      : index < currentHeroIndex 
                        ? 'w-8 bg-white/60' 
                        : 'w-4'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Where Human Dignity Begins, Peace And Justice Follow
                </h1>
                <p className="text-white text-lg mb-6">Empowering Communities, Defending Rights, And Protecting Lives Across the Globe</p>
                <Link to={"/what-we-do"}>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  READ MORE
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-stretch gap-8 min-h-[420px]">
              <div className="md:w-2/3 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
                <p className="text-gray-700 mb-6">
                  International Human Rights Commission and Domestic Protection Organisation (IHRCDPO) is a non-profit committed to defending human dignity and ensuring justice for vulnerable communities worldwide. We work at the grassroots and international levels to uphold human rights, provide domestic protection, and offer emergency support where it’s needed most.
                  With a team of legal experts, counselors, and field workers, our efforts span education, advocacy, and direct aid.
                </p>
                <div className="flex justify-end">
                  <Link to="/about-us">
                    <Button variant="outline" className="bg-red-600 hover:bg-red-700 text-white">
                      READ MORE
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 flex">
                <div className="relative w-full h-64 md:h-auto rounded-lg overflow-hidden">
                  <img
                    alt="upscale"
                    src={upscaleImg}
                    className="absolute inset-0 w-full h-full object-cover object-center bg-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>        {/* What We Do Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What We Do</h2>
            <div
              onMouseEnter={handleServiceMouseEnter}
              onMouseLeave={handleServiceMouseLeave}
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

        {/* Donation Allocation Section */}
        <section className="py-16 bg-[#fbfdf9]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-[#0d0c2b] text-left">
              How we spend your <br /> donations and where it goes
            </h2>
            <p className="text-gray-500 text-left max-w-xl mb-8">
              We understand that when you make a donation, you want to know exactly where your money is going and we pledge to be transparent.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2">                <ul className="space-y-4 text-left">
                   <DonationItem color="bg-[#1e3a8a]" percentage="50%" label="Feeding Poor" />
                  <DonationItem color="bg-[#bdf2bf]" percentage="20%" label="Organizing Events" />
                  <DonationItem color="bg-[#fff0c9]" percentage="10%" label="Skills Training" />
                  <DonationItem color="bg-[#facf64]" percentage="10%" label="Helping people" />
                  <DonationItem color="bg-[#f28fbf]" percentage="10%" label="Human safety" />
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <PieChart />
              </div>
            </div>
          </div>
        </section>        {/* Call to Action Section */}        <section className="relative bg-gray-900 py-32"> {/* Added bg-blue-900 and py-16 */}
          <div className="relative h-[450px] sm:h-96 md:h-[450px] lg:h-[550px]">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={donate2Img}
              alt="Volunteers distributing aid"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center text-white">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl ml-auto text-right"> 
                  <h2 className="text-4xl md:text-5xl font-bold mb-6"> 
                    Be The Reason Someone Survives Today
                  </h2>
                  <p className="text-lg md:text-xl mb-8 leading-relaxed">
                    From feeding the hungry during lockdowns to helping victims of abuse find shelter, your support turns compassion into real action. Every donation fuels our mission to bring hope and justice where it's needed most.Join us in protecting lives, restoring dignity, and defending human rights for those who need it most.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 text-lg"
              onClick={() => setShowDonateModal(true)}
            >
              DONATE
            </Button>
          </div>
        </section>        {/* Moments That Matter Section */}        <section className="py-16 w-full bg-white">
          <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
            <h2 className="text-3xl font-bold mb-12 text-center">Moments That Matter</h2>
            <div
              className="grid grid-cols-4 grid-rows-3 gap-2 md:gap-4 lg:gap-6 w-full mx-auto"
              style={{ minHeight: 500 }}
            >
              {/* Top left large vertical image */}
              <Link to="/gallery" className="group relative col-span-1 row-span-2">
                <img
                  src={c4Img}
                  alt="Collage image 1"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="bg-white/80 rounded-full p-2">
                    {/* Arrow icon */}
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
              {/* Top right large horizontal image */}
              <Link to="/gallery" className="group relative col-start-2 col-end-5 row-span-2">
                <img
                  src={collImg}
                  alt="Large collage image"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="bg-white/80 rounded-full p-2">
                    {/* Arrow icon */}
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
              {/* Middle left small image */}
              <Link to="/gallery" className="group relative col-span-1 row-start-3">
                <img
                  src={c9Img}
                  alt="Collage image 2"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="bg-white/80 rounded-full p-2">
                    {/* Arrow icon */}
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
              {/* Bottom row, three images */}
              <Link to="/gallery" className="group relative col-start-2 row-start-3">
                <img
                  src={c5Img}
                  alt="Collage image 5"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="bg-white/80 rounded-full p-2">
                    {/* Arrow icon */}
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
              <Link to="/gallery" className="group relative col-start-3 row-start-3">
                <img
                  src={c7Img}
                  alt="Collage image 6"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="bg-white/80 rounded-full p-2">
                    {/* Arrow icon */}
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
              <Link to="/gallery" className="group relative col-start-4 row-start-3">
                <img
                  src={collage1Img}
                  alt="Collage image 3"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  style={{ height: "100%", minHeight: 0 }}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                  <span className="bg-white/80 rounded-full p-2">
                    {/* Arrow icon */}
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Beacon of Hope Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Beacon of Hope</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left: Large NewsCard */}
              <div className="w-full">
                <div className="w-full h-full bg-white flex flex-col">
                  <div className="w-full aspect-video mb-4">
                    <img
                      src={foodDistributionImg}
                      alt="Food Distribution Throughout COVID-19"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Food Distribution Throughout COVID-19</h3>
                  <p className="text-gray-700 mb-4">
                    In the peak of the pandemic, IHRCDPO organized large-scale food donation drives across Telangana. Daily meals were provided to thousands of individuals affected by lockdowns and job loss.
                  </p>
                  <Link to="/beacon-of-hope" className="text-red-600 font-semibold flex items-center gap-1 hover:underline">
                    READ MORE
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
              {/* Right: 3 stacked NewsCards */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-4">
                  <div className="w-1/3">
                    <img
                      src={migrantsImg}
                      alt="Bus Arrangement for Migrants Returning Home"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col">
                    <h4 className="text-lg md:text-xl font-bold mb-1">Bus Arrangement for Migrants Returning Home</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      The sudden lockdowns left thousands of migrant workers stranded, desperate to return to their hometowns outside Telangana.
                    </p>
                    <Link to="/beacon-of-hope" className="text-red-600 font-semibold flex items-center gap-1 hover:underline text-sm">
                      READ MORE
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="w-1/3">
                    <img
                      src={rationDistributionImg}
                      alt="Ration Distribution for the underprivileged"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col">
                    <h4 className="text-lg md:text-xl font-bold mb-1">Ration Distribution for the underprivileged</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      To support families with no income during lockdown, we provided essential ration kits including rice, pulses, and oil.
                    </p>
                    <Link to="/beacon-of-hope" className="text-red-600 font-semibold flex items-center gap-1 hover:underline text-sm">
                      READ MORE
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="w-1/3">
                    <img
                      src={heroImg}
                      alt="Lunch Provided to Police During Lockdown"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col">
                    <h4 className="text-lg md:text-xl font-bold mb-1">Lunch Provided to Police During Lockdown</h4>
                    <p className="text-gray-700 mb-2 text-sm">
                      Acknowledging their round-the-clock duty, IHRCDPO served freshly prepared lunch daily to police personnel managing lockdown in TG.
                    </p>
                    <Link to="/beacon-of-hope" className="text-red-600 font-semibold flex items-center gap-1 hover:underline text-sm">
                      READ MORE
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="/beacon-of-hope">
                <Button variant="outline" className="bg-red-600 hover:bg-red-700 text-white">
                  Know More
                </Button>
              </Link>
            </div>
          </div>
        </section>        {/* Sponsors Section */}
        <section className="py-16 bg-[#fbfdf9]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Proud Sponsors & Partners</h2>
            {/* Single centered sponsor logo for all screen sizes */}
            <div className="flex justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                <img
                  src={logoMckImg}
                  alt="MCK Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hope in Action Section */}
        <section className="py-16 bg-[#1B1926] text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Hope in Action</h2>
          <p className="mb-8">
            Every act of kindness is a step toward justice.<br/>
            Together, we can build a world where no one is left behind.
          </p>
          <Link to="/contact">
            <Button className="bg-red-600 hover:bg-red-700">Join Us</Button>
            </Link>
        </div>
      </section>
      </main>      <footer className="bg-[#0E0E30] text-white pt-12 pb-6">
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
            </div>
            </div>
          {/* Divider */}
          <div className="border-t border-white/20 mt-12 mb-4"></div>          {/* Bottom copyright with social media icons */}
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

// function NewsCard({
//   title,
//   description,
//   imageSrc,
// }: {
//   title: string
//   description: string
//   imageSrc: string
// }) {
//   return (
//     <div className="flex flex-col md:flex-row gap-4">
//       <div className="md:w-1/3 relative h-48 md:h-auto">
//         <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover rounded-lg" />
//       </div>
//       <div className="md:w-2/3">
//         <h3 className="text-xl font-bold mb-2">{title}</h3>
//         <p className="text-gray-600 mb-4">{description}</p>
//         <Link to="/beacon-of-hope">
//         <Button variant="link" className="text-red-600 p-0 h-auto">
//           Read More
//         </Button>
//         </Link>
//       </div>
//     </div>
//   )
// }

function DonationItem({
  color,
  percentage,
  label,
}: {
  color: string
  percentage: string
  label: string
}) {
  return (
    <li className="flex items-center space-x-3">
      <span className={`w-4 h-4 inline-block rounded ${color}`}></span>
      <span className="text-sm text-gray-700">{percentage} {label}</span>
    </li>
  );
}
