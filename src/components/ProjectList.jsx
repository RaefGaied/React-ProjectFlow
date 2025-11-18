import '../styles/ProjectList.css';
import ProjectCard from './ProjectCard';

export default function ProjectList({
    projects,
    timers,
    onUpdateStatus,
    onEdit,
    onDelete,
    onStartTimer,
    onPauseTimer,
    onResetTimer
}) {
    return (
        <section className="projects-section">
            <h2>Liste des projets ({projects.length})</h2>
            <div className="projects-grid">
                {projects.map(project => {
                    const timerKey = `project-${project.id}-pomodoro`;
                    const timer = timers[timerKey];

                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            timer={timer}
                            onUpdateStatus={onUpdateStatus}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onStartTimer={onStartTimer}
                            onPauseTimer={onPauseTimer}
                            onResetTimer={onResetTimer}
                        />
                    );
                })}
            </div>

            {projects.length === 0 && (
                <p className="no-projects">Aucun projet trouvé</p>
            )}
        </section>
    );
}
