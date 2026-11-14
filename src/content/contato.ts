import { links } from "./site";

export type ContactIntent = "consultoria" | "publicacao";

export const contactContent = {
  eyebrow: "Serviços / contato",
  title: "Vamos conversar?",
  intro: "Escolha o motivo do contato e conte o que você precisa.",
  choiceTitle: "Como posso ajudar?",
  choices: [
    {
      id: "consultoria",
      title: "Consultoria ou mentoria",
      description: "Converse comigo sobre desenvolvimento, qualidade e testes.",
      formTitle: "Conte sobre seu objetivo",
      subject: "Pedido de consultoria ou mentoria",
    },
    {
      id: "publicacao",
      title: "Divulgar meu serviço",
      description: "Envie uma apresentação do serviço que você quer divulgar.",
      formTitle: "Apresente seu serviço",
      subject: "Apresentação de serviço",
    },
  ] as const,
  supportTypes: [
    { value: "consultoria", label: "Consultoria" },
    { value: "mentoria", label: "Mentoria" },
  ],
  nameLabel: "Seu nome",
  emailLabel: "Seu e-mail",
  supportLabel: "Tipo de apoio",
  selectPrompt: "Selecione uma opção",
  topicLabel: "Assunto",
  serviceNameLabel: "Nome do serviço",
  presentationLabel: "Link da apresentação",
  presentationHint: "Opcional. Pode ser um site, portfólio ou documento público.",
  consultingMessageLabel: "Conte um pouco sobre o que precisa",
  publicationMessageLabel: "Conte um pouco sobre o serviço",
  sendLabel: "Enviar pedido",
  sendingLabel: "Enviando pedido…",
  successMessage: "Pedido enviado. Vou responder pelo e-mail informado.",
  errorMessage: "Não foi possível enviar o pedido. Tente novamente ou escreva por e-mail.",
  privacyNote:
    "O FormSubmit envia seus dados para meu e-mail. Usarei as informações para responder.",
  fallbackBefore: "Faltou algo no formulário? ",
  fallbackLink: "contate",
  fallbackAfter: " por e-mail e conte o que precisa.",
  fallbackSubjects: {
    consultoria: "Consultoria ou mentoria",
    publicacao: "Apresentação de serviço",
    geral: "Contato sobre serviços",
  },
  fallbackBodies: {
    consultoria: "Olá, gostaria de conversar sobre uma consultoria ou mentoria. Assunto: ",
    publicacao: "Olá, gostaria de apresentar meu serviço. Descrição e link da apresentação: ",
    geral: "Olá, gostaria de conversar sobre serviços. Minha necessidade é: ",
  },
  recipient: links.contactEmail,
};
