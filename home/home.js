import { bestsellersBooks, classicBooks } from "../materials/books.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Корзина <b>${localStorage.length}</b>`

const bestsellersContainer = document.getElementsByClassName("bestsellersContainer")[0],
classicContainer = document.getElementsByClassName("classicContainer")[0];

const pagesCount = 2;
//var bestsellersRectangles = [];
//bestsellersRectangles.push(document.getElementById("bestRight"), document.getElementById("bestLeft"));
const bestsellersRectangles = Array.from(document.getElementsByClassName("bestsellers"));
//console.log(bestsellersRectangles);
let classicRectangles = [];
classicRectangles.push(document.getElementById("classicRight"), document.getElementById("classicLeft"));
//let arrow = Array.from(document.getElementsByClassName("arrow"));

const bestsellersBooksArrows = [];
bestsellersBooksArrows.push(document.getElementById("bestLeftArrow"), document.getElementById("bestRightArrow"));


booksRender(bestsellersContainer, bestsellersBooks);
booksRender(classicContainer, classicBooks);

//function arrowsWork(arrows, rectangles, divType, booksType) {
//    arrows.forEach((item, i) => {
//        //console.log(item, i)
//        item.addEventListener("click", (element) => {
//            //console.log();
//            for(let i=0; i<pagesCount; i++) {
//                rectangles[i].className = "rectangle";
//            }
//            //rectangle.forEach(item, () => {
//            //    item.className = "rectangle";
//            //})
//            if(i == 1) {
//                booksRender(divType, booksType)
//            }else {
//                booksRender(divType, booksType, 1)
//            }
            
//            //item.className = "rectangle act";
//        })
//    })
//}
//arrowsWork(bestsellersBooksArrows, bestsellerssRectangles, bestsellersConstainer, bestsellersBooks);
var currentPageBestsellers = 0;
bestsellersBooksArrows[0].addEventListener("click", () => {
    currentPageBestsellers = previousPage(currentPageBestsellers);
})
bestsellersBooksArrows[1].addEventListener("click", () => {
    currentPageBestsellers = nextPage(currentPageBestsellers);
})

function nextPage(currentPage) {
    console.log(currentPage)
    if(currentPage == pagesCount-1) {
        booksRender(bestsellersContainer, bestsellersBooks);
        return 0;
    }else {
        booksRender(bestsellersContainer, bestsellersBooks, currentPage+1);
        return currentPage+1;
    }
}
function previousPage(currentPage) {
    console.log(currentPage)
    if(currentPage == 0) {
        booksRender(bestsellersContainer, bestsellersBooks, pagesCount-1);
        return pagesCount-1;
    }else {
        booksRender(bestsellersContainer, bestsellersBooks, currentPage-1);
        return currentPage-1;
    }
}

currentPageBestsellers = rectanglesWork(bestsellersRectangles, bestsellersContainer, bestsellersBooks);
//rectanglesWork(classicRectangles, classicConstainer, classicBooks)
function rectanglesWork(rectangles, container, booksType) {
    rectangles.forEach((item, i) => {
        //console.log(item, i)
        item.addEventListener("click", () => {
            for(let i=0; i<pagesCount; i++) {
                rectangles[i].className = "rectangle";
                //console.log(rectangles[i].classList);
            }
            booksRender(container, booksType, i);
            item.className = "rectangle act";
            return i;
        })
    })
}
function booksRender(container, booksArray, page=0) {
    console.log("render")
    console.log(page)
    container.innerHTML = "";
    const minElement = page * 4;
    const maxElement = minElement + 4;
    console.log(minElement, maxElement)
    for(let i=minElement; i<maxElement; i++) {
        container.insertAdjacentHTML("beforeend", `
            <div id="${booksArray[i].id}" class="book">
                <img class="bookCover" src="${booksArray[i].cover}" alt="" class="cover">
                <h3 class="bookName">${booksArray[i].name}</h3>
                <h4 class="bookAuthor">${booksArray[i].author}</h4>
                <div class="bookPriceBox">
                    <span class="bookPrice">$${booksArray[i].price}</span>
                </div>
            </div>
        `)
    }
    //const rectangles = Array.from(document.getElementsByClassName(``));
    //console.log(rectangles);
    //rectangles.forEach((item, i) => {
                //console.log(item, i)
                //item.addEventListener("click", () => {
                //    for(let i=0; i<pagesCount; i++) {
                //        rectangles[i].className = "rectangle";
                //    }
                //    booksRender(divType, booksType, i)
                //    item.className = "rectangle act";
                //})
            //})
    const book = Array.from(document.getElementsByClassName("book"));
    book.forEach((element) => {
        element.addEventListener("click", () => {
            location.href = `./bookPage/bookPage.html?id=${element.id}`;
        })
    })
}