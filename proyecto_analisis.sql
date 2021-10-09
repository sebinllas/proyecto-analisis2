-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2021 a las 16:28:52
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_analisis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8_spanish2_ci NOT NULL,
  `class` int(11) NOT NULL,
  `post` int(11) NOT NULL,
  `init_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `deadline` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `teacher` int(11) DEFAULT NULL,
  `group` int(11) NOT NULL,
  `schedule` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `classes`
--

INSERT INTO `classes` (`id`, `name`, `teacher`, `group`, `schedule`) VALUES
(1, 'matemáticas', 1, 1, 1),
(2, 'Fisica', 2, 1, 2),
(3, 'Geometria', 2, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8_spanish2_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `owner` int(11) DEFAULT NULL,
  `class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `content`, `date`, `owner`, `class`) VALUES
(1, 'este es el primer post de prueba estoy intentado escribir algo largo para que se vea bien en el frontend por eso estoy escribiendo cosas sin importancia pero que hace que este mensaje sea más largo.\r\nun saludo.', '2021-05-23 21:34:05', 1, 1),
(3, 'Post en el classroom de física', '2021-05-23 22:26:58', 2, 2),
(4, 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.\r\n\r\n¿Por qué lo usamos?\r\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).\r\n\r\n\r\n¿De dónde viene?\r\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \"consecteur\", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de \"de Finnibus Bonorum et Malorum\" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", viene de una linea en la sección 1.10.32\r\n\r\nEl trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de \"de Finibus Bonorum et Malorum\" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.\r\n\r\n¿Dónde puedo conseguirlo?\r\nHay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '2021-05-24 03:30:44', 2, 2),
(7, '1234', '2021-05-24 04:09:37', 1, 2),
(8, 'este es un post\r\njajajajajaa', '2021-05-24 04:10:03', 1, 2),
(9, 'este es otro post más de prueba\r\n', '2021-05-24 04:48:48', 1, 2),
(10, 'hola, este es el primer post', '2021-05-24 04:55:11', 1, 3),
(11, 'hola, este es el segundo post', '2021-05-24 04:55:24', 1, 3),
(12, 'este es un post hecho con el usuario test\r\n', '2021-05-24 04:56:18', 2, 2),
(13, 'este es un post que voy a hacer en el classrrom de matemáticas, esto es simplemente una prueba y no representa el uso real que se le dará a esta plataforma', '2021-05-24 21:17:15', 1, 1),
(14, 'Hola clase', '2021-05-25 22:51:13', 2, 1),
(15, 'wjimfdeow', '2021-05-26 03:06:04', 1, 2),
(16, 'corre gertru\r\n', '2021-05-26 03:35:53', 1, 3),
(17, 'poiuytrewq', '2021-05-26 03:39:33', 1, 2),
(18, 'dfghjklñ', '2021-05-26 03:40:08', 2, 1),
(19, 'ujujuju', '2021-08-19 01:23:54', 2, 1),
(20, 'esto es una pruba', '2021-08-24 02:00:55', 2, 1),
(21, 'idsncsd dois\r\ncsd ciods voj sd\r\n vsdoaiv sad v\r\nds sadio jsd vjsd\r\ndcadscdsds', '2021-08-24 17:32:21', 2, 3),
(22, 'uiefhuivfdvf', '2021-08-24 21:08:24', 1, 2),
(23, 'prueba', '2021-08-24 21:08:38', 1, 2),
(24, 'prueba', '2021-08-24 21:09:41', 2, 3),
(25, 'sessssssas', '2021-08-24 21:12:09', 2, 3),
(26, 'gfdsdfsd', '2021-08-25 22:11:42', 1, 2),
(27, 'wewqewq', '2021-08-25 22:12:04', 1, 2),
(28, 'asdfdsadasd', '2021-08-25 22:12:40', 1, 2),
(29, 'dfdgds', '2021-08-25 22:17:34', 1, 2),
(30, 'dhtdrt', '2021-08-25 22:17:41', 1, 2),
(31, 'saaddadasd', '2021-08-25 22:18:37', 2, 3),
(32, '123456', '2021-08-25 22:18:46', 2, 3),
(33, '1234', '2021-08-25 22:19:25', 2, 2),
(34, '12wsdfgfdsa', '2021-08-25 22:19:51', 1, 3),
(35, '1222212112121212121212121', '2021-08-25 22:41:28', 1, 3),
(36, 'qwertyuiopasdfghjklñzxcvbnm', '2021-08-25 22:42:07', 1, 3),
(37, 'vfdvdvfdvfd', '2021-08-26 18:23:11', 2, 3),
(38, '0987654321', '2021-08-26 18:24:04', 2, 3),
(39, '123123123 123 123 123', '2021-08-26 18:26:24', 2, 3),
(40, 'zzzzzzzzzzzzzzzzzzzzzzzzzz', '2021-08-26 18:29:08', 2, 3),
(41, '', '2021-08-26 18:30:25', 2, 3),
(42, '0000000000000', '2021-08-26 18:30:41', 2, 3),
(43, 'hdudhuds', '2021-09-14 15:32:31', 2, 3),
(44, '{\"time\":1632095648919,\"blocks\":[{\"id\":\"9Og0_MeLv8\",\"type\":\"paragraph\",\"data\":{\"text\":\"\"}},{\"id\":\"THBtROyJMj\",\"type\":\"header\",\"data\":{\"text\":\"encabezado\",\"level\":2}},{\"id\":\"oB5YqbHsCm\",\"type\":\"quote\",\"data\":{\"text\":\"quote\",\"caption\":\"unknown\",\"alignment\":\"center\"}},{\"id\":\"LnJMo9-ySX\",\"type\":\"linkTool\",\"data\":{\"link\":\"udea.edu.co\",\"meta\":{}}},{\"id\":\"GXO6oJWYiF\",\"type\":\"linkTool\",\"data\":{\"link\":\"facebook.com\",\"meta\":{}}}],\"version\":\"2.22.2\"}', '2021-09-20 00:48:58', 2, 1),
(45, '{\"time\":1632106261015,\"blocks\":[{\"id\":\"ku-rNab-5W\",\"type\":\"header\",\"data\":{\"text\":\"Una prueba\",\"level\":2}},{\"id\":\"rl321PebeO\",\"type\":\"list\",\"data\":{\"style\":\"ordered\",\"items\":[\"item 1\",\"item 2\",\"item 3\"]}},{\"id\":\"V6waVEpa7I\",\"type\":\"image\",\"data\":{\"url\":\"data:image/png;base64,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\",\"caption\":\"image.png\",\"withBorder\":false,\"withBackground\":false,\"stretched\":false}},{\"id\":\"pLXjp0hvh4\",\"type\":\"quote\",\"data\":{\"text\":\"una cita\",\"caption\":\"nn\",\"alignment\":\"left\"}}],\"version\":\"2.22.2\"}', '2021-09-20 02:51:03', 2, 1),
(46, '{\"time\":1632106433857,\"blocks\":[{\"id\":\"COs7BHqiWw\",\"type\":\"header\",\"data\":{\"text\":\"<mark class=\\\"cdx-marker\\\">Título</mark>\",\"level\":2}},{\"id\":\"2azCKn44Jf\",\"type\":\"checklist\",\"data\":{\"items\":[{\"text\":\"a\",\"checked\":false},{\"text\":\"b\",\"checked\":false},{\"text\":\"c\",\"checked\":false}]}}],\"version\":\"2.22.2\"}', '2021-09-20 02:53:56', 2, 1),
(47, '{\"time\":1632160850270,\"blocks\":[],\"version\":\"2.22.2\"}', '2021-09-20 18:07:31', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `init_hour` time DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `Lunes` tinyint(1) DEFAULT 0,
  `Martes` tinyint(1) DEFAULT 0,
  `Miercoles` tinyint(1) DEFAULT 0,
  `Jueves` tinyint(1) DEFAULT 0,
  `Viernes` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `schedules`
--

INSERT INTO `schedules` (`id`, `init_hour`, `duration`, `Lunes`, `Martes`, `Miercoles`, `Jueves`, `Viernes`) VALUES
(1, '08:00:00', 2, 1, NULL, 1, NULL, 1),
(2, '10:00:00', 2, 1, NULL, 1, NULL, 1),
(3, '12:00:00', 2, 0, 1, 0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students_activities`
--

CREATE TABLE `students_activities` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `activity` int(11) NOT NULL,
  `qualification` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teachers_classes`
--

CREATE TABLE `teachers_classes` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `class` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `fullName` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `gruop` int(11) DEFAULT NULL,
  `role` varchar(30) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `fullName`, `email`, `password`, `gruop`, `role`) VALUES
(1, 'sebinllas', 'Sebastián Suárez Ramírez', 'sebastian.suarezr@udea.edu.co', '123', NULL, ''),
(2, 'test', 'test', 'test@test.com', 'test', NULL, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_classes`
--

CREATE TABLE `users_classes` (
  `user` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `qualifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`qualifications`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `users_classes`
--

INSERT INTO `users_classes` (`user`, `class`, `qualifications`) VALUES
(1, 1, NULL),
(1, 2, NULL),
(1, 3, NULL),
(2, 1, NULL),
(2, 3, NULL),
(2, 2, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher` (`teacher`),
  ADD KEY `schedule` (`schedule`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `class` (`class`);

--
-- Indices de la tabla `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `students_activities`
--
ALTER TABLE `students_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_activities_ibfk_1` (`activity`),
  ADD KEY `user` (`user`);

--
-- Indices de la tabla `teachers_classes`
--
ALTER TABLE `teachers_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gruop` (`gruop`);

--
-- Indices de la tabla `users_classes`
--
ALTER TABLE `users_classes`
  ADD KEY `user` (`user`),
  ADD KEY `class` (`class`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `students_activities`
--
ALTER TABLE `students_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teachers_classes`
--
ALTER TABLE `teachers_classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`schedule`) REFERENCES `schedules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_fk_owner` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`class`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `students_activities`
--
ALTER TABLE `students_activities`
  ADD CONSTRAINT `students_activities_ibfk_1` FOREIGN KEY (`activity`) REFERENCES `activities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_activities_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teachers_classes`
--
ALTER TABLE `teachers_classes`
  ADD CONSTRAINT `teachers_classes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `classes` (`teacher`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users_classes`
--
ALTER TABLE `users_classes`
  ADD CONSTRAINT `users_classes_ibfk_1` FOREIGN KEY (`class`) REFERENCES `classes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `users_classes_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
