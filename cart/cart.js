import { allBooks } from "../materials/books.js";

const cartPageContainer = document.getElementsByClassName("cartPageContainer")[0];
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", () => {
    cartSumDisplay();
});

cartRender();

function cartRender() {
    cartPageContainer.innerHTML = "";
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        const tempBook = allBooks.find(element => element.id == key);
        cartPageContainer.insertAdjacentHTML("beforeend", `
            <div class="book">
                <img class="bookCover" src=".${tempBook.cover}" alt="" class="cover">
                <h2 class="bookName">${tempBook.name}</h2>
                <h4 class="bookAuthor">${tempBook.author}</h4>
                <h3 class="bookPrice">${tempBook.price} грн</h3>
                <span id=${tempBook.id} class="delete">DEL</span>
                <span id=${tempBook.id} class="minus">-</span>
                <h3 class="bookCount">${localStorage.getItem(key)}</h3>
                <span id=${tempBook.id} class="plus">+</span>
            </div>
        `)
    }
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
            }
        })
    })
}
function cartSumDisplay() {
    let sum = 0;
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        sum += allBooks.find(element => element.id == key).price * localStorage.getItem(key);
    }
    console.log(sum);
}
