import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-palette',
    imports: [CommonModule],
    templateUrl: './palette.component.html'
})
export class PaletteComponent {

    colors = [
        { name: 'primary', className: 'bg-(--color-primary) text-(--color-on-primary)' },
        { name: 'secondary', className: 'bg-(--color-secondary) text-(--color-on-secondary)' },
        { name: 'background', className: 'bg-(--color-background) text-(--color-on-background)' },
        { name: 'surface', className: 'bg-(--color-surface) text-(--color-on-surface)' },
        { name: 'error', className: 'bg-(--color-error) text-(--color-on-error)' }
    ];

}