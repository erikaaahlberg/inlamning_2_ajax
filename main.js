function fetchNews(countryCode) {
    fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=business&apiKey=e0a54875bf4f4b4f803131a0b91fc182`)
    .then(function(response) {
        return response.json();
    })
    .then(function(fetchedNews) {
        console.log(fetchedNews);
        printNews(fetchedNews);
        //sortSource(newsJsonData);
    });
}

function printNews() {
    const container = document.getElementById("box_display_news");
    container.className = "box_display_news";
}
function sortSource(articles){
    for (let article of articles) {
        //console.log(article.articles);
        for (let source of article.articles){
            console.log(source.title);
        }
    }
}
function createNewsParagraph(news){
    for (let article of news.articles) {
        const newsParagraph = document.createElement("div");
        const newsArticle = document.createElement("article");
        console.log(article.title);
    }
}
const button = document.getElementById("select_country_submit");
button.addEventListener("click", function(){
    const selectedCountry = document.getElementById("select_country").value;
    console.log(selectedCountry);
    const countryCode = countryToFetch(selectedCountry);
    console.log(countryCode);
    fetchNews(countryCode);
    
})

function countryToFetch(selectedValue){
    switch (selectedValue) {
        case "australia":
            return "au";
            break;
        case "belgium":
            return "be";
            break;
        case "brazil":
            return "br";
            break;
        case "bulgaria":
            return "bg";
            break;
        case "canada":
            return "ca";
            break;
        case "china":
            return "cn";
            break;
        case "colombia":
            return "co";
            break;
        case "cuba":
            return "cu";
            break;
        case "germany":
            return "de";
            break;
        case "greece":
            return "gr";
            break;
        case "france":
            return "fr";
            break;
        case "ireland":
            return "ie";
            break;
        case "italy":
            return "it";
            break;
        case "japan":
            return "jp";
            break;
        case "mexico":
            return "mx";
            break;
        case "netherlands":
            return "nl";
            break;
        case "new_zealand":
            return "nz";
            break;
        case "norway":
            return "no";
            break;
        case "poland":
            return "pl";
            break;
        case "portugal":
            return "pt";
            break;
        case "south_africa":
            return "za";
            break;
        case "sweden":
            return "se";
            break;
        case "united_states":
            return "us";
            break;
        case "venezuela":
            return "ve";
            break;
    }
}
    //API key: e0a54875bf4f4b4f803131a0b91fc182