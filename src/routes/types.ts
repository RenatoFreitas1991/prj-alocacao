export type StackParamList = {
    Home: undefined;
    LoginAdmin: undefined;
    LoginUser: undefined;
    Cadastro: undefined;
    UserTabNavigator: {cpf: string};
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
    TelaEditarVeiculo: { id: number };
    TelaBlackList: undefined;
    CadastrarVeiculo: undefined;
    telaHomeDefinitiva: undefined;
    HistoricoManutencao: {clienteProp: string, marcaProp: string, modeloProp: string, placaProp: string, };
    HistoricoAlugados: undefined;
    TelaAvaliacaoCliente: undefined;
    TelaCalendario: undefined;
    VeiculosAlugadosAdmin: undefined;
    VeiculosNaoAlugadosAdmin: undefined;
    Notificacoes: undefined;
    VerInfo:{id: number, modelo:string, marca:string, placa:string, imagePath?:string, isUserScreen?: boolean};
    TelaLocacaoVeiculo: undefined;
    TelaManutencaoVeiculo:undefined;
    TelaEditarLocacaoVeiculo: { id: number };
    TelaHistoricoManutencaoVeiculo: { id: number };
    TelaFavorito: undefined;
};
