

# Reverter carrossel para estilo marquee contínuo (sem 3D)

## Problema
O carrossel atual usa o hook `useCarousel` com efeitos 3D (scale, blur, opacidade) e cards posicionados com `absolute`. O usuário quer voltar ao estilo anterior: uma faixa contínua de produtos todos visíveis, deslizando horizontalmente em loop infinito sem efeitos de profundidade.

## Mudanças

### `src/components/NewArrivals.tsx`
- Remover o import e uso do `useCarousel` hook
- Substituir o layout 3D (cards absolute + translateX por distância) por uma **faixa horizontal contínua** (marquee):
  - Array duplicado: `[...newProducts, ...newProducts]`
  - `requestAnimationFrame` loop com `translate3d` a velocidade constante (~40px/s)
  - Todos os cards com o mesmo tamanho (~220px), sem scale/blur/opacidade
  - Cards em `flex` inline, não `absolute`
  - Wrap seamless via modulo do offset
- Manter setas prev/next que avançam/recuam um card com animação suave (lerp de ~400ms)
- Manter pause on hover, resume on leave
- Manter o banner rotativo e o handleAdd inalterados
- Remover dots indicadores (não fazem sentido num marquee contínuo)

### `src/hooks/useCarousel.ts`
- Pode ser mantido (não causa problema) mas deixará de ser usado pelo NewArrivals

## Resultado
Carrossel plano, contínuo, todos os produtos visíveis lado a lado, loop infinito sem efeito 3D.

