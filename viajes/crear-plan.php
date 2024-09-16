<?php
    // Recibir los datos del formulario
    $usuario = $_POST['usuario'];
    $vuelo = $_POST['vuelo'];
    $hotel = $_POST['hotel'];
    // Datos que se enviarán a la API
    $data = [
        'usuario' => $usuario,
        'vuelo' => $vuelo,
        'nombreHotel' => $hotel,
    ];

    // Convertir los datos a formato JSON
    $json_data = json_encode($data);

    // Inicializar cURL para hacer la petición POST a la API
    $curl = curl_init('http://localhost:3004/planes');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $json_data);

    // Ejecutar la petición y obtener la respuesta
    $response = curl_exec($curl);
    $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    // Decodificar la respuesta
    $result = json_decode($response, true);

    // Comprobar si la respuesta tiene el código de estado HTTP correcto
    if ($http_code === 200) {
        // Mostrar el resultado con un formato bonito
        if (isset($result['mensaje']) && isset($result['plan'][0]['insertId'])) {
            $planId = $result['plan'][0]['insertId'];
            // Obtener el costo de la respuesta si está disponible

            echo "<div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;'>";
            echo "<h2 style='color: #4CAF50;'>¡Plan creado exitosamente!</h2>";
            echo "<p style='font-size: 16px;'>¡Feliz viaje!</p>";
            echo "<p>Detalles del plan:</p>";
            echo "<ul>";
            echo "<li><strong>ID del Plan:</strong> $planId</li>";
            echo "<li><strong>Usuario:</strong> $usuario</li>";
            echo "<li><strong>Vuelo:</strong> $vuelo</li>";
            echo "<li><strong>Hotel:</strong> $hotel</li>";
            echo "</ul>";
            echo "</div>";
        } else {
            echo "<div style='color: red;'>Error: No se encontraron detalles del plan en la respuesta.</div>";
        }
    } else {
        // Mostrar el error
        echo "<div style='color: red;'>Error: " . (isset($result['mensaje']) ? $result['mensaje'] : 'Hubo un error al crear el plan.') . "</div>";
    }
?>



