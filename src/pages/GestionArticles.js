import { useState } from "react";
import FormulaireArticle from "../components/FormulaireArticle";

function GestionArticles({ articles, onAjouter, onModifier, onSupprimer }) {
    const [articleEnEdition, setArticleEnEdition] = useState(null);
    const [showFormulaire, setShowFormulaire] = useState(false);

    const demarrerEdition = (article) => {
        setArticleEnEdition(article);
        setShowFormulaire(true);
    };

    const annulerEdition = () => {
        setArticleEnEdition(null);
        setShowFormulaire(false);
    };

    const soumettreArticle = (articleData) => {
        if (articleEnEdition) {
            onModifier(articleEnEdition.id, articleData);
        } else {
            onAjouter(articleData);
        }
        annulerEdition();
    };

    return (
        <div className="gestion-articles">
            <div className="gestion-header">
                <div>
                    <h1>📋 Gestion des Articles</h1>
                    <p>Créez, modifiez et supprimez vos articles</p>
                </div>
                <button
                    onClick={() => setShowFormulaire(true)}
                    className="btn-primaire"
                >
                    + Nouvel Article
                </button>
            </div>

            {showFormulaire && (
                <div className="formulaire-overlay">
                    <div className="formulaire-container">
                        <FormulaireArticle
                            article={articleEnEdition}
                            onSoumettre={soumettreArticle}
                            onAnnuler={annulerEdition}
                        />
                    </div>
                </div>
            )}

            <div className="articles-list">
                <h2>Articles existants ({articles.length})</h2>
                {articles.length === 0 ? (
                    <p className="message-vide">Aucun article pour le moment</p>
                ) : (
                    <div className="table-container">
                        <table className="articles-table">
                            <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Auteur</th>
                                <th>Création</th>
                                <th>Modification</th>
                                <th>Catégories</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {articles.map(article => (
                                <tr key={article.id}>
                                    <td className="titre-cell">
                                        <strong>{article.titre}</strong>
                                        <div className="resume">{article.resume}</div>
                                    </td>
                                    <td>{article.auteur}</td>
                                    <td>
                                        <div className="date-info">
                                            <div className="date">{article.date}</div>
                                            {article.dateCreation && (
                                                <div className="date-creation">Créé le {article.dateCreation}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="date-info">
                                            <div className="date-modification">
                                                {article.dateModification || article.date}
                                            </div>
                                            {article.dateModification && article.dateModification !== article.date && (
                                                <div className="modification-indicator">Modifié</div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="categories">
                                            {article.categories?.map(cat => (
                                                <span key={cat} className="categorie-tag mini">{cat}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            onClick={() => demarrerEdition(article)}
                                            className="btn-editer"
                                            title="Modifier"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                                                    onSupprimer(article.id);
                                                }
                                            }}
                                            className="btn-supprimer"
                                            title="Supprimer"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GestionArticles;