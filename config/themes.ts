export const colorPalettes = [
  {
    id: 'default',
    name: 'IdeaForge Blue',
    colors: {
      light: {
        '--primary-gradient-start': '#3b82f6', // blue-500
        '--primary-gradient-end': '#8b5cf6', // violet-500
        '--primary': '#3b82f6',
        '--primary-hover': '#2563eb',
        '--primary-text': '#ffffff',
        '--accent': '#14b8a6', // teal-500
        '--bg-base': '#f8fafc', // slate-50
        '--bg-surface': '#ffffff',
        '--bg-surface-translucent': 'rgba(255, 255, 255, 0.5)',
        '--bg-muted': '#f1f5f9', // slate-100
        '--bg-hover': '#e2e8f0', // slate-200
        '--bg-disabled': '#e2e8f0',
        '--text-base': '#0f172a', // slate-900
        '--text-muted': '#64748b', // slate-500
        '--text-disabled': '#94a3b8', // slate-400
        '--border-base': '#e2e8f0', // slate-200
        '--border-hover': '#cbd5e1', // slate-300
        '--scrollbar-track': 'transparent',
        '--scrollbar-thumb': 'rgba(0, 0, 0, 0.1)',
      },
      dark: {
        '--primary-gradient-start': '#60a5fa', // blue-400
        '--primary-gradient-end': '#a78bfa', // violet-400
        '--primary': '#60a5fa',
        '--primary-hover': '#3b82f6',
        '--primary-text': '#ffffff',
        '--accent': '#2dd4bf', // teal-400
        '--bg-base': '#020617', // slate-950
        '--bg-surface': '#0f172a', // slate-900
        '--bg-surface-translucent': 'rgba(15, 23, 42, 0.5)',
        '--bg-muted': '#1e293b', // slate-800
        '--bg-hover': '#334155', // slate-700
        '--bg-disabled': '#334155',
        '--text-base': '#f1f5f9', // slate-100
        '--text-muted': '#94a3b8', // slate-400
        '--text-disabled': '#475569', // slate-600
        '--border-base': '#1e293b', // slate-800
        '--border-hover': '#334155', // slate-700
        '--scrollbar-track': 'transparent',
        '--scrollbar-thumb': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    colors: {
      light: {
        '--primary-gradient-start': '#14b8a6',
        '--primary-gradient-end': '#34d399',
        '--primary': '#14b8a6', // teal-500
        '--primary-hover': '#0d9488', // teal-600
        '--primary-text': '#ffffff',
        '--accent': '#059669', // emerald-600
        '--bg-base': '#f0fdfa', // teal-50
        '--bg-surface': '#ffffff',
        '--bg-surface-translucent': 'rgba(255, 255, 255, 0.8)',
        '--bg-muted': '#ccfbf1', // teal-100
        '--bg-hover': '#99f6e4', // teal-200
        '--bg-disabled': '#f0fdfa', // teal-50
        '--text-base': '#134e4a', // teal-900
        '--text-muted': '#115e59', // teal-800
        '--text-disabled': '#0f766e', // teal-700
        '--border-base': '#ccfbf1', // teal-100
        '--border-hover': '#99f6e4', // teal-200
        '--scrollbar-track': '#ccfbf1',
        '--scrollbar-thumb': '#5eead4',
      },
      dark: {
        '--primary-gradient-start': '#2dd4bf',
        '--primary-gradient-end': '#34d399',
        '--primary': '#2dd4bf', // teal-400
        '--primary-hover': '#5eead4', // teal-300
        '--primary-text': '#042f2e', // teal-950
        '--accent': '#34d399', // emerald-400
        '--bg-base': '#134e4a', // teal-900
        '--bg-surface': '#115e59', // teal-800
        '--bg-surface-translucent': 'rgba(17, 94, 89, 0.8)',
        '--bg-muted': '#0f766e', // teal-700
        '--bg-hover': '#0d9488', // teal-600
        '--bg-disabled': '#134e4a', // teal-900
        '--text-base': '#ccfbf1', // teal-100
        '--text-muted': '#5eead4', // teal-300
        '--text-disabled': '#14b8a6', // teal-500
        '--border-base': '#0f766e', // teal-700
        '--border-hover': '#0d9488', // teal-600
        '--scrollbar-track': '#115e59',
        '--scrollbar-thumb': '#0f766e',
      },
    },
  },
  {
    id: 'lavender',
    name: 'Lavender',
    colors: {
      light: {
        '--primary-gradient-start': '#8b5cf6',
        '--primary-gradient-end': '#c084fc',
        '--primary': '#8b5cf6', // violet-500
        '--primary-hover': '#7c3aed', // violet-600
        '--primary-text': '#ffffff',
        '--accent': '#4f46e5', // indigo-600
        '--bg-base': '#f5f3ff', // violet-50
        '--bg-surface': '#ffffff',
        '--bg-surface-translucent': 'rgba(255, 255, 255, 0.8)',
        '--bg-muted': '#ede9fe', // violet-100
        '--bg-hover': '#ddd6fe', // violet-200
        '--bg-disabled': '#f5f3ff', // violet-50
        '--text-base': '#2e1065', // violet-950
        '--text-muted': '#4c1d95', // violet-900
        '--text-disabled': '#5b21b6', // violet-800
        '--border-base': '#ede9fe', // violet-100
        '--border-hover': '#ddd6fe', // violet-200
        '--scrollbar-track': '#ede9fe',
        '--scrollbar-thumb': '#c4b5fd',
      },
      dark: {
        '--primary-gradient-start': '#a78bfa',
        '--primary-gradient-end': '#e879f9',
        '--primary': '#a78bfa', // violet-400
        '--primary-hover': '#c4b5fd', // violet-300
        '--primary-text': '#2e1065', // violet-950
        '--accent': '#818cf8', // indigo-400
        '--bg-base': '#4c1d95', // violet-900
        '--bg-surface': '#5b21b6', // violet-800
        '--bg-surface-translucent': 'rgba(91, 33, 182, 0.8)',
        '--bg-muted': '#6d28d9', // violet-700
        '--bg-hover': '#7c3aed', // violet-600
        '--bg-disabled': '#4c1d95', // violet-900
        '--text-base': '#ede9fe', // violet-100
        '--text-muted': '#c4b5fd', // violet-300
        '--text-disabled': '#a78bfa', // violet-400
        '--border-base': '#6d28d9', // violet-700
        '--border-hover': '#7c3aed', // violet-600
        '--scrollbar-track': '#5b21b6',
        '--scrollbar-thumb': '#6d28d9',
      },
    },
  },
  {
    id: 'peach',
    name: 'Peach',
    colors: {
      light: {
        '--primary-gradient-start': '#fb923c',
        '--primary-gradient-end': '#f87171',
        '--primary': '#fb923c', // orange-400
        '--primary-hover': '#f97316', // orange-500
        '--primary-text': '#ffffff',
        '--accent': '#ef4444', // red-500
        '--bg-base': '#fff7ed', // orange-50
        '--bg-surface': '#ffffff',
        '--bg-surface-translucent': 'rgba(255, 255, 255, 0.8)',
        '--bg-muted': '#ffedd5', // orange-100
        '--bg-hover': '#fed7aa', // orange-200
        '--bg-disabled': '#fff7ed', // orange-50
        '--text-base': '#7c2d12', // orange-900
        '--text-muted': '#9a3412', // orange-800
        '--text-disabled': '#b45309', // orange-700
        '--border-base': '#ffedd5', // orange-100
        '--border-hover': '#fed7aa', // orange-200
        '--scrollbar-track': '#ffedd5',
        '--scrollbar-thumb': '#fdba74',
      },
      dark: {
        '--primary-gradient-start': '#fb923c',
        '--primary-gradient-end': '#f87171',
        '--primary': '#fb923c', // orange-400
        '--primary-hover': '#fdba74', // orange-300
        '--primary-text': '#431407', // orange-950
        '--accent': '#f87171', // red-400
        '--bg-base': '#7c2d12', // orange-900
        '--bg-surface': '#9a3412', // orange-800
        '--bg-surface-translucent': 'rgba(154, 52, 18, 0.8)',
        '--bg-muted': '#b45309', // orange-700
        '--bg-hover': '#c2410c', // orange-600
        '--bg-disabled': '#7c2d12', // orange-900
        '--text-base': '#ffedd5', // orange-100
        '--text-muted': '#fed7aa', // orange-200
        '--text-disabled': '#fb923c', // orange-400
        '--border-base': '#b45309', // orange-700
        '--border-hover': '#c2410c', // orange-600
        '--scrollbar-track': '#9a3412',
        '--scrollbar-thumb': '#b45309',
      },
    },
  },
];