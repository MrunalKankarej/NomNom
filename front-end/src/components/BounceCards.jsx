import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

const generateTransforms = (count) => {
  const spread = 120;
  const maxRotate = 12;
  const center = (count - 1) / 2;

  return Array.from({ length: count }, (_, i) => {
    const offset = i - center;
    const rotate = center === 0 ? 0 : offset * (maxRotate / center);
    const x = offset * spread;
    return `translate(${x}px) rotate(${rotate}deg)`;
  });
};

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  enableHover = true
}) {
  const containerRef = useRef(null);

  const transforms = useMemo(
    () => generateTransforms(images.length),
    [images.length]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType]);

  const removeRotation = (t) =>
    t.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');

  const pushTransform = (t, offsetX) => {
    const match = t.match(/translate\(([-0-9.]+)px\)/);
    if (!match) return t;
    const newX = parseFloat(match[1]) + offsetX;
    return t.replace(
      /translate\(([-0-9.]+)px\)/,
      `translate(${newX}px)`
    );
  };

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const card = q(`.card-${i}`);
      gsap.killTweensOf(card);

      if (i === hoveredIdx) {
        gsap.to(card, {
          transform: removeRotation(transforms[i]),
          scale: 1.12,
          duration: 0.4,
          ease: 'back.out(1.4)'
        });
      } else {
        const offset = i < hoveredIdx ? -160 : 160;
        gsap.to(card, {
          transform: pushTransform(transforms[i], offset),
          duration: 0.4,
          delay: Math.abs(i - hoveredIdx) * 0.05,
          ease: 'back.out(1.4)'
        });
      }
    });
  };

  const resetSiblings = () => {
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      gsap.to(q(`.card-${i}`), {
        transform: transforms[i],
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.4)'
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`bounceCardsContainer ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx}`}
          style={{ transform: transforms[idx] }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className="image" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
}
