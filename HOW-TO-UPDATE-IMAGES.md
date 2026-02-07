# How to Update Website Images

## Quick Guide (3 Steps)

1. **Add** your new image to this folder
2. **Open** `images-config.js`
3. **Change** the filename for the image slot you want to update
4. **Save** and refresh the website

---

## Image Slots Reference

### Testimonials (Kundenbewertungen)
| Slot | Description | Current File |
|------|-------------|--------------|
| `testimonial1` | Remo M. - Schweiz | tesla_red_client.jpg |
| `testimonial2` | Katja L. - Deutschland | cybertruckreview.jpg |
| `testimonial3` | Anna S. - Dänemark | teslacamping-pch.jpg |

### Routes (Routen)
| Slot | Description | Current File |
|------|-------------|--------------|
| `route_pacific_coast` | Pacific Coast Highway | pacificcoasthighway.jpg |
| `route_rocky_mountain` | Rocky Mountain | rockymountainroute.jpg |
| `route_66` | Route 66 | route66-tesla.jpg |
| `route_yellowstone` | Yellowstone | yellowstone.jpg |
| `route_coastal` | Coastal Route | coastal-route-tesla.jpg |
| `route_zion` | Zion | zion-campsite-tesla.jpg |
| `route_7day` | 7-Day Trip | 7-day-road-trip.jpg |
| `route_14day` | 14-Day Trip | 14-days-sunsets-skyline.jpg |

### Fleet (Fahrzeuge)
| Slot | Description | Current File |
|------|-------------|--------------|
| `fleet_modely` | Model Y Card | teslamodely_flipcard1.jpg |
| `fleet_cybertruck` | Cybertruck Card | cybertruck_flipcard2.jpg |
| `fleet_redtesla_coastal` | Red Tesla Coastal | redteslacoastal.jpg |
| `fleet_redtesla_sandiego` | Red Tesla San Diego | redteslasandiego.jpg |

### Hero / Header
| Slot | Description | Current File |
|------|-------------|--------------|
| `hero_background` | Main header background | zion-campsite-tesla.jpg |

### Other
| Slot | Description | Current File |
|------|-------------|--------------|
| `founder` | Anja Founder Photo | anja-founder.jpg |
| `compass_hero` | Compass Hero Image | compass.jpg |
| `favicon` | Site Favicon | flaviconicon.png |

---

## Example: Updating a Testimonial Photo

**Before:**
```javascript
testimonial3: "anna_testamony.jpg",
```

**After:**
```javascript
testimonial3: "my-new-photo.jpg",
```

---

## Tips

- Use descriptive filenames (e.g., `happy-couple-grand-canyon.jpg`)
- Recommended image sizes:
  - Testimonials: 800x600px or larger
  - Routes: 1200x800px or larger
  - Founder: 400x500px or larger
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Keep old images in `_archive` folder if needed later

---

## Troubleshooting

**Image not showing?**
1. Check filename spelling (case-sensitive!)
2. Make sure file is in the same folder as `index.html`
3. Hard refresh browser: `Cmd + Shift + R`

---

*Last updated: January 2026*
