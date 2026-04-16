

# Carrossel 3D estilo "ProductCarousel" para New Arrivals

## O que muda

Substituir o carrossel marquee atual (scroll contínuo horizontal) por um **carrossel circular 3D** onde:
- O card ativo fica centralizado, em destaque (scale 1.0, opacidade total)
- Cards adjacentes ficam menores, com blur e opacidade reduzida, criando profundidade
- Navegação por setas (prev/next) com transição suave animada
- Auto-play com intervalo (~4s), pausa no hover
- Loop infinito circular (último → primeiro sem salto)

## Estrutura

### 1. Hook `useCarousel` (`src/hooks/useCarousel.ts`)
- Recebe: `itemCount`, `autoPlayInterval` (default 4000ms)
- Gerencia: `activeIndex`, funções `next`/`prev`, auto-play com pause on hover
- Calcula estilos 3D para cada card baseado na distância ao ativo:
  - **Ativo**: `scale(1)`, `opacity: 1`, `blur(0)`, `z-index: 10`
  - **±1**: `scale(0.85)`, `opacity: 0.6`, `blur(1px)`, `z-index: 5`
  - **±2+**: `scale(0.7)`, `opacity: 0.3`, `blur(3px)`, `z-index: 1`
- Distância circular: `Math.min(Math.abs(diff), itemCount - Math.abs(diff))`

### 2. Refatorar `NewArrivals.tsx`
- Manter: banner rotativo no topo, dados dos produtos, handleAdd
- Substituir: seção do carrossel marquee pelo novo layout 3D
- Cards dispostos com `position: absolute` + `translateX` calculado, centralizados
- Transição CSS com `transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- Setas prev/next mantêm o estilo visual atual (cream/border-dark/rounded)
- On hover no container: pausa auto-play

### 3. Visual dos cards
- Mantém o design atual dos cards (imagem, sticker, nome, preço, botão Add)
- Card ativo: tamanho maior (~280px width), sombra mais forte
- Cards laterais: menores, desfocados, clicáveis para navegar até eles

## Arquivos alterados
- `src/hooks/useCarousel.ts` — novo hook
- `src/components/NewArrivals.tsx` — refatorar seção do carrossel

