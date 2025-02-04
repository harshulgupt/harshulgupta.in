<?php
if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $msg = $_POST['msg'];
    $recaptchaResponse = $_POST['g-recaptcha-response']; // reCAPTCHA response

    // Secret key from reCAPTCHA admin panel
    $secretKey = '6Le-pssqAAAAAAbhgVGYTfAOsw0sEWSjUZQWG1jB'; 

    // Verify the reCAPTCHA response
    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptchaResponse");
    $responseData = json_decode($verifyResponse);

    // If reCAPTCHA is valid
    if($responseData->success){
        $to = 'harshulgupt@gmail.com'; // Receiver Email ID, Replace with your email ID
        $subject = 'Form Submission';
        $message = "Name :".$name."\n"."Phone :".$phone."\n"."Wrote the following :"."\n\n".$msg;
        $headers = "From: ".$email;

        if(mail($to, $subject, $message, $headers)){
            header('Location: https://www.harshulgupta.in');
            exit;
        }
        else{
            echo "Something went wrong!";
        }
    } else {
        echo "reCAPTCHA verification failed. Please try again.";
    }
}
?>
