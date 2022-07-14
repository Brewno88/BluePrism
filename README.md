# ◭ Blue Prism UI Tech Test ◭

# Commit 1.4
# Commit 2.3
# Commit 3.3
## Vincenzo Conte

### Links 🔗
Live version - https://blueprism.netlify.app/ <br/>
FE Github repo - https://github.com/Brewno88/BluePrism <br/>
BE Github repo - https://github.com/Brewno88/BluePrism-server

### Stack 🧰
- React
- React-query
- React-table
- Axios
- Tailwindcss
- Vite

### Notes
This is my interpretation of the test based on the provided tasks and the wireframe. <br/>

Both Front-End and Back-End solution are hosted on their on domain using respectively Netlify and Heroku. <br>

Clicking on a Card on the left will make appear its recorded log entries in a table.
On top of the list there are three simple buttons that will filters the cards based on their retire state. <br>

The App behaviour are as per requirements:
- Clicking on a card will show its currently recorded log entries in a table on the right.
- Button at the bottom-right of the card to toggle retired state

### Extras
- Cards list Filters that show cards based on selection
- Sort Table columns
- Record a Log to the selected card (clicking on the "Add +" button will open a modal with a form)
- Fully Responsive

### What I would add
- Delete/Edit a Schedule entry
- Delete/Edit a Recorded Log entry
- Add Filters to the Logs Table
- Add filters to URL so to be able to share selection
- Form Validation for Add Log Entry

### What can be improved
- Filtering the cards fire a request on every click
