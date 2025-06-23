"use client"
import { gsap } from "gsap";
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/all";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LodeStoneHero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const nodesRef = useRef<(HTMLDivElement | null)[]>([])
    const linesRef = useRef<SVGLineElement[]>([])
    const contentRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsLandscape(window.innerWidth < 768 || window.innerHeight < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nodePositions = [
        { id: 1, category: "The App", href: "app", baseX: 20, baseY: 30, image: "/ZincHome.png" },
        { id: 2, category: "The Implants", href: "biohacking", baseX: 70, baseY: 25, image: "/Magnets.png" },
        { id: 3, category: "The Devices", href: "devices", baseX: isLandscape ? 25 : 45, baseY: 70, image: "/LodestoneHome.png" }
    ]

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
        const container = containerRef.current
        const nodes = nodesRef.current
        const lines = linesRef.current
        const content = contentRef.current

        if (!container || !content) return

        // Create GSAP timeline for initial animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                once: true, // Only trigger once
            }
        })

        // Animate content entrance
        tl.fromTo(content,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        )

        // Animate nodes entrance
        nodes.forEach((node, index) => {
            if (node) {
                gsap.set(node, { scale: 0, opacity: 0 })
                tl.to(node, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    delay: index * 0.2,
                    onComplete: () => {
                        // Update lines after each node appears
                        updateLines()
                    }
                }, 0.3)
            }
        })

        // Animate lines entrance
        lines.forEach((line, index) => {
            if (line) {
                gsap.set(line, { strokeDasharray: "5,5", strokeDashoffset: 100, opacity: 0 })
                tl.to(line, {
                    strokeDashoffset: 0,
                    opacity: 0.4,
                    duration: 1,
                    ease: "power2.out",
                    delay: index * 0.1
                }, 0.8)
            }
        })

        // Continuous floating animation for nodes
        nodes.forEach((node, index) => {
            if (node) {
                const floatRadius = 20 + Math.random() * 15

                // X-axis floating
                gsap.to(node, {
                    x: `+=${Math.sin(Date.now() * 0.001 + index) * floatRadius}`,
                    duration: 3 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.3,
                    onUpdate: updateLines
                })

                gsap.to(node, {
                    y: `+=${Math.cos(Date.now() * 0.0008 + index * 1.5) * (floatRadius * 0.8)}`,
                    duration: 4 + Math.random() * 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.2,
                    onUpdate: updateLines
                })

                // Add rotation
                gsap.to(node, {
                    rotation: `+=${Math.random() - 5}`,
                    duration: 4 + index * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.2
                })
            }
        })

        // Initial line positioning
        setTimeout(updateLines, 100)

        // Update lines on window resize
        const handleResize = () => {
            updateLines()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleNodeHover = (nodeId: number, isEntering: boolean) => {
        const node = nodesRef.current[nodeId - 1]
        if (!node) return

        gsap.to(node.querySelector('.node-container'), {
            rotationX: isEntering ? 180 : 0,
            duration: 0.4,
            ease: "power2.inOut"
        })

        gsap.to(node, {
            scale: isEntering ? 1.1 : 1,
            duration: 0.2,
            ease: "power2.out",
            onUpdate: updateLines // Update lines during hover animation
        })
    }

    return (
        <div
            ref={containerRef}
            className="h-[75vh] w-full border-b border-abyss-dark-accent relative bg-abyss-background overflow-hidden"
        >
            {/* Node Graph Background */}
            <div className="absolute inset-0">
                {/* Connection Lines */}
                <svg ref={svgRef} className="absolute inset-0 w-full h-full">
                    {/* Line from node 1 to node 2 */}
                    <line
                        ref={el => { if (el) linesRef.current[0] = el }}
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={0}
                        stroke="#0ed5a7"
                        strokeWidth="1"
                    />
                    {/* Line from node 2 to node 3 */}
                    <line
                        ref={el => { if (el) linesRef.current[1] = el }}
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={0}
                        stroke="#0ed5a7"
                        strokeWidth="1"
                    />
                    {/* Line from node 3 to node 1 */}
                    <line
                        ref={el => { if (el) linesRef.current[2] = el }}
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={0}
                        stroke="#0ed5a7"
                        strokeWidth="1"
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
                                className="node-container relative w-20 h-20"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front face - Image */}
                                <div
                                    className="absolute inset-0 w-full h-full p-3 rounded-full shadow-lg overflow-hidden"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        background: "radial-gradient(circle, #005557 40%, #141b22)"
                                    }}
                                >
                                    <img
                                        src={node.image}
                                        alt={`Node ${node.id}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Back face - Category text */}
                                <div
                                    className="absolute inset-0 w-full h-full p-2 rounded-full shadow-lg flex items-center justify-center"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateX(180deg)",
                                        background: "radial-gradient(circle, #0ed5a7, #00cbd0)"
                                    }}
                                >
                                    <span className="text-abyss-text-dark text-sm font-medium text-center px-2">
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
                className="absolute inset-0 flex flex-col justify-center items-center text-center small:p-32 gap-6"
            >
                <span>
                    <Heading
                        level="h1"
                        className="text-3xl leading-10 text-abyss-text-light font-thin"
                    >
                        THE
                    </Heading>
                    <Heading
                        level="h2"
                        className="text-5xl leading-10 bg-gradient-to-r from-abyss-medium-accent to-abyss-light-accent bg-clip-text text-transparent font-bold"
                    >
                        LODESTONE
                    </Heading>
                    <Heading
                        level="h1"
                        className="text-3xl leading-10 text-abyss-text-light font-thin"
                    >
                        ECOSYSTEM
                    </Heading>
                </span>
                <InteractiveLink href="/store" prefetch>Shop now</InteractiveLink>
            </div>
        </div>
    )
}

export default LodeStoneHero