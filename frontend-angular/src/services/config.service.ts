import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient);
    private readonly config$ = this.http.get<Record<string, unknown>>(`${this.apiUrl}/config`).pipe(
        shareReplay({ bufferSize: 1, refCount: false })
    );

    loadConfig(): Observable<Record<string, unknown>> {
        return this.config$;
    }

    getValue<T>(path: string): Observable<T | undefined> {
        return this.loadConfig().pipe(
            map(config => this.findValue(config, path) as T | undefined)
        );
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