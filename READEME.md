# Recuperação de senha

**RF**
  - O usuário deve poder recuperar sua senha informando e-mail;
  - O usuário deve receber um e-mail com instruções para redefinir a senha;
  - O usuário deve poder resetar sua senha;

**RNF**
  - Utilizar Mailtrap para testa o envio de e-mail em ambiente dev;
  - Utilizar Amazon SES para envios em produção;
  - envio de e-mails deve acontecer em segundo plano(background job);
**RN**
  - O link enviado por e-mail para resetar a senha, deve ser expirado em 2h;
  - O usuário deve confirmar a nova senha ao resetar a mesma;
# Atualização do perfil

**RF**
- Usuário deve poder atualizar seu nome, e-mail e senha;

**RNF**

- Usuário não pode alterar seu e-mail para um e-mail ja cadastrado;
- Para alterar sua senha, o usuário deve informar a senha antiga;
- Para alterar sua senha, o usuário deve confirmar sua nova senha;

# Painel Prestador

**RF**
  - O usuário  deve poder listar seus agendamentos de um dia especifico;
  - O Prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder ver as notificações não lidas;

**RNF**
  - Os agendamentos do prestador no dia devem ser armazenados em cache;
  - As notificações do prestador deve ser armazenada no MongoDB;
  - As notificações do prestador deve ser enviada em tempo real  utilizando socket.io



**RN**
- A notificação deve ter um status de lida ou não lida para que o prestador possa  controlar


# Agendamentos de serviços

**RF**
- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês que tenha ao menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um da específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
-A listagem dos prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar uma hora;
- Os agendamentos devem estar divponíveis entre as 8h as 18h(primeira às 8h último às 17h)
- O usuário não podem agendar em horários ja agendados;
- O usuário não pode agendar em uma data passada;
- O usuário não pode agendar serviço consigo mesmo;

