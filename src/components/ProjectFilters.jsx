import '../styles/ProjectFilters.css';

export default function ProjectFilters({ filters, onFilterChange }) {
    return (
        <section className="filters-section">
            <div className="filters">
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                >
                    <option value="all">Tous les statuts</option>
                    <option value="todo">À faire</option>
                    <option value="doing">En cours</option>
                    <option value="done">Terminé</option>
                </select>

                <select
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange('sortBy', e.target.value)}
                >
                    <option value="deadline">Trier par deadline</option>
                    <option value="title">Trier par titre</option>
                </select>

                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={filters.searchTerm}
                    onChange={(e) => onFilterChange('searchTerm', e.target.value)}
                />
            </div>
        </section>
    );
}
