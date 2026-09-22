export function Palette() {

    const colors = [
        { name: 'primary', className: 'bg-(--color-primary) text-(--color-on-primary)' },
        { name: 'secondary', className: 'bg-(--color-secondary) text-(--color-on-secondary)' },
        { name: 'background', className: 'bg-(--color-background) text-(--color-on-background)' },
        { name: 'surface', className: 'bg-(--color-surface) text-(--color-on-surface)' },
        { name: 'error', className: 'bg-(--color-error) text-(--color-on-error)' }
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {colors.map((color) => (
                <div key={color.name} className={`${color.className} p-4 rounded `}>
                    {color.name}
                </div>
            ))}
        </div>
    );
}