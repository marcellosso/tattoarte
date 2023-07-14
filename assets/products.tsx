import { ProductType } from '@/types';

export default {
  access: [
    {
      name: 'Degustação - 3 Créditos',
      price: 'R$ 6,99',
      offerDetail: 'R$ 0,60 por Tattoo',
      priceWithDiscount: 'R$ 5,94',
      offerDetailWithDiscount: 'R$ 0,49 por Tattoo',
      priceId: process.env.NEXT_PUBLIC_PRICE_3_CREDITS ?? '',
      priceDetail: '(pagamento único)',
      perks: [
        'Perfeito para testar!',
        'Até 12 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Maior limite de caracteres ao descrever tatuagem',
      ],
    },

    {
      name: '10 Créditos',
      price: 'R$ 17,99',
      offerDetail: 'R$ 0,45 por Tattoo',
      priceWithDiscount: 'R$ 15,29',
      offerDetailWithDiscount: 'R$ 0,38 por Tattoo',
      priceId: process.env.NEXT_PUBLIC_PRICE_10_CREDITS ?? '',
      priceDetail: '(pagamento único)',
      perks: [
        'Até 40 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Maior limite de caracteres ao descrever tatuagem',
      ],
    },
    {
      name: '50 Créditos',
      price: 'R$ 79,99',
      offerDetail: 'R$ 0,40 por Tattoo',
      priceWithDiscount: 'R$ 67,99',
      offerDetailWithDiscount: 'R$ 0,34 por Tattoo',
      priceId: process.env.NEXT_PUBLIC_PRICE_50_CREDITS ?? '',
      priceDetail: '(pagamento único)',
      perks: [
        'Até 200 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Maior limite de caracteres ao descrever tatuagem',
      ],
    },
  ],
} as Record<string, ProductType[]>;
