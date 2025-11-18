import { Link } from "react-router-dom";

function ArticleList({ articles }) {
    return (
        <div className="article-list">
            {articles.map((article, index) => (
                <div key={article.id} className="article-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h3>
                        <Link to={`/article/${article.id}`} className="article-link">
                            {article.titre}
                        </Link>
                    </h3>
                    <p className="article-resume">{article.resume}</p>
                    <div className="article-meta">
                        <span className="date">📅 {article.date}</span>
                        <span className="auteur">👤 {article.auteur}</span>
                        <span className="temps-lecture">⏱️ {article.tempsLecture}</span>
                    </div>
                    {article.categories && article.categories.length > 0 && (
                        <div className="categories">
                            {article.categories.map(cat => (
                                <span key={cat} className="categorie-tag mini">{cat}</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ArticleList;