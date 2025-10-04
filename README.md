## Como Rodar o Projeto Localmente

Com Node.js e Docker instalados, siga os passos abaixo.

1.  **Clone o repositório e entre na pasta:**
    ```bash
    git clone https://github.com/bernardomaniglia/desafio-oticket.git
    cd desafio-oticket
    ```
2.  **Copie o arquivo de ambiente do backend:**
    * Navegue até a pasta `backend` e crie uma cópia do arquivo `.env.example`, renomeando-a para `.env`.

3.  **Execute o Setup Automatizado:**
    * Na pasta **raiz** do projeto, rode os seguintes comandos. Eles irão instalar todas as dependências, iniciar o banco de dados e preparar o ambiente.
    ```bash
    npm install
    npm run setup
    ```

4.  **Inicie os Servidores (em terminais separados):**
    * Abra um **primeiro terminal**, navegue até a pasta `backend` e inicie o servidor da API:
        ```bash
        cd backend
        npm run dev
        ```
    * Abra um **segundo terminal**, navegue até a pasta `frontend` e inicie a aplicação web:
        ```bash
        cd frontend
        npm run dev
        ```

5.  **Acesse a Aplicação:**
    * O frontend estará disponível em `http://localhost:3000`.

---
*Nota: A inicialização em dois terminais foi adotada para garantir máxima compatibilidade entre diferentes ambientes de desenvolvimento.*