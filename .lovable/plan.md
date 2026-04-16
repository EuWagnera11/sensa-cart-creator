

# Plano: Responsividade Universal com Escalonamento por Viewport

## Problema
O site fica perfeito em Full HD (1920x1080) mas fica "apertado" em resoluções menores como 1360x768. Os textos, paddings e alturas estão dimensionados com valores fixos (rem/px) que não escalam proporcionalmente entre diferentes tamanhos de desktop.

## Solução
Usar **escalonamento CSS baseado em viewport** para que o site inteiro se adapte proporcionalmente a qualquer resolução. A técnica principal é aplicar um `font-size` responsivo no `<html>` usando `clamp()`, fazendo com que todos os valores em `rem` escalem automaticamente.

## O que muda visualmente
Nada. O site vai parecer exatamente igual em Full HD. Em telas menores (1360px, 1280px, etc.) ele vai "encolher" proporcionalmente, mantendo as mesmas proporções visuais.

---

## Alterações Técnicas

### 1. `src/index.css` — Escalonamento global via root font-size
Adicionar um `font-size` responsivo no `html` que escala de ~14px (em 1280px) até 16px (em 1920px):
```css
html {
  font-size: clamp(0.8rem, 0.65rem + 0.4vw, 1rem);
}
```
Isso faz com que TODOS os componentes que usam `rem` escalem automaticamente.

### 2. `src/components/Hero.tsx` — Ajustar clamp values
Substituir os `clamp()` dos títulos para usar `vw` units que escalem melhor:
- "Oooh My." → `clamp(3rem, 5.5vw, 7.5rem)`
- "Pleasure." → `clamp(3.5rem, 6.5vw, 9.5rem)`
- "Unfiltered." → `clamp(2.2rem, 4vw, 5.2rem)`

Mudar `min-h-[80vh] sm:min-h-[92vh]` para `min-h-[85vh]` para evitar scroll desnecessário em telas baixas (768px height).

### 3. `src/components/Navbar.tsx` — Escalar para telas menores
Reduzir padding e tamanho do logo em telas médias:
- Altura do navbar: `h-[66px]` → `h-[58px] xl:h-[66px]`
- Padding horizontal: `px-6 lg:px-12` → `px-4 lg:px-8 xl:px-12`
- Nav items padding: `px-[14px]` → `px-[10px] xl:px-[14px]`

### 4. `src/components/SatireBanners.tsx` — Aspect ratio flexível
Mudar `aspect-[16/9]` para `aspect-[16/10]` no desktop médio para melhor preenchimento.

### 5. `src/components/PromoGrid.tsx` — Min-height responsiva
Trocar `min-h-[340px]` fixo por `min-h-[280px] xl:min-h-[340px]`.

### 6. `tailwind.config.ts` — Adicionar breakpoint `3xl`
Adicionar screen `"3xl": "1920px"` para poder ter ajustes específicos para monitores grandes se necessário no futuro.

---

## Resumo
A mudança mais impactante é o **item 1** (root font-size responsivo). Ele sozinho já resolve 80% do problema porque todos os rem/em do site passam a escalar proporcionalmente. Os demais ajustes são refinamentos pontuais.

