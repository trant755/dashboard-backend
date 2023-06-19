<?php
    // $data = json_decode(file_get_contents('php://input'), true);
    
    $servername = "fn469277.mysql.ukraine.com.ua";
    $username = "fn469277_db";
    $password = "AbmrdqNr";
    $db = "fn469277_db";
    
    $conn = mysqli_connect($servername, $username, $password, $db);
    
    $currentHromada = $_POST['value'];
    $currentType = $_POST['typeValue'];
    
    if($currentHromada && $currentType) {
    
    // $sql = 'SELECT pandus, temp_place, stairs, snitar_room, brail, tech_sol FROM cas WHERE district = $currentDistrict';
    $sql = "SELECT * FROM cas WHERE hromada = '$currentHromada' AND type = '$currentType'";

    $result = mysqli_query($conn, $sql);
    
    // $invalid_sevices = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    // print_r($invalid_sevices);
    
    $final_result = array();
    
    $pandus = array();
    $temp_place = array();
    $stairs = array();
    $snitar_room = array();
    $brail = array();
    $tech_sol = array();
    
    while($row = mysqli_fetch_assoc($result)){
        array_push($pandus, $row['pandus']);
        array_push($temp_place, $row['temp_place']);
        array_push($stairs, $row['stairs']);
        array_push($snitar_room, $row['snitar_room']);
        array_push($brail, $row['brail']);
        array_push($tech_sol, $row['tech_sol']);
    }
    
    array_push($final_result, $pandus);
    array_push($final_result, $temp_place);
    array_push($final_result, $stairs);
    array_push($final_result, $snitar_room);
    array_push($final_result, $brail);
    array_push($final_result, $tech_sol);

    
    // $superTest = array ($invalid_sevices[0][0], 1);
    
    header('Content-Type: application/json');

    echo json_encode($final_result);
    } else {
            header('Content-Type: application/json');

    echo json_encode("404");
    }
?>