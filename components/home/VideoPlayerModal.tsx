import { X } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"

interface VideoPlayerModalProps {
  open: boolean
  onClose: () => void
  videoUrl: string
}

export function VideoPlayerModal({ open, onClose, videoUrl }: VideoPlayerModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="
          sm:max-w-[80vw] max-h-[85vh] p-0 overflow-hidden border-0
          bg-gradient-to-b from-black/80 to-black/90
          backdrop-blur-lg shadow-2xl
          transition-all duration-300 ease-in-out
          animate-[fadeIn_0.25s_ease-in-out]
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4 z-20 flex items-center justify-center
            h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20
            transition-all duration-200
            hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mafaaheem-gold
          "
        >
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </button>

        {/* Video Container */}
        <div
          className="
            relative aspect-video w-full h-full overflow-hidden
            rounded-lg border border-mafaaheem-gold/30
            shadow-[0_0_25px_rgba(255,215,0,0.15)]
            animate-[zoomIn_0.4s_ease-out]
          "
        >
          <iframe
            src={videoUrl}
            width="100%"
            height="100%"
            allow="autoplay"
            allowFullScreen
            className="border-0 w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
