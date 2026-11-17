import { useEffect, useState } from "react";
import { getOffres } from "../services/offresService.js";
import BarreRecherche from "../components/BarreRecherche.jsx"

export default function AccueilPage() {
    const [offers, setOffers] = useState([]);
    const latestCount = 10; // les 10 dernières offres, pas de pagination ici

    useEffect(() => {
        getOffres()
            .then(data => setOffers(data))
            .catch(error => console.error(error));
    }, []);

    const latest = offers.slice(0, latestCount);

    return (
        <div className="container mt-4">
            <header className="banner text-center text-white py-4">
                <h1 className="text-uppercase fw-bold">Au Boulot !</h1>
                <p className="fst-italic mb-0">
                    La plateforme qui te met un coup de pied aux fesses !
                </p>
            </header>

            <BarreRecherche />

            <h2 className="rubrique mt-4">Dernières offres</h2>

            <div className="track overflow-auto pb-3">
                <div className="lane d-flex gap-3">
                    {latest.map(offre => (
                        <OfferCard key={offre.id} offer={offre} />
                    ))}
                </div>
            </div>
        </div>
    );
}