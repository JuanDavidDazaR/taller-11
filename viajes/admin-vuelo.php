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
        <h1 class="text-center">Gestión de Vuelos</h1>
        <div class="text-center mb-4">
            <a href="admin.php" class="btn btn-admin">Volver al Panel de Administración</a>
            <button type="button" class="btn btn-admin" data-bs-toggle="modal" data-bs-target="#addVueloModal">Agregar Nuevo Vuelo</button>
        </div>
        
        <!-- Lista de vuelos -->
        <div class="card">
            <div class="card-header">Vuelos Disponibles</div>
            <div class="card-body">
                <?php
                // Mostrar lista de vuelos
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
    </div>
    <!-- Modal para agregar un nuevo vuelo -->
    <div class="modal fade" id="addVueloModal" tabindex="-1" aria-labelledby="addVueloModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addVueloModalLabel">Agregar Nuevo Vuelo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="crear-vuelo.php" method="post">
                        <div class="mb-3">
                            <label for="ciudadOrigen" class="form-label">Ciudad De Origen</label>
                            <input type="text" name="ciudadOrigen" class="form-control" id="ciudadOrigen" required>
                        </div>
                        <div class="mb-3">
                            <label for="ciudadDestino" class="form-label">Ciudad De Destino</label>
                            <input type="text" name="ciudadDestino" class="form-control" id="ciudadDestino" required>
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
                            <button type="submit" class="btn btn-primary">Crear Vuelo</button>
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


