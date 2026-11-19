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

  // 2. On voit si le mail de l'utilisateur correspond déjà à une addresse utilisée

  if (users.contains((x) => x.email === nouvelUser.email)) {
    return { status: false };
  }

  // 3. On envoie le POST AVEC l'id calculé
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...nouvelUser, offres: [] }),
  });
  if (!response.ok) {
    throw new Error("Erreur de création du compte");
  }
  return { data: await response.json(), status: true };
}

export async function applyOffer(idUser, idOffre) {
  const response = await fetch(`${API_URL}/${idUser}`);
  const user = await response.json();

  // Déjà postulé ? On ne rajoute pas une deuxième fois
  if (user.offres.includes(idOffre)) {
    return;
  }

  const postule = await fetch(`${API_URL}/${idUser}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ offres: [...user.offres, idOffre] }),
  });
  if (!postule.ok) {
    throw new Error("Erreur d'enregistrement de la candidature");
  }
}
