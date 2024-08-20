import { allBooks } from "../materials/books.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`

const cartPageContainer = document.getElementsByClassName("booksContainer")[0];
const confirmButton = document.getElementsByClassName("confirmButton")[0];
const totalCost = document.getElementsByClassName("totalCost")[0];
const nameInput = document.getElementsByClassName("nameInput")[0],
phoneNumberInput = document.getElementsByClassName("phoneNumberInput")[0];
confirmButton.addEventListener("click", () => {
    if(confirm("Ви дійсно бажаєте оформити замовлення?")) {
        alert(`Ви успішно оформили замовлення на ${nameInput.value}. Очікуйте дзвінка`)
    }
});
//const form = document.getElementsByClassName("orderContainer")[0];
//form.addEventListener('submit', function(event) {
//    event.preventDefault(); // Зупиняємо стандартну поведінку форми
//    console.log('Форма була надіслана');
//})

cartRender();
function cartRender() {
    cartPageContainer.innerHTML = "";
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        const tempBook = allBooks.find(element => element.id == key);
        cartPageContainer.insertAdjacentHTML("beforeend", `
            <div class="book">
                <img id="${key}" class="bookCover" src=".${tempBook.cover}" alt="" class="cover">
                <div class="bookInfo">
                    <div class="bookDetails">
                        <div class="bookNamePlusDelete">
                            <h2 class="bookName">${tempBook.name}</h2>
                           <span id=${tempBook.id} class="delete">X</span>
                        </div>
                        <h3 class="bookAuthor">${tempBook.author}</h3>
                    </div>
                    <div class="bookPrices">
                        <h3 class="bookPriceBox">$${tempBook.price}</h3>
                        <div class="bookCostPlusCount">
                            <h3 class="bookCostBox">$${tempBook.price * localStorage.getItem(key)}</h3>
                            <span id=${tempBook.id} class="minus">-</span>
                            <h3 class="bookCount">${localStorage.getItem(key)}</h3>
                            <span id=${tempBook.id} class="plus">+</span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
    const image = Array.from(document.getElementsByClassName("bookCover"));
    image.forEach((e, i) => {
        e.addEventListener("click", () => {
            location.href = `../bookPage/bookPage.html?id=${e.id}`;
        })
    })
    const pluses = Array.from(document.getElementsByClassName("plus"));
    const minuses = Array.from(document.getElementsByClassName("minus"));
    const deletes = Array.from(document.getElementsByClassName("delete"));
    pluses.forEach((element) => {
        element.addEventListener("click", () => {
            let currCount = localStorage.getItem(element.id);
            localStorage.setItem(element.id, ++currCount);
            cartRender();
        })
    })
    minuses.forEach((element) => {
        element.addEventListener("click", () => {
            let currCount = localStorage.getItem(element.id);
            if(currCount == 1) {
                if(confirm(`Are you sure to delete ${allBooks.find(element2 => element2.id == element.id).name}?`)) {
                    localStorage.removeItem(element.id);
                    cartRender();
                    cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`
                }
            }else {
                localStorage.setItem(element.id, --currCount);
                cartRender();
            }
        })
    })
    deletes.forEach((element) => {
        element.addEventListener("click", () => {
            if(confirm(`Are you sure to delete ${allBooks.find(element2 => element2.id == element.id).name}?`)) {
                localStorage.removeItem(element.id);
                cartRender();
                cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`
            }
        })
    })
    cartSumDisplay();
}
function cartSumDisplay() {
    let sum = 0;
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        sum += allBooks.find(element => element.id == key).price * localStorage.getItem(key);
    }
    totalCost.innerHTML = `Всього: <b>$${sum}</b>`;
}
