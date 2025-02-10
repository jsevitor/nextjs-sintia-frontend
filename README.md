# Sintia - Análise de Contratos com IA

Este projeto é uma aplicação web desenvolvida para analisar contratos utilizando inteligência artificial e extrair informações relevantes sobre eles. A ideia surgiu de um desafio proposto por uma empresa de seguros à minha faculdade, com o objetivo de criar uma solução inovadora que simplifique e agilize o processo de gestão de contratos.

## Demonstração

![image](https://github.com/user-attachments/assets/d2213428-4d45-4ba9-879e-6f0c97c3529e)

## Acesso ao Projeto

A aplicação está disponível em: [https://sintia.netlify.app/](https://sintia.netlify.app/)

## Funcionalidades

- **Upload de Contratos**: Permite o envio de documentos para análise.
- **Análise com IA**: Utiliza a API Google Gemini para processar e interpretar o conteúdo dos contratos.
- **Exibição de Resultados da Análise**: Apresenta os principais pontos, destacando as informações mais relevantes extraídas pela inteligência artificial.

## Tecnologias Utilizadas

- **Frontend**:
  - React.js com Next.js para a construção da interface do usuário.
  - CSS Modules para estilização isolada dos componentes.
- **Backend**:
  - Node.js para o servidor e lógica de negócios.
  - Integração com a API Google Gemini para processamento de linguagem natural.
  - SQLite como banco de dados, com planos futuros para migração para PostgreSQL.

## Como Executar o Projeto Localmente

1. **Pré-requisitos**:
   - Node.js instalado na máquina.
   - Chave de API válida para a API Google Gemini.

2. **Passos**:
   - Clone o repositório:
     ```bash
     git clone https://github.com/seu-usuario/sintia.git
     cd sintia
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Configure a chave da API:
     - Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:
       ```
       GEMINI_API_KEY=sua_chave_aqui
       ```
   - Inicie o servidor de desenvolvimento:
     ```bash
     npm run dev
     ```
   - Acesse a aplicação em: `http://localhost:3000`

## Melhorias Futuras

- **Implementação de Autenticação**: Adicionar sistema de login para diferentes níveis de acesso.
- **Suporte a Múltiplos Formatos de Arquivo**: Permitir o upload de diversos tipos de documentos.
- **Otimização da Performance**: Melhorar o tempo de resposta durante a análise dos contratos.
- **Migração do banco de dados**: Passar de SQLite para PostgreSQL para maior escalabilidade.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Colaboradores

  - **José Vitor Oliveira** - ([jsevitor](https://github.com/jsevitor)): Desenvolvedor responsável pela implementação da aplicação, integração com a API Google Gemini e funcionalidades do frontend.
  - **Vinícius Nunes** - ([vinicgabriel](https://github.com/vinicgabriel)): Designer responsável pelas telas e pela experiência visual da aplicação.

## Licença

Este projeto está licenciado sob a **MIT License** - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Caso queira entrar em contato, me encontre em:

- **LinkedIn**: [linkedin.com/in/josevitoroliveira](https://linkedin.com/in/josevitoroliveira)
- **E-mail**: [vitorjseo@gmail.com](mailto:vitorjseo@gmail.com)

---
Desenvolvido por **Vitor Oliveira**.

