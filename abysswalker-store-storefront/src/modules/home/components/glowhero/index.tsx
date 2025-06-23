"use client"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect, useRef } from "react"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GlowHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!heroRef.current || !particlesRef.current) return;

        // Create particles
        const particles: HTMLDivElement[] = [];
        const particleCount = 60;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle absolute rounded-full pointer-events-none';

            // Random sizes and aqua colors for glow powder effect
            const size = Math.random() * 12 + 3;
            const opacity = Math.random() * 0.9 + 0.3;
            const hue = Math.random() * 40 + 170; // Aqua/cyan range (170-210)

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `hsl(${hue}, 85%, 65%)`;
            particle.style.boxShadow = `0 0 ${size * 3}px hsl(${hue}, 85%, 65%), 0 0 ${size * 6}px hsl(${hue}, 85%, 65%, 0.3)`;
            particle.style.opacity = opacity.toString();

            // Starting positions from left side (like throwing from a bag)
            const startX = -100 - Math.random() * 100; // Start from left off-screen
            const startY = Math.random() * window.innerHeight * 0.4 + window.innerHeight * 0.3; // Mid-left area

            gsap.set(particle, {
                x: startX,
                y: startY,
                scale: 0,
                rotation: Math.random() * 360
            });

            particlesRef.current!.appendChild(particle);
            particles.push(particle);
        }

        // Create the throw animation from left side
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top 80%",
                end: "bottom 20%",
                once: true, // Only trigger once
            }
        });

        particles.forEach((particle, index) => {
            // Arc trajectory from left to right across screen
            const endX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
            const endY = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
            const duration = Math.random() * 1.5 + 1.2;
            const delay = Math.random() * 1.2;

            // Create arc motion using separate x and y animations
            tl.to(particle, {
                x: endX,
                scale: 1,
                rotation: Math.random() * 360 + 180,
                duration: duration,
                ease: "power2.out",
                delay: delay
            }, 0)
                .to(particle, {
                    y: endY - 100, // Go up first (arc peak)
                    duration: duration * 0.4,
                    ease: "power2.out",
                    delay: delay
                }, 0)
                .to(particle, {
                    y: endY, // Then come down
                    duration: duration * 0.6,
                    ease: "power2.in",
                    delay: delay + duration * 0.4
                }, 0)
                // Keep particles visible with gentle floating motion
                .to(particle, {
                    y: `+=${Math.random() * 20 - 10}`,
                    x: `+=${Math.random() * 30 - 15}`,
                    duration: 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: duration + delay + 0.5
                }, 0);
        });

        // Text animation with slight delay after powder starts
        tl.fromTo(".hero-title", {
            opacity: 0,
            y: 50,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.8
        }, 0)
            .fromTo(".hero-link", {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 1.5
            }, 0);

        // Cleanup function
        return () => {
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={heroRef}
            className="h-[75vh] w-full border-b border-abyss-dark-accent relative bg-abyss-background overflow-hidden"
        >
            {/* Particles container */}
            <div
                ref={particlesRef}
                className="absolute inset-0 z-10 pointer-events-none"
            />

            {/* Hero Content */}
            <div
                className="absolute inset-0 flex flex-col justify-center items-center text-center small:p-32 gap-6"
            >
                <span>
                    <Heading
                        level="h1"
                        className="text-3xl leading-10 text-abyss-text-light font-thin"
                    >
                        DISCOVER
                    </Heading>
                    <Heading
                        level="h2"
                        className="text-5xl leading-10 bg-gradient-to-r from-abyss-medium-accent to-abyss-light-accent bg-clip-text text-transparent font-bold"
                    >
                        GLOW POWDER
                    </Heading>
                    <Heading
                        level="h1"
                        className="text-3xl leading-10 text-abyss-text-light font-thin"
                    >
                        BODYART
                    </Heading>
                </span>
                <InteractiveLink href="/store" prefetch>Shop now</InteractiveLink>
            </div>
        </div>
    )
}

export default GlowHero