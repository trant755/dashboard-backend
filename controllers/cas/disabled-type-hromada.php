<?php
    $servername = "fn469277.mysql.ukraine.com.ua";
    $username = "fn469277_db";
    $password = "AbmrdqNr";
    $db = "fn469277_db";
    
    $conn = mysqli_connect($servername, $username, $password, $db);

    $district = $_POST['district'];
    $hromada = $_POST['hromada'];

    $sql = "SELECT * FROM cas WHERE district = '$district' AND hromada = '$hromada' AND type = 'ЦНАП'";

    $result = mysqli_query($conn, $sql);

    $type_cas = 0; 

    while($row = mysqli_fetch_assoc($result)){
        $type_cas++;
    }

    $sql2 = "SELECT * FROM cas WHERE district = '$district' AND hromada = '$hromada' AND type = 'ТП'";

    $result2 = mysqli_query($conn, $sql2);

    $type_tp = 0;

    while($row = mysqli_fetch_assoc($result2)){
        $type_tp++;
    }

    $sql3 = "SELECT * FROM cas WHERE district = '$district' AND hromada = '$hromada' AND type = 'ВРМ'";

    $result3 = mysqli_query($conn, $sql3);

    $type_vrm = 0;

    while($row = mysqli_fetch_assoc($result3)) {
        $type_vrm++;
    }

    $sql4 = "SELECT * FROM cas WHERE district = '$district' AND hromada = '$hromada' AND type = 'Дія Центр'";
    
    $result4 = mysqli_query($conn, $sql4);

    $type_diia = 0;

    while($row = mysqli_fetch_assoc($result4)){
        $type_diia++;
    }

    $final_arr = array($type_cas, $type_tp, $type_vrm, $type_diia);

    header('Content-Type: application/json');
    echo json_encode($final_arr); 