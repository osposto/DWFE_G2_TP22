import fotoOrlando from '../assets/integrantes/orlando/foto_perfil.webp';
import discoMozart from '../assets/integrantes/orlando/musica/mozart.webp';
import discoJudasPriest from '../assets/integrantes/orlando/musica/judas_priest.webp';
import discoACDC from '../assets/integrantes/orlando/musica/acdc.webp';
import peliculaSilencio from '../assets/integrantes/orlando/pelis/silencio_inocentes.webp';
import peliculaPadrino from '../assets/integrantes/orlando/pelis/el_padrino.webp';
import peliculaAlien from '../assets/integrantes/orlando/pelis/alien.webp';
import fotoAdriana from '../assets/integrantes/adriana/adri_foto.webp';
import discoAirSupply from '../assets/integrantes/adriana/musica/air_supply_greatest_hits.webp';
import discoBonJovi from '../assets/integrantes/adriana/musica/bon_jovi_forever-portada.webp';
import discoNanaMouskouri from '../assets/integrantes/adriana/musica/nana_mouskouri_libertad.webp';
import peliculaAlguienCede from '../assets/integrantes/adriana/pelis/somethings_gotta_give.webp';
import peliculaAlienOctavo from '../assets/integrantes/adriana/pelis/alien_octavo.webp';
import peliculaTerminator from '../assets/integrantes/adriana/pelis/terminator.webp';
import fotoGuillermo from '../assets/integrantes/guillermo/foto_perfil.webp';
import discoGaryMoore from '../assets/integrantes/guillermo/musica/garymoore.webp';
import discoRataBlanca from '../assets/integrantes/guillermo/musica/ratablanca.webp';
import discoWarcry from '../assets/integrantes/guillermo/musica/warcry.webp';
import peliculaDepredador from '../assets/integrantes/guillermo/pelis/depredador.webp';
import peliculaJohnWick from '../assets/integrantes/guillermo/pelis/johnwick.webp';
import peliculaPrometheus from '../assets/integrantes/guillermo/pelis/prometheus.webp';

const integrantes = [
  {
    id: 'orlando',
    codigo: '01',
    nombre: 'Orlando Sposto',
    rol: 'Arquitectura de software y lógica de datos',
    avatar: 'OS',
    foto: fotoOrlando,
    ciudad: 'San Miguel de Tucumán',
    edad: 60,
    correo: 'osposto@gmail.com',
    github: 'https://github.com/osposto',
    githubUser: '@osposto',
    bio: 'Responsable de la arquitectura de la SPA, la navegación, el catálogo de capacidades y el árbol interactivo de componentes.',
    habilidades: ['Domótica', 'Internet of Things (IoT)', 'Programación', 'Instalaciones Especiales'],
    peliculas: [
      {
        titulo: 'El Silencio de los Inocentes',
        imagen: peliculaSilencio,
        anio: 1991,
        direccion: 'Jonathan Demme',
        sinopsis: 'Una joven agente del FBI busca la ayuda de un brillante psiquiatra encarcelado para atrapar a un asesino en serie.'
      },
      {
        titulo: 'El Padrino',
        imagen: peliculaPadrino,
        anio: 1972,
        direccion: 'Francis Ford Coppola',
        sinopsis: 'La historia de la familia Corleone y de la transformación de Michael en el nuevo líder del clan.'
      },
      {
        titulo: 'Alien, el octavo pasajero',
        imagen: peliculaAlien,
        anio: 1979,
        direccion: 'Ridley Scott',
        sinopsis: 'La tripulación de una nave espacial debe sobrevivir a una criatura mortal que se ha infiltrado a bordo.'
      }
    ],
    discos: [
      { titulo: 'Requiem', artista: 'Mozart (Nikolaus Harnoncourt)', imagen: discoMozart },
      { titulo: 'Screaming for Vengeance', artista: 'Judas Priest', imagen: discoJudasPriest },
      { titulo: 'Back in Black Live in River Plate', artista: 'AC/DC', imagen: discoACDC }
    ],
    responsabilidades: 'Encargado de la estructura general, enrutamiento, catálogo JSON y árbol de renderizado.'
  },
  {
    id: 'adriana',
    codigo: '02',
    nombre: 'Adriana Van Den Dooren',
    rol: 'Diseño UI/UX, estética y perfiles de usuario',
    avatar: 'A',
    foto: fotoAdriana,
    ciudad: 'San Miguel de Tucumán',
    edad: 57,
    correo: 'adrianavdd.clases@gmail.com',
    github: 'https://github.com/Adriana-vandendooren',
    githubUser: '@Adriana-vandendooren',
    bio: 'Responsable de la identidad visual, la portada del equipo y los perfiles interactivos de sus integrantes.',
    habilidades: ['HTML', 'CSS', 'Inteligencia artificial', 'Docencia'],
    peliculas: [
      {
        titulo: 'Alguien tiene que ceder',
        imagen: peliculaAlguienCede,
        anio: 2003,
        direccion: 'Nancy Meyers',
        sinopsis: 'Un exitoso compositor y una dramaturga se conocen inesperadamente y descubren una nueva oportunidad para el amor.'
      },
      {
        titulo: 'Alien, el octavo pasajero',
        imagen: peliculaAlienOctavo,
        anio: 1979,
        direccion: 'Ridley Scott',
        sinopsis: 'La tripulación de una nave espacial debe sobrevivir a una criatura mortal que se ha infiltrado a bordo.'
      },
      {
        titulo: 'Terminator',
        imagen: peliculaTerminator,
        anio: 1984,
        direccion: 'James Cameron',
        sinopsis: 'Un cyborg llega del futuro con la misión de cambiar el destino de la humanidad, mientras una mujer intenta escapar de él.'
      }
    ],
    discos: [
      { titulo: 'Greatest Hits', artista: 'Air Supply', imagen: discoAirSupply },
      { titulo: 'Forever', artista: 'Bon Jovi', imagen: discoBonJovi },
      { titulo: 'Libertad', artista: 'Nana Mouskouri', imagen: discoNanaMouskouri }
    ],
    responsabilidades: 'Responsable de la identidad estética, la portada del equipo y las vistas de perfil con pestañas dinámicas.'
  },
  {
    id: 'guillermo',
    codigo: '03',
    nombre: 'Guillermo Escobar',
    rol: 'APIs asíncronas, bitácora y documentación',
    avatar: 'G',
    foto: fotoGuillermo,
    ciudad: 'Merlo, Buenos Aires',
    edad: 43,
    correo: 'gescobar@gmail.com',
    github: 'https://github.com/elgyllesoft',
    githubUser: '@elgyllesoft',
    bio: 'Responsable de la integración de servicios externos, los estados de carga y error, la bitácora y la documentación.',
    habilidades: ['Redes', 'Electrónica', 'Programación', 'Desarrollo Web'],
    peliculas: [
      {
        titulo: 'Depredador',
        imagen: peliculaDepredador,
        anio: 1987,
        direccion: 'John McTiernan',
        sinopsis: 'Un equipo de rescate en la jungla se convierte en presa de un cazador extraterrestre.'
      },
      {
        titulo: 'John Wick',
        imagen: peliculaJohnWick,
        anio: 2014,
        direccion: 'Chad Stahelski',
        sinopsis: 'Un exasesino a sueldo regresa al mundo criminal y emprende una búsqueda de venganza.'
      },
      {
        titulo: 'Prometheus',
        imagen: peliculaPrometheus,
        anio: 2012,
        direccion: 'Ridley Scott',
        sinopsis: 'Una expedición espacial viaja en busca de los orígenes de la humanidad y encuentra una amenaza inesperada.'
      }
    ],
    discos: [
      { titulo: 'Gary Moore', artista: 'Gary Moore', imagen: discoGaryMoore },
      { titulo: 'Rata Blanca', artista: 'Rata Blanca', imagen: discoRataBlanca },
      { titulo: 'War Cry', artista: 'War Cry', imagen: discoWarcry }
    ],
    responsabilidades: 'Encargado de servicios externos, manejo de carga/error y registro cronológico del desarrollo.'
  }
];

export default integrantes;
