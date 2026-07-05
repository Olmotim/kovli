# spec/ — Spec Driven Development

> Documentación del proyecto con desarrollo dirigido por especificación (SDD): primero se escribe la spec, luego el plan, luego las tareas, y **solo entonces** se toca el código. Esto encaja con el objetivo de aprender: obliga a pensar y decidir antes de que la IA escriba nada.

## Estructura

```
spec/
├── constitution/            ← reglas estables del proyecto (cambian poco)
│   ├── mission.md           ← qué construimos y para quién
│   ├── tech-stack.md        ← tecnologías, convenciones y límites
│   └── roadmap.md           ← orden y estado de las features
└── features/                ← una carpeta por feature
    ├── 001-pagina-principal/
    ├── 002-secciones/
    ├── 003-cursor/
    └── 004-razas-de-perros/
        ├── spec.md          ← qué hace + criterios de aceptación
        ├── plan.md          ← cómo se implementa
        └── tasks.md         ← checklist de tareas
```

## Flujo para una feature nueva

1. Crear `features/NNN-nombre-feature/` con el siguiente número libre.
2. Escribir `spec.md`: qué hace, por qué y criterios de aceptación medibles.
3. Escribir `plan.md`: enfoque técnico, respetando `constitution/tech-stack.md`.
4. Desglosar en `tasks.md` y marcar el progreso.
5. Implementar y validar (build/tests/lint).
6. Mover la feature a "Hecho" en `constitution/roadmap.md`.

> La constitución manda: si una feature choca con `mission.md` o `tech-stack.md`, se replantea la feature, no la constitución.
>
> Los puntos marcados con 🟡 están pendientes de decidir; no se implementan hasta cerrarlos.
