landingOnPage();
const submitButton = document.getElementById("selectCountrySubmit");
submitButton.addEventListener("click", function(){
    event.preventDefault();
    const selectedCountry = document.getElementById("selectCountry").value;
    const selectedCategory = document.getElementById("selectCategory").value;
    const searchParameter = createParameterFromSelections(selectedCountry, selectedCategory);
    const searchMessage = getFromLocalStorage("searchMessage");
    printSearchMessage(searchMessage);
    fetchNews(searchParameter);
}); // submitButton eventlistener collapse
const searchButton = document.getElementById("anvancedSearchSubmit");
searchButton.addEventListener("click", function(){
    event.preventDefault();
    const keyword = document.getElementById("advancedSearchInput").value;
    const searchParameter = createParameterFromInput(keyword);
    fetchNews(searchParameter);
});
function landingOnPage(){
    const localStorageStatus = checkLocalStorage("fetchedNews");
    //localStorage.removeItem("fetchedNews");
    //localStorage.removeItem("searchParameters");
    console.log(localStorageStatus);
    if(localStorageStatus){
        const searchMessage = getFromLocalStorage("searchMessage");
        console.log(searchMessage);
        const news = localStorageStatus;
        if(searchMessage){
            printsearchMessage(searchMessage);
            printNews(news);
            //printSearchedParameters(searchParameters);
        }
    }
}
function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}
function fetchNews(searchParameter) {
    fetch(`https://newsapi.org/v2/${searchParameter}&apiKey=e0a54875bf4f4b4f803131a0b91fc182`)
    .then(function(response) {
        return response.json();
    })
    .then(function(fetchedNews) {
        console.log(fetchedNews);
        if(fetchedNews && fetchedNews.articles.length > 0){
            saveInLocalStorage("fetchedNews", fetchedNews);
            printNews(fetchedNews);
        }
        else if(!fetchedNews || fetchedNews.articles.length === 0){
            removeFromLocalStorage("searchMessage");
            printErrorMessage("No articles matched your search, please try again!");
        }
    })
    .catch(function(errorMessage) {
        removeFromLocalStorage("searchMessage");
        printErrorMessage("Something went wrong, please try again!");
    }) 
}
function checkLocalStorage () {
    const news = getFromLocalStorage("fetchedNews");
    if(news){
        return news;
    }
    else{
        return false;
    }
} // checkLocalStorage collapse
function removeAfter2minutes(key) {
    return new Promise(resolve => {
      setTimeout(() => {
        removeFromLocalStorage(key);
        location.reload();
      }, 7000);
    });
  }
function hideItem(item){
    item.className = "hidden";
} // hideItem collapse
async function saveInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
    await removeAfter2minutes(key);
} // saveInLocalStorage collapse

function getFromLocalStorage(key){
    const fetchedList = JSON.parse(localStorage.getItem(key));
    return fetchedList;
} // getFromLocalStorageCollaps

function printErrorMessage(errorMessage) {
    const container = document.getElementById("boxSearchNews");
    const boxErrorMessage = document.createElement("div");
    const errorMessageParagraph = document.createElement("p");
    const errorMessageNode = document.createTextNode(errorMessage);
    errorMessageParagraph.className = "errorMessage";
    errorMessageParagraph.appendChild(errorMessageNode);
    boxErrorMessage.appendChild(errorMessageParagraph);
    container.appendChild(boxErrorMessage);
    
    setTimeout(function() {
        hideItem(boxErrorMessage);
    }, 3000);
}
function printSearchMessage(searchMessage){
    const container = document.getElementById("boxDisplayNews");
    const paragraph = document.createElement("h4");
    paragraph.className = "searchMessage";
    const parameterNode = document.createTextNode(`You searched for ${searchMessage}`);
    paragraph.appendChild(parameterNode);
    container.appendChild(paragraph);
}
function editCountrySearchParameters(searchParameter){
    switch (searchParameter){
        case "newZealand":
            return "New Zealand";
            break;
        case "southAfrica":
            return "South Africa";
            break;
        case "unitedStates":
            return "United States";
            break;
        default: console.log(searchParameter);
        return searchParameter;
    }
}
function printNews(news){
    const container = document.getElementById("boxDisplayNews");
    container.className = "boxDisplayNews";
    
    var i = 0;
    for (let article of news.articles) {
        const newsWrapper = document.createElement("div");
        const newsInfo = document.createElement("h6");
        const newsTitle = document.createElement("h5");
        const linkReadMore = document.createElement("a");

        if (i % 2 === 0) {
            newsWrapper.className = "newsWrapperGrey";
        }
        else {
            newsWrapper.className = "newsWrapper";
        }
        
        newsInfo.className = "newsInfo";
        newsTitle.className = "newsTitle";
        linkReadMore.className = "linkReadMore";

        linkReadMore.href = article.url;
        
        const infoNode = document.createTextNode(`Published at: ${article.publishedAt} by ${article.source.name}`);
        const titleNode = document.createTextNode(article.title);
        const linkNode = document.createTextNode("Read More...");

        linkReadMore.appendChild(linkNode);
        newsInfo.appendChild(infoNode);
        newsTitle.appendChild(titleNode);
        newsWrapper.appendChild(newsInfo);
        newsWrapper.appendChild(newsTitle);
        newsWrapper.appendChild(linkReadMore);
        container.appendChild(newsWrapper);

        i++;
    }
    const boxSearchNews = document.getElementById("boxSearchNews");
    hideItem(boxSearchNews);
}
function createParameterFromSelections(selectedCountry,selectedCategory) {
    const countryCode = countryToFetch(selectedCountry); 
    const countryParameter = `top-headlines?country=${countryCode}`;
    const editedCountryParameter = editCountrySearchParameters(selectedCountry);

    if (selectedCategory != "all"){
        const searchParameter = `${countryParameter}&category=${selectedCategory}`;
        saveInLocalStorage("searchMessage", `${editedCountryParameter} in category: ${selectedCategory}`);  
        return searchParameter;
    }
    else{
        saveInLocalStorage("searchMessage", `${selectedCountry}`);  
        return countryParameter;
    }
}
function createParameterFromInput(keyword){
    const searchParameter = `everything?q=${keyword}`;
    return searchParameter;
}
function countryToFetch(selectedCountry){
    switch (selectedCountry){
        case "Australia":
            return "au";
            break;
        case "Belgium":
            return "be";
            break;
        case "Brazil":
            return "br";
            break;
        case "Bulgaria":
            return "bg";
            break;
        case "Canada":
            return "ca";
            break;
        case "China":
            return "cn";
            break;
        case "Colombia":
            return "co";
            break;
        case "Cuba":
            return "cu";
            break;
        case "Germany":
            return "de";
            break;
        case "Greece":
            return "gr";
            break;
        case "France":
            return "fr";
            break;
        case "Ireland":
            return "ie";
            break;
        case "Italy":
            return "it";
            break;
        case "Japan":
            return "jp";
            break;
        case "Mexico":
            return "mx";
            break;
        case "Netherlands":
            return "nl";
            break;
        case "New Zealand":
            return "nz";
            break;
        case "Norway":
            return "no";
            break;
        case "Poland":
            return "pl";
            break;
        case "Portugal":
            return "pt";
            break;
        case "southAfrica":
            return "za";
            break;
        case "Sweden":
            return "se";
            break;
        case "unitedStates":
            return "us";
            break;
        case "Venezuela":
            return "ve";
            break;
    }
}
    //API key: e0a54875bf4f4b4f803131a0b91fc182