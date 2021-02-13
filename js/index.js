
//Our Services Tabs
const serviceTabs = document.querySelectorAll(".services-container li");
const serviceTabContents = document.querySelectorAll(".service-description-container div");
document.querySelector(".services-container").addEventListener("click", (event) => {
    for (let i = 0; i < serviceTabs.length; i++) {
        if (serviceTabs[i] == event.target) {
            serviceTabs[i].classList.add("service-item-selected");
            serviceTabContents[i].classList.add("services-content-active");
        }
        else {
            serviceTabs[i].classList.remove("service-item-selected");
            serviceTabContents[i].classList.remove("services-content-active");
        }
    }
});
////////////////////

//Works Tabs
function showWorksByCategory(categoryName) {
    if (categoryName === "all") {
        for (let i = 0; i < worksCounter; i++) {
            works[i].classList.remove("work-item-hidden");
        }
        return;
    }
    for (let i = 0; i < worksCounter; i++) {
        if (works[i].getAttribute("category") === categoryName) {
            works[i].classList.remove("work-item-hidden");
        }
        else {
            works[i].classList.add("work-item-hidden");
        }
    }
}

function selectCategoryTab(target) {
    for (const tab of workTabs) {
        if (tab === target) {
            tab.classList.add("work-category-item-selected");
        }
        else {
            tab.classList.remove("work-category-item-selected");
        }
    }
}

function showMoreWorks() {
    this.style.display = "none";
    const loader = document.querySelector("#works-loader");
    loader.classList.add("loader-active");
    worksCounter += 12;
    setTimeout(() => {
        loader.classList.remove("loader-active");
        if (worksCounter === 36) {
            this.style.display = "none";
        }
        else {
            this.style.display = "block";
        }
        showWorksByCategory(savedCategory);
    }, 2000);
}

let worksCounter = 12;
document.getElementById("works-more-btn").addEventListener("click", showMoreWorks);

const works = document.querySelectorAll(".work-item");
const workTabs = document.querySelectorAll(".work-category-item");
let savedCategory = "all";
document.querySelector(".work-categories-container").addEventListener("click", (event) => {
    if (event.target.innerText.length < 30) {
        selectCategoryTab(event.target);
        savedCategory = event.target.getAttribute("category");
        showWorksByCategory(event.target.getAttribute("category"));
    }
});
////////////////////

//Review Slider
function makeActive(activeElement) {
    for (const element of smallPhotos) {
        if (element.classList.contains("active-photo")) {
            previousActiveElement = element;
        }
    }
    for (const element of smallPhotos) {
        if (element === activeElement) {
            activeElement.classList.add("active-photo");
            const personIndex = activeElement.dataset.personId;
            reviewText.innerText = persons[personIndex].message;
            nameElement.innerText = persons[personIndex].name;
            profession.innerText = persons[personIndex].position;
            bigPhoto.src = persons[personIndex].photo;
            continue;
        }
        if (element === previousActiveElement) {
            element.classList.remove("active-photo");
        }
    }
}

function slider(event, isNext) {
    if (event != null) {
        if (isNext) {
            firstSlide++;
        }
        else {
            firstSlide--;
        }
    }
    else {
        firstSlide = 0;
    }
    if (firstSlide === persons.length) {
        firstSlide = 0;
    }
    if (firstSlide === -1) {
        firstSlide = persons.length - 1;
    }
    let photoInArray = firstSlide;
    for (let i = 0; i < smallPhotos.length; i++) {
        smallPhotos[i].src = persons[photoInArray].photo;
        smallPhotos[i].dataset.personId = photoInArray;
        if (i == activeElement) {
            makeActive(smallPhotos[i]);
        }
        photoInArray++;
        if (photoInArray === persons.length) {
            photoInArray = 0;
            continue;
        }
        if (photoInArray === 0) {
            photoInArray = persons.length - 1;
        }
    }
}

const persons = [
    {
        name: "Sheldon Cooper",
        position: "Theoretical Physicist",
        message: "This mind is incapable of forgetting! I haven't forgotten anything since the day my mother stopped breastfeeding me... It was a rainy Tuesday...",
        photo: "img/review/sheldon.jpg"
    },
    {
        name: "Leonard Hofstadter",
        position: "Experimental Physicist",
        message: "My parents felt that naming me Leonard and putting me in advanced placement classes wasn't getting me beaten up enough.",
        photo: "img/review/leonard.jpg"
    },
    {
        name: "Howard Wolowitz",
        position: "Aerospace Engineer",
        message: "Love is not a sprint, it's a marathon, a relentless pursuit that only ends when she falls into your arms... Or hits you with the pepper spray.",
        photo: "img/review/howard.jpg"
    },
    {
        name: "Rajesh Koothrappali",
        position: "Astrophysicist",
        message: "To paraphrase Shakespeare, 'it's better to have loved and lost then to stay home every night and download increasingly shameful pornography'.",
        photo: "img/review/rajesh.jpg"
    },
    {
        name: "Penny",
        position: "Aspiring Actress",
        message: "No one ever bought me drinks at a bar because my brain just popped out of my shirt.",
        photo: "img/review/penny.jpg"
    },
    {
        name: "Amy Farrah Fowler",
        position: "Neurobiologist",
        message: "Wow, my boyfriend is friends with Stephen Hawking and my new dandruff shampoo doesn’t smell like tar. Everything really is coming up Amy.",
        photo: "img/review/amy.jpg"
    },
    {
        name: "Bernadette Rostenkowski",
        position: "Microbiologist",
        message: "Look at Howard. He was a disaster when i met him. Now he's a foxy astronaut with a hot wife.",
        photo: "img/review/bernadette.jpg"
    },
    {
        name: "Stuart Bloom",
        position: "Owner of the Comic Center in Pasadena",
        message: "I know a place where you could you stay and earn some money at the same time. I just have to warn you: it will involve humiliation, degradation and verbal abuse.",
        photo: "img/review/stuart.jpg"
    }
];
const reviewText = document.querySelector(".review-text");
const nameElement = document.querySelector(".review-name");
const profession = document.querySelector(".review-profession");
const bigPhoto = document.querySelector(".review-big-photo");
const smallPhotos = document.querySelectorAll(".review-small-photo");
const prevBtn = document.getElementById("prevArrow");
const nextBtn = document.getElementById("nextArrow")
let firstSlide;
let activeElement = 0;
let previousActiveElement;

slider();

prevBtn.addEventListener("click", (event) => slider(event, false));
nextBtn.addEventListener("click", (event) => slider(event, true));
document.querySelector(".review-photo-container").addEventListener("click", (event) => {
    if (event.target.classList.contains("review-small-photo")) {
        const selectedElement = event.target;
        makeActive(selectedElement);
        activeElement = selectedElement.dataset.position;
    }
});
////////////////////

//Best Images
function generatePicOptions(){
    const picOptions = document.createElement("div");
    picOptions.classList.add("msnr-pic-options");
    //Creation of zoom button
    const zoomButton = document.createElement("button");
    zoomButton.classList.add("options-btn");
    zoomButton.innerHTML = "<img src='img/zoom-icon.svg' class='options-btn-icon' alt='zoom icon'>";
    //Creation of fullscreen button
    const fullscreenButton = document.createElement("button");
    fullscreenButton.classList.add("options-btn");
    fullscreenButton.innerHTML = "<img src='img/fullscr-icon.svg' class='options-btn-icon' alt='fullcsreen icon'>";

    picOptions.append(zoomButton, fullscreenButton);
    return picOptions;
}

function showMorePictures() {
    this.style.display = "none";
    const hiddenImgs = document.querySelectorAll(".msnr-hidden");
    const loader = document.querySelector("#gallery-loader");
    loader.classList.add("loader-active", "loader-active-gallery");
    setTimeout(() => {
        loader.classList.remove("loader-active", "loader-active-gallery");
        for (const picture of hiddenImgs) {
            picture.classList.remove("msnr-hidden");
        }
        masonry.appended(hiddenImgs);
    }, 2000);
}

const elemContainer = document.querySelector(".msnr-grid");
let masonry;

imagesLoaded(elemContainer, function () {
    masonry = new Masonry(elemContainer, {
        itemSelector: '.msnr-grid-item',
        columnWidth: '.msnr-grid-item',
        gutter: 20
    });
});

const picContainers = document.querySelectorAll(".pic-container");
for (const picContainer of picContainers) {
    picContainer.append(generatePicOptions());
}
const pictures = document.querySelectorAll(".msnr-grid-item");
document.getElementById("gallery-more-btn").addEventListener("click", showMorePictures);
////////////////////