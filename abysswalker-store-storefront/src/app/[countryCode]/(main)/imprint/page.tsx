export default function ImprintPage() {
    return (
        <div className="text-ui-fg-base max-w-3xl mx-auto bg-white p-6 md:p-8 mt-8 mb-8 rounded-md">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Imprint</h1>
            <hr className="border-gray-300 mb-6" />
            <p className="mb-4 text-center text-sm text-gray-600">(Legal Notice)</p>

            <p className="mb-6">
                Information according to Section 5 Telemedia Act (TMG).
            </p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Service Provider / Operator:</h2>
                <p className="mb-1 text-gray-700"><strong>EI Abyss Walker</strong></p>
                <p className="mb-1 text-gray-700">Axel Fougues</p>
                <p className="mb-1 text-gray-700">39 rue Victor Hugo</p>
                <p className="mb-1 text-gray-700">Fort-de-France, 97200</p>
                <p className="mb-1 text-gray-700">France/Martinique</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact:</h2>
                <p className="mb-1 text-gray-700">Email: <a href="mailto:contact@abysswalker.org" className="text-blue-600 hover:underline">contact@abysswalker.org</a></p>
                <p className="text-gray-700">Website: https://abysswalker.org</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Legal Information (if applicable):</h2>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li className="mb-2">
                        <strong>Commercial Register:</strong>
                        Commercial Register No.: 98040526000012, Registered at: Fort de France Martinique
                        <span className="text-sm text-gray-500">EI</span>
                    </li>
                    <li className="mb-2">
                        <strong>VAT ID:</strong>
                        <span className="text-sm text-gray-500">NA</span>
                    </li>
                    <li className="mb-2">
                        <div className="mb-2">
                            <strong>Dispute Resolution:</strong>
                            <p className="mb-1">The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr</a></p>
                            <p className="mb-1">We are not obliged or willing to participate in dispute settlement proceedings before a consumer arbitration board.</p>
                        </div>
                    </li>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer:</h2>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Content Liability</h3>
                        <p className="mb-4 text-gray-700">
                            As a service provider, we are responsible for our own content on these pages in accordance with general laws. However, as a service provider, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information in accordance with general laws remain unaffected by this. Liability in this regard is only possible from the point in time at which a specific infringement becomes known. Should we become aware of any corresponding infringements, we will remove this content immediately.
                        </p>

                        <h3 className="text-lg font-medium text-gray-800 mb-2">Link Liability</h3>
                        <p className="mb-4 text-gray-700">
                            Our offering contains links to external websites of third parties, the content of which we have no influence on. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. A permanent control of the content of the linked pages is not reasonable without concrete evidence of a violation of the law. Should we become aware of any infringements, we will remove such links immediately.
                        </p>

                        <h3 className="text-lg font-medium text-gray-800 mb-2">Copyright</h3>
                        <p className="mb-4 text-gray-700">
                            The content and works created by the site operators on these pages are subject to copyright. The duplication, processing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, we ask for a corresponding notification. Should we become aware of any infringements, we will remove such content immediately.
                        </p>
                    </div>
                </ul>
            </div>
        </div>
    );
}