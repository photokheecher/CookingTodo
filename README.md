# Cooking Buddy

Cooking Buddy is an AI-powered meal planning micro-app that creates a personalized daily cooking plan based on your schedule, dietary preferences, pantry ingredients, and budget. The application returns a structured meal plan for breakfast, lunch, and dinner, a categorized grocery list, ingredient substitution options, and a budget assessment.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Google API key from [Google AI Studio](https://aistudio.google.com/app/apikeys)
- Git installed and configured
- Active GitHub account with the ability to create public repositories

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/photokheecher/CookingTodo.git
   cd CookingTodo
   ```
2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Add your Google API key to `.env`:
   ```bash
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_MODEL_ID=gemini-flash-latest
   PORT=4000
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser to `http://localhost:4000`

## ✅ Before You Begin

Make sure the following prerequisites are completed before starting:
- Your AI platform is installed and set up on your system.
- Git is installed and configured with your name and email.
- You have an active GitHub account.
- You can create and manage public repositories.

## ⚠️ Important Rules

Please follow these rules exactly:
- Only **one submission attempt** is allowed.
- The repository size must be under **10 MB**.
- The GitHub repository must be **public**.
- The repository must contain **only one branch**.

Failure to follow these rules may result in your submission being rejected.

## 🎯 Challenge Expectations

This project demonstrates:
- A smart, dynamic assistant that responds to user context.
- Logical decision making based on user schedule, preferences, and pantry items.
- Practical, usable output for real-world meal planning.
- Clean, maintainable, and well-structured code.
- A clear persona and solution vertical aligned with the chosen use case.

## 🛠️ How to Work on Your Project

1. Create a new public GitHub repository.
2. Open your AI development platform.
3. Clone the repository into the platform.
4. Build the solution through prompting and coding.
5. Commit and push progress regularly.
6. Keep all work within a single branch.

## 📤 What to Submit

Submit the following:
- A public GitHub repository link.
- Complete project code in the repository.
- A README that explains:
  - Your chosen vertical.
  - Your overall approach and logic.
  - How the solution works.
  - Any assumptions made.

> For detailed submission instructions, refer to the provided guide document.

## 📝 Evaluation Focus Areas

Submissions are reviewed on:
- **Code Quality** – structure, readability, and maintainability.
- **Security** – safe and responsible implementation.
- **Efficiency** – optimal use of resources.
- **Testing** – validation and correctness.
- **Accessibility** – inclusive and usable design.

## 🏆 How Your Work is Evaluated

Evaluation is based on three tiers:
- **High Impact**: Core functionality and important project outcomes.
- **Medium Impact**: Implementation quality, reliability, and performance.
- **Low Impact**: Final polish, UX details, and documentation.

Doing well in high-impact areas is the most important factor for a strong final evaluation.

## 🧩 Project Structure

```
CookingTodo/
├── server.js
├── googleClient.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── README.md
└── public/
    ├── index.html
    └── app.js
```

## 🔌 Technology Stack

- Backend: Node.js + Express
- Frontend: Vanilla HTML, CSS, JavaScript
- AI Service: Google Generative Language API (`gemini-flash-latest`)

## 📥 Usage

1. Enter your day context, diet preferences, pantry items, budget, and servings.
2. Click **Generate Plan**.
3. Review the AI-generated meal plan, grocery list, substitutions, and budget assessment.

## 🔐 Security Notes

- The API key is stored in `.env` and is not exposed in the browser.
- `.env` is excluded from Git using `.gitignore`.
