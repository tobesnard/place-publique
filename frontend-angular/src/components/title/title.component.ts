import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ConfigService } from "../../services/config.service";

@Component({
    selector: "app-title",
    templateUrl: "./title.component.html"
})
export class TitleComponent {

    private readonly configService = inject(ConfigService);
    readonly apiUrl = toSignal(this.configService.getValue<string>('api.baseUrl'), { initialValue: '' });
    readonly appIcon = toSignal(this.configService.getValue<string>('resources.icon'), { initialValue: '' });
}