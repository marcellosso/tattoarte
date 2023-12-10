import { SignIn, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { redirect_url } = router.query;

  if (isLoaded && isSignedIn) router.replace('/criar');

  return (
    <main>
      <Head>
        <title>
          Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial |
          TattooArtIA
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Criar tatuagem com inteligência Artificial. Deixe nossa Inteligência Artificial criar tatuagens únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta
          name="twitter:title"
          content="Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial | TattooArtIA"
        />
        <meta name="twitter:creator" content="@tattooartia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.tattooartia.com/" />
        <meta property="twitter:domain" content="tattooartia.com" />
        <meta
          name="twitter:description"
          content="Criar tatuagem com inteligência Artificial. Deixe nossa Inteligência Artificial criar tatuagens únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          name="twitter:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial | TattooArtIA"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.tattooartia.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Artista de Tatuagem IA - Crie tatuagens com Inteligência Artificial | TattooArtIA"
        />
        <meta
          property="og:description"
          content="Criar tatuagem com inteligência Artificial. Deixe nossa Inteligência Artificial criar tatuagens Únicas para você em segundos, de forma rápida e fácil. 
          Caso possua uma ideia para uma tatuagem, mas esteja tendo dificuldades em encontrar o desenho adequado, nossa tecnologia de IA
          pode ajudá-lo a gerar um em poucos segundos com base no que você gosta, irá te dar opções ilimitadas, sendo assim possível achar uma arte para todos."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}images/og-tattooart.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Artista de Tatuagem IA - Crie tatuagens únicas | TattooArtIA"
        />
        <meta
          name="google-site-verification"
          content="ffZ_-cy0-_bgVD36C25pYT39CdP6aXu3hhx3FNd-En4"
        />
      </Head>

      <section className=" h-screen flex flex-col items-center justify-center pt-12 md:pt-24 pb-0 text-letter  relative">
        <div className="mb-8 ">
          <SignIn
            signUpUrl="/sign-up"
            redirectUrl={(redirect_url as string) ?? '/criar'}
            appearance={{
              variables: {
                colorPrimary: '#FFD369',
                colorBackground: '#0A0909',
                colorText: '#EEEEEE',
                colorInputBackground: '#0A0909',
                colorInputText: '#EEEEEE',
              },
              layout: {
                shimmer: true,
                socialButtonsVariant: 'blockButton',
              },
              elements: {
                rootBox: 'mx-auto',
                formFieldInput__identifier: 'border-letter focus:border-detail',
                formFieldInput__firstName: 'border-letter focus:border-detail',
                formFieldInput__lastName: 'border-letter focus:border-detail',
                formFieldInput__password: 'border-letter focus:border-detail',
                formFieldInput__confirmPassword:
                  'border-letter focus:border-detail',
                dividerLine: 'bg-letter/60',
                socialButtonsBlockButton: 'border-letter',
                identityPreview: 'border-letter bg-secondary',
                otpCodeFieldInput: 'border-b-letter',
              },
            }}
          />
        </div>
        <Link
          href="/"
          className="block text-center text-sm text-letter underline hover:underline-offset-2 "
        >
          Voltar a tela inicial
        </Link>
      </section>
    </main>
  );
};

export default Login;
