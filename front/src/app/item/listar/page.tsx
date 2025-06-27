"use client";


import api from "@/app/Services/api";
import { Item } from "@/app/Types/item";
import {
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Link,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ItemListar() {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    api
      .get<Item[]>("/item/listar")
      .then((resposta) => {
        setItens(resposta.data);
        console.table(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Listar Produtos
      </Typography>
      <TableContainer component={Paper} elevation={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Criado Em</TableCell>
              <TableCell>Comentar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itens.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell>{item.itemId}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.criadoEm}</TableCell>
                <TableCell>
                  <Link href={`/item/detalhes/${item.itemId}`}>
                    Comentar
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ItemListar;