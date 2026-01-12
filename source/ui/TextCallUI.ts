import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            op = Number(prompt('Escolha uma opção\n1 - Cadastrar\n2 - Listar\n3 - Marcar como concluido\n0 - Sair'));
            switch(op){
                case 1:
                    let nome : string = prompt('Digite seu nome')!;
                    let descricao : string = prompt('Digite a descrição do problema')!;
                    let deuCerto : boolean = this.callController.abrirChamado(nome, descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado');
                    }else{
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;
                case 2:
                    let lista = this.callController.listarChamado();
                    let mensagem: string = 'Lista de Chamados:\n';
                    lista.forEach(c => {
                    mensagem += `Nome: ${c.solicitante} - Descrição: ${c.descricao} - Status: ${c.status}\n`;
                    });
                    alert(mensagem);
                    break;
                case 3: 
                    let listaChamados = this.callController.listarChamado();
                    let msg : string = 'Escolha o chamado para marcar como concluído:\n';
                    listaChamados.forEach((c, index) => {
                        msg += `${index} - Nome: ${c.solicitante} - Descrição: ${c.descricao} - Status: ${c.status}\n`;
                    });
                    let indice : number = Number(prompt(msg)!);
                    if(indice >=0 && indice < listaChamados.length){
                        if(listaChamados[indice].status){
                            alert("Não é possível atualizar um chamado já concluído.");
                            break;
                        }
                        let chamadoParaAtualizar = listaChamados[indice];
                        this.callController.marcarComoAtendido(chamadoParaAtualizar);
                        alert("Chamado atualizado com sucesso!\nVerifique a lista de chamados para confirmar");  
                    }else{
                        alert('Índice inválido');
                    }
                    break;
                case 0:
                    break;
                default:
                    alert('Opcao Inválida');
            }
        }
    }

}
