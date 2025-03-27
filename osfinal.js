const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const allocateBtn = document.getElementById('allocateBtn');
const collectBtn = document.getElementById('collectBtn');
const progress = document.getElementById('progress');
const usageText = document.getElementById('usage');
const memoryBlocks = document.querySelector('.memory-blocks');
const deletedTableBody = document.getElementById('deletedTableBody');

let isPaused = false;
let totalMemory = 300;
let usedMemory = 139;
let blockCount = 11;
let timeStep = 0;
let deletedBlocks = [];

const memoryCtx = document.getElementById('memoryChart').getContext('2d');
const memoryChart = new Chart(memoryCtx, {
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

const allocationCtx = document.getElementById('allocationChart').getContext('2d');
const allocationChart = new Chart(allocationCtx, {
    type: 'pie',
    data: {
        labels: ['Used Memory', 'Free Memory'],
        datasets: [{
            data: [usedMemory, totalMemory - usedMemory],
            backgroundColor: ['#2ecc71', '#ecf0f1'],
            borderColor: ['#27ae60', '#d5dbdb'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
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
    
    allocationChart.data.datasets[0].data = [usedMemory, totalMemory - usedMemory];
    
    memoryChart.update();
    allocationChart.update();
}

function updateDeletedTable() {
    deletedTableBody.innerHTML = '';
    deletedBlocks.forEach(block => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${block.id}</td>
            <td>${block.size}</td>
            <td>${block.time}</td>
        `;
        deletedTableBody.appendChild(row);
    });
}

function sortTable(column) {
    deletedBlocks.sort((a, b) => {
        if (column === 0) return a.id.localeCompare(b.id);
        if (column === 1) return a.size - b.size;
        if (column === 2) return new Date(a.time) - new Date(b.time);
    });
    updateDeletedTable();
}

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.style.backgroundColor = isPaused ? '#2ecc71' : '#e74c3c';
});

resetBtn.addEventListener('click', () => {
    usedMemory = 0;
    memoryBlocks.innerHTML = '';
    deletedBlocks = [];
    blockCount = 0;
    timeStep = 0;
    memoryChart.data.labels = [0];
    memoryChart.data.datasets[0].data = [0];
    updateMemoryUsage();
    updateDeletedTable();
});

allocateBtn.addEventListener('click', () => {
    if (isPaused) return;

    const size = Math.floor(Math.random() * 50) + 10;
    if (usedMemory + size > totalMemory) {
        alert('Not enough memory to allocate!');
        return;
    }

    blockCount++;
    usedMemory += size;

    const block = document.createElement('div');
    block.classList.add('block');
    block.innerHTML = `
        <p>Block #${blockCount} <span class="status">Referenced</span></p>
        <p>Size: ${size} units</p>
    `;
    memoryBlocks.appendChild(block);
    updateMemoryUsage();
});

collectBtn.addEventListener('click', () => {
    if (isPaused) return;

    const blocks = memoryBlocks.querySelectorAll('.block');
    let removedMemory = 0;

    blocks.forEach((block, index) => {
        if (index % 2 === 0) {
            const blockText = block.querySelector('p:first-child').textContent;
            const blockId = blockText.split(' ')[1];
            const sizeText = block.querySelector('p:last-child').textContent;
            const size = parseInt(sizeText.match(/\d+/)[0]);
            removedMemory += size;
            
            block.style.opacity = '0';
            setTimeout(() => block.remove(), 300);
            
            deletedBlocks.unshift({
                id: blockId,
                size: size,
                time: new Date().toLocaleTimeString()
            });
        }
    });

    usedMemory -= removedMemory;
    updateMemoryUsage();
    updateDeletedTable();
});

document.querySelectorAll('th').forEach((th, index) => {
    th.addEventListener('click', () => sortTable(index));
});

updateMemoryUsage();