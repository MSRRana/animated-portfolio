# Contributing to Portfolio

## 🔒 Branch Protection

The `main` branch is protected. All changes must be made through pull requests.

## 🚀 Quick Start

### 1. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or use the helper script
./create-pr.sh your-feature-name "PR Title" "Description"
```

### 2. Make Changes

```bash
# Make your changes to the code
# Then stage and commit
git add .
git commit -m "Description of your changes"
```

### 3. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create pull request
gh pr create --title "Your PR Title" --body "What you changed"
```

### 4. Merge After Review

Once your PR is approved, merge it on GitHub, then:

```bash
# Update your local main branch
git checkout main
git pull origin main

# Delete the feature branch
git branch -d feature/your-feature-name
```

---

## 📋 Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-dark-mode`)
- `fix/` - Bug fixes (e.g., `fix/contact-form`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `improve/` - Improvements (e.g., `improve/performance`)
- `chore/` - Maintenance (e.g., `chore/update-deps`)

---

## ✅ Commit Message Guidelines

Write clear, descriptive commit messages:

**Good:**
```
Add dark mode toggle to navbar
Fix responsive layout on mobile
Update project links and descriptions
```

**Bad:**
```
fix stuff
update
changes
```

---

## 🧪 Before Submitting PR

1. **Test locally**: `npm run dev`
2. **Build successfully**: `npm run build`
3. **Check for errors**: `npm run lint`
4. **Review your changes**: `git diff`

---

## 📖 Full Documentation

See [docs/BRANCH_PROTECTION_GUIDE.md](./docs/BRANCH_PROTECTION_GUIDE.md) for detailed workflow instructions.

---

## 🆘 Need Help?

- Branch protection: See [BRANCH_PROTECTION_GUIDE.md](./docs/BRANCH_PROTECTION_GUIDE.md)
- GitHub Actions: See [.github/workflows/README.md](./.github/workflows/README.md)
- Resume setup: See [docs/RESUME_SETUP.md](./docs/RESUME_SETUP.md)
- Contact form: See [docs/EMAILJS_SETUP.md](./docs/EMAILJS_SETUP.md)
