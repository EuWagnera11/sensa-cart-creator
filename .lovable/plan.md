

# Melhorar CategoryPage — Filtros, Ordenação e Banner Promocional

Inspirado no layout do KaBuM (imagens de referência), vamos transformar a CategoryPage numa experiência mais profissional com filtros, ordenação e um banner promocional no meio dos produtos.

## Mudanças

### 1. Barra de Filtros e Ordenação (sticky)
Adicionar uma toolbar abaixo do breadcrumb, copiando o padrão já existente no `AllProductsPage`:
- **Ordenação**: dropdown (Popular, Preço ↑, Preço ↓, Melhor avaliado)
- **Filtro de preço**: chips (All, Under €30, €30–€60, €60–€100, €100+)
- **Contagem**: "X products" no lado direito
- State local com `useState` + `useMemo` para filtrar/ordenar

### 2. Banner Promocional no Meio do Grid
Inserir um banner full-width após o 4º produto:
- Fundo com cor da categoria + gradiente
- Texto promocional ("Free discreet shipping on orders over €50")
- CTA para ver todos os produtos
- Estilo retro brutal consistente com a marca

### 3. Grid de 4 Colunas no Desktop
Trocar de `lg:grid-cols-3` para `lg:grid-cols-3 xl:grid-cols-4` — mais produtos visíveis no desktop grande.

### 4. Cards Mais Compactos
- Trocar `aspect-square` por altura fixa `h-52` na imagem
- Reduzir padding de `p-5 pb-6` para `p-4 pb-4`
- Layout mais limpo e profissional, sem exageros

### Arquivo modificado
- `src/pages/CategoryPage.tsx` — todas as mudanças acima num único arquivo

