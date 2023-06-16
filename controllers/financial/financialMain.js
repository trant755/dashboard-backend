<?php
    $servername = "fn469277.mysql.ukraine.com.ua";
    $username = "fn469277_db";
    $password = "AbmrdqNr";
    $db = "fn469277_db";

    $conn = mysqli_connect($servername, $username, $password, $db);

    $hromadas_arr = array('Великобийганська ТГ', 'Вилоцька ТГ', 'Виноградівська ТГ', 'Батівська ТГ', 'Пийтерфолвівська ТГ', 'Королівська ТГ', 'Великоберезька ТГ', 'Камянська ТГ', 'Берегівська ТГ', 'Косоньська ТГ', 'Івановецька ТГ', 'Полянська ТГ', 'Мукачівська ТГ', 'Верхньокоропецька ТГ', 'Неліпинська ТГ', 'Великолучківська ТГ', 'Горондівська ТГ', 'Жденіївська ТГ', 'Кольчинська ТГ', 'Нижньоворітська ТГ', 'Свалявська ТГ', 'Чинадіївська ТГ', 'Воловецька ТГ', 'Великобичківська ТГ', 'Рахівська ТГ', 'Ясінянська ТГ', 'Богданська ТГ', 'Усть-Чорнянська ТГ', 'Углянська ТГ', 'Вільховецька ТГ', 'Нересницька ТГ', 'Бедевлянська ТГ', 'Тячівська ТГ', 'Солотвинська ТГ', 'Буштинська ТГ', 'Дубівська ТГ', 'Тересвянська ТГ', 'Оноківська ТГ', 'Перечинська ТГ', 'Турє-Реметівська ТГ', 'Чопська ТГ', 'Середнянська ТГ', 'Сюртівська ТГ', 'Дубриницько-Малоберезнянська ТГ', 'Костринська ТГ', 'Ставненська ТГ', 'Ужгородська ТГ', 'Холмківська ТГ', 'Баранинська ТГ', 'Великоберезнянська ТГ', 'Великодобронська ТГ', 'Колочавська ТГ', 'Драгівська ТГ', 'Керецьківська ТГ', 'Зарічанська ТГ', 'Синевирська ТГ', 'Горінчівська ТГ', 'Міжгірська ТГ', 'Іршавська ТГ', 'Білківська ТГ', 'Вишківська ТГ', 'Пилипецька ТГ', 'Хустська ТГ', 'Довжанська ТГ');

    $final = array();

    for ($i = 0; $i < count($hromadas_arr); $i++) {
        $sql = "SELECT * FROM budget_dash WHERE nazva_hromady = '$hromadas_arr[$i]'";
        $result = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_array($result)) {

            $rating = floatval($row['fact_dokhodiv_points']) + floatval($row['riven_vykonan_dokhodiv_points']) + floatval($row['temp_rostu_nadkhodzhen_points']) + floatval($row['temp_rostu_mistsevych_podatkiv_nadkhodzhennia_points']) + floatval($row['obsiah_nezabezpechenoi_potreby_points']) + floatval($row['padatkovy_borh_points']) + floatval($row['amount_cashier_points']) + floatval($row['spivvidnoshennia_cash_vydatkiv_points']);
        }


        array_push($final, $rating);
    }
    
    $final_result = array();
    
    array_push($final_result, $final);
    array_push($final_result, $hromadas_arr);

    header('Content-Type: application/json');

    echo json_encode($final_result);

?>