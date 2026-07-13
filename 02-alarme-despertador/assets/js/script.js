// 1. Seleção de Elementos do DOM (Relação de variáveis com a tela)
const clockDisplay = document.getElementById('clockDisplay');
const selectHour = document.getElementById('selectHour');
const selectMinute = document.getElementById('selectMinute');
const btnSetAlarm = document.getElementById('btnSetAlarm');
const btnStopAlarm = document.getElementById('btnStopAlarm');
const alarmStatus = document.getElementById('alarmStatus');
const alarmTimeText = document.getElementById('alarmTimeText');
const alarmControls = document.getElementById('alarmControls');
const alarmBox = document.querySelector('.alarm-box');
const alarmAudio = document.getElementById('alarmAudio');

// 2. Variáveis de Estado do Sistema
let horaAlarme = null;
let minutoAlarme = null;
let alarmeAtivo = false;
let alarmeTocando = false;

// 3. Preenchendo os seletores de Hora e Minuto dinamicamente via JS
function preencherSeletores() {
    // Preenche as Horas (00 a 23)
    for (let i = 0; i < 24; i++) {
        // Formata o número com 2 dígitos (ex: 0 vira "00", 9 vira "09")
        let horaFormatada = String(i).padStart(2, '0');
        let option = document.createElement('option');
        option.value = horaFormatada;
        option.textContent = horaFormatada;
        selectHour.appendChild(option);
    }

    // Preenche os Minutos (00 a 59)
    for (let i = 0; i < 60; i++) {
        let minutoFormatado = String(i).padStart(2, '0');
        let option = document.createElement('option');
        option.value = minutoFormatado;
        option.textContent = minutoFormatado;
        selectMinute.appendChild(option);
    }
}

// 4. Atualizar o Relógio Digital segundo a segundo (Asincronismo)
function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    // Atualiza o display visual
    clockDisplay.textContent = `${horas}:${minutos}:${segundos}`;

    // Verifica se o alarme deve disparar
    if (alarmeAtivo && !alarmeTocando && horas === horaAlarme && minutos === minutoAlarme) {
        dispararAlarme();
    }
}

// 5. Função de disparo do Alarme
function dispararAlarme() {
    alarmeTocando = true;
    
    // Adiciona as classes CSS que fazem o card piscar em vermelho e vibrar
    alarmBox.classList.add('ringing');
    
    // Mostra o botão "Desligar Alarme" e esconde as configurações normais
    btnStopAlarm.classList.remove('hidden');
    alarmControls.classList.add('hidden');
    
    // Toca o som em loop
    alarmAudio.play().catch(error => {
        console.log("Erro ao tocar áudio. O navegador exige uma interação prévia do usuário:", error);
    });
}

// 6. Configurar ou Cancelar o Alarme
function gerenciarAlarme() {
    if (alarmeAtivo) {
        // Se já estava ativo e o usuário clicou de novo, cancela o alarme
        alarmeAtivo = false;
        horaAlarme = null;
        minutoAlarme = null;
        
        // Atualiza a tela para o modo padrão
        btnSetAlarm.textContent = "Definir Alarme";
        btnSetAlarm.classList.remove('active');
        alarmStatus.classList.remove('active');
        
        // Reabilita os seletores de tempo
        selectHour.disabled = false;
        selectMinute.disabled = false;
        
        // Reseta os valores dos seletores
        selectHour.value = "";
        selectMinute.value = "";
    } else {
        // Pega os valores selecionados pelo usuário
        const horaSelecionada = selectHour.value;
        const minutoSelecionado = selectMinute.value;

        // Se o usuário não escolheu a hora ou o minuto, exibe um alerta
        if (!horaSelecionada || !minutoSelecionado) {
            alert("Por favor, selecione uma hora e um minuto válidos!");
            return;
        }

        // Define o estado ativo do alarme
        horaAlarme = horaSelecionada;
        minutoAlarme = minutoSelecionado;
        alarmeAtivo = true;

        // Atualiza a tela para mostrar que o alarme está "armado"
        btnSetAlarm.textContent = "Cancelar Alarme";
        btnSetAlarm.classList.add('active');
        alarmTimeText.textContent = `${horaAlarme}:${minutoAlarme}`;
        alarmStatus.classList.add('active');

        // Desabilita os seletores para o usuário não mexer enquanto estiver ativo
        selectHour.disabled = true;
        selectMinute.disabled = true;
    }
}

// 7. Desligar o Alarme que está tocando
function pararAlarme() {
    alarmeTocando = false;
    alarmeAtivo = false;
    horaAlarme = null;
    minutoAlarme = null;

    // Pausa o áudio e reseta o tempo de reprodução dele para o início (0)
    alarmAudio.pause();
    alarmAudio.currentTime = 0;

    // Remove os efeitos visuais de alarme tocando
    alarmBox.classList.remove('ringing');
    
    // Alterna a exibição dos botões de volta ao normal
    btnStopAlarm.classList.add('hidden');
    alarmControls.classList.remove('hidden');
    
    // Reseta o botão de ligar/desligar e os seletores
    btnSetAlarm.textContent = "Definir Alarme";
    btnSetAlarm.classList.remove('active');
    alarmStatus.classList.remove('active');
    
    selectHour.disabled = false;
    selectMinute.disabled = false;
    selectHour.value = "";
    selectMinute.value = "";
}

// 8. Inicializações e Ouvintes de Eventos (Listeners)
preencherSeletores();

// Roda a atualização do relógio imediatamente e depois de 1 em 1 segundo
atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// Conecta os botões com suas respectivas ações
btnSetAlarm.addEventListener('click', gerenciarAlarme);
btnStopAlarm.addEventListener('click', pararAlarme);