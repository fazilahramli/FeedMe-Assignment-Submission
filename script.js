let orderCount = 1;
let botCount = 0;
let pendingOrders = [];
let completeOrders = [];

document.getElementById('newNormalOrder').addEventListener('click', () => addOrder('normal'));
document.getElementById('newVIPOrder').addEventListener('click', () => addOrder('vip'));
document.getElementById('addBot').addEventListener('click', addBot);
document.getElementById('removeBot').addEventListener('click', removeBot);

function addOrder(type) {
    const order = {
        id: orderCount++,
        type: type,
    };

    if (type === 'normal') {
        pendingOrders.push(order);
    } else {
        pendingOrders.unshift(order); // VIP order goes to the front
    }

    updateOrderList();
}

function addBot() {
    botCount++;
    processOrders();
}

function removeBot() {
    if (botCount > 0) {
        botCount--;
        if (botCount === 0) {
            // Stop all bots (in real implementation, we could stop processes here)
            alert('No bots available to process orders.');
        }
    }
}

function processOrders() {
    if (botCount > 0 && pendingOrders.length > 0) {
        const bot = createBot();
        setTimeout(() => {
            completeOrder(bot);
            processOrders();
        }, 10000); // 10 seconds to complete an order
    }
}

function createBot() {
    const botId = `Bot-${botCount}`;
    const order = pendingOrders.shift();
    return { id: botId, order: order };
}

function completeOrder(bot) {
    completeOrders.push(bot.order);
    updateOrderList();
}

function updateOrderList() {
    const pendingList = document.getElementById('pendingOrders');
    const completeList = document.getElementById('completeOrders');

    pendingList.innerHTML = '';
    completeList.innerHTML = '';

    pendingOrders.forEach(order => {
        const li = document.createElement('li');
        li.classList.add(order.type);
        li.innerHTML = `Order #${order.id} - ${order.type.toUpperCase()}`;
        pendingList.appendChild(li);
    });

    completeOrders.forEach(order => {
        const li = document.createElement('li');
        li.classList.add(order.type);
        li.innerHTML = `Order #${order.id} - ${order.type.toUpperCase()} - COMPLETED`;
        completeList.appendChild(li);
    });
}
