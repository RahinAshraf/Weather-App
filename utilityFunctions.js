function saveCityToLocalStorage(city) {
    let previousSearches = loadSearchesFromLocalStorage();
    if (!previousSearches.includes(city)) {
        previousSearches.push(city);
        localStorage.setItem('searches', JSON.stringify(previousSearches));
    }
}

function loadSearchesFromLocalStorage() {
    const searches = localStorage.getItem('searches');
    return searches ? JSON.parse(searches) : [];
}

function loadPreviousSearches() {
    const searches = loadSearchesFromLocalStorage();
    if (searches.length > 0) {
        searches.forEach(city => {
            // Render or display previous searches if needed
            console.log(`Previously searched city: ${city}`);
        });
    }
}
