const serverURL = `http://localhost:3333/api/livros`;

async function listarLivros() {
    const respostaAPI = await fetch(`${serverURL}`);

    if (!respostaAPI.ok){
        console.error('Erro na requisição:', respostaAPI.status, await respostaAPI.text());

        return;
    }

    const jsonLivros = await respostaAPI.json();

    return jsonLivros;
}

async function montarTabelaLivros() {
    const listaDeLivros = await listarLivros();

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    listaDeLivros.forEach(livro => {
        const tr = document.createElement('tr');
        
        tr.innerHTML =`
            <td>${livro.idLivro}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.editora}</td>
            <td>${livro.anoPublicacao ? livro.anoPublicacao : '-'}</td>
            <td>${livro.isbn ? livro.isbn : '-'}</td>
            <td>${livro.quantTotal}</td>
            <td>${livro.quantDisponivel}</td>
            <td>${livro.valorAquisicao ? `R$ ${livro.valorAquisicao}` : '-'}</td>
            <td>${livro.statusLivroEmprestado ? livro.statusLivroEmprestado : '-'}</td>
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

    const livro = {
        titulo: document.getElementById('titulo-livro').value,
        autor: document.getElementById('autor-livro').value,
        editora: document.getElementById('editora-livro').value,
        anoPublicacao: document.getElementById('ano-publicacao-livro').value,
        isbn: document.getElementById('isbn-livro').value,
        quantTotal: document.getElementById('quantidade-total-livro').value,
        quantDisponivel: document.getElementById('quantidade-disponivel-livro').value,
        valorAquisicao: document.getElementById('valor-aquisicao-livro').value || null,
        statusLivroEmprestado: document.getElementById('status-livro-emprestado').value
    }

    try {
        const respostaAPI = await fetch(`${serverURL}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(livro)
        });

        if (!respostaAPI.ok) {
            alert('Erro ao cadastrar livro.');

            throw new Error('Erro ao fazer requisição à API.');
        }

        alert('Livro cadastrado com sucesso!');

        window.location.href = '../../pages/livro/lista-livro.html';
    } catch (error) {
        console.error('Erro ao fazer requisição.');
        return;
    }
}