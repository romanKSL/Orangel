import { bestsellersBooks, classicBooks } from "../materials/state.js";

const cartIcon = document.getElementsByClassName("cartIcon")[0];
cartIcon.innerHTML = `Кошик <b>${localStorage.length}</b>`;

const pagesCount = 2;

const bestsellersContainer = document.getElementsByClassName("bestsellersContainer")[0],
    classicContainer = document.getElementsByClassName("classicContainer")[0];


booksRender(bestsellersContainer, bestsellersBooks);
booksRender(classicContainer, classicBooks);


const bestsellersRectangles = Array.from(document.getElementsByClassName("bestsellers")),
    bestsellersBooksArrows = [];
bestsellersBooksArrows.push(document.getElementById("bestsellersLeftArrow"), document.getElementById("bestsellersRightArrow"));

const classicRectangles = Array.from(document.getElementsByClassName("classic")),
    classicBooksArrows = [];
classicBooksArrows.push(document.getElementById("classicLeftArrow"), document.getElementById("classicRightArrow"));

let currentPageBestsellers = 0, currentPageClassic = 0;


rectanglesWork(bestsellersRectangles, bestsellersContainer, bestsellersBooks);
rectanglesWork(classicRectangles, classicContainer, classicBooks);


bestsellersBooksArrows[0].addEventListener("click", () => {
    currentPageBestsellers = previousPage(bestsellersContainer, bestsellersBooks, currentPageBestsellers);
    for (let i = 0; i < pagesCount; i++) {
        bestsellersRectangles[i].className = "bestsellers rectangle";
    }
    bestsellersRectangles[currentPageBestsellers].className = "bestsellers rectangle act";
})
bestsellersBooksArrows[1].addEventListener("click", () => {
    currentPageBestsellers = nextPage(bestsellersContainer, bestsellersBooks, currentPageBestsellers);
    for (let i = 0; i < pagesCount; i++) {
        bestsellersRectangles[i].className = "bestsellers rectangle";
    }
    bestsellersRectangles[currentPageBestsellers].className = "bestsellers rectangle act";
})
classicBooksArrows[0].addEventListener("click", () => {
    currentPageClassic = previousPage(classicContainer, classicBooks, currentPageClassic);
    for (let i = 0; i < pagesCount; i++) {
        classicRectangles[i].className = "classic rectangle";
    }
    classicRectangles[currentPageClassic].className = "classic rectangle act";
})
classicBooksArrows[1].addEventListener("click", () => {
    currentPageClassic = nextPage(classicContainer, classicBooks, currentPageClassic);
    for (let i = 0; i < pagesCount; i++) {
        classicRectangles[i].className = "classic rectangle";
    }
    classicRectangles[currentPageClassic].className = "classic rectangle act";
})

function nextPage(container, booksType, currentPage) {
    if (currentPage == pagesCount - 1) {
        booksRender(container, booksType);
        return 0;
    } else {
        booksRender(container, booksType, currentPage + 1);
        return currentPage + 1;
    }
}
function previousPage(container, booksType, currentPage) {
    if (currentPage == 0) {
        booksRender(container, booksType, pagesCount - 1);
        return pagesCount - 1;
    } else {
        booksRender(container, booksType, currentPage - 1);
        return currentPage - 1;
    }
}
function rectanglesWork(rectangles, container, booksType) {
    rectangles.forEach((item, i) => {
        item.addEventListener("click", () => {
            for (let i = 0; i < pagesCount; i++) {
                rectangles[i].classList.remove("act");
            }
            booksRender(container, booksType, i);
            item.classList.add("act")
            currentPageBestsellers = i;
        })
    })
}
function booksRender(container, booksArray, page = 0) {
    container.innerHTML = "";
    const minElement = page * 4;
    const maxElement = minElement + 4;
    for (let i = minElement; i < maxElement; i++) {
        container.insertAdjacentHTML("beforeend", `
            <div id="${booksArray[i].id}" class="book">
                <img class="bookCover" src="${booksArray[i].cover}" alt="">
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
            location.href = `./bookPage/bookPage.html?id=${element.id}`;
        })
    })
}