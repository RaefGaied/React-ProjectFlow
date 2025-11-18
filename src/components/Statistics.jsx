import '../styles/Statistics.css';

export default function Statistics({ projects }) {
    const stats = {
        total: projects.length,
        todo: projects.filter(p => p.status === 'todo').length,
        doing: projects.filter(p => p.status === 'doing').length,
        done: projects.filter(p => p.status === 'done').length
    };

    return (
        <section className="stats">
            <div className="stat-card">
                <h3>Total</h3>
                <span className="stat-number">{stats.total}</span>
            </div>
            <div className="stat-card todo">
                <h3>À Faire</h3>
                <span className="stat-number">{stats.todo}</span>
            </div>
            <div className="stat-card doing">
                <h3>En Cours</h3>
                <span className="stat-number">{stats.doing}</span>
            </div>
            <div className="stat-card done">
                <h3>Terminé</h3>
                <span className="stat-number">{stats.done}</span>
            </div>
        </section>
    );
}
