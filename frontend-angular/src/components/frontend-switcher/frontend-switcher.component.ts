import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ConfigService } from "../../services/config.service";

// Permet de basculer vers l'autre implémentation frontend (React) de l'app.
@Component({
    selector: "app-frontend-switcher",
    templateUrl: "./frontend-switcher.component.html"
})
export class FrontendSwitcherComponent {
    private readonly configService = inject(ConfigService);
    readonly reactUrl = toSignal(this.configService.getValue<string>('frontends.react'), { initialValue: '' });

    goToReact(): void {
        window.location.href = this.reactUrl() ?? '';
    }
}
