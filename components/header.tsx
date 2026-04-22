"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isScrolled = true

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)

    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "px-4 pt-4" : ""}`}>
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
          isScrolled
            ? "bg-[#0F0F14]/80 backdrop-blur-xl border border-white/10 px-6 py-3"
            : "bg-background/90 backdrop-blur-md px-6 py-5"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
            <svg
              className={`w-6 h-6 transition-colors duration-300 text-[#36B1C7]`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span
              className={`text-lg font-medium tracking-tight transition-colors duration-300 text-[#FBF6EE]`}
            >
              Homie
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className="text-sm transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Mission
            </a>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="text-sm transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "pricing")}
              className="text-sm transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Properties
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="text-sm transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="text-sm transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-1">
            <button
              className="liquid-glass-btn relative flex items-center gap-0 rounded-full pl-5 pr-1 py-1 transition-all duration-300 group"
            >
              <span className="glass-reflection" />
              <span
                className="text-sm pr-3 relative z-10 transition-colors duration-300 text-[#FBF6EE] group-hover:text-[#D3AF37]"
              >
                List a property
              </span>
              <span className="w-8 h-8 rounded-full flex items-center justify-center relative z-10">
                <ArrowRight
                  className="w-4 h-4 group-hover:opacity-0 absolute transition-opacity duration-300 text-[#FBF6EE]"
                />
                <ArrowUpRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#D3AF37]"
                />
              </span>
            </button>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 text-[#FBF6EE]`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav
            className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t pt-6 border-white/10"
          >
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className="transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Mission
            </a>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "pricing")}
              className="transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Properties
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              className="transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, "faq")}
              className="transition-colors cursor-pointer text-[#E8D8C3]/70 hover:!text-[#D3AF37]"
            >
              FAQ
            </a>
            <div
              className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10"
            >
              <a href="#" className="text-[#FBF6EE]">
                Login
              </a>
              <button
                className="liquid-glass-btn relative flex items-center gap-0 rounded-full pl-5 pr-1 py-1 w-fit transition-all duration-300 group"
              >
                <span className="glass-reflection" />
                <span
                  className="text-sm pr-3 relative z-10 transition-colors duration-300 text-[#FBF6EE] group-hover:text-[#D3AF37]"
                >
                  List a property
                </span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center relative z-10">
                  <ArrowRight
                    className="w-4 h-4 group-hover:opacity-0 absolute transition-opacity duration-300 text-[#FBF6EE]"
                  />
                  <ArrowUpRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#D3AF37]"
                  />
                </span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
