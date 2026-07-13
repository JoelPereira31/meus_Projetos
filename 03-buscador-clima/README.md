# 🌤️ Buscador de Clima Dinâmico

Um aplicativo moderno e responsivo para consulta meteorológica global em tempo real. O sistema utiliza consumo encadeado de APIs públicas de alta performance para converter buscas de texto em coordenadas geográficas precisas e renderizar as condições climáticas instantaneamente.

## 🚀 Tecnologias Utilizadas

*   **HTML5:** Estrutura de marcação semântica.
*   **CSS3:** Design moderno utilizando *Glassmorphism* (efeito de vidro fosco), variáveis CSS para gerenciamento de temas de cores e transições suaves de gradientes de fundo.
*   **JavaScript (ES6+):** Programação assíncrona com `async/await`, consumo de APIs externas através do método `fetch()`, manipulação do DOM e lógica de adaptação visual dinâmica baseada em dados meteorológicos.

## ⚙️ Arquitetura e Engenharia do Projeto

Em vez de utilizar chaves de acesso estáticas que expiram ou exigem assinaturas pagas, o projeto foi projetado com um fluxo assíncrono inteligente de dados:
1.  **Geocoding API (Open-Meteo):** O termo digitado pelo usuário é tratado e enviado para busca de coordenadas. O código prioriza o retorno de cidades brasileiras (`country_code: 'BR'`) para aumentar a precisão de buscas regionais, capturando também o Estado e o País.
2.  **Weather Forecast API (Open-Meteo):** Com as coordenadas exatas em mãos, o script realiza a segunda requisição assíncrona para obter temperatura atual, umidade, velocidade do vento e o código universal de clima (WMO).
3.  **Mapeamento de Estados e Ícones:** O código converte os dados técnicos retornados em descrições amigáveis em português e renderiza dinamicamente os ícones meteorológicos oficiais.

## 🛠️ Como Executar o Projeto

1. Clone o repositório em sua máquina:
   ```bash
   git clone [https://github.com/JoelPereira31/meus_Projetos.git](https://github.com/JoelPereira31/meus_Projetos.git)