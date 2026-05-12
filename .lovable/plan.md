## Fix: handles com hífen retornando zero produtos

**Arquivo:** `src/hooks/useShopifyProductsByHandles.ts`

**Mudança única** — envolver o handle em aspas duplas para evitar que o `-` seja interpretado como operador NOT pela Storefront Search Syntax:

```ts
function buildHandleQuery(handles: string[]): string {
  return handles.map((h) => `handle:"${h}"`).join(" OR ");
}
```

O escape é feito automaticamente pelo JSON serializer já que `query` é passado como variável GraphQL (`$query: String`).

**Validação:** abrir `/category/buzz` (ou qualquer seção) e confirmar que os produtos aparecem.