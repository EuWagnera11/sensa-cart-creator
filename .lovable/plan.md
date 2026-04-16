

## Footer Redesign — Estilo KaBuM adaptado para OoohMy

Inspirado no footer das screenshots (KaBuM), vamos criar um footer com seções empilhadas bem definidas, adaptado ao nicho europeu de pleasure products.

### Estrutura (de cima para baixo)

1. **Newsletter** — Título "OoohMy News" + subtítulo "Get exclusive offers" + campo de email + botão "SUBSCRIBE" (estilo do brand, primary color)

2. **Atendimento / Support** — Centralizado, com horário (Mon–Fri, 10:00–18:00 CET) + botão "CONTACT US" em destaque (accent color, estilo bold)

3. **Info blocks** — Dois blocos:
   - **Discreet Shipping**: 🇪🇺 Ships across Europe, plain packaging
   - **Based in Ireland**: 🇮🇪 Registered brand, all prices include VAT

4. **Social Media** — Row de ícones (Instagram, TikTok, Twitter/X) centralizados

5. **Logo + Legal** — Logo OoohMy centralizado + texto legal (registered brand, VAT, GDPR) + links Privacy/Terms/Cookies

6. **Payment badges** — VISA, MC, PAYPAL, MBWAY, KLARNA em row

7. **Copyright** — Linha final com © 2026

### Design
- Background `bg-dark`, border-top `primary`
- Seções separadas por `border-b border-white/[0.08]`
- Tudo centralizado no mobile (text-center)
- Desktop: layout mais horizontal onde faz sentido
- Fontes e cores do brand (display, serif italic, primary/accent)
- Newsletter input com estilo dark, border branca sutil
- Compacto mas informativo

### Arquivo editado
- `src/components/Footer.tsx` — rewrite completo

