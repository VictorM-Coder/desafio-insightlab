CREATE TABLE IF NOT EXISTS address_tb
(
    id              uuid         not null
        primary key,
    additional_info varchar(255),
    cep             varchar(255) not null,
    city            varchar(255) not null,
    neighborhood    varchar(255) not null,
    number          integer      not null,
    state           varchar(255) not null,
    street          varchar(255) not null
);

CREATE TABLE IF NOT EXISTS supplier_tb
(
    id           uuid         not null
        primary key,
    cnpj         varchar(255),
    company_name varchar(255) not null,
    created_at   timestamp(6),
    email        varchar(255) not null,
    name         varchar(255) not null,
    address_id   uuid not null,
    FOREIGN KEY (address_id) REFERENCES address_tb (id)
);

INSERT INTO address_tb (id, street, number, additional_info, neighborhood, city, state, cep) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Rua das Flores', 123, 'Apto 101', 'Centro', 'São Paulo', 'SP', '01000-000'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Avenida Brasil', 456, 'Bloco B', 'Jardim Paulista', 'São Paulo', 'SP', '01400-000'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Rua dos Pinheiros', 789, NULL, 'Pinheiros', 'São Paulo', 'SP', '05400-000'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Avenida Paulista', 101, 'Conj. 203', 'Bela Vista', 'São Paulo', 'SP', '01310-000'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Rua Augusta', 202, 'Sala 1', 'Consolação', 'São Paulo', 'SP', '01305-000'),
    ('550e8400-e29b-41d4-a716-446655440005', 'Rua XV de Novembro', 303, NULL, 'Centro', 'Curitiba', 'PR', '80020-000'),
    ('550e8400-e29b-41d4-a716-446655440006', 'Avenida Sete de Setembro', 404, 'Casa', 'Centro', 'Curitiba', 'PR', '80010-000'),
    ('550e8400-e29b-41d4-a716-446655440007', 'Rua Barão do Rio Branco', 505, 'Apto 10', 'Centro', 'Curitiba', 'PR', '80020-000'),
    ('550e8400-e29b-41d4-a716-446655440008', 'Rua Marechal Deodoro', 606, NULL, 'Centro', 'Curitiba', 'PR', '80030-000'),
    ('550e8400-e29b-41d4-a716-446655440009', 'Avenida Iguaçu', 707, 'Casa 2', 'Rebouças', 'Curitiba', 'PR', '80230-000'),
    ('550e8400-e29b-41d4-a716-446655440010', 'Rua General Osório', 808, 'Sala 5', 'Centro', 'Porto Alegre', 'RS', '90020-000'),
    ('550e8400-e29b-41d4-a716-446655440011', 'Avenida Farrapos', 909, NULL, 'Floresta', 'Porto Alegre', 'RS', '90220-000'),
    ('550e8400-e29b-41d4-a716-446655440012', 'Rua da Praia', 1010, 'Bloco A', 'Centro Histórico', 'Porto Alegre', 'RS', '90010-000'),
    ('550e8400-e29b-41d4-a716-446655440013', 'Avenida Ipiranga', 1111, 'Apto 4', 'Jardim Botânico', 'Porto Alegre', 'RS', '90610-000'),
    ('550e8400-e29b-41d4-a716-446655440014', 'Rua Anita Garibaldi', 1212, 'Casa', 'MontSerrat', 'Porto Alegre', 'RS', '90450-000'),
    ('550e8400-e29b-41d4-a716-446655440015', 'Rua das Nações Unidas', 1313, NULL, 'Centro', 'Rio de Janeiro', 'RJ', '20010-000'),
    ('550e8400-e29b-41d4-a716-446655440016', 'Avenida Rio Branco', 1414, 'Bloco B', 'Centro', 'Rio de Janeiro', 'RJ', '20040-000'),
    ('550e8400-e29b-41d4-a716-446655440017', 'Rua Primeiro de Março', 1515, 'Apto 303', 'Centro', 'Rio de Janeiro', 'RJ', '20010-000'),
    ('550e8400-e29b-41d4-a716-446655440018', 'Avenida Presidente Vargas', 1616, NULL, 'Centro', 'Rio de Janeiro', 'RJ', '20020-000'),
    ('550e8400-e29b-41d4-a716-446655440019', 'Rua Visconde de Inhaúma', 1717, 'Conj. 504', 'Centro', 'Rio de Janeiro', 'RJ', '20091-000'),
    ('550e8400-e29b-41d4-a716-446655440020', 'Avenida Amazonas', 1818, 'Apto 501', 'Centro', 'Belo Horizonte', 'MG', '30110-000'),
    ('550e8400-e29b-41d4-a716-446655440021', 'Rua da Bahia', 1919, 'Casa 3', 'Centro', 'Belo Horizonte', 'MG', '30160-000'),
    ('550e8400-e29b-41d4-a716-446655440022', 'Avenida Afonso Pena', 2020, 'Bloco C', 'Centro', 'Belo Horizonte', 'MG', '30130-000'),
    ('550e8400-e29b-41d4-a716-446655440023', 'Rua Tupinambás', 2121, 'Sala 8', 'Centro', 'Belo Horizonte', 'MG', '30120-000');

INSERT INTO supplier_tb (id, created_at, company_name, name, cnpj, email, address_id) VALUES
    ('660e8400-e29b-41d4-a716-556655440000', CURRENT_TIMESTAMP, 'Alfredo Gomes Ltda', 'Tecnologias Avançadas AG', '12.345.678/0001-01', 'contato@tecnologiasag.com', '550e8400-e29b-41d4-a716-446655440000'),
    ('660e8400-e29b-41d4-a716-556655440001', CURRENT_TIMESTAMP, 'Beatriz Inovações Ltda', 'Inovações BSI Ltda', '23.456.789/0001-02', 'contato@inovabsi.com', '550e8400-e29b-41d4-a716-446655440001'),
    ('660e8400-e29b-41d4-a716-556655440002', CURRENT_TIMESTAMP, 'CSouza Soluções Ltda', 'CSouza Soluções', '34.567.890/0001-03', 'contato@csouzasolucoes.com', '550e8400-e29b-41d4-a716-446655440002'),
    ('660e8400-e29b-41d4-a716-556655440003', CURRENT_TIMESTAMP, 'Fernandes Associados Ltda', 'Fernandes & Associados', '45.678.901/0001-04', 'contato@fernandesassociados.com', '550e8400-e29b-41d4-a716-446655440003'),
    ('660e8400-e29b-41d4-a716-556655440004', CURRENT_TIMESTAMP, 'EduLima Consultoria Ltda', 'EduLima Consultoria', '56.789.012/0001-05', 'contato@edulimaconsultoria.com', '550e8400-e29b-41d4-a716-446655440004'),
    ('660e8400-e29b-41d4-a716-556655440005', CURRENT_TIMESTAMP, 'Costa Tech Ltda', 'Costa Tech Solutions', '67.890.123/0001-06', 'contato@costatech.com', '550e8400-e29b-41d4-a716-446655440005'),
    ('660e8400-e29b-41d4-a716-556655440006', CURRENT_TIMESTAMP, 'GMartins Inovações Ltda', 'GMartins Inovações', '78.901.234/0001-07', 'contato@gmartinsinova.com', '550e8400-e29b-41d4-a716-446655440006'),
    ('660e8400-e29b-41d4-a716-556655440007', CURRENT_TIMESTAMP, 'Rocha Engenharia Ltda', 'Rocha Engenharia', '89.012.345/0001-08', 'contato@rochaengenharia.com', '550e8400-e29b-41d4-a716-446655440007'),
    ('660e8400-e29b-41d4-a716-556655440008', CURRENT_TIMESTAMP, 'IPereira Soluções Ltda', 'IPereira Soluções TI', '90.123.456/0001-09', 'contato@ipereiratech.com', '550e8400-e29b-41d4-a716-446655440008'),
    ('660e8400-e29b-41d4-a716-556655440009', CURRENT_TIMESTAMP, 'JAraújo Consultoria Ltda', 'JAraújo Consultoria', '01.234.567/0001-10', 'contato@jaraujoconsultoria.com', '550e8400-e29b-41d4-a716-446655440009'),
    ('660e8400-e29b-41d4-a716-556655440010', CURRENT_TIMESTAMP, 'LAlmeida Soluções Ltda', 'LAlmeida Soluções', '12.345.678/0001-11', 'contato@lalmeidasolucoes.com', '550e8400-e29b-41d4-a716-446655440010'),
    ('660e8400-e29b-41d4-a716-556655440011', CURRENT_TIMESTAMP, 'Ribeiro Tech Ltda', 'Ribeiro Tech Solutions', '23.456.789/0001-12', 'contato@ribeirotech.com', '550e8400-e29b-41d4-a716-446655440011'),
    ('660e8400-e29b-41d4-a716-556655440012', CURRENT_TIMESTAMP, 'NSantos Engenharia Ltda', 'NSantos Engenharia', '34.567.890/0001-13', 'contato@nsantosengenharia.com', '550e8400-e29b-41d4-a716-446655440012'),
    ('660e8400-e29b-41d4-a716-556655440013', CURRENT_TIMESTAMP, 'OTeixeira Consultoria Ltda', 'OTeixeira Consultoria', '45.678.901/0001-14', 'contato@oteixeiraconsultoria.com', '550e8400-e29b-41d4-a716-446655440013'),
    ('660e8400-e29b-41d4-a716-556655440014', CURRENT_TIMESTAMP, 'PFernandes Inovações Ltda', 'PFernandes Inovações', '56.789.012/0001-15', 'contato@pfernandesinova.com', '550e8400-e29b-41d4-a716-446655440014'),
    ('660e8400-e29b-41d4-a716-556655440015', CURRENT_TIMESTAMP, 'QOliveira Soluções Ltda', 'QOliveira Soluções', '67.890.123/0001-16', 'contato@qoliveirasolucoes.com', '550e8400-e29b-41d4-a716-446655440015'),
    ('660e8400-e29b-41d4-a716-556655440016', CURRENT_TIMESTAMP, 'RDuarte Tech Ltda', 'RDuarte Tech', '78.901.234/0001-17', 'contato@rduartetech.com', '550e8400-e29b-41d4-a716-446655440016'),
    ('660e8400-e29b-41d4-a716-556655440017', CURRENT_TIMESTAMP, 'SMendes TI Ltda', 'SMendes Soluções TI', '89.012.345/0001-18', 'contato@smendesti.com', '550e8400-e29b-41d4-a716-446655440017'),
    ('660e8400-e29b-41d4-a716-556655440018', CURRENT_TIMESTAMP, 'TCosta Engenharia Ltda', 'TCosta Engenharia', '90.123.456/0001-19', 'contato@tcostaengenharia.com', '550e8400-e29b-41d4-a716-446655440018'),
    ('660e8400-e29b-41d4-a716-556655440019', CURRENT_TIMESTAMP, 'UBarros Consultoria Ltda', 'UBarros Consultoria', '01.234.567/0001-20', 'contato@ubarrosconsultoria.com', '550e8400-e29b-41d4-a716-446655440019');
