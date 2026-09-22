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
    const appTagLine = getValue<string>('app.metadata.tagLine');

    return (
        // Fragment <>...</> : plusieurs éléments sans <div> superflu dans le DOM.
        <>
            <div className="flex items-center">
                <img src={apiUrl + '/' + appIcon} alt="App Icon" className="w-[80px]" />
                <div className="flex flex-col px-2">
                    <span className="text-2xl font-bold font-title tracking-widest text-[var(--color-on-background)]">PLACE</span>
                    <span className="text-2xl font-bold font-title tracking-widest text-[var(--color-on-background)]">PUBLIQUE</span>
                    <span className="text-sm text-[var(--color-on-primary-variant)]">{appTagLine}</span>
                </div>
            </div>
        </>
    )

}