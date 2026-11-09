/* ==========================================================================
   Fichas: el contenido ampliado que se abre desde hotspots y botones.
   Todo proviene del TP "Turismo Receptivo y Cambio Climático" y del speech.
   ========================================================================== */
window.VJ = window.VJ || {};
VJ.FICHAS = {
  /* ---------- Iguazú ---------- */
  cierre: { k: 'Parque Nacional Iguazú', t: 'El cierre de la Garganta del Diablo', img: true, b: `<p>Cierre <strong>preventivo y temporal</strong>, acordado entre la APN y la concesionaria Iguazú Argentina ante posibles crecidas extraordinarias. Los demás recorridos siguen habilitados.</p>`, d: [['3 de agosto', 'de 2026'], ['40 días', 'como mínimo']], s: 'Llobet, 2026 (Ladevi).' },
  jerarquia: { k: 'Glosario', t: 'Jerarquización de atractivos', b: `
    <p>Procedimiento técnico que clasifica los atractivos según su importancia, singularidad y capacidad para motivar desplazamientos.</p>
    <ul><li><strong>Jerarquía 5:</strong> excepcionales, motivan por sí mismos corrientes internacionales. Ej.: Cataratas del Iguazú.</li>
    <li><strong>Jerarquía 4:</strong> gran relevancia, motivan desplazamientos nacionales o internacionales. Ej.: sectores del Canal Beagle y atractivos destacados de la Patagonia.</li>
    <li><strong>Jerarquía 3:</strong> motivan desplazamientos regionales o complementan viajes. Ej.: complejos termales, bodegas y circuitos culturales.</li>
    <li><strong>Jerarquías 2 y 1:</strong> menor convocatoria individual; complementan otros atractivos.</li></ul>` },
  'c-superior': { k: 'Sigue habilitado', t: 'Circuito Superior', img: true, b: `<p>Promocionarlo reduce el impacto del cierre sobre la experiencia del visitante.</p>`, s: 'TP, Sección 2: Los atractivos turísticos.' },
  'c-inferior': { k: 'Sigue habilitado', t: 'Circuito Inferior', img: true, b: `<p>Junto con el Circuito Superior, permite redistribuir la visita durante el cierre.</p>`, s: 'TP, Sección 2: Los atractivos turísticos.' },
  'c-verde': { k: 'Sigue habilitado', t: 'Sendero Verde', img: true, b: `<p>Parte de la oferta que continúa disponible dentro del parque.</p>`, s: 'TP, Sección 2: Los atractivos turísticos.' },
  'c-macuco': { k: 'Sigue habilitado', t: 'Sendero Macuco', img: true, b: `<p>Otro recurso para promocionar mientras dure el cierre.</p>`, s: 'TP, Sección 2: Los atractivos turísticos.' },
  'c-tren': { k: 'Infraestructura', t: 'Tren Ecológico de la Selva', img: true, b: `<p>Sigue siendo central para moverse dentro del parque.</p>`, s: 'Llobet, 2026.' },
  receptivo: { k: 'Glosario', t: 'Turismo receptivo', img: true, b: `<p>Visitas de personas no residentes que ingresan a un país o territorio. Aportan <strong>divisas</strong> a través de su consumo en el destino.</p>` },
  enos: { k: 'Fenómeno climático', t: 'El Niño-Oscilación del Sur (ENOS)', img: true, b: `<p>Exige reforzar las alertas tempranas, la planificación y la adaptación climática.</p>`, d: [['81 %', 'probabilidad de intensidad muy fuerte (NOAA)'], ['Fines 2026', 'a comienzos de 2027: mayor intensidad']], s: 'Chávez, 2026 (Infobae); Greenpeace Argentina, 2026.' },
  'nino-regiones': { k: 'Infografía de Infobae', t: 'Más lluvias, más vigilancia', img: true, b: `<p>Más lluvias en <strong>Mesopotamia, Santa Fe, este de Chaco y Formosa</strong>, con posibles crecidas aguas abajo.</p>`, s: 'Chávez, 2026 (Infobae), reproducido en el TP.' },
  ramcc: { k: 'Gobernanza ambiental', t: 'VIII Asamblea Nacional de la RAMCC', b: `
    <p>La Red Argentina de Municipios frente al Cambio Climático se reunió el 23, 24 y 25 de abril en San Miguel de Tucumán para promover políticas locales de mitigación y adaptación.</p>
    <p>Se destacaron los <strong>Planes Locales de Acción Climática (PLAC)</strong>, sustentados en la medición de emisiones y la planificación de acciones concretas. Permiten incorporar criterios ambientales a la gestión pública, anticipar riesgos y fortalecer la resiliencia territorial.</p>
    <p>El encuentro expresó que <strong>no hay justicia social sin justicia ambiental</strong>.</p>`, s: 'Nieto Tenaglia et al., 2026 (TN).' },
  plac: { k: 'Glosario', t: 'Plan Local de Acción Climática (PLAC)', img: true, b: `<p>Instrumento municipal para identificar riesgos climáticos y <strong>reducir sus impactos</strong>.</p>` },

  /* ---------- Sistema ---------- */
  'sis-atr': { k: 'Boullón, 2006', t: 'Atractivos', img: true, b: `<p>Recursos naturales y culturales que <strong>motivan el viaje</strong>, organizados según su jerarquía.</p>` },
  'sis-dem': { k: 'Boullón, 2006', t: 'Demanda', img: true, b: `<p>Quienes viajan y consumen en el destino: influyen en los ingresos y el empleo.</p>` },
  'sis-ofe': { k: 'Boullón, 2006', t: 'Oferta', img: true, b: `<p>Bienes, servicios y experiencias disponibles para los visitantes.</p>` },
  'sis-pla': { k: 'Boullón, 2006', t: 'Planta turística', img: true, b: `<p>Alojamiento, gastronomía, agencias, guías y transporte.</p>` },
  'sis-inf': { k: 'Boullón, 2006', t: 'Infraestructura', img: true, b: `<p>Caminos, trenes, puertos, agua y saneamiento: lo que permite que todo funcione.</p>` },
  'sis-sup': { k: 'Boullón, 2006', t: 'Superestructura', img: true, b: `<p>Organismos públicos, privados y mixtos que <strong>regulan, planifican y fiscalizan</strong>.</p>` },
  sistema: { k: 'Glosario', t: 'Sistema turístico', img: true, b: `<p>Seis componentes interdependientes: si uno se altera, <strong>repercute en todos</strong> (Boullón).</p>` },

  /* ---------- Entre Ríos ---------- */
  mesa: { k: 'Entre Ríos', t: 'Mesa de Seguimiento y Adaptación Turística', b: `<p>Creada ante las alertas climáticas planteadas en el Consejo Federal de Turismo, con participación de municipios como <strong>Colón, Concordia, Federación y Gualeguaychú</strong>.</p><p>Busca proteger una temporada estival clave mediante la diversificación de la oferta: turismo termal, enoturismo, carnavales y propuestas culturales.</p>`, s: 'Llobet y Casal, 2026 (Ladevi).' },
  multiplicador: { k: 'Glosario', t: 'Efecto multiplicador del turismo', img: true, b: `<p>El gasto de los visitantes genera nuevos ingresos en la economía local. Con cancelaciones, el efecto se vuelve <strong>contractivo</strong>.</p>` },
  directo: { k: 'Efecto multiplicador · primer anillo', t: 'Empleo directo', img: true, b: `<p>Recepcionistas, camareros, guías, agentes de viajes y transporte.</p>` },
  indirecto: { k: 'Efecto multiplicador · segundo anillo', t: 'Empleo indirecto', img: true, b: `<p>Proveedores: logística, lavanderías, mantenimiento y alimentos.</p>` },
  inducido: { k: 'Efecto multiplicador · tercer anillo', t: 'Empleo inducido', img: true, b: `<p>Lo que gastan los trabajadores del sector: comercios, servicios y producción.</p>` },
  litoral: { k: 'Atractivos e infraestructura', t: 'El Litoral frente al agua', b: `<p>Las inundaciones pueden comprometer el aprovechamiento turístico de los recursos naturales en la cuenca de los ríos Paraná y Uruguay.</p><p>Las crecidas pueden comprometer caminos, accesos, defensas costeras y equipamientos recreativos, por lo que se requiere fortalecer el mantenimiento preventivo, los sistemas de alerta y la planificación.</p>`, s: 'Chávez, 2026; Greenpeace, 2026; Llobet y Casal, 2026.' },

  /* ---------- El Chaltén ---------- */
  tuu: { k: 'Glosario · El Chaltén', t: 'Tasa de Uso Urbano (TUU)', b: `
    <p>Establecida mediante la <strong>Ordenanza N.º 253</strong>. Es un cobro digital equivalente al valor de <strong>dos litros de nafta súper, aproximadamente $3.000 por persona</strong>, para quienes visitan la localidad durante el día sin pernoctar (modalidad <em>full day</em>).</p>
    <p>Procura contribuir al sostenimiento de sanitarios públicos, estacionamiento, recolección de residuos y mantenimiento de espacios comunes.</p>
    <p>Generó controversias con agencias y operadores de excursiones desde El Calafate. Ante las dificultades para incorporar el cobro a través de intermediarios, el municipio estableció un mecanismo digital mediante <strong>código QR</strong>.</p>
    <p>Plantea desafíos de fiscalización, transparencia en la recaudación, claridad en las condiciones de cobro y distribución de los costos.</p>`, s: 'Llobet, 2026 (Ladevi).' },
  fitz: { k: 'Atractivos de El Chaltén', t: 'Monte Fitz Roy y Laguna de los Tres', img: true, b: `<p>Corazón del trekking. Las excursiones de día completo desde El Calafate <strong>presionan</strong> el entorno y los servicios.</p>`, s: 'Llobet, 2026.' },
  'carga-eco': { k: 'Capacidad de carga', t: 'Ecológica', img: true, b: `<p>Uso compatible con conservar los ecosistemas: sin erosión, contaminación ni pérdida de biodiversidad.</p>` },
  'carga-fis': { k: 'Capacidad de carga', t: 'Física', img: true, b: `<p>Lo que soportan pasarelas, sanitarios, estacionamientos, agua y recolección de residuos.</p>` },
  'carga-psi': { k: 'Capacidad de carga', t: 'Psicológica', img: true, b: `<p>La tolerancia de los visitantes: la incertidumbre favorece las cancelaciones.</p>` },

  /* ---------- Ushuaia ---------- */
  puerto: { k: 'Puerto de Ushuaia', t: 'Un conflicto de competencias', img: true, b: `<p>Tras la intervención de la ANPyN, la provincia cuestiona sus límites para fiscalizar los <strong>residuos peligrosos</strong>.</p>`, d: [['89 a 140', 'trabajadores desplazados'], ['+590', 'recaladas confirmadas']], s: 'Llobet, 2026 (Ladevi).' },
  'esc-nac': { k: 'Superestructura', t: 'Escala nacional y regional', b: `<p><strong>APN, ANPyN, Consejo Federal de Turismo (CFT), Consejo Litoral Turismo (Colitur) y Ente Mixto de Turismo de Entre Ríos (Emturer)</strong> participan en la gestión de destinos, la coordinación sectorial y la comunicación de información oficial.</p><p>Los informes meteorológicos y ambientales aportan elementos técnicos para la prevención de riesgos.</p>` },
  'esc-mun': { k: 'Superestructura', t: 'Escala municipal y local', b: `<p>La <strong>RAMCC</strong> promueve los Planes Locales de Acción Climática (PLAC).</p><p>En El Chaltén, la <strong>Ordenanza N.º 253</strong> refleja el papel de las autoridades municipales en la regulación del uso de los servicios públicos y el financiamiento de la infraestructura local.</p>` },
  'esc-int': { k: 'Superestructura', t: 'Escala interjurisdiccional y sectorial', b: `<p>Ushuaia evidencia las dificultades que surgen ante controversias entre competencias nacionales y provinciales.</p><p>La participación de la <strong>Cámara de Turismo de Ushuaia, FAEVYT e IAATO</strong> (Asociación Internacional de Operadores Turísticos de la Antártida) resulta relevante para promover acuerdos que den previsibilidad.</p>` },
  beagle: { k: 'Atractivos de Ushuaia', t: 'Canal Beagle y paisajes antárticos', img: true, b: `<p>Un paisaje que depende de la <strong>buena gestión de los residuos</strong> de los buques.</p>`, s: 'Llobet, 2026.' },

  /* ---------- Dimensiones ---------- */
  'dim-eco': { k: 'Sección 3', t: 'Dimensión económica y financiera', b: `<p>El turismo genera ingresos, empleo y divisas, y dinamiza las economías regionales.</p><ul><li>Las alertas de ENOS pueden afectar reservas, consumo, ingresos empresariales y recaudación tributaria.</li><li>La actividad de cruceros en Ushuaia sostiene más de 2.000 puestos vinculados con la temporada.</li><li>Prevención de riesgos, diversificación y planificación financiera reducen la vulnerabilidad.</li></ul>` },
  'dim-soc': { k: 'Sección 3', t: 'Dimensión social, cultural y psicológica', b: `<p>“No hay justicia social sin justicia ambiental” (VIII Asamblea RAMCC).</p><ul><li>Los eventos extremos pueden profundizar desigualdades: comunidades ribereñas, trabajadores informales y pequeños prestadores están más expuestos.</li><li>La información alarmista o imprecisa puede dar la impresión de que todo el destino está inhabilitado.</li><li>La incertidumbre puede afectar la experiencia de ocio autotélico.</li></ul>`, s: 'Nieto Tenaglia et al., 2026; Greenpeace, 2026; Cuenca, 2000; Dumazedier, 1964.' },
  'dim-nor': { k: 'Sección 3', t: 'Dimensión normativa e institucional', b: `<ul><li><strong>Ley 22.351</strong> de Parques Nacionales, Monumentos Naturales y Reservas Nacionales: marco del Parque Nacional Iguazú.</li><li><strong>Ley 18.829</strong> de Agentes de Viajes (1970) y Decreto 2182/1972: registro, clasificación, fondo de garantía y Libro de Reclamaciones.</li><li><strong>Ley 24.240</strong> de Defensa del Consumidor: ante contingencias, comunicar con claridad modificaciones y condiciones de reprogramación o cancelación.</li><li><strong>Ordenanza N.º 253</strong> de El Chaltén: Tasa de Uso Urbano.</li><li>Humedales: necesidad de fortalecer el marco normativo por su función en la regulación hídrica.</li></ul>` },
  'dim-gob': { k: 'Sección 3', t: 'Dimensión política y de gobernanza', b: `<p>La gobernanza turística se relaciona con la capacidad de diferentes actores para coordinar decisiones y gestionar un destino.</p><p>La articulación entre los niveles de gobierno y los actores privados es fundamental para anticipar contingencias, reducir conflictos de competencia y garantizar una gestión sostenible.</p>` },

  /* ---------- Futuros ---------- */
  prospectiva: { k: 'Sección 4', t: 'Metodología prospectiva', img: true, b: `<p>No predice: <strong>imagina escenarios posibles</strong> para comprender las consecuencias de nuestras decisiones.</p>` },
  publico: { k: 'Responsabilidades', t: 'Sector público', b: `<p>Debe establecer políticas, regular, controlar y planificar.</p>` },
  privado: { k: 'Responsabilidades', t: 'Sector privado', b: `<p>Debe adaptar sus servicios, capacitar a sus trabajadores y comunicar correctamente las condiciones de los destinos.</p>` },
  turistas: { k: 'Responsabilidades', t: 'Turistas', b: `<p>También pueden contribuir mediante comportamientos responsables.</p>` },

  /* ---------- Intervenciones ---------- */
  'pub-1': { k: 'Ámbito público · 1', t: 'Alerta hidrológica temprana e infraestructura resiliente', img: true, b: `<p>Monitoreo ampliado y protocolos conjuntos para <strong>anticipar crecidas</strong> y proteger a trabajadores y visitantes.</p>` },
  'pub-2': { k: 'Ámbito público · 2', t: 'Humedales y planes climáticos', img: true, b: `<p><strong>Presupuestos mínimos</strong> para proteger los humedales y PLAC integrados al ordenamiento territorial.</p>` },
  'pub-3': { k: 'Ámbito público · 3', t: 'Protocolo unificado de comunicación de crisis', img: true, b: `<p>Partes periódicos y un mismo mensaje entre organismos, entes y prestadores.</p>` },
  'pub-4': { k: 'Ámbito público · 4', t: 'Convenio para el Puerto de Ushuaia', img: true, b: `<p>Acuerdo entre la <strong>ANPyN y Tierra del Fuego</strong>: competencias, control de residuos y diálogo laboral.</p>` },
  'pri-1': { k: 'Sector privado · 1', t: 'Estrategias comerciales flexibles', img: true, b: `<p>Mejores políticas de cancelación, itinerarios modificables y pases combinados.</p>` },
  'pri-2': { k: 'Sector privado · 2', t: 'Promoción conjunta de una oferta diversificada', img: true, b: `<p>Campañas conjuntas para difundir toda la oferta y <strong>distribuir los beneficios</strong>.</p>` },
  'pri-3': { k: 'Sector privado · 3', t: 'Capacitación del personal', img: true, b: `<p>Comunicación asertiva, reclamos y riesgos ambientales para quienes atienden al turista.</p>` },

  /* ---------- Ocio ---------- */
  ocio: { k: 'Glosario', t: 'Ocio autotélico y las tres D', b: `<p>El <strong>ocio autotélico</strong> (Manuel Cuenca) es una experiencia cuyo propósito y satisfacción se encuentran en la propia actividad, elegida libremente.</p><p>Joffre Dumazedier identifica tres funciones del ocio:</p><ul><li><strong>Descanso:</strong> recuperarse de la fatiga física y mental.</li><li><strong>Diversión:</strong> romper la rutina, entretenerse.</li><li><strong>Desarrollo personal:</strong> crecimiento intelectual, cultural y social.</li></ul>` },
  dudh: { k: 'ONU, 1948', t: 'Artículo 24', b: `<p>La Declaración Universal de los Derechos Humanos reconoce el derecho al descanso, al disfrute del tiempo libre y a las vacaciones periódicas pagadas.</p>` },
  justicia: { k: 'Escenario favorable', t: 'Justicia ambiental', b: `<p>Principio que plantea distribuir de manera equitativa los beneficios y las cargas ambientales, evitando que las comunidades locales y los sectores más vulnerables soporten desproporcionadamente las consecuencias de las crisis.</p>` },

  /* ---------- Paneles generales ---------- */
  glosario: { k: 'Sección 5', t: 'Glosario técnico', b: `
    <h3>Sistema turístico</h3><p>Estructura dinámica e interdependiente: demanda, oferta, planta turística, atractivos, infraestructura y superestructura (Boullón).</p>
    <h3>Turismo receptivo</h3><p>Visitas de personas no residentes que ingresan a un país o territorio desde su residencia habitual.</p>
    <h3>Efecto multiplicador</h3><p>El gasto de los visitantes genera nuevos ingresos en la economía receptora. Empleo directo, indirecto e inducido.</p>
    <h3>Capacidad de carga</h3><p>Nivel de utilización que soporta un destino sin deterioro significativo. Ecológica, física y psicológica.</p>
    <h3>Jerarquización de atractivos</h3><p>Clasificación según importancia, singularidad y capacidad de motivar desplazamientos (jerarquías 5 a 1).</p>
    <h3>Ocio autotélico y las tres D</h3><p>Experiencia valiosa en sí misma (Cuenca). Descanso, diversión y desarrollo personal (Dumazedier).</p>
    <h3>PLAC</h3><p>Plan Local de Acción Climática: instrumento municipal de mitigación y adaptación, promovido por la RAMCC.</p>
    <h3>Tasa de Uso Urbano</h3><p>Instrumento municipal de financiamiento aplicado en El Chaltén a quienes visitan la localidad sin pernoctar.</p>` },
  fuentes: { k: 'Bibliografía', t: 'Fuentes de consulta', b: `
    <p><strong>Trabajo:</strong> Turismo Receptivo y Cambio Climático: Diagnóstico Sistémico y Escenarios Prospectivos. Seminario, Taller de Integración 1. Facultad de Turismo y Hospitalidad, UAI, 2026. Cornejo, Gottero, Costa, Contreras y Gonzalez.</p>
    <h3>Teórica</h3><ul>
    <li>Boullón, R. (2006). <em>Planificación del espacio turístico</em>. Editorial Trillas.</li>
    <li>Cuenca, M. (2000). <em>Aproximación al ocio autotélico</em>. Universidad de Deusto.</li>
    <li>Dumazedier, J. (1964). <em>Hacia una civilización del ocio</em>. Editorial Estela.</li></ul>
    <h3>Periodística y digital</h3><ul>
    <li>Chávez, V. (2026, 13 de octubre). Los efectos de El Niño: hasta cuándo podría durar su impacto en la Argentina y la región. Infobae.</li>
    <li>Greenpeace Argentina. (2026). Súper Niño 2026 en Argentina: cómo estar preparados para los impactos del evento más intenso de los últimos 50 años.</li>
    <li>Llobet, M. (2026, 2 de agosto). Cataratas del Iguazú: qué pasará con las visitas durante el cierre de 40 días de la Garganta del Diablo. Ladevi.</li>
    <li>Llobet, M. (2026, marzo). El Chaltén cobrará una tasa turística a quienes visiten el destino por el día. Ladevi.</li>
    <li>Llobet, M. (2026, 18 de septiembre). Puerto de Ushuaia: el conflicto escala por los residuos y el turismo exige garantías. Ladevi.</li>
    <li>Llobet, M., &amp; Casal, M. (2026, 6 de agosto). El Niño pone en alerta al turismo: Entre Ríos prepara el verano ante posibles crecidas. Ladevi.</li>
    <li>Nieto Tenaglia, B., Moscuzza, M., &amp; González, M. (2026, 27 de abril). Ambiente en armonía, cambio climático y futuro sustentable, la agenda en la cumbre de intendentes. TN.</li></ul>
    <h3>Institucional</h3><ul>
    <li>ONU. (1948). Declaración Universal de los Derechos Humanos. Artículo 24.</li>
    <li>UAI. (2026). Apunte de cátedra: Resumen Introducción al Turismo.</li>
    <li>UAI. (2026). Consigna del Trabajo Práctico Grupal N.º 1.</li></ul>` },
};

/* Comparación de los dos escenarios (cinco ejes del análisis). */
VJ.COMPARA = {
  infra: { bad: 'Destrucción recurrente de las pasarelas de Iguazú, saturación de los servicios urbanos de El Chaltén, deterioro de los humedales y dificultades operativas en el Puerto de Ushuaia.', good: 'Resguardo preventivo de las instalaciones, mantenimiento de los servicios urbanos, conservación de los ecosistemas y fortalecimiento de la operatividad portuaria.' },
  demanda: { bad: 'Comunicaciones incoherentes aumentan la percepción de inseguridad: cancelaciones, postergaciones y menos demanda, incluso en destinos sin afectación directa.', good: 'Comunicación transparente y coordinada, circuitos alternativos y experiencias diversas redistribuyen los flujos y sostienen la confianza.' },
  economia: { bad: 'Se contrae el consumo y se debilita el efecto multiplicador, comprometiendo los $305.000 millones y los $102.243 de gasto diario por turista en el Litoral.', good: 'La adaptación y la diversificación sostienen parte del movimiento económico, reducen pérdidas y fortalecen el financiamiento de los destinos.' },
  empleo: { bad: 'Pérdida de puestos directos, indirectos e inducidos, especialmente temporarios, independientes e informales.', good: 'La continuidad operativa y el acompañamiento laboral protegen las fuentes de empleo, en línea con el principio de justicia ambiental.' },
  gobernanza: { bad: 'Fragmentación institucional, controversias jurisdiccionales y falta de protocolos compartidos debilitan la capacidad de respuesta.', good: 'Se articulan los niveles del Estado y el sector privado; los PLAC y los acuerdos interinstitucionales consolidan una gestión más resiliente.' },
};
