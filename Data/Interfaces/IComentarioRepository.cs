using System;
using api_avaliacao.Models;

namespace api_avaliacao.Data.Interfaces;

public interface IComentarioRepository
{
    List<Comentario>? BuscarComentarioPorItem(int id);
    void Cadastrar(Comentario comentario);
    void Excluir(int Id);
    List<Comentario> ListarTodos();
}
