"use client"
import { gsap } from "gsap";
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect, useRef } from "react"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nodePositions = [
    {
      id: 1,
      category: "The App",
      href: "app",
      baseX: isMobile ? 60 : 75,
      baseY: isMobile ? 25 : 30,
      image: "/ZincHome.png"
    },
    {
      id: 2,
      category: "The Implants",
      href: "biohacking",
      baseX: 85,
      baseY: isMobile ? 15 : 25,
      image: "/Magnets.png"
    },
    {
      id: 3,
      category: "The Devices",
      href: "devices",
      baseX: isMobile ? 75 : 80,
      baseY: isMobile ? 65 : 70,
      image: "/LodestoneHome.png"
    }
  ];

  // Function to update line positions
  const updateLines = () => {
    const svg = svgRef.current
    const nodes = nodesRef.current
    const lines = linesRef.current

    if (!svg || !nodes.every(node => node) || !lines.every(line => line)) return

    const svgRect = svg.getBoundingClientRect()

    nodes.forEach((node, index) => {
      if (node) {
        const nodeRect = node.getBoundingClientRect()
        const nodeCenterX = nodeRect.left + nodeRect.width / 2 - svgRect.left
        const nodeCenterY = nodeRect.top + nodeRect.height / 2 - svgRect.top

        // Update lines connected to this node
        if (index === 0) { // Node 1
          // Line from node 1 to node 2
          if (lines[0]) {
            lines[0].setAttribute('x1', nodeCenterX.toString())
            lines[0].setAttribute('y1', nodeCenterY.toString())
          }
          // Line from node 3 to node 1
          if (lines[2]) {
            lines[2].setAttribute('x2', nodeCenterX.toString())
            lines[2].setAttribute('y2', nodeCenterY.toString())
          }
        } else if (index === 1) { // Node 2
          // Line from node 1 to node 2
          if (lines[0]) {
            lines[0].setAttribute('x2', nodeCenterX.toString())
            lines[0].setAttribute('y2', nodeCenterY.toString())
          }
          // Line from node 2 to node 3
          if (lines[1]) {
            lines[1].setAttribute('x1', nodeCenterX.toString())
            lines[1].setAttribute('y1', nodeCenterY.toString())
          }
        } else if (index === 2) { // Node 3
          // Line from node 2 to node 3
          if (lines[1]) {
            lines[1].setAttribute('x2', nodeCenterX.toString())
            lines[1].setAttribute('y2', nodeCenterY.toString())
          }
          // Line from node 3 to node 1
          if (lines[2]) {
            lines[2].setAttribute('x1', nodeCenterX.toString())
            lines[2].setAttribute('y1', nodeCenterY.toString())
          }
        }
      }
    })
  }

  useEffect(() => {
    if (!heroRef.current || !particlesRef.current || !contentRef.current) return;

    const container = heroRef.current;
    const nodes = nodesRef.current;
    const lines = linesRef.current;
    const content = contentRef.current;

    // Create glow powder particles
    const particles: HTMLDivElement[] = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full pointer-events-none';

      // Random sizes and aqua colors for glow powder effect
      const size = Math.random() * 10 + 3;
      const opacity = Math.random() * 0.8 + 0.3;
      const hue = Math.random() * 40 + 170; // Aqua/cyan range

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = `hsl(${hue}, 85%, 65%)`;
      particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 85%, 65%), 0 0 ${size * 4}px hsl(${hue}, 85%, 65%, 0.3)`;
      particle.style.opacity = opacity.toString();

      // Starting positions from left side
      const startX = -100 - Math.random() * 100;
      const startY = Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.3;

      gsap.set(particle, {
        x: startX,
        y: startY,
        scale: 0,
        rotation: Math.random() * 360
      });

      particlesRef.current!.appendChild(particle);
      particles.push(particle);
    }

    // Create main timeline
    const tl = gsap.timeline();
    let nodeAnimationComplete = 0;

    // Animate glow powder from left (stopping at ~1/3 of screen)
    particles.forEach((particle, index) => {
      const endX = Math.random() * (window.innerWidth * (window.innerWidth < 768 ? 0.5 : 0.33)) + 50;
      const endY = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1;
      const duration = Math.random() * 1.5 + 1;
      const delay = Math.random() * 0.8;

      tl.to(particle, {
        x: endX,
        scale: 1,
        rotation: Math.random() * 360 + 180,
        duration: duration,
        ease: "power2.out",
        delay: delay
      }, 0)
        .to(particle, {
          y: endY - 80,
          duration: duration * 0.4,
          ease: "power2.out",
          delay: delay
        }, 0)
        .to(particle, {
          y: endY,
          duration: duration * 0.6,
          ease: "power2.in",
          delay: delay + duration * 0.4
        }, 0)
        // Keep particles floating
        .to(particle, {
          y: `+=${Math.random() * 15 - 7.5}`,
          x: `+=${Math.random() * 20 - 10}`,
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: duration + delay + 0.3
        }, 0);
    });    // Animate nodes from right side (stopping at ~2/3 of screen on desktop, ~1/2 on mobile)
    nodes.forEach((node, index) => {
      if (node) {
        // Start nodes from right side, off-screen
        const startX = window.innerWidth + 100;

        gsap.set(node, {
          x: startX,
          scale: 0,
          opacity: 0,
          rotation: Math.random() * 360
        });

        tl.to(node, {
          x: 0, // Reset to use CSS positioning
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.5 + index * 0.15,
          onComplete: () => {
            nodeAnimationComplete++;
            // Only start line animations when ALL nodes are done
            if (nodeAnimationComplete === nodes.length) {
              updateLines();
              // Animate lines after all nodes are positioned
              lines.forEach((line, lineIndex) => {
                if (line) {
                  gsap.set(line, { strokeDasharray: "5,5", strokeDashoffset: 100, opacity: 0 });
                  gsap.to(line, {
                    strokeDashoffset: 0,
                    opacity: 0.3,
                    duration: 1,
                    ease: "power2.out",
                    delay: lineIndex * 0.1
                  });
                }
              });
            }
          }
        }, 0);
      }
    });

    // Animate main content
    tl.fromTo(content, {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      delay: 0.8
    }, 0);

    // Continuous floating animation for nodes
    setTimeout(() => {
      nodes.forEach((node, index) => {
        if (node) {
          const floatRadius = 15 + Math.random() * 10;

          gsap.to(node, {
            x: `+=${Math.sin(Date.now() * 0.001 + index) * floatRadius}`,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
            onUpdate: updateLines
          });

          gsap.to(node, {
            y: `+=${Math.cos(Date.now() * 0.0008 + index * 1.5) * (floatRadius * 0.8)}`,
            duration: 4 + Math.random() * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
            onUpdate: updateLines
          });
        }
      });
    }, 2500); // Slightly longer delay to ensure lines are drawn first

    // Handle resize
    const handleResize = () => {
      updateLines();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNodeHover = (nodeId: number, isEntering: boolean) => {
    const node = nodesRef.current[nodeId - 1];
    if (!node) return;

    gsap.to(node.querySelector('.node-container'), {
      rotationY: isEntering ? 180 : 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    gsap.to(node, {
      scale: isEntering ? 1.1 : 1,
      duration: 0.2,
      ease: "power2.out",
      onUpdate: updateLines
    });
  };

  return (
    <div
      ref={heroRef}
      className="h-[75vh] w-full border-b border-abyss-dark-accent relative bg-abyss-background overflow-hidden"
    >
      {/* Glow Powder Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Node Graph (Right Side) */}
      <div className="absolute inset-0 z-20">
        {/* Connection Lines */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full">
          <line
            ref={el => { if (el) linesRef.current[0] = el }}
            x1={0} y1={0} x2={0} y2={0}
            stroke="#0ed5a7" strokeWidth="1"
          />
          <line
            ref={el => { if (el) linesRef.current[1] = el }}
            x1={0} y1={0} x2={0} y2={0}
            stroke="#0ed5a7" strokeWidth="1"
          />
          <line
            ref={el => { if (el) linesRef.current[2] = el }}
            x1={0} y1={0} x2={0} y2={0}
            stroke="#0ed5a7" strokeWidth="1"
          />
        </svg>

        {/* Nodes */}
        {nodePositions.map((node, index) => (
          <div
            key={node.id}
            ref={el => { nodesRef.current[index] = el }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${node.baseX}%`,
              top: `${node.baseY}%`,
              zIndex: 2,
              perspective: "1000px"
            }}
          >
            <LocalizedClientLink
              href={`/categories/${node.href}`}
              onMouseEnter={() => handleNodeHover(node.id, true)}
              onMouseLeave={() => handleNodeHover(node.id, false)}
            >
              <div
                className="node-container relative w-16 h-16"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 w-full h-full p-2 rounded-full shadow-lg overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "radial-gradient(circle, #005557 40%, #141b22)"
                  }}
                >
                  <img
                    src={node.image}
                    alt={`${node.category}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0 w-full h-full p-2 rounded-full shadow-lg flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "radial-gradient(circle, #0ed5a7, #00cbd0)"
                  }}
                >
                  <span className="text-abyss-text-dark text-xs font-medium text-center px-1">
                    {node.category}
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center items-center text-center small:p-32 gap-6 z-30"
      >
        <span>
          <Heading
            level="h1"
            className="text-5xl md:text-6xl leading-20 pt-1 pb-3 font-normal bg-gradient-to-r from-abyss-medium-accent to-abyss-light-accent bg-clip-text text-transparent"
          >
            ABYSS WALKER
          </Heading>
          <Heading
            level="h1"
            className="text-lg leading-10 text-abyss-text-light font-thin"
          >
            EXPERIENCE BIOHACKING
          </Heading>
        </span>
        <LocalizedClientLink href="/store" prefetch className="p-4 shadow-xl border border-abyss-dark-accent rounded-full text-abyss-text-light hover:bg-abyss-dark-accent">Shop now</LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero