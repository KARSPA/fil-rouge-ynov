const API_URL = "http://localhost:3000/users";

export async function getUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erreur de récupération des utilisateurs");
  }
  return await response.json();
}

export async function addUser(nouvelUser) {
  // 1. On récupère les users existants pour calculer le prochain id
  const users = await getUsers();

  // 2. Le prochain id = le plus grand id existant + 1 → série 1, 2, 3, 4...
  const maxId = users.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0);

  // 3. On envoie le POST AVEC l'id calculé
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...nouvelUser, id: maxId + 1, offres: [] }),
  });
  if (!response.ok) {
    throw new Error("Erreur de création du compte");
  }
  return await response.json();
}
export async function applyOffer(idUser, idOffre) {
  const response = await fetch(`${API_URL}/${idUser}`);
  const user = await response.json();

  const postule = await fetch(`${API_URL}/${idUser}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ offres: [...user.offres, idOffre] }),
  });
  if (!postule.ok) {
    throw new Error("Erreur de création du compte");
  }
}
