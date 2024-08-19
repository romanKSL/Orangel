import { bestsellers, classicBooks } from "../materials/books.js";


const bestsellersBooks = document.getElementsByClassName("bestsellersBooks")[0],
classiccBooks = document.getElementsByClassName("classicBooks")[0];
//pages = document.getElementsByClassName("pagesSpans")[0];
//let pagesCount = Math.floor(books.length / 4);
let pagesCount = 2;

//function pagesSpansRender(pagesCount) {
//    pages.innerHTML = "";
//    for(let i = 0; i < pagesCount; i++) {
//        pages.insertAdjacentHTML("beforeend", `
//            <span class="new">${i + 1}</span>
//        `)
//    }
//}
booksRender(bestsellersBooks, bestsellers);
booksRender(classiccBooks, classicBooks);
//pagesSpansRender(pagesCount);

let newSpan = Array.from(document.getElementsByClassName("new"));
newSpan.forEach((item, i) => {
    item.addEventListener("click", () => {
        console.log(i);
        booksRender(bestsellersBooks, bestsellers, i)
    })
})
function booksRender(element, booksArray, page = 0) {
    element.innerHTML = "";
    const minElement = page * 4;
    const maxElement = minElement + 4;
    for(let i = minElement; i < maxElement; i++) {
        element.insertAdjacentHTML("beforeend", `
            <div id="${booksArray[i].id}" class="book">
                <img class="bookCover" src="${booksArray[i].cover}" alt="" class="cover">
                <h2 class="bookName">${booksArray[i].name}</h2>
                <h4 class="bookAuthor">${booksArray[i].author}</h4>
                <h3 class="bookPrice">$${booksArray[i].price}</h3>
            </div>
        `)
    }
    const book = Array.from(document.getElementsByClassName("book"));
    book.forEach((e, i) => {
        e.addEventListener("click", () => {
            location.href = `./bookPage/bookPage.html?id=${e.id}`;
        })
    })
}
//const cartIcon = document.getElementsByClassName("cart")[0];
//cartIcon.addEventListener("click", () => {
//    location.href = "http://127.0.0.1:5500/Orangel2.0/cart.html";
//})

//const cat = document.getElementsByClassName("categories")[0];
//cat.addEventListener("click", e => {
//    location.href = `http://127.0.0.1:5500/Orangel2.0/categories.html?type=${e.target.id}`;
//    console.log(e.target.id);
//})