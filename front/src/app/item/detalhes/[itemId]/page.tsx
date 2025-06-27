"use client";


import api from "@/app/Services/api";
import { Comentario } from "@/app/Types/comentario";
import { Item } from "@/app/Types/item";
import {
  Button,
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ItemDetalhes() {
  const params = useParams();
  const { itemId } = params;
  const [item, setItem] = useState<Item>();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    carregarItem();
    // carregarComentarios;
  }, []);
  async function carregarItem() {
    try {
      const resposta = await api.get<Item>(
        `/item/buscaritemporid/${itemId}`
      );
      setItem(resposta.data);
      try {
        const resposta = await api.get(
          `/comentario/listarComentarioPorItem/${itemId}`
        );
        console.table(resposta.data);
        console.log("oi");
        setComentarios(resposta.data);
      } catch (erro) {
        console.error(erro);
      }
    } catch (erro) {
      console.error(erro);
    }
  }
  async function excluir(comentarioId: number) {
    try {
      const resposta = await api.delete(
        `/comentario/excluir/${comentarioId}/${itemId}`
      );
      setComentarios(resposta.data);
    } catch (erro) {
      console.error(erro);
      alert("Erro ao excluir comentário.");
    }
  }
  function cadastrar() {
    const comentario: Comentario = {
      texto: texto,
      itemId: Number(itemId),
    };
    try {
      api
        .post("/comentario/cadastrar", comentario)
        .then((resposta) => {
          setComentarios(resposta.data);
          setTexto("");
        })
        .catch((erro) => {
          console.error(erro);
          alert("Erro ao cadastrar comentário.");
        });
    } catch (erro) {
      console.error(erro);
      alert("Erro ao cadastrar comentário.");
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {item?.nome}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Inserir comentário"
          type="text"
          required
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={cadastrar}
        >
          Login
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Comentário</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Criado Em</TableCell>
                <TableCell>Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comentarios.map((comentario) => (
                <TableRow key={comentario.comentarioId}>
                  <TableCell>{comentario.texto}</TableCell>
                  <TableCell>{comentario.usuario?.email}</TableCell>
                  <TableCell>{comentario.data}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        excluir(comentario.comentarioId!)
                      }
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Link variant="overline" sx={{ mt: 2 }} href={`/item/listar/`}>
        Voltar
      </Link>
    </Container>
  );
}

export default ItemDetalhes;