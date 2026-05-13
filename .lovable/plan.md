## Bloco 6 — Age Gate + Cookie Banner + Páginas Legais

Implementação completa de compliance (idade 18+, GDPR, páginas legais) on-brand com a estética retrô OoohMy. Tudo em inglês, com placeholders `[COMPANY_NAME]`, `[CONTACT_EMAIL]` etc. pra preencher antes do go-live.

### Novos arquivos (9)

**Hooks**
- `src/hooks/useAgeVerified.ts` — leitura/gravação em `localStorage` (`om_age_verified`), TTL 30 dias, SSR-safe
- `src/hooks/useCookieConsent.ts` — leitura/gravação consent (essential / analytics / marketing / personalization), TTL 13 meses (CNIL), dispatch `om-consent-changed` no window. Exporta também `useAnalyticsAllowed`, `useMarketingAllowed`, `usePersonalizationAllowed`

**Componentes**
- `src/components/AgeGate.tsx` — modal full-screen retrô (cream/dark/red), não fecha sem confirmar, 2 CTAs ("Yes, I'm 18+" / "Not yet" → `google.com`)
- `src/components/CookieBanner.tsx` — banner inferior, 3 botões com mesmo peso visual ("Accept all" / "Reject all" / "Customize"), escuta evento `om-open-cookie-prefs`
- `src/components/CookiePreferencesModal.tsx` — modal granular com toggles (Essential travado on, Analytics, Marketing, Personalization), botão Save / Accept all / Reject all, fecha com ESC

**Páginas legais** (todas com Navbar + Footer + SEOHead, layout cream/dark/red)
- `src/pages/PrivacyPolicyPage.tsx` — GDPR Art. 13 completo, link "Change cookie preferences" que dispara `om-open-cookie-prefs`
- `src/pages/TermsOfUsePage.tsx` — termos + cláusula 14 dias retratação + exceção higiene Art. 16(e)
- `src/pages/RefundPolicyPage.tsx` — política devolução
- `src/pages/ImpressumPage.tsx` — DE/AT compliant (§5 TMG, §18 MStV)

### Edits

**`src/App.tsx`**
- Imports: `AgeGate`, `CookieBanner`, 4 páginas legais
- 4 rotas novas: `/privacy`, `/terms`, `/refund-policy`, `/impressum`
- Montar `<AgeGate />` e `<CookieBanner />` dentro do `<CartProvider>` (depois do `<ShopifyCartDrawer />`), pra ter acesso ao Router

**`src/components/Footer.tsx`**
- Adicionar coluna "Legal" com 4 links (Privacy / Terms / Refund / Impressum), seguindo a tipografia/cores existentes do footer

### Comportamento

```text
1ª visita → Age Gate (bloqueia tudo)
  ├─ Yes 18+ → fecha, salva localStorage 30d → mostra Cookie Banner
  └─ Not yet → window.location = google.com

Cookie Banner (não bloqueia conteúdo)
  ├─ Accept all → salva tudo true, 13 meses
  ├─ Reject all → só essential, 13 meses
  └─ Customize → abre Modal Preferences

Privacy Policy → link "Change cookie preferences" → reabre banner/modal
```

### Detalhes técnicos

- Sem dependências novas (React, React Router, Lucide, Tailwind já no projeto)
- Hooks SSR-safe (retornam `null` na hidratação inicial pra evitar flash)
- Age gate usa `role="dialog" aria-modal="true"`, focus trap, ESC desabilitado
- Cookie banner usa `position: fixed bottom-0`, z-index acima do conteúdo mas abaixo do age gate
- Imagens com `loading="eager"` (preferência salva)
- Cores via design tokens (`bg-cream`, `text-dark`, `bg-primary` etc.) — sem cores hardcoded
- Dispatch `window.dispatchEvent(new CustomEvent('om-consent-changed', { detail: consent }))` quando consent muda — GA/pixels podem escutar

### Validação após implementar

1. Aba anônima → age gate aparece
2. Yes 18+ → banner cookie aparece
3. Reject all → banner some
4. `/privacy` `/terms` `/refund-policy` `/impressum` renderizam
5. Footer mostra 4 links legais
6. Reload → age gate **não** reaparece (até 30d)
7. Mobile responsivo, sem overflow
