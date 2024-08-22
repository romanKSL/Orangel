import { allBooks, bestsellersBooks, classicBooks } from "../materials/state.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Кошик <b>${localStorage.length}</b>`

const myUrl = new URL(location).searchParams.get("type"),
    container = document.getElementsByClassName("booksContainer")[0],
    pagesRectangles = document.getElementsByClassName("pagesRectangles")[0],
    pageTitle = document.getElementsByTagName("title")[0],
    containerTitle = document.getElementsByClassName("containerTitle")[0],
    search = document.getElementById("search");

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


booksRender(currentBooksType, pagesCount);
pagesPectanglesRender(pagesCount);
let rectangles = Array.from(document.getElementsByClassName("rectangle"));
rectanglesWork(currentBooksType, pagesCount);


search.addEventListener("input", () => {
    let tempArray = [],
    tempValue = search.value.toLowerCase();
    if (search.value != "") {
        allBooks.forEach((element) => {
            if (element.name.toLowerCase().includes(tempValue) || element.author.toLowerCase().includes(tempValue)) {
                tempArray.push(element);
            }
        })
        if (tempArray.length != 0) {
            let tempPagesCount = Math.ceil(tempArray.length / 8);
            booksRender(tempArray, tempPagesCount);
            pagesPectanglesRender(tempPagesCount);
            rectangles = Array.from(document.getElementsByClassName("rectangle"));
            rectanglesWork(tempArray, tempPagesCount);
        } else {
            container.innerHTML = "";
            pagesRectangles.innerHTML = "";
        }
    } else {
        booksRender(currentBooksType, pagesCount);
        pagesPectanglesRender(pagesCount);
        rectangles = Array.from(document.getElementsByClassName("rectangle"));
        rectanglesWork(currentBooksType, pagesCount);
    }
})

function rectanglesWork(currentBooksType, pagesCount) {
    rectangles[0].className = "rectangle act";
    rectangles.forEach((item, index) => {
        item.addEventListener("click", () => {
            for (let i = 0; i < pagesCount; i++) {
                rectangles[i].classList.remove("act");
            }
            booksRender(currentBooksType, pagesCount, index);
            item.classList.add("act");
        })
    })
}
function pagesPectanglesRender(pagesCount) {
    pagesRectangles.innerHTML = "";
    for (let i = 0; i < pagesCount; i++) {
        pagesRectangles.insertAdjacentHTML("beforeend", `
            <div class="rectangle"></div>
        `)
    }
}
function booksRender(booksArray, pagesCount, page = 0) {
    container.innerHTML = "";
    const minElement = page * 8;
    let maxElement = 0;
    if (page + 1 == pagesCount && booksArray.length % 8 != 0) {
        maxElement = minElement + booksArray.length % 8;
    } else {
        maxElement = minElement + 8;
    }
    for (let i = minElement; i < maxElement; i++) {
        container.insertAdjacentHTML("beforeend", `
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
            search.value = "";
            location.href = `../bookPage/bookPage.html?id=${element.id}`;
        })
    })
}