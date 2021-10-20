<?php
	// чтобы выводились ошибки
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require_once '/PHPMailer/PHPMailerAutoload.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->isSMTP();
	$mail->SMTPAuth = true;
	$mail->SMTPDebug = 0;
	 
	$mail->Host = '...///';
	$mail->Port = 465;
	$mail->Username = '...///';
	$mail->Password = '...///';

	
	//От кого письмо
	$mail->setFrom('...');
	//Кому отправить
	$mail->addAddress('gluk-90@list.ru');
	//Тема письма
	$mail->Subject = 'Привет! Это "Фрилансер по жизни"';


	//Тело письма
	$body = '<h1>Встречайте супер письмо!</h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['hand']))){
		$body.='<p><strong>Рука:</strong> '.$hand.'</p>';
	}
	if(trim(!empty($_POST['age']))){
		$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
	}
	
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
	// ini_set('display_errors', 1);
	// ini_set('display_startup_errors', 1);
	// error_reporting(E_ALL);

	// use PHPMailer\PHPMailer\PHPMailer;
	// use PHPMailer\PHPMailer\Exception;

	// require 'phpmailer/src/Exception.php';
	// require 'phpmailer/src/PHPMailer.php';

	// $mail = new PHPMailer(true);
	// $mail->CharSet = 'UTF-8';
	// $mail->setLanguage('ru', 'phpmailer/language/');
	// $mail->IsHTML(true);

	// //От кого письмо
	// if (trim(!empty($_POST['name'])) && trim(!empty($_POST['email']))){
	// 	$mail->setFrom($_POST['email'], $_POST['name']);
	// } else {
	// 	$mail->setFrom('robot@site.com');
	// }
	// //Кому отправить
	// $mail->addAddress('info@kb-sert.ru');
	// //Тема письма
	// $mail->Subject = 'Здравствуйте, нужна консультация"';


	// //Тело письма
	// $body = '<h1>Здравствуйте, нужна консультация</h1>';
	
	// if(trim(!empty($_POST['name']))){
	// 	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	// }
	// if(trim(!empty($_POST['phone']))){
	// 	$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
	// }
	// if(trim(!empty($_POST['email']))){
	// 	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	// }
	
	// if(trim(!empty($_POST['message']))){
	// 	$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	// }
	
	// $mail->msgHTML($body);

	// //Отправляем
	// try {
	// 	if (!$mail->send()) {
	// 		$message = 'Ошибка';
	// 	} else {
	// 		$message = 'Данные отправлены!';
	// 	}
	// } catch (\Exception $e) {
	// 	$message = $e->getMessage();
	// }

	// $response = ['message' => $message];

	// header('Content-type: application/json');
	// echo json_encode($response);
?>
