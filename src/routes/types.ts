export type StackParamList = {
    Home: undefined;
    LoginAdmin: undefined;
    LoginUser: undefined;
    Cadastro: undefined;
    TelaSenha: { 
        userData: {
            nome: string;
            dataNascimento: string;
            cpf: string;
            rg: string;
            orgaoExpeditor: string;
            cnh: string;
            telefone: string;
            email: string;
            cep: string;
            cidade: string;
            rua: string;
            bairro: string;
            numero: string;
            profissao: string;
            estadoCivil: string;
        };
    };
    TelaHomeAdmin: undefined;
    Tela_Home_User: undefined;
    Alugados: undefined;
    NaoAlugados: undefined;
    TelaEditarVeiculo: { id: number }; // Atualizado para aceitar o id
    TelaBlackList: undefined;
    CadastrarVeiculo: undefined;
    telaHomeDefinitiva: undefined;
    HistoricoManutencao: undefined;
    HistoricoAlugados: undefined;
    TelaAvaliacaoCliente: undefined;
    TelaCalendario: undefined;
    VeiculosAlugadosAdmin: undefined;
    VeiculosNaoAlugadosAdmin: undefined;
    TelaNotificacao: undefined;

};
