# SportWear Pro — Vue 3 + Express + MongoDB

Converted from React + Supabase to:
- **Frontend:** Vue 3 + Vite + Tailwind CSS + Pinia + Vue Router
- **Backend:** Node.js + Express.js (REST API, JWT auth)
- **Database:** MongoDB (Mongoose)

## Key change requested: Product Page
- **No price, no stock** shown anywhere (removed from Product model and all UI).
- Product page shows only: name + **one** description/detail field.
- Two buttons under the product:
  1. **Order via WhatsApp** — opens WhatsApp chat with the shop's number (from Settings) with a pre-filled message about the product ("deal ho gayi" flow).
  2. **View Payment Method** — goes to `/payment-details`, which lists the accepted transfer methods (Western Union, MoneyGram, Bank Transfer) and the active bank account details (title, account number, IBAN).

## Project structure
```
backend/     Express API + MongoDB models
frontend/    Vue 3 + Vite app
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGODB_URI, JWT_SECRET, CLIENT_URL
npm run dev
```

API runs at `http://localhost:5000`. Health check: `GET /api/health`.

### Create your first admin user
There's no separate admin-signup route (kept simple). After registering a normal
account via `POST /api/auth/register`, promote it to admin directly in MongoDB:

```js
// in mongosh, connected to your database
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

Then log in again on the frontend — you'll see the **Admin** link in the nav.

### API overview
| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Login, returns JWT |
| GET | /api/categories | — | List categories |
| POST/PUT/DELETE | /api/categories | admin | Manage categories |
| GET | /api/products?category=id | — | List products |
| POST/PUT/DELETE | /api/products | admin | Manage products |
| GET | /api/quicklinks | — | Public quick links |
| GET | /api/bankaccounts | — | Public bank accounts (for payment page) |
| GET/PUT | /api/settings | — / admin | WhatsApp number, company name |
| POST | /api/orders | — | Create order, returns tracking ID |
| GET | /api/orders/track/:trackingId | — | Track order status |
| GET | /api/orders | admin | List all orders |
| PUT | /api/orders/:trackingId/status | admin | Update order status |

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# edit .env if backend URL differs
npm run dev
```

Runs at `http://localhost:5173`.

## Notes on migration decisions
- The huge shadcn/Radix UI component library (60+ files) from the original React app
  was **not** ported 1:1 — it was replaced with lightweight Tailwind markup in Vue,
  since those components are React-specific and have no direct Vue equivalent. The
  visual design (colors, spacing, rounded cards) was kept close to the original.
- Supabase Auth was replaced with a simple JWT + bcrypt auth system in Express/MongoDB.
- Stripe integration, PDF export, drag-and-drop reordering, and the map/leaflet
  features present in the original `node_modules` were not part of the pages you
  listed and were left out to keep this focused — let me know if you need any of them
  added back.
- The Admin panel here is a simplified single-page CRUD (categories, products, quick
  links, bank accounts, settings, order status) rather than the original 689-line
  dashboard — functionally equivalent, visually simpler.
