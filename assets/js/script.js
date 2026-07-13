// 1. Selecionando todos os elementos do formulário que iremos manipular
const form = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const btnEnviar = document.getElementById('btnEnviar');

const grupoNome = document.getElementById('grupoNome');
const grupoEmail = document.getElementById('grupoEmail');
const grupoSenha = document.getElementById('grupoSenha');
const grupoConfirmarSenha = document.getElementById('grupoConfirmarSenha');
const passwordStrength = document.getElementById('passwordStrength');

// 2. Expressão Regular (RegEx) para validar e-mails com padrão profissional
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 3. Funções Utilitárias para aplicar classes de sucesso ou erro no layout
function definirSucesso(elementoGrupo) {
    elementoGrupo.classList.remove('error');
    elementoGrupo.classList.add('success');
}

function definirErro(elementoGrupo) {
    elementoGrupo.classList.remove('success');
    elementoGrupo.classList.add('error');
}

// 4. Validação do Campo NOME
function validarNome() {
    const valor = nomeInput.value.trim();
    if (valor.length >= 3) {
        definirSucesso(grupoNome);
        return true;
    } else {
        definirErro(grupoNome);
        return false;
    }
}

// 5. Validação do Campo E-MAIL
function validarEmail() {
    const valor = emailInput.value.trim();
    if (emailRegex.test(valor)) {
        definirSucesso(grupoEmail);
        return true;
    } else {
        definirErro(grupoEmail);
        return false;
    }
}

// 6. Validação de FORÇA DA SENHA
function validarSenha() {
    const valor = senhaInput.value;
    
    // Se o campo estiver vazio, esconde o medidor de força
    if (valor === '') {
        passwordStrength.style.display = 'none';
        grupoSenha.classList.remove('success', 'error');
        return false;
    }

    passwordStrength.style.display = 'flex';
    
    let pontuacao = 0;
    
    // Regras de validação (critérios de força)
    if (valor.length >= 8) pontuacao++;              // Mínimo de 8 caracteres
    if (/[A-Z]/.test(valor)) pontuacao++;           // Pelo menos uma letra Maiúscula
    if (/[0-9]/.test(valor)) pontuacao++;           // Pelo menos um Número
    if (/[^A-Za-z0-9]/.test(valor)) pontuacao++;    // Pelo menos um Caractere Especial (!@#$...)

    // Remove classes antigas de força
    passwordStrength.classList.remove('fraca', 'media', 'forte');

    // Avalia o nível baseado na pontuação
    if (pontuacao <= 2) {
        passwordStrength.classList.add('fraca');
        definirErro(grupoSenha);
        return false;
    } else if (pontuacao === 3) {
        passwordStrength.classList.add('media');
        definirErro(grupoSenha); // Ainda não atende a todos os critérios de segurança estipulados
        return false;
    } else if (pontuacao === 4) {
        passwordStrength.classList.add('forte');
        definirSucesso(grupoSenha);
        return true;
    }
}

// 7. Validação de COMPATIBILIDADE DAS SENHAS (Confirmação)
function validarConfirmacaoSenha() {
    const senhaOriginal = senhaInput.value;
    const senhaConfirmacao = confirmarSenhaInput.value;

    if (senhaConfirmacao === '') {
        grupoConfirmarSenha.classList.remove('success', 'error');
        return false;
    }

    if (senhaOriginal === senhaConfirmacao && senhaOriginal !== '') {
        definirSucesso(grupoConfirmarSenha);
        return true;
    } else {
        definirErro(grupoConfirmarSenha);
        return false;
    }
}

// 8. Habilitar/Desabilitar o botão de cadastro baseado no status geral de validação
function verificarFormularioValido() {
    const nomeValido = nomeInput.value.trim().length >= 3;
    const emailValido = emailRegex.test(emailInput.value.trim());
    
    // A senha é considerada válida se atingir pontuação máxima (forte)
    const senhaValida = senhaInput.value.length >= 8 && 
                        /[A-Z]/.test(senhaInput.value) && 
                        /[0-9]/.test(senhaInput.value) && 
                        /[^A-Za-z0-9]/.test(senhaInput.value);

    const confirmacaoValida = senhaInput.value === confirmarSenhaInput.value && confirmarSenhaInput.value !== '';

    if (nomeValido && emailValido && senhaValida && confirmacaoValida) {
        btnEnviar.removeAttribute('disabled');
    } else {
        btnEnviar.setAttribute('disabled', 'true');
    }
}

// 9. Ouvintes de Eventos (Listeners) - Disparam a cada tecla digitada (input)
nomeInput.addEventListener('input', () => {
    validarNome();
    verificarFormularioValido();
});

emailInput.addEventListener('input', () => {
    validarEmail();
    verificarFormularioValido();
});

senhaInput.addEventListener('input', () => {
    validarSenha();
    validarConfirmacaoSenha(); // Se mudar a senha original, revalida a confirmação
    verificarFormularioValido();
});

confirmarSenhaInput.addEventListener('input', () => {
    validarConfirmacaoSenha();
    verificarFormularioValido();
});

// 10. Evento de Envio do Formulário (Simulando o envio de dados)
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar por padrão
    
    // Simula uma requisição bem-sucedida para o usuário
    alert('Cadastro realizado com sucesso! 🎉');
    form.reset();
    
    // Limpa os estados de sucesso visuais após o reset
    document.querySelectorAll('.input-group').forEach(grupo => {
        grupo.classList.remove('success', 'error');
    });
    passwordStrength.style.display = 'none';
    btnEnviar.setAttribute('disabled', 'true');
});