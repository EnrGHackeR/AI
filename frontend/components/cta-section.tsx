import { ArrowUpRight, ArrowRight } from "lucide-react"
import { AnimatedRevenueChart } from "./animated-revenue-chart"
import { TypewriterHeading } from "./typewriter-heading"

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[20vw] font-bold font-sans tracking-tighter leading-none text-white/[0.03] whitespace-nowrap">
          SIMPLIFY
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <TypewriterHeading
            text="Ready to simplify your rentals?"
            tag="h2"
            className="text-4xl md:text-5xl font-normal leading-tight max-w-4xl mx-auto mb-6 font-serif text-[#36B1C7]"
            typeSpeed={35}
          />
          <p className="text-[#E8D8C3]/70 max-w-2xl mx-auto mb-10">
            Join thousands of owners and tenants who trust Homie for their real estate transactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="liquid-glass-btn relative flex items-center justify-center gap-0 rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group" style={{ background: "linear-gradient(135deg, rgba(193, 18, 31, 0.3), rgba(255, 45, 85, 0.2), rgba(138, 43, 226, 0.3))" }}>
              <span className="glass-reflection" />
              <span className="text-sm pr-4 relative z-10 text-[#FBF6EE]">List a property</span>
              <span className="w-10 h-10 bg-[#0F0F14]/50 rounded-full flex items-center justify-center relative z-10 backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 text-[#36B1C7]" />
              </span>
            </button>

            <button className="liquid-glass-btn relative flex items-center justify-center gap-0 rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 group">
              <span className="glass-reflection" />
              <span className="text-sm text-[#FBF6EE] group-hover:text-[#D3AF37] pr-4 relative z-10 transition-colors duration-300">
                Search properties
              </span>
              <span className="w-10 h-10 rounded-full flex items-center justify-center relative z-10">
                <ArrowRight className="w-4 h-4 text-[#FBF6EE] group-hover:opacity-0 absolute transition-opacity duration-300" />
                <ArrowUpRight className="w-4 h-4 text-[#D3AF37] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <AnimatedRevenueChart />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <div className="text-center">
            <p className="text-7xl font-light text-[#FBF6EE]">50K+</p>
            <p className="text-xs text-[#E8D8C3]/60 uppercase tracking-wider">Users</p>
          </div>
          <div className="text-center">
            <p className="text-7xl font-light text-[#FBF6EE]">15K+</p>
            <p className="text-xs text-[#E8D8C3]/60 uppercase tracking-wider">Properties listed</p>
          </div>
          <div className="text-center">
            <p className="text-7xl font-light text-[#FBF6EE]">$12M+</p>
            <p className="text-xs text-[#E8D8C3]/60 uppercase tracking-wider">Transactions</p>
          </div>
        </div>
      </div>
    </section>
  )
}
