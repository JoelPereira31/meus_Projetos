// 1. Elementos do DOM
const balanceDisplay = document.getElementById('balance');
const moneyPlusDisplay = document.getElementById('money-plus');
const moneyMinusDisplay = document.getElementById('money-minus');
const transactionsUl = document.getElementById('transactions');
const emptyListMsg = document.getElementById('empty-list');
const addBtn = document.getElementById('add-btn');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// 2. Chave para salvar os dados no LocalStorage
const localStorageKey = 'meus_Projetos_financas';

// 3. Inicialização das Transações
let transactions = JSON.parse(localStorage.getItem(localStorageKey)) || [];

// 4. Função para atualizar os valores numéricos
function updateValues() {
    const amounts = transactions.map(transaction => Number(transaction.amount));

    const total = amounts.reduce((acc, value) => acc + value, 0);
    
    const income = amounts
        .filter(value => value > 0)
        .reduce((acc, value) => acc + value, 0);

    const expense = Math.abs(
        amounts
            .filter(value => value < 0)
            .reduce((acc, value) => acc + value, 0)
    );

    balanceDisplay.textContent = `R$ ${formatCurrency(total)}`;
    moneyPlusDisplay.textContent = `+ R$ ${formatCurrency(income)}`;
    moneyMinusDisplay.textContent = `- R$ ${formatCurrency(expense)}`;
}

// Auxiliar de formatação de moeda
function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// 5. Renderizar item na tela
function addTransactionIntoDOM(transaction) {
    const operator = transaction.amount > 0 ? '+' : '-';
    const classCSS = transaction.amount > 0 ? 'plus' : 'minus';
    const amountAbs = Math.abs(transaction.amount);

    const li = document.createElement('li');
    li.classList.add(classCSS);

    li.innerHTML = `
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        <span>${transaction.text}</span>
        <span>${operator} R$ ${formatCurrency(amountAbs)}</span>
    `;

    transactionsUl.appendChild(li);
}

// 6. Inicializar e atualizar a interface
function init() {
    transactionsUl.innerHTML = '';

    if (transactions.length > 0) {
        transactions.forEach(addTransactionIntoDOM);
        emptyListMsg.style.display = 'none';
    } else {
        emptyListMsg.style.display = 'block';
    }

    updateValues();
}

// 7. Salvar no banco do navegador
function updateLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(transactions));
}

// 8. Gerar ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// 9. Event Listener: Adicionar Nova Transação ao Clicar no Botão
addBtn.addEventListener('click', () => {
    const transactionName = textInput.value.trim();
    const transactionAmount = parseFloat(amountInput.value.trim());

    if (transactionName === '' || isNaN(transactionAmount)) {
        alert('Por favor, preencha a descrição e um valor numérico válido!');
        return;
    }

    const transaction = {
        id: generateID(),
        text: transactionName,
        amount: transactionAmount
    };

    transactions.push(transaction);
    init();
    updateLocalStorage();

    textInput.value = '';
    amountInput.value = '';
    textInput.focus();
});

// 10. Remover transação
window.removeTransaction = id => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
};

init();