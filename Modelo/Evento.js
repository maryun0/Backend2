//classe é a abstração de uma entidade do mundo real
//Em orientação a objetos uma classe possui métodos e atributos
//atributos são características de um objeto
//metodos são as ações que um objeto pode executar
import EventoDAO from "../Persistencia/EventoDAO.js";

export default class Evento {
    //atributos são privados
    //somente por meio de métodos públicos é que podemos acessar os atributos de uma classe
    //em javascript definimos atributos privados usando #
    #codigo;
    #Sobre_Evento;
    #Nome_Evento;
    #Data_Hora;
    #Local;
    #Preco;
    #Quantidade_ingresso;
    #telefone;
    #email;

    constructor(codigo=0, Sobre_Evento="", Nome_Evento="", Data_Hora="", Local="", Preco="", Quantidade_ingresso="",) {
        this.#codigo = codigo;
        this.#Sobre_Evento = Sobre_Evento;
        this.#Nome_Evento = Nome_Evento;
        this.#Data_Hora = Data_Hora;
        this.#Local = Local;
        this.#Preco = Preco;
        this.#Quantidade_ingresso = Quantidade_ingresso;
        this.#telefone = telefone;
        this.#email = email;
    }

    //definir os métodos de acesso ao atributos de um cliente
    get codigo(){
        return this.#codigo;
    }    

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get Sobre_Evento(){
        return this.#Sobre_Evento;
    }

    set Sobre_Evento(NovoSobre_Evento){
        this.#Sobre_Evento = NovoSobre_Evento;
    }

    get Nome_Evento(){
        return this.#Nome_Evento;
    }

    set Nome_Evento(NovoNome_Evento){
        this.#Nome_Evento = NovoNome_Evento;
    }

    get Data_Hora(){
        return this.#Data_Hora;
    }

    set Data_Hora(NovoData_Hora){
        this.#Data_Hora = NovoData_Hora;
    }

    get Local(){
        return this.#Local;
    }

    set Local(NovoLocal){
        this.#Local = NovoLocal;
    }

    get Preco(){
        return this.#Preco;
    }

    set Preco(NovoPreco){
        this.#Preco = NovoPreco;
    }

    get Quantidade_ingresso(){
        return this.#Quantidade_ingresso;
    }

    set Quantidade_ingresso(NovoQuantidade_ingresso){
        this.#Quantidade_ingresso = NovoQuantidade_ingresso;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    //como armazenar os clientes no banco de dados?

    async gravar(){
        const dao = new EventoDAO();
        await dao.gravar(this); //this pode ser compreendido com a seguinte expressão:	"grave a mim mesmo"
    }

    async atualizar(){
        const dao = new EventoDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new EventoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    //override do método toString da classe pai Object
    toString(){
        return `Cliente código: ${this.#codigo} -  nome: ${this.#Sobre_Evento}`;
    }

    toJSON(){
        return {
            "codigo": this.#codigo,
            "Sobre Evento": this.#Sobre_Evento,
            "Nome Evento": this.#Nome_Evento,
            "Data Hora": this.#Data_Hora,
            "Local": this.#Local,
            "Preco": this.#Preco,
            "Quantidade ingressos": this.#Quantidade_ingresso,
            "telefone": this.#telefone,
            "email": this.#email
        }
    }
}