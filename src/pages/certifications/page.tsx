// Certifications page: displays professional certification information
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { useState, useEffect } from "react"
import { updateSEO, pageSEOConfig } from "../../lib/seo"
import logoImg from '../../images/home/download.png';
import qrCodeImg from '../../images/home/qr-code.png';
import { Menu, MapPin, Phone, Mail, FileText } from "lucide-react"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaThreads } from "react-icons/fa6"

export default function CertificationsPage() {
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    updateSEO(pageSEOConfig.certifications)
  }, [])
  return (
    <div className="min-h-screen flex flex-col bg-[#101829]">
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
      </header>
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Certifications & Legal Status</h1>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              IHRCDPO operates with full legal compliance and transparency. Our organization holds all necessary certifications and registrations required for humanitarian and human rights work in India.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">              {/* NGO Darpan Registration */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">NGO Darpan Registration</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Registered with the Government of India's NGO Darpan portal, ensuring transparency and accountability in our operations and funding activities.
                </p>
                <div className="mt-4 flex items-center text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Verified & Active
                </div>
              </div>

              {/* Udyam Registration */}              <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Udyam Registration</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Certified under the Government of India's Udyam Registration scheme, validating our organization's legal structure and operational capabilities.
                </p>
                <div className="mt-4 flex items-center text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Government Certified
                </div>
              </div>

              {/* International Human Rights Commission */}              <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Human Rights Commission</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Officially recognized as an International Human Rights Commission, authorized to work on human rights advocacy and protection services.
                </p>
                <div className="mt-4 flex items-center text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  International Recognition
                </div>
              </div>

              {/* AACTI Registration */}              <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">AACTI Registration</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Registered with AACTI (Association for Action and Community Training Initiative), enabling collaborative humanitarian work and community development.
                </p>
                <div className="mt-4 flex items-center text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Community Certified
                </div>
              </div>

              {/* Trademark Registration */}              <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Trademark Protection</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our organization name and logo are protected under trademark law, ensuring brand integrity and preventing unauthorized use.
                </p>
                <div className="mt-4 flex items-center text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  Legally Protected
                </div>
              </div>

              {/* Trust & Transparency */}              <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-700">
                <div className="flex items-center mb-4">                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Transparency Commitment</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  All our certifications and legal documents are maintained as per regulatory requirements. We operate with complete transparency and accountability.
                </p>
                <div className="mt-4 flex items-center text-white text-sm font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  100% Compliant
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Expanded Legal Compliance & Verification section, full-width */}
        <section className="py-16 bg-[#1B1926]">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Legal Compliance & Verification</h2>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto text-center">
            IHRCDPO maintains all necessary legal documentation and certifications required for operating as a humanitarian organization in India. 
            Our commitment to transparency ensures that all stakeholders can trust in our legitimate operations and ethical practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">5+</div>
              <p className="text-gray-300">Official Certifications</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
              <p className="text-gray-300">Legal Compliance</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">2024</div>
              <p className="text-gray-300">Established</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#0E0E30] text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Other Links */}
            <div>
              <h3 className="text-2xl font-bold mb-2">Other Links</h3>
              <div className="w-12 h-0.5 bg-white/30 mb-6"></div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-base">
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
              <h3 className="text-2xl font-bold mb-2 py-4">Contact Us</h3>
              <div className="w-12 h-0.5 bg-white/30 mb-6"></div>
              <ul className="space-y-6 text-base">
                <li className="flex items-start gap-4">
                  <span className="mt-1">
                    <MapPin className="h-6 w-6 text-white" />
                  </span>
                  <span>
                    Gayatri Co-Operative Urban Bank Ltd,<br />
                    Opp: Railway Station, Bhongir-508116,<br />
                    Yadadri Bhongir Dist.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1">
                    <Phone className="h-6 w-6 text-white" />
                  </span>
                  <span>
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
          <div className="border-t border-white/20 mt-12 mb-4"></div>
          {/* Bottom copyright and social */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-white/80">
              2025 Copyright <span className="font-bold text-white">International Human Rights Commission and Domestic Protection Organization </span>
              | <br/>
              Passionately crafted by <span className="font-bold text-white">Vasam IT Solutions</span>. All rights are reserved.
            </p>
            <div className="flex gap-4 mt-2 md:mt-0">
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