# GitHub Desktop Guide

A quick reference for using **GitHub Desktop** to manage Git repositories without using the command line.

---

## 1. What is GitHub Desktop?

GitHub Desktop is a graphical interface for Git.

It allows you to:

* Create and clone repositories
* Track file changes
* Commit changes
* Push changes to GitHub
* Pull changes from GitHub
* Create and switch branches
* View commit history
* Handle merge conflicts
* Publish local repositories

---

## 2. Install GitHub Desktop

Download and install GitHub Desktop from the official GitHub website.

After installation:

1. Open GitHub Desktop.
2. Sign in with your GitHub account.
3. Configure your Git identity if requested.

---

# 3. Add an Existing Local Project

If you already have a project on your computer:

1. Open **GitHub Desktop**.

2. Go to:

   `File → Add Local Repository`

3. Select your project's root folder.

4. Click **Add Repository**.

Your project should now appear in GitHub Desktop.

### Important

Select the **root folder** of your project.

For example:

```text
Ecommerce-Exclusive/
├── client/
├── server/
├── Database/
├── package.json
└── README.md
```

Do **not** initialize Git separately inside:

```text
client/
server/
```

if you want one repository for the entire project.

---

# 4. Create a New Repository

To create a new repository:

1. Open GitHub Desktop.

2. Select:

   `File → New Repository`

3. Enter:

   * Name
   * Description
   * Local path

4. Click **Create Repository**.

Then publish it to GitHub using:

`Publish repository`

---

# 5. Clone a GitHub Repository

To download an existing GitHub repository:

1. Open GitHub Desktop.

2. Select:

   `File → Clone Repository`

3. Choose:

   * GitHub.com
   * URL
   * Organization

4. Select the local folder.

5. Click **Clone**.

Example:

```text
GitHub
   ↓
Clone
   ↓
Computer
```

---

# 6. Understanding the GitHub Desktop Interface

The main interface usually contains:

### Current Repository

Shows the repository you're currently working on.

### Current Branch

Shows the branch you're currently using.

Example:

```text
main
```

### Changes

Shows modified, deleted, and new files.

### History

Shows previous commits.

### Commit Section

Used to write a commit message and create a commit.

---

# 7. The Basic Git Workflow

The most important workflow is:

```text
Modify files
     ↓
GitHub Desktop detects changes
     ↓
Review changes
     ↓
Commit
     ↓
Push
```

Example:

```text
Edit React Component
        ↓
Changes
        ↓
Commit
        ↓
Push origin
        ↓
GitHub
```

---

# 8. Commit Changes

After modifying your project:

1. Open GitHub Desktop.
2. Go to the **Changes** tab.
3. Review the modified files.
4. Enter a commit message.

Example:

```text
Add user profile feature
```

Then click:

`Commit to main`

### Good Commit Messages

Use short and descriptive messages.

Good:

```text
Add login form
Fix profile avatar upload
Update product card
Add address feature
Fix authentication bug
```

Avoid:

```text
update
changes
done
test
asdf
```

---

# 9. Push Changes

After committing:

Click:

`Push origin`

This uploads your commits to GitHub.

```text
Local Repository
       ↓
     Push
       ↓
GitHub Repository
```

---

# 10. Pull Changes

If the GitHub repository has changes that you don't have locally:

Click:

`Fetch origin`

Then, if changes are available:

`Pull origin`

This downloads and integrates the latest changes.

```text
GitHub
   ↓
 Pull
   ↓
Local Repository
```

### Recommended Workflow

Before starting work:

```text
Fetch origin
     ↓
Pull origin
     ↓
Start coding
```

---

# 11. Fetch vs Pull

### Fetch

Checks GitHub for new changes without modifying your working files.

```text
Fetch
↓
Check remote changes
```

### Pull

Downloads and integrates the remote changes into your local branch.

```text
Pull
↓
Download + integrate changes
```

---

# 12. Branches

Branches allow you to work on features without directly modifying `main`.

Example:

```text
main
 │
 ├── feature/auth
 ├── feature/products
 └── feature/profile
```

Create a branch:

`Current Branch → New Branch`

Example:

```text
feature/profile
```

Then click:

`Create Branch`

---

# 13. Switching Branches

To switch branches:

1. Click **Current Branch**.
2. Select the branch you want.

Example:

```text
main
↓
feature/profile
```

---

# 14. Merge a Branch

After finishing a feature:

1. Switch to the branch that should receive the changes.
2. Select:

   `Branch → Merge into Current Branch`

Example:

```text
feature/profile
       ↓
     merge
       ↓
      main
```

Before merging, make sure your changes are committed.

---

# 15. Publish a Branch

If you create a local branch that doesn't exist on GitHub:

Click:

`Publish branch`

This creates the remote branch on GitHub.

---

# 16. Handling Merge Conflicts

A conflict happens when Git cannot automatically combine changes.

Example:

```text
Your changes
     +
GitHub changes
     ↓
   Conflict
```

GitHub Desktop will show the conflicted files.

Typical process:

1. Open the conflicted file.
2. Decide which changes to keep.
3. Remove the conflict markers.
4. Save the file.
5. Return to GitHub Desktop.
6. Mark the conflict as resolved.
7. Commit the resolution.

Conflict markers can look like:

```text
<<<<<<< HEAD

Your changes

=======

Remote changes

>>>>>>> branch-name
```

You must remove these markers.

---

# 17. Undo Changes

GitHub Desktop allows you to discard changes.

In the **Changes** tab:

1. Select the file.
2. Right-click.
3. Choose:

`Discard Changes`

### ⚠️ Warning

Discarding changes can permanently remove uncommitted work.

Only do this when you're sure you don't need the changes.

---

# 18. View Commit History

Go to:

`History`

You can see:

* Previous commits
* Commit messages
* Changed files
* Branch history
* Who made the commit

Example:

```text
Add profile feature
Fix authentication
Add product API
Initial commit
```

---

# 19. Working With Multiple Projects

GitHub Desktop can manage multiple repositories.

Use:

`Current Repository`

to switch between projects.

Example:

```text
Ecommerce-Exclusive
Portfolio
ChatApp
FlutterProject
```

Each repository has its own:

* Branches
* Commits
* History
* Remote repository

---

# 20. Repository Structure

For a full-stack project, keep one Git repository at the project root when appropriate.

Example:

```text
Ecommerce-Exclusive/
│
├── .git/
├── client/
├── server/
├── Database/
├── README.md
└── package.json
```

### Important

Avoid accidentally creating:

```text
Ecommerce-Exclusive/.git
client/.git
server/.git
```

unless you intentionally want separate repositories.

Usually you want:

```text
Ecommerce-Exclusive/.git
```

only.

---

# 21. `.gitignore`

Use `.gitignore` to prevent unwanted files from being committed.

Example:

```gitignore
node_modules/
.env
.env.local
dist/
build/
*.log
```

Never commit sensitive environment variables such as:

```text
.env
```

containing:

```text
DB_PASSWORD=...
JWT_SECRET=...
API_KEY=...
```

---

# 22. Recommended Full-Stack Workflow

For your React + Express project:

### Start working

```text
Fetch origin
      ↓
Pull origin
      ↓
Create/switch feature branch
```

### During development

```text
Write code
   ↓
Test
   ↓
Review changes
   ↓
Commit
```

### Finish feature

```text
Commit
   ↓
Push branch
   ↓
Create Pull Request
   ↓
Review
   ↓
Merge
```

---

# 23. Simple Daily Workflow

The easiest workflow to remember:

```text
┌─────────────────────┐
│     Start Work      │
└──────────┬──────────┘
           ↓
     Fetch / Pull
           ↓
      Create Branch
           ↓
       Write Code
           ↓
        Test Code
           ↓
      Review Changes
           ↓
         Commit
           ↓
          Push
           ↓
    Create Pull Request
           ↓
         Merge
```

---

# 24. GitHub Desktop vs Git CLI

You don't need to choose only one.

GitHub Desktop is useful for:

* Visualizing changes
* Managing branches
* Reviewing commits
* Resolving conflicts
* Beginner-friendly Git workflows

Git CLI is useful for:

* Fast operations
* Advanced Git commands
* Automation
* Terminal-based workflows
* Working on remote servers

You can use both with the **same repository**.

---

# 25. Most Important Concepts

Remember these five:

| Concept        | Meaning                               |
| -------------- | ------------------------------------- |
| **Repository** | Your project tracked by Git           |
| **Commit**     | Saved snapshot of your changes        |
| **Branch**     | Separate line of development          |
| **Push**       | Upload commits to GitHub              |
| **Pull**       | Download and integrate remote changes |

The basic cycle is:

```text
Edit
 ↓
Commit
 ↓
Push
```

And before starting work:

```text
Fetch
 ↓
Pull
 ↓
Code
```

---

## Quick Cheat Sheet

| Task             | GitHub Desktop              |
| ---------------- | --------------------------- |
| Add project      | File → Add Local Repository |
| Create repo      | File → New Repository       |
| Clone repo       | File → Clone Repository     |
| Check changes    | Changes tab                 |
| Commit           | Commit to branch            |
| Upload           | Push origin                 |
| Download changes | Pull origin                 |
| Create branch    | New Branch                  |
| Switch branch    | Current Branch              |
| Merge            | Branch → Merge              |
| History          | History tab                 |
| Discard changes  | Right-click → Discard       |
| Publish branch   | Publish branch              |
| Check remote     | Fetch origin                |

---

## Golden Rule

Before pushing:

```text
Review → Commit → Push
```

Before starting new work:

```text
Fetch → Pull → Code
```

And for a full-stack monorepo:

```text
ONE project
   ↓
ONE .git
   ↓
client + server + database
```
