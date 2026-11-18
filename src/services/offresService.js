const API_URL = "http://localhost:3000/offres";

export async function getOffres() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Erreur de récupération des offres");
    }
    return await response.json();
}

export async function getOfferById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Offre Introuvable");
  }
  return await response.json();

}

export async function addOffer(offre) {
    const response = await fetch(`${API_URL}`, {
            method: "POST",
            body: JSON.stringify(offre),
            }
        );

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'offre ...");
    }

    return await response.json()
}
