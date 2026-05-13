## Substituir 4 JSONs do catálogo (v6)

Trocar os arquivos de dados em `src/data/` pelos novos uploads. Estrutura idêntica à v4 — sem mudanças de código.

### Arquivos a substituir
- `src/data/handle_to_group.json` ← `user-uploads://handle_to_group_1.json`
- `src/data/product_groups_full.json` ← `user-uploads://product_groups_full_1.json`
- `src/data/sections_meta.json` ← `user-uploads://sections_meta_1.json`
- `src/data/sections_full.json` ← `user-uploads://sections_full_1.json`

### O que muda no catálogo (v4 → v6)
- 2.849 produtos de roupa filtrados das listagens visuais
- Agrupamento de "modelo N" agora ativo
- Preservativos CONDOMERIE pintados à mão agrupados por design
- Totais por seção atualizados (ex.: BUZZ 1822→1785, SLIPPERY 817→807, TIED 885→850, NEWBIE 245→242, DUO 151→147)

### Execução
Copiar os 4 uploads sobrescrevendo os arquivos existentes (em paralelo). Vite recarrega automaticamente — nenhum restart necessário.
