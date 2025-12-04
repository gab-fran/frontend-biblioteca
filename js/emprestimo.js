const serverURL = `http://localhost:3333/api/emprestimos`;

async function listarEmprestimos() {
    const respostaAPI = await fetch(`${serverURL}`);

    if (!respostaAPI.ok){
        console.error('Erro na requisição:', respostaAPI.status, await respostaAPI.text());

        return;
    }

    const jsonEmprestimos = await respostaAPI.json();

    return jsonEmprestimos;
}

async function montarTabelaEmprestimos() {
    const listaDeEmprestimos = await listarEmprestimos();

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    listaDeEmprestimos.forEach(emprestimo => {
        const tr = document.createElement('tr');
        
        tr.innerHTML =`
            <td>${emprestimo.idEmprestimo}</td>
            <td>${emprestimo.nomeAluno}</td>
            <td>${emprestimo.tituloLivro}</td>
            <td>${new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</td>
            <td>${new Date(emprestimo.dataDevolucao).toLocaleDateString()}</td>
            <td>${emprestimo.statusEmprestimo ? emprestimo.statusEmprestimo : '-'}</td>
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
