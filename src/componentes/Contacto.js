import React, {useState} from 'react';
import styled from 'styled-components';
import db from './../firebase/firebaseConfig';

const Contacto = ({id, nombre, correo}) => {
    const [editarTarea, cambiarEditarTarea] = useState(false);
    const [nuevoNombre, cambiarNuevoNombre] = useState(nombre);
    const [nuevoCorreo, cambiarNuevoCorreo] = useState(correo);

    const actualizarContacto = (e) => {
        e.preventDefault();
        db.collection('usuarios').doc(id).update({
            nombre: nuevoNombre,
            correo: nuevoCorreo
        })
        .then(() => {
            console.log('El usuario se actualizo correctamente');
        })
        .catch((e) => {
            console.log('Hubo un error al actualizar');
        })

        cambiarEditarTarea(false);
    }
    
    const eliminarContacto = (id) => {
        db.collection('usuarios').doc(id).delete()
        .then(() => {
            console.log('El usuario se elimino correctamente');
        })
        .catch((e) => {
            console.log('Hubo un error al eliminar');
        })
    }

    return ( 
        <ContenedorContacto>
            {editarTarea ?
                <form action='' onSubmit={actualizarContacto}>
                    <Input 
                        type='text'
                        name='nombre'
                        value={nuevoNombre}
                        onChange={(e) => cambiarNuevoNombre(e.target.value)}
                        placeholder='Nombre'    
                    />
                    <Input 
                        type='text'
                        name='correo'
                        value={nuevoCorreo}
                        onChange={(e) => cambiarNuevoCorreo(e.target.value)}
                        placeholder='correo@example.com'    
                    />
                    <Boton type='submit'>Actualizar</Boton>
                </form>
            :
                <div>
                    <Nombre>{nombre}</Nombre>
                    <Correo>{correo}</Correo>
                    <Boton onClick={() => cambiarEditarTarea(!editarTarea)}>Editar</Boton>
                    <BotonE onClick={() => eliminarContacto(id)}>Eliminar</BotonE>
                </div>
            }
        </ContenedorContacto>
     );
}

const ContenedorContacto = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;
 
const Nombre = styled.p`
    font-weight: bold;
    font-family: "Open Sans", sans-serif;
`;
 
const Correo = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
    font-family: "Open Sans", sans-serif;
`;
 
const Boton = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
    font-family: "Open Sans", sans-serif;

    &:hover {
        background: #3D76E9;
    }
`;

const BotonE = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
    font-family: "Open Sans", sans-serif;

    &:hover {
        background: #f25c54;
    }
`;
 
const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;
    font-family: "Open Sans", sans-serif;

    &:focus {
        border: 2px solid #3D76E9;
    }
`;

export default Contacto;