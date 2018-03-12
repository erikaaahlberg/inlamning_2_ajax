function fetchNews(countryCode) {
    fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=e0a54875bf4f4b4f803131a0b91fc182`)
    .then(function(response) {
        return response.json();
    })
    .then(function(fetchedNews) {
        console.log(fetchedNews);
        printNews(fetchedNews);
    })
    .catch(function(errorMessage) {
        console.log(errorMessage);
        errorMessage = "Something went wrong, please try again!";
        printErrorMessage(errorMessage);
    }) 
}
function printErrorMessage(errorMessage) {
    const container = document.getElementById("box_select_country");
    const boxErrorMessage = document.createElement("div");
    const errorMessageParagraph = document.createElement("p");
    const errorMessageNode = document.createTextNode(errorMessage);

    errorMessageParagraph.appendChild(errorMessageNode);
    boxErrorMessage.appendChild(errorMessageParagraph);
    container.appendChild(boxErrorMessage);
    setTimeout(function() {
        boxErrorMessage.className = "hidden";
    }, 3000);
}
function printNews(news){
    const container = document.getElementById("box_display_news");
    container.className = "box_display_news";
    for (let article of news.articles) {
        const newsWrapper = document.createElement("div");
        const publishedAt = document.createElement("h3");
        const newsTitle = document.createElement("h2");
        const linkReadMore = document.createElement("a");

        newsWrapper.className = "wrapper_news";
        publishedAt.className = "published_at";
        newsTitle.className = "title_news";
        linkReadMore.className = "link_read_more";
        linkReadMore.href = article.url;

        const titleNode = document.createTextNode(article.title);
        const timeNode = document.createTextNode(`Published at: ${article.publishedAt}`);
        const linkNode = document.createTextNode("Read More");
        publishedAt.appendChild(timeNode);
        newsTitle.appendChild(titleNode);
        newsWrapper.appendChild(publishedAt);
        newsWrapper.appendChild(newsTitle);
        container.appendChild(newsWrapper);
    }
}
const button = document.getElementById("select_country_submit");
button.addEventListener("click", function(){
    const selectedCountry = document.getElementById("select_country").value;
    const selectedCategory = document.getElementById("select_category").value;
    checkSelectedValues(selectedCountry, selectedCategory);
    console.log(selectedCountry);
    const countryCode = countryToFetch(selectedCountry);
    console.log(countryCode);
    fetchNews(countryCode);
});
function checkSelectedValues(selectedCountry,selectedCategory) {
    var searchParameter = "";
    if (selectedCountry != "all") {
        const countryCode = countryToFetch(selectedCountry);
        const countryParameter = `country=${countryCode}`;
    }
    if (selectedCategory != "all") {
        const categoryParameter = `category=${selectedCategory}`;
    }
    if (countryParameter && categoryParameter) {
        searchParameter = `${countryParameter}&$categoryParameter`;
        return searchParameter;
    }
    else if (countryParameter) {
        return countryParameter;
    }
    else if (categoryParameter) {
        return categoryParameter;
    }
    else {
        return false;
    }
}
function countryToFetch(selectedValue) {
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