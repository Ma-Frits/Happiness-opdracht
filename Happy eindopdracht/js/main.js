class Data {
    data;
    url;

    constructor(newUrl) {
        this.url = newUrl;
    }

    async getData() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.data = data["episodes"];
            });
        return this.data;
    }
}

class Header {
    placeToRenderHeader;

    header;
    H1;
    Figure;
    Icon;

    constructor(placeToRenderHeader) {

        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];

        this.header = document.createElement("header");
        this.header.classList = "happiness__header";

        this.H1 = document.createElement("h1");
        this.H1.classList = "happiness__h1";
        this.H1.innerText = "Collection of Happiness";

        this.Figure = document.createElement("figure");
        this.Figure.classList = "happiness__logo";

        this.Icon = document.createElement("i");
        this.Icon.classList = " fa-solid fa-podcast happiness__icon";
    }

    render() {
        this.placeToRenderHeader.appendChild(this.header);
        this.header.appendChild(this.Figure);
        this.header.appendChild(this.H1);
        this.Figure.appendChild(this.Icon);
    }
}

class Main {
    placeToRenderMain;
    happyMain;
    happyRightSection;
    happyLeftSection;
    firstEpisode;

    constructor(placeToRenderMain, episodes) {
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.happyMain = document.createElement("main");
        this.happyMain.classList = "happiness";

        this.happyLeftSection = new LeftSection(this.happyMain, this, episodes);
        this.happyRightSection = new RightSection(this.happyMain, this.firstEpisode);
    }

    render() {
        this.placeToRenderMain.appendChild(this.happyMain);
        this.happyLeftSection.render();
        this.happyRightSection.render();
    }

    changeRightSection(clickedEpisode) {
        this.happyRightSection.rightsideCard.changeRightSectionContent(clickedEpisode);
    }
}


class RightSection {
    placeToRender;
    happyRightSection;

    constructor(placeToRender, firstEpisode) {
        this.placeToRender = placeToRender;

        this.happyRightSection = document.createElement("section");
        this.happyRightSection.classList = "happiness__section happiness__section--right";

        this.rightsideCard = new RightsideCard(this.happyRightSection, firstEpisode);
    }

    render() {
        this.placeToRender.appendChild(this.happyRightSection);
        this.rightsideCard.render();
    }
}
class LeftSection {
    placeToRender;
    ClassMain;
    LeftSection;

    Ul;
    Li;
    Img;

    PDate;
    PTitle;
    PText;
    episodes;

    constructor(placeToRender, ClassMain, episodes) {
        this.episodes = episodes;

        this.placeToRender = placeToRender;
        this.ClassMain = ClassMain;

        this.LeftSection = document.createElement("section");
        this.LeftSection.classList = "happiness__section happiness__section--left";

        this.Ul = document.createElement("ul");
        this.Ul.classList = "happiness__ul";

        let existingNumbers = [];
        for (let i = 0; i < 4; i++) {
            let randomNumber = this.randomizer();
            if(i === 0){
                this.ClassMain.firstEpisode = this.episodes[randomNumber];
            }

          
            while(existingNumbers.includes(randomNumber)){
                randomNumber = this.randomizer();
            }
            existingNumbers.push(randomNumber);

            this.Li = document.createElement("li");
            this.Li.classList = "happiness__li";
            this.Li.addEventListener("click", () => this.ClassMain.changeRightSection(this.episodes[randomNumber]));

            this.Img = document.createElement("img");
            this.Img.classList = "happiness__img";
            this.Img.setAttribute("src", episodes[randomNumber]["image"]["src"]);
            this.Img.setAttribute("alt", episodes[randomNumber]["image"]["alt"]);  

            this.PDate = document.createElement("p");
            this.PDate.classList = "happiness__p happiness__p--date";
            this.PDate.innerText = episodes[randomNumber]["date (dd-mm-yyyy)"];

            this.PTitle = document.createElement("p");
            this.PTitle.classList = "happiness__p happiness__p--title";
            this.PTitle.innerText = episodes[randomNumber]["title"];

            this.Ul.appendChild(this.Li);
            this.Li.appendChild(this.Img);
            this.Li.appendChild(this.PDate);
            this.Li.appendChild(this.PTitle);
        }
    }

    randomizer() {
        return Math.floor(Math.random() * this.episodes.length);
    }

    render() {
        this.placeToRender.appendChild(this.LeftSection);
        this.LeftSection.appendChild(this.Ul);
    }
}
class Footer {
    placeToRenderFooter;
    footer;
    footerP;

    constructor(placeToRenderFooter) {
        this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];

        this.footer = document.createElement("footer");
        this.footer.classList = "footer";

        this.footerP = document.createElement("p");
        this.footerP.classList = "footer__p";
        this.footerP.innerText = "Gemaakt door: Frits Bien";
    }

    render() {
        this.placeToRenderFooter.appendChild(this.footer);
        this.footer.appendChild(this.footerP);
    }
}

class RightsideCard {
    happyRightSection;
    rightsideUl;
    rightsideLi;
    rightsideImg;
    rightsidePDate;
    rightsidePTitle;
    detailPText;
    rightsideGroup;
    rightsideDownload;
    rightsideLink;

    constructor(happyRightSection, firstEpisode){
        this.happyRightSection = happyRightSection;

        this.rightsideUl = document.createElement("ul");
        this.rightsideUl.classList = "rightside__ul";

        // All li's
        this.rightsideLiTop = document.createElement("li");
        this.rightsideLiTop.classList = "rightside__li";

        this.rightsideLiMiddle = document.createElement("li");
        this.rightsideLiMiddle.classList = "rightside__li";

        this.rightsideBottom = document.createElement("li");
        this.rightsideBottom.classList = "rightside__li";
        // --------------------

        this.rightsideImg = document.createElement("img");
        this.rightsideImg.classList = "rightside__img";
        this.rightsideImg.setAttribute("src", firstEpisode["image"]["src"]);
        this.rightsideImg.setAttribute("alt", firstEpisode["image"]["alt"]);  

        this.rightsidePDate = document.createElement("p");
        this.rightsidePDate.classList = "rightside__p rightside__p--date";
        this.rightsidePDate.innerText = firstEpisode["date (dd-mm-yyyy)"];

        this.rightsidePTitle = document.createElement("p");
        this.rightsidePTitle.classList = "rightside__p rightside__p--title";
        this.rightsidePTitle.innerText = firstEpisode["title"];

        this.rightsidePText = document.createElement("p");
        this.rightsidePText.classList = "rightside__p rightside__p--summary";
        this.rightsidePText.innerText = firstEpisode["summary"];

        this.rightsideGroup = document.createElement("div");
        this.rightsideGroup.classList = "rightside__group";

        this.rightsideDownload = document.createElement("button");
        this.rightsideDownload.classList = "rightside__download";
        this.rightsideDownload.innerText = "Downloaden";
        this.rightsideDownload.addEventListener("click", () => window.location = firstEpisode["audio"]);

        this.rightsideLink = document.createElement("a");
        this.rightsideLink.classList = "rightside__link";
        this.rightsideLink.innerText = "Source >";
        this.rightsideLink.setAttribute("href", firstEpisode["url"]);    
        this.rightsideLink.setAttribute("target", "_blank");
    }

    render(){
        this.happyRightSection.appendChild(this.rightsideUl);

        // Li top
        this.rightsideUl.appendChild(this.rightsideLiTop);
        this.rightsideLiTop.appendChild(this.rightsideImg);
        this.rightsideLiTop.appendChild(this.rightsidePDate);
        this.rightsideLiTop.appendChild(this.rightsidePTitle);
        // Li middle
        this.rightsideUl.appendChild(this.rightsideLiMiddle);
        this.rightsideLiMiddle.appendChild(this.rightsidePText);

        this.rightsideUl.appendChild(this.rightsideBottom);
        this.rightsideBottom.appendChild(this.rightsideGroup);
        this.rightsideGroup.appendChild(this.rightsideDownload);
        this.rightsideGroup.appendChild(this.rightsideLink);
    }

    changeRightSectionContent(clickedEpisode) {
        this.rightsideImg.setAttribute("src", clickedEpisode["image"]["src"]);
        this.rightsideImg.setAttribute("alt", clickedEpisode["image"]["alt"]);

        this.rightisdePText.innerText = clickedEpisode["summary"];

        this.rightsidePDate.innerText = clickedEpisode["date (dd-mm-yyyy)"];
        this.rightsidePTitle.innerText = clickedEpisode["title"];

        this.rightsideDownload.addEventListener("click", () => window.location = clickedEpisode["audio"]);

        this.rightsideLink.setAttribute("href", clickedEpisode["url"]);
    }

}


class App {
    apiData;

    header;
    main;
    footer;

    constructor() {

        this.header = new Header("body");
        this.header.render();

        this.apiData = new Data("../data/data.json");
        this.apiData.getData()
            .then((episodes) => {
                this.main = new Main("body", episodes);
                this.main.render();

                this.footer = new Footer("body");
                this.footer.render();
            });
    }
}

const app = new App();


