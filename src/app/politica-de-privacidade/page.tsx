import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Política de Privacidade | Exact Calories",
  description: "Política de Privacidade do aplicativo Exact Calories.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-20">
          <div className="prose lg:prose-xl mx-auto max-w-4xl">
            <h1 className="font-headline">Política de Privacidade — Exact Calories</h1>
            <p className="text-muted-foreground">Última atualização: junho de 2026</p>

            <p>O Exact Calories ("nós", "nosso") tem o compromisso de proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e compartilhamos seus dados quando você utiliza nosso aplicativo ou site.</p>

            <h2>1. Informações que Coletamos</h2>
            <ul>
              <li><strong>Informações de conta / perfil:</strong> nome, e-mail, foto de perfil (se fornecida)</li>
              <li><strong>Dados nutricionais e alimentares:</strong> refeições registradas, calorias, macronutrientes, metas diárias</li>
              <li><strong>Dados de uso:</strong> tempo de uso, recursos acessados, registros anônimos de erros</li>
              <li><strong>Assinatura e pagamento:</strong> status e histórico de assinatura (nenhum dado de cartão é armazenado)</li>
              <li><strong>Permissões do dispositivo:</strong> galeria de fotos (opcional, para foto de perfil), notificações (opcional)</li>
            </ul>

            <h2>2. Uso das Informações</h2>
            <p>Usamos os dados coletados para:</p>
            <ul>
              <li>Fornecer as funcionalidades do aplicativo (rastreamento de calorias, histórico, metas)</li>
              <li>Gerenciar assinaturas (Apple IAP / Google Play Billing)</li>
              <li>Melhorar o aplicativo com base em análises agregadas de uso</li>
              <li>Enviar notificações e lembretes úteis (se habilitados)</li>
              <li>Responder a solicitações de suporte</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>3. Compartilhamento de Dados</h2>
            <p>Não vendemos nem alugamos seus dados pessoais. Podemos compartilhá-los:</p>
            <ul>
              <li>Com prestadores de serviços terceiros que apoiam a infraestrutura do aplicativo (ex.: hospedagem em nuvem, análises)</li>
              <li>Com autoridades legais quando exigido por lei</li>
              <li>Com processadores de pagamento exclusivamente para validação de assinaturas</li>
            </ul>

            <h2>4. Armazenamento e Segurança</h2>
            <ul>
              <li>Os dados são armazenados em servidores seguros e criptografados</li>
              <li>O acesso é restrito a pessoas autorizadas</li>
              <li>Procedimentos de backup e redundância estão em vigor</li>
            </ul>

            <h2>5. Retenção de Dados</h2>
            <p>Mantemos seus dados enquanto sua conta estiver ativa ou até que você solicite a exclusão. Alguns dados podem ser retidos por períodos legalmente exigidos após a exclusão.</p>

            <h2>6. Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Solicitar acesso ou correção de seus dados pessoais</li>
              <li>Solicitar a exclusão de sua conta e de todos os dados associados</li>
              <li>Revogar consentimento, quando aplicável</li>
              <li>Desativar notificações a qualquer momento nas configurações do dispositivo</li>
            </ul>

            <h2>7. Solicitação de Exclusão de Dados</h2>
            <p>Você pode solicitar a exclusão de seus dados pessoais e de sua conta a qualquer momento por um dos meios abaixo:</p>
            <ul>
              <li>
                <strong>Por e-mail:</strong> envie uma mensagem para{" "}
                <a href="mailto:wesleyfilipy454@gmail.com">wesleyfilipy454@gmail.com</a>{" "}
                com o assunto <em>"Solicitação de Exclusão de Dados"</em> e o endereço de e-mail cadastrado em sua conta.
              </li>
              <li>
                <strong>Pelo aplicativo:</strong> entre em contato conosco por meio da opção de suporte dentro do Exact Calories.
              </li>
            </ul>
            <p>Após recebermos sua solicitação, excluiremos permanentemente sua conta e todos os dados pessoais associados em até <strong>30 dias</strong>. Você receberá um e-mail de confirmação quando a exclusão for concluída.</p>
            <p>Observação: alguns dados podem ser retidos por um período limitado quando exigido por lei ou para fins legítimos de negócios (ex.: prevenção de fraudes), sendo igualmente excluídos após esse prazo.</p>

            <h2>8. Crianças</h2>
            <p>O Exact Calories não é direcionado a crianças menores de 13 anos. Não coletamos intencionalmente dados pessoais de crianças.</p>

            <h2>9. Alterações nesta Política</h2>
            <p>Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas pelo aplicativo ou por e-mail.</p>

            <h2>10. Contato</h2>
            <p>Para dúvidas, solicitações ou reclamações sobre privacidade:</p>
            <p><strong>E-mail:</strong> <a href="mailto:wesleyfilipy454@gmail.com">wesleyfilipy454@gmail.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
