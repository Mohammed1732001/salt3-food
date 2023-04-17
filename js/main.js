var links = document.querySelectorAll(".nav-item .nav-link")
console.log(links);
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        console.log(e.target.text);
        var current = e.target.text
        getRecepi(current)
    })
}
getRecepi("pizza")
var data = []
function getRecepi(meal) {
    var http = new XMLHttpRequest()
    http.open("Get", `https://forkify-api.herokuapp.com/api/search?q=${meal}`)
    http.send()
    http.addEventListener("readystatechange", function () {
        if (http.readyState == 4 && http.status == 200) {
            data = JSON.parse(http.response).recipes;
            console.log(data);
            display()
        }
    })

}

function display() {
    cols = ``
    for (var i = 0; i < data.length; i++) {
        cols += `
        <div class="col-md-4 my-4 text-center">
                <div class="pb-3 shadow rounded parnt">
                <img src="${data[i].image_url}" class="images">
                <h4 class="lead my-3">${data[i].title}</h4>
                <a href=" ${data[i].source_url}" class="btn btn-info" >source</a>
                </div>
            </div>
        `
    }
    document.getElementById("rowData").innerHTML = cols
}