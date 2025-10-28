import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

interface TeamCardProps {
  id: number
  name: string
  arabicName?: string
  role: string
  image: string
  bio: string
  social: {
    twitter?: string
    facebook?: string
    linkedin?: string
    instagram?: string
  }
  teamType: string
  className?: string
  delay?: number
}

const TeamCard = ({ name, arabicName, role, image, bio, social, className = "", delay = 0 }: TeamCardProps) => {
  return (
    <div
      className={`relative group overflow-hidden rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:border-mafaaheem-gold/30 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-64 overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={256}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />

        {/* Social overlay */}
        {social && (
          <div className="absolute inset-0 bg-gradient-to-t from-mafaaheem-brown/90 via-mafaaheem-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <div className="flex gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-mafaaheem-brown hover:bg-mafaaheem-gold hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Facebook size={18} />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-mafaaheem-brown hover:bg-mafaaheem-gold hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Twitter size={18} />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-mafaaheem-brown hover:bg-mafaaheem-gold hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Instagram size={18} />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-mafaaheem-brown hover:bg-mafaaheem-gold hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-mafaaheem-brown group-hover:text-mafaaheem-gold transition-colors duration-300">
          {name}
        </h3>
        {arabicName && <p className="text-mafaaheem-green arabic text-sm mb-1">{arabicName}</p>}
        <p className="text-mafaaheem-gold text-sm font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-sm line-clamp-3 group-hover:text-gray-700 transition-colors">{bio}</p>
      </div>
    </div>
  )
}

export default TeamCard
