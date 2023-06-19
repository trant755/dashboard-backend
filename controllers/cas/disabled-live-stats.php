<?php
    $servername = "fn469277.mysql.ukraine.com.ua";
    $username = "fn469277_db";
    $password = "AbmrdqNr";
    $db = "fn469277_db";

    $conn = mysqli_connect($servername, $username, $password, $db);

    $district = $_POST['current'];

    if($district) {

        $sql = "SELECT * FROM cas WHERE district = '$district'";
    
        $result = mysqli_query($conn, $sql);
        
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
        
        header('Content-Type: application/json');
    
        echo json_encode($final_result);
        } else {
                header('Content-Type: application/json');
    
        echo json_encode($currentDistrict);
        }

?>