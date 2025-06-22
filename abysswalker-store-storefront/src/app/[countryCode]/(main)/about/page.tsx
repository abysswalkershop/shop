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
                <div className="flex flex-col items-center shadow-xl p-5 m-5 rounded-lg bg-abyss-dark-accent md:w-1/4">
                    <Image width={1024} height={1024} src={"/placeholder.png"} alt="Profile Image" className="rounded-full w-1/3"></Image>
                    <h3 className="text-xl text-abyss-text-light text-center font-semibold">Merlin</h3>
                    <h4 className="text-sm text-abyss-text-light text-center">aka. Merlin</h4>
                    <p className="text-abyss-text-light mt-5 text-center">Merlin is a vital member of our team, bringing [X years]
                        of experience in [specific field/skill]. They are passionate about
                        [key passion related to work] and dedicated to [a key contribution or goal, e.g., delivering exceptional results, fostering innovation].</p>
                </div>
                <div className="flex flex-col items-center shadow-xl p-5 m-5 rounded-lg bg-abyss-dark-accent md:w-1/4">
                    <Image width={1024} height={1024} src={"/placeholder.png"} alt="Profile Image" className="rounded-full w-1/3"></Image>
                    <h3 className="text-xl text-abyss-text-light text-center font-semibold">Axel Fougues</h3>
                    <h4 className="text-sm text-abyss-text-light text-center">aka. AxelF</h4>
                    <p className="text-abyss-text-light mt-5 text-center">AxelF is a vital member of our team, bringing [X years]
                        of experience in [specific field/skill]. They are passionate about
                        [key passion related to work] and dedicated to [a key contribution or goal, e.g., delivering exceptional results, fostering innovation].</p>
                </div>
                <div className="flex flex-col items-center shadow-xl p-5 m-5 rounded-lg bg-abyss-dark-accent md:w-1/4">
                    <Image width={1024} height={1024} src={"/placeholder.png"} alt="Profile Image" className="rounded-full w-1/3"></Image>
                    <h3 className="text-xl text-abyss-text-light text-center font-semibold">Joogle</h3>
                    <h4 className="text-sm text-abyss-text-light text-center">aka. Joogle</h4>
                    <p className="text-abyss-text-light mt-5 text-center">Joogle is a vital member of our team, bringing [X years]
                        of experience in [specific field/skill]. They are passionate about
                        [key passion related to work] and dedicated to [a key contribution or goal, e.g., delivering exceptional results, fostering innovation].</p>
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