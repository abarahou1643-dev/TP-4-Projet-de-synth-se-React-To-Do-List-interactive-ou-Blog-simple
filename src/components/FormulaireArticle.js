import { useState, useEffect } from "react";

function FormulaireArticle({ article, onSoumettre, onAnnuler }) {
    const [formData, setFormData] = useState({
        titre: "",
        resume: "",
        contenu: "",
        auteur: "",
        categories: []
    });

    const [categorieInput, setCategorieInput] = useState("");

    useEffect(() => {
        if (article) {
            setFormData({
                titre: article.titre || "",
                resume: article.resume || "",
                contenu: article.contenu || "",
                auteur: article.auteur || "",
                categories: article.categories || []
            });
        }
    }, [article]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const ajouterCategorie = () => {
        if (categorieInput.trim() && !formData.categories.includes(categorieInput.trim())) {
            setFormData({
                ...formData,
                categories: [...formData.categories, categorieInput.trim()]
            });
            setCategorieInput("");
        }
    };

    const supprimerCategorie = (categorieASupprimer) => {
        setFormData({
            ...formData,
            categories: formData.categories.filter(cat => cat !== categorieASupprimer)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.titre.trim() || !formData.contenu.trim()) {
            alert("Le titre et le contenu sont obligatoires !");
            return;
        }
        onSoumettre(formData);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            ajouterCategorie();
        }
    };

    return (
        <div className="formulaire-article">
            <h2>{article ? 'Modifier l\'article' : 'Nouvel Article'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre *</label>
                    <input
                        type="text"
                        name="titre"
                        value={formData.titre}
                        onChange={handleChange}
                        placeholder="Titre de l'article"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Résumé</label>
                    <textarea
                        name="resume"
                        value={formData.resume}
                        onChange={handleChange}
                        placeholder="Résumé court de l'article"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label>Contenu *</label>
                    <textarea
                        name="contenu"
                        value={formData.contenu}
                        onChange={handleChange}
                        placeholder="Contenu de l'article"
                        rows="10"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Auteur</label>
                    <input
                        type="text"
                        name="auteur"
                        value={formData.auteur}
                        onChange={handleChange}
                        placeholder="Nom de l'auteur"
                    />
                </div>

                <div className="form-group">
                    <label>Catégories</label>
                    <div className="categories-input">
                        <input
                            type="text"
                            value={categorieInput}
                            onChange={(e) => setCategorieInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ajouter une catégorie (Entrée pour valider)"
                        />
                        <button type="button" onClick={ajouterCategorie} className="btn-ajouter-cat">
                            +
                        </button>
                    </div>
                    <div className="categories-list">
                        {formData.categories.map(cat => (
                            <span key={cat} className="categorie-tag">
                {cat}
                                <button
                                    type="button"
                                    onClick={() => supprimerCategorie(cat)}
                                    className="btn-supprimer-cat"
                                >
                  ×
                </button>
              </span>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primaire">
                        {article ? 'Modifier' : 'Créer'} l'article
                    </button>
                    <button type="button" onClick={onAnnuler} className="btn-secondaire">
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormulaireArticle;