// Motor de Visualização de Dados - Observatório do Discurso Jurídico v2
// Fórmulas: H (Entropia), S (Informação), E (Equitabilidade), PMI (Pointwise Mutual Information)

const anos = ['2018', '2019', '2020', '2021 (Marco)', '2022', '2023', '2024', '2025'];

// Dados Simulados Baseados em Pesquisa
const dadosTribunais = {
    maiorAumento: {
        nome: 'Tribunal A (Maior Abertura Vocabular)',
        entropiaH: [1.2, 1.3, 1.4, 1.8, 2.9, 3.5, 3.8, 4.1],
        pmiTravestida: [8.5, 8.2, 8.0, 7.5, 5.2, 4.1, 3.5, 2.8] // Queda na associação estigmatizante
    },
    menorAumento: {
        nome: 'Tribunal B (Maior Cristalização Persistente)',
        entropiaH: [1.1, 1.1, 1.2, 1.2, 1.3, 1.4, 1.4, 1.5],
        pmiTravestida: [9.1, 9.2, 9.0, 9.1, 8.9, 9.0, 8.8, 8.9] // Persistência do estigma
    }
};

const dadosEstigma = {
    labels: ['Simulação', 'Ardil', 'Má-fé', 'Fraude', 'Suspeição'],
    antes: [92, 88, 85, 90, 82],
    depois: [45, 40, 38, 42, 35]
};

function initCharts() {
    // 1. Gráfico de Entropia (H) e Informação (S) - Tribunal de Maior Aumento
    const ctxH1 = document.getElementById('chartH1').getContext('2d');
    new Chart(ctxH1, {
        type: 'line',
        data: {
            labels: anos,
            datasets: [{
                label: 'Entropia (H) - Tribunal A',
                data: dadosTribunais.maiorAumento.entropiaH,
                borderColor: '#04ff9f',
                backgroundColor: 'rgba(4, 255, 159, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Variação Temporal de Entropia (H) - Maior Abertura', color: '#fff' },
                legend: { labels: { color: '#fff' } }
            },
            scales: {
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });

    // 2. Gráfico de Entropia (H) - Tribunal de Menor Aumento (Cristalização)
    const ctxH2 = document.getElementById('chartH2').getContext('2d');
    new Chart(ctxH2, {
        type: 'line',
        data: {
            labels: anos,
            datasets: [{
                label: 'Entropia (H) - Tribunal B',
                data: dadosTribunais.menorAumento.entropiaH,
                borderColor: '#FF9E9E',
                backgroundColor: 'rgba(255, 158, 158, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Cristalização Persistente (Baixa Entropia) - Tribunal B', color: '#fff' },
                legend: { labels: { color: '#fff' } }
            },
            scales: {
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });

    // 3. Gráfico de Construção Social do Estigma (PMI)
    const ctxEstigma = document.getElementById('chartEstigma').getContext('2d');
    new Chart(ctxEstigma, {
        type: 'radar',
        data: {
            labels: dadosEstigma.labels,
            datasets: [{
                label: 'Associação Pré-Protocolo (PMI Alto)',
                data: dadosEstigma.antes,
                backgroundColor: 'rgba(240, 95, 134, 0.2)',
                borderColor: '#F05F86',
                pointBackgroundColor: '#F05F86'
            }, {
                label: 'Associação Pós-Protocolo (Tendência)',
                data: dadosEstigma.depois,
                backgroundColor: 'rgba(4, 255, 159, 0.2)',
                borderColor: '#04ff9f',
                pointBackgroundColor: '#04ff9f'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Reificação e Estigma: Termo "Travestida"', color: '#fff' },
                legend: { labels: { color: '#fff' } }
            },
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.2)' },
                    grid: { color: 'rgba(255,255,255,0.2)' },
                    pointLabels: { color: '#fff' },
                    ticks: { display: false }
                }
            }
        }
    });

    // 4. Gráfico de Frequência e Associação (Moralidade Jurídica)
    const ctxMoral = document.getElementById('chartMoral').getContext('2d');
    new Chart(ctxMoral, {
        type: 'bar',
        data: {
            labels: anos,
            datasets: [{
                label: 'Índice de Reificação (Fórmula E)',
                data: [0.9, 0.88, 0.91, 0.85, 0.6, 0.45, 0.38, 0.3],
                backgroundColor: '#ffe36d'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Valoração do Direito à Humanidade vs Reificação', color: '#fff' }
            },
            scales: {
                y: { ticks: { color: '#fff' } },
                x: { ticks: { color: '#fff' } }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initCharts);
