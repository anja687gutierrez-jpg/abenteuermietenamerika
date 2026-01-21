# Abenteuer Mieten Amerika - Deployment Notes

## Website Deployment Process

### Live Website Updates (REQUIRED)
Your website files must be **manually uploaded** to your web hosting provider to go live.

**Steps:**
1. Make changes to files in the `LIVE` folder
2. Log in to your web hosting control panel
3. Upload the modified files via FTP or file manager
4. Clear any server-side cache if applicable
5. Hard refresh your browser (Cmd+Shift+R) to see changes

### GitHub Backup (RECOMMENDED)
GitHub is used for **version control and backup only** - it does NOT automatically update your live website.

**After making changes, run:**
```bash
cd "/Users/anjacarrillo/Library/CloudStorage/GoogleDrive-anja687gutierrez@gmail.com/My Drive/Business/Websites/Abenteuer Mieten Amerika/LIVE"
git add -A
git commit -m "Description of changes"
git push
```

**Benefits of GitHub backup:**
- Track all changes with history
- Revert to previous versions if needed
- Backup in case of local file loss
- Collaboration and code review

### Repository
- **GitHub:** https://github.com/engel687-ui/abenteuermietenamerika

---

## Quick Reference

| Action | Where |
|--------|-------|
| Edit files | Local `LIVE` folder |
| Make changes live | Manual upload to hosting |
| Backup changes | `git add`, `commit`, `push` |
| View history | GitHub repository |

---

## Important Reminders

1. **GitHub push ≠ Live website** - Always upload manually
2. **Clear cache** after uploading to see changes immediately
3. **Commit regularly** to maintain good backup history
4. **Test locally** before uploading to production

---

*Last updated: January 2026*
