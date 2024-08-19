import { bestsellers, classicBooks } from "../materials/books.js";


const bestsellersBooks = document.getElementsByClassName("bestsellersBooks")[0],
classiccBooks = document.getElementsByClassName("classicBooks")[0];
//pages = document.getElementsByClassName("pagesSpans")[0];
//let pagesCount = Math.floor(books.length / 4);
//let pagesCount = 2;
let bestBooksRectangles = [];
bestBooksRectangles.push(document.getElementById("bestRight"), document.getElementById("bestLeft"));
let arrow = Array.from(document.getElementsByClassName("arrow"));
let classicBooksRectangles = [];
classicBooksRectangles.push(document.getElementById("classicRight"), document.getElementById("classicLeft"));
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
rectanglesWork(bestBooksRectangles, bestsellersBooks, bestsellers)
rectanglesWork(classicBooksRectangles, classiccBooks, classicBooks)
function rectanglesWork(rectangles, divType, booksType) {
    rectangles.forEach((item, i) => {
        //console.log(item, i)
        item.addEventListener("click", (element) => {
            //console.log();
            for(let i=0; i<2; i++) {
                rectangles[i].className = "rectangle";
            }
            //rectangle.forEach(item, () => {
            //    item.className = "rectangle";
            //})
            booksRender(divType, booksType, i)
            item.className = "rectangle act";
        })
    })
}

//arrow.forEach((item, i) => {
//    console.log(item, i)
//    item.addEventListener("click", (element) => {
//        console.log();
//        for(let i=0; i<2; i++) {
//            rectangles[i].className = "rectangle";
//        }
//        //rectangle.forEach(item, () => {
//        //    item.className = "rectangle";
//        //})
//        booksRender(bestsellersBooks, bestsellers, i)
//        item.className = "rectangle act";
//    })
//})

//for(let i=0; i<2; i++) {
//    rectangle[i].addEventListener("click", () => {
//        console.log(element);
//        rectangle[i].className = "rectangle act";
//        rectangle[i].className = "rectangle act";
//        booksRender(bestsellersBooks, bestsellers, i)
//    })
//}

//rectangle[0].addEventListener("click", () => {
//    //console.log(rectangle[0]);
//    rectangle[0].className = "rectangle act";
//    rectangle[1].className = "rectangle";
//    booksRender(bestsellersBooks, bestsellers, 0)
//})
//rectangle[1].addEventListener("click", () => {
//    //console.log(rectangle[1]);
//    //console.log(rectangle[0]);
//    rectangle[1].className = "rectangle act";
//    rectangle[0].className = "rectangle";
//    booksRender(bestsellersBooks, bestsellers, 1)
//})
function booksRender(element, booksArray, page = 0) {
    
    element.innerHTML = "";
    const minElement = page * 4;
    const maxElement = minElement + 4;
    for(let i = minElement; i < maxElement; i++) {
        element.insertAdjacentHTML("beforeend", `
            <div id="${booksArray[i].id}" class="book">
                <img class="bookCover" src="${booksArray[i].cover}" alt="" class="cover">
                <h3 class="bookName">${booksArray[i].name}</h3>
                <h4 class="bookAuthor">${booksArray[i].author}</h4>
                <div class="bookPriceBox">
                    <h3 class="bookPrice">$${booksArray[i].price}</h3>
                </div>
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