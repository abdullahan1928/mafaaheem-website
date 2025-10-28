"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const contactInfo = {
    address: "G-11/1 House 969 Street 16 Islamabad, Pakistan",
    phone: "+923127879604",
    email: "mafaaheeminstitute@gmail.com",
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    toast.success(`${field} copied to clipboard`)

    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: MapPin,
      label: "Address",
      value: contactInfo.address,
      field: "Address",
      action: () => window.open(`https://maps.google.com/maps?q=33.6648298,72.9916004&z=17`, "_blank"),
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactInfo.phone,
      field: "Phone",
      action: () => window.open(`tel:${contactInfo.phone}`, "_blank"),
    },
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      field: "Email",
      action: () => window.open(`mailto:${contactInfo.email}`, "_blank"),
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-xl border-mafaaheem-gold/20">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-mafaaheem-brown text-center mb-2">Get In Touch</DialogTitle>
          <p className="text-center text-muted-foreground text-sm">Reach out to us through any of these channels</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Methods */}
          <div className="space-y-3">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <div
                  key={method.field}
                  className="bg-gradient-to-r from-mafaaheem-beige/30 to-mafaaheem-beige/10 rounded-lg p-4 border border-mafaaheem-gold/20 hover:border-mafaaheem-gold/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-mafaaheem-brown/10 p-2.5 rounded-full group-hover:bg-mafaaheem-gold/20 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-mafaaheem-brown group-hover:text-mafaaheem-gold transition-colors" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{method.label}</p>
                      <p className="text-sm font-medium text-foreground">{method.value}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-mafaaheem-brown/10"
                      onClick={() => copyToClipboard(method.value, method.field)}
                    >
                      {copiedField === method.field ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-mafaaheem-brown" />
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              className="w-full border-mafaaheem-gold/30 hover:bg-mafaaheem-gold/5 bg-transparent"
              onClick={() => window.open(`tel:${contactInfo.phone}`, "_blank")}
            >
              <Phone className="h-4 w-4 mr-2" /> Call Now
            </Button>
            <Button
              className="w-full bg-mafaaheem-brown hover:bg-mafaaheem-brown/90 text-white"
              onClick={() => window.open(`mailto:${contactInfo.email}`, "_blank")}
            >
              <Mail className="h-4 w-4 mr-2" /> Email Us
            </Button>
          </div>

          {/* Map Preview */}
          <div className="mt-4 rounded-lg overflow-hidden border border-mafaaheem-gold/20 shadow-md">
            <div className="aspect-video w-full bg-muted relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.1727303155474!2d72.98901327524329!3d33.66482977889946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM5JzUzLjQiTiA3MsKwNTknMjkuOCJF!5e0!3m2!1sen!2s!4v1630357834509!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="absolute inset-0 hover:opacity-95 transition-opacity duration-300"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mafaaheem Institute Location"
              ></iframe>
              <div className="absolute bottom-3 right-3 z-10">
                <Button
                  size="sm"
                  className="bg-mafaaheem-brown/90 hover:bg-mafaaheem-brown text-white shadow-lg"
                  onClick={() => window.open(`https://maps.google.com/maps?q=33.6648298,72.9916004&z=17`, "_blank")}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Open in Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContactModal
