import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

const Tareas = () => {

    // State inicial de la aplicación
    const [tarea, setTarea] = useState('')

    // State cuando se agrega una nueva tarea
    const [tareas, setTareas] = useState([])

    // State para editar las tareas
    const [modoEdicion, setModoEdicion] = useState(false)

    // State para obtener los id
    const [id, setId] = useState('')

    // State para marcar error del formulario
    const [error, setError] = useState(null)

    // Guardar las tareas en localStorage y no perderlas al recargar la app
    useEffect(() => {
        const getTareas = JSON.parse(localStorage.getItem('tareas'))

        if (getTareas) {
            setTareas(getTareas)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }, [tareas])

    // Cuando se agrega una tarea
    function agregarTarea(event) {

        event.preventDefault();

        // Validación de los campos del formulario
        if (!tarea.trim()) {
            setError('Porfavor escribe algo...');
            return;
        }

        // Si pasa por la validación
        setTareas([
            ...tareas,
            {
                id: nanoid(10),
                nombreTarea: tarea
            }
        ]);
        // Reseteo del formulario
        setTarea('');
        setError(null);
    }

    // Edición de las tareas
    const editar = item => {
        setModoEdicion(true);
        //Activamos la tarea en formulario
        setTarea(item.nombreTarea);
        // Obtenemos id del item
        setId(item.id)
    }

    const editarTarea = e => {
        e.preventDefault()
        if (!tarea.trim()) {
            setError('Porfavor escribe algo...');
            return
        }
        const arrayEditado = tareas.map(item =>
            item.id === id ? { id: id, nombreTarea: tarea } : item
        )
        setTareas(arrayEditado)
        // Devolvemos los valores a predeterminado
        setModoEdicion(false);
        setTarea('');
        setId('')
        setError(null)
    }

    // Eliminación del formulario
    const eliminarTarea = id => {
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado)
    }

    return (
        <>
            <h1 className="App-titulo">Tareas :D</h1>
            <h5 className="App-titulo-fomulario">
                {
                    modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                }
            </h5>
            <div className="App-Contenedor-formulario">
                <form className="App-formulario" onSubmit={modoEdicion ? editarTarea : agregarTarea}>
                    {
                        error ? <span className="App-formulario-error">{error}</span> : null
                    }
                    <input
                        type="text"
                        className="App-input-form"
                        placeholder="Agregar tarea"
                        onChange={e => setTarea(e.target.value)}
                        value={tarea}
                    />
                    {
                        modoEdicion ? (
                            <button type="submit" className="App-btn-form App-btn-editar">Editar</button>
                        ) : (
                            <button type="submit" className="App-btn-form App-btn-Agregar">Agregar</button>
                        )
                    }
                </form>
            </div>
            
            <div className="App-tareas">
                {
                    tareas.length === 0 ? (
                        <h3 className="App-tareas-no">No hay tareas</h3>
                    ) :
                        (
                            tareas.map(item => (
                                <li className="App-tareas-item" key={item.id}>
                                    <p className='App-nombre-tareas'>{item.nombreTarea}</p>
                                    <div className="App-btn-tareas">
                                        <button
                                            class="App-btn App-editar"
                                            onClick={() => editar(item)} >
                                            Editar
                                        </button>
                                        <button
                                            class="App-btn App-eliminar"
                                            onClick={() => eliminarTarea(item.id)} >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))
                        )
                }
            </div>
        </>
    )
};

export default Tareas;
