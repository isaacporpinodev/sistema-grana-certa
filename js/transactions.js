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
  }
});
