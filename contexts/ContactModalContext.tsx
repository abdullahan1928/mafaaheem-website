"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import ContactModal from "@/components/modals/ContactModal";

interface ContactModalContextType {
  openContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  openContactModal: () => {},
});

export const useContactModal = () => useContext(ContactModalContext);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openContactModal = () => setIsOpen(true);
  const closeContactModal = () => setIsOpen(false);
  
  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  );
}; 