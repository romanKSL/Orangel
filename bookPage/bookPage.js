import { allBooks } from "../materials/books.js";

const myUrl = new URL(location).searchParams.get("id");
const bookPageContainer = document.getElementById("bookPageContainer");
const bookId = allBooks.find((e) => e.id == myUrl);
bookPageContainer.innerHTML = "";
bookPageContainer.insertAdjacentHTML("beforeend", `
    <div class="book">
        <img class="bookCover" src=".${bookId.cover}" alt="" class="cover">
        <h2 class="bookName">${bookId.name}</h2>
        <h4 class="bookAuthor">${bookId.author}</h4>
        <p>${bookId.description}</p>
        <h3 class="bookPrice">${bookId.price} грн</h3>
        <button id="cartStatus">${localStorage.getItem(myUrl) == null ? "To cart" : "In cart"}</button>
    </div>
`)
const btn = document.getElementById("cartStatus");
btn.addEventListener("click", button => {
    if(button.target.innerText == "To cart") {
        button.target.innerText = "In cart";
        localStorage.setItem(myUrl, 1);
    }else {
        button.target.innerText = "To cart";
        localStorage.removeItem(myUrl);
    }
})


