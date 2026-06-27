# 🍽️ Cooking Buddy

A lightweight AI-powered meal planning micro-app that generates personalized meal plans, grocery lists, ingredient substitutions, and budget assessments. Built with Node.js + Express backend and vanilla HTML/CSS/JavaScript frontend.

## ✨ Features

- **AI-Generated Meal Plans**: Breakfast, lunch, and dinner recommendations tailored to your day and preferences
- **Smart Grocery Lists**: Organized by category (vegetables, proteins, dairy, pantry staples, spices)
- **Ingredient Substitutions**: Alternative ingredients for dietary flexibility
- **Budget Assessment**: Cost estimation and money-saving tips
- **Chat Interface**: Modern, responsive chat-like UI for intuitive interaction
- **Diet Preferences**: Quick-select chips for common diet types (vegetarian, keto, low-carb, gluten-free)
- **Pantry Integration**: Factor in ingredients you already have

## 🛠️ Tech Stack

- **Backend**: Node.js + Express 4.18.2 (ES Modules)
- **Frontend**: Vanilla HTML5, CSS3 (Flexbox/Grid), JavaScript
- **AI Model**: Google Generative Language API (gemini-flash-latest)
- **Development**: nodemon for auto-reload

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Google API key (get one from [Google AI Studio](https://aistudio.google.com/app/apikeys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/photokheecher/CookingTodo.git
   cd CookingTodo
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

3. **Add your Google API key** to `.env`:
   ```
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_MODEL_ID=gemini-flash-latest
   PORT=4000
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:4000`

## 📝 Usage

1. **Enter your day context**: Describe your schedule (e.g., "Morning desk work, lunch at noon, evening workout at 6pm")
2. **Select diet preferences**: Click chips or type manually (vegetarian, keto friendly, low-carb, gluten-free)
3. **List pantry items**: Items you already have available
4. **Set budget**: Target spending (e.g., "$30" or "moderate")
5. **Choose servings**: Number of servings needed
6. **Generate Plan**: Click "Generate Plan" and let AI Cooking Buddy create your meal plan

The response includes:
- ✅ Personalized meal recommendations with prep time
- ✅ Complete grocery list organized by category
- ✅ Ingredient substitution options
- ✅ Budget feasibility and cost-saving tips

## 🏗️ Project Structure

```
CookingTodo/
├── server.js           # Express backend server
├── googleClient.js     # Google Generative Language API client
├── package.json        # Dependencies and scripts
├── .env.example        # Environment template
├── .gitignore          # Git ignore rules
├── public/
│   ├── index.html      # Chat interface UI
│   └── app.js          # Frontend logic and API integration
└── README.md           # This file
```

## 🔌 API Endpoints

### `POST /api/plan`

Generates a personalized meal plan.

**Request body:**
```json
{
  "dayContext": "Morning desk work, lunch break at 12pm...",
  "dietPreferences": "vegetarian",
  "pantryItems": "chicken, rice, tomato, beans, olive oil",
  "budget": "$30",
  "servings": "2"
}
```

**Response:**
```json
{
  "plan": "{\"meal_plan\": {...}, \"grocery_list\": {...}, \"substitutions\": [...], \"budget_assessment\": {...}}"
}
```

## 🔐 Security Notes

- **API Key Protection**: Your Google API key is kept on the backend and never exposed to the browser
- **.env Management**: Never commit `.env` to version control (included in `.gitignore`)
- **CORS**: Currently configured for local development; adjust for production if needed

## 💡 How It Works

1. **Frontend**: User fills form and submits
2. **Backend** (`server.js`): Validates input and constructs detailed AI prompt
3. **Google API** (`googleClient.js`): Sends prompt to gemini-flash-latest model
4. **Response Parsing**: Backend returns JSON-formatted meal plan
5. **UI Rendering** (`app.js`): Frontend parses and displays results in chat message format

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `public/index.html`:
```css
:root {
  --primary: #4f46e5;        /* Main blue */
  --accent: #f97316;         /* Orange accents */
  --bg: #f5f7ff;             /* Background */
}
```

### Modify AI Behavior
Edit the prompt in `server.js` POST `/api/plan` endpoint to change:
- Meal complexity
- Pantry item prioritization
- Budget considerations
- Dietary restrictions handling

## 📦 Dependencies

- **express** (4.18.2) - Web framework
- **dotenv** (16.3.1) - Environment variable loader

**Dev Dependencies:**
- **nodemon** (3.0.1) - Auto-reload on file changes

## 🚦 npm Scripts

```bash
npm start     # Run production server
npm run dev   # Run with auto-reload (nodemon)
```

## 🐛 Troubleshooting

**Port Already in Use**
```bash
lsof -i :4000 -t | xargs kill -9
```

**API Key Invalid**
- Verify API key in `.env`
- Ensure Google AI Studio key has Generative Language API enabled

**Slow Response**
- Normal response time is 10-15 seconds (Gemini thinking tokens)
- Consider enabling caching for repeated requests

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🔗 Resources

- [Google AI Studio](https://aistudio.google.com/app/apikeys)
- [Google Generative AI API Docs](https://ai.google.dev/docs)
- [Express.js Documentation](https://expressjs.com/)

---

**Created with ❤️ for meal planning enthusiasts**
