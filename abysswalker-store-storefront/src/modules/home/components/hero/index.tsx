"use client"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect } from "react"

const Hero = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [nodePositions, setNodePositions] = useState([
    { id: 1, category: "The App", href: "app", baseX: 20, baseY: 30, currentX: 20, currentY: 30, image: "/ZincHome.png" },
    { id: 2, category: "The Implants", href: "implants", baseX: 70, baseY: 25, currentX: 70, currentY: 25, image: "/LodestoneHome.png" },
    { id: 3, category: "The Merch", href: "merch", baseX: 45, baseY: 70, currentX: 45, currentY: 70, image: "/Silouhette.png" }
  ])

  useEffect(() => {
    const floatAnimation = () => {
      setNodePositions(prevPositions =>
        prevPositions.map(node => ({
          ...node,
          currentX: node.baseX + Math.sin(Date.now() * 0.0003 + node.id) * 3,
          currentY: node.baseY + Math.cos(Date.now() * 0.0006 + node.id) * 2
        }))
      )
    }

    const interval = setInterval(floatAnimation, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden">
      {/* Node Graph Background */}
      <div className="absolute inset-0">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Line from node 1 to node 2 */}
          <line
            x1={`${nodePositions[0].currentX}%`}
            y1={`${nodePositions[0].currentY}%`}
            x2={`${nodePositions[1].currentX}%`}
            y2={`${nodePositions[1].currentY}%`}
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Line from node 2 to node 3 */}
          <line
            x1={`${nodePositions[1].currentX}%`}
            y1={`${nodePositions[1].currentY}%`}
            x2={`${nodePositions[2].currentX}%`}
            y2={`${nodePositions[2].currentY}%`}
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Line from node 3 to node 1 */}
          <line
            x1={`${nodePositions[2].currentX}%`}
            y1={`${nodePositions[2].currentY}%`}
            x2={`${nodePositions[0].currentX}%`}
            y2={`${nodePositions[0].currentY}%`}
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>

        {/* Nodes */}
        {nodePositions.map((node) => (
          <LocalizedClientLink
            href={`/categories/${node.href}`}
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-75 ease-out"
            style={{
              left: `${node.currentX}%`,
              top: `${node.currentY}%`,
              zIndex: 2,
              perspective: "1000px"
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className="relative w-20 h-20 transition-transform duration-500 preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                transform: hoveredNode === node.id ? "rotateX(180deg)" : "rotateX(0deg)"
              }}
            >
              {/* Front face - Image */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-700 backface-hidden overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img
                  src={node.image}
                  alt={`Node ${node.id}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Back face - Category text */}
              <div
                className="absolute inset-0 w-full h-full rounded-xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-700 backface-hidden flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)"
                }}
              >
                <span className="text-white text-sm font-medium text-center px-2">
                  {node.category}
                </span>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            Abysswalker
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            The LODESTONE ecosystem
          </Heading>
        </span>
        <InteractiveLink href="/store" prefetch>Shop now</InteractiveLink>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}

export default Hero