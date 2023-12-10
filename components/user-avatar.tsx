import { useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';

const LINK_BEFORE_CSS =
  'before:absolute before:bottom-0 before:left-0 before:bg-letter before:h-px before:w-1/3 before:translate-x-full';

interface IUserAvatar {
  userName: string;
}

const UserAvatar: FC<IUserAvatar> = ({ userName }) => {
  const router = useRouter();
  const { signOut } = useClerk();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userInitials = useMemo(() => {
    const name = userName || '';
    const initials = name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      .toUpperCase();

    return initials;
  }, [userName]);

  return (
    <>
      <div
        id="userAvatar"
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        className="relative inline-flex items-center justify-center w-10 h-6 xs:w-10 xs:h-10 overflow-hidden rounded-full bg-detail hover:bg-yellow-500 hover:cursor-pointer transition-all duration-200  -mr-5"
      >
        <span className="text-primary font-bold text-xs xs:text-lg">
          {userInitials}
        </span>
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
          className={`z-100 right-2 top-10 absolute mt-2 max-sm:right-2 md:max-lg:ml-12 rounded-md shadow bg-secondary ${
            isUserDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <ul
            className="pb-2 pt-1 text-sm text-letter"
            aria-labelledby="userAvatar"
          >
            <li className="relative mb-2">
              <Link
                href="/criar"
                onClick={() => setIsUserDropdownOpen(false)}
                className={`px-4 py-2 text-letter hover:bg-gray-600  flex items-center ${LINK_BEFORE_CSS}`}
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

            <li className="relative mb-2">
              <Link
                href="/colecao"
                onClick={() => setIsUserDropdownOpen(false)}
                className={`px-4 py-2 text-letter hover:bg-gray-600 flex items-center ${LINK_BEFORE_CSS}`}
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

            <li className="relative mb-2">
              <div>
                <button
                  className={`w-full px-4 py-2 text-letter hover:bg-gray-600 flex items-center ${LINK_BEFORE_CSS}`}
                  onClick={() => {
                    setIsUserDropdownOpen(false);
                    signOut(() => router.push('/'));
                  }}
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
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserAvatar;
