import '../styles/ProjectCard.css';

export default function ProjectCard({
    project,
    timer,
    onUpdateStatus,
    onEdit,
    onDelete,
    onStartTimer,
    onPauseTimer,
    onResetTimer
}) {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`project-card ${project.status}`}>
            <div className="project-header">
                <h3>{project.title}</h3>
                <span className={`status-badge ${project.status}`}>
                    {project.status === 'todo' ? 'À faire' :
                        project.status === 'doing' ? 'En cours' : 'Terminé'}
                </span>
            </div>

            <p className="project-description">{project.description}</p>
            <p className="project-deadline">
                Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>

            <div className="timer-section">
                <h4>Timer Pomodoro</h4>
                {timer && (
                    <div className="timer-display">
                        <span className="timer-time">
                            {formatTime(timer.timeLeft)}
                        </span>
                        <div className="timer-controls">
                            {timer.isRunning ? (
                                <button onClick={() => onPauseTimer(project.id)}>
                                    Pause
                                </button>
                            ) : (
                                <button onClick={() => onStartTimer(project.id)}>
                                    {timer.timeLeft === timer.totalTime ? 'Démarrer' : 'Reprendre'}
                                </button>
                            )}
                            <button onClick={() => onResetTimer(project.id)}>
                                Réinitialiser
                            </button>
                        </div>
                    </div>
                )}
                {!timer && (
                    <button onClick={() => onStartTimer(project.id)}>
                        Démarrer le timer
                    </button>
                )}
            </div>

            <div className="project-actions">
                <select
                    value={project.status}
                    onChange={(e) => onUpdateStatus(project.id, e.target.value)}
                    className="status-select"
                >
                    <option value="todo">À faire</option>
                    <option value="doing">En cours</option>
                    <option value="done">Terminé</option>
                </select>

                <button onClick={() => onEdit(project)} className="edit-btn">
                    Modifier
                </button>

                <button
                    onClick={() => onDelete(project.id)}
                    className="delete-btn"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}
