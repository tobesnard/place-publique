// services/configService.ts
// Classe TypeScript pure, sans dépendance à React ; ConfigContext.tsx fait le pont.
export class ConfigService {
    private static instance: ConfigService;
    private configPromise: Promise<Record<string, unknown>> | null = null;
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    // Permet de conserver une seule instance globale (comme `providedIn: 'root'`)
    public static getInstance(apiUrl: string): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService(apiUrl);
        }
        return ConfigService.instance;
    }

    // Équivalent de `this.config$` avec cache en mémoire (`shareReplay`)
    public async loadConfig(): Promise<Record<string, unknown>> {
        if (!this.configPromise) {
            this.configPromise = fetch(`${this.apiUrl}/config`).then((res) => {
                if (!res.ok) throw new Error('Impossible de charger la configuration');
                return res.json();
            });
        }
        return this.configPromise;
    }

    public async getValue<T>(path: string): Promise<T | undefined> {
        const config = await this.loadConfig();
        return this.findValue(config, path) as T | undefined;
    }

    private findValue(config: Record<string, unknown>, path: string): unknown {
        let value: unknown = config;
        for (const key of path.split('.')) {
            if (typeof value !== 'object' || value === null || !(key in value)) {
                return undefined;
            }
            value = (value as Record<string, unknown>)[key];
        }
        return value;
    }
}