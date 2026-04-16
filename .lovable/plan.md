

# Remover bordas cinza da seção "Our Best Kept Secrets"

## Problema
O grid de produtos e os cards individuais têm bordas `border-white/15` (branco com 15% opacidade), que aparecem como cinza.

## Mudanças em `src/components/Products.tsx`

### Linha 50 — Container do grid
- Remover `border-[3px] border-white/15` do wrapper do grid

### Linha 55 — Cards individuais
- Remover `border-r-[3px] border-white/15` e `border-b-[3px] border-b-white/15` dos cards

Resultado: grid de produtos sem nenhuma borda cinza, fundo 100% preto.

