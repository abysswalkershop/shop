import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="text-ui-fg-base m-5 flex flex-col items-center">
            <h1 className="text-abyss-text-light text-5xl">About Us</h1>
            <p className="text-abyss-text-light max-w-3xl my-5 text-center">The Abyss Walker biohacking shop was born from a collaboration between Merlin and Axel
                in an effort to bring back essential biohacking products that had been off the market for too long due to sourcing and manufacturing difficulties.
                Since then, more team members have joined us, and we've built a collection of popular biohacking products, tools, and merch.
                We strive to keep an experimental and cutting-edge mindset that reflects the grinder community's values.
                Most of our projects and products are a direct result of community collaboration and research, and we do our best to support and facilitate new and innovative ideas.</p>
            <h2 className="text-abyss-text-light text-3xl">The Team</h2>
            <div className="flex flex-col md:flex-row items-center justify-evenly">
                <div className="flex flex-col items-center shadow-xl p-5 m-5 rounded-lg bg-abyss-dark-accent md:w-1/4 min-h-96">
                    <Image width={1024} height={1024} src={"/merlin.jpg"} alt="Profile Image" className="rounded-full w-1/3"></Image>
                    <h3 className="text-xl text-abyss-text-light text-center font-semibold">Merlin</h3>
                    <h4 className="text-sm text-abyss-text-light text-center">aka. 🦆</h4>
                    <p className="text-abyss-text-light mt-5 text-center">Merlin is Abyss Walker's resident research and development expert and product producer and distributor within the EU.
                        They enjoy wilderness, excursions and experimentation.</p>
                </div>
                <div className="flex flex-col items-center shadow-xl p-5 m-5 rounded-lg bg-abyss-dark-accent md:w-1/4 min-h-96">
                    <Image width={1024} height={1024} src={"/axel.jpg"} alt="Profile Image" className="rounded-full w-1/3"></Image>
                    <h3 className="text-xl text-abyss-text-light text-center font-semibold">Axel Fougues</h3>
                    <h4 className="text-sm text-abyss-text-light text-center">aka. AxelF</h4>
                    <p className="text-abyss-text-light mt-5 text-center">Axel is the founder and coordinator of Abyss Walker and an adventurous tinkerer, developer and biohacker.
                        Fascinated with haptics and sensory manipulation, he's known for the LODESTONE ecosystem.
                        A set of gadgets, implants and android app, to explore the full extent of subdermal magnetic implants.</p>
                </div>
                <div className="flex flex-col items-center shadow-xl p-5 m-5 rounded-lg bg-abyss-dark-accent md:w-1/4 min-h-96">
                    <Image width={1024} height={1024} src={"/joogle.png"} alt="Profile Image" className="rounded-full w-1/3"></Image>
                    <h3 className="text-xl text-abyss-text-light text-center font-semibold">Jeff</h3>
                    <h4 className="text-sm text-abyss-text-light text-center">aka. Joogle</h4>
                    <p className="text-abyss-text-light mt-5 text-center">Jeff is the North America producer and distributor for Abyss Walker.
                        A data management expert by trade, he finds joy and fascination in experimenting with new technologies and methods for augmenting the human experience.</p>
                </div>
            </div>
            <a className="bg-abyss-dark-accent py-2 m-5 rounded-lg shadow-xl flex flex-row items-center justify-center md:w-1/4" href="https://gametec-live.com" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/66077766" alt="GameTec_live" className="rounded-full w-1/12 mr-5" />
                <div>
                    <h3 className="text-lg">GameTec_live</h3>
                    <p className="text-sm">Im just the dev and IT guy, dont look at me?</p>
                </div>
            </a>
        </div>
    );
}