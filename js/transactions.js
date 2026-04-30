const API_URL = "http://localhost:3000/transactions";
let editingTransactionId = null;

const transactionForm = document.getElementById("transaction-form");
const formMessage = document.getElementById("form-message");
const transactionsList = document.getElementById("transactions-list");
const totalIncomeElement = document.getElementById("total-entradas");
const totalExpenseElement = document.getElementById("total-saidas");
const balanceElement = document.getElementById("saldo-total");
const submitBtn = document.querySelector(".submit-button");
const cancelEditBtn = document.getElementById("cancel-edit-button");
const monthFilter = document.getElementById("month-filter");

function showFormMessage(message, type) {
  formMessage.classList.remove("success", "error", "warning");
  formMessage.style.display = "block";
  formMessage.innerText = message;
  formMessage.classList.add(type);
}

function hideFormMessage() {
  formMessage.style.display = "none";
}

function formatCurrency(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function getTransactionFormData() {
  return {
    description: document.getElementById("description").value.trim(),
    amount: Number(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    type: document.getElementById("type").value,
  };
}

function validateTransactionData(transactionData) {
  if (!transactionData.description) {
    return "Informe uma descrição para a movimentação.";
  }

  if (Number.isNaN(transactionData.amount) || transactionData.amount <= 0) {
    return "Informe um valor válido maior que zero.";
  }

  if (!transactionData.category) {
    return "Selecione uma categoria.";
  }

  if (!transactionData.date) {
    return "Selecione uma data.";
  }

  if (!transactionData.type) {
    return "Selecione o tipo da movimentação.";
  }

  return null;
}

function createActionsCell(transaction) {
  const actionsCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  deleteButton.type = "button";
  deleteButton.innerText = "Excluir";
  deleteButton.classList.add("action-button", "delete-button");

  editButton.type = "button";
  editButton.innerText = "Editar";
  editButton.classList.add("action-button", "edit-button");

  editButton.addEventListener("click", () => {
    fillFormWithTransaction(transaction);
    editingTransactionId = transaction.id;
    submitBtn.innerText = "Atualizar movimentação";
    cancelEditBtn.style.display = "inline-block";
  });

  deleteButton.addEventListener("click", () => {
    deleteTransaction(transaction.id);
  });

  actionsCell.append(deleteButton, editButton);

  return actionsCell;
}

function formatCategory(category){
  const categoryNames = {
  alimentacao: "Alimentação",
  assinaturas: "Assinaturas",
  educacao: "Educação",
  emergencia: "Emergência",
  freelance: "Freelance",
  internet: "Internet",
  investimentos: "Investimentos",
  lazer: "Lazer",
  moradia: "Moradia",
  outros: "Outros",
  salario: "Salário",
  saude: "Saúde",
  servicos: "Serviços",
  transporte: "Transporte",
  venda: "Venda",
};

 return categoryNames[category] || category
}

function createTransactionRow(transaction) {
  const transactionRow = document.createElement("tr");

  const descriptionCell = document.createElement("td");
  const categoryCell = document.createElement("td");
  const dateCell = document.createElement("td");
  const typeCell = document.createElement("td");
  const amountCell = document.createElement("td");
  const actionsCell = createActionsCell(transaction);

  descriptionCell.innerText = transaction.description;
  categoryCell.innerText = formatCategory(transaction.category);
  dateCell.innerText = formatDate(transaction.date);

  if (transaction.type === "entrada") {
    typeCell.innerText = "Entrada";
    amountCell.classList.add("income");
  } else if (transaction.type === "saida") {
    typeCell.innerText = "Saída";
    amountCell.classList.add("expense");
  } else {
    typeCell.innerText = "-";
  }

  amountCell.innerText = formatCurrency(transaction.amount);

  transactionRow.append(
    descriptionCell,
    categoryCell,
    dateCell,
    typeCell,
    amountCell,
    actionsCell,
  );

  return transactionRow;
}

function renderEmptyState() {
  transactionsList.innerHTML = `
    <tr>
      <td colspan="6">Nenhuma movimentação cadastrada ainda.</td>
    </tr>
  `;
}

function updateSummaryCards(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "entrada") {
      totalIncome += Number(transaction.amount);
    }

    if (transaction.type === "saida") {
      totalExpense += Number(transaction.amount);
    }
  });

  const balance = totalIncome - totalExpense;

  totalIncomeElement.innerText = formatCurrency(totalIncome);
  totalExpenseElement.innerText = formatCurrency(totalExpense);
  balanceElement.innerText = formatCurrency(balance);
}

function filterTransactionsByMonth(transactions) {
  const selectedMonth = monthFilter.value;

  if (selectedMonth === "todos") {
    return transactions;
  } else {
    return transactions.filter((transaction) => {
      return transaction.date.startsWith(selectedMonth);
    });
  }
}

function sortTransactionsByDate(transactions){
  return transactions.sort((a,b)=> {
    return new Date(b.date) - new Date(a.date)
    })
}

function renderTransactions(transactions) {
  transactionsList.innerHTML = "";

  if (transactions.length === 0) {
    renderEmptyState();
    updateSummaryCards([]);
    return;
  }

  transactions.forEach((transaction) => {
    const transactionRow = createTransactionRow(transaction);
    transactionsList.append(transactionRow);
  });

  updateSummaryCards(transactions);
}

async function fetchTransactions() {
  try {
    const response = await fetch(API_URL);
    const transactions = await response.json();
    const filteredTransactions = filterTransactionsByMonth(transactions);
    const sortedTransactions = sortTransactionsByDate(filteredTransactions)

    renderTransactions(sortedTransactions)
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    renderEmptyState();
  }
}

async function handleTransactionSubmit(event) {
  event.preventDefault();

  hideFormMessage();

  const transactionData = getTransactionFormData();
  const validationMessage = validateTransactionData(transactionData);

  if (validationMessage) {
    showFormMessage(validationMessage, "error");
    return;
  }

  try {
    let response;
    let successMessage;

    if (!editingTransactionId) {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
      successMessage = "Movimentação adicionada com sucesso!";
    } else {
      response = await fetch(`${API_URL}/${editingTransactionId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
      successMessage = "Movimentação atualizada com sucesso!";
    }

    if (!response.ok) {
      throw new Error("Request failed");
    }

    transactionForm.reset();
    showFormMessage(successMessage, "success");
    fetchTransactions();
    editingTransactionId = null;
    submitBtn.innerText = "Salvar movimentação";
    cancelEditBtn.style.display = "none";

    setTimeout(() => {
      hideFormMessage();
    }, 3000);
  } catch (error) {
    showFormMessage("Erro ao salvar movimentação.", "error");
  }
}

async function deleteTransaction(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }

    showFormMessage("Movimentação excluída com sucesso!", "success");
    fetchTransactions();

    setTimeout(() => {
      hideFormMessage();
    }, 3000);
  } catch (error) {
    showFormMessage("Erro ao excluir movimentação.", "error");
  }
}

function fillFormWithTransaction(transaction) {
  document.getElementById("description").value = transaction.description;

  document.getElementById("amount").value = transaction.amount;

  document.getElementById("category").value = transaction.category;

  document.getElementById("date").value = transaction.date;

  document.getElementById("type").value = transaction.type;
}

function cancelEditing() {
  transactionForm.reset();
  editingTransactionId = null;
  submitBtn.innerText = "Salvar movimentação";
  cancelEditBtn.style.display = "none";
}

transactionForm.addEventListener("submit", handleTransactionSubmit);
cancelEditBtn.addEventListener("click", cancelEditing);
monthFilter.addEventListener("change", fetchTransactions);

fetchTransactions();
