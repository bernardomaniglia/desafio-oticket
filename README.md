## Como Rodar o Projeto Localmente

Com Node.js e Docker instalados, o processo é muito simples.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/bernardomaniglia/desafio-oticket.git
    cd desafio-oticket
    ```
2.  **Copie o arquivo de ambiente:**
    * Vá para a pasta `backend`, copie o arquivo `.env.example` e renomeie a cópia para `.env`.

3.  **Instale as dependências do projeto:**
    * Na pasta **raiz** do projeto, rode:
    ```bash
    npm install
    ```

4.  **Execute o Setup Automatizado:**
    * Este comando vai instalar as dependências do back e do front, subir o banco de dados e criar as tabelas.
    ```bash
    npm run setup
    ```

5.  **Inicie a Aplicação:**
    * Este comando iniciará os servidores do backend e do frontend simultaneamente.
    ```bash
    npm run dev
    ```

* O backend estará disponível em `http://localhost:3333`.
* O frontend estará disponível em `http://localhost:3000`.