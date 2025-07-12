# Pok-Scope 🎮

### **Version Control Strategy: GitFlow**

We follow the **GitFlow workflow** — a powerful branching model for organizing feature development, releases, and emergency fixes in a structured way.

---

## 🔀 GitFlow Branch Structure

* **`main`** → Stable, production-ready code
* **`develop`** → Ongoing development and integration
* **`feature/*`** → For individual features (branched off `develop`)
* **`release/*`** → Used for prepping a new release (branched off `develop`)
* **`hotfix/*`** → For critical fixes in production (branched off `main`)

---

## 🧪 GitFlow Workflow in Action

### 1️⃣ Clone & Set Up

```sh
git clone https://github.com/Omid2831/Pok-Scope.git
cd Pok-Scope

git checkout main
git checkout -b develop
```

---

### 2️⃣ Start a New Feature

```sh
git checkout -b feature/search-function

# Work on your feature
git add .
git commit -m "feat: add live search functionality"

git checkout develop
git merge feature/search-function
```

---

### 3️⃣ Create a Release Branch

```sh
git checkout -b release/v1.0.0
git commit -m "fix: final UI adjustments before release"

git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Pok-Scope v1.0.0 release"
```

---

### 4️⃣ Handle a Hotfix

```sh
git checkout -b hotfix/fix-api-error
git commit -m "fix: correct API response handling"

git checkout main
git merge hotfix/fix-api-error

git checkout develop
git merge main
```

---

## 📘 Conventional Commits

Follow **Conventional Commit standards** for clean, consistent, and machine-readable commit history.

### Format:

```sh
type(scope): message
```

### Types:

* `feat:` – New feature
* `fix:` – Bug fix
* `refactor:` – Code cleanup
* `style:` – Visual/style-only changes
* `docs:` – Documentation changes
* `test:` – Test additions/updates
* `chore:` – Maintenance/CI/infra work

### Example:

```sh
git commit -m "feat(pokemon): implement detailed stats view"
```

---

## 🧭 How to Use Pok-Scope

### 1️⃣ Clone the Repo

```sh
git clone https://github.com/Omid2831/Pok-Scope.git
cd Pok-Scope
```

---

## 🛠 Git Command Cheat Sheet

### 🔧 Basic Setup

| Command                | Description     |
| ---------------------- | --------------- |
| `git clone URL`        | Clone repo      |
| `cd Pok-Scope`         | Go to directory |
| `git checkout main`    | Switch to main  |
| `git pull origin main` | Sync main       |

---

### 🌿 Branching

| Command                          | Description           |
| -------------------------------- | --------------------- |
| `git checkout -b develop`        | Start develop branch  |
| `git checkout -b feature/xyz`    | New feature branch    |
| `git checkout -b release/vX.X.X` | Create release branch |
| `git checkout -b hotfix/xyz`     | Create hotfix branch  |

---

### 💾 Making Changes

| Command                                | Description             |
| -------------------------------------- | ----------------------- |
| `git add .`                            | Stage all               |
| `git commit -m "type(scope): message"` | Commit using convention |
| `git commit --amend`                   | Edit last commit        |

---

### 🌐 Push / Pull

| Command                       | Description                  |
| ----------------------------- | ---------------------------- |
| `git push origin branch-name` | Push branch                  |
| `git pull origin branch-name` | Pull updates                 |
| `git fetch --all`             | Fetch everything from remote |

---

### 🔄 Merge & Cleanup

| Command                                | Description          |
| -------------------------------------- | -------------------- |
| `git checkout develop`                 | Switch to `develop`  |
| `git merge feature/xyz`                | Merge feature        |
| `git merge --no-ff`                    | Force commit history |
| `git branch -d branch-name`            | Delete local         |
| `git push origin --delete branch-name` | Delete remote        |

---

### 🚀 Release & Hotfix

| Command                                         | Description      |
| ----------------------------------------------- | ---------------- |
| `git checkout -b release/v1.0.0 develop`        | Start release    |
| `git checkout main && git merge release/v1.0.0` | Finalize release |
| `git tag -a v1.0.0 -m "First stable release"`   | Tag it           |
| `git push origin --tags`                        | Push tags        |

---

### 🔁 Reverting Changes

| Command                   | Description             |
| ------------------------- | ----------------------- |
| `git reset --hard HEAD`   | Discard all local edits |
| `git checkout -- file.js` | Revert file             |
| `git revert <hash>`       | Revert commit           |

---

## 🚧 Example Workflow

```sh
git checkout develop
git checkout -b feature/pokemon-ui
git push origin feature/pokemon-ui

# Work and commit
git add .
git commit -m "feat(pokemon): display basic info"

git checkout develop
git merge feature/pokemon-ui
git push origin develop
```

---

## ✅ Pro Tips

* **Always pull before pushing:**

```sh
git pull origin branch-name
```

* **Use `--no-ff` when merging features:**

```sh
git merge --no-ff feature/fetch-stats
```

* **Clean up merged branches:**

```sh
git branch -d feature/fetch-stats
git push origin --delete feature/fetch-stats
```

---

### 🔍 GitFlow Overview

```
main        → Stable code for deployment  
develop     → Features merged here first  
feature/*   → New functionality (from develop)  
release/*   → Final checks before going live  
hotfix/*    → Critical production fixes  
```

