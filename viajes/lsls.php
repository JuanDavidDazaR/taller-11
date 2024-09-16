<div class="container">
        <h1 class="text-center">Crear Plan de Viaje</h1>

        <?php if (isset($crear_plan_result)): ?>
            <div class="alert alert-success" role="alert">
                <?php echo $crear_plan_result['mensaje']; ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="mb-3">
                <label for="usuario" class="form-label">Nombre de Usuario</label>
                <input type="text" class="form-control" id="usuario" name="usuario" required>
            </div>

            <div class="mb-3">
            <label for="vueloId" class="form-label">Selecciona un Vuelo</label>
                    <select id="vueloId" class="form-select" required>
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
                        <option value="<?php echo $hotel['nombre']; ?>"><?php echo $hotel['nombre'] . " - $" . $hotel['costo']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit" class="btn btn-custom">Crear Plan</button>
        </form>
    </div>