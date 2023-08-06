function createCalculator() {
  return {
    display: document.querySelector(".display"),
    isResultDisplayed: false,

    start() {
      this.btnClicks();
      this.enterKey();
    },

    enterKey() {
      this.display.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
          this.calculate();
        }
      });
    },

    clearDisplay() {
      this.display.value = "";
      this.isResultDisplayed = false;
    },

    calculate() {
      const expression = this.display.value;

      if (!expression) {
        alert("Conta inválida");
        this.isResultDisplayed = false;
        return;
      }

      try {
        const result = Function(`return ${expression}`)();
        this.display.value = result;
        this.isResultDisplayed = true;
      } catch (e) {
        alert("Conta inválida");
        this.isResultDisplayed = false;
      }
    },

    btnClicks() {
      document.addEventListener("click", (e) => {
        const el = e.target;

        if (el.classList.contains("btn-num")) {
          if (this.isResultDisplayed) {
            this.display.value = el.innerText;
            this.isResultDisplayed = false;
          } else {
            this.btnToDisplay(el.innerText);
          }
        }

        if (el.classList.contains("btn-clear")) {
          this.clearDisplay();
        }

        if (el.classList.contains("btn-del")) {
          this.deleteChar();
        }

        if (el.classList.contains("btn-eq")) {
          this.calculate();
        }
      });
    },

    btnToDisplay(value) {
      this.display.value += value;
    },

    deleteChar() {
      this.display.value = this.display.value.slice(0, -1);
    },
  };
}

const calculadora = createCalculator();
calculadora.start();
