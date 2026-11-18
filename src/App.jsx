import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navigation from './components/Navigation';
import { Routes, Route } from "react-router-dom";
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
            <Route path="/connexion" element={<AuthentificationPage />} />
        </Routes>
        </>
    )
}
export default App