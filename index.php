<?php
// router.php 
$route = false;
if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
    return false; // Serve the requested resource as-is 
} else {
    $route = true;
}

// get manifest
$string = file_get_contents("public/manifest.json");
$manifest = json_decode($string, true);

?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php if($route){echo 'PHP ';} ?>Starter webpack</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="/public<?php echo $manifest['app.css'] ?>">

    <style>
        .pre-hide {opacity: 0}
    </style>

</head>
<body>
    <div class="container">
        <div class="shadow">
        <header class="header">
            <nav class="nav menu-top">
                <a href="" class="menu-top-link nav-link active">Home</a>
                <a href="" class="menu-top-link nav-link">Press</a>
                <a href="" class="menu-top-link nav-link">Galery</a>
                <a href="" class="menu-top-link nav-link">Contact</a>
            </nav>

            <div class="header-img">
                <img src="#" alt="" class="header-img-single">
            </div>
        </header>

        <section class="slider col">
            <h1>Hello, world!</h1>
            <p>You've successfully loaded up the Bootstrap npm starter project!</p>
            <p>If this button looks blue, you've done it.</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Click me!</button>

              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Success!</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      If you're seeing this modal after clicking the button on the page, Bootstrap's CSS and JS are both working properly.
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn--md btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn--md btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
        </section>

        <nav aria-label="breadcrumb" class="mt-5">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item"><a href="#">Library</a></li>
              <li class="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav>

        <section class="news row">

            <articles class="col-xs-12 col-md-4">
                <h2 class="news-title">news title</h2>
                <div class="news-description">news description</div>
                <picture class="news-picture">
                    <source media="(min-width:650px)" srcset="/public/images/article@grande.jpg">
                    <source media="(min-width:465px)" srcset="/public/images/article@petite.jpg">
                        <img class="news-picture-img" src="/public/images/article.jpg" alt="Flowers">
                </picture>
            </articles>

            <articles class="col-xs-12 col-md-4">
                <h2 class="news-title">news title</h2>
                <div class="news-description">news description</div>
                <picture class="news-picture">
                    <source media="(min-width:650px)" srcset="/public/images/article@grande.jpg">
                    <source media="(min-width:465px)" srcset="/public/images/article@petite.jpg">
                        <img class="news-picture-img" src="/public/images/article.jpg" alt="Flowers">
                </picture>
            </articles>

            <articles class="col-xs-12 col-md-4">
                <h2 class="news-title">news title</h2>
                <div class="news-description">news description</div>
                <picture class="news-picture">
                    <source media="(min-width:650px)" srcset="/public/images/article@grande.jpg">
                    <source media="(min-width:465px)" srcset="/public/images/article@petite.jpg">
                        <img class="news-picture-img" src="/public/images/article.jpg" alt="Flowers">
                </picture>
            </articles>

        </section>

        <section class="animations">
            <video class="vs-source" controls>
                <source src="http://e5t.ro/jquery_videosync_demo.mp4" type="video/mp4">
            </video>
              <h2>Play the video to start</h2>
              <h3 class="vs animated" data-vs-in-time="1" data-vs-in-class="bounce">I will bounce on 1st second</h3>
              <h3 class="vs animated pre-hide" data-vs-in-time="3" data-vs-in-class="fadeIn">I will fadeIn on 3rd second</h3>
              <h3 class="vs animated pre-hide" data-vs-in-time="6" data-vs-in-class="fadeInDown" 
              data-vs-out-time="9" data-vs-out-class="fadeOutDown">I will fade in on 6th second and fade out on 9th</h3>
        </section>

       
        <footer class="footer">
            <div class="row">
                <div class="col-sx-12 col-md-2">
                    <address class="address">the author address <a href="mailto:webmaster.com">email</a></address>
                </div>
                <div class="col-sx-12 col-md-4"></div>
                <div class="col-sx-12 col-md-2"></div>
            </div>
        </footer>
    </div>
    </div>
</body>
<script src="/public<?php echo $manifest['app.js'] ?>"></script>
<script src="/public<?php echo $manifest['runtime.js'] ?>"></script>
<script src="/public<?php echo $manifest['vendors.js'] ?>"></script>
</html>