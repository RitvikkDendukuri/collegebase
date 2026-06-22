# CollegeBase

Explore real college applicant profiles, acceptance patterns, and school statistics. Built as an honest alternative to "chance me" posts — every number shows its sample size, and unreliable rates are flagged.

**Live:** [simplycollege.onrender.com](https://simplycollege.onrender.com)

---

## Quick Start

```bash
pip install -r requirements.txt
cd collegebase-frontend && npm install && npm run build && cd ..
uvicorn main:app --reload
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000).

For frontend dev with hot reload, also run `npm run dev` inside `collegebase-frontend/`.

---

## Features

<details>
<summary><strong>Dashboard</strong> — Overview stats, charts, and correlation matrix</summary>

### Dashboard

The landing page summarizing all profiles in the database (respects sidebar filters).

- **Key metrics** — Total profiles, mean GPA, mean SAT, STEM share, test-optional share
- **Acceptance rates by tier** — T5 / T10 / T20 / T50 rates split by All / STEM / Non-STEM, each shown as a `SampleBadge` with Wilson 95% confidence intervals and sample size
- **Bar chart** — Visual comparison of STEM vs Non-STEM acceptance rates per tier
- **GPA vs SAT scatter** — Click any dot to open the profile drawer. Color-coded by STEM/Non-STEM, T20 acceptances highlighted in tooltip
- **EC count distribution** — Area chart showing how many extracurriculars applicants typically have
- **Correlation matrix** — 5×5 Pearson correlation grid (GPA, SAT, APs, ECs, Awards) with red→yellow→green coloring

**How to use it:** Start here to get a high-level feel for the dataset. Use the correlation matrix to spot which stats actually move together — if GPA and awards are strongly correlated but SAT and ECs aren't, that tells you something about what kind of applicants post. Toggle STEM-only in the sidebar to see how the picture changes for STEM vs non-STEM.

</details>

<details>
<summary><strong>Browser</strong> — Sortable, searchable applicant table with CSV export</summary>

### Applicant Browser

A paginated table of all applicants matching the current filters.

- **Columns** — ID, GPA (falls back to weighted if unweighted is missing, shown with `*`), SAT equivalent, majors, STEM flag, ECs, awards, acceptances, T20/T5 badges
- **Search** — Client-side filter by major, school, EC category, or applicant ID
- **Sort** — Click any column header to sort ascending/descending
- **Pagination** — 50 profiles per page with Previous/Next navigation
- **CSV export** — Download the current filtered/sorted view as a CSV file
- **Profile drawer** — Click any row to see full applicant details in a slide-out panel

**How to use it:** Filter down to a group you care about (e.g. STEM, 3.7+ GPA) and browse who's in that pool. Sort by SAT to see the range, or search for a specific school to find everyone who got in there. Export to CSV if you want to do your own analysis.

</details>

<details>
<summary><strong>Patterns</strong> — Acceptance rates by GPA, SAT, ECs, and awards</summary>

### Acceptance Patterns

Breaks down acceptance rates across different dimensions, organized into three sub-tabs to avoid clutter.

**Academics tab:**
- GPA bucket breakdown with acceptance rates per tier
- SAT bucket breakdown with acceptance rates per tier
- **GPA × SAT heatmap** — 4×4 grid showing acceptance rates for each GPA/SAT band combination. Color intensity scales to the strongest reliable cell so both T5 (low rates) and T50 (high rates) remain readable. Cells with too few profiles show a ⚠ warning and are hatched. Use this to answer questions like: can a high SAT compensate for a lower GPA? Is a balanced 3.7/1500 better than a lopsided 3.5/1580? Compare cells across the diagonal to find out

**Activities tab:**
- EC category impact — Which types of extracurriculars correlate with higher acceptance rates
- Award category impact — Same analysis for award types
- EC count impact — Acceptance rates by number of extracurriculars (1-3, 4-6, 7-9, 10+)

**Adjusted tab:**
- Test-optional vs submitted scores comparison
- STEM vs Non-STEM acceptance rate differences

Each rate is clickable — click a bar to jump to the Browser filtered to that group.

**How to use it:** Switch between tiers (T5/T10/T20/T50) on the heatmap to see how the GPA×SAT tradeoff changes at different selectivity levels. Check the Activities tab to see which EC types actually correlate with acceptances vs which are just common. Use the Adjusted tab to see if going test-optional actually mattered for people in the dataset.

</details>

<details>
<summary><strong>Schools</strong> — Per-school stats, accepted/rejected lists, and comparison</summary>

### School-Specific Stats

Every school that appears in the dataset gets its own stats.

- **Bar chart** — Top 20 most-reported schools, stacked accepted (green) / rejected (red)
- **Sortable table** — All schools with acceptance rate, average GPA/SAT/ECs of accepted applicants, STEM share. Unreliable schools (n < 15) dimmed
- **School popup** — Click any row to see:
  - Stats summary with Wilson 95% CI on acceptance rate
  - Scrollable **Accepted** applicant list (green header)
  - Scrollable **Rejected** applicant list (red header)
  - Click any applicant to open the profile drawer
- **Comparison mode** — Check up to 4 schools to see a side-by-side table. Best/worst values are highlighted green/red
- **Search** — Filter the school list by name

**How to use it:** Find a school you're interested in, click it, and look at who actually got in vs who didn't. Compare two similar-tier schools side by side to see if one favors higher GPAs while the other values ECs more. The accepted/rejected split lets you see what the rejection pool looked like — sometimes the stats are nearly identical, which tells you the decision came down to something not in the numbers.

</details>

<details>
<summary><strong>Demographics</strong> — Breakdowns by race, gender, and test policy</summary>

### Demographics

Acceptance rate breakdowns by demographic categories.

- **By race** — Both raw (as reported) and grouped (normalized into broader categories: East Asian, South Asian, White, Black, Hispanic/Latino, etc.)
- **By gender** — Male / Female / Non-binary acceptance rates per tier
- **By test policy** — Test-optional vs submitted scores comparison
- Each breakdown shows average GPA, average SAT, sample size, and Wilson 95% CIs
- Tier rates shown as horizontal colored bars for quick visual scanning

**How to use it:** See how acceptance rates differ across demographic groups within this dataset. Keep in mind the convenience sample caveat — these numbers reflect who posts on r/collegeresults, not the full applicant pool. Most useful for comparing relative differences between groups rather than taking any single rate at face value.

</details>

<details>
<summary><strong>Archetypes</strong> — Profile classification with in-card member browsing</summary>

### Profile Archetypes

Classifies every profile by its strongest trait on a normalized scale (10 ECs ≈ 5 awards ≈ 4.0 GPA ≈ 1600 SAT).

**Two views:**
- **By strongest trait** — GPA-Focused, SAT-Focused, EC-Focused, Award-Focused, Well-Balanced
- **Grouped** — By academic strength (Elite/Strong/Solid/Developing) and by activity level (Highly active/Active/Moderate/Light)

**Each archetype card shows:**
- Radar chart showing the shape of the archetype across all four dimensions
- Stats: average GPA, SAT, ECs, awards, STEM %, T5 rate, T20 rate
- Top EC categories, award categories, and majors
- **Member browser** — Search by ID or major, sort by SAT/GPA/ECs/Awards, click any member to open the profile drawer

Cards with small samples (n < 15) are dimmed with dashed borders but become fully visible on hover. Respects sidebar filters — change a filter and archetypes recalculate.

**How to use it:** Figure out what "type" of applicant you are — are you GPA-heavy, EC-heavy, or balanced? Then check how that archetype performs. If EC-Focused applicants have a higher T20 rate than GPA-Focused ones, that's a signal about what the data shows (though remember: EC *count* doesn't capture quality). Use the member browser to find specific people in your archetype and see their full profiles.

</details>

<details>
<summary><strong>Find Similar</strong> — KNN similarity search with cohort outcomes</summary>

### Find Similar

Find the most similar applicants using K-nearest-neighbors on GPA, SAT, ECs, and awards.

**Two modes:**
- **By applicant ID** — Enter an existing applicant's ID to find their nearest neighbors
- **Custom profile** — Enter your own stats (GPA, SAT, ECs, awards, STEM) to find similar real applicants

**Results include:**
- Top 5 most similar profiles with full details
- **"How applicants like this did"** — Cohort outcomes panel showing T5/T10/T20/T50 acceptance rates across the 25 nearest neighbors, each with Wilson CIs and sample sizes

This is the honest alternative to "chance me" — instead of a made-up probability, you see what actually happened to real applicants with similar numbers. The app explicitly notes that numbers can't capture EC quality, so these rates are a floor, not a ceiling.

**How to use it:** Plug in your own stats and see who in the dataset looks like you. Don't fixate on the cohort acceptance rate as a prediction — instead, click through the individual profiles to see what those similar applicants actually did. Where did they get in? What ECs did they have? That context is worth more than any single percentage.

</details>

<details>
<summary><strong>Saved</strong> — Save and compare applicant profiles</summary>

### Saved Profiles

Bookmark applicants to compare them side by side.

- **Save** — Click the save button in any profile drawer to bookmark it (stored in localStorage)
- **Compare table** — Side-by-side stats for all saved profiles
- **Remove** — Unsave profiles you no longer need
- Data persists across sessions in the browser

</details>

<details>
<summary><strong>Filters</strong> — Global sidebar filters that apply to every page</summary>

### Filtering System

A persistent sidebar (collapsible on mobile) with filters that apply across all pages.

- **Numeric ranges** — GPA min/max, SAT min/max
- **Dropdowns** — Accepted tier, major, race/ethnicity, gender, school, EC category, award category
- **Toggles** — STEM only, test-optional only, hide unreliable samples
- **Filter chips** — Active filters shown as removable chips at the top
- **Saved filter presets** — Save and load filter combinations
- **Debounced** — 300ms debounce on all filter inputs to prevent excessive API calls

Filter options are loaded dynamically from the database so they always reflect available data.

</details>

<details>
<summary><strong>Themes</strong> — 8 color themes with system auto-detect</summary>

### Theming

Click the theme icon in the top nav to pick from 8 themes:

| Theme | Style |
|-------|-------|
| Dark | Default — dark gray with indigo accents |
| Light | Clean white with indigo accents |
| Midnight | Deep navy with cyan accents |
| Forest | Dark green with emerald accents |
| Rose | Warm dark with pink accents |
| Sunset | Warm dark with amber/orange accents |
| Nord | Muted arctic palette (light) |
| Lavender | Soft purple (light) |

Includes **Auto** mode that follows your system dark/light preference. All themes use CSS custom properties so every component adapts automatically.

</details>

---

## Data Disclaimer

The profiles in this dataset are a **convenience sample** scraped from r/collegeresults — they are not representative of the total applicant population. Users who post tend to have stronger profiles and skew toward T20 outcomes. Acceptance rates here will be higher than reality, and demographic breakdowns may not reflect national trends. Treat everything as "among people who posted," not "among all applicants."

This bias is strongest for less selective schools — their average accepted GPA/SAT will appear inflated because the people in the dataset are mostly T20 hopefuls who also applied there. Stats for highly selective schools (T20/T5) are closer to accurate since that's the crowd that posts.

---

## Sample Size Honesty

Every acceptance rate in the app reports:

- **n** — the number of profiles it's based on
- **Reliable/unreliable flag** — rates with n < 15 are flagged with ⚠
- **Wilson 95% confidence interval** — stays in [0, 1] and works correctly at small sample sizes, unlike the naive p ± z√(p(1-p)/n) formula
- **"Hide small samples" toggle** — globally suppress unreliable rates

This is a core design principle, not a feature. The app never presents a bare percentage.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Python, FastAPI, SQLite |
| Frontend | React 19, Vite, Recharts |
| Similarity | scikit-learn (KNN with StandardScaler) |
| Deployment | Render |
| Data | 716 real applicant profiles from r/collegeresults |

---

## Project Structure

```
main.py                  # FastAPI API — all endpoints
db.py                    # Data access layer — all SQL
logic.py                 # Data processing pipeline
migrate.py               # Builds SQLite DB from profiles.jsonl
schema.sql               # Database schema
profiles.jsonl           # Raw applicant data
collegebase.db           # Pre-built SQLite database
render.yaml              # Render deployment config
collegebase-frontend/
  src/
    api.js               # API client (relative URLs)
    constants.js          # Shared constants + Wilson CI
    utils.js              # useDebounce, usePageTitle, rankClass
    App.jsx               # Routing, theme picker, error boundary
    context/
      FilterContext.jsx   # Global filter state + debouncing
    components/
      Sidebar             # Filter sidebar
      ProfileDrawer       # Slide-out profile detail panel
      SampleBadge         # Rate display with n + CI
      CorrelationMatrix   # 5×5 Pearson correlation grid
      ErrorBoundary       # Route-level crash protection
    pages/
      Dashboard           # Overview stats + charts
      Browser             # Paginated applicant table
      Patterns            # Acceptance rate breakdowns + heatmap
      Schools             # Per-school stats + comparisons
      Demographics        # Race/gender/test-policy breakdowns
      Archetypes          # Profile classification + browsing
      Similar             # KNN search + cohort outcomes
      Saved               # Bookmarked profile comparison
```
