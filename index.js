const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-05-27T17:01:17.194Z",
      "2021-05-01T23:36:17.929Z",
      "2021-05-02T10:51:36.790Z"
    ],
    currency: "EUR",
    locale: "pt-PT" // de-DE
  };
  
  const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z"
    ],
    currency: "USD",
    locale: "en-US"
  };
  
  const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z"
    ],
    currency: "USD",
    locale: "en-US"
  };
  
  const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z"
    ],
    currency: "USD",
    locale: "en-US"
  };
  
  const accounts = [account1, account2, account3, account4];
  
  // Computing username
  const createUserNames = function (accs) {
    accs.forEach((acc) => {
      acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
    });
  };
  createUserNames(accounts);
  
  // log in
  
  const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);
    // Display Balance
    addingValue(acc);
  };
  
  const welcome = document.querySelector(".welcome");
  const logInUser = document.querySelector(".input-user");
  const logInPin = document.querySelector(".input-Pin");
  const logInBtn = document.querySelector(".login-btn");
  const mainContent = document.querySelector(".main-content");
  
  let currentAccount;
  logInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentAccount = accounts.find((acc) => acc.username === logInUser.value);
  
    if (currentAccount?.pin === Number(logInPin.value)) {
      // Display UI and Message
      welcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
      mainContent.style.opacity = 100;
  
      updateUI(currentAccount);
      // clearing inputs
      logInPin.value = logInUser.value = "";
      logInUser.blur();
  
      // setting the current date
      
      const currDate = document.querySelector(".currDate");
      currDate.innerHTML = ''
      const date = new Date();
      const day = `${date.getDate()}`.padStart(2, 0);
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const hour = `${date.getHours()}`.padStart(2, 0);
      const min = `${date.getMinutes()}`.padStart(2, 0);
  
      currDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    }
  });
  
  // setting current date
  
  const movementsDate = document.querySelectorAll(".movements-date");
  
  // Adding the total value
  const totalValue = document.querySelector(".total-value");
  const balance = document.querySelector(".balance");
  const totalAmount = document.querySelector(".total-amount");
  
  // way- 1
  
  // const addingValue = function(movements){
  //   totalAmount.textContent = ''
  //     const value = movements.reduce((acc, curr) =>
  //       acc + curr, 0)
  
  //     const html = `
  //     <div class="total-amount">
  //     <p class="total-value">${value}$</p>
  //   </div>`
  
  //   totalAmount.insertAdjacentHTML('beforeend', html)
  
  // }
  // addingValue(account1.movements)
  //  OR
  
  // way-2
  
  const addingValue = function (acc) {
    acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
    totalValue.textContent = `${acc.balance.toFixed(2)}$`;
  };
  
  // transaction history
  const allMovements = document.querySelector(".bottom-left");
  const displayMovements = function (acc) {
  
    allMovements.innerHTML = "";
    acc.movements.forEach((mov, i) => {
      const type = mov > 0 ? "deposit" : "withdraw";
  
      const date = new Date(acc.movementsDates[i]);
      const day = `${date.getDate()}`.padStart(2, 0);
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const displayDate = `${day}/${month}/${year}`
      const html = ` <div class="movements-row">
          <div class="movements-type movements-type-${type}">${i + 1} ${type}</div>
          <div class="movements-date">${displayDate}</div>
          <div class="movements-money">${mov.toFixed(2)}</div>
      </div>
      `;
  
      allMovements.insertAdjacentHTML("afterbegin", html);
    });
  };
  
  // transfer money
  let transferAccount;
  const formInputTo = document.querySelector(".form-input-to");
  const formInputAmount = document.querySelector(".form-input-amount");
  const btnTransfer = document.querySelector(".form-btn-transfer");
  btnTransfer.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = Math.floor(formInputAmount.value);
    transferAccount = accounts.find((acc) => acc.username === formInputTo.value);
    if (
      amount > 0 &&
      transferAccount &&
      transferAccount.username !== currentAccount.username &&
      currentAccount.balance >= amount
    ) {
      currentAccount.movements.push(-amount);
      transferAccount.movements.push(amount);
      // update UI
      updateUI(currentAccount);
      // setting date
      
  
      currentAccount.movementsDates.push(new Date().toISOString());
      transferAccount.movementsDates.push(new Date().toISOString());
  
  
    }
  
    formInputAmount.value = formInputTo.value = "";
    formInputTo.blur();
  });
  
  // closing Account
  const confirmUser = document.querySelector(".confirm-user");
  const confirmPin = document.querySelector(".confirm-pin");
  const btnClose = document.querySelector(".btn-close");
  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      currentAccount.username === confirmUser.value &&
      currentAccount.pin === Number(confirmPin.value)
    ) {
      const index = accounts.findIndex(
        (acc) => acc.username === currentAccount.username
      );
  
      accounts.splice(index, 1);
  
      // Hiding  UI and Message
      welcome.textContent = "Log in to get Started";
      mainContent.style.opacity = 0;
    }
    confirmUser.value = confirmPin.value = "";
    confirmPin.blur();
  });
  
  // taking Loan
  const loanAmount = document.querySelector(".loan-amount");
  const btnLoan = document.querySelector(".btn-loan");
  btnLoan.addEventListener("click", (e) => {
    e.preventDefault();
    const loanValue = Math.floor(loanAmount.value);
    if (
      loanValue > 0 &&
      currentAccount.movements.some((mov) => (mov = loanValue * 0.1))
    ) {
      currentAccount.movements.push(loanValue);
  
      // Update UI
      updateUI(currentAccount);
      // setting date 
      currentAccount.movementsDates.push(new Date().toISOString());
  
  
      loanAmount.value = "";
      loanAmount.blur();
    }
  });
  