import { MemoryRouter } from "react-router-dom";
import OffreCarte from "../../components/OffreCarte.jsx";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";


//TEST UNITAIRE DE RENDU DE COMPOSANT
test("affiche les détails de l'annonce", () => {

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

    render(
        <MemoryRouter>
            <OffreCarte offre={testOffre} />
        </MemoryRouter>
    );

    expect(
        screen.getByText("Développeur Mainframe H/F")
    ).toBeTruthy();
    expect(
        screen.getByText("Bordeaux - 33")
    ).toBeTruthy();
    expect(
        screen.getByText("CGI")
    ).toBeTruthy();
    expect(
        screen.getByText("CDI")
    ).toBeTruthy();
    expect(
        screen.getByText("Publiée le : 15/09/2026")
    ).toBeTruthy();

});