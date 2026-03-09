import React from "react";

export const metadata = {
  title: "Política de Privacidade | Gerador de Recibos e Pagamentos PDF",
  description:
    "Política de Privacidade do aplicativo Gerador de Recibos e Pagamentos PDF.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
          Política de Privacidade – Gerador de Recibos e Pagamentos PDF
        </h1>

        <div className="text-gray-600 leading-relaxed">
          <p className="mb-6 font-medium text-gray-500">
            Última atualização: 2026
          </p>

          <p className="mb-8 text-lg">
            O aplicativo <strong>Gerador de Recibos e Pagamentos PDF</strong>{" "}
            respeita a privacidade dos usuários e se compromete a proteger as
            informações utilizadas dentro do aplicativo.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Coleta de Informações
            </h2>
            <p className="mb-4">
              O aplicativo pode armazenar informações inseridas pelo próprio
              usuário, como nome do cliente, valores de pagamento, descrição de
              serviços e dados necessários para a geração de recibos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Uso das Informações
            </h2>
            <p className="mb-4">
              Essas informações são utilizadas exclusivamente para permitir que
              o usuário gere recibos, comprovantes de pagamento e orçamentos
              dentro do aplicativo.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Armazenamento de Dados
            </h2>
            <p className="mb-4">
              Os dados inseridos são armazenados apenas no dispositivo do
              usuário e não são enviados para servidores externos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Compartilhamento de Informações
            </h2>
            <p className="mb-4">
              O aplicativo não compartilha, vende ou distribui dados pessoais
              dos usuários para terceiros.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Arquivos Gerados
            </h2>
            <p className="mb-4">
              O aplicativo permite gerar arquivos em PDF que podem ser
              compartilhados pelo próprio usuário através de aplicativos como
              WhatsApp ou e-mail.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Segurança
            </h2>
            <p className="mb-4">
              Tomamos medidas razoáveis para proteger as informações armazenadas
              no aplicativo.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Crianças
            </h2>
            <p className="mb-4">
              Este aplicativo não é direcionado para crianças menores de 13
              anos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Alterações nesta Política
            </h2>
            <p className="mb-4">
              Esta Política de Privacidade pode ser atualizada periodicamente.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Contato
            </h2>
            <p className="mb-4">
              Se houver dúvidas sobre esta Política de Privacidade, entre em
              contato pelo e-mail:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg inline-block text-blue-700 font-medium">
              <a
                href="mailto:wesleyfilipy454@gmail.com"
                className="hover:underline"
              >
                wesleyfilipy454@gmail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
