<?php 
    try{
   	    $conn = new PDO('mysql:host=YOURHOST;dbname=YOURDB','USERNAME','PASSWORD');
    } 
    catch (PDOException $e) {
   	    echo "Database connection error " . $e->getMessage();
    }
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $location = $_POST['location'];
    $checkin = $_POST['checkin'];
    $checkout = $_POST['checkout'];

    $query = $conn->prepare("INSERT INTO yourtablename (name, phone, location, checkin, checkout) VALUES (?, ?, ?, ?, ?)");
    $query->bind_param("sisss", $name, $phone, $location, $checkin, $checkout);
    $result = $query->execute();

    if ($result === TRUE) {
        echo "<div id='success'><h2>Recorded successully! Thank you and stay safe</h2></div>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
?>
