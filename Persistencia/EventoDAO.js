import conectar from "./Conexao.js"; 
import Cliente from "../Modelos/Cliente.js";
export default class ClienteDAO{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (Sobre_Evento, Nome_Evento, Data_Hora, Local,Preco, Quantidade_ingresso, telefone, email) values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                cliente.Sobre_Evento,
                cliente.Nome_Evento,
                cliente.Data_Hora,
                cliente.Local,
                cliente.Preco,
                cliente.Quantidade_ingresso,
                cliente.telefone,
                cliente.email
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            cliente.codigo = resultados.insertId; 
        }
    }
    async atualizar(cliente){
        if (cliente instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET Sobre_Evento = ?,
                         Nome_Evento = ?, Data_Hora = ?, Local = ?,
                         Preco = ?, Quantidade_ingresso = ?, telefone = ?,
                         email = ? WHERE id = ?`;
            const parametros = [
                cliente.Sobre_Evento,
                cliente.Nome_Evento,
                cliente.Data_Hora,
                cliente.Local,
                cliente.Preco,
                cliente.Quantidade_ingresso,
                cliente.telefone,
                cliente.email,
                cliente.codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE id = ?`;
            const parametros = [
                cliente.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }

    //termo de pesquisa pode ser o código do cliente ou ainda o nome
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ //termo de pesquina não é um número
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM cliente WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        //Utilizar os registros encontrados para criar novos objetos do tipo cliente
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(
                registro.id,
                registro.cpf,
                registro.nome,
                registro.endereco,
                registro.bairro,
                registro.cidade,
                registro.estado,
                registro.telefone,
                registro.email
            );
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}