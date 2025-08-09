
  const billInput = document.getElementById("bill");
  const peopleInput = document.getElementById("people");
  const tipButtons = document.querySelectorAll(".tip");
  const customTipInput = document.getElementById("custom-tip");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalAmountDisplay = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset");

  function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);
    let tipPercent = parseFloat(document.querySelector(".tip.active")?.textContent || 0);
    if (isNaN(tipPercent)) {
      tipPercent = parseFloat(customTipInput.value);
    }
    if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0 || isNaN(tipPercent)) {
      tipAmountDisplay.textContent = "$0.00";
      totalAmountDisplay.textContent = "$0.00";
      return;
    }
    const tipTotal = (bill * tipPercent) / 100;
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people;
    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  tipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tipButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      customTipInput.value = "";
      calculateTip();
    });
  });

  customTipInput.addEventListener("input", () => {
    tipButtons.forEach(b => b.classList.remove("active"));
    calculateTip();
  });

  billInput.addEventListener("input", calculateTip);
  peopleInput.addEventListener("input", calculateTip);

  resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";
    tipButtons.forEach(b => b.classList.remove("active"));
    tipButtons[2].classList.add("active"); // default to 15%
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
  });

