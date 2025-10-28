
// Add scroll reveal functionality
export const initScrollReveal = () => {
  const handleScroll = () => {
    const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.8);
      if (isVisible) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check
  setTimeout(handleScroll, 100);
  
  return () => window.removeEventListener('scroll', handleScroll);
};
