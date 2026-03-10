# AI Guidance Site – TODO

## Voice & Writing (priority – "they're not children")

The whole site reads like Claude wrote it for an audience that needs convincing. GiveWell/Wikipedia tone: flat, direct, assumes competence. State what something is and stop.

- [ ] **Deslop ALL section headers** – "What's Useful" (vague), "Uncomfortable Questions" (dramatic). Headers should be clear labels, not editorial framing. Every header: would a colleague use this phrase? If not, cut.
- [ ] **Deslop ALL subtitles** – patronizing ("The workforce conversation, past the hype"). Either make them genuinely informative or cut them.
- [ ] **Deslop ALL section intros** – stat-stuffed ledes, stacked concerns, hand-holding. One sentence saying what the section covers. Stats belong in footnotes/hover notes, not the intro.
- [ ] **Deslop ALL resource descriptions** – Claude-isms: "Essential for," "Particularly strong on," "The most comprehensive," "raises questions about," "the stakes:" followed by list. State what it does. One sentence. Maybe two.
- [ ] **Deslop resource notes** – "Start here." "The strongest dedicated tool." Placement does that work. Cut or flatten.
- [ ] **Deslop landing page** – home-intro stacks "power asymmetries" + "equity implications" + "poorly understood." Dense. Rewrite as something a person would actually say to a colleague.
- [ ] **Voice model**: GiveWell reviews, Wikipedia article intros, Stratechery (for the analytical bits). Flat, competent, assumes the reader knows things.

## UI/UX Design

- [ ] **Hover notes / footnotes** – descriptions carry too much info. Title + 1 sentence visible; stats, context, caveats in hover tooltip or expandable footnote. Reduces visual weight without losing information.
- [ ] **Persona cards: rewrite to be about the person** – "Data & Privacy" describes a topic. "I handle sensitive data" describes a person. Make the entry point about the reader's situation, not the section's subject.
- [ ] **News: sortable by date** – entries have `date` field. Add JS to sort newest-first (default) with toggle.
- [ ] **News: topic tag filtering** – reuse existing tag filter bar on news page. Tags like `policy`, `workplace`, `health`, `education`, `privacy`.
- [ ] **Card/column layout for dense sections** – Research & Writing has 8+ resources. Two-column or card grid reduces scroll.

## Content

- [ ] **News section: Lee curates manually** – structure at `src/_data/news.json`. Add entries to `tiers[0].resources` array.
- [ ] **Future of Work: expand** – Harvard HSPH essay series as anchor. More essays on judgment, expertise, what changes.
- [ ] **Audit Work & Identity vs Future of Work overlap** – HBR work intensification appears in both. Differentiate or merge.
- [ ] **Verify all URLs** – sprint 1 URLs may be fabricated. Manual check needed.

## Technical

- [ ] **Dark mode audit** – hover backgrounds, tier reveal, footer accent line
- [ ] **Mobile audit** – sidebar has 17 items (8 guide + 9 reading + news). Probably needs collapsible groups on mobile.
- [ ] **Print stylesheet** – check new layout
