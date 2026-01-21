# Branch Protection & Pull Request Workflow

## 🔒 Branch Protection Enabled

Your `main` branch is now protected! Direct pushes are no longer allowed. All changes must go through pull requests.

---

## ✅ What's Protected

### Main Branch Protection Rules:

- ❌ **No direct pushes to main**
- ✅ **Requires pull request** for all changes
- ✅ **Requires 1 approval** before merging
- ✅ **Dismiss stale reviews** when new commits are pushed
- ✅ **Require conversation resolution** before merging
- ❌ **No force pushes** allowed
- ❌ **No branch deletion** allowed
- ⚠️ **Admin bypass** disabled (even you must follow the rules!)

---

## 🚀 New Workflow: How to Make Changes

### Step 1: Create a Feature Branch

```bash
# Navigate to your project
cd /Users/manishsinghrana/Downloads/data/Projects/Portfolio/animated-portfolio

# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/update-projects
# git checkout -b feature/add-new-skill
# git checkout -b fix/contact-form-bug
```

### Step 2: Make Your Changes

```bash
# Make your code changes
# Edit files as needed

# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add new feature or fix"
```

### Step 3: Push Your Branch

```bash
# Push your feature branch to GitHub
git push origin feature/your-feature-name
```

### Step 4: Create a Pull Request

**Option A: Using GitHub CLI (Easiest)**
```bash
gh pr create --title "Your PR Title" --body "Description of changes"

# Example:
gh pr create --title "Add new project to portfolio" --body "Added SnapMeal project with live links and screenshots"
```

**Option B: Using GitHub Web Interface**
1. Go to: https://github.com/MSRRana/animated-portfolio
2. Click "Compare & pull request" button (appears after pushing)
3. Fill in:
   - **Title**: Brief description of changes
   - **Description**: Detailed explanation
4. Click "Create pull request"

### Step 5: Review & Merge

Since you need 1 approval:

**Option 1: Self-Review (if you're the only maintainer)**
1. Review your own PR
2. Approve it
3. Click "Merge pull request"
4. Confirm merge
5. Delete the branch (optional but recommended)

**Option 2: Get Team Review (if working with others)**
1. Wait for team member to review
2. Address any feedback
3. Once approved, merge the PR

### Step 6: Clean Up

```bash
# Switch back to main
git checkout main

# Pull the latest changes
git pull origin main

# Delete your local feature branch (optional)
git branch -d feature/your-feature-name
```

---

## 📋 Quick Reference Commands

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "Description of changes"

# 3. Push to GitHub
git push origin feature/my-feature

# 4. Create PR (using GitHub CLI)
gh pr create --title "My Feature" --body "What I changed"

# 5. After merge, sync main
git checkout main
git pull origin main
git branch -d feature/my-feature
```

---

## 🎯 Branch Naming Conventions

Use descriptive branch names with prefixes:

### Feature Branches
```
feature/add-dark-mode
feature/update-about-section
feature/new-project-card
```

### Bug Fixes
```
fix/contact-form-validation
fix/mobile-responsive-issue
fix/broken-link
```

### Documentation
```
docs/update-readme
docs/add-api-documentation
```

### Improvements/Refactoring
```
improve/optimize-images
refactor/contact-component
chore/update-dependencies
```

---

## ⚠️ What Happens If You Try to Push Directly to Main?

You'll get an error:

```bash
$ git push origin main

remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: Changes must be made through a pull request.
To https://github.com/MSRRana/animated-portfolio.git
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'https://github.com/MSRRana/animated-portfolio.git'
```

**Solution:** Follow the pull request workflow above!

---

## 🔄 Emergency: Temporarily Disable Protection

If you absolutely need to push directly (NOT recommended):

```bash
# Disable branch protection
gh api --method DELETE repos/MSRRana/animated-portfolio/branches/main/protection

# Make your urgent changes
git push origin main

# Re-enable protection (use the setup script)
./scripts/enable-branch-protection.sh
```

⚠️ **Warning:** Only do this in true emergencies!

---

## 👥 Working with Multiple People

If you're collaborating with others:

### As a Contributor:
1. Fork the repository
2. Clone your fork
3. Create feature branch
4. Make changes
5. Push to your fork
6. Create PR from your fork to main repo

### As a Maintainer:
1. Review PRs from contributors
2. Request changes if needed
3. Approve and merge when ready
4. Delete merged branches

---

## 📊 Benefits of Branch Protection

✅ **Code Quality**: All changes reviewed before merging
✅ **Prevent Mistakes**: No accidental direct pushes
✅ **Better History**: Clean, organized commit history
✅ **Collaboration**: Easy to track who changed what
✅ **Testing**: Can add CI checks before merge
✅ **Rollback**: Easy to revert if something breaks

---

## 🆘 Troubleshooting

### Problem: "I forgot and committed directly to main"

**Solution:**
```bash
# Don't push! Create a branch from current state
git checkout -b feature/my-changes

# Reset main to match origin
git checkout main
git reset --hard origin/main

# Now work from your feature branch
git checkout feature/my-changes
git push origin feature/my-changes

# Create PR as normal
gh pr create
```

### Problem: "My PR has conflicts"

**Solution:**
```bash
# Update your feature branch with latest main
git checkout feature/your-feature
git fetch origin
git merge origin/main

# Resolve conflicts in your editor
# Then commit the merge
git add .
git commit -m "Resolve merge conflicts"
git push origin feature/your-feature
```

### Problem: "I need to make changes after creating PR"

**Solution:**
```bash
# Just push more commits to the same branch
git add .
git commit -m "Address review feedback"
git push origin feature/your-feature

# PR automatically updates with new commits
```

---

## 🚀 GitHub Actions & Branch Protection

Your GitHub Actions workflow still works! When you merge a PR:

1. PR is merged to main
2. GitHub Actions automatically triggers
3. Portfolio builds and deploys
4. Live site updates in ~1-2 minutes

**No changes needed to your workflow!**

---

## 📝 Current Repository Status

- ✅ Branch protection: **ENABLED**
- ✅ Main branch: **PROTECTED**
- ✅ Pull requests: **REQUIRED**
- ✅ Required approvals: **1**
- ✅ GitHub Actions: **WORKING**
- ✅ Auto-deployment: **ACTIVE**

---

## 💡 Best Practices

1. **Keep branches small**: One feature per branch
2. **Descriptive names**: `feature/add-dark-mode` not `fix-stuff`
3. **Commit often**: Small, logical commits
4. **Write clear PR descriptions**: Explain what and why
5. **Delete merged branches**: Keep repo clean
6. **Pull main regularly**: Stay up to date
7. **Test before PR**: Make sure it works locally

---

## 📖 Additional Resources

- **Create PR**: `gh pr create --help`
- **List PRs**: `gh pr list`
- **View PR**: `gh pr view <number>`
- **Merge PR**: `gh pr merge <number>`
- **Check status**: `gh pr status`

---

**Your main branch is now protected!** 🔒

All future changes must go through pull requests. This keeps your code safe and organized!
