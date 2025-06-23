import Image from "next/image";

export default function ShowCaseBarGlow() {
    const showcaseItems = [
        { id: 1, src: "/showcase/glow/1.jpg", alt: "Glow 1" },
        { id: 2, src: "/showcase/glow/2.jpg", alt: "Glow 2" },
        { id: 3, src: "/showcase/glow/3.jpg", alt: "Glow 3" },
        { id: 4, src: "/showcase/glow/5.jpg", alt: "Glow 4" },
        { id: 5, src: "/showcase/glow/5.jpg", alt: "Glow 5" },
        { id: 6, src: "/showcase/glow/3.jpg", alt: "Glow 6" },
    ];

    return (
        <div className="h-64 w-full border-b border-abyss-dark-accent overflow-hidden relative">
            <div
                className="flex animate-scroll-infinite"
                style={{
                    width: `${showcaseItems.length * 320 * 2}px` // Total width of both sets
                }}
            >
                {/* First set of images */}
                {showcaseItems.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-80 h-64 relative group">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="320px"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {showcaseItems.map((item) => (
                    <div key={`duplicate-${item.id}`} className="flex-shrink-0 w-80 h-64 relative group">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="320px"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}