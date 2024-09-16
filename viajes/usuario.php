<?php
    // URL de los servicios API
    $vuelos_url = "http://localhost:3002/vuelos";
    $hoteles_url = "http://localhost:3003/hoteles";

    // Obtener la lista de vuelos
    $vuelos_curl = curl_init($vuelos_url);
    curl_setopt($vuelos_curl, CURLOPT_RETURNTRANSFER, true);
    $vuelos_response = curl_exec($vuelos_curl);
    curl_close($vuelos_curl);

    // Obtener la lista de hoteles
    $hoteles_curl = curl_init($hoteles_url);
    curl_setopt($hoteles_curl, CURLOPT_RETURNTRANSFER, true);
    $hoteles_response = curl_exec($hoteles_curl);
    curl_close($hoteles_curl);

    // Decodificar las respuestas JSON
    $vuelos = json_decode($vuelos_response, true) ?: [];
    $hoteles = json_decode($hoteles_response, true) ?: [];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Planes de Viaje</title>
    <style>
        body {
            background-color: #f0f8ff;
        }
        .container {
            margin-top: 20px;
        }
        .table-header {
            background-color: #007bff;
            color: white;
        }
        .table tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .btn-custom {
            background-color: #28a745;
            color: white;
        }
        .btn-custom:hover {
            background-color: #218838;
        }
        .btn-logout {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #dc3545;
            color: white;
        }
        .btn-logout:hover {
            background-color: #c82333;
        }
        .tables-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
        }
        .table-container {
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="logout.php" class="btn btn-logout">Cerrar Sesión</a>

        <h1 class="my-4">Bienvenido a la Planificación de Viajes</h1>

        <div class="tables-container">
            <!-- Tabla de vuelos -->
            <div class="table-container">
                <h2>Vuelos Disponibles</h2>
                <table class="table table-striped">
                    <thead class="table-header">
                        <tr>
                            <th>ID</th>
                            <th>Ciudad Origen</th>
                            <th>Ciudad Destino</th>
                            <th>Capacidad</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($vuelos as $vuelo): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($vuelo['id']); ?></td>
                            <td><?php echo htmlspecialchars($vuelo['ciudadOrigen']); ?></td>
                            <td><?php echo htmlspecialchars($vuelo['ciudadDestino']); ?></td>
                            <td><?php echo htmlspecialchars($vuelo['capacidad']); ?></td>
                            <td><?php echo htmlspecialchars($vuelo['costo']); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <!-- Tabla de hoteles -->
            <div class="table-container">
                <h2>Hoteles Disponibles</h2>
                <table class="table table-striped">
                    <thead class="table-header">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Ciudad</th>
                            <th>Capacidad</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($hoteles as $hotel): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($hotel['id']); ?></td>
                            <td><?php echo htmlspecialchars($hotel['nombre']); ?></td>
                            <td><?php echo htmlspecialchars($hotel['ciudad']); ?></td>
                            <td><?php echo htmlspecialchars($hotel['capacidad']); ?></td>
                            <td><?php echo htmlspecialchars($hotel['costo']); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="container">
        <h1 class="text-center">Crear Plan de Viaje</h1>

        <form method="POST" action="crear-plan.php">
            <div class="mb-3">
                <label for="usuario" class="form-label">Nombre de Usuario</label>
                <input type="text" class="form-control" id="usuario" name="usuario" required>
            </div>

            <div class="mb-3">
                <label for="vuelo" class="form-label">Selecciona un Vuelo</label>
                <select id="vuelo" class="form-select" name="vuelo" required>
                    <option value="">Selecciona un vuelo</option>
                    <?php foreach ($vuelos as $vuelo): ?>
                    <option value="<?php echo htmlspecialchars($vuelo['id']); ?>">
                        <?php echo htmlspecialchars($vuelo['ciudadOrigen']); ?> - <?php echo htmlspecialchars($vuelo['ciudadDestino']); ?>
                    </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="mb-3">
                <label for="hotel" class="form-label">Seleccionar Hotel</label>
                <select class="form-select" id="hotel" name="hotel" required>
                    <option value="">Selecciona un hotel</option>
                    <?php foreach ($hoteles as $hotel): ?>
                        <option value="<?php echo htmlspecialchars($hotel['nombre']); ?>">
                            <?php echo htmlspecialchars($hotel['nombre']) . " - $" . htmlspecialchars($hotel['costo']); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit" class="btn btn-custom">Crear Plan</button>
        </form>
    </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>


