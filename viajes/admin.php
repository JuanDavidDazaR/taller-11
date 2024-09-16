<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
        body {
            background-color: #f1f5f9;
            color: #212529;
            font-family: Arial, sans-serif;
        }
        .container {
            margin-top: 40px;
        }
        .card-header {
            background-color: #007BFF;
            color: white;
            font-size: 18px;
        }
        .card-body {
            background-color: #ffffff;
        }
        .btn-admin {
            background-color: #007BFF;
            color: white;
            border-radius: 8px;
            padding: 10px 20px;
            font-size: 16px;
            margin: 10px;
            text-decoration: none;
            display: inline-block;
        }
        .btn-admin:hover {
            background-color: #0056b3;
        }
        .btn-danger {
            background-color: #dc3545;
            border: none;
            padding: 10px 20px;
            text-decoration: none;
            color: white;
        }
        .btn-danger:hover {
            background-color: #c82333;
        }
        .btn-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        h1 {
            color: #007BFF;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Panel de Administración</h1>
        <div class="btn-container text-center">
            <a href="admin-vuelo.php" class="btn btn-admin">Gestionar Vuelos</a>
            <a href="admin-hotel.php" class="btn btn-admin">Gestionar Hoteles</a>
            <a href="admin-plan.php" class="btn btn-admin">Ver los Planes</a>
            <a href="logout.php" class="btn btn-danger">Cerrar Sesión</a>
        </div>
        
        <!-- Sección de Vuelos -->
        <div class="card mb-3">
            <div class="card-header">Vuelos Disponibles</div>
            <div class="card-body">
                <?php
                // URL del servicio API para obtener los vuelos
                $vuelos_url = "http://localhost:3002/vuelos";
                $curl = curl_init($vuelos_url);

                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($curl);
                curl_close($curl);

                // Decodificar la respuesta JSON en un arreglo
                $vuelos = json_decode($response, true);

                if (is_array($vuelos) && count($vuelos) > 0) {
                    echo '<table class="table table-striped">';
                    echo '<thead><tr><th>ID</th><th>Ciudad Origen</th><th>Ciudad Destino</th><th>Capacidad</th><th>Costo</th></tr></thead>';
                    echo '<tbody>';
                    foreach ($vuelos as $vuelo) {
                        echo '<tr>';
                        echo '<td>' . htmlspecialchars($vuelo['id']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['ciudadOrigen']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['ciudadDestino']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['capacidad']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['costo']) . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody>';
                    echo '</table>';
                } else {
                    echo '<p>No hay vuelos disponibles.</p>';
                }
                ?>
            </div>
        </div>

        <!-- Sección de Hoteles -->
        <div class="card">
            <div class="card-header">Hoteles Disponibles</div>
            <div class="card-body">
                <?php
                // URL del servicio API para obtener los hoteles
                $hoteles_url = "http://localhost:3003/hoteles";
                $curl = curl_init($hoteles_url);

                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($curl);
                curl_close($curl);

                // Decodificar la respuesta JSON en un arreglo
                $hoteles = json_decode($response, true);

                if (is_array($hoteles) && count($hoteles) > 0) {
                    echo '<table class="table table-striped">';
                    echo '<thead><tr><th>ID</th><th>Nombre</th><th>Ciudad</th><th>Capacidad</th><th>Costo</th></tr></thead>';
                    echo '<tbody>';
                    foreach ($hoteles as $hotel) {
                        echo '<tr>';
                        echo '<td>' . htmlspecialchars($hotel['id']) . '</td>';
                        echo '<td>' . htmlspecialchars($hotel['nombre']) . '</td>';
                        echo '<td>' . htmlspecialchars($hotel['ciudad']) . '</td>';
                        echo '<td>' . htmlspecialchars($hotel['capacidad']) . '</td>';
                        echo '<td>' . htmlspecialchars($hotel['costo']) . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody>';
                    echo '</table>';
                } else {
                    echo '<p>No hay hoteles disponibles.</p>';
                }
                ?>
            </div>
        </div>
    </div>
</body>
</html>



