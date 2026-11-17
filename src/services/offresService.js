const API_URL = "http://localhost:3000/offres";

export async function getOffres() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Erreur de récupération des offres");
    }
    return await response.json();
}
