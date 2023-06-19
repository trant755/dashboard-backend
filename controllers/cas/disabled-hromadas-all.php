<?php
    $servername = "fn469277.mysql.ukraine.com.ua";
    $username = "fn469277_db";
    $password = "AbmrdqNr";
    $db = "fn469277_db";
    
    $conn = mysqli_connect($servername, $username, $password, $db);

    $district = $_POST['current'];
    $hromada = $_POST['currentHromada'];

    $sql = "SELECT * FROM cas WHERE district = '$district' AND hromada = '$hromada' AND type = 'ЦНАП'";

    $result = mysqli_query($conn, $sql);

    $districtAll_stats = 0;

    while($row = mysqli_fetch_array($result)) {
        $districtAll_stats++;
    }

    $sql2 = "SELECT * FROM cas WHERE district = '$district' AND hromada = '$hromada' AND open = 1 AND type = 'ЦНАП'";

    $result2 = mysqli_query($conn, $sql2);

    $districtAll_stats_opened = 0;

    while($row = mysqli_fetch_array($result2)) {
        $districtAll_stats_opened++;
    }

    $districtAll_stats = array($districtAll_stats, $districtAll_stats_opened);

    header('Content-Type: application/json');

    echo json_encode($districtAll_stats);

?>