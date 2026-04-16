

# Trocar fundo da seção "Our Best Kept Secrets" para bg-dark

## Problema
A seção está com `bg-black` (preto puro) mas o usuário quer o marrom escuro original (`bg-dark` = `hsl(23, 100%, 5%)`).

## Mudança em `src/components/Products.tsx`

### Linha 43 — div wrapper da seção
- Trocar `bg-black` por `bg-dark`
- Trocar `border-black` e `border-b-black` por `border-dark`

Resultado: fundo volta ao marrom escuro original da identidade visual OoohMy.

