document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "slot1.png",
    "slot2.png",
    "slot3.png",
    "slot4.png",
    "slot5.png",
    "slot6.png",
    "slot7.png",
    "slot8.png",
    "slot9.png",
    "slot10.png",
  ];
  const slots = document.querySelectorAll(".slot img");
  const spinButton = document.getElementById("buttonToSpin");
  const creditDisplay = document.getElementById("credit");
  const rateDisplay = document.getElementById("rate");
  const prizeDisplay = document.getElementById("prize");
  const addMoneyInput = document.getElementById("addMoneyInput");
  const addMoneyButton = document.getElementById("addMoney");
  const selectRateInput = document.getElementById("selectRateInput");
  const selectRateButton = document.getElementById("selectRate");
  let credit = 0;
  let rate = 5;

  function getRandomImage() {
    return `images/${images[Math.floor(Math.random() * images.length)]}`;
  }

  function spinSlots() {
    if (credit >= rate) {
      credit -= rate;
      slots.forEach((slot) => {
        slot.src = getRandomImage();
      });
      setTimeout(() => {
        checkWin();
      }, 1);
    } else {
      alert("Ошибка: Недостаточно средств!");
    }
    updateDisplay();
  }

  function checkWin() {
    const rows = [
      {
        line: [
          slots[0],
          slots[1],
          slots[2],
          slots[3],
          slots[4],
          slots[5],
          slots[6],
          slots[7],
          slots[8],
        ],
        multiplier: 10000,
      },

      {
        line: [slots[0], slots[1], slots[2], slots[3], slots[4], slots[5]],
        multiplier: 1000,
      },
      {
        line: [slots[3], slots[4], slots[5], slots[6], slots[7], slots[8]],
        multiplier: 1000,
      },

      {
        line: [slots[0], slots[1], slots[2], slots[6], slots[7], slots[8]],
        multiplier: 200,
      },

      { line: [slots[0], slots[1], slots[2]], multiplier: 20 },
      { line: [slots[3], slots[4], slots[5]], multiplier: 20 },
      { line: [slots[6], slots[7], slots[8]], multiplier: 20 },

      { line: [slots[0], slots[4], slots[8]], multiplier: 5 },
      { line: [slots[2], slots[4], slots[6]], multiplier: 5 },

      { line: [slots[0], slots[4], slots[5]], multiplier: 5 },
      { line: [slots[3], slots[4], slots[2]], multiplier: 5 },
      { line: [slots[3], slots[4], slots[8]], multiplier: 5 },
      { line: [slots[6], slots[4], slots[5]], multiplier: 5 },

      { line: [slots[3], slots[1], slots[5]], multiplier: 3 },
      { line: [slots[3], slots[7], slots[5]], multiplier: 3 },
      { line: [slots[1], slots[3], slots[7]], multiplier: 3 },
      { line: [slots[1], slots[5], slots[7]], multiplier: 3 },

      { line: [slots[3], slots[1], slots[5], slots[7]], multiplier: 15 },
    ];

    let totalWin = 0;

    rows.forEach(({ line, multiplier }) => {
      const srcArray = line.map((slot) => slot.src);
      if (new Set(srcArray).size === 1) {
        totalWin += rate * multiplier;
      }
    });

    if (totalWin > 0) {
      credit += totalWin;
      prizeDisplay.textContent = totalWin;
      alert(`Поздравляем! Вы выиграли ${totalWin}`);
    }
  }

  function updateDisplay() {
    creditDisplay.textContent = credit;
    rateDisplay.textContent = rate;
  }

  addMoneyButton.addEventListener("click", () => {
    const amount = parseInt(addMoneyInput.value);
    if (!isNaN(amount) && amount > 0) {
      credit += amount;
      addMoneyInput.value = "";
      updateDisplay();
    } else {
      alert("Ошибка: Введите корректную сумму!");
    }
  });

  selectRateButton.addEventListener("click", () => {
    const newRate = parseInt(selectRateInput.value);
    if (!isNaN(newRate) && newRate > 0) {
      rate = newRate;
      selectRateInput.value = "";
      updateDisplay();
    } else {
      alert("Ошибка: Введите корректную ставку!");
    }
  });

  spinButton.addEventListener("click", spinSlots);
  updateDisplay();
});
