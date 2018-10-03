//function to watch form, will need to send handle to the function
//that has the fetch function

function watchForm() {
    $('#js-form').submit(event => {
      event.preventDefault();
      const githubHandle = $('#js-github-handle').val();
      getRepo(githubHandle);
    })
  }
  
  //formulate url for fetch to look at
  function getURL(githubHandle) {
    return `https://api.github.com/users/${githubHandle}/repos?access_token=f80c215e3eaded8ceb999819232d0069e1fa586b`
  }
  
  function displayRepos(responseJson) {
    console.log(responseJson)
    //empty results from last search
    $('#js-search-results').empty();
    $('#js-search-results').append(`<h3>Github Handle: ${responseJson[0].owner.login}</h3>`);
    //append repos via for loop
    for(let i = 0; i < responseJson.length; i++) {
    $('#js-search-results').append(`
      <li><p>Repo Name: ${responseJson[i].name}</p>
      <p>Repo URL: <a target = "_blank" href = "${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`)}
  }
  
  //function to fetch repos of user
  function getRepo(githubHandle) {
    const userURL = getURL(githubHandle);
    fetch(userURL).then(response => {
    if(response.ok) {
      $('#js-error-message').text("");
      return response.json();
    }
    else
      throw new Error(response.statusText);})
    .then(responseJson => {
      displayRepos(responseJson);
      $('#js-github-handle').val("");
    })
    .catch(err => {
      $('#js-error-message').text(`Something Went Wrong: ${err.message}`);
      $('#js-github-handle').val("");
      $('#js-search-results').empty();
    });
  }
  
  //function to display repos
  
  $(watchForm);