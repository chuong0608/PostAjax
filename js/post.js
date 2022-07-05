
function abc() {
    document.getElementById("header").innerHTML = ` 
 <meta charset="UTF-8">
    <title>Title</title>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
          integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF"
            crossorigin="anonymous"></script>

    <link rel="stylesheet" href="../css/post.css">`

    document.getElementById("content").innerHTML = `
<div class="container">
    <div class="row">
    <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <!-- Button trigger modal -->
                        <a class="nav-link" type="button" class="btn btn-primary" data-toggle="modal"
                           data-target="#exampleModal" onclick="">Them</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                           id="search-name">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="search()">Search
                    </button>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="row">
        <div class="col-3">
        haha
        </div>
        <div class="col-6">
                <div class="row">
                         <div class="write-post-container mt-3">
                                              <form class="post-upload-textarea" enctype="multipart/form-data" id="form">
                                                            <textarea name="content" placeholder="Bạn đang nghĩ gì ? " id="content" cols="80%" rows="3"></textarea>
                                                            <input type="file" name="file"/>
                                                                     <button onclick="UploadFile()">Post</button>
                                              </form>  
                         </div>
                         
                          <div class="status-field-container write-post-container mt-3" id="display">
                               
                          </div>         
                </div>
        </div>
<div class="col-3">
hihi
</div>
`
    findAllHome(0)
}


function findAllHome(number) {
    $.ajax({
        type: "GET",
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/posts?page=" + number,
        success: function (array) {
            console.log(array)
            displayHome(array)
            if (number >= 0 && number < array.totalPages - 1) {
                document.getElementById("paging").innerHTML = `Current Page:<a style="color: blue" onclick="findAllHome(${array.pageable.pageNumber - 1})">Previous<\a> ${array.pageable.pageNumber + 1}/${array.totalPages} <a style="color: blue" onclick="findAllHome(${array.pageable.pageNumber + 1})">Next<\a> `
            }
        }

    })
}

function displayHome(array) {
    console.log(array)
    let str = "";
    for (let i = 0; i < array.content.length; i++) {
        str += `<div>${array.content[i].content}</div>
            <div><img style="width: 80%" height="" src="image/${array.content[i].image}"></div>
             <div>
             <small>${array.content[i].createAt}</small>
</div>
            `
    }
    document.getElementById("display").innerHTML = str;
}

function UploadFile() {
    let form = document.getElementById("form");
    let data = new FormData(form);
    $.ajax({
        type: "POST",
        headers:{
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/posts",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function (data) {
            console.log(data)

        }
    })
}