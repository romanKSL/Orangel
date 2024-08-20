import { allBooks } from "../materials/books.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`

const title = document.getElementsByTagName("title")[0];

const myUrl = new URL(location).searchParams.get("id");
const container = document.getElementsByClassName("container")[0];
const bookId = allBooks.find((e) => e.id == myUrl);
title.innerText = `${bookId.name}`;
container.innerHTML = "";
container.insertAdjacentHTML("beforeend", `
    <div class="book">
        <img class="bookCover" src=".${bookId.cover}" alt="" class="cover">
        <div class="bookInfo">
            <div class="bookDetails">
                <h1 class="bookName">${bookId.name}</h1>
                <h2 class="bookAuthor">${bookId.author}</h2>
                <p class="bookDescription">${bookId.description}</p>
            </div>
            <div class="bookBuying">
                <div class="bookPriceBox">
                    <h3 class="bookPrice">$${bookId.price}</h3>
                </div>
                <div class="cartBox  ${localStorage.getItem(myUrl) == null ? "" : "act"}">
                    <span class="cartStatus">${localStorage.getItem(myUrl) == null ? "В корзину" : "В корзині"}</span>
                </div>
            </div>
        </div>
    </div>
`)
//${localStorage.getItem(myUrl) == null ? "В корзину" : "В корзині"}
const btn = document.getElementsByClassName("cartBox")[0];
const btn2 = document.getElementsByClassName("cartStatus")[0];
btn2.content = "aaaa";
btn.addEventListener("click", button => {
    if(button.target.innerText == "В корзину") {
        //console.log(button)
        button.target.className = "cartBox act"
        button.target.innerText = "В корзині";
        localStorage.setItem(myUrl, 1);
    }else if(confirm(`Ви дійсно хочете видалити ${bookId.name} з Вашої корзини?`)){
        button.target.innerText = "В корзину";
        button.target.className = "cartBox"
        localStorage.removeItem(myUrl);
    }
    cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`
})


