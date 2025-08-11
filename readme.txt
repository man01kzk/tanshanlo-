/* Дополнительно (инструкции, скрипт для PHP/сервер)     */
/* ----------------------------------------------------- */

/*
  1) Изображения и логотипы поместите в папку /assets/:
     - /assets/logo.png  (логотип Big Bro)
     - /assets/hero.jpg   (большое фото эвакуатора)
     - иконки: icon-car.svg, icon-bike.svg, icon-truck.svg, icon-crash.svg, icon-region.svg

  2) Google reCAPTCHA:
     - Получите SITE_KEY и SECRET_KEY на https://www.google.com/recaptcha/admin
     - В index.html замените REPLACE_WITH_SITE_KEY на ваш SITE_KEY
     - На сервере (/submit.php) отправляйте POST с полем 'g-recaptcha-response' и сверяйте через
       https://www.google.com/recaptcha/api/siteverify

  Пример серверной валидации (PHP):

  <?php
  // submit.php (пример)
  $secret = 'REPLACE_WITH_SECRET_KEY';
  $recaptcha = $_POST['g-recaptcha-response'] ?? '';
  $resp = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$recaptcha}");
  $json = json_decode($resp, true);
  if(!$json || !$json['success']){
    echo json_encode(['success'=>false, 'message'=>'reCAPTCHA validation failed']);
    exit;
  }
  // Дальше сохраняйте заявку в БД и отправляйте уведомления
  // ...
  echo json_encode(['success'=>true]);
  ?>

*/
