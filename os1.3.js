const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const allocateBtn = document.getElementById('allocateBtn');
const collectBtn = document.getElementById('collectBtn');
const progress = document.getElementById('progress');
const usageText = document.getElementById('usage');
const memoryBlocks = document.querySelector('.memory-blocks');

let isPaused = false;
let totalMemory = 300;
let usedMemory = 139;
let blockCount = 11;
let timeStep = 0;

const ctx = document.getElementById('memoryChart').getContext('2d');
const memoryChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Memory Usage (units)',
            data: [usedMemory],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { min: 0, max: totalMemory, title: { display: true, text: 'Memory (units)' } }
        },
        plugins: { legend: { display: false } }
    }
});

function updateMemoryUsage() {
    const percentage = (usedMemory / totalMemory) * 100;
    progress.style.width = `${percentage}%`;
    usageText.textContent = `${usedMemory} / ${totalMemory} units`;

    timeStep++;
    memoryChart.data.labels.push(timeStep);
    memoryChart.data.datasets[0].data.push(usedMemory);

    if (memoryChart.data.labels.length > 20) {
        memoryChart.data.labels.shift();
        memoryChart.data.datasets[0].data.shift();
    }
    memoryChart.update();
}

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.style.backgroundColor = isPaused ? '#2ecc71' : '#e74c3c';
});

resetBtn.addEventListener('click', () => {
    usedMemory = 0;
    memoryBlocks.innerHTML = '';
    blockCount = 0;
    timeStep = 0;
    memoryChart.data.labels = [0];
    memoryChart.data.datasets[0].data = [0];
    updateMemoryUsage();
});

allocateBtn.addEventListener('click', () => {
    if (isPaused) return;
    const size = Math.floor(Math.random() * 50) + 10;
    if (usedMemory + size > totalMemory) return alert('Not enough memory to allocate!');
    blockCount++;
    usedMemory += size;
    const block = document.createElement('div');
    block.classList.add('block');
    block.innerHTML = `<p>Block #${blockCount} <span class="status">Referenced</span></p><p>Size: ${size} units</p>`;
    memoryBlocks.appendChild(block);
    updateMemoryUsage();
});

collectBtn.addEventListener('click', () => {
    if (isPaused) return;
    let removedMemory = 0;
    memoryBlocks.querySelectorAll('.block').forEach((block, index) => {
        if (index % 2 === 0) {
            removedMemory += parseInt(block.querySelector('p:last-child').textContent.match(/\d+/)[0]);
            block.remove();
        }
    });
    usedMemory -= removedMemory;
    updateMemoryUsage();
});

updateMemoryUsage();
