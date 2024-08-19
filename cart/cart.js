import { allBooks } from "../materials/books.js";

const cartPageContainer = document.getElementsByClassName("booksContainer")[0];
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
