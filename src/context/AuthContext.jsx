import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // Au démarrage : on relit la session sauvegardée (survit au F5), sinon null
  const [user, setUser] = useState(() => {
    const sauvegarde = sessionStorage.getItem("user");
    return sauvegarde ? JSON.parse(sauvegarde) : null;
  });

  // login : range le user ENTIER (rôle inclus) dans le state + le sessionStorage
  function login(user) {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  // logout : vide les deux
  function logout() {
    setUser(null);
    sessionStorage.removeItem("user");
  }
  function addOffer(idOffre) {
    if (!user) return;

    const updatedUser = {
      ...user,
      offres: [...(user.offres || []), String(idOffre)],
    };

    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  }
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, addOffer }}>
      {children}
    </AuthContext.Provider>
  );
}
