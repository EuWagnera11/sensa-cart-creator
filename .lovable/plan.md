

# Plano: Escalonamento para 4K e Ultra-Wide

## Problema
A fórmula atual `clamp(0.8rem, 0.65rem + 0.4vw, 1rem)` tem teto em `1rem` (16px), que é atingido em ~1920px. Em monitores 4K (2840x2160), o font-size fica travado em 16px — tudo parece minúsculo porque os pixels físicos são muito densos.

## Solução
Estender a fórmula do root font-size para continuar escalando acima de 1920px, subindo proporcionalmente até ~22px em 2840px.

---

## Alterações Técnicas

### 1. `src/index.css` — Nova fórmula de escalonamento
Substituir a fórmula atual por uma que escala de **14px (1280px)** até **22px (2840px)**:
```css
html {
  font-size: clamp(0.875rem, 0.5rem + 0.5vw, 1.375rem);
}
```
Cálculo: em 1280px → ~0.875rem (14px), em 1920px → ~1.1rem (17.6px), em 2840px → ~1.375rem (22px).

Isso faz todo o site escalar para cima em 4K automaticamente, sem mudar nada em Full HD (fica praticamente igual ~16-17px).

### 2. `src/components/Hero.tsx` — Ajustar max dos clamp do título
Os clamp dos títulos têm max values que precisam subir para não "travar" em 4K:
- "Oooh My." → `clamp(3rem, 5.5vw, 9rem)`
- "Pleasure." → `clamp(3.5rem, 6.5vw, 12rem)`
- "Unfiltered." → `clamp(2.2rem, 4vw, 6.5rem)`

### 3. `src/components/Navbar.tsx` — Adicionar scaling 3xl
Usar o breakpoint `3xl` já configurado para aumentar proporções em 4K:
- Altura: adicionar `3xl:h-[80px]`
- Padding: adicionar `3xl:px-16`

Isso garante que a navbar não fique "perdida" em telas gigantes.

---

## Resultado
O site vai escalar proporcionalmente de 1280px até 2840px+. Em Full HD continua praticamente igual (variação mínima de ~1px). Em 4K, tudo cresce proporcionalmente mantendo as mesmas proporções visuais.

