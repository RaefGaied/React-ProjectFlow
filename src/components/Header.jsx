import '../styles/Header.css';

export default function Header({ showStats, onToggleStats }) {
    return (
        <header className="header">
            <h1>Gestionnaire de Projets</h1>
            <button
                className="stats-toggle"
                onClick={onToggleStats}
            >
                {showStats ? 'Masquer' : 'Afficher'} les statistiques
            </button>
        </header>
    );
}
