import { ProductType } from '@/types';
import processPayment from '@/utils/payment';
import Link from 'next/link';

export default {
  access: [
    {
      name: 'Teste',
      priceBeforeDiscount: '',
      price: 'Gratuíto',
      priceDetail: '',
      perks: [
        'Até 12 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Limite de 100 caracteres ao descrever tatuagem',
      ],
      callToAction: (
        <Link
          href="/criar"
          className="font-bold text-primary p-3 mb-3 rounded-md bg-detail hover:bg-yellow-500"
        >
          Crie agora
        </Link>
      ),
    },
    {
      name: '10 Créditos',
      priceBeforeDiscount: 'R$ 29,90',
      price: 'R$ 19,90',
      priceDetail: '(pagamento único)',
      perks: [
        'Até 40 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Maior limite de caracteres ao descrever tatuagem',
      ],
      callToAction: (
        <button
          onClick={() => processPayment('price_1My6yGICcQQfNZPtQthPj7Vk')}
          className="bg-gradient-to-r mb-3 font-bold text-center text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500"
        >
          Compre 10 créditos
        </button>
      ),
    },
    {
      name: '50 Créditos',
      priceBeforeDiscount: 'R$ 109,90',
      price: 'R$ 89,90',
      priceDetail: '(pagamento único)',
      perks: [
        'Até 200 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Maior limite de caracteres ao descrever tatuagem',
      ],
      callToAction: (
        <button
          onClick={() => processPayment('price_1My735ICcQQfNZPt3b1VxeKq')}
          className="bg-gradient-to-r mb-3 font-bold text-center text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500"
        >
          Compre 50 créditos
        </button>
      ),
    },
  ],
  package: [
    {
      name: 'Teste',
      priceBeforeDiscount: '',
      price: 'Gratuíto',
      priceDetail: '',
      perks: [
        'Até 12 artes de tatuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Limite de 100 caracteres ao descrever tatuagem',
      ],
      callToAction: (
        <Link
          href="/criar"
          className="font-bold text-primary p-3 mb-3 rounded-md bg-detail hover:bg-yellow-500"
        >
          Crie agora
        </Link>
      ),
    },
    {
      name: 'Acesso Total - 7 dias',
      priceBeforeDiscount: 'R$ 69,90',
      price: 'R$ 49,99',
      priceDetail: '(pagamento único)',
      perks: [
        '7 dias de acesso a IA',
        'Tatuagens Ilimitadas',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Pagamento único',
        'Limite máximo de caracteres ao descrever tatuagem',
        'Não é mensalidade',
      ],
      callToAction: (
        <button
          onClick={() => processPayment('price_1My757ICcQQfNZPtaHd1Sav9')}
          className="bg-gradient-to-r mb-3 font-bold text-center text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500"
        >
          Compre o Acesso Total
        </button>
      ),
    },
    {
      name: 'Acesso Total - 30 dias',
      priceBeforeDiscount: 'R$ 129,90',
      price: 'R$ 109,90',
      priceDetail: '(pagamento único)',
      perks: [
        '30 dias de acesso a IA',
        'Tatuagens Ilimitadas',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Pagamento único',
        'Limite máximo de caracteres ao descrever tatuagem',
        'Não é mensalidade',
      ],
      callToAction: (
        <button
          onClick={() => processPayment('price_1My77OICcQQfNZPtIUH5qXZF')}
          className="bg-gradient-to-r mb-3 font-bold text-center text-letter p-3 rounded-md from-green-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500"
        >
          Compre o Acesso Total
        </button>
      ),
    },
  ],
} as Record<string, ProductType[]>;
