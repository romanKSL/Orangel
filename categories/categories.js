import { allBooks, bestsellersBooks, classicBooks } from "../materials/books.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`

const myUrl = new URL(location).searchParams.get("type");
console.log(myUrl);

const container = document.getElementsByClassName("bookContainer")[0];
const pages = document.getElementsByClassName("pagesRectangles")[0],
pageTitle = document.getElementsByTagName("title")[0],
containerTitle = document.getElementsByClassName("containerTitle")[0];
let currentType;
if(myUrl == "bestsellers") {
    currentType = bestsellersBooks;
    containerTitle.innerText = "Бестселери";
    pageTitle.innerText = "Бестселери";
}else if(myUrl == "classicBooks") {
    currentType = classicBooks;
    containerTitle.innerText = "Класика";
    pageTitle.innerText = "Класика";
}else {
    currentType = allBooks;
    containerTitle.innerText = "Всі книги";
    pageTitle.innerText = "Всі книги";
}
let pagesCount = Math.ceil(currentType.length / 8);
function pagesSpansRender(pagesCount) {
    pages.innerHTML = "";
    for(let i = 0; i < pagesCount; i++) {
        pages.insertAdjacentHTML("beforeend", `
            <div class="rectangle"></div>
        `)
    }
}
pagesSpansRender(pagesCount);

booksRender(container, currentType);
    
let rectangles = Array.from(document.getElementsByClassName("rectangle"));
rectangles[0].className = "rectangle act";
rectangles.forEach((item, i) => {
    //item.addEventListener("click", () => {
    //    //console.log(i);
    //    booksRender(container, currentType, i)
    //})
    console.log(item, i)
    item.addEventListener("click", (element) => {
        for(let i=0; i<pagesCount; i++) {
            rectangles[i].className = "rectangle";
        }
        //rectangle.forEach(item, () => {
        //    item.className = "rectangle";
        //})
        booksRender(container, currentType, i);
        item.className = "rectangle act";
    })
})
function booksRender(element, booksArray, page = 0) {
    element.innerHTML = "";
    const minElement = page * 8;
    let maxElement = 0;
    if(page+1 == pagesCount) {
        maxElement = minElement + currentType.length % 8;
    }else {
        maxElement = minElement + 8;
    }
    //console.log(maxElement);
    for(let i = minElement; i < maxElement; i++) {
        element.insertAdjacentHTML("beforeend", `
            <div id="${booksArray[i].id}" class="book">
                <img class="bookCover" src=".${booksArray[i].cover}" alt="" class="cover">
                <h3 class="bookName">${booksArray[i].name}</h3>
                <h4 class="bookAuthor">${booksArray[i].author}</h4>
                <div class="bookPriceBox">
                    <span class="bookPrice">$${booksArray[i].price}</span>
                </div>
            </div>
        `)
    }
    const book = Array.from(document.getElementsByClassName("book"));
    book.forEach((e, i) => {
        e.addEventListener("click", () => {
            location.href = `../bookPage/bookPage.html?id=${e.id}`;
        })
    })
}

//if(myUrl == "bestsellers") {
//    let pagesCount = Math.ceil(bestsellers.length / 8);
//    console.log(pagesCount);
//    function pagesSpansRender(pagesCount) {
//        pages.innerHTML = "";
//        for(let i = 0; i < pagesCount; i++) {
//            pages.insertAdjacentHTML("beforeend", `
//                <span class="new">${i + 1}</span>
//            `)
//        }
//    }
//    pagesSpansRender(pagesCount);
//    booksRender(container, bestsellers);
    
//    let newSpan = Array.from(document.getElementsByClassName("new"));
//    newSpan.forEach((item, i) => {
//        item.addEventListener("click", () => {
//            console.log(i);
//            booksRender(container, bestsellers, i)
//        })
//    })
//    function booksRender(element, booksArray, page = 0) {
//        element.innerHTML = "";
//        const minElement = page * 8;
//        const maxElement = minElement + 8;
//        for(let i = minElement; i < maxElement; i++) {
//            element.insertAdjacentHTML("beforeend", `
//                <div id="${booksArray[i].id}" class="book">
//                    <img class="bookCover" src="${booksArray[i].cover}" alt="" class="cover">
//                    <h3 class="bookName">${booksArray[i].name}</h3>
//                    <h4 class="bookAuthor">${booksArray[i].author}</h4>
//                    <h3 class="bookPrice">$${booksArray[i].price}</h3>
//                </div>
//            `)
//        }
//        const book = Array.from(document.getElementsByClassName("book"));
//        book.forEach((e, i) => {
//            e.addEventListener("click", () => {
//                location.href = `http://127.0.0.1:5500/Orangel2.0/bookPage.html?id=${e.id}`;
//            })
//        })
//    }
//}else if(myUrl == "classicBooks") {
//    let pagesCount = Math.ceil(classicBooks.length / 8);
//    console.log(pagesCount);
//    function pagesSpansRender(pagesCount) {
//        pages.innerHTML = "";
//        for(let i = 0; i < pagesCount; i++) {
//            pages.insertAdjacentHTML("beforeend", `
//                <span class="new">${i + 1}</span>
//            `)
//        }
//    }
//    pagesSpansRender(pagesCount);
//    booksRender(container, classicBooks);
    
//    let newSpan = Array.from(document.getElementsByClassName("new"));
//    newSpan.forEach((item, i) => {
//        item.addEventListener("click", () => {
//            console.log(i);
//            booksRender(container, classicBooks, i)
//        })
//    })
//    function booksRender(element, booksArray, page = 0) {
//        element.innerHTML = "";
//        const minElement = page * 8;
//        let maxElement = 0;
//        if(page+1 == pagesCount) {
//            maxElement = minElement + classicBooks.length % 8;
//        }else {
//            maxElement = minElement + 8;
//        }
//        console.log(maxElement);
//        for(let i = minElement; i < maxElement; i++) {
//            console.log("bb");
//            element.insertAdjacentHTML("beforeend", `
//                <div id="${booksArray[i].id}" class="book">
//                    <img class="bookCover" src="${booksArray[i].cover}" alt="" class="cover">
//                    <h3 class="bookName">${booksArray[i].name}</h3>
//                    <h4 class="bookAuthor">${booksArray[i].author}</h4>
//                    <h3 class="bookPrice">$${booksArray[i].price}</h3>
//                </div>
//            `)
//        }
//        const book = Array.from(document.getElementsByClassName("book"));
//        book.forEach((e, i) => {
//            e.addEventListener("click", () => {
//                location.href = `http://127.0.0.1:5500/Orangel2.0/bookPage.html?id=${e.id}`;
//            })
//        })
//    }
//}else {
//    let pagesCount = Math.ceil(allBooks.length / 8);
//    console.log(pagesCount);
//    function pagesSpansRender(pagesCount) {
//        pages.innerHTML = "";
//        for(let i = 0; i < pagesCount; i++) {
//            pages.insertAdjacentHTML("beforeend", `
//                <span class="new">${i + 1}</span>
//            `)
//        }
//    }
//    pagesSpansRender(pagesCount);
//    booksRender(container, allBooks);
    
//    let newSpan = Array.from(document.getElementsByClassName("new"));
//    newSpan.forEach((item, i) => {
//        item.addEventListener("click", () => {
//            console.log(i);
//            booksRender(container, allBooks, i)
//        })
//    })
//    function booksRender(element, booksArray, page = 0) {
//        element.innerHTML = "";
//        const minElement = page * 8;
//        const maxElement = minElement + 8;
//        for(let i = minElement; i < maxElement; i++) {
//            element.insertAdjacentHTML("beforeend", `
//                <div id="${booksArray[i].id}" class="book">
//                    <img class="bookCover" src="${booksArray[i].cover}" alt="" class="cover">
//                    <h3 class="bookName">${booksArray[i].name}</h3>
//                    <h4 class="bookAuthor">${booksArray[i].author}</h4>
//                    <h3 class="bookPrice">$${booksArray[i].price}</h3>
//                </div>
//            `)
//        }
//        const book = Array.from(document.getElementsByClassName("book"));
//        book.forEach((e, i) => {
//            e.addEventListener("click", () => {
//                location.href = `http://127.0.0.1:5500/Orangel2.0/bookPage.html?id=${e.id}`;
//            })
//        })
//    }
//}


//let pagesCount = Math.floor(books.length / 4);


