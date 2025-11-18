import { useReducer } from 'react';

// État initial
const initialState = {
    projects: [],
    filters: {
        status: 'all', // all, todo, doing, done
        searchTerm: '',
        sortBy: 'deadline' // deadline, title
    },
    timers: {}
};

// Reducer pour gérer les projets
function projectReducer(state, action) {
    switch (action.type) {
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [...state.projects, {
                    id: Date.now(),
                    title: action.payload.title,
                    description: action.payload.description,
                    status: 'todo',
                    deadline: action.payload.deadline,
                    createdAt: new Date().toISOString()
                }]
            };

        case 'UPDATE_PROJECT_STATUS':
            return {
                ...state,
                projects: state.projects.map(project =>
                    project.id === action.payload.id
                        ? { ...project, status: action.payload.status }
                        : project
                )
            };

        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload.id),
                timers: Object.fromEntries(
                    Object.entries(state.timers).filter(([key]) =>
                        !key.startsWith(`project-${action.payload.id}-`)
                    )
                )
            };

        case 'EDIT_PROJECT':
            return {
                ...state,
                projects: state.projects.map(project =>
                    project.id === action.payload.id
                        ? {
                            ...project,
                            title: action.payload.title,
                            description: action.payload.description,
                            deadline: action.payload.deadline
                        }
                        : project
                )
            };

        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.key]: action.payload.value
                }
            };

        case 'LOAD_PROJECTS':
            return {
                ...state,
                projects: action.payload
            };

        case 'UPDATE_TIMER':
            return {
                ...state,
                timers: {
                    ...state.timers,
                    [action.payload.key]: action.payload.value
                }
            };

        default:
            return state;
    }
}

export function useProjectReducer() {
    return useReducer(projectReducer, initialState);
}
