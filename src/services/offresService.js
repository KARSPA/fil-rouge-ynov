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

export async function modifyOffer(id, newOffer) {
  console.log(newOffer + " " + id);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newOffer),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la modification de l'annonce");
  }
}
