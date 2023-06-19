<?php
    $servername = "fn469277.mysql.ukraine.com.ua";
    $username = "fn469277_db";
    $password = "AbmrdqNr";
    $db = "fn469277_db";

    $conn = new mysqli($servername, $username, $password, $db);
    
    $open_cas_all = "SELECT * FROM cas WHERE open = 1";
    $result_open_all = $conn->query($open_cas_all);
    $tsnap_open_all = 0;

    if ($result_open_all->num_rows > 0) {
    // output data of each row
        while($row = $result_open_all->fetch_assoc()) {
            $tsnap_open_all++;
        }
    } else {
        $final = "0 results";
    }
    
    $tsnap_open_all = $tsnap_open_all + 2;

    $open_cas = "SELECT * FROM cas WHERE open = 1 AND type = 'ЦНАП'";
    $result_open = $conn->query($open_cas);
    $tsnap_open = 0;

    if ($result_open->num_rows > 0) {
    // output data of each row
        while($row = $result_open->fetch_assoc()) {
            $tsnap_open++;
        }
    } else {
        $final = "0 results";
    }

    $closed_cas = "SELECT * FROM cas WHERE open = 0 AND type = 'ЦНАП'";

    $result_closed = $conn->query($closed_cas);

    $tsnap_closed = 0;

    if ($result_closed->num_rows > 0) {
    // output data of each row
        while($row = $result_closed->fetch_assoc()) {
            $tsnap_closed++;
        }
    } else {
        $final = "0 results";
    }

    $cas_tsnap = "SELECT * FROM cas WHERE type = 'ЦНАП' AND open = 1";

    $result_type_tsnap = $conn->query($cas_tsnap);

    $type_tsnap = 0;

    if ($result_type_tsnap->num_rows > 0) {
        while($row = $result_type_tsnap->fetch_assoc()) {
            $type_tsnap++;
        }
    }

    $cas_tp = "SELECT * FROM cas WHERE type = 'ТП'";

    $result_type_tp = $conn->query($cas_tp);

    $type_tp = 0;

    if($result_type_tp->num_rows > 0){
        while($row = $result_type_tp->fetch_assoc()) {
            $type_tp++;
        }
    }

    $cas_vrm = "SELECT * FROM cas WHERE type = 'ВРМ'";

    $result_type_vrm = $conn->query($cas_vrm);

    $type_vrm = 0;

    if($result_type_vrm->num_rows > 0) {
        while($row = $result_type_vrm->fetch_assoc()) {
            $type_vrm++;
        }
    }
    
    $type_vrm = $type_vrm - 1;

    $cas_dia = "SELECT * FROM cas WHERE type ='Дія Центр'";

    $result_type_dia = $conn->query($cas_dia);

    $type_dia = 0;

    if($result_type_dia->num_rows > 0) {
        while($row = $result_type_dia->fetch_assoc()) {
            $type_dia++;
        }
    }

    $allRegions = array('Берегівський', 'Мукачівський', "Рахівський", "Тячівський", "Ужгородський", "Хустський");

    $regionResults = array();
    
    $final = array();

    for($i = 0; $i < count($allRegions); $i++) {
        $currentRegion = $allRegions[$i];
        $selectRegion = "SELECT * FROM cas WHERE district = '$currentRegion'";
        $currentRegionResult = mysqli_query($conn, $selectRegion);
        $tempResult = array();

        $pandus = array();
        $temp_place = array();
        $stairs = array();
        $sanitar_room = array();
        $brail = array();
        $tech_sol = array();

        $rowQuant = 1;

        while($row_reg = mysqli_fetch_assoc($currentRegionResult)){
            array_push($pandus, $row_reg['pandus']);
            array_push($temp_place, $row_reg['temp_place']);
            array_push($stairs, $row_reg['stairs']);
            array_push($sanitar_room, $row_reg['snitar_room']);
            array_push($brail, $row_reg['brail']);
            array_push($tech_sol, $row_reg['tech_sol']);

            $rowQuant++;
        }

        array_push($tempResult, array_sum($pandus));
        array_push($tempResult, array_sum($temp_place));
        array_push($tempResult, array_sum($stairs));
        array_push($tempResult, array_sum($sanitar_room));
        array_push($tempResult, array_sum($brail));
        array_push($tempResult, array_sum($tech_sol));

        $rating = 100 / ($rowQuant*6)*array_sum($tempResult);

        array_push($final, $rating);

    }

    $allHromadas = array("Великобийганська", "Вилоцька", "Виноградівська", "Батівська", "Пийтерфолвівська", "Королівська", "Великоберезька", "Камянська", "Берегівська", "Косоньська", "Івановецька", "Полянська", "Мукачівська", "Верхньокоропецька", "Неліпинська", "Великолучківська", "Горондівська", "Жденіївська", "Кольчинська", "Нижньоворітська", "Свалявська", "Чинадіївська", "Воловецька", "Великобичківська", "Рахівська", "Ясінянська", "Богданська", 'Усть-Чорнянська', 'Углянська', 'Вільховецька', 'Нересницька', 'Бедевлянська', 'Тячівська', 'Солотвинська', 'Буштинська', 'Дубівська', 'Тересвянська', 'Оноківська', 'Перечинська', "Турє-Реметівська", 'Чопська', 'Середнянська', 'Сюртівська', 'Дубриницько-Малоберезнянська', 'Костринська', 'Ставненська', 'Ужгородська', 'Холмківська', 'Баранинська', 'Великоберезнянська', 'Великодобронська', 'Колочавська', 'Драгівська', 'Керецьківська', 'Зарічанська', 'Синевирська', 'Горінчівська', 'Міжгірська', 'Іршавська', 'Білківська', 'Вишківська', 'Пилипецька', 'Хустська', 'Довжанська');

    $hromadaArr = array();

    $final_result = array();

    for($i = 0; $i < count($allHromadas); $i++) {
        
        $currentHromada = $allHromadas[$i];
        $selectHromada = "SELECT * FROM cas WHERE hromada = '$currentHromada'";
        $hromadaRating = mysqli_query($conn, $selectHromada);

        array_push($hromadaArr, $currentHromada);

        $tempHromadaResult = array();
        $pandus = array();
        $temp_place = array();
        $stairs = array();
        $snitar_room = array();
        $brail = array();
        $tech_sol = array();

        $rowHromadaQuant = 1;

        while($row = mysqli_fetch_assoc($hromadaRating)){
            
            array_push($pandus, $row['pandus']);
            array_push($temp_place, $row['temp_place']);
            array_push($stairs, $row['stairs']);
            array_push($snitar_room, $row['snitar_room']);
            array_push($brail, $row['brail']);
            array_push($tech_sol, $row['tech_sol']);
            
            $rowHromadaQuant++;
        }

        array_push($tempHromadaResult, array_sum($pandus));
        array_push($tempHromadaResult, array_sum($temp_place));
        array_push($tempHromadaResult, array_sum($stairs));
        array_push($tempHromadaResult, array_sum($snitar_room));
        array_push($tempHromadaResult, array_sum($brail));
        array_push($tempHromadaResult, array_sum($tech_sol));

        if($rowHromadaQuant - 1 > 0) {

            $rating = 100/(6*($rowHromadaQuant - 1))*array_sum($tempHromadaResult);

            array_push($final_result, $rating);

        } else {
            array_push($final_result, 0);
        }

    }

    $exportingArr = array();

    array_push($exportingArr, $final_result);
    array_push($exportingArr, $hromadaArr);

    $tsnap_number = $tsnap_open + $tsnap_closed;

    $opened_and_closed = array($tsnap_number, $tsnap_open, $tsnap_closed, $type_tsnap, $type_tp, $type_vrm, $type_dia, $final, $exportingArr, $tsnap_open_all);

    header('Content-Type: application/json');

    echo json_encode($opened_and_closed);
?>