-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-09-2021 a las 17:47:46
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
  `group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `classes`
--

INSERT INTO `classes` (`id`, `name`, `teacher`, `group`) VALUES
(1, 'matemáticas', 1, 1),
(2, 'Fisica', 2, 1),
(3, 'Geometria', 2, 1);

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
(43, 'hdudhuds', '2021-09-14 15:32:31', 2, 3);

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
  ADD KEY `teacher` (`teacher`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `class` (`class`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
