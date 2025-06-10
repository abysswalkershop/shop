"use client"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"

const Hero = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const nodes = [
    { id: 1, category: "The App", href: "app", x: "20%", y: "30%", image: "/ZincHome.png" },
    { id: 2, category: "The Implants", href: "implants", x: "70%", y: "25%", image: "/LodestoneHome.png" },
    { id: 3, category: "The Merch", href: "merch", x: "45%", y: "70%", image: "/Silouhette.png" }
  ]

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden">
      {/* Node Graph Background */}
      <div className="absolute inset-0">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Line from node 1 to node 2 */}
          <line
            x1="20%"
            y1="30%"
            x2="70%"
            y2="25%"
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Line from node 2 to node 3 */}
          <line
            x1="70%"
            y1="25%"
            x2="45%"
            y2="70%"
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Line from node 3 to node 1 */}
          <line
            x1="45%"
            y1="70%"
            x2="20%"
            y2="30%"
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <LocalizedClientLink
            href={`/category/${node.href}`}
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: node.x,
              top: node.y,
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