"use strict";

//Selecting Objects

//Navigations
const welcomeMessage = document.querySelector(".leftnav");
const loanSection = document.querySelector(".loan");
const inputUsername = document.querySelector(".input-login-username");
const inputLoginpin = document.querySelector(".input-login-pin");
const loginbtn = document.querySelector(".login-btn");

//Main balance section
const balanceSection = document.querySelector(".balance-section");
const balanceAmount = document.querySelector(".balance");
const balanceDate = document.querySelector(".date-time");

//Movements section
const containermovements = document.querySelector(".movements");
const movementtype = document.querySelector(".movement-type");

//Transfer section
const transferSection = document.querySelector(".transfer--money ");
const inputTransferUserName = document.getElementById("transfer--to");
const inputTransferAmount = document.getElementById("amount");
const transferButton = document.querySelector(".transfer-btn");

//Account closed modal
const disclaimerModal = document.querySelector(".modal");
const disclaimerModalCut = document.querySelector(".cross");

//Account doesn't exist modal
const disclaimerModal2 = document.querySelector(".modal2");
const disclaimerModalCut2 = document.querySelector(".cross2");

//Account close section
const closeSection = document.querySelector(".close--account");
const closeAccountUser = document.getElementById("user");
const closeAccountUserPin = document.getElementById("pin");
const closeAccountButton = document.querySelector(".close--btn");

//Request loan section
const requestLoanAmount = document.getElementById("amount2");
const requestLoanButton = document.querySelector(".loan-btn");

//Summary section
const calculation = document.querySelector(".calculation");
const totalDepositAmount = document.querySelector(".total--deposited");
const totalWithdrawAmount = document.querySelector(".total--withdrew");
const totalInterestAmount = document.querySelector(".total--Interest");
const sorting = document.querySelector(".sort");
const sortingArrow = document.querySelector(".sortingArrow");
const timersection = document.querySelector(".timer");
const countdown = document.querySelector(".countdown");

//Doing Working codes

const account1 = {
  owner: "Ankit Kashyap",
  movements: [200, -400, 900, 1000, 400, -300],
  pin: 1111,
  interestrate: 1.2,
  dates: [
    `20/02/2023`,
    `21/03/2023`,
    `22/04/2023`,
    `23/05/2023`,
    `24/06/2023`,
    `25/07/2023`,
  ],
};

const account2 = {
  owner: "Rajnish Kumar",
  movements: [-200, -900, 900, 1000, 400, -400],
  pin: 2222,
  interestrate: 1.8,
  dates: [
    `11/02/2023`,
    `12/03/2023`,
    `18/04/2023`,
    `19/05/2023`,
    `20/06/2023`,
    `21/07/2023`,
  ],
};

const account3 = {
  owner: "Sumit Kashyap",
  movements: [500, -900, 900, -1000, 400, 400],
  pin: 3333,
  interestrate: 2.0,
  dates: [
    `22/02/2023`,
    `27/03/2023`,
    `29/04/2023`,
    `30/05/2023`,
    `01/06/2023`,
    `08/07/2023`,
  ],
};

const account4 = {
  owner: "Amit Jha",
  movements: [1500, -30, 1900, -100, 4200, 4000],
  pin: 4444,
  interestrate: 2.3,
  dates: [
    `09/02/2023`,
    `10/03/2023`,
    `17/04/2023`,
    `16/05/2023`,
    `19/06/2023`,
    `31/07/2023`,
  ],
};

const accounts = [account1, account2, account3, account4];

//0.Timer countdown function

//Setting the time and timer varibale outside the function so that it can be further used

let time, timer;
const countdownTimer = function () {
  //Creating a function whuch will be excuted after every second in the setinterval function

  const tick = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    countdown.textContent = `${minute}:${second} `;

    if (time === 0) {
      balanceSection.style.opacity = "0";
      containermovements.style.opacity = "0";
      transferSection.style.opacity = "0";
      closeSection.style.opacity = "0";
      loanSection.style.opacity = "0";
      calculation.style.opacity = "0";
      sorting.style.opacity = "0";
      timersection.style.opacity = "0";
      welcomeMessage.textContent = `Let's Get Started`;
      // After the time becomes zero then clearing the timer
      clearInterval(timer);
    }

    time--;
  };

  time = 600;

  //calling the function so that it will be excuted just after calling the countdowntimer
  tick();
  const timer = setInterval(tick, 1000);

  //Returimg timer so that it can be further used and this timer is equal to the setinterval
  return timer;
};

//1.Computing Username

const genrateUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .join("");
  });
};

genrateUsername(accounts);

//2.Displaying the movements of any account

const displayMovements = function (account, sort = false) {
  //here setted the sort as 2nd paramneter so if it is true then it creates a shallow copy of original movement and then sorting occurs and if false then movs will be original movement
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  //setting the current sorted situation to opposite of it so if clciked again then opposite happens

  sorted = !sorted;
  containermovements.innerHTML = "";

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdraw";

    const html = `
    <div class="movements-box">
    <div class="movement-type--${type}"> ${i + 1} ${type}</div>
    <div class="movement-date">${account.dates[i]}</div>
    <div class="movement-amount">₹${mov}</div>
  </div>
    `;

    containermovements.insertAdjacentHTML("afterbegin", html);
  });
};

//3.Updating the dates of movements

const updateDate = function () {
  const currentTime = new Date();
  const locale = navigator.language;
  const dateToAdd = new Intl.DateTimeFormat(locale).format(currentTime);
  currentAccount.dates.push(dateToAdd);
};

//4.Updating the UI--balance,total deposit, total withdraw & interest

const updateUi = function (acc) {
  balanceAmount.innerHTML = "";

  const balance = acc.movements.reduce(function (ac, currentele) {
    return ac + currentele;
  }, 0);

  acc.balance = balance;

  balanceAmount.textContent = `₹${acc.balance}`;

  //Displaying the summary of deposit, withdraw and interest

  //calculating the deposit

  const totalDeposit = acc.movements
    .filter((movs) => movs > 0)
    .reduce((acc, amt) => acc + amt, 0);

  totalDepositAmount.textContent = `₹${totalDeposit}`;

  //calculating the withdraw

  const totalwithdraw = acc.movements
    .filter((movs) => movs < 0)
    .reduce((acc, amt) => acc + amt, 0);

  totalWithdrawAmount.textContent = `₹${Math.abs(totalwithdraw)}`;

  //Calculating total interest

  const totalInterest = (acc.balance * acc.interestrate) / 100;

  totalInterestAmount.textContent = `₹${Math.trunc(totalInterest)}`;
};

//5.Account closed Modal window cutting feature

disclaimerModalCut.addEventListener("click", function () {
  disclaimerModal.classList.add("hidden");
  disclaimerModalCut.classList.add("hidden");
});

//6.Account doesn't exist Modal window cutting feature

disclaimerModalCut2.addEventListener("click", function () {
  disclaimerModal2.classList.add("hidden");
  disclaimerModalCut2.classList.add("hidden");
});

//7.Login Feature

let currentAccount;

loginbtn.addEventListener("click", function (e) {
  //Prevent from submitting

  e.preventDefault();

  //Finding the current account

  currentAccount = accounts.find((acc) => acc.userName === inputUsername.value);

  if (currentAccount && currentAccount.pin === Number(inputLoginpin.value)) {
    //Displaying the welcome message

    welcomeMessage.textContent = `Welcome Back ${currentAccount.owner}`;

    //Displaying the current date & time

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      month: "long",
      year: "numeric",
      day: "2-digit",
    };

    const locale = navigator.language;

    balanceDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );

    setInterval(function () {
      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        month: "long",
        year: "numeric",
        day: "2-digit",
      };

      const locale = navigator.language;

      balanceDate.textContent = new Intl.DateTimeFormat(locale, options).format(
        now
      );
    }, 60000);

    //After login , its detail disappear

    inputUsername.value = inputLoginpin.value = "";

    //After login, pipping of cursor dont appear

    inputLoginpin.blur();

    //Setting the opacity of the all page to 100 so that it appears on screen

    balanceSection.style.opacity = "100";
    containermovements.style.opacity = "100";
    transferSection.style.opacity = "100";
    closeSection.style.opacity = "100";
    loanSection.style.opacity = "100";
    calculation.style.opacity = "100";
    sorting.style.opacity = "100";
    timersection.style.opacity = "100";

    //Display the different movements of different account

    displayMovements(currentAccount);

    //updating the balance

    updateUi(currentAccount);

    //clearing the existing timer if exist bcz if we login in different accounts simanteosuly then 2 timers runs at same time

    if (timer) clearInterval(timer);

    //Setting the timer to the main countdowntimer function
    timer = countdownTimer();
  } else {
    //Account not exist information page

    disclaimerModal2.classList.remove("hidden");
    disclaimerModalCut2.classList.remove("hidden");

    //Setting the opacity of the all page to 0 so that it disappears on screen
    balanceSection.style.opacity = "0";
    containermovements.style.opacity = "0";
    transferSection.style.opacity = "0";
    closeSection.style.opacity = "0";
    loanSection.style.opacity = "0";
    calculation.style.opacity = "0";
    sorting.style.opacity = "0";
    timersection.style.opacity = "0";
    inputUsername.value = inputLoginpin.value = "";

    //After login, pipping of cursor dont appear

    inputLoginpin.blur();
  }
});

//8.Transfer Money

let accountToTransfer;

transferButton.addEventListener("click", function () {
  //Finding the account in which money is to be transffered
  accountToTransfer = accounts.find(
    (acc) => acc.userName === inputTransferUserName.value
  );

  const amountToTransfer = Number(inputTransferAmount.value);

  if (
    amountToTransfer > 0 &&
    accountToTransfer &&
    currentAccount.balance >= amountToTransfer &&
    accountToTransfer?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amountToTransfer);

    accountToTransfer.movements.push(amountToTransfer);

    const currentTime = new Date();
    const locale = navigator.language;
    const dateToAdd = new Intl.DateTimeFormat(locale).format(currentTime);
    currentAccount.dates.push(dateToAdd);
    accountToTransfer.dates.push(dateToAdd);

    //Updating the dates of movements

    displayMovements(currentAccount);

    //updating the balance

    updateUi(currentAccount);

    //Clearing the existing the timer so that if can event occur then timer get resetted
    if (timer) clearInterval(timer);
    timer = countdownTimer();
  }

  //After clicking the transfer button thren input fields focus and content should be null
  inputTransferUserName.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();
});

//9.Request Loan

requestLoanButton.addEventListener("click", function () {
  const amount = Number(requestLoanAmount.value);

  //If amount is greater than zero and is less or equal to 10 times of balance then only loan will be granted
  if (amount > 0 && amount <= 10 * currentAccount.balance) {
    currentAccount.movements.push(amount);

    updateDate();

    displayMovements(currentAccount);

    //updating the balance

    updateUi(currentAccount);

    //Clearing the existing the timer so that if can event occur then timer get resetted
    if (timer) clearInterval(timer);
    timer = countdownTimer();
  }

  //After clicking the loan button thren input fields focus and content should be null
  requestLoanAmount.value = "";

  requestLoanAmount.blur();
});

//10.Close Account

closeAccountButton.addEventListener("click", function () {
  //Finding the account to closed

  const accountToClose = accounts.find(
    (acc) => acc.userName === closeAccountUser.value
  );

  //Finding the position of the account to be closed in the main accounts array
  const accountposition = accounts.indexOf(accountToClose);
  if (
    accountToClose &&
    accountToClose?.pin === Number(closeAccountUserPin.value)
  ) {
    //Editing the main accounst array by removing the element of that position on which the account to close is placed
    accounts.splice(accountposition, 1);

    //Then Also setting the opacity to 0 so that everything gets disapppeared
    balanceSection.style.opacity = "0";
    containermovements.style.opacity = "0";
    transferSection.style.opacity = "0";
    closeSection.style.opacity = "0";
    loanSection.style.opacity = "0";
    calculation.style.opacity = "0";
    sorting.style.opacity = "0";
    timersection.style.opacity = "0";
  }

  closeAccountUser.value = closeAccountUserPin.value = "";

  closeAccountUserPin.blur();

  //Showing the banner that account has been closed now

  disclaimerModal.classList.remove("hidden");
  disclaimerModalCut.classList.remove("hidden");

  welcomeMessage.textContent = `Log in to get started`;
});

//11.Sorting Feature

//Setted default sorting to false

let sorted = false;

//if sort button clicked thenn displaymovements occurs and sort parameter will be opposite to current sorted situation

sortingArrow.addEventListener("click", function () {
  displayMovements(currentAccount, !sorted);
});
