# Editing Guide — Lotus Leaf Bengaluru

Fast customer customization guide for `lotus-leaf-bengaluru` (minimalist lotus leaf design with scratch-to-reveal card and video opener).

## Primary Customer Data

All text, dates, events, venue, and images live in:
- `editable/wedding-data.js`

### What to edit in `editable/wedding-data.js`:
- **Couple Details**:
  - `couple.groom`: Groom's name (e.g. `"Aarav"`)
  - `couple.bride`: Bride's name (e.g. `"Ananya"`)
  - `couple.openingDate`: Date string on cover (e.g. `"14 · February · 2027"`)
  - `couple.heroDate`: Date badge in hero (e.g. `"14 · 02 · 2027"`)
- **Countdown**:
  - `countdown.targetISO`: Target ISO date string (e.g. `"2027-02-14T19:30:00+05:30"`)
- **Scratch-to-reveal Save the Date Card**:
  - `scratchCard.day`: Day of week (e.g. `"Sunday"`)
  - `scratchCard.date`: Day number (e.g. `"14"`)
  - `scratchCard.monthYear`: Month and year (e.g. `"February · 2027"`)
  - `scratchCard.city`: Location (e.g. `"Bengaluru"`)
- **Story**:
  - `story.portraitCaption`: Two-line array caption below the portrait photo
- **Events**:
  - `events[]`: Array of events with `name`, `date`, `time`, `place`, `mark`
- **Venue**:
  - `venue.name`: Venue hall/pavilion name
  - `venue.addressLine1`: First line of address
  - `venue.addressLine2`: City/Postal code line
  - `venue.cityTag`: Map badge subtitle
  - `venue.mapQuery`: Search query for Google Maps
- **Assets**:
  - `assets.video`: Video opener path
  - `assets.flowFrame`: Poster frame image for video
  - `assets.heroArt`: Hero illustration
  - `assets.storyPhoto`: Story portrait photo
  - `assets.ogImage`: Social share image

## Replacing Assets

Drop customer replacement media files into `editable/assets/`:
- `editable/assets/sm.mp4` — Opening video gate
- `editable/assets/flow-first-frame.webp` — First frame poster
- `editable/assets/aarav-ananya-hero.webp` — Hero illustration
- `editable/assets/aarav-ananya-story.webp` — Story portrait
- `editable/assets/aarav-ananya-og.jpg` — OG preview image

## Testing

```bash
node --check editable/wedding-data.js
```
Open `http://localhost:9015/` in browser.
