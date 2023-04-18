import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingState from './loading-state';

const CREDITS_CONTAINER_CSS =
  'bg-primary text-letter text-xs font-normal mr-2 p-2  h-full rounded-3xl shadow-inner flex flex-row items-center justify-center hover:cursor-pointer hover:bg-gray-700';

interface IUserAvatar {
  credits?: number;
  isSubscribed?: boolean;
  userStripeId?: string;
}

const UserAvatar: FC<IUserAvatar> = ({
  credits,
  isSubscribed,
  userStripeId,
}) => {
  const { user } = useUser();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const userInitials = useMemo(() => {
    const name = user?.name || '';
    const initials = name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase();

    return initials;
  }, [user?.name]);

  const router = useRouter();

  const goToBilling = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/billing', {
        params: {
          customerId: userStripeId,
        },
      });
      await router.push(data.url);
      setLoading(false);
    } catch (err) {
      toast.error(err as string, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <div>
      <LoadingState isLoading={loading} label="Redirecionando" />
      <div className="flex items-center ml-3">
        {isSubscribed ? (
          <div className={CREDITS_CONTAINER_CSS}>
            <span className="font-bold text-detail">Acesso Total</span>
          </div>
        ) : (
          <Link
            href="/precos"
            className={`${CREDITS_CONTAINER_CSS} hover:cursor-pointer hover:bg-gray-700`}
          >
            <div>
              <span className="font-bold text-detail">{credits}&nbsp;</span>
              Creditos
            </div>
            <div className="ml-2 h-5 w-5">
              <svg
                fill="none"
                stroke="currentColor"
                className="text-letter"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </Link>
        )}

        <div
          id="userAvatar"
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="relative inline-flex items-center justify-center w-10 h-10 shadow-inner overflow-hidden rounded-full bg-primary hover:bg-gray-700 hover:cursor-pointer"
        >
          <span className="text-letter font-bold">{userInitials}</span>
        </div>
      </div>

      <div>
        {isUserDropdownOpen && (
          <div
            className="fixed top-0 left-0 bottom-0 right-0"
            onClick={() => setIsUserDropdownOpen(false)}
          />
        )}
        <div
          id="userDropdown"
          className={`z-100 ml-20 absolute mt-2 rounded-md shadow bg-primary ${
            isUserDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="userAvatar"
          >
            <li>
              <Link
                href="/criar"
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
              >
                <div className="h-6 w-6 mr-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
                Criar
              </Link>
            </li>

            <li>
              <Link
                href="/colecao"
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
              >
                <div className="h-6 w-6 mr-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                Coleção
              </Link>
            </li>

            <div className="h-0.5 w-full my-2 bg-letter opacity-70" />

            <li>
              <button
                onClick={() => goToBilling()}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
              >
                <div className="h-6 w-6 mr-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    ></path>
                  </svg>
                </div>
                Compras
              </button>
            </li>
            <li>
              <Link
                href="/api/auth/logout"
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
              >
                <div className="h-6 w-6 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </div>
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
