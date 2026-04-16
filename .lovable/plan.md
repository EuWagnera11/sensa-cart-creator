

# Plano: Layout Desktop em Todos os Dispositivos (exceto Hero)

## O que muda
Remover todos os breakpoints responsivos que mudam o layout de grid/flex para mobile, mantendo o layout desktop em todas as telas. O Hero continua com seu comportamento responsivo atual.

## Componentes afetados

### 1. `src/components/Categories.tsx`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` → `grid-cols-3`
- Remover borders condicionais por breakpoint

### 2. `src/components/Products.tsx`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` → `grid-cols-4`
- Remover borders condicionais por breakpoint

### 3. `src/components/NewArrivals.tsx`
- Banner aspect: `aspect-[4/3] sm:aspect-[1920/640]` → `aspect-[1920/640]`
- Products grid: `grid-cols-1 sm:grid-cols-3` → `grid-cols-3`
- Product aspect: `aspect-[4/5] sm:aspect-[3/4]` → `aspect-[3/4]`
- Remover borders condicionais

### 4. `src/components/SatireBanners.tsx`
- Grid: `grid-cols-1 md:grid-cols-2` → `grid-cols-2`
- Aspect: manter `md:aspect-[16/10]` como padrão
- Border: sempre `border-r-[3px]` no primeiro item

### 5. `src/components/PromoGrid.tsx`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` → `grid-cols-4`
- Remover borders condicionais

### 6. `src/components/Newsletter.tsx`
- Form: `flex-col sm:flex-row` → `flex-row`
- Input/button borders: sempre inline (sem rounded top/bottom mobile)

### 7. `src/components/Footer.tsx`
- Grid: `grid-cols-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]` → `grid-cols-[2fr_1fr_1fr_1fr]`

### 8. `src/components/Navbar.tsx`
- Manter o menu mobile hamburger (necessário para toque), mas mostrar o bag button desktop sempre
- Auth links: remover `hidden sm:` para aparecer sempre

### Não alterados
- **Hero** — mantém responsividade atual
- **AnnounceBanner**, **MarqueeBand** — já são idênticos em mobile/desktop
- **TrustBar** — já está `grid-cols-3`

## Resultado
O site terá exatamente o mesmo layout visual em celular, tablet e desktop, apenas menor em telas pequenas. O Hero continua adaptativo.

