# Copy review — where we meet

Reviewed 4 September 2026, against your section-by-section notes. Structure: the four
patterns that explain most of the individual complaints, then section by section with
current → proposed, then the asset notes you asked me to write down.

Where I disagree with you it says so.

> **Status, 4 September.** Everything in the "Four patterns" section and every proposal
> below that we agreed on is now in the code and verified — see the third-pass changelog
> in `audit-2026-09-04.md` for the line-by-line. The three items under "Where we don't
> meet" are untouched and still open, plus one reversal: I proposed moving the keystone
> rarity line into the home stack's foot, and on implementation that duplicated the whole
> argument of the build page's beat 3, so the home foot kept its existing line instead.
> The asset notes at the bottom are unchanged and still need you.


---

## Four patterns

### 1. The lines you love state a fact. The lines you flagged announce a conclusion.

This is the whole review in one rule, and it's your own taste — it just hasn't been
written down as a rule yet.

| Lines you love | What they do |
|---|---|
| "Where physics, safety and people set the requirements." | States a constraint. Reader concludes: these people are serious. |
| "Most engagements start small and on a fixed price." | States a practice. Reader concludes: low risk. |
| "We added AI to a control engineering company, not the other way round." | States a history. Reader concludes: rare. |
| "Most AI works with text and images. Ours works with pumps, vehicles, production lines and power." | States a difference. Reader concludes: different category. |

| Lines you flagged | What they do |
|---|---|
| "Most conversations start in one of four places." | Announces a taxonomy. |
| "Why the combination is rare" | Announces the thesis. |
| "Trusted in regulated industry" | Awards itself trust. |
| "Where the work has been done" | Labels a shelf. |

Every proposal below is the same move: replace the announcement with the fact that
would have made the reader announce it themselves.

### 2. Two arguments are each made twice, and both times the weaker version got the headline.

**Rarity.** Stated as a footnote on the home stack — "Few firms work across all four." —
in small text under the table. And stated as a section heading on /how-we-build/ —
"Why the combination is rare". Neither is the argument. The argument is the H2 sitting
*underneath* the second one: **"AI specialists reach for physics late. Engineering firms
treat AI as an add-on."** That line is excellent and it's in the basement.

**Physical AI.** The home H1 and the /how-we-build/ H1 are the same five words, while
the line that actually distinguishes you — "Most AI works with text and images. Ours
works with pumps…" — is body copy underneath the duplicate.

In both cases the fix is a promotion, not a rewrite. You've already written the good
line; it's in the wrong slot.

### 3. There is not one contraction on the site.

You spotted this on "You do not have the team." It's everywhere: *what is not working*,
*whether it is worth continuing*, *we do not start from an empty repository*, *what you
do not need to do yourselves*. Individually each is fine. Cumulatively it reads
translated, and it's most of why the voice feels "direct in the wrong way" — the
formality reads as distance, and then a blunt line lands as cold rather than confident.

This is one global decision, not sixteen line edits: **contractions allowed in
second-person address, avoided in technical assertions.** "You've got the data" — yes.
"Every result can be rebuilt from its inputs" — leave alone.

### 4. There is not one person in the art direction.

Your Projects note — "include PEOPLE and the feeling of interactivity and
communication" — is right, and it's not a Projects problem. The site's second line of
copy is "where physics, safety and **people** set the requirements", and then there is
not a single human anywhere: a particle simulation, a wordmark, four SVG diagram
stand-ins and some ruled tables. The visuals currently contradict the headline claim.

Good news architecturally: `ImageRef` in `content/types.ts` is already a discriminated
union on `kind: 'svg-standin'`. Photography is `kind: 'photo'` with src, alt and a focal
point. The stand-ins were built to be replaced.

---

## Home

### Hero — mostly hands off, one cut

You love it and you're mostly right to. "AI for the physical world / Where physics,
safety and people set the requirements." is the best copy on the site, and I wouldn't
touch either line.

**But there are four stacked copy blocks before the CTAs, and the third one is the
first one again.** `statement` is "We build AI for physical systems." — that is the
headline, restated as a sentence, one block below the headline. Cutting it loses nothing
and the hero gets faster.

The other soft spot is the last thing the reader sees before the buttons:

> "Machine learning extended what we could do. Modern AI is expanding it further."

"Expanding it further" is the vaguest phrase in the hero, and it's in the most
load-bearing position. Everything above it is concrete — defence, automotive, medtech,
two decades — and then it trails off into abstraction. I'd end on the stake rather than
the expansion. Your call on the exact line; the note is that the paragraph currently
ends on its weakest clause.

### "What we do" — agreed, and there's a second problem underneath

Your diagnosis is right on all three counts: "Most conversations" is unfalsifiably
broad, "start in one of four places" is administrative, and the hypothetical trick is
good but the base truth is about *your inbox* rather than *their situation*.

**Proposed heading:** "You already know which of these is yours."

That does what you described — assumes a base truth, makes them work backwards, gets
"here's what you should be asking" energy — and it moves the subject from Combine to the
reader. Alternates: "One of these is already true where you work." / "Start with the one
you recognise."

**The problem you didn't mention:** the four items aren't parallel. Two are the reader's
situation, two are your pitch.

| # | Current | |
|---|---|---|
| 1 | "You have the data and the mandate. You do not have the team." | reader's situation ✓ |
| 2 | "The pilot impressed everyone. Then it stopped there." | reader's situation ✓ |
| 3 | "Less energy, more capacity, fewer surprises." | **your benefit list** ✗ |
| 4 | "Physical systems demand deterministic behaviour." | **your engineering principle** ✗ |

Under "you already know which of these is yours", all four have to be theirs. #1 and #2
already are — and they're the two best lines in the section, which is not a coincidence.

- **3 →** "You're paying for capacity you can't reach."
- **4 →** "Nobody will sign off on a system that can't be predicted."

Both keep your recognition mechanic and both are the reader's problem, not your
principle. The principle can be the body copy underneath; it reads much better as the
answer than as the question.

### "Four layers, one delivery" — heading stays, date column goes

Agreed on the dates, and here's the argument for why they're worse than graceless:
**the column undercuts the claim it exists to support.** "Foundation models — 2024
onwards" tells a savvy reader you are exactly as new at this as everyone else. The flex
is the *bottom* of the stack, and giving all four rows a date flattens the one row that
matters into trivia. "Always" is the tell — it's a joke, and it's carrying the most
important claim in the table.

Then the actual argument is in the small print underneath: "Few firms work across all
four."

**Proposal:** drop the third column. Keep name + what it's for. Then promote the rarity
line from /how-we-build/ into the foot slot:

> **Four layers, one delivery.**
> Foundation models · Classical machine learning · Control engineering · Software and systems
>
> *AI specialists reach for physics late. Engineering firms treat AI as an add-on.*

That fixes your date complaint and your "why the combination is rare is so lame"
complaint with one move, because they were the same complaint.

If you want to keep a third column, make it **what breaks without the layer**, not when
it was invented. "Control engineering — without it the model is a suggestion." That's
your voice. A date isn't.

### "Where the work has been done" — agreed

Your instinct ("where we got the experience you're benefitting from") is the right
*content* but I'd resist the phrasing — "you're benefitting from" puts you slightly
below the reader, and nothing else on the site does that.

- **"What it looks like finished."** ← my pick. Concrete, sets up three cards, no boast.
- "Three systems, in service." ← strongest if it's true of all three. Koster reads like a
  research programme rather than an operational system — check before using.
- "Built, and still running."

### "Trusted in regulated industry" — I'd go further than you did

You called it "basically a report card" and said the message is solid. The message *is*
solid — and it's solid because every item under the heading is a verifiable fact: ~40
engineers, ~20% with a PhD, founded 2002, ISO 9001 · 14001. **The heading is the only
unfalsifiable thing in the section.** It awards you trust in your own voice, directly
above four things that would have earned it.

- **"What you're hiring."** ← my pick. Reader-facing, frames the numbers as due
  diligence rather than as a boast.
- "The firm behind it."
- Or drop the eyebrow and let the four metrics carry the section unannounced.

---

## Services

### Hero — agreed, and here's the self-referential cant

> **"Ours start small, and on a fixed price."**

The pronoun does the work and it's shorter. If you want the warmer version, which adds
intent rather than just description: "We'd rather start small, and on a fixed price."

Image: see asset notes.

### "You have the data and the mandate. You do not have the team."

Agreed on the contraction, and I'd push past it. The contraction fixes the *temperature*
but not the *content* — the line still tells an engineering leader that what they lack
is a team, and they could obviously hire a team. What they don't have is the **year**.

> **"You've got the data and the mandate. What you don't have is a year."**

Same structure you liked, contraction included, and the deficit moves from competence to
time — which is what your own body copy already argues ("a year and five hires before
you know whether it was worth it"). It also stops the body from having to deliver the
punchline twice.

### "How we start" / "How we engage" — strong agreement, and the fix is structural

You're right that these are criminally under-communicative, and the reason is precise:
**the titles are product names, and the eyebrow slot that could explain them is spent on
a row number.** `01 / 02 / 03` tells a reader nothing they can't see — there are three
items, side by side, in order. Meanwhile "AI for decision makers" could be a webinar, a
book, a retainer or a course, and the thing that would resolve it in four words — *it's
a day in your office* — isn't anywhere.

**Option A — plain English leads, product name supports** (better for a first-time reader):

| | Eyebrow | Title | Body |
|---|---|---|---|
| 01 | Workshop · fixed price | **A day in your office** | mostly as-is |
| 02 | Audit · fixed price | **Two weeks in your data** *(confirm the real duration)* | as-is |
| 03 | Embedded team | **Nothing to recruit.** | as-is |

"Nothing to recruit." is lifted straight out of your own body copy, which is where the
best line in that block currently is.

**Option B — product name leads, format line underneath** (better if sales runs on the
names): keep the titles, add a mono format line — "One day · in your office · fixed
price". Less elegant, zero risk to anything already sold under those names.

I'd take A unless the names are load-bearing commercially. Your call — that's a sales
question, not a copy question.

---

## Projects

Both notes recorded below. The one thing I'd add to your read: the grid can't become a
"one-frame exploration with people and interactivity" through copy, so this section is
blocked on photography and clearance rather than on writing. What copy *can* do
meanwhile is stop the cards reading as a filing system — right now a card is a number, an
industry, a title and a client, which is a catalogue entry. One line of outcome per card
would do more than any heading change.

The three `summary` lines in `cases.ts` are already good enough to pull a clause from.

---

## How we build

### The whole page reorders around one promotion

Your four notes on this page — the repeated H1, the repeated Stack, "not just
manipulating foundation models", and rarity deserving to be higher — resolve together
once the buried line is promoted:

| | Beat | Line |
|---|---|---|
| 1 | The distinction | **"Most AI works with text and images."** / *"Ours works with pumps, vehicles, production lines and power."* — promoted from body to H1 |
| 2 | So the model isn't the product | The model is the top of a stack, not the thing you bought → **Stack**, which now has a job here it doesn't have on the home page |
| 3 | Why almost nobody does this | "AI specialists reach for physics late. Engineering firms treat AI as an add-on." — **moved up**, eyebrow deleted |
| 4 | The proof | **"We added AI to a control engineering company, not the other way round."** |
| 5 | The mechanism | Traceability → Reproducible by construction |
| 6 | CTA | as-is |

That's your "savvy consumer" spine: distinction → consequence → scarcity → credential →
mechanism. And it answers your "we aren't just manipulating foundation models" note
structurally rather than with a disclaimer — beat 2 *is* that point, and the Stack is
already built to make it.

**On the repeated H1:** I'd call it bad rather than neutral, for a reason beyond taste —
two pages competing for one query, and the second page spending its most valuable slot
on words the first page already owns. The URL stays `/ai-for-the-physical-world/`, so the
keyword is kept regardless. The promotion costs nothing and buys a real headline.

**On the repeated Stack:** don't polish one and hope the other improves — give them
different jobs. Home: *few firms have all four* (the rarity argument). Build: *here's
what each layer is for* (the mechanism). The `detailed` prop that already exists for this
currently swaps exactly one sentence; it should swap the framing.

### "We added AI to a control engineering company, not the other way round."

Agreed, and stronger than you put it: this is a positioning line doing more work than
either page's H1. It survives verbatim. Imagery noted.

### Traceability / "Reproducible by construction" — mild disagreement

You said they scratch the same itch. They do, but I'd keep both, because they're a
principle followed by its implementation — "the answer has to exist inside the system"
is the claim, "reproducible by construction" is how. That's a correct escalation; it
would only be waste if both read as principles.

What I *would* trim is underneath: the three platform paragraphs are the densest text on
the site and the third one restates the first.

### "Why the combination is rare" — agreed, delete

The heading is the writer announcing his own thesis, and it's standing on top of the
best argument on the page. Delete the eyebrow's job, promote the H2, move the whole
thing up to beat 3.

Also cut the pull quote — "AI + controls + safety engineering." That's a conference
slide, not a sentence, and it's the only place on the site that reads like a deck.

---

## Insights / Products

Agreed on both, with one note each.

**Insights.** `articles.ts` is an empty array with a comment saying it stays empty until
there are named authors, an agreed cadence and publishable copy. That's the right call
and I'd keep it. The problem isn't the empty page, it's that the empty page is in the
nav, in the sitemap, the target of an RSS feed with zero items, and the secondary CTA on
every other page. Stop promoting it until it exists.

**Products.** The page says "We are not only a services company. We build and own
software" and then shows one product. Either commit — make the page *about* Sympathy for
Data, which is a real product with a real traceability story that reinforces the whole
/how-we-build/ argument — or wait. The current version half-does both.

---

## Asset notes

Recorded as asked; nothing here is actionable by me.

| Where | Asset | Status |
|---|---|---|
| Services hero | "Sasha at the whiteboard in front of people", from the previous combine.se | Exists — needs locating and cropping |
| Projects hero | Redemptor hardware | **Needs clearance** before use |
| Projects grid | People, interactivity, communication — a one-frame exploration rather than a card catalogue | Needs a shoot or existing library |
| "We added AI to a control engineering company" | Real imagery to hammer it home | Needs a shoot |
| Home hero | Connected-dots particle field — keep, but consider tying it to something physical on /how-we-build/ | Exists (`DriftHero`) |
| Site-wide | Zero people currently anywhere. See pattern 4. | — |

Technical note for whoever wires these up: `ImageRef` is a discriminated union on `kind`,
currently only `'svg-standin'`. Add `kind: 'photo'` with src/alt/focal-point and the
existing `CaseStandin` switch becomes the fallback for entries without photography yet.
No refactor needed.

---

## Where we don't meet

Short list, so it doesn't get lost above:

1. **The hero.** You love it; I'd cut `statement` ("We build AI for physical systems.")
   because it's the headline again, and I'd rewrite the last clause of the body.
2. **Traceability + "Reproducible by construction".** You read them as redundant; I read
   them as principle-then-implementation and would keep both, trimming the paragraphs
   underneath instead.
3. **"Trusted in regulated industry".** You said the message is solid and the marketing
   could be better. I'd say the heading is the only claim in the section you haven't
   earned on the page, and the fix is to delete it rather than improve it.
4. **The repeated H1 on /how-we-build/.** You wondered if the repetition might be fine.
   It isn't — but the fix is free, because the better headline is already written and
   sitting two blocks below it.
