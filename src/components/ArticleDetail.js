import { useParams, Link } from "react-router-dom";

function ArticleDetail({ articles }) {
    const { id } = useParams();
    const article = articles.find((a) => a.id.toString() === id);

    if (!article) {
        return (
            <div className="article-detail">
                <p>Article non trouvé.</p>
                <Link to="/" className="btn-retour">← Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="article-detail">
            <Link to="/" className="btn-retour">← Retour à l'accueil</Link>
            <h1>{article.titre}</h1>
            <div className="article-meta">
                <span className="date">📅 Publié le {article.date}</span>
                {article.dateModification && article.dateModification !== article.date && (
                    <span className="date-modification">✏️ Modifié le {article.dateModification}</span>
                )}
                <span className="auteur">👤 par {article.auteur}</span>
                <span className="temps-lecture">⏱️ {article.tempsLecture}</span>
            </div>

            {article.categories && article.categories.length > 0 && (
                <div className="article-categories">
                    {article.categories.map(cat => (
                        <span key={cat} className="categorie-tag">{cat}</span>
                    ))}
                </div>
            )}

            <div className="article-contenu">
                <p className="introduction">{article.resume}</p>
                <div className="contenu-principal">
                    {article.contenu.split('\n').map((paragraphe, index) => (
                        <p key={index}>{paragraphe}</p>
                    ))}
                </div>
            </div>

            <div className="article-actions">
                <Link to="/gestion" className="btn-modifier">
                    ✏️ Modifier cet article
                </Link>
            </div>
        </div>
    );
}

export default ArticleDetail;