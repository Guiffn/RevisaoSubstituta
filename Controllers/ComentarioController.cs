using api_avaliacao.Data;
using api_avaliacao.Data.Interfaces;
using api_avaliacao.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api_avaliacao.Controllers;

[Route("api/comentario")]
[ApiController]
[Authorize]
public class ComentarioController : ControllerBase
{
    private readonly IItemRepository _itemRepository;
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IComentarioRepository _comentarioRepository;
    public ComentarioController(IItemRepository itemRepository, IUsuarioRepository usuarioRepository, IComentarioRepository comentarioRepository)
    {
        _itemRepository = itemRepository;
        _usuarioRepository = usuarioRepository;
        _comentarioRepository = comentarioRepository;
    }
   [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] Comentario comentario)
    {
    var item = _itemRepository.BuscarItemPorId(comentario.ItemId);
    string? email = User.Identity?.Name;
    var usuario = _usuarioRepository.BuscarUsuarioPorEmail(email!);

    comentario.Item = item;
    comentario.Usuario = usuario;
    comentario.UsuarioId = usuario.UsuarioId;

    _comentarioRepository.Cadastrar(comentario);
    return Created("", comentario);
    }
    [HttpGet("listarComentarioPorItem/{itemId}")]
    public IActionResult Buscar(int itemId)
    {
        return Ok(_comentarioRepository.BuscarComentarioPorItem(itemId));
    }
    [HttpGet("listar")]
    public IActionResult Listar()
    {
        return Ok(_comentarioRepository.ListarTodos());
    }
    
    [HttpDelete("excluir/{idComentario}/{idItem}")]
    
    public IActionResult Deletar(int idComentario,int idItem)
    {
        _comentarioRepository.Excluir(idComentario);
        return Ok(_comentarioRepository.BuscarComentarioPorItem(idItem));
    }

}

