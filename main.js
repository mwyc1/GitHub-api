//showError();
//showAvatar();
//showInfo();
//showRepositoryHead();
//printRepositories();

window.onload = function () {
    document.getElementById('search_button').addEventListener("click", function () {
        document.getElementById('error_and_info').innerHTML = "";
        document.getElementById('results').innerHTML = "";
        loadFirstJSON();
        //        loadSecondJSON();
    });
}

function showError() {
    var error = document.getElementById("error_and_info");
    var outputError = "";
    outputError += "<p>Does not exist</p>";
    var errorDiv = document.createElement("div");
    errorDiv.setAttribute("class", "error");
    errorDiv.innerHTML = outputError;
    error.append(errorDiv);
}

function showAvatar(data) {
    var avatar = document.getElementById("error_and_info");
    var outputAvatar = "";
    var avatarPhoto = data.avatar_url;
    outputAvatar += "<div class='foto' style='background-image: url(" + avatarPhoto + ")'></div>";
    var avatarDiv = document.createElement("div");
    avatarDiv.setAttribute("class", "avatar");
    avatarDiv.innerHTML = outputAvatar;
    avatar.append(avatarDiv);
}

function showInfo(data) {
    var username = data.login;
    var fullname = data.name
    var bio = data.bio;

    var info = document.getElementById("error_and_info");
    var outputInfo = "";
    outputInfo += "<div><p><i>@" + username + "</i></p></div>" +
        "<div><h1>" + fullname + "</h1></div>" +
        "<div><p>" + bio + "</p></div>";
    var avatarDiv = document.createElement("div");
    avatarDiv.setAttribute("class", "info");
    avatarDiv.innerHTML = outputInfo;
    info.append(avatarDiv);
}

function showRepositoryHead() {
    var header = document.getElementById("results");
    var outputRepoHead = "";
    outputRepoHead += "<h2>Repositories</h2>" +
        "<div class='dividerline'></div>" +
        "<div id='repos'></div>";
    var heading_and_line = document.createElement("div");
    heading_and_line.innerHTML = outputRepoHead;
    header.append(heading_and_line);
}

function printRepositories(data) {
    console.log(data);
    var repoName = data.name; 
    var repositoryForks = data.forks;
    var repositoryStargazers = data.stargazers_count;

    var repo = document.getElementById("repos");
    var outputRepos = "";
    outputRepos += "<div class='eachRepo_Details'>" +
        "<div class='eachRepoName'>" + repoName + "</div>" +
        "<div class='eachRepoLikes'>" +
        "<img src='/images/star.jpg'> " + repositoryStargazers +
        "<img src='/images/fork.jpg'> " + repositoryForks +
        "</div> " +
        "</div>" +

        "<div class='eachRepo_underLine'></div>";
    var eachRepo = document.createElement("div");
    eachRepo.setAttribute("class", "eachRepo");
    eachRepo.innerHTML = outputRepos;
    repo.append(eachRepo);

}


function loadFirstJSON() {
    var username = document.getElementById('username').value;
    var xmlhttpName = new XMLHttpRequest();
    xmlhttpName.overrideMimeType("application/json");
    xmlhttpName.open('GET', "https://api.github.com/users/" + username, true);
    xmlhttpName.onreadystatechange = function () {
        if (xmlhttpName.readyState == 4) {
            if (xmlhttpName.status == 200) {
                var obj = JSON.parse(xmlhttpName.responseText);

                console.log(obj);
                showAvatar(obj);
                showInfo(obj);
                loadSecondJSON();
            } else {
                showError();
                console.log("error");
            }
        }
    }
    xmlhttpName.send(null);
}

function loadSecondJSON() {
    var username = document.getElementById('username').value;
    var xmlhttpRepo = new XMLHttpRequest();
    xmlhttpRepo.overrideMimeType("application/json");
    xmlhttpRepo.open('GET', "https://api.github.com/users/" + username + "/repos", true);
    xmlhttpRepo.onreadystatechange = function () {
        if (xmlhttpRepo.readyState == 4) {
            if (xmlhttpRepo.status == 200) {
                var obj = JSON.parse(xmlhttpRepo.responseText);

                console.log(obj);
                showRepositoryHead();
                obj.forEach(function (value, key) {
                    printRepositories(value);
                });
                
                document.getElementById('username').value = "";

            }
        }
    }
    xmlhttpRepo.send(null);
}

function search() {
    console.log("hello ggggg");
}
