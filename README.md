# WEB103 Prework - *Creatorverse*

Submitted by: **👉🏿 KIM NGAN TRAN**

About this web app: **A full CRUD frontend for managing a personal collection of content creators. Users can browse all creators, view a single creator in detail, add new creators, and edit or delete existing ones. Each creator has a name, channel URL, description, optional image, and optional social media links (YouTube, X, Instagram, TikTok). Built with React + Vite, styled with PicoCSS and a custom Apple-inspired liquid-glass theme, with Supabase as the backend database.**

Time spent: **👉🏿 10** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] Full-screen hero landing section with a space-themed background and animated CTAs
* [x] Apple iOS-inspired liquid-glass button theme (backdrop-filter blur, sky-blue gradients)
* [x] Per-creator social media links for YouTube, X (Twitter), Instagram, and TikTok using official brand icons via `react-icons`
* [x] Gradient initials placeholder shown when a creator has no image URL
* [x] Smooth-scroll anchor navigation from hero CTA to the creator grid
* [x] Responsive card grid layout that auto-fills based on viewport width
* [x] Sticky footer with credit line, anchored to the bottom of the page
* [x] Confirm dialog before deleting a creator to prevent accidental loss

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Creatorverse demo walkthrough](demo.mov)

GIF created with macOS Screen Recording.

## Tech Stack

- **React** + **Vite** (with `react-router-dom` for client-side routing)
- **Supabase** (Postgres database + auto-generated REST API via `@supabase/supabase-js`)
- **PicoCSS** for baseline classless styling
- **react-icons** (Simple Icons set) for official brand logos

## Project Structure

```
src/
├── App.jsx              # Routes + layout (hero header on home, mini-header elsewhere)
├── clients.js           # Supabase client (createClient with URL + anon key)
├── components/
│   └── Card.jsx         # Creator card (image/placeholder, name, description, socials, actions)
└── pages/
    ├── ShowCreators.jsx # Home: fetches all creators, renders card grid
    ├── ViewCreator.jsx  # /creator/:id — single creator detail page
    ├── AddCreator.jsx   # /add — form to insert a new creator
    └── EditCreator.jsx  # /edit/:id — form to update or delete a creator
```

## Supabase Schema

`creators` table columns:

| Column        | Type   | Nullable | Notes                          |
|---------------|--------|----------|--------------------------------|
| `id`          | int8   | no       | Primary key, auto-increment    |
| `created_at`  | timestamptz | no  | Default `now()`                |
| `name`        | text   | no       |                                |
| `url`         | text   | no       | Main channel/profile link      |
| `description` | text   | no       |                                |
| `imageURL`    | text   | yes      | Optional creator image         |
| `youtube`     | text   | yes      | Optional YouTube link          |
| `twitter`     | text   | yes      | Optional X (Twitter) link      |
| `instagram`   | text   | yes      | Optional Instagram link        |
| `tiktok`      | text   | yes      | Optional TikTok link           |

Row Level Security is **disabled** and Realtime is **enabled** per the prework spec.

## Notes

A few challenges I worked through while building this app:

- **Picking the right Vite + React Router setup.** My first scaffold used React Router v7 in framework mode (with `app/root.tsx`, SSR, file-based routes — closer to Remix). The WEB103 instructions assume the simpler client-side setup, so I scrapped it and re-scaffolded with `npm create vite@latest` + `react-router-dom` and used `<BrowserRouter>` / `useRoutes` instead. Lesson learned: read the version assumptions in tutorials carefully — "React Router" means very different things in v6 vs v7.

- **Supabase key safety.** I initially pasted the `service_role` (secret) key into `clients.js` and only caught it when an error told me I had `supabase` declared twice. The service key bypasses Row Level Security and would give anyone reading the bundle full admin access — I swapped it for the publishable (anon) key and rotated the secret one in the dashboard.

- **React/JSX gotchas.** Wrote `import useEffect, { useState } from 'react'` (treating `useEffect` as a default export) and hit a parse error. Also returned `creators.map(...)` and `<section>` as siblings inside `return (...)` without a wrapper, which JSX won't allow — fixed by wrapping in a single root element.

- **Nested anchor tags.** When I tried to make the whole `<Card>` clickable by wrapping it in `<Link>` *and* also keeping an external "Visit channel" `<a>` inside the card, browsers ignore the inner link. Switched to giving each card explicit View / Edit buttons so the action targets are unambiguous.

- **Equal-height cards in a grid.** Cards with longer descriptions pushed the View/Edit buttons lower than cards with short ones. Solved with `display: flex; flex-direction: column` on the card itself plus `margin-top: auto` on the action row to pin the buttons to the bottom regardless of content length.

- **Apple liquid-glass styling.** Mostly experimenting with `backdrop-filter`, layered `box-shadow` (one inset highlight on top, one inset shadow on bottom, one outer drop shadow), and sky-blue → system-blue gradients to approximate the iOS button look on top of the dark space hero.

## License

Copyright [👉🏿 2026] [👉🏿 KIM NGAN TRAN]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
