export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function filterAndSortProjects(projects, filters) {
    return projects
        .filter(project => {
            const matchesStatus = filters.status === 'all' || project.status === filters.status;
            const matchesSearch = project.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            if (filters.sortBy === 'deadline') {
                return new Date(a.deadline) - new Date(b.deadline);
            }
            return a.title.localeCompare(b.title);
        });
}

export function calculateStats(projects) {
    return {
        total: projects.length,
        todo: projects.filter(p => p.status === 'todo').length,
        doing: projects.filter(p => p.status === 'doing').length,
        done: projects.filter(p => p.status === 'done').length
    };
}
