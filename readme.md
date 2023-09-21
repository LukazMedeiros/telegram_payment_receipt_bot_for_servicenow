# Telegram Payment Receipt Bot for ServiceNow Integration

Este repositório contém o código-fonte e a documentação para um bot no Telegram que automatiza o envio de comprovantes de pagamento para uma instância do ServiceNow. Com este bot, você pode simplificar o processo de registro de pagamentos em sua organização, economizando tempo e minimizando erros manuais.

## Visão Geral

O Telegram Payment Receipt Bot é uma aplicação que se integra ao Telegram e ao ServiceNow para permitir que os usuários enviem comprovantes de pagamento diretamente do aplicativo de mensagens. O bot coleta informações sobre o pagamento, como o valor e o arquivo do comprovante, e registra esses dados no ServiceNow. Isso melhora a eficiência do processo e mantém um registro preciso das transações financeiras.

### Recursos Principais

- Envio de Comprovantes de Pagamento: Os usuários podem enviar comprovantes de pagamento ao bot no Telegram, que coleta informações sobre a transação.
- Registro Automático no ServiceNow: As informações dos comprovantes de pagamento são automaticamente registradas em um incidente no ServiceNow, garantindo que todos os dados sejam armazenados de forma segura e acessível.
- Segurança e Privacidade: Todas as comunicações com o bot são criptografadas para garantir a segurança e a privacidade dos dados do usuário.

## Configuração

### Pré-requisitos

- Uma conta no Telegram e um bot criado no [BotFather](https://core.telegram.org/bots#botfather).
- Acesso a uma instância do ServiceNow com as permissões necessárias para criar incidentes.

### Configuração do Telegram

1. Crie um bot no Telegram seguindo as instruções do BotFather.
2. Anote o token de acesso do bot gerado pelo BotFather.

### Configuração do ServiceNow

1. Acesse sua instância do ServiceNow.
2. Crie um novo registro para representar os incidentes de comprovantes de pagamento (por exemplo, "Comprovantes de Pagamento").
3. Configure os campos necessários para armazenar informações sobre os comprovantes de pagamento, como valor, data e etc.

### Configuração do Bot

1. Clone este repositório em sua máquina local.
2. Crie um arquivo de configuração (por exemplo, .env) e configure as seguintes informações:
   Token de acesso do bot do Telegram.
   URL da instância do ServiceNow.
   Credenciais de autenticação para a instância do ServiceNow.

```
ATTACHMENT_URL=https://<instancia>/api/now/attachment/upload
TABLE_URL="URL da tabela"
USER="usuario servicenow"
PASSWORD="senha do servicenow"
TABLE_NAME="nome da tabela"
TABLE_SYS_ID="sys_id da tabela"
TELEGRAM_TOKEN="tokem do telegram"
```

3. Execute o bot usando seu ambiente de desenvolvimento NodeJS

## USO

1. Inicie o bot no Telegram e comece uma conversa com ele.
2. Envie um comprovante de pagamento seguindo as instruções fornecidas pelo bot.
3. O bot registrará automaticamente as informações do comprovante no ServiceNow e enviará uma notificação com o status da operação.

# Contribuição

Contribuições para melhorar este projeto são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar solicitações de pull (pull requests) para adicionar recursos, resolver bugs ou melhorar a documentação.

# Licença

Este projeto é licenciado sob a [Licença MIT](https://opensource.org/license/mit/).

**Observação**: Este é um projeto de código aberto não oficial e não é afiliado ao Telegram ou ao ServiceNow. O desenvolvedor deste bot não se responsabiliza por quaisquer problemas ou perdas decorrentes do uso deste software. Use-o por sua própria conta e risco.
