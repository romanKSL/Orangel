import { allBooks } from "../materials/state.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Кошик <b>${localStorage.length}</b>`

const title = document.getElementsByTagName("title")[0],
    myUrl = new URL(location).searchParams.get("id"),
    container = document.getElementsByClassName("bookContainer")[0];

const currentBook = allBooks.find((element) => element.id == myUrl);

title.innerText = `${currentBook.name}`;

container.innerHTML = "";
container.insertAdjacentHTML("beforeend", `
    <div class="book">
        <img class="bookCover" src=".${currentBook.cover}" alt="">
        <div class="bookInfo">
            <div class="bookDetails">
                <span class="bookName">${currentBook.name}</span>
                <span class="bookAuthor">${currentBook.author}</span>
                <p class="bookDescription">${currentBook.description}</p>
            </div>
            <div class="bookBuying">
                <div class="bookPriceBox">
                    <span class="bookPrice">$${currentBook.price}</span>
                </div>
                <div class="cartBox  ${localStorage.getItem(myUrl) == null ? "" : "act"}">
                    <span class="cartStatus">${localStorage.getItem(myUrl) == null ? "В кошик" : "В кошику"}</span>
                </div>
            </div>
        </div>
    </div>
`)

const cartButton = document.getElementsByClassName("cartBox")[0];
cartButton.addEventListener("click", (button) => {
    if (button.target.innerText == "В кошик") {
        button.target.classList = "cartBox act"
        button.target.innerText = "В кошику";
        localStorage.setItem(myUrl, 1);
    } else if (confirm(`Ви дійсно хочете видалити ${currentBook.name} з Вашого кошика?`)) {
        button.target.innerText = "В кошик";
        button.target.className = "cartBox"
        localStorage.removeItem(myUrl);
    }
    cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`
})