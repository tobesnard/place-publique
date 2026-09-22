// components/Title.tsx
// Composant fonctionnel : une fonction qui retourne du JSX (UI déclarative).
import { useConfig } from '../context/ConfigContext';

export function Title() {
    // Se branche sur le contexte : pas besoin de recevoir la config en props.
    const { getValue, loading } = useConfig();

    // Rendu conditionnel : JSX différent tant que les données ne sont pas prêtes.
    if (loading) {
        return <div>Loading...</div>;
    }

    const apiUrl = getValue<string>('api.baseUrl');
    const appIcon = getValue<string>('resources.icon');

    return (
        // Fragment <>...</> : plusieurs éléments sans <div> superflu dans le DOM.
        <>
            <div className="flex items-center">
                <img src={apiUrl + '/' + appIcon} alt="App Icon" className="w-[80px]" />
                {/* Variable CSS injectée par useThemeColors */}
                <div className="flex flex-col px-2">
                    <span className="text-4xl font-bold text-[var(--color-dark-text)]">PLACE</span>
                    <span className="text-4xl font-bold text-[var(--color-dark-text)]">PUBLIQUE</span>
                </div>
            </div>
        </>
    )

}