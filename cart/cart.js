import { allBooks } from "../materials/state.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0],
booksCount = document.getElementsByClassName("booksCount")[0],
    cartPageContainer = document.getElementsByClassName("booksContainer")[0],
    confirmButton = document.getElementsByClassName("confirmButton")[0],
    clearButton = document.getElementsByClassName("clearButton")[0],
    totalCost = document.getElementsByClassName("totalCost")[0],
    nameInput = document.getElementsByClassName("nameInput")[0],
    phoneNumberInput = document.getElementsByClassName("phoneNumberInput")[0];


cartRender();


confirmButton.addEventListener("click", () => {
    if (localStorage.length == 0) {
        alert("Ваш кошик порожній!");
    }else if (nameInput.value == "" || phoneNumberInput.value == ""){
        alert("Будь ласка, заповніть Ваші данні");
    }else if (confirm("Ви дійсно бажаєте оформити замовлення?")) {
        alert(`Вітаємо ${nameInput.value}! Ви успішно оформили замовлення. Очікуйте дзвінка`);
        console.log(nameInput.value, phoneNumberInput.value);
        nameInput.value = "";
        phoneNumberInput.value = "";
    }
});
clearButton.addEventListener("click", () => {
    if (confirm("Ви дійсно бажаєте очистити кошик?")) {
        localStorage.clear();
        cartRender();
    }
});
function cartSumDisplay() {
    let sum = 0;
    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        sum += allBooks.find(element => element.id == key).price * localStorage.getItem(key);
    }
    totalCost.innerHTML = `Всього: <b>$${sum.toFixed(2)}</b>`;
}
function cartRender() {
    cartIcon.innerHTML = `Кошик <b>${localStorage.length}</b>`
    if (localStorage.length == 0) {
        booksCount.innerText = "Ваш кошик наразі порожній";
        clearButton.classList.add("hide");
    } else {
        booksCount.innerText = "";
        clearButton.classList.remove("hide");
    }
    cartPageContainer.innerHTML = "";
    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        const tempBook = allBooks.find(element => element.id == key);
        cartPageContainer.insertAdjacentHTML("beforeend", `
            <div class="book">
                <img id="${key}" class="bookCover" src=".${tempBook.cover}" alt="">
                <div class="bookInfo">
                    <div class="bookDetails">
                        <div class="bookNamePlusDelete">
                            <span class="bookName">${tempBook.name}</span>
                            <span id=${tempBook.id} class="delete">X</span>
                        </div>
                        <span class="bookAuthor">${tempBook.author}</span>
                    </div>
                    <div class="bookPrices">
                        <span class="bookPriceBox">$${tempBook.price}</span>
                        <div class="bookCostPlusCount">
                            <span class="bookCostBox">$${(tempBook.price * localStorage.getItem(key)).toFixed(2)}</span>
                            <span id=${tempBook.id} class="minus">-</span>
                            <span class="bookCount">${localStorage.getItem(key)}</span>
                            <span id=${tempBook.id} class="plus">+</span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
    const image = Array.from(document.getElementsByClassName("bookCover"));
    image.forEach((element) => {
        element.addEventListener("click", () => {
            location.href = `../bookPage/bookPage.html?id=${element.id}`;
        })
    })
    const pluses = Array.from(document.getElementsByClassName("plus"));
    pluses.forEach((element) => {
        element.addEventListener("click", () => {
            let currCount = localStorage.getItem(element.id);
            localStorage.setItem(element.id, ++currCount);
            cartRender();
        })
    })
    const minuses = Array.from(document.getElementsByClassName("minus"));
    minuses.forEach((element) => {
        element.addEventListener("click", () => {
            let currCount = localStorage.getItem(element.id);
            if (currCount == 1) {
                if (confirm(`Ви дійсно хочете видалити ${allBooks.find(element2 => element2.id == element.id).name} з Вашого кошика?`)) {
                    localStorage.removeItem(element.id);
                    cartRender();
                }
            } else {
                localStorage.setItem(element.id, --currCount);
                cartRender();
            }
        })
    })
    const deletes = Array.from(document.getElementsByClassName("delete"));
    deletes.forEach((element) => {
        element.addEventListener("click", () => {
            if (confirm(`Ви дійсно хочете видалити ${allBooks.find(element2 => element2.id == element.id).name} з Вашого кошика?`)) {
                localStorage.removeItem(element.id);
                cartRender();
            }
        })
    })

    cartSumDisplay();
}