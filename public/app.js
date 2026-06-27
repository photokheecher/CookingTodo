const form = document.getElementById('planForm');
const chatMessages = document.getElementById('chatMessages');
const statusText = document.getElementById('statusText');
const chips = document.querySelectorAll('.chip[data-value]');
const submitButton = form.querySelector('button[type="submit"]');

chips.forEach((chip) => {
  chip.addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('dietPreferences');
    const chipValue = chip.dataset.value;
    input.value = chipValue;
    input.focus();
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});

function formatPlanJSON(data) {
  try {
    const plan = typeof data === 'string' ? JSON.parse(data) : data;
    let html = '';
    
    if (plan.meal_plan) {
      html += '<div class="plan-section"><h3>🍽️ Meal Plan</h3><div class="meal-cards">';
      ['breakfast', 'lunch', 'dinner'].forEach(meal => {
        const mealData = plan.meal_plan[meal];
        if (mealData) {
          html += `<div class="meal-card"><h4>${meal.charAt(0).toUpperCase() + meal.slice(1)}</h4><p><strong>Dish:</strong> ${mealData.dish}</p><p><strong>Prep:</strong> ${mealData.prep}</p><p><strong>Time:</strong> ${mealData.time_minutes} mins</p></div>`;
        }
      });
      html += '</div></div>';
    }
    
    if (plan.grocery_list) {
      html += '<div class="plan-section"><h3>🛒 Grocery List</h3>';
      const categories = ['vegetables', 'proteins', 'dairy', 'pantry_staples', 'spices_condiments'];
      categories.forEach(cat => {
        const items = plan.grocery_list[cat] || [];
        if (items.length > 0) {
          const catLabel = cat.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
          html += `<div class="list-category"><strong>${catLabel}:</strong> ${items.join(', ')}</div>`;
        }
      });
      html += '</div>';
    }
    
    if (plan.substitutions && plan.substitutions.length > 0) {
      html += '<div class="plan-section"><h3>🔄 Substitutions</h3>';
      plan.substitutions.forEach(sub => {
        html += `<div class="substitution-row"><strong>${sub.ingredient}:</strong> ${sub.alternatives.join(' or ')}</div>`;
      });
      html += '</div>';
    }
    
    if (plan.budget_assessment) {
      const budget = plan.budget_assessment;
      html += '<div class="plan-section budget"><h3>💰 Budget</h3>';
      html += `<p><strong>Classification:</strong> ${budget.classification}</p><p><strong>Spend:</strong> ${budget.estimated_spend}</p>`;
      if (budget.cost_saving_tips && budget.cost_saving_tips.length > 0) {
        html += '<strong>Tips:</strong><ul>';
        budget.cost_saving_tips.forEach(tip => html += `<li>${tip}</li>`);
        html += '</ul>';
      }
      html += '</div>';
    }
    
    return html;
  } catch (error) {
    return `<p style="color: #ef4444;">Error parsing plan: ${error.message}</p>`;
  }
}

function addMessage(content, sender = 'ai', isHTML = false) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  if (isHTML) {
    bubble.innerHTML = content;
  } else {
    bubble.textContent = content;
  }
  message.appendChild(bubble);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const dayContext = document.getElementById('dayContext').value.trim();
  const dietPreferences = document.getElementById('dietPreferences').value.trim();
  const pantryItems = document.getElementById('pantryItems').value.trim();
  const budget = document.getElementById('budget').value.trim();
  const servings = document.getElementById('servings').value;
  
  addMessage(`Plan for ${dayContext} | Diet: ${dietPreferences} | Budget: ${budget}`, 'user');
  
  submitButton.disabled = true;
  statusText.textContent = '🤖 Cooking Buddy is thinking...';
  addMessage('Generating your meal plan...', 'ai', false);

  try {
    const response = await fetch('/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dayContext, dietPreferences, pantryItems, budget, servings })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Unable to generate plan.');
    }

    const data = await response.json();
    const lastMessage = chatMessages.lastElementChild;
    lastMessage.remove();
    const formattedPlan = formatPlanJSON(data.plan);
    addMessage(formattedPlan, 'ai', true);
    statusText.textContent = '✅ Plan created successfully!';
  } catch (error) {
    addMessage(`Error: ${error.message}`, 'ai', false);
    statusText.textContent = '❌ Something went wrong';
  } finally {
    submitButton.disabled = false;
  }
});


