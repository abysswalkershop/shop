export default function ContactPage() {
    return (
        <div className="text-ui-fg-base max-w-3xl mx-auto bg-white p-6 md:p-8 mt-8 mb-8 text-black rounded-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Contact
            </h1>

            <hr className="border-gray-300 mb-6" />
            <p className="text-lg text-gray-700 mb-4">
                If you have any questions or need assistance, please reach out to us.
            </p>
            <p className="text-lg text-gray-700 mb-4">
                You can contact us via email at <a href="mailto:contact@abysswalker.org" className="text-blue-600 hover:underline">contact@abysswalker.org</a>, via phone at <a href="tel:+16893022977" className="text-blue-600 hover:underline">+168930ABYSS (+16893022977)</a> or through our social media channels.
            </p>

        </div>
    );
}