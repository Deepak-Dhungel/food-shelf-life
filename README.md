# Still Good — Food Shelf life Info
 
A clean, fast, mobile-first food safety reference app that helps students and staff at **CU Denver's Milo's Market food pantry** — and everyday consumers — quickly check how long food is safe to eat after its best-by date.
 
> **Live app →** [stillgood-cu.vercel.app](https://stillgood-cu.vercel.app)

## The problem
 
CU Denver's Milo's Market food pantry receives food donations that are often at or past their best-by date. Students didn't know which items were still safe to eat, and staff were relying on a 500+ item physical handbook that was slow to search during busy hours. The USDA FoodKeeper app existed but staff found it too difficult to navigate for quick lookups.
 
**Still Good** puts the same official US government food safety data in a clean, searchable, mobile-first interface that both students and staff can use in seconds — at the pantry or at home.
 
---
 
## Features
 
- **Search 300+ food items** by name or category with instant results
- **Shelf / fridge / freezer durations** for every item, clearly labelled as after the best-by date
- **Spoilage signs** for each food — smell, texture, colour
- **Popular category grid** — browse by Dairy, Meat, Produce, Bakery, Seafood, Pantry
- **Bottom search bar on mobile** — designed for one-hand use in a pantry environment
- **PWA ready** — installable on any device, works offline

---

## Design decisions
 
A few things that are intentional and worth knowing:
 
**Search is the primary navigation.** With 300+ items, the default experience is built around searching rather than scrolling. The food list is always visible for browsing, but the search bar is the first thing a user's eye lands on.
 
**Bottom search bar on mobile.** Phones are tall. Users in a pantry are often holding something. The bottom position is ergonomically correct for one-handed use — the same reasoning behind iOS Safari's bottom address bar.
 
**No opened/unopened toggle.** All pantry items are in their default unopened state. The toggle added confusion without adding value for this use case.
 
**One universal notice.** "All durations are after the best-by date." appears once, above the list — not repeated inside every card. A single clear statement sets the user's mental model before they read any data.
 
