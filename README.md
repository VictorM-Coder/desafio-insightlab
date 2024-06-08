# 🚀 Desafio Insight Lab 🚀

Repositório para hospedar o código do desafio proposto pelo processo seletivo do Insight Lab para a vaga de desenvolvedor Full-Stack do projeto “Cultura, inovação e inclusão social no Ceará".

## 📜 Descrição

Este projeto foi desenvolvido como parte do processo seletivo do Insight Lab para a vaga de desenvolvedor Full-Stack. O objetivo é demonstrar habilidades no desenvolvimento de aplicações web integradas, focando em cultura, inovação e inclusão social no Ceará.

## 🛠️ Tecnologias

### Backend

- **[Java](https://www.java.com/)**: Linguagem de programação utilizada para o desenvolvimento da aplicação backend.
- **[Spring Boot](https://spring.io/projects/spring-boot)**: Framework que simplifica a criação de aplicações Java standalone de nível empresarial.
- **[Spring JPA](https://spring.io/projects/spring-data-jpa)**: Subprojeto do Spring que facilita o acesso a dados com o uso da API JPA (Java Persistence API).
- **[MapStruct](https://mapstruct.org/)**: Framework para mapeamento de objetos Java, facilitando a conversão entre diferentes tipos de dados.
- **[Flyway](https://flywaydb.org/)**: Ferramenta de migração de banco de dados que permite versionar e automatizar mudanças no schema.
- **[Lombok](https://projectlombok.org/)**: Biblioteca que reduz a verbosidade do código Java, gerando automaticamente métodos comuns como getters e setters.

### Frontend

- **[React](https://reactjs.org/)**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **[Ant Design](https://ant.design/)**: Framework de design de UI que oferece uma vasta coleção de componentes para React.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática ao código, melhorando a robustez e a manutenção.
- **[ESLint](https://eslint.org/)**: Utilizado para linting e formatação de código JavaScript e TypeScript no frontend.
- **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em promessas para realizar requisições tanto no navegador quanto no Node.js.

### Banco de Dados

- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de gerenciamento de banco de dados relacional open-source, conhecido por sua robustez e conformidade com os padrões SQL.

## ⚙️ Instalação

### Backend

1. Clone o repositório
   ```bash
   git clone https://github.com/VictorM-Coder/desafio-insightlab.git
   ```

2. Navegue até o diretório do backend
   ```bash
   cd desafio-insightlab/API
   ```

3. Instale as dependências e configure o ambiente
   ```bash
   ./mvnw install
   ```

4. Configure o banco de dados PostgreSQL atualizando as seguintes propriedades no arquivo `application.properties`:
   ```properties
   spring.datasource.url=<DATABASE_URL>
   spring.datasource.username=<DATABASE_USERNAME>
   spring.datasource.password=<DATABASE_PASSWORD>
   ```

5. Inicie a aplicação
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend

1. Navegue até o diretório do frontend
   ```bash
   cd desafio-insightlab/client
   ```

2. Crie um arquivo `.env` na raiz do diretório `client` com a seguinte variável:
   ```env
   VITE_API_URL=<endereço_api>
   ```

3. Instale as dependências
   ```bash
   npm install
   ```

4. Inicie a aplicação
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

- Cadastrar fornecedor
- Listar fornecedores cadastrados
- Editar fornecedores cadastrados
- Visualizar fornecedores cadastrados
- Excluir fornecedores cadastrados

## 📬 Contato

- Nome: Victor Martins Vieira
- LinkedIn: [Seu LinkedIn](https://www.linkedin.com/in/victor-martins-230864233/)
- GitHub: [Seu GitHub](https://github.com/VictorM-Coder)
