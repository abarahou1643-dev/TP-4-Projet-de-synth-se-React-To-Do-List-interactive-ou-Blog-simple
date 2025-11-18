import ArticleList from "../components/ArticleList";

function Accueil({ articles, searchTerm }) {
    return (
        <div className="accueil">
            <header className="accueil-header">
                <h1>🚀 TechBlog</h1>
                <p>Explorez les dernières tendances en développement React et technologies frontend. Des tutoriels détaillés, des bonnes pratiques et des insights d'experts.</p>

                {searchTerm && (
                    <div className="search-results">
                        <p>{articles.length} article(s) trouvé(s) pour "{searchTerm}"</p>
                    </div>
                )}
            </header>

            <ArticleList articles={articles} />

            {articles.length === 0 && searchTerm && (
                <div className="no-results">
                    <p> Aucun article ne correspond à votre recherche</p>
                    <p>Essayez d'autres mots-clés ou consultez tous les articles</p>
                </div>
            )}
        </div>
    );
}

export default Accueil;