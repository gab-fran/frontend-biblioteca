const serverURL = `http://localhost:3333/api/alunos`;

async function listarAlunos() {
    const respostaAPI = await fetch(`${serverURL}`);

    if (!respostaAPI.ok){
        console.error('Erro na requisição:', respostaAPI.status, await respostaAPI.text());

        return;
    }

    const jsonAlunos = await respostaAPI.json();

    return jsonAlunos;
}

async function montarTabelaAlunos() {
    const listaDeAlunos = await listarAlunos();

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    listaDeAlunos.forEach(aluno => {
        const tr = document.createElement('tr');
        
        tr.innerHTML =`
            <td>${aluno.idAluno}</td>
            <td>${aluno.ra}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.sobrenome}</td>
            <td>${aluno.dataNascimento ? new Date(aluno.dataNascimento).toLocaleDateString() : '-'}</td>
            <td>${aluno.endereco ? aluno.endereco : '-'}</td>
            <td>${aluno.email ? aluno.email : '-'}</td>
            <td>${aluno.celular}</td>
            <td>
                   <img src='/assets/editar.svg' alt='Editar aluno' class='btn-edit' />
                   <img src='/assets/deletar.svg' alt='Excluir aluno' class='btn-delete' />
            </td>
        `;

        tbody.appendChild(tr);

        tr.querySelector('.btn-edit').addEventListener('click', () => alert('editar'));
        tr.querySelector('.btn-delete').addEventListener('click', () => alert('deletar'));

    });
}

async function enviarFormularioCadastro(event) {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById('nome-aluno').value,
        sobrenome: document.getElementById('sobrenome-aluno').value,
        dataNascimento: document.getElementById('data-nascimento').value || null,
        endereco: document.getElementById('endereco-aluno').value,
        email: document.getElementById('email-aluno').value,
        celular: document.getElementById('celular-aluno').value
    }

    try {
        const respostaAPI = await fetch(`${serverURL}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });

        if (!respostaAPI.ok) {
            alert('Erro ao cadastrar aluno.');

            throw new Error('Erro ao fazer requisição à API.');
        }

        alert('Aluno cadastrado com sucesso!');

        window.location.href = '../../pages/aluno/lista-aluno.html';
    } catch (error) {
        console.error('Erro ao fazer requisição.');
        return;
    }
}