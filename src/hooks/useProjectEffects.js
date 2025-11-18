import { useEffect } from 'react';

export function useLocalStorageEffect(projects, dispatch) {
    // useEffect pour la persistance localStorage (chargement)
    useEffect(() => {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            try {
                const projects = JSON.parse(savedProjects);
                dispatch({ type: 'LOAD_PROJECTS', payload: projects });
            } catch (error) {
                console.error('Erreur lors du chargement des projets:', error);
            }
        }
    }, [dispatch]);

    // useEffect pour la persistance localStorage (sauvegarde)
    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }, [projects]);
}

export function useTimerEffect(timers, dispatch) {
    // useEffect pour les timers Pomodoro
    useEffect(() => {
        const intervals = Object.entries(timers).map(([key, timerData]) => {
            if (timerData.isRunning && timerData.timeLeft > 0) {
                const interval = setInterval(() => {
                    dispatch({
                        type: 'UPDATE_TIMER',
                        payload: {
                            key,
                            value: {
                                ...timerData,
                                timeLeft: timerData.timeLeft - 1
                            }
                        }
                    });
                }, 1000);
                return interval;
            }
            return null;
        }).filter(Boolean);

        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    }, [timers, dispatch]);
}
