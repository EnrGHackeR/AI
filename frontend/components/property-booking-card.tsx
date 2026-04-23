"use client"

import Image from "next/image"
import { Home, Calendar, MapPin, Users, Wifi, Car, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PropertyBookingCardProps {
  propertyName: string
  location: string
  duration: string
  availableDate: string
  image: string
  pricePerNight: number
  currency?: string
  propertyType?: string
  features?: string[]
  amenities?: string[]
  rating?: number
  onBook?: () => void
  className?: string
}

export function PropertyBookingCard({
  propertyName,
  location,
  duration,
  availableDate,
  image,
  pricePerNight,
  currency = "$",
  propertyType,
  features = [],
  amenities = [],
  rating,
  onBook,
  className,
}: PropertyBookingCardProps) {
  return (
    <div
      className={cn("w-full h-full flex flex-col overflow-hidden rounded-3xl", className)}
      style={{
        background: "linear-gradient(135deg, rgba(193, 18, 31, 0.12), rgba(255, 45, 85, 0.08), rgba(138, 43, 226, 0.12))",
        border: "1px solid rgba(255, 45, 85, 0.15)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 0 0 1px rgba(138, 43, 226, 0.05), 0 4px 24px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={propertyName} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14]/90 via-[#0F0F14]/40 to-transparent" />

        {rating && (
          <div className="absolute left-3 top-3 rounded-lg bg-[#D3AF37]/20 px-3 py-1 text-sm font-semibold text-[#D3AF37] backdrop-blur-sm border border-[#D3AF37]/20">
            ★ {rating}
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <div className="mb-1 flex items-center gap-2">
            <Home className="h-5 w-5 text-[#36B1C7]" />
            {propertyType && <span className="text-sm font-medium text-[#E8D8C3]/90">{propertyType}</span>}
          </div>
          <h3 className="text-balance text-2xl font-bold text-[#FBF6EE]">{propertyName}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Property details */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#E8D8C3]/60">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#E8D8C3]/60">
            <Calendar className="h-4 w-4" />
            <span>
              {availableDate} • {duration}
            </span>
          </div>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 text-sm font-semibold text-[#36B1C7]">Property Highlights</div>
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <span key={index} className="rounded-lg bg-[#8A2BE2]/15 px-2 py-1 text-xs font-medium text-[#E8D8C3] border border-[#8A2BE2]/20">
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="rounded-lg bg-white/5 px-2 py-1 text-xs font-medium text-[#E8D8C3]/60 border border-white/10">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3">
            {amenities.slice(0, 3).map((amenity, index) => {
              let Icon = Users
              if (amenity.toLowerCase().includes("wifi")) Icon = Wifi
              if (amenity.toLowerCase().includes("parking")) Icon = Car
              if (amenity.toLowerCase().includes("pool")) Icon = Waves

              return (
                <div key={index} className="flex items-center gap-1.5 text-sm text-[#E8D8C3]/60">
                  <Icon className="h-4 w-4" />
                  <span>{amenity}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Price & button */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <div>
            <div className="text-sm text-[#E8D8C3]/50">From</div>
            <div className="text-2xl font-bold text-[#FBF6EE]">
              {currency}
              {pricePerNight}
              <span className="text-sm font-normal text-[#E8D8C3]/50">/night</span>
            </div>
          </div>
          <button
            onClick={onBook}
            className="liquid-glass-btn rounded-xl px-6 py-3 font-semibold text-[#FBF6EE] text-sm"
          >
            <span className="glass-reflection" />
            <span className="relative z-10">Book Now</span>
          </button>
        </div>
      </div>
    </div>
  )
}
