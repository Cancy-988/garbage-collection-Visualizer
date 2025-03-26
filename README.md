📟 <b>Garbage Collection Visualizer</b>

A web-based tool to simulate and visualize garbage collection in action! Built with HTML, CSS, and JavaScript, this project helps you understand memory management concepts with real-time visualizations and interactive controls. 🚀

✨<b> Features:</b>

🧠 Memory Management Simulation: Simulate memory allocation and garbage collection processes.

🖼️ Interactive Web Interface: Allocate memory, trigger garbage collection, and reset the simulation with a sleek HTML/CSS interface.

📊<b> Visualizations:  </b>

Memory Usage Over Time: Line graph showing memory usage trends.  

Resource Allocation: Pie chart displaying used vs. free memory.  

Active and Deleted Memory Blocks: Real-time lists of allocated and deallocated memory blocks.

📈 Metrics: Track total memory usage (e.g., 139/300 MB) and block sizes.

🛠️ Interactive Controls: Buttons to allocate memory, collect garbage, and reset the simulation.

📸<b> Screenshots</b>

Main Interface  

Memory Usage Over Time: Line graph showing memory usage (139 MB out of 300 MB).  

Resource Allocation: Pie chart showing used (green) vs. free (gray) memory.  

Active Memory Blocks: Lists allocated blocks like document4.txt (30 MB), image5.jpg (20 MB), video7.mp4 (36 MB), and script11.js (53 MB).  

Deleted Memory Blocks: Table for tracking deallocated blocks (currently empty).
🌐<b> Flowcharts</b>

🛠️ <b>Prerequisites: </b>

🌐 Modern Web Browser: Chrome, Firefox, Edge, or Safari.

📦 Languages and Libraries:  

Html5, CSS3, Javascript

Chart.js (for rendering the line graph and pie chart)

🚀<b> Installation: </b>

Clone the Repository:

bash

git clone https://github.com/your-username/GarbageCollectionVisualizer.git

cd GarbageCollectionVisualizer

Install Dependencies:

This project uses Chart.js for visualizations. You can include it via a CDN or install it locally using npm.  

Option 1: Use CDN (already included in index.html): No additional setup required.  

Option 2: Install via npm (if you prefer local installation):  

bash

npm install chart.js

Launch the Visualizer:

Open index.html in your web browser:  

If you have a local server (e.g., using VS Code's Live Server extension), use that for the best experience.  

Alternatively, you can run a simple server using Python:  

bash

python -m http.server 8000

Then navigate to http://localhost:8000 in your browser.

🔧<b> How to Use</b>

Start the App: Open the application in your browser. 🔥  

Allocate Memory:  

Click the Allocate button to simulate memory allocation.  

New memory blocks (e.g., document4.txt, image5.jpg) will appear with their sizes.

Monitor Memory Usage:  

The Memory Usage Over Time graph updates as memory is allocated or deallocated.  

The Resource Allocation pie chart shows the proportion of used vs. free memory.

Trigger Garbage Collection:  

Click the Collect button to simulate garbage collection.  

Unreferenced memory blocks will be deallocated and listed under Deleted Memory Blocks.

Reset the Simulation:  

Click the Reset button to clear all memory blocks and start over. 🧹

🗂️ <b> Code Breakdown</b>

index.html:

✨ Defines the structure of the web page, including sections for the graphs, memory block lists, and buttons.  

osfinal.css:

🎨 Styles the interface with a clean, modern look, including layout for the graphs, buttons, and memory block displays.  

osfinal.js:

🚀 initCharts: Initializes the Chart.js line graph and pie chart for memory usage and resource allocation.

⚖️ allocateMemory: Simulates memory allocation by adding new blocks with random sizes.

🧩 collectGarbage: Identifies unreferenced blocks and deallocates them, updating the visualizations.

📊 resetSimulation: Clears all memory blocks and resets the charts and lists.

✨ updateVisuals: Updates the line graph, pie chart, and memory block lists in real-time.  

🌟<b> Example: </b>

Input:  

Click Allocate multiple times to add memory blocks (e.g., document4.txt (30 MB), image5.jpg (20 MB), video7.mp4 (36 MB), script11.js (53 MB)).  

Total memory usage: 139/300 MB.

Action:  

Click Collect to trigger garbage collection.  

Unreferenced blocks are removed and listed under Deleted Memory Blocks.

Output:  

Memory Usage Graph: Updates to reflect the new memory usage after garbage collection.  

Pie Chart: Adjusts the used vs. free memory ratio.  

Deleted Memory Blocks: Lists deallocated blocks with their sizes.  

Eye-catching plots of memory usage over time and resource allocation. 🎨

🚀<b> Authors</b>
👤 [Your Name]
👤 [Contributor Name] (Add more contributors as needed.)
