import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const image = fetch(
  new URL('../../public/images/tattooarte-logo.png', import.meta.url)
).then((res) => res.arrayBuffer());

const imageDefault = fetch(
  new URL('../../public/images/og-tattooart.jpg', import.meta.url)
).then((res) => res.arrayBuffer());

const sourceCodeProRegularFontP = fetch(
  new URL('../../public/fonts/SourceCodePro-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const sourceCodeProBoldFontP = fetch(
  new URL('../../public/fonts/SourceCodePro-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const sourceCodeProBlackFontP = fetch(
  new URL('../../public/fonts/SourceCodePro-Black.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const generationUrl = searchParams.get('generationUrl');
  const generationAuthor = searchParams.get('generationAuthor');
  const generationPrompt = searchParams.get('generationPrompt');

  const imageDefaultData = await imageDefault;

  if (!generationUrl) {
    return new ImageResponse(
      <img width="1200" height="630" src={imageDefaultData as any} />,
      {
        width: 1200,
        height: 630,
      }
    );
  }

  const imageData = await image;
  const [
    sourceCodeProRegularFont,
    sourceCodeProBoldFont,
    sourceCodeProBlackFont,
  ] = await Promise.all([
    sourceCodeProRegularFontP,
    sourceCodeProBoldFontP,
    sourceCodeProBlackFontP,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: 'rgb(17 24 39)',
          width: 1200,
          height: 630,
          padding: 10,
          paddingBottom: 5,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            width="420"
            height="420"
            src={generationUrl}
            style={{
              borderRadius: 20,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img width="60" height="60" src={imageData as any} />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 38,
                  color: '#eee',
                }}
              >
                TattooArt
                <span style={{ fontWeight: 900, color: '#FFD369' }}>IA</span>
              </span>
            </div>
            {generationAuthor && (
              <p
                style={{
                  color: '#eeee',
                  marginTop: 0,
                  marginLeft: 20,
                  fontSize: 32,
                }}
              >
                Arte criada por
                <span
                  style={{ color: '#FFD369', fontWeight: 900, marginLeft: 5 }}
                >
                  {generationAuthor}
                </span>
              </p>
            )}
            {generationPrompt && (
              <p
                style={{
                  color: '#eeee',
                  textAlign: 'center',
                  marginTop: 0,
                  marginLeft: 20,
                  fontSize: 32,
                  textTransform: 'capitalize',
                }}
              >
                {generationPrompt}
              </p>
            )}
          </div>
        </div>
        <p
          style={{
            color: '#eeee',
            textAlign: 'center',
            marginTop: 30,
            fontSize: 32,
            fontStyle: 'italic',
          }}
        >
          Crie uma tatuagem única usando nossa poderosa IA!
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'SourceCodePro',
          data: sourceCodeProRegularFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'SourceCodePro',
          data: sourceCodeProBoldFont,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'SourceCodePro',
          data: sourceCodeProBlackFont,
          style: 'normal',
          weight: 900,
        },
      ],
    }
  );
}
