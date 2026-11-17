
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import AccueilPage from './pages/AccueilPage';
import AuthentificationPage from './pages/AuthentificationPage';
import DetailOffrePage from './pages/DetailOffrePage';
import FormulaireOffrePage from './pages/FormulaireOffrePage';

function App () {
    return (
        <>
        <Navigation />

        <Routes>
            <Route path='/' element={<AccueilPage/>}/>
            <Route path='/connexion' element={<AuthentificationPage/>}/>
            <Route path='offres/:id' element={<DetailOffrePage/>}/>
            <Route path='/ajout' element={<FormulaireOffrePage/>}/>
        </Routes>
        </>
    )
}
export default App