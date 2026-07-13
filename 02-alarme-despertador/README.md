# ⏰ Despertador Digital Dinâmico

Um despertador digital moderno e minimalista desenvolvido para web. O projeto utiliza JavaScript assíncrono para atualizar o horário em tempo real segundo a segundo e gerenciar o disparo e a reprodução de alarmes sonoros locais.

## 🚀 Tecnologias Utilizadas

*   **HTML5:** Estruturação semântica do layout e integração de tags de áudio nativas.
*   **CSS3:** Estilização responsiva com variáveis CSS, layout centralizado com Flexbox e animações interativas de vibração (`shake`) e luz pulsante para o momento do alarme.
*   **JavaScript (ES6+):** Manipulação dinâmica do DOM, controle de tempo real com `setInterval`, controle de estados do alarme e tratamento de eventos de áudio.

## 🛠️ Recursos e Funcionalidades

*   **Relógio em Tempo Real:** Exibição contínua do horário atual formatado no padrão de dois dígitos.
*   **Seletores Inteligentes:** Geração dinâmica de opções de horas (00-23) e minutos (00-59) via JavaScript para evitar redundâncias no código HTML.
*   **Interface Reativa:** O painel exibe mensagens de status personalizadas quando o alarme está "armado" e muda completamente de comportamento quando o alarme dispara.
*   **Feedback Visual e Sonoro:** Efeitos visuais de pulsação e trepidação na tela combinados com reprodução de áudio em loop quando o despertador atinge o horário programado.
*   **Prevenção de Erros de Entrada:** Bloqueio temporário dos seletores enquanto o alarme está ativo para evitar alterações acidentais.

## 📦 Como Executar o Projeto

1. Clone o repositório na sua máquina:
   ```bash
   git clone [https://github.com/JoelPereira31/meus_Projetos.git](https://github.com/JoelPereira31/meus_Projetos.git)

2. Abra o arquivo index.html em seu navegador de preferência (recomenda-se utilizar a extensão Live Server no VS Code/Cursor).

⚠️ Nota importante sobre áudio: Os navegadores modernos possuem políticas rígidas de segurança que impedem a reprodução de áudio automática sem que o usuário interaja com a página primeiro. Para garantir que o som do alarme toque, dê pelo menos um clique em qualquer lugar da tela após abrir a página.