import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
function FormulaireOffre() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [offre, setOffre] = useState(null);

  /*if (!offre) {
    return <p className='container mt-5'> Chargement...</p>;
  }
  */

  return (
    <div>
      <div></div>
    </div>
  );
}

export default FormulaireOffre;
