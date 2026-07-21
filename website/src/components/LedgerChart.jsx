import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LedgerChart({ type = 'ledger' }) {
  const svgRef = useRef(null);
  // We use a callback ref to handle multiple paths and circles
  const setSvgRef = (el) => {
    svgRef.current = el;
    if (!el) return;
    
    const paths = el.querySelectorAll('.draw-path');
    const nodes = el.querySelectorAll('.draw-node');

    // Prepare paths for drawing
    paths.forEach(p => {
      const length = p.getTotalLength();
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    });

    // Prepare nodes (dots) for popping in
    gsap.set(nodes, { scale: 0, transformOrigin: "center", opacity: 0 });

    // Animate on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 1,
      }
    });

    tl.to(paths, { strokeDashoffset: 0, duration: 2, ease: "none" })
      .to(nodes, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=1");
  };

  return (
    <div className="ledger-chart-wrapper" style={{ width: '100%', maxWidth: '900px', margin: '3rem auto', overflow: 'hidden' }}>
      <svg
        ref={setSvgRef}
        viewBox="0 0 800 400"
        style={{
          width: '100%',
          height: 'auto',
          border: '1px solid rgba(142, 138, 131, 0.3)',
          backgroundColor: 'rgba(250, 247, 242, 0.5)',
          borderRadius: '8px',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
        }}
      >
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(142, 138, 131, 0.2)" strokeWidth="1"/>
        </pattern>
        <rect width="800" height="400" fill="url(#grid)" />
        
        
        {type === 'network' ? (
          <g stroke="var(--red)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Investigative String Board / Network */}
            <path className="draw-path" d="M 400 200 L 250 120 L 150 250 L 400 200" />
            <path className="draw-path" d="M 400 200 L 550 100 L 680 220 L 400 200" />
            <path className="draw-path" d="M 400 200 L 450 320 L 280 340 L 400 200" />
            <path className="draw-path" d="M 250 120 L 550 100" strokeDasharray="4 6" opacity="0.6" />
            <path className="draw-path" d="M 150 250 L 280 340" strokeDasharray="4 6" opacity="0.6" />
            <path className="draw-path" d="M 680 220 L 450 320" strokeDasharray="4 6" opacity="0.6" />
            
            {/* Nodes */}
            <circle className="draw-node" cx="400" cy="200" r="8" fill="var(--red)" />
            <circle className="draw-node" cx="250" cy="120" r="5" fill="var(--ink)" stroke="none" />
            <circle className="draw-node" cx="150" cy="250" r="5" fill="var(--ink)" stroke="none" />
            <circle className="draw-node" cx="550" cy="100" r="5" fill="var(--ink)" stroke="none" />
            <circle className="draw-node" cx="680" cy="220" r="5" fill="var(--ink)" stroke="none" />
            <circle className="draw-node" cx="450" cy="320" r="5" fill="var(--ink)" stroke="none" />
            <circle className="draw-node" cx="280" cy="340" r="5" fill="var(--ink)" stroke="none" />
            
            {/* Faux labels */}
            <rect x="360" y="150" width="80" height="20" rx="3" fill="var(--amber)" opacity="0.2" />
            <path className="draw-path" d="M 370 160 L 430 160" stroke="var(--ink)" strokeWidth="2" opacity="0.5" />
          </g>
        ) : (
          <g stroke="var(--red)" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* X/Y Axes */}
            <path className="draw-path" d="M 100 50 L 100 350 L 750 350" stroke="var(--ink)" strokeWidth="1" opacity="0.4" />
            
            {/* Financial Trend Lines */}
            <path className="draw-path" d="M 100 300 L 200 280 L 300 220 L 400 240 L 500 150 L 600 180 L 700 80" />
            <path className="draw-path" d="M 100 330 L 200 310 L 300 320 L 400 280 L 500 290 L 600 200 L 700 180" stroke="var(--amber)" strokeWidth="2" strokeDasharray="5 5" />
            
            {/* Data Points */}
            <circle className="draw-node" cx="300" cy="220" r="4" fill="var(--cream)" stroke="var(--red)" strokeWidth="2" />
            <circle className="draw-node" cx="500" cy="150" r="4" fill="var(--cream)" stroke="var(--red)" strokeWidth="2" />
            <circle className="draw-node" cx="700" cy="80" r="6" fill="var(--red)" />
            
            {/* Faux Annotation */}
            <path className="draw-path" d="M 680 70 Q 650 40 600 50" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 3" />
            <rect x="520" y="35" width="70" height="15" rx="2" fill="var(--ink)" opacity="0.1" />
            <path className="draw-path" d="M 530 42 L 580 42" stroke="var(--ink)" strokeWidth="1.5" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
}