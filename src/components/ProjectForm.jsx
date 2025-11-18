import '../styles/ProjectForm.css';

export default function ProjectForm({ formData, setFormData, editingProject, onSubmit, onCancel }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <section className="form-section">
            <h2>{editingProject ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
            <form onSubmit={handleSubmit} className="project-form">
                <input
                    type="text"
                    placeholder="Titre du projet"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description du projet"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                />
                <div className="form-buttons">
                    <button type="submit">
                        {editingProject ? 'Modifier' : 'Ajouter'}
                    </button>
                    {editingProject && (
                        <button type="button" onClick={onCancel}>
                            Annuler
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}
