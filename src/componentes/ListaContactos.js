import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import db from './../firebase/firebaseConfig';
import Contacto from './Contacto';

const ListaContactos = () => {
    const [contactos, cambiarContactos] = useState([
        {id:1, nombre: 'Jair', correo: 'jair@correo.com'}
    ]);
    
    useEffect(() => {
        db.collection('usuarios').onSnapshot((snapshot) => {
            cambiarContactos(snapshot.docs.map((documento) => {
                return {...documento.data(), id: documento.id}
            }));
        });
    }, []);

    return ( 
        contactos.length > 0 &&
        <ContenedorContacto>
            {contactos.map((contacto) => (
                <Contacto 
                    key={contacto.id}
                    id={contacto.id}
                    nombre={contacto.nombre}
                    correo={contacto.correo}
                />
            ))}
        </ContenedorContacto>
     );
}

const ContenedorContacto = styled.div`
    padding: 40px
`;

export default ListaContactos;