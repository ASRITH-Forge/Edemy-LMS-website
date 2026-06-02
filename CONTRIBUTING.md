# 🤝 Contributing to Edemy LMS

Thank you for considering contributing to **Edemy LMS**! 🎉
We welcome all contributions, whether it's bug fixes, new features, documentation improvements, UI enhancements, or ideas.

---

## 🚀 How to Contribute

1. **Fork the Repository**

   * Click the **Fork** button on the top right of the original repository.
   * Clone **your fork** locally:

     ```bash
     git clone https://github.com/<your-username>/Edemy-LMS-website.git
     cd Edemy-LMS-website
     ```

2. **Create a New Branch**

   * For a new feature:

     ```bash
     git checkout -b feature/your-feature-name
     ```
   * For a bug fix (referencing issue number if available):

     ```bash
     git checkout -b fix/issue-123-short-title
     ```

3. **Make Your Changes**

   * Follow the project's coding style.
   * Keep components reusable and maintainable.
   * Update documentation if necessary.

4. **Commit Your Changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**

   * Go to your forked repository on GitHub.
   * Click **New Pull Request**.
   * Clearly explain your changes and their purpose.

---

## 🧑‍💻 Development Guidelines

### Branching Strategy

* Always create a separate branch for your work:

  ```bash
  git checkout -b feature/your-feature-name
  git checkout -b fix/your-fix-name
  ```
* Do not commit directly to the `main` branch.

### Code Style

* Use Functional Components and Hooks.
* Use `PascalCase` for component names.
* Use `camelCase` for variables and functions.
* Keep components modular and reusable.



---

## 📝 Commit Messages

Use the **Conventional Commits** format:

* `feat:` → New feature
* `fix:` → Bug fix
* `docs:` → Documentation updates
* `style:` → Formatting changes
* `refactor:` → Code restructuring
* `perf:` → Performance improvements
* `test:` → Testing-related changes


---

## 🧪 Testing & Validation

Before submitting a Pull Request:

### Frontend

```bash
cd client
npm run dev
```

### Backend

```bash
cd server
npm run server
```

Make sure:

* The application runs successfully.
* No console errors are present.
* Existing functionality remains unaffected.
* New features work as expected.

---

## 📦 Dependencies

* Avoid adding unnecessary npm packages.
* If a new dependency is required:

  * Justify its usage.
  * Mention it in the Pull Request description.

---

## 🔄 Pull Requests (PRs)

Please ensure your PR:

* Is focused on a single feature or fix.
* Includes a clear description.
* Includes screenshots for UI changes.
* References related issues when applicable.



---

## 🐛 Reporting Issues

If you find a bug or have a feature request:

- Open an Issue
- Provide clear steps to reproduce (for bugs)
- Suggest a possible solution if you have one

---

## ❤️ Code of Conduct

Please be respectful, constructive, and inclusive in all interactions.

