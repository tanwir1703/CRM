import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingEffect = ({ text }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [text],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    const typed = new Typed(elementRef.current, options);

    return () => {
      typed.destroy();
    };
  }, [text]);

  return (
    <h2 ref={elementRef} className="text-4xl font-bold mb-8 text-white">
      {/* Text will be rendered by Typed.js */}
    </h2>
  );
};
export default TypingEffect;