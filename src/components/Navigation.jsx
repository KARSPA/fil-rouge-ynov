import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar bg-light shadow-sm">
            <div className="container">

                <div className="d-flex gap-3">
                    <NavLink
                        to="/"
                        className="nav-link"
                    >
                        Product Manager
                    </NavLink>

                    <NavLink
                        to='products/add'
                        className="nav-link"
                    >
                        Ajouter un produit
                    </NavLink>

                </div>
            </div>
        </nav>
    );
}