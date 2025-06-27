
namespace api_avaliacao.Models;

public class Comentario
{
    public int ComentarioId { get; set; }
    public string Texto { get; set; } = string.Empty;
    public int ItemId { get; set; }
    public Item? Item { get; set; }
    public Usuario? Usuario{ get; set; }
    public int UsuarioId{ get; set; }
    public DateTime Data { get; set; } = DateTime.Now;
}