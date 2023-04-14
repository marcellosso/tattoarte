import tattooStyles from '@/assets/tattoo-styles';
import AppNavbar from '@/components/app-navbar';
import ImageContainer from '@/components/image-container';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import React, { FC } from 'react';

interface IAPP {
  user: UserProfile;
}

const App: FC<IAPP> = ({ user }) => {
  return (
    <>
      <AppNavbar />
      <main className="flex min-h-screen h-screen flex-col items-center justify-between pt-16 bg-primary text-letter">
        <section className="flex w-screen h-full">
          <div className="bg-secondary w-1/5 h-full shadow-lg shadow-gray-400">
            <h1 className="text-xl font-bold text-letter border-b-2 text-center divide-letter py-2">
              Crie suas <span className="text-detail">tattoos</span>,{' '}
              {user.name}!
            </h1>

            <div className="p-4">
              <div className="mb-3">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descreva sua tattoo
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm rounded-lg bg-primary border border-gray-600 placeholder-gray-400 text-letter focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Um pescador viajando pelo espaço"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="cores"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cores
                </label>
                <select
                  id="countries"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-primary border-gray-600 placeholder-gray-400 text-letter focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Preto e Branco">Preto e Branco</option>
                  <option value="Colorido">Colorido</option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="estilo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Estilo
                </label>
                <select
                  id="estilo"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-primary border-gray-600 placeholder-gray-400 text-letter focus:ring-blue-500 focus:border-blue-500"
                >
                  {tattooStyles.map((tattoo, idx) => (
                    <option key={idx} value={tattoo}>
                      {tattoo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Artistas para inspiração
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-primary border-gray-600 placeholder-gray-400 text-letter focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tarsila do Amaral, Cândido Portinari, Romero Britto"
                  required
                />
              </div>
            </div>
          </div>
          <div className="w-4/5 p-4 bg-primary">
            <div className="bg-secondary h-full w-full rounded-lg shadow-md shadow-gray-400">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full items-center justify-items-center overflow-y-scroll scrollbar-hide">
                <ImageContainer />
                <ImageContainer />
                <ImageContainer />
                <ImageContainer />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default App;
