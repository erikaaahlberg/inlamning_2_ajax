landingOnPage();

// Fetching the button related to selectors
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

// Fetching the button related to input 
const searchButton = document.getElementById("anvancedSearchSubmit");
searchButton.addEventListener("click", function(){
    event.preventDefault();
    const keyword = document.getElementById("advancedSearchInput").value;
    const searchParameter = createParameterFromInput(keyword);
    saveInLocalStorage("searchMessage", keyword);
    const searchMessage = getFromLocalStorage("searchMessage");
    printSearchMessage(searchMessage);
    fetchNews(searchParameter);
}); // searchButton eventlistener collapse

function landingOnPage(){
    const localStorageStatus = checkLocalStorage("fetchedNews");
    if(localStorageStatus){
        const searchMessage = getFromLocalStorage("searchMessage");
        const news = localStorageStatus;
        if(searchMessage){
            printsearchMessage(searchMessage);
            printNews(news);
        }
    }
} // landingOnPage collapse

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
} // countryToFetch collapse

function fetchNews(searchParameter){
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
            // Removes searchMessage from localstorage because it's been saved to localStorage ahead of fetched news
            removeFromLocalStorage("searchMessage");
            printErrorMessage("No articles matched your search, please try again!");
        }
    })
    .catch(function(errorMessage){
        // Removes searchMessage from localstorage because it's been saved to localStorage ahead of fetched news
        removeFromLocalStorage("searchMessage");
        printErrorMessage("Something went wrong, please try again!");
    }) 
} // fetchNews collapse

function removeAfter3minutes(key){
    return new Promise(resolve => {
      setTimeout(() => {
        removeFromLocalStorage(key);
        location.reload();
      }, 30000);
    });
} // removeAfter3minutes collapse

function hideItem(item){
    item.className = "hidden";
} // hideItem collapse

function checkLocalStorage(){
    const news = getFromLocalStorage("fetchedNews");
    if(news){
        return news;
    }
    else{
        return false;
    }
} // checkLocalStorage collapse

async function saveInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
    await removeAfter3minutes(key);
} // saveInLocalStorage collapse

function getFromLocalStorage(key){
    const fetchedList = JSON.parse(localStorage.getItem(key));
    return fetchedList;
} // getFromLocalStorage collapse

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
} // removeFromLocalStorage collapse

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
} // printNews collapse

function printErrorMessage(errorMessage){
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
} // printErrorMessage collapse

function printSearchMessage(searchMessage){
    const container = document.getElementById("boxDisplayNews");
    const paragraph = document.createElement("h4");
    paragraph.className = "searchMessage";
    const parameterNode = document.createTextNode(`You searched for ${searchMessage}`);
    paragraph.appendChild(parameterNode);
    container.appendChild(paragraph);
} // printSearchMessage collapse

// Only these double named parameters needs to be edited before being displayed to the user
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
        default:
        return searchParameter;
    }
} // editCountrySearchParameters collapse

function createParameterFromSelections(selectedCountry,selectedCategory) {
    const countryCode = countryToFetch(selectedCountry); 
    const countryParameter = `top-headlines?country=${countryCode}`;
    const editedCountryParameter = editCountrySearchParameters(selectedCountry);

    // Saving searchMessage in localStorage now because it's based on the exact same if statement
    if (selectedCategory != "all"){
        const searchParameter = `${countryParameter}&category=${selectedCategory}`;
        saveInLocalStorage("searchMessage", `${editedCountryParameter} in category: ${selectedCategory}`);  
        return searchParameter;
    }
    else{
        saveInLocalStorage("searchMessage", `${selectedCountry}`);  
        return countryParameter;
    }
} // createParameterFromSelections collapse

function createParameterFromInput(keyword){
    const searchParameter = `everything?q=${keyword}`;
    return searchParameter;
} // createParameterFromInput collapse