using api_avaliacao.Data;
using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.EntityFrameworkCore;

public class ComentarioRepository : IComentarioRepository
{
    private readonly AppDataContext _ctx;
    public ComentarioRepository(AppDataContext ctx)
    {
        _ctx = ctx;
    }
    public List<Comentario>? BuscarComentarioPorItem(int id)
    {
        return _ctx.Comentarios.Include(x => x.Item).Include(x => x.Usuario).Where(c => c.ItemId == id).OrderByDescending(c=> c.Data).ToList();
    }
    public void Cadastrar(Comentario comentario)
    {
        _ctx.Comentarios.Add(comentario);
        _ctx.SaveChanges();
    }
    public List<Comentario> Listar()
    {
        return _ctx.Comentarios.Include(x => x.Item).Include(x=> x.Usuario).OrderByDescending(x=> x.Data).ToList();
    }
    public void Excluir(int Id)
    {
        var comentario = _ctx.Comentarios.Find(Id);
        _ctx.Comentarios.Remove(comentario);
        _ctx.SaveChanges();
    }
    public List<Comentario> ListarTodos()
    {
        return _ctx.Comentarios.Include(x => x.Item).Include(x => x.Usuario).ToList();
    }
}