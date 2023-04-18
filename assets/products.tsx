import { ProductType } from '@/types';
import processPayment from '@/utils/payment';
import Link from 'next/link';

export default {
  access: [
    {
      name: 'Teste',
      price: 'Gratuíto',
      priceDetail: '',
      perks: [
        'Até 3 artes de tatuuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
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
      price: 'R$ 19,90',
      priceDetail: '(pagamento único)',
      perks: [
        'Até 10 artes de tatuuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
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
      price: 'R$ 99,90',
      priceDetail: '(pagamento único)',
      perks: [
        'Até 50 artes de tatuuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
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
      price: 'Gratuíto',
      priceDetail: '',
      perks: [
        'Até 3 artes de tatuuagem',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
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
      price: 'R$ 49,99',
      priceDetail: '(pagamento único)',
      perks: [
        '7 dias de acesso a IA',
        'Tatuagens Ilimitadas',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Pagamento único',
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
      price: 'R$ 109,90',
      priceDetail: '(pagamento único)',
      perks: [
        '30 dias de acesso a IA',
        'Tatuagens Ilimitadas',
        'Designer pessoal IA de tattoo',
        'Acesso a coleção pessoal',
        'Artes privadas',
        'Pagamento único',
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
