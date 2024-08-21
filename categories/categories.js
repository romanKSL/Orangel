import { allBooks, bestsellersBooks, classicBooks } from "../materials/state.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Кошик <b>${localStorage.length}</b>`

const myUrl = new URL(location).searchParams.get("type"),
    container = document.getElementsByClassName("booksContainer")[0],
    pagesRectangles = document.getElementsByClassName("pagesRectangles")[0],
    pageTitle = document.getElementsByTagName("title")[0],
    containerTitle = document.getElementsByClassName("containerTitle")[0];

let currentBooksType;
switch (myUrl) {
    case "bestsellersBooks":
        currentBooksType = bestsellersBooks;
        containerTitle.innerText = "Бестселери";
        pageTitle.innerText = "Бестселери";
        break;
    case "classicBooks":
        currentBooksType = classicBooks;
        containerTitle.innerText = "Класика";
        pageTitle.innerText = "Класика";
        break;
    case "allBooks":
        currentBooksType = allBooks;
        containerTitle.innerText = "Всі книги";
        pageTitle.innerText = "Всі книги";
        break;
}

let pagesCount = Math.ceil(currentBooksType.length / 8);


booksRender(container, currentBooksType);
pagesPectanglesRender();
let rectangles = Array.from(document.getElementsByClassName("rectangle"));
rectanglesWork(currentBooksType);


function rectanglesWork(currentBooksType) {
    rectangles[0].className = "rectangle act";
    rectangles.forEach((item, index) => {
        item.addEventListener("click", () => {
            for (let i = 0; i < pagesCount; i++) {
                rectangles[i].classList.remove("act");
            }
            booksRender(container, currentBooksType, index);
            item.classList.add("act");
    })
})
}
function pagesPectanglesRender() {
    pagesRectangles.innerHTML = "";
    for (let i = 0; i < pagesCount; i++) {
        pagesRectangles.insertAdjacentHTML("beforeend", `
            <div class="rectangle"></div>
        `)
    }
}
function booksRender(element, booksArray, page = 0) {
    element.innerHTML = "";
    const minElement = page * 8;
    let maxElement = 0;
    if (page + 1 == pagesCount) {
        maxElement = minElement + booksArray.length % 8;
    } else {
        maxElement = minElement + 8;
    }
    for (let i = minElement; i < maxElement; i++) {
        element.insertAdjacentHTML("beforeend", `
            <div id="${booksArray[i].id}" class="book">
                <img class="bookCover" src=".${booksArray[i].cover}" alt="">
                <span class="bookName">${booksArray[i].name}</span>
                <span class="bookAuthor">${booksArray[i].author}</span>
                <div class="bookPriceBox">
                    <span class="bookPrice">$${booksArray[i].price}</span>
                </div>
            </div>
        `)
    }
    const book = Array.from(document.getElementsByClassName("book"));
    book.forEach((element) => {
        element.addEventListener("click", () => {
            location.href = `../bookPage/bookPage.html?id=${element.id}`;
        })
    })
}