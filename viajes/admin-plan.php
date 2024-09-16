<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Vuelos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .container {
            margin-top: 40px;
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
        .card-header {
            background-color: #007BFF;
            color: white;
        }
        .form-control {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Gestión de Planes</h1>
        <div class="text-center mb-4">
            <a href="admin.php" class="btn btn-admin">Volver al Panel de Administración</a>
        </div>
        
        <!-- Lista de vuelos -->
        <div class="card">
            <div class="card-header">Planes Creados</div>
            <div class="card-body">
                <?php
                // Mostrar lista de vuelos
                $vuelos_url = "http://localhost:3004/planes";
                $curl = curl_init($vuelos_url);

                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($curl);
                curl_close($curl);

                // Decodificar la respuesta JSON en un arreglo
                $vuelos = json_decode($response, true);

                if (is_array($vuelos) && count($vuelos) > 0) {
                    echo '<table class="table table-striped">';
                    echo '<thead><tr><th>ID</th><th>Ciudad</th><th>vuelo</th><th>hotel</th><th>costo</th><th>usuario</th></tr></thead>';
                    echo '<tbody>';
                    foreach ($vuelos as $vuelo) {
                        echo '<tr>';
                        echo '<td>' . htmlspecialchars($vuelo['id']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['ciudad']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['vuelo']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['hotel']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['costo']) . '</td>';
                        echo '<td>' . htmlspecialchars($vuelo['usuario']) . '</td>';
                        echo '</tr>';
                    }
                    echo '</tbody>';
                    echo '</table>';
                } else {
                    echo '<p>No hay planes creados.</p>';
                }
                ?>
            </div>
        </div>
    </div>