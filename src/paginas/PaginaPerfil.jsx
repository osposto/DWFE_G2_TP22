import React from 'react';
import { Link, useParams } from 'react-router-dom';
import integrantes from '../datos/datosIntegrantes';
import DetalleIntegrante from '../componentes/integrantes/DetalleIntegrante';
import ConsolaRolInteractiva from '../componentes/alternativa/ConsolaRolInteractiva';

export default function PaginaPerfil() {
  const { id } = useParams();
  const integrante = integrantes.find((item) => item.id === id);

  if (!integrante) {
    return (
      <div className="profile-shell">
        <Link to="/" className="back-link">
          ← Volver al equipo
        </Link>
        <p className="profile-bio" role="status">No se encontró el perfil solicitado.</p>
      </div>
    );
  }

  return (
    <div className="profile-shell">
      <div className="profile-topline">
        <p className="profile-index">Dossier de integrante / {integrante.codigo}</p>
        <Link to="/" className="back-link">
          ← Volver al equipo
        </Link>
      </div>

      <div className="profile-header">
        <img className="profile-avatar" src={integrante.foto} alt={`Foto de ${integrante.nombre}`} />
        <div>
          <h1>{integrante.nombre}</h1>
          <div className="profile-role">{integrante.rol}</div>
          <p className="profile-bio">{integrante.bio}</p>
          <dl className="profile-contact">
            <div>
              <dt>Ciudad</dt>
              <dd>{integrante.ciudad}</dd>
            </div>
            <div>
              <dt>Edad</dt>
              <dd>{integrante.edad} años</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd><a href={`mailto:${integrante.correo}`}>{integrante.correo}</a></dd>
            </div>
          </dl>
        </div>
      </div>

      <DetalleIntegrante integrante={integrante} />

      {/* Demostración interactiva de rol en vivo (Mejora v2) */}
      <ConsolaRolInteractiva integranteId={integrante.id} />
    </div>
  );
}
