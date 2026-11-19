import { MemoryRouter } from "react-router-dom";
import OffreCarte from "../../components/OffreCarte.jsx";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

//TEST UNITAIRE DE RENDU DE COMPOSANT
test("le lien de navigation de la carte est correct", () => {

    const testOffre = {
        id: "1",
        titre: "Développeur Mainframe H/F",
        description: "Nous recherchons un Développeur Mainframe.",
        entreprise: "CGI",
        contrat: "CDI",
        domaine: "Développement",
        lieu: "Bordeaux - 33",
        salaireAnnuelMin: 40000,
        salaireAnnuelMax: 54000,
        expAnneeMini: 4,
        datePublication: "15/09/2026"
    };
    render(<MemoryRouter>
        <OffreCarte offre={testOffre} />
    </MemoryRouter>)

    const lienOffre = screen.getByRole('link', {
            name: "Voir l'offre"
        })

    expect(lienOffre.getAttribute('href')).toBe('/offres/1')

});