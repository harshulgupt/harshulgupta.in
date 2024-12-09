    <!DOCTYPE HTML>
    <html>

    <head>
        <title>Harshul Gupta | Contact Me</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
        <link rel='stylesheet' href='https://unpkg.com/aos@2.3.0/dist/aos.css'>
        <link rel="stylesheet" href="./aosstyle.css">
        <link rel="icon" type="image/png" href="uni.png" />
  	<script src="https://www.google.com/recaptcha/api.js"></script> 

        <link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="js/jquery.min.js"></script>
        <!-- Custom Theme files -->
        <link href="css/style.css" rel='stylesheet' type='text/css' />
        <!-- Custom Theme files -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!-- webfonts -->
        <link href='//fonts.googleapis.com/css?family=Asap:400,700,400italic' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
        <!-- webfonts -->
        <!---- start-smoth-scrolling---->
        <script type="text/javascript" src="js/move-top.js"></script>
        <script type="text/javascript" src="js/easing.js"></script>
        <script type="text/javascript">
            jQuery(document).ready(function ($) {
                $(".scroll").click(function (event) {
                    event.preventDefault();
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
                });
            });
        </script>
        <!---- start-smoth-scrolling---->
    </head>

    <body>


        <!-- container -->
        <!-- header -->
        <div id="home" class="header">
            <div class="container">
                <!-- top-hedader -->
                <div class="top-header">
                    <!-- /logo -->
                    <!--top-nav---->
                    <div class="top-nav">
                        <div class="navigation">
                            <div class="logo">
                                <h1><a href="index.html"><span>H</span>ARSHUL</a></h1>
                            </div>
                            <div class="navigation-right">
                                <span class="menu"><img src="images/menu.png" alt=" " /></span>
                                <nav class="link-effect-3" id="link-effect-3">
                                    <ul class="nav1 nav nav-wil">
                                        <li><a data-hover="Home" href="index.html">Home</a></li>
                                        <li><a data-hover="About" href="about.html">About</a></li>
                                        <li><a data-hover="Services" href="services.html">Services</a></li>
                                        <li><a data-hover="Experience" href="experience.html">Experience</a></li>
                                        <li><a data-hover="Portfolio" href="portfolio.html">Portfolio</a></li>
                                        <li><a data-hover="Interests" href="interests.html">Interests</a></li>
                                        <li><a data-hover="Blog" href="blogs.html">Blog</a></li>
                                        <li class="active"><a data-hover="Contact" href="contact.html">Contact</a></li>

                                    </ul>
                                </nav>
                                <!-- script-for-menu -->
                                <script>
                                    $("span.menu").click(function () {
                                        $("ul.nav1").slideToggle(300, function () {
                                            // Animation complete.
                                        });
                                    });
                                </script>
                                <!-- /script-for-menu -->
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>




                    <!-- /top-hedader -->
                    <br>
                    <br>


                    <!-- contact -->
                    <div class="footer" id="contact">
                        <div class="container">
                            <div class="service-head one text-center" data-aos="zoom-in">
                                <!--<h4>CONTACT ME</h4>-->
    <?php
       
    if(isset($_POST['submit'])){
            $name=$_POST['name'];
            $email=$_POST['email'];
            $phone=$_POST['phone'];
            $msg=$_POST['msg'];
            $var = 'test';

	
            $to='harshulgupt@gmail.com'; 
            $subject='Website Demo';
            $message="Name :".$name."\n"."Phone :".$phone."\n"."Wrote the following :"."\n\n".$msg;
            $headers="From: ".$email;

            if(mail($to, $subject, $message, $headers)){
            echo "<h3>Thank You <span>"." ".$name." </span> <br>We will get in touch soon</h3>";
            
        }
            else{
                echo "<h3>Something went <span> wrong !</span></h3>";
            }
        }
    ?>
    <span class="border two"></span>
                            </div>
                            <div class="mail_us" data-aos="zoom-in">
                                <div class="col-md-6 mail_left" >
                                    <div class="contact-grid1-left">
                                        <div class="contact-grid1-left1">
                                            <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                                            <h4>Contact By Email</h4>
                                            <ul>
                                                <li>Mail1: <a href="mailto:harshulgupt@gmail.com">harshulgupt@gmail.com</a>
                                                </li>
                                                <li>Mail2: <a
                                                        href="mailto:harshulgupta1298@gmail.com">harshulgupta1298@gmail.com</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="contact-grid1-left">
                                        <div class="contact-grid1-left1">
                                            <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>
                                            <h4>Contact By Phone</h4>
                                            <ul>
                                                <li>Phone: +91-8209412638</li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="contact-grid1-left">
                                        <div class="contact-grid1-left1">
                                            <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
                                            <h4>Looking For Address</h4>
                                            <ul>
                                                <li>SKIT, Jaipur</li>
                                                <li>Jaipur, Rajasthan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="clearfix"> </div>
                                </div>
                                <div class="col-md-6 mail_right" >
                                    <form action="mail_handler.php" method="post" name="form">
                                        <input type="text" name="name" required placeholder="Name">
                                        <input type="email" name="email" placeholder="Email">
                                        <input type="text" name="phone" placeholder="Contact No">
                                        <textarea name="msg" placeholder="Message..." required></textarea>
					<div class="g-recaptcha" style="padding-bottom: 8px;" required data-sitekey="6LerxtEZAAAAADVn4l1B46V2exko3bp3fNzwVK-s"></div>

                                        <input type="submit" name="submit" value="Send">

                                    </form>
                                </div>
                                <div class="clearfix"></div>
                            </div>






                            <!-- contact -->






                            <a href="#home" id="toTop" style="display: block;"> <span id="toTopHover" style="opacity: 1;">
                                </span></a>
                            <!--start-smooth-scrolling-->
                            <script type="text/javascript">
                                $(document).ready(function () {
                                    /*
                                    var defaults = {
                                            containerID: 'toTop', // fading element id
                                        containerHoverID: 'toTopHover', // fading element hover id
                                        scrollSpeed: 1200,
                                        easingType: 'linear' 
                                        };
                                    */

                                    $().UItoTop({ easingType: 'easeOutQuart' });

                                });
                            </script>
                            <!--end-smooth-scrolling-->
                            <!-- //for bootstrap working -->
                            <script src="js/bootstrap.js"></script>

                            <script src='https://unpkg.com/aos@2.3.0/dist/aos.js'></script>
                            <script src="./aosscript.js"></script>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="copy_right text-center">
            <p>Designed & Developed by Harshul Gupta.</p>

        </div>
<script>window.onload = function() {
    var $recaptcha = document.querySelector('#g-recaptcha-response');

    if($recaptcha) {
        $recaptcha.setAttribute("required", "required");
    }
};
</script>
<style>
#g-recaptcha-response {
    display: block !important;
    position: absolute;
    margin: -78px 0 0 0 !important;
    width: 302px !important;
    height: 76px !important;
    z-index: -999999;
    opacity: 0;
}

    </body>

    </html>