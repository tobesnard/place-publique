// components/FrontendSwitcher.tsx
// Permet de basculer vers l'autre implémentation frontend (Angular) de l'app.
import { useId } from 'react';
import { useConfig } from '../context/ConfigContext';

export function FrontendSwitcher() {
    const { getValue } = useConfig();
    const angularUrl = getValue<string>('frontends.angular');
    const id = useId();

    if (!angularUrl) return null;

    // Cette app est la version React : le switch est donc toujours "non coché".
    const checked = false;
    const goToAngular = () => { window.location.href = angularUrl; };

    return (
        <div className="flex items-center gap-3">
            <label htmlFor={id} className="cursor-pointer text-sm font-medium text-[var(--color-dark-text)]">
                React
            </label>

            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={goToAngular}
                className={`
                    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    bg-[var(--color-primary)] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                `}
            >
                <span
                    className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0
                        transition duration-200 ease-in-out
                        ${checked ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </button>
            <label htmlFor={id} className="cursor-pointer text-sm font-medium text-[var(--color-dark-text)]">
                Angular
            </label>
        </div>
    );
}
