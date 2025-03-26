let balances = {};

function addExpense() {
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
    const numPeople = parseInt(document.getElementById("num-people").value);

    if (!expenseName || !expenseAmount || !numPeople) {
        alert("Please fill in all fields.");
        return;
    }

    const perPerson = expenseAmount / numPeople;

    // Update balances
    for (let i = 1; i <= numPeople; i++) {
        balances[`Person ${i}`] = (balances[`Person ${i}`] || 0) + perPerson;
    }

    updateSummary(expenseName, expenseAmount, perPerson);
    updateBalances();
}

function updateSummary(name, amount, perPerson) {
    const summaryTable = document.getElementById("expense-summary").getElementsByTagName("tbody")[0];
    const row = summaryTable.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = amount.toFixed(2);
    row.insertCell(2).textContent = perPerson.toFixed(2);
}

function updateBalances() {
    const balanceList = document.getElementById("balance-list");
    balanceList.innerHTML = ""; // Clear existing list

    for (const person in balances) {
        const li = document.createElement("li");
        li.textContent = `${person}: ₹${balances[person].toFixed(2)}`;
        balanceList.appendChild(li);
    }
}

function settleBalance(payer, payee, amount) {
    amount = parseFloat(amount);
    if (balances[payer] !== undefined && balances[payee] !== undefined && amount > 0) {
        balances[payer] -= amount;
        balances[payee] += amount;
        updateBalances();
    } else {
        alert("Invalid transaction.");
    }
}
