// Formulário (front-end) - coleta e validação simples
// Observação: isso NÃO envia dados para servidor. Apenas loga no console.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const dados = {
      nome: document.getElementById('nome')?.value?.trim() || '',
      email: document.getElementById('email')?.value?.trim() || '',
      telefone: document.getElementById('telefone')?.value?.trim() || ''
    };

    if (!dados.nome || !dados.email) {
      alert('Erro: Certifique-se de preencher Nome e E-mail corretamente.');
      return;
    }

    console.log('--- Relatório de Coleta de Dados ---');
    console.log('Nome do Usuário: ' + dados.nome);
    console.log('E-mail Registrado: ' + dados.email);
    console.log('Telefone de Contato: ' + (dados.telefone || 'Não informado'));
    console.log('------------------------------------');

    alert(`Obrigado, ${dados.nome}! Seus dados foram coletados com sucesso (ver console).`);
    form.reset();
  });
});
