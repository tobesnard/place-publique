// context/ConfigContext.tsx
// Context API : partage la config à tout un sous-arbre sans prop drilling.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfigService } from '../services/ConfigService';

interface ConfigContextType {
    config: Record<string, unknown> | null;
    loading: boolean;
    getValue: <T>(path: string) => T | undefined;
}

// null par défaut = valeur utilisée hors d'un <ConfigContext.Provider>.
const ConfigContext = createContext<ConfigContextType | null>(null);

const API_URL = import.meta.env.VITE_API_URL || '';
const configService = ConfigService.getInstance(API_URL);

// Fournit config/loading/getValue à tous les composants enfants.
export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // useState : état réactif, son changement redéclenche un rendu.
    const [config, setConfig] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect + [] : effet de bord (appel réseau) exécuté une seule fois au montage.
    useEffect(() => {
        configService
            .loadConfig()
            .then((data) => setConfig(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Lit une valeur imbriquée via un chemin pointé, ex: 'ui.theme.colors'.
    const getValue = <T,>(path: string): T | undefined => {
        if (!config) return undefined;

        let value: unknown = config;
        for (const key of path.split('.')) {
            if (typeof value !== 'object' || value === null || !(key in value)) {
                return undefined;
            }
            value = (value as Record<string, unknown>)[key];
        }
        return value as T;
    };

    return (
        <ConfigContext.Provider value={{ config, loading, getValue }
        }>
            {children}
        </ConfigContext.Provider>
    );
};

// Custom hook : encapsule useContext + vérification du Provider.
export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig doit être utilisé au sein d\'un ConfigProvider');
    }
    return context;
};