        // Función para abrir el modal de edición
        function editarAlumno(button) {
            const modal = document.getElementById("modalEditar");
            modal.style.display = "block";

            // Obtener la fila actual
            const row = button.parentNode.parentNode;

            // Obtener los datos del alumno
            const nombre = row.cells[0].textContent;
            const edad = row.cells[1].textContent;
            const curso = row.cells[2].textContent;

            // Rellenar el formulario de edición con los datos del alumno
            document.getElementById("nombre").value = nombre;
            document.getElementById("edad").value = edad;
            document.getElementById("curso").value = curso;

            // Configurar el formulario para que actualice los datos cuando se envíe
            const editarForm = document.getElementById("formularioEditar");
            editarForm.onsubmit = function (event) {
                event.preventDefault();

                // Actualizar los datos del alumno en la fila
                row.cells[0].textContent = document.getElementById("nombre").value;
                row.cells[1].textContent = document.getElementById("edad").value;
                row.cells[2].textContent = document.getElementById("curso").value;

                // Cerrar el modal
                cerrarModalEditar();
            };
        }

        // Función para eliminar un alumno
        function eliminarAlumno(button) {
            const row = button.parentNode.parentNode;
            const table = document.getElementById("alumnosTable");
            table.deleteRow(row.rowIndex);
        }

        // Función para abrir el modal de agregar alumno
        function abrirModalAgregar() {
            const modal = document.getElementById("modalAgregar");
            modal.style.display = "block";

            // Configurar el formulario para agregar un alumno cuando se envíe
            const agregarForm = document.getElementById("formularioAgregar");
            agregarForm.onsubmit = function (event) {
                event.preventDefault();

                const table = document.getElementById("alumnosTable");
                const newRow = table.insertRow(table.rows.length);

                const nombreCell = newRow.insertCell(0);
                const edadCell = newRow.insertCell(1);
                const cursoCell = newRow.insertCell(2);
                const accionesCell = newRow.insertCell(3);

                const nombre = document.getElementById("nombreAgregar").value;
                const edad = document.getElementById("edadAgregar").value;
                const curso = document.getElementById("cursoAgregar").value;

                nombreCell.textContent = nombre;
                edadCell.textContent = edad;
                cursoCell.textContent = curso;

                const editarButton = document.createElement("button");
                editarButton.textContent = "Editar";
                editarButton.className = "editar-button";
                editarButton.onclick = function () {
                    editarAlumno(this);
                };

                const eliminarButton = document.createElement("button");
                eliminarButton.textContent = "Eliminar";
                eliminarButton.className = "eliminar-button";
                eliminarButton.onclick = function () {
                    eliminarAlumno(this);
                };

                accionesCell.appendChild(editarButton);
                accionesCell.appendChild(eliminarButton);

                // Cerrar el modal
                cerrarModalAgregar();
            };
        }

        // Función para cerrar el modal de edición
        function cerrarModalEditar() {
            const modal = document.getElementById("modalEditar");
            modal.style.display = "none";
        }

        // Función para cerrar el modal de agregar alumno
        function cerrarModalAgregar() {
            const modal = document.getElementById("modalAgregar");
            modal.style.display = "none";
        }