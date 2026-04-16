const formulario = document.getElementById("transaction-form");
formulario.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  const transactionData = {
    description,
    amount,
    category,
    date,
    type,
  };
  console.log(transactionData);

  const response = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify(transactionData),
  });

  if (response.ok) {
    formulario.reset();
    const form = document.getElementById("form-message");
    form.innerText = "Transação adicionada com sucesso!";
  }
});

async function fetchTransactions() {
  const response = await fetch("http://localhost:3000/transactions", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await response.json();

  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerText = "";

  json.forEach((element) => {
    const transactionRow = document.createElement("tr");
    const descriptionCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const typeCell = document.createElement("td");

    typeCell.innerText = element.type;
    dateCell.innerText = element.date;
    amountCell.innerText = element.amount.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    categoryCell.innerText = element.category;
    descriptionCell.innerText = element.description;

    if (element.type === "entrada") {
      amountCell.classList.add("income");
    } else {
      amountCell.classList.add("expense");
    }

    transactionRow.append(
      descriptionCell,
      categoryCell,
      dateCell,
      typeCell,
      amountCell,
    );
    transactionsList.append(transactionRow);
  });
}
fetchTransactions();
