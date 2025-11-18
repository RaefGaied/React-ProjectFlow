import { useState } from 'react';
import { useProjectReducer } from '../hooks/useProjectReducer';
import { useLocalStorageEffect, useTimerEffect } from '../hooks/useProjectEffects';
import { filterAndSortProjects } from '../utils/projectUtils';

import Header from './Header';
import Statistics from './Statistics';
import ProjectForm from './ProjectForm';
import ProjectFilters from './ProjectFilters';
import ProjectList from './ProjectList';

import '../styles/ProjectManager.css';

export default function ProjectManager() {
    const [state, dispatch] = useProjectReducer();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: ''
    });
    const [editingProject, setEditingProject] = useState(null);
    const [showStats, setShowStats] = useState(false);

    // useEffect pour la persistance localStorage et timers
    useLocalStorageEffect(state.projects, dispatch);
    useTimerEffect(state.timers, dispatch);

    // Fonctions utilitaires
    const handleSubmit = () => {
        if (editingProject) {
            dispatch({
                type: 'EDIT_PROJECT',
                payload: {
                    id: editingProject.id,
                    ...formData
                }
            });
            setEditingProject(null);
        } else {
            dispatch({ type: 'ADD_PROJECT', payload: formData });
        }
        setFormData({ title: '', description: '', deadline: '' });
    };

    const startEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            deadline: project.deadline
        });
    };

    const cancelEdit = () => {
        setEditingProject(null);
        setFormData({ title: '', description: '', deadline: '' });
    };

    const startTimer = (projectId) => {
        const timerKey = `project-${projectId}-pomodoro`;
        dispatch({
            type: 'UPDATE_TIMER',
            payload: {
                key: timerKey,
                value: {
                    isRunning: true,
                    timeLeft: 25 * 60,
                    totalTime: 25 * 60
                }
            }
        });
    };

    const pauseTimer = (projectId) => {
        const timerKey = `project-${projectId}-pomodoro`;
        dispatch({
            type: 'UPDATE_TIMER',
            payload: {
                key: timerKey,
                value: {
                    ...state.timers[timerKey],
                    isRunning: false
                }
            }
        });
    };

    const resetTimer = (projectId) => {
        const timerKey = `project-${projectId}-pomodoro`;
        dispatch({
            type: 'UPDATE_TIMER',
            payload: {
                key: timerKey,
                value: {
                    isRunning: false,
                    timeLeft: 25 * 60,
                    totalTime: 25 * 60
                }
            }
        });
    };

    const handleFilterChange = (key, value) => {
        dispatch({
            type: 'SET_FILTER',
            payload: { key, value }
        });
    };

    const filteredProjects = filterAndSortProjects(state.projects, state.filters);

    return (
        <div className="project-manager">
            <Header
                showStats={showStats}
                onToggleStats={() => setShowStats(!showStats)}
            />

            {showStats && (
                <Statistics projects={state.projects} />
            )}

            <div className="main-layout">
                {/* Left sidebar with form and filters */}
                <aside className="sidebar-left">
                    <ProjectForm
                        formData={formData}
                        setFormData={setFormData}
                        editingProject={editingProject}
                        onSubmit={handleSubmit}
                        onCancel={cancelEdit}
                    />

                    <ProjectFilters
                        filters={state.filters}
                        onFilterChange={handleFilterChange}
                    />
                </aside>

                {/* Right content area with project list */}
                <main className="content-right">
                    <ProjectList
                        projects={filteredProjects}
                        timers={state.timers}
                        onUpdateStatus={(id, status) => dispatch({
                            type: 'UPDATE_PROJECT_STATUS',
                            payload: { id, status }
                        })}
                        onEdit={startEdit}
                        onDelete={(id) => dispatch({
                            type: 'DELETE_PROJECT',
                            payload: { id }
                        })}
                        onStartTimer={startTimer}
                        onPauseTimer={pauseTimer}
                        onResetTimer={resetTimer}
                    />
                </main>
            </div>
        </div>
    );
}
