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
            <td>${new Date(aluno.dataNascimento).toLocaleDateString()}</td>
            <td>${aluno.endereco}</td>
            <td>${aluno.email}</td>
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