-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28/10/2024 às 21:20
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_locacao_veiculos`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_avaliacao`
--

CREATE TABLE `tbl_avaliacao` (
  `id` int(10) UNSIGNED NOT NULL,
  `avaliacao` int(5) NOT NULL,
  `motivo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_combustivel`
--

CREATE TABLE `tbl_combustivel` (
  `id` int(10) NOT NULL,
  `combustivel` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_combustivel`
--

INSERT INTO `tbl_combustivel` (`id`, `combustivel`) VALUES
(1, 'Gasolina Comum'),
(2, 'Gasolina Aditivada'),
(3, 'Gasolina Premium'),
(4, 'Etanol (Álcool)'),
(5, 'Diesel Comum'),
(6, 'Diesel S-10'),
(7, 'Diesel Aditivado'),
(8, 'Gás Natural Veicular'),
(9, 'Biodiesel'),
(10, 'Hidrogênio'),
(11, 'Eletricidade'),
(12, 'Flex (Gasolina e Eta');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_contato`
--

CREATE TABLE `tbl_contato` (
  `id` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_cor`
--

CREATE TABLE `tbl_cor` (
  `id` int(10) NOT NULL,
  `cor` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_cor`
--

INSERT INTO `tbl_cor` (`id`, `cor`) VALUES
(1, 'Amarelo'),
(2, 'Azul'),
(3, 'Bege'),
(4, 'Branco'),
(5, 'Bronze'),
(6, 'Cinza'),
(7, 'Dourado'),
(8, 'Laranja'),
(9, 'Marrom'),
(10, 'Prata'),
(11, 'Preto'),
(12, 'Rosa'),
(13, 'Roxo'),
(14, 'Verde'),
(15, 'Vermelho');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_endereco`
--

CREATE TABLE `tbl_endereco` (
  `id` int(10) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cep` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_estado_civil`
--

CREATE TABLE `tbl_estado_civil` (
  `id` int(10) NOT NULL,
  `estado_civil` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_estado_civil`
--

INSERT INTO `tbl_estado_civil` (`id`, `estado_civil`) VALUES
(1, 'Solteiro(a)'),
(2, 'Casado(a)'),
(3, 'Divorciado(a)'),
(4, 'Viúvo(a)'),
(5, 'Separado(a) judicial'),
(6, 'União estável');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_manutencao`
--

CREATE TABLE `tbl_manutencao` (
  `id` int(11) NOT NULL,
  `id_veiculo` int(50) NOT NULL,
  `data_manutencao` date NOT NULL,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_marca`
--

CREATE TABLE `tbl_marca` (
  `id` int(10) NOT NULL,
  `id_tipo_veiculo` int(11) NOT NULL,
  `marca` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_marca`
--

INSERT INTO `tbl_marca` (`id`, `id_tipo_veiculo`, `marca`) VALUES
(1, 1, 'Acura'),
(2, 1, 'Alfa Romeo'),
(3, 1, 'Aston Martin'),
(4, 1, 'Audi'),
(5, 1, 'Bentley'),
(6, 1, 'BMW'),
(7, 1, 'Bugatti'),
(8, 1, 'Buick'),
(9, 1, 'Cadillac'),
(10, 1, 'Chevrolet'),
(11, 1, 'Chrysler'),
(12, 1, 'Citroën'),
(13, 1, 'Dodge'),
(14, 1, 'Ferrari'),
(15, 1, 'Fiat'),
(16, 1, 'Ford'),
(17, 1, 'Genesis'),
(18, 1, 'GMC'),
(19, 1, 'Honda'),
(20, 1, 'Hyundai'),
(21, 1, 'Infiniti'),
(22, 1, 'Jaguar'),
(23, 1, 'Jeep'),
(24, 1, 'Kia'),
(25, 1, 'Lamborghini'),
(26, 1, 'Land Rover'),
(27, 1, 'Lexus'),
(28, 1, 'Lincoln'),
(29, 1, 'Lotus'),
(30, 1, 'Maserati'),
(31, 1, 'Mazda'),
(32, 1, 'McLaren'),
(33, 1, 'Mercedes-Benz'),
(34, 1, 'Mini'),
(35, 1, 'Mitsubishi'),
(36, 1, 'Nissan'),
(37, 1, 'Pagani'),
(38, 1, 'Peugeot'),
(39, 1, 'Porsche'),
(40, 1, 'RAM'),
(41, 1, 'Renault'),
(42, 1, 'Rolls-Royce'),
(43, 1, 'Saab'),
(44, 1, 'Subaru'),
(45, 1, 'Suzuki'),
(46, 1, 'Tesla'),
(47, 1, 'Toyota'),
(48, 1, 'Volkswagen'),
(49, 1, 'Volvo'),
(50, 2, 'Aprilia'),
(51, 2, 'BMW Motorrad'),
(52, 2, 'Ducati'),
(53, 2, 'Harley-Davidson'),
(54, 2, 'Honda'),
(55, 2, 'Husqvarna'),
(56, 2, 'Indian'),
(57, 2, 'Kawasaki'),
(58, 2, 'KTM'),
(59, 2, 'MV Agusta'),
(60, 2, 'Piaggio'),
(61, 2, 'Royal Enfield'),
(62, 2, 'Suzuki'),
(63, 2, 'Triumph'),
(64, 2, 'Vespa'),
(65, 2, 'Yamaha');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_modelo`
--

CREATE TABLE `tbl_modelo` (
  `id` int(10) NOT NULL,
  `modelo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_profissao`
--

CREATE TABLE `tbl_profissao` (
  `id` int(10) NOT NULL,
  `profissao` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_profissao`
--

INSERT INTO `tbl_profissao` (`id`, `profissao`) VALUES
(1, 'Acompanhante de idosos'),
(2, 'Acordeonista'),
(3, 'Acrobata'),
(4, 'Acupuntura'),
(5, 'Adegueiro / Técnico de Adega'),
(6, 'Aderecista'),
(7, 'Adestrador (amestrador)'),
(8, 'Administrador'),
(9, 'Administrador de Segurança da Informação'),
(10, 'Administrador Judicial'),
(11, 'Advogado'),
(12, 'Advogado de Entretenimento'),
(13, 'Afiador de Metais'),
(14, 'Afinador de Máquinas de Injeção'),
(15, 'Afinador de Piano'),
(16, 'Agente Artístico'),
(17, 'Agente da Polícia Municipal (Guarda Municipal)'),
(18, 'Agente de Aeroporto'),
(19, 'Agente de Arte'),
(20, 'Agente de Crédito e Empréstimos'),
(21, 'Agente de Polícia de Segurança Pública (PSP)'),
(22, 'Agente de Polícia Marítima'),
(23, 'Agente de Seguros'),
(24, 'Agente de Viagens'),
(25, 'Agente Funerário'),
(26, 'Agente Musical'),
(27, 'Agente Oficial da Propriedade Industrial'),
(28, 'Agente Publicitário'),
(29, 'Agricultor'),
(30, 'Ajudante de Cozinha'),
(31, 'Ajudante de lar'),
(32, 'Ajudante Familiar'),
(33, 'Alergologista'),
(34, 'Alfaiate'),
(35, 'Alpinista Industrial / Técnico de Acesso'),
(36, 'Ama'),
(37, 'Ampelógrafo'),
(38, 'Ampelólogo'),
(39, 'Analista Buy-Side'),
(40, 'Analista de Agência de Turismo'),
(41, 'Analista de Business Intelligence / Analista BI'),
(42, 'Analista de Dados / Data Analytics'),
(43, 'Analista de Desempenho Desportivo'),
(44, 'Analista de Inteligência Comercial'),
(45, 'Analista de Marketing Digital'),
(46, 'Analista de Metodologia de Treino'),
(47, 'Analista de Pós-Venda'),
(48, 'Analista de Private Equity'),
(49, 'Analista de Social Media'),
(50, 'Analista ESG / Sustentabilidade'),
(51, 'Analista Financeiro'),
(52, 'Analista Sell-Side'),
(53, 'Anatomopatologista'),
(54, 'Anestesista (Anestesiologista)'),
(55, 'Angariador de Seguros'),
(56, 'Angiologista'),
(57, 'Animador'),
(58, 'Animador Cultural'),
(59, 'Animador Turístico'),
(60, 'Animador 3D'),
(61, 'Anotador de Cinema (Continuista)'),
(62, 'Antipodista'),
(63, 'Antropologia'),
(64, 'Apicultor'),
(65, 'Apresentador'),
(66, 'Aquaponia'),
(67, 'Aquicultor'),
(68, 'Aramista'),
(69, 'Árbitro'),
(70, 'Árbitro de Xadrez'),
(71, 'Argolista'),
(72, 'Argumentista'),
(73, 'Armador de Ferro'),
(74, 'Armador e Montador de Cabos Metálicos'),
(75, 'Arqueoastrónomo / Arqueoastronomia'),
(76, 'Arqueologia'),
(77, 'Arquiteto'),
(78, 'Arquitetura e Urbanismo'),
(79, 'Arquivista de Filmes'),
(80, 'Arquivista musical'),
(81, 'Arquivista (Arquivologista)'),
(82, 'Arranjador'),
(83, 'Artes Visuais (Artista Plástico)'),
(84, 'Artesão'),
(85, 'Artista de Circo'),
(86, 'Artista de Foley'),
(87, 'Artista Equestre (Circo)'),
(88, 'Artista Urbano'),
(89, 'Artista 2D/3D'),
(90, 'Art Handler'),
(91, 'Assentador de Refratários'),
(92, 'Assentador de Tacos'),
(93, 'Assessor de Imprensa'),
(94, 'Assistente Administrativo'),
(95, 'Assistente Comercial'),
(96, 'Assistente de Agência de Turismo'),
(97, 'Assistente de Animador'),
(98, 'Assistente de Animação'),
(99, 'Assistente de Arqueólogo'),
(100, 'Assistente de Atendimento ao Cliente'),
(101, 'Assistente de Câmara de Cinema'),
(102, 'Assistente de Cenografia'),
(103, 'Assistente de Compras'),
(104, 'Assistente de Creators'),
(105, 'Assistente de Direção (Animação)'),
(106, 'Assistente de Estação de Serviço ao Condutor'),
(107, 'Assistente de Estúdio'),
(108, 'Assistente de Eventos'),
(109, 'Assistente de Figurinista'),
(110, 'Assistente de Finalização'),
(111, 'Assistente de Medicina Dentária / Auxiliar de Dentista'),
(112, 'Assistente de Mixagem'),
(113, 'Assistente de Montador de Negativo'),
(114, 'Assistente de Museu ou Galeria de Arte'),
(115, 'Assistente de Operador de Câmara de Animação'),
(116, 'Assistente de Pesquisador Cinematográfico'),
(117, 'Assistente de Platô'),
(118, 'Assistente de Pós-Produção'),
(119, 'Assistente de Produtor Cinematográfico'),
(120, 'Assistente de Produtor de Casting'),
(121, 'Assistente de Produção Cultural'),
(122, 'Assistente de realização (cinema)'),
(123, 'Assistente de Revisor e Limpador'),
(124, 'Assistente de Som'),
(125, 'Assistente de Sondador (Driller Assistant)'),
(126, 'Assistente de Trucador'),
(127, 'Assistente Financeiro'),
(128, 'Assistente Social'),
(129, 'Assistente Virtual'),
(130, 'Astrobiólogo / Astrobiologia'),
(131, 'Astrobotânico / Astrobotânica'),
(132, 'Astrofísico / Astrofísica'),
(133, 'Astrogeólogo / Astrogeologia'),
(134, 'Astrólogo'),
(135, 'Astronauta'),
(136, 'Astrónomo'),
(137, 'Astroquímico / Astroquímica'),
(138, 'Atirador de Facas'),
(139, 'Atleta Profissional'),
(140, 'Ator'),
(141, 'Ator de Voz Original (Animação)'),
(142, 'Atuário'),
(143, 'Audiodescritor'),
(144, 'Auditor'),
(145, 'Auditor de Segurança da Informação'),
(146, 'Autor de Joias'),
(147, 'Auxiliar de Apoio Administrativo'),
(148, 'Auxiliar de Apoio Domiciliário a Idosos'),
(149, 'Auxiliar de Ação Educativa'),
(150, 'Auxiliar de Creche'),
(151, 'Auxiliar de Educação Infantil'),
(152, 'Auxiliar de Fisioterapia'),
(153, 'Auxiliar de Geriatria'),
(154, 'Auxiliar de Iluminação'),
(155, 'Auxiliar de Limpeza'),
(156, 'Auxiliar de Limpeza Hospitalar'),
(157, 'Auxiliar de Professor'),
(158, 'Auxiliar de Saúde'),
(159, 'Auxiliar de Serviços Gerais'),
(160, 'Auxiliar de Tráfego (Cinema)'),
(161, 'Auxiliar de Vendas'),
(162, 'Auxiliar de Veterinária'),
(163, 'Avaliador Olfativo'),
(164, 'Avicultor'),
(165, 'Azeitólogo / Oleólogo'),
(166, 'Baby Planner'),
(167, 'Baby-Sitter'),
(168, 'Back Office de Vendas'),
(169, 'Bagageiro'),
(170, 'Bailarino'),
(171, 'Baixista'),
(172, 'Bancário'),
(173, 'Bandolinista'),
(174, 'Banhos de Floresta – Forest Bathing'),
(175, 'Barbeiro / a'),
(176, 'Barreira (Circo)'),
(177, 'Baterista'),
(178, 'Bate-chapa de Veículos Automóveis (Funileiro)'),
(179, 'Bibliotecário'),
(180, 'Biblioteconomia'),
(181, 'Biblioterapeuta'),
(182, 'Biólogo'),
(183, 'Biotecnologista / Biotecnologia'),
(184, 'Blogger (Blogueiro)'),
(185, 'Bodyboarder'),
(186, 'Bombeador (Petróleo e Gás Natural)'),
(187, 'Bombeiro'),
(188, 'Booker / Agente de Modelo'),
(189, 'Botânico'),
(190, 'Business Information Security Officer'),
(191, 'Cabaretier'),
(192, 'Cabeleireiro'),
(193, 'Cabeleireiro de Espetáculos'),
(194, 'Cadista'),
(195, 'Cake Design'),
(196, 'Calceteiro'),
(197, 'Caldeireiro'),
(198, 'Calista'),
(199, 'Camarada (Circo)'),
(200, 'Camareira'),
(201, 'Canalizador (Encanador)'),
(202, 'Canteiro'),
(203, 'Cantoneiro de Limpeza'),
(204, 'Cantor'),
(205, 'Capataz de fazenda'),
(206, 'Capataz (Circo)'),
(207, 'Capitão de Navio'),
(208, 'Capitão Porteiro'),
(209, 'Caracterizador'),
(210, 'Cardiologista'),
(211, 'Cardiologista de Intervenção'),
(212, 'Cardiologista Pediátrico'),
(213, 'Caricaturista'),
(214, 'Carpinteiro'),
(215, 'Carpinteiro de Limpos'),
(216, 'Carpinteiro Naval'),
(217, 'Carteiro'),
(218, 'Cartógrafo'),
(219, 'Cartomágico'),
(220, 'Cartomante'),
(221, 'Cartunista'),
(222, 'Cavaleiro / Amazona (Hipismo)'),
(223, 'Caçador'),
(224, 'Caçador de Bolas de Golfe'),
(225, 'Cenarista de Animação'),
(226, 'Cenógrafo'),
(227, 'Cenotécnico'),
(228, 'Ceramista'),
(229, 'Chapeleiro'),
(230, 'Character Design (Design de Personagem)'),
(231, 'Chefe de Arte de Animação'),
(232, 'Chefe de Cozinha'),
(233, 'Chefe de Recepção / Gerente de Recepção'),
(234, 'Chief Information Officer (CIO)'),
(235, 'Chief Information Security Officer (CISO)'),
(236, 'Chief Technology Officer (CTO)'),
(237, 'Chocolate Maker'),
(238, 'Chocolatier (Chocolateiro)'),
(239, 'Ciclista Acrobático'),
(240, 'Ciclista / Ciclismo'),
(241, 'Ciência Política'),
(242, 'Cientista Alimentar / Ciência dos Alimentos'),
(243, 'Cientista Desportivo / Ciências do Desporto'),
(244, 'Cientista de Dados / Data Scientist'),
(245, 'Cientista de Playlists'),
(246, 'Cimenteiro'),
(247, 'Cineterapeuta – Cineterapia'),
(248, 'Cirurgião Cardiotorácico'),
(249, 'Cirurgião Cardiovascular'),
(250, 'Cirurgião Geral'),
(251, 'Cirurgião Maxilofacial'),
(252, 'Cirurgião Pediátrico'),
(253, 'Cirurgião Plástico (Cirurgia Estética e Reconstrutiva)'),
(254, 'Cirurgião Torácico'),
(255, 'Cirurgião Vascular'),
(256, 'Clap Loader'),
(257, 'Clarinetista'),
(258, 'Coaching'),
(259, 'Coach Desportivo'),
(260, 'Coach Sexual / Coaching de Sexualidade'),
(261, 'Colador-Marcador de Sincronismo'),
(262, 'Coletor de Dinheiro'),
(263, 'Colocador de Anúncios (Montador de Anúncios)'),
(264, 'Colocador de Papel de Parede'),
(265, 'Colocador de Telhados e Coberturas (Telhadista)'),
(266, 'Colorista de Animação'),
(267, 'Comediante'),
(268, 'Comentarista Esportivo / Comentador Desportivo'),
(269, 'Cómico'),
(270, 'Comissário de Bordo'),
(271, 'Community Manager'),
(272, 'Compositor'),
(273, 'Compositor de Trilhas Sonoras'),
(274, 'Compositor de Xadrez'),
(275, 'Comunicação organizacional'),
(276, 'Concierge de Hotel'),
(277, 'Condutor de Ambulâncias'),
(278, 'Condutor Manobrador'),
(279, 'Conferente de Animação'),
(280, 'Conselheiro Familiar'),
(281, 'Conselheiro Matrimonial'),
(282, 'Conservador de Registos'),
(283, 'Construção Naval'),
(284, 'Consultor Comercial'),
(285, 'Consultor de e-business'),
(286, 'Consultor de Imagem'),
(287, 'Consultor de Intercâmbio'),
(288, 'Consultor de Investimentos'),
(289, 'Consultor de Segurança da Informação'),
(290, 'Consultor de Vendas Externo'),
(291, 'Consultor Financeiro'),
(292, 'Contabilista'),
(293, 'Contorcionista'),
(294, 'Contrabaixista'),
(295, 'Contramestre de Movimentação de Carga (Deck Pusher)'),
(296, 'Contra-regra'),
(297, 'Controlador de Tráfego Aéreo'),
(298, 'Controller de Gestão'),
(299, 'Controller Financeiro (Financial Controller)'),
(300, 'Coordenador de Armazém'),
(301, 'Coordenador de Limpeza'),
(302, 'Coordenador de Pós-Produção'),
(303, 'Coordenador de Produção em Audiovisual'),
(304, 'Copywriter'),
(305, 'Coreógrafo'),
(306, 'Corretor de Bolsa'),
(307, 'Corretor de Imóveis / Consultor Imobiliário'),
(308, 'Corretor de Seguros'),
(309, 'Cortador de Carnes (Talhante)'),
(310, 'Cortador de vidro'),
(311, 'Cortador-Colador de Anéis'),
(312, 'Cortineiro'),
(313, 'Cosmetologista'),
(314, 'Cosmólogo / Cosmologia'),
(315, 'Costureira de Espetáculos'),
(316, 'Coveiro'),
(317, 'Cozinheiro'),
(318, 'Co-piloto'),
(319, 'Cravador de Joias'),
(320, 'Cravista'),
(321, 'Creators'),
(322, 'Criador de Animais'),
(323, 'Criador de Memes'),
(324, 'Crítico de Cinema / Crítica de Cinema'),
(325, 'Crítico de Vinhos'),
(326, 'Crítico Gastronómico'),
(327, 'Crítico Musical'),
(328, 'Cuidador de Idosos'),
(329, 'Curador de museus'),
(330, 'Cuspidor de Fogo'),
(331, 'Cyber Security Analyst'),
(332, 'Debuxador Têxtil / Designer Têxtil'),
(333, 'Decoração de Interiores'),
(334, 'Decoração (Decorador)'),
(335, 'Delegado de Informação Médica'),
(336, 'Demógrafo'),
(337, 'Dermatologista'),
(338, 'Dermatopatologista'),
(339, 'Desenhador Audiovisual'),
(340, 'Desenhador da Construção Civil'),
(341, 'Desenhador de Luz'),
(342, 'Desenvolvedores de software'),
(343, 'Designer de Comunicação'),
(344, 'Designer de Embalagem'),
(345, 'Designer de Iluminação'),
(346, 'Designer de Joias'),
(347, 'Designer de Mobiliário / Design de Móveis'),
(348, 'Designer de Mobilidade'),
(349, 'Designer de Moda'),
(350, 'Designer de Palco'),
(351, 'Designer de Produto'),
(352, 'Designer de Publicidade'),
(353, 'Designer de Sobrancelhas'),
(354, 'Designer de Unhas / Nail Designer'),
(355, 'Designer Gráfico'),
(356, 'Designer Multimédia / Designer Multimídia'),
(357, 'Design de Ambientes'),
(358, 'Design de Jogos'),
(359, 'Dialoguista'),
(360, 'Digital Marketer'),
(361, 'Diplomata'),
(362, 'Diretor Artístico'),
(363, 'Diretor Circense'),
(364, 'Diretor Comercial'),
(365, 'Diretor Criativo (Moda)'),
(366, 'Diretor de Animação'),
(367, 'Diretor de Arquivos'),
(368, 'Diretor de Arte'),
(369, 'Diretor de Arte de Animação'),
(370, 'Diretor de Atores / Diretor de Elenco'),
(371, 'Diretor de Biblioteca'),
(372, 'Diretor de cena'),
(373, 'Diretor de Criação'),
(374, 'Diretor de Dobragem (Dublagem)'),
(375, 'Diretor de Fiscalização da Obra (Fiscal de Obras)'),
(376, 'Diretor de Fotografia'),
(377, 'Diretor de Galeria de Arte'),
(378, 'Diretor de Loja (Gerente de Loja)'),
(379, 'Diretor de Marketing'),
(380, 'Diretor de Monumentos Nacionais'),
(381, 'Diretor de Museu'),
(382, 'Diretor de Obra'),
(383, 'Diretor de Operações / Chief Operating Officer (COO)'),
(384, 'Diretor de Produção (Audiovisual)'),
(385, 'Diretor de Recursos Humanos (RH)'),
(386, 'Diretor de Som'),
(387, 'Diretor de Voz (Animação)'),
(388, 'Diretor Esportivo / Dirigente Desportivo'),
(389, 'Diretor Financeiro (CFO)'),
(390, 'Diretor Técnico (Espetáculos)'),
(391, 'Distribuidor de Jornais Gratuitos'),
(392, 'Distribuidor de Mercadorias'),
(393, 'DJ Profissional (Disc Jockey)'),
(394, 'Dog Walker'),
(395, 'Dramaturgista'),
(396, 'Dramaturgo'),
(397, 'Duplo (Dublê)'),
(398, 'Ecologia'),
(399, 'Economista'),
(400, 'Editor Assistente (Assistente de Montagem)'),
(401, 'Editor Chefe / Edição Jornalística'),
(402, 'Editor de Livros'),
(403, 'Editor de Partituras Musicais'),
(404, 'Editor de Secção / Editoria Jornalística'),
(405, 'Editor de som'),
(406, 'Educador de Infância (Educação Infantil)'),
(407, 'Educador Financeiro (Coach Financeiro)'),
(408, 'Eletricista'),
(409, 'Eletricista de Automóveis'),
(410, 'Eletricista de Cinema'),
(411, 'Eletricista de Circo'),
(412, 'Eletricista‌ ‌de‌ ‌Espetáculos‌'),
(413, 'Eletrofisiologia Cardíaca'),
(414, 'Embalsamador'),
(415, 'Embrulhador de Presentes'),
(416, 'Empregada de Limpeza'),
(417, 'Empregado de Bar (Barman/Barmaid)'),
(418, 'Empregado de Mesa'),
(419, 'Empresário de Futebol / Agente de Jogadores'),
(420, 'Encantador de Serpentes'),
(421, 'Encarregado de Loja'),
(422, 'Encarregado de Sonda (Tool Pusher/Tourpusher)'),
(423, 'Encenador'),
(424, 'Endocrinologista'),
(425, 'Enfermagem'),
(426, 'Enfermeira Parteira'),
(427, 'Engenharia Acústica'),
(428, 'Engenharia Agrícola'),
(429, 'Engenharia Ambiental'),
(430, 'Engenharia Biomédica'),
(431, 'Engenharia Bioquímica'),
(432, 'Engenharia Civil'),
(433, 'Engenharia de Produção'),
(434, 'Engenharia de Software'),
(435, 'Engenharia Eletrónica'),
(436, 'Engenharia Eletrotécnica'),
(437, 'Engenharia Hidráulica / Engenharia Hídrica'),
(438, 'Engenharia Informática'),
(439, 'Engenharia Mecatrónica'),
(440, 'Engenharia Multimédia'),
(441, 'Engenharia Sanitária'),
(442, 'Engenharia Têxtil'),
(443, 'Engenharia Topográfica (Topografia)'),
(444, 'Engenheiro Aeroespacial'),
(445, 'Engenheiro Aeronáutico'),
(446, 'Engenheiro Alimentar / Engenharia de Alimentos'),
(447, 'Engenheiro Biológico / Bioengenharia'),
(448, 'Engenheiro de Analytics / Engenharia Analítica'),
(449, 'Engenheiro de Dados / Engenharia de Dados'),
(450, 'Engenheiro de Gravação'),
(451, 'Engenheiro de Machine Learning'),
(452, 'Engenheiro de Petróleo e Gás'),
(453, 'Engenheiro de Segurança do Trabalho'),
(454, 'Engenheiro de Telecomunicações'),
(455, 'Engenheiro de Transportes e da Mobilidade'),
(456, 'Engenheiro de Voo (Técnico de Voo): O que faz e como ser?'),
(457, 'Engenheiro Florestal'),
(458, 'Engenheiro Hospitalar'),
(459, 'Engenheiro IA / Engenharia de Inteligência Artificial'),
(460, 'Engenheiro Industrial'),
(461, 'Engenheiro Mecânico'),
(462, 'Engenheiro Nuclear'),
(463, 'Engenheiro Químico'),
(464, 'Engraxador'),
(465, 'Enólogo'),
(466, 'Ensaiador Circense'),
(467, 'Ensaiador-Fundidor'),
(468, 'Envernizador'),
(469, 'Equilibrista'),
(470, 'Equoterapia / Hipoterapia'),
(471, 'Escritor'),
(472, 'Escrivão de Direito'),
(473, 'Escultor'),
(474, 'Espalhador de Betuminosos (Asfaltador)'),
(475, 'Especialista de Infografia / Infografista'),
(476, 'Especialista de SIG (Sistemas de Informação Geográfica)'),
(477, 'Especialista em Energias Renováveis'),
(478, 'Especialista em e-Commerce'),
(479, 'Especialista em Inteligência Artificial (IA)'),
(480, 'Especialista em SEO'),
(481, 'Espeleologia (Espeleólogo)'),
(482, 'Estafeta'),
(483, 'Estampador de Metal'),
(484, 'Estampador Têxtil'),
(485, 'Estatística'),
(486, 'Esteticista'),
(487, 'Estilista'),
(488, 'Estilista de Unhas de Gel'),
(489, 'Estivador'),
(490, 'Estofador de automóveis / Capoteiro'),
(491, 'Estofador de móveis'),
(492, 'Estomatologista'),
(493, 'Estucador'),
(494, 'Etólogo Animal / Etologia'),
(495, 'Excêntrico Musical'),
(496, 'Fadista'),
(497, 'Fagote'),
(498, 'Faquir'),
(499, 'Farmacêutico'),
(500, 'Farmacologista Clínico'),
(501, 'Figurante'),
(502, 'Figurinista'),
(503, 'Filigranista'),
(504, 'Filólogo'),
(505, 'Filosofia'),
(506, 'Finalizador de Filmes (Técnico de Finalização Cinematográfica)'),
(507, 'Fiscal de Caixa'),
(508, 'Fiscal de Transportes Públicos'),
(509, 'Físico'),
(510, 'Fisioterapeuta'),
(511, 'Flautista'),
(512, 'Floricultura'),
(513, 'Florista'),
(514, 'Forjador'),
(515, 'Fotógrafo de Cena'),
(516, 'Fotógrafo de Dança'),
(517, 'Fotógrafo (a)'),
(518, 'Fotojornalista'),
(519, 'Front-End Developer'),
(520, 'Fruticultor'),
(521, 'Fundidor Moldador'),
(522, 'Gags Man'),
(523, 'Gaitista'),
(524, 'Galerista'),
(525, 'Gamer'),
(526, 'Game Tester / Testador de Jogos'),
(527, 'Gastroenterologista'),
(528, 'Gastroenterologista Pediátrico'),
(529, 'Gastronomia'),
(530, 'Gemólogo'),
(531, 'Geneticista'),
(532, 'Geofísica'),
(533, 'Geógrafo'),
(534, 'Geólogo'),
(535, 'Geoquímico / Geoquímica'),
(536, 'Gerente Administrativo'),
(537, 'Gerente Comercial'),
(538, 'Gerente de Agência de Turismo'),
(539, 'Gerente de Cave / Cavista'),
(540, 'Gerente de Compliance'),
(541, 'Gerente de Escritório / Office Manager'),
(542, 'Gerente de Hotel / Gestor Hoteleiro'),
(543, 'Gerente de Programas (Program Manager)'),
(544, 'Gerente de Restaurante'),
(545, 'Gestor Cultural'),
(546, 'Gestor da Felicidade Organizacional'),
(547, 'Gestor de Campos de Golfe'),
(548, 'Gestor de Carreiras Desportivas'),
(549, 'Gestor de Carteira de Clientes / Customer Success (CSM)'),
(550, 'Gestor de Ecorrelações'),
(551, 'Gestor de Fundos de Investimento'),
(552, 'Gestor de Inovação'),
(553, 'Gestor de Património'),
(554, 'Gestor de Reservas de Hotel'),
(555, 'Gestor de Resíduos'),
(556, 'Gestor de Talentos'),
(557, 'Gestor de Tráfego Pago'),
(558, 'Gestor de Transformação Digital'),
(559, 'Gestor de Turismo Rural'),
(560, 'Gestor de Turno'),
(561, 'Gestor Esportivo / Gestor Desportivo'),
(562, 'Gestor Executivo'),
(563, 'Gestão Ambiental'),
(564, 'Gestão de Turismo'),
(565, 'Gestão Equina / Equinocultura'),
(566, 'Ghost Writer'),
(567, 'Ginasta / Ginástica'),
(568, 'Ginecologista'),
(569, 'Ginecologista Oncológico'),
(570, 'Golfista / Jogador de Golfe'),
(571, 'Governanta de Hotel'),
(572, 'Governanta Doméstica'),
(573, 'Gravador de Joias'),
(574, 'Greenkeeper'),
(575, 'Guarda da GNR'),
(576, 'Guarda Florestal'),
(577, 'Guarda Prisional (Agente Penitenciário)'),
(578, 'Guia de Astroturismo'),
(579, 'Guia de Ecoturismo'),
(580, 'Guia de Enoturismo'),
(581, 'Guia de Olivoturismo'),
(582, 'Guia de Turismo Equestre'),
(583, 'Guia Intérprete'),
(584, 'Guia Turístico'),
(585, 'Guindasteiro Offshore (Crane Operator)'),
(586, 'Guitarrista'),
(587, 'Hair Stylist'),
(588, 'Harpista'),
(589, 'Hematologista'),
(590, 'Hepatologista'),
(591, 'Hidrobiólogo / Hidrobiologia'),
(592, 'Hidrogeólogo / Hidrogeologia'),
(593, 'Hidrologista / Hidrologia'),
(594, 'Hidroponia'),
(595, 'Historiador'),
(596, 'Homem de Área (Roustabouts)'),
(597, 'Homem do Globo da Morte'),
(598, 'Homem-Canhão (Homem-Bala)'),
(599, 'Homeopata'),
(600, 'Horticultor'),
(601, 'Host / Hostess'),
(602, 'Humorista'),
(603, 'Icarista'),
(604, 'Ilusionista'),
(605, 'Ilustrador / Desenhador'),
(606, 'Influencer de apostas desportivas'),
(607, 'Influenciador Digital'),
(608, 'Inspetor de Centros de Inspeção Técnica a Veículos'),
(609, 'Instalador de Ar-Condicionado'),
(610, 'Instalador de Energia Solar e Eólica'),
(611, 'Instrutor de Artes Marciais'),
(612, 'Instrutor de Condução'),
(613, 'Instrutor de Fitness'),
(614, 'Instrutor de Surf'),
(615, 'Instrutor de Xadrez'),
(616, 'Instrutor de Yoga'),
(617, 'Instrutor de Zumba'),
(618, 'Intensivista Pediátrico'),
(619, 'Intérprete de Língua Gestual (Libras)'),
(620, 'Inventor de Brinquedos'),
(621, 'Jardineiro'),
(622, 'Joalheiro'),
(623, 'Jogador de Andebol ou Handebol'),
(624, 'Jogador de Basquetebol ou Basquete'),
(625, 'Jogador de Futebol'),
(626, 'Jogador de Voleibol ou Vôlei'),
(627, 'Jóquei (Corridas de Cavalos)'),
(628, 'Jornalismo'),
(629, 'Jornalista de Ciência / Jornalismo Científico'),
(630, 'Jornalista de Dados / Jornalismo de Dados'),
(631, 'Jornalista de Economia'),
(632, 'Jornalista de Investigação / Jornalismo Investigativo'),
(633, 'Jornalista de Política / Jornalista Político'),
(634, 'Jornalista Digital'),
(635, 'Jornalista Esportivo / Jornalista Desportivo'),
(636, 'Judoca / Judo'),
(637, 'Juiz'),
(638, 'Juiz de Paz'),
(639, 'Jurista (Jurisconsulto)'),
(640, 'Karateca / Karaté'),
(641, 'Ladrilhador (Azulejador)'),
(642, 'Lapidador de joias'),
(643, 'Lapidador de Vidro ou Cristais'),
(644, 'Lavadeiro e Engomador de Roupa'),
(645, 'Lavador de Carros'),
(646, 'Ledor / Leitor para Deficientes Visuais'),
(647, 'Leitor de Contadores'),
(648, 'Letrista de Animação'),
(649, 'Limpador de Chaminés'),
(650, 'Limpador de Fachadas'),
(651, 'Locutor'),
(652, 'Logger'),
(653, 'Lutador de Kickboxing'),
(654, 'Lutador de MMA'),
(655, 'Lutador de Muay Thai'),
(656, 'Luthier (Violeiro)'),
(657, 'Maestro (Regente)'),
(658, 'Mágico'),
(659, 'Maître de Restaurante / Chefe de Sala'),
(660, 'Malabarismo'),
(661, 'Manager Musical'),
(662, 'Manicure / Pedicure'),
(663, 'Maquetista'),
(664, 'Maquilhadora Profissional (Maquiadora)'),
(665, 'Maquilhador de Espetáculo'),
(666, 'Maquinista'),
(667, 'Maquinista Auxiliar (Espetáculo)'),
(668, 'Maquinista de Cinema'),
(669, 'Maquinista de Espetáculo'),
(670, 'Marcador de Anéis'),
(671, 'Marceneiro'),
(672, 'Marinheiro Pescador'),
(673, 'Marionetista'),
(674, 'Marketing'),
(675, 'Massagista Desportivo'),
(676, 'Massagista de estética'),
(677, 'Matemático'),
(678, 'Mecânico'),
(679, 'Mecânico de Máquinas Agrícolas e Industriais'),
(680, 'Mediador'),
(681, 'Mediador Intercultural'),
(682, 'Medicina da Reprodução'),
(683, 'Medicina Materno-Fetal'),
(684, 'Médico de Clínica Geral (Clínico Geral)'),
(685, 'Médico de Medicina Desportiva'),
(686, 'Médico de Medicina Nuclear'),
(687, 'Médico de Medicina Tropical'),
(688, 'Médico de Saúde Pública'),
(689, 'Médico do Trabalho'),
(690, 'Médico Fisiatra'),
(691, 'Médico Geneticista'),
(692, 'Médico Infectologista'),
(693, 'Médico Intensivista (Medicina Intensiva)'),
(694, 'Médico Internista (Medicina Interna)'),
(695, 'Médico Legista'),
(696, 'Médico Nefrologista'),
(697, 'Médico Radiologista'),
(698, 'Médico Radioncologista (Radioterapeuta)'),
(699, 'Medidor Orçamentista'),
(700, 'Mensageiro de Hotel'),
(701, 'Mergulhador'),
(702, 'Mestre Cervejeiro'),
(703, 'Mestre Costeiro Pescador'),
(704, 'Mestre de Bailado'),
(705, 'Mestre de Pista'),
(706, 'Mestre do Largo Pescador'),
(707, 'Mestre do Tráfego Local'),
(708, 'Meteorologista'),
(709, 'Microbiologia Médica'),
(710, 'Microfonista'),
(711, 'Mímico'),
(712, 'Mineralogia (Mineralogista)'),
(713, 'Modelador Têxtil / Modelista'),
(714, 'Modelador 3D'),
(715, 'Modelista em Cera'),
(716, 'Modelo'),
(717, 'Modista / Costureira (o)'),
(718, 'Montador de Alvenarias e de Pré-Estofados'),
(719, 'Montador de Andaimes'),
(720, 'Montador de Negativo'),
(721, 'Montador de Tubagens'),
(722, 'Montador (Editor)'),
(723, 'Mordomo de Hotel'),
(724, 'Mordomo Pessoal'),
(725, 'Motorista de Passageiros (Motorista de Ônibus)'),
(726, 'Motorista de Pesados / Caminhoneiro'),
(727, 'Motorista de Táxi'),
(728, 'Motorista de Transporte de Crianças / Motorista de Transporte Escolar'),
(729, 'Motorista Particular'),
(730, 'Motorista Uber / Motorista TVDE'),
(731, 'Motosserrista'),
(732, 'Músico'),
(733, 'Musicoterapeuta – Musicoterapia'),
(734, 'Músico de Orquestra'),
(735, 'Músico de sessão'),
(736, 'Nadador / Natação'),
(737, 'Nanny'),
(738, 'Nefrologista Pediátrico'),
(739, 'Neonatologista'),
(740, 'Neurocirurgião'),
(741, 'Neurocirurgião Pediátrico'),
(742, 'Neurofisiologista'),
(743, 'Neurologista'),
(744, 'Neuropatologista'),
(745, 'Neuropediatra'),
(746, 'Neurorradiologista'),
(747, 'Notário'),
(748, 'Numerólogo / Numerologia'),
(749, 'Nutricionista Desportivo'),
(750, 'Nutrição'),
(751, 'Oboísta'),
(752, 'Obstetra'),
(753, 'Obstetrícia'),
(754, 'Oceanografia'),
(755, 'Odontologia (Medicina Dentária)'),
(756, 'Oficial de Justiça'),
(757, 'Oficial de Marinha'),
(758, 'Oficial de Registos'),
(759, 'Oficial de Registos Especialista'),
(760, 'Oftalmologista'),
(761, 'Oleiro'),
(762, 'Olivicultor'),
(763, 'Oncologista'),
(764, 'Oncologista Pediátrico'),
(765, 'Operador de Armazém'),
(766, 'Operador de Caixa'),
(767, 'Operador de Câmara'),
(768, 'Operador de Câmara de Animação (Cinegrafista)'),
(769, 'Operador de empilhadeira'),
(770, 'Operador de Fundição'),
(771, 'Operador de Gerador'),
(772, 'Operador de grua e guindastes'),
(773, 'Operador de Loja'),
(774, 'Operador de máquinas'),
(775, 'Operador de máquinas de escavação'),
(776, 'Operador de Máquinas de Lavandaria'),
(777, 'Operador de Prensa de Forjar'),
(778, 'Operador de ROV'),
(779, 'Operador de Som'),
(780, 'Operador de Steady Cam'),
(781, 'Operador de Telecinema (Telecine)'),
(782, 'Operador de Telemarketing'),
(783, 'Operador de Vídeo'),
(784, 'Operador de Video Assist'),
(785, 'Optometrista'),
(786, 'Organista'),
(787, 'Ortodontia'),
(788, 'Ortopedista'),
(789, 'Ortopedista Infantil'),
(790, 'Osteopata'),
(791, 'Otorrinolaringologista'),
(792, 'Outros'),
(793, 'Ourives'),
(794, 'Padeiro'),
(795, 'Padre'),
(796, 'Paisagista'),
(797, 'Pai Natal (Mãe Natal)'),
(798, 'Paleontologia (Paleontólogo)'),
(799, 'Palhaço'),
(800, 'Pandeirista'),
(801, 'Paramédico'),
(802, 'Partner'),
(803, 'Pasteleiro / Confeiteiro'),
(804, 'Pastor'),
(805, 'Patologista Clínico'),
(806, 'Pediatra'),
(807, 'Pedologia (Pedólogo)'),
(808, 'Pedopsiquiatra'),
(809, 'Pedreiro'),
(810, 'Peixeira'),
(811, 'Penetration Test Engineer'),
(812, 'Percussionista'),
(813, 'Perfumista'),
(814, 'Personal Chef / Private Chef'),
(815, 'Personal Stylist / Fashion Stylist'),
(816, 'Personal Trainer'),
(817, 'Pescador'),
(818, 'Pesquisador Cinematográfico'),
(819, 'Pet-Sitter'),
(820, 'Pet-Táxi'),
(821, 'Pianista'),
(822, 'Picker'),
(823, 'Piloto de Avião'),
(824, 'Pintor Artístico (Cenários)'),
(825, 'Pintor à Pistola de Superfícies'),
(826, 'Pintor de Arte'),
(827, 'Pintor (Construção Civil)'),
(828, 'Pivô / Apresentador de Notícias'),
(829, 'Pizzaiolo'),
(830, 'Plataformista (Roughneck)'),
(831, 'Pneumologista'),
(832, 'Podologista'),
(833, 'Polidor'),
(834, 'Polidor de Pedra'),
(835, 'Polidor de Vidro'),
(836, 'Ponto'),
(837, 'Porteiro'),
(838, 'Preparador de Elenco'),
(839, 'Preparador de Refeições Rápidas'),
(840, 'Preparador Físico'),
(841, 'Prestador de Cuidados a Animais'),
(842, 'Produtor Audiovisual'),
(843, 'Produtor de Animação'),
(844, 'Produtor de Base'),
(845, 'Produtor de Casting / Produtor de Elenco'),
(846, 'Produtor de Eventos'),
(847, 'Produtor de Informação'),
(848, 'Produtor de Moda'),
(849, 'Produtor de Platô'),
(850, 'Produtor de Set'),
(851, 'Produtor Executivo (Audiovisual)'),
(852, 'Produtor Fonográfico'),
(853, 'Produtor Musical'),
(854, 'Produtor Publicitário'),
(855, 'Professor de Alemão'),
(856, 'Professor de Antropologia'),
(857, 'Professor de Aplicações Informáticas'),
(858, 'Professor de Bailado'),
(859, 'Professor de Biologia'),
(860, 'Professor de Biologia e Geologia'),
(861, 'Professor de Braille'),
(862, 'Professor de Ciências Naturais'),
(863, 'Professor de Ciência Política'),
(864, 'Professor de Clássicos da Literatura'),
(865, 'Professor de Desenho'),
(866, 'Professor de Direito'),
(867, 'Professor de Economia'),
(868, 'Professor de Educação Física'),
(869, 'Professor de Educação Moral e Religiosa Católica'),
(870, 'Professor de Educação Visual (EVT)'),
(871, 'Professor de Espanhol'),
(872, 'Professor de Filosofia'),
(873, 'Professor de Física'),
(874, 'Professor de Físico-Química'),
(875, 'Professor de Francês'),
(876, 'Professor de Geografia'),
(877, 'Professor de Geologia'),
(878, 'Professor de Geometria Descritiva'),
(879, 'Professor de Grego'),
(880, 'Professor de História'),
(881, 'Professor de História da Cultura e das Artes'),
(882, 'Professor de Inglês'),
(883, 'Professor de Jiu-Jitsu (Instrutor de Jiu-Jitsu)'),
(884, 'Professor de Judo'),
(885, 'Professor de Karaté / Instrutor de Karaté'),
(886, 'Professor de Krav Maga'),
(887, 'Professor de Latim'),
(888, 'Professor de Literatura Portuguesa'),
(889, 'Professor de Matemática'),
(890, 'Professor de Matemática Aplicada às Ciências Sociais (MACS)'),
(891, 'Professor de Materiais e Tecnologias'),
(892, 'Professor de Música'),
(893, 'Professor de Oficina das Artes'),
(894, 'Professor de Oficina Multimédia'),
(895, 'Professor de Português'),
(896, 'Professor de Português Adaptado a Alunos com Deficiência Auditiva'),
(897, 'Professor de Português Língua Não Materna (PLNM)'),
(898, 'Professor de Português L2 para Surdos'),
(899, 'Professor de Psicologia'),
(900, 'Professor de Química'),
(901, 'Professor de Sociologia'),
(902, 'Professor de TIC'),
(903, 'Professor do Ensino Especial (Educação Especial e Inclusiva)'),
(904, 'Professor Online'),
(905, 'Profiler (Criminal Profiling)'),
(906, 'Profissional de Jiu-Jitsu'),
(907, 'Profissional de Marketing Digital'),
(908, 'Profissional LEED'),
(909, 'Programador Cultural'),
(910, 'Programador de Videojogos'),
(911, 'Promotor de Vendas'),
(912, 'Promotor Musical'),
(913, 'Psicologia'),
(914, 'Psicólogo Desportivo / Psicologia do Esporte ou do Desporto'),
(915, 'Psicólogo Infantojuvenil'),
(916, 'Psicólogo para Gatos'),
(917, 'Psicomotricista'),
(918, 'Psicopedagogo / Psicopedagogia'),
(919, 'Psiquiatra'),
(920, 'Psiquiatra Forense'),
(921, 'Pugilista / Boxe'),
(922, 'Queijeiro / Queijeira'),
(923, 'Químico'),
(924, 'Quirólogo / Quirologia'),
(925, 'Quiromante / Quiromancia'),
(926, 'Quiropraxia (Quiroprática)'),
(927, 'Rabolista (Artista Substituto)'),
(928, 'Radiologista'),
(929, 'Ranicultura (Criação de Rãs)'),
(930, 'Realizador (Diretor de Cinema)'),
(931, 'Rececionista de Armazém'),
(932, 'Recepcionista de Hotel'),
(933, 'Recreador de Hotel'),
(934, 'Relações Internacionais'),
(935, 'Reparador de Bicicletas'),
(936, 'Repórter de Imagem / Repórter Cinematográfico'),
(937, 'Repórter de Rádio / Radiojornalismo'),
(938, 'Repórter de TV / Telejornalismo'),
(939, 'Repositor'),
(940, 'Representante de Vendas Internas'),
(941, 'Responsável de Reinserção'),
(942, 'Restaurador'),
(943, 'Reumatologista'),
(944, 'Reumatologista Pediátrico'),
(945, 'Revisor de Filme'),
(946, 'Revisor de Textos Braille'),
(947, 'Revisor de Texto (Revisor Editorial)'),
(948, 'Rigger de Personagem'),
(949, 'Roadie'),
(950, 'Road Manager'),
(951, 'Roteirista de Animação (Guionista)'),
(952, 'Roteirista / Guionista'),
(953, 'Sales Development Representative'),
(954, 'Salva-Vidas'),
(955, 'Sapador Florestal (Brigadista de Prevenção)'),
(956, 'Sapateiro'),
(957, 'Sargento da GNR'),
(958, 'Saxofonista'),
(959, 'Scouter de Moda'),
(960, 'Scout / Olheiro de Futebol'),
(961, 'Scrum Master'),
(962, 'Secretária (Secretariado)'),
(963, 'Secretário de Frente (Circo)'),
(964, 'Secretário de Justiça'),
(965, 'Secretário de Orquestra'),
(966, 'Secretário Teatral'),
(967, 'Segurança'),
(968, 'Segurança da Informação'),
(969, 'Sericicultura (Criação de Bichos-da-Seda)'),
(970, 'Serralheiro'),
(971, 'Serralheiro Civil'),
(972, 'Serralheiro de Moldes, Cunhos e Cortantes'),
(973, 'Shaper'),
(974, 'Shopper'),
(975, 'Sismologia (Sismólogo)'),
(976, 'Social Media Manager'),
(977, 'Sociólogo'),
(978, 'Soldador'),
(979, 'Solicitador'),
(980, 'Sommelier de Azeites'),
(981, 'Sommelier de Cervejas'),
(982, 'Sommelier de Chocolate'),
(983, 'Sommelier ou Escanção'),
(984, 'Sondador (Driller)'),
(985, 'Sonoplasta'),
(986, 'Soprador de Vidro'),
(987, 'Sound Designer'),
(988, 'Stage Hand'),
(989, 'Stage Manager'),
(990, 'Storyboarder'),
(991, 'Streamer / Streaming Profissional'),
(992, 'Subeditor de Imprensa'),
(993, 'Supervisor de Agência de Turismo'),
(994, 'Supervisor de Limpeza'),
(995, 'Supervisor Musical em Audiovisuais'),
(996, 'Surfista'),
(997, 'Sushiman / Chefe de Sushi'),
(998, 'Taekwondista / Taekwondo'),
(999, 'Tanoeiro'),
(1000, 'Tarólogo / Tarotista'),
(1001, 'Tatuador'),
(1002, 'Teclista (Tecladista)'),
(1003, 'Técnico Auxiliar de Saúde'),
(1004, 'Técnico de Aeroponia'),
(1005, 'Técnico de Análises Clínicas e Saúde Pública'),
(1006, 'Técnico de Apoio Psicossocial'),
(1007, 'Técnico de Atendimento Público'),
(1008, 'Técnico de Audiovisuais'),
(1009, 'Técnico de Automação, Robótica e Controlo Industrial'),
(1010, 'Técnico de Caprinocultura / Caprinicultura'),
(1011, 'Técnico de Comunicação e Marketing'),
(1012, 'Técnico de Contabilidade'),
(1013, 'Técnico de Cunicultura / Criação de Coelhos'),
(1014, 'Técnico de Desporto'),
(1015, 'Técnico de Eletrotecnia'),
(1016, 'Técnico de Elevadores'),
(1017, 'Técnico de Emissões de Rádio'),
(1018, 'Técnico de Emissões de Televisão'),
(1019, 'Técnico de equipamento de espetáculo'),
(1020, 'Técnico de Iluminação'),
(1021, 'Técnico de Informática'),
(1022, 'Técnico de Laboratório Cinematográfico'),
(1023, 'Técnico de Manutenção de Aeronaves'),
(1024, 'Técnico de Manutenção de Equipamento de Cinema'),
(1025, 'Técnico de Manutenção Eletrónica'),
(1026, 'Técnico de Manutenção Industrial de Metalurgia e Metalomecânica'),
(1027, 'Técnico de Mecatrónica Automóvel'),
(1028, 'Técnico de Mixagens'),
(1029, 'Técnico de Multimédia'),
(1030, 'Técnico de Obra (Técnico em Edificações)'),
(1031, 'Técnico de Ovinocultura / Ovinicultura'),
(1032, 'Técnico de Proteção Civil / Agente de Proteção e Defesa Civil'),
(1033, 'Técnico de Recursos Humanos'),
(1034, 'Técnico de Rega / Técnico de Irrigação e Drenagem'),
(1035, 'Técnico de Segurança Alimentar e Nutricional'),
(1036, 'Técnico de Segurança da Informação'),
(1037, 'Técnico de Segurança e Saúde no Trabalho'),
(1038, 'Técnico de Serviços Educativos'),
(1039, 'Técnico de Som'),
(1040, 'Técnico de Termalismo e Bem-Estar'),
(1041, 'Técnico de Tomada de Som'),
(1042, 'Técnico em Biocombustíveis'),
(1043, 'Técnico em Controle Ambiental'),
(1044, 'Técnico em Efeitos Especiais Físicos'),
(1045, 'Técnico em Efeitos Especiais Óticos'),
(1046, 'Técnico em Galvanoplastia'),
(1047, 'Técnico em Transferência Sonora'),
(1048, 'Técnico Operador de Caracteres'),
(1049, 'Tenista Profissional'),
(1050, 'Terapeuta Capilar'),
(1051, 'Terapeuta da Fala'),
(1052, 'Terapeuta Ocupacional'),
(1053, 'Terapeuta Sexual / Sexologia'),
(1054, 'Timpanista'),
(1055, 'Tocador de Cavaquinho'),
(1056, 'Tocador de Concertina'),
(1057, 'Torrista (Derrick Man)'),
(1058, 'Trabalhador da Triagem de Resíduos'),
(1059, 'Trabalhador de Corte a Oxi-gás'),
(1060, 'Trabalhador de Estufas'),
(1061, 'Trader Esportivo / Trader Desportivo'),
(1062, 'Trader Financeiro'),
(1063, 'Tradutor'),
(1064, 'Transcritor de Texto Braille'),
(1065, 'Trapezista'),
(1066, 'Tratador de Cavalos'),
(1067, 'Treinador de animais'),
(1068, 'Treinador de Equitação / Treinador de Cavalos'),
(1069, 'Treinador de Futebol (Técnico de Futebol)'),
(1070, 'Treinador de Golfe'),
(1071, 'Treinador de Judo'),
(1072, 'Treinador de Karaté'),
(1073, 'Treinador de Surf'),
(1074, 'Treinador de Xadrez'),
(1075, 'Trombonista'),
(1076, 'Trompetista'),
(1077, 'Trucador Cinematográfico'),
(1078, 'Turismólogo'),
(1079, 'Tutor de Cursos à Distância'),
(1080, 'Urbanista'),
(1081, 'Urologista'),
(1082, 'UX & UI Designers'),
(1083, 'Vendedor'),
(1084, 'Vendedor Ambulante'),
(1085, 'Vendedor Ambulante de Produtos Alimentares'),
(1086, 'Vendedor de Loja'),
(1087, 'Vendedor de Quiosque'),
(1088, 'Ventríloquo'),
(1089, 'Veterinário'),
(1090, 'Veterinário de Exóticos'),
(1091, 'Videomaker'),
(1092, 'Vídeo Analista de Futebol'),
(1093, 'Vidraceiro | Vidreiro'),
(1094, 'Vigilante da Natureza / Guarda-Parques'),
(1095, 'Vigilante de crianças'),
(1096, 'Vinicultor'),
(1097, 'Violinista'),
(1098, 'Violista'),
(1099, 'Violoncelista'),
(1100, 'Visagista'),
(1101, 'Viticultor'),
(1102, 'Vitrinista / Vitrinismo'),
(1103, 'Viveirista'),
(1104, 'Vlogger'),
(1105, 'Vocal Coach Bilingue'),
(1106, 'Vulcanologia (Vulcanólogo)'),
(1107, 'Walker Talker'),
(1108, 'Warehouse Manager (Chefe de Armazém)'),
(1109, 'Web Designer'),
(1110, 'Wine Hunter / Caçador de Vinhos'),
(1111, 'Xadrezista (Jogador de Xadrez)'),
(1112, 'Xilógrafo (Xilografista)'),
(1113, 'Youtuber'),
(1114, 'Zelador de Guarda-Roupa'),
(1115, 'Zoólogo'),
(1116, 'Zootécnica');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_tipo_veiculo`
--

CREATE TABLE `tbl_tipo_veiculo` (
  `id` int(11) NOT NULL,
  `tipo_veiculo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbl_tipo_veiculo`
--

INSERT INTO `tbl_tipo_veiculo` (`id`, `tipo_veiculo`) VALUES
(1, 'Carro'),
(2, 'Motocicleta');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id` int(10) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `cnh` varchar(15) NOT NULL,
  `nascimento` varchar(10) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `rg` int(15) NOT NULL,
  `orgao_expedidor` varchar(20) NOT NULL,
  `blacklist` int(2) NOT NULL,
  `id_profissao` int(10) NOT NULL,
  `id_contato` int(10) NOT NULL,
  `id_endereco` int(10) NOT NULL,
  `id_locador` int(10) NOT NULL,
  `id_estado_civil` int(10) NOT NULL,
  `id_avaliacao` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbl_veiculo`
--

CREATE TABLE `tbl_veiculo` (
  `id` int(10) NOT NULL,
  `id_tipo_veiculo` int(10) NOT NULL,
  `id_motorista` int(10) NOT NULL,
  `id_modelo` int(10) NOT NULL,
  `id_marca` int(10) NOT NULL,
  `id_cor` int(10) NOT NULL,
  `id_combustivel` int(10) NOT NULL,
  `disponibilidade` tinyint(1) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `chassi` varchar(20) NOT NULL,
  `motor` varchar(10) NOT NULL,
  `ano` varchar(10) NOT NULL,
  `data_de_entrega` date NOT NULL,
  `data_de_devolucao` date NOT NULL,
  `quilometragem` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbl_avaliacao`
--
ALTER TABLE `tbl_avaliacao`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_combustivel`
--
ALTER TABLE `tbl_combustivel`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_contato`
--
ALTER TABLE `tbl_contato`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_cor`
--
ALTER TABLE `tbl_cor`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_endereco`
--
ALTER TABLE `tbl_endereco`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_estado_civil`
--
ALTER TABLE `tbl_estado_civil`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_manutencao`
--
ALTER TABLE `tbl_manutencao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_veiculo` (`id_veiculo`);

--
-- Índices de tabela `tbl_marca`
--
ALTER TABLE `tbl_marca`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_marca_tipo_veiculo` (`id_tipo_veiculo`);

--
-- Índices de tabela `tbl_modelo`
--
ALTER TABLE `tbl_modelo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_profissao`
--
ALTER TABLE `tbl_profissao`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_tipo_veiculo`
--
ALTER TABLE `tbl_tipo_veiculo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_profissao` (`id_profissao`),
  ADD KEY `fk_contato` (`id_contato`),
  ADD KEY `fk_endereco` (`id_endereco`),
  ADD KEY `fk_estado_civil` (`id_estado_civil`),
  ADD KEY `fk_avaliacao` (`id_avaliacao`);

--
-- Índices de tabela `tbl_veiculo`
--
ALTER TABLE `tbl_veiculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipo_veiculo` (`id_tipo_veiculo`),
  ADD KEY `fk_motorista` (`id_motorista`),
  ADD KEY `fk_modelo` (`id_modelo`),
  ADD KEY `fk_marca` (`id_marca`),
  ADD KEY `fk_cor` (`id_cor`),
  ADD KEY `fk_combustivel` (`id_combustivel`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbl_avaliacao`
--
ALTER TABLE `tbl_avaliacao`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_combustivel`
--
ALTER TABLE `tbl_combustivel`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `tbl_contato`
--
ALTER TABLE `tbl_contato`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_cor`
--
ALTER TABLE `tbl_cor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `tbl_endereco`
--
ALTER TABLE `tbl_endereco`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_estado_civil`
--
ALTER TABLE `tbl_estado_civil`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tbl_manutencao`
--
ALTER TABLE `tbl_manutencao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_marca`
--
ALTER TABLE `tbl_marca`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de tabela `tbl_modelo`
--
ALTER TABLE `tbl_modelo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_profissao`
--
ALTER TABLE `tbl_profissao`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1117;

--
-- AUTO_INCREMENT de tabela `tbl_tipo_veiculo`
--
ALTER TABLE `tbl_tipo_veiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_veiculo`
--
ALTER TABLE `tbl_veiculo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbl_manutencao`
--
ALTER TABLE `tbl_manutencao`
  ADD CONSTRAINT `fk_id_veiculo` FOREIGN KEY (`id_veiculo`) REFERENCES `tbl_veiculo` (`id`);

--
-- Restrições para tabelas `tbl_marca`
--
ALTER TABLE `tbl_marca`
  ADD CONSTRAINT `fk_marca_tipo_veiculo` FOREIGN KEY (`id_tipo_veiculo`) REFERENCES `tbl_tipo_veiculo` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD CONSTRAINT `fk_avaliacao` FOREIGN KEY (`id_avaliacao`) REFERENCES `tbl_avaliacao` (`id`),
  ADD CONSTRAINT `fk_contato` FOREIGN KEY (`id_contato`) REFERENCES `tbl_contato` (`id`),
  ADD CONSTRAINT `fk_endereco` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco` (`id`),
  ADD CONSTRAINT `fk_estado_civil` FOREIGN KEY (`id_estado_civil`) REFERENCES `tbl_estado_civil` (`id`),
  ADD CONSTRAINT `fk_profissao` FOREIGN KEY (`id_profissao`) REFERENCES `tbl_profissao` (`id`);

--
-- Restrições para tabelas `tbl_veiculo`
--
ALTER TABLE `tbl_veiculo`
  ADD CONSTRAINT `fk_combustivel` FOREIGN KEY (`id_combustivel`) REFERENCES `tbl_combustivel` (`id`),
  ADD CONSTRAINT `fk_cor` FOREIGN KEY (`id_cor`) REFERENCES `tbl_cor` (`id`),
  ADD CONSTRAINT `fk_marca` FOREIGN KEY (`id_marca`) REFERENCES `tbl_marca` (`id`),
  ADD CONSTRAINT `fk_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `tbl_modelo` (`id`),
  ADD CONSTRAINT `fk_motorista` FOREIGN KEY (`id_motorista`) REFERENCES `tbl_usuario` (`id`),
  ADD CONSTRAINT `fk_tipo_veiculo` FOREIGN KEY (`id_tipo_veiculo`) REFERENCES `tbl_tipo_veiculo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
