import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Accueil from "./pages/Accueil";
import Article from "./pages/Article";
import GestionArticles from "./pages/GestionArticles";
import "./App.css";

function App() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [scrolled, setScrolled] = useState(false);

    // Animation de la navbar au scroll
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Charger depuis le localStorage
    useEffect(() => {
        const savedArticles = localStorage.getItem('blog-articles');
        if (savedArticles) {
            setArticles(JSON.parse(savedArticles));
        } else {
            // Données par défaut
            const defaultArticles = [
                {
                    id: 1,
                    titre: "Découverte de React",
                    resume: "Plongez dans l'univers de React et découvrez pourquoi cette bibliothèque a révolutionné le développement frontend moderne.",
                    contenu: "React est bien plus qu'une simple bibliothèque JavaScript - c'est un écosystème complet qui a transformé la façon dont nous construisons des interfaces utilisateur. Créé par Facebook, React introduit le concept de composants réutilisables, permettant aux développeurs de créer des applications complexes avec une maintenance simplifiée.\n\nLa virtual DOM de React optimise les performances en minimisant les manipulations directes du DOM, tandis que le one-way data flow assure une gestion prévisible des données. Avec l'introduction des Hooks en 2018, React a rendu les composants fonctionnels encore plus puissants, offrant une syntaxe plus concise et une meilleure réutilisabilité de la logique métier.",
                    date: "15 Mars 2024",
                    dateCreation: "15 Mars 2024",
                    dateModification: "15 Mars 2024",
                    auteur: "Sarah Dev",
                    categories: ["React", "Débutant"],
                    tempsLecture: "5 min"
                },
                {
                    id: 2,
                    titre: "Les Hooks React : Révolution ou Évolution ?",
                    resume: "Une analyse approfondie des Hooks React et comment ils ont changé notre approche du développement de composants.",
                    contenu: "Les Hooks représentent l'une des innovations les plus significatives de React ces dernières années. Ils permettent d'utiliser state et d'autres fonctionnalités React sans avoir à écrire des classes.\n\nuseState et useEffect sont sans doute les plus populaires, mais l'écosystème des Hooks ne s'arrête pas là. Les Hooks personnalisés ouvrent la voie à une réutilisabilité de logique sans précédent, tandis que useReducer et useContext offrent des solutions élégantes pour la gestion d'état complexe.\n\nCependant, cette puissance s'accompagne de responsabilités : les règles des Hooks doivent être rigoureusement respectées pour éviter des bugs subtils.",
                    date: "20 Mars 2024",
                    dateCreation: "20 Mars 2024",
                    dateModification: "20 Mars 2024",
                    auteur: "Mike Codeur",
                    categories: ["React", "Hooks", "Avancé"],
                    tempsLecture: "7 min"
                },
                {
                    id: 3,
                    titre: "React Router : La Navigation Professionnelle",
                    resume: "Maîtrisez la navigation dans vos applications React avec React Router, la solution de routing la plus populaire.",
                    contenu: "Dans le monde des applications monopages (SPA), une navigation fluide est cruciale pour l'expérience utilisateur. React Router se positionne comme la solution standard pour gérer le routing dans React.\n\nDe la configuration basique avec BrowserRouter aux fonctionnalités avancées comme le lazy loading avec React.lazy, React Router offre une palette complète d'outils. Les routes dynamiques permettent de créer des URLs SEO-friendly, tandis que les hooks useParams et useNavigate fournissent un contrôle précis sur la navigation.\n\nNous aborderons également les stratégies de protection de routes, la gestion des erreurs 404, et l'optimisation des performances grâce au code splitting.",
                    date: "25 Mars 2024",
                    dateCreation: "25 Mars 2024",
                    dateModification: "25 Mars 2024",
                    auteur: "Emma Tech",
                    categories: ["React", "Router", "Navigation"],
                    tempsLecture: "6 min"
                }
            ];
            setArticles(defaultArticles);
        }
    }, []);

    // Sauvegarder dans le localStorage
    useEffect(() => {
        if (articles.length > 0) {
            localStorage.setItem('blog-articles', JSON.stringify(articles));
        }
    }, [articles]);

    // Ajouter un article
    const ajouterArticle = (nouvelArticle) => {
        const article = {
            ...nouvelArticle,
            id: Date.now(),
            date: new Date().toLocaleDateString('fr-FR'),
            dateCreation: new Date().toLocaleDateString('fr-FR'),
            dateModification: new Date().toLocaleDateString('fr-FR'),
            tempsLecture: `${Math.max(1, Math.floor(nouvelArticle.contenu.length / 1000))} min`
        };
        setArticles([article, ...articles]);
    };

    // Modifier un article
    const modifierArticle = (id, articleModifie) => {
        setArticles(articles.map(article =>
            article.id === id
                ? {
                    ...articleModifie,
                    tempsLecture: `${Math.max(1, Math.floor(articleModifie.contenu.length / 1000))} min`,
                    dateModification: new Date().toLocaleDateString('fr-FR')
                }
                : article
        ));
    };

    // Supprimer un article
    const supprimerArticle = (id) => {
        setArticles(articles.filter(article => article.id !== id));
    };

    // Articles filtrés par recherche
    const articlesFiltres = articles.filter(article =>
        article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.resume.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.categories && article.categories.some(cat =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );

    return (
        <BrowserRouter>
            <div className="app">
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <div className="nav-container">
                        <Link to="/" className="nav-logo">✨ TechBlog</Link>
                        <div className="nav-links">
                            <Link to="/" className="nav-link">🏠 Accueil</Link>
                            <Link to="/gestion" className="nav-link">📝 Gérer les articles</Link>
                        </div>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Accueil articles={articlesFiltres} searchTerm={searchTerm} />} />
                        <Route path="/article/:id" element={<Article articles={articles} />} />
                        <Route path="/gestion" element={
                            <GestionArticles
                                articles={articles}
                                onAjouter={ajouterArticle}
                                onModifier={modifierArticle}
                                onSupprimer={supprimerArticle}
                            />
                        } />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;