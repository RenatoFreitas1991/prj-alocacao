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
    TelaEditarVeiculo: { modeloProp?: string; marcaProp?: string; placaProp?: string };
    TelaBlackList: undefined;
    CadastrarVeiculo: undefined;
    telaHomeDefinitiva: undefined;
    HistoricoManutencao: undefined;
    HistoricoAlugados: undefined;
    TelaAvaliacaoCliente: undefined;
};
