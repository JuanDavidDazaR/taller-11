<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Hoteles</title>
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
        <h1 class="text-center">Gestión de Hoteles</h1>
        <div class="text-center mb-4">
            <a href="admin.php" class="btn btn-admin">Volver al Panel de Administración</a>
            <button type="button" class="btn btn-admin" data-bs-toggle="modal" data-bs-target="#addHotelModal">Agregar Nuevo Hotel</button>
        </div>
        
        <!-- Lista de hoteles -->
        <div class="card">
            <div class="card-header">Hoteles Disponibles</div>
            <div class="card-body">
                <?php
                // Mostrar lista de hoteles
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

    <!-- Modal para agregar un nuevo hotel -->
    <div class="modal fade" id="addHotelModal" tabindex="-1" aria-labelledby="addHotelModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addHotelModalLabel">Agregar Nuevo Hotel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="crear-hotel.php" method="post">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre del Hotel</label>
                            <input type="text" name="nombre" class="form-control" id="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="ciudad" class="form-label">Ciudad</label>
                            <input type="text" name="ciudad" class="form-control" id="ciudad" required>
                        </div>
                        <div class="mb-3">
                            <label for="capacidad" class="form-label">Capacidad</label>
                            <input type="number" name="capacidad" class="form-control" id="capacidad" required>
                        </div>
                        <div class="mb-3">
                            <label for="costo" class="form-label">Costo</label>
                            <input type="number" name="costo" class="form-control" id="costo" step="0.01" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary">Crear Hotel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz4fnFO9gWzc3XyK6qg6Hn4VLOFzM88OKwWsyfWYDnS9MbCK8pT8OGm/T" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
