function fetchNews(searchParameter) {
    fetch(`https://newsapi.org/v2/${searchParameter}&apiKey=e0a54875bf4f4b4f803131a0b91fc182`)
    .then(function(response) {
        return response.json();
    })
    .then(function(fetchedNews) {
        console.log(fetchedNews);
        if(fetchedNews){
            printNews(fetchedNews);
        }
        else if(!fetchedNews || fetchedNews.articles.length === 0){
            printErrorMessage("No articles matched your search, please try again!")
        }
    })
    .catch(function(errorMessage) {
        printErrorMessage("Something went wrong, please try again!");
    }) 
}
function fetchNewsAdvancedSearch () {

}
function printErrorMessage(errorMessage) {
    const container = document.getElementById("boxSelectCountry");
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
    const container = document.getElementById("boxDisplayNews");
    container.className = "boxDisplayNews";
    var i = 0;
    for (let article of news.articles) {
        const newsWrapper = document.createElement("div");
        const publishedAt = document.createElement("h5");
        const newsSource = document.createElement("h6");
        const newsTitle = document.createElement("h4");
        const linkReadMore = document.createElement("a");

        if (i % 2 === 0) {
            newsWrapper.className = "newsWrapperGrey";
        }
        else {
            newsWrapper.className = "newsWrapper";
        }
        
        publishedAt.className = "newsSubTitle";
        newsTitle.className = "newsTitle";
        linkReadMore.className = "linkReadMore";

        linkReadMore.href = article.url;
        
        const timeNode = document.createTextNode(`Published at: ${article.publishedAt}`);
        const titleNode = document.createTextNode(article.title);
        const linkNode = document.createTextNode("Read More...");

        linkReadMore.appendChild(linkNode);
        publishedAt.appendChild(timeNode);
        newsTitle.appendChild(titleNode);
        newsWrapper.appendChild(publishedAt);
        newsWrapper.appendChild(newsTitle);
        newsWrapper.appendChild(linkReadMore);
        container.appendChild(newsWrapper);

        i++;
    }
}
function printSelectedParameters (){

}
const submitButton = document.getElementById("selectCountrySubmit");
submitButton.addEventListener("click", function(){
    event.preventDefault();
    const selectedCountry = document.getElementById("selectCountry").value;
    const selectedCategory = document.getElementById("selectCategory").value;
    const searchParameter = createParameterFromSelections(selectedCountry, selectedCategory);
    fetchNews(searchParameter);
});
const searchButton = document.getElementById("anvancedSearchSubmit");
searchButton.addEventListener("click", function(){
    event.preventDefault();
    const keyword = document.getElementById("advancedSearchInput").value;
    const searchParameter = createParameterFromInput(keyword);
    fetchNews(searchParameter);
})
function createParameterFromSelections(selectedCountry,selectedCategory) {
    const countryCode = countryToFetch(selectedCountry); 
    const countryParameter = `top-headlines?country=${countryCode}`;

    if (selectedCategory != "all"){
        const searchParameter = `${countryParameter}&category=${selectedCategory}`;
        return searchParameter;
    }
    else{
        return countryParameter;
    }
}
function createParameterFromInput(keyword){
    const searchParameter = `everything?q=${keyword}`;
    return searchParameter;
}
function countryToFetch(selectedCountry){
    switch (selectedCountry){
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