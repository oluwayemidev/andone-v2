import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount or route change
  }, [pathname]);

  return null; // Return null because this component doesn't render anything
};

export default ScrollToTop;
