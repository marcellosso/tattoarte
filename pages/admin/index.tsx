import { prisma } from '@/utils/use-prisma';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Role, User, Features } from '@prisma/client';
import axios from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

interface IUserEditModal {
  user: User & { features: Partial<Features> };
  updateUser: (_v: User, _f: Partial<Features>) => void;
  closeUserEditModal: () => void;
}

const UserEditModal: FC<IUserEditModal> = ({
  user,
  updateUser,
  closeUserEditModal,
}) => {
  const { register, handleSubmit } = useForm<User & Features>({
    defaultValues: { ...user, ...user.features },
  });

  const handleUpdate = (updatedUser: User & Partial<Features>) => {
    const localUpdatedUser = {
      ...updatedUser,
    };

    const updatedUserFeatures = {
      imageToTattoo: updatedUser.imageToTattoo,
      newAiVersion: updatedUser.newAiVersion,
    };

    delete localUpdatedUser.newAiVersion;
    delete localUpdatedUser.imageToTattoo;
    updateUser(localUpdatedUser, updatedUserFeatures);
    closeUserEditModal();
  };

  return (
    <div
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-100 bg-[#393e46a4] w-screen h-screen flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="relative  rounded-lg shadow bg-primary"
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t border-secondary">
            <h3 className="text-xl font-semibold text-letter">
              {user.name} ({user.id})
            </h3>
            <button
              type="button"
              onClick={closeUserEditModal}
              className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-secondary"
              data-modal-hide="editUserModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  {...register('name')}
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm border border-letter bg-primary text-letter text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="role"
                  className="block mb-2 text-xs md:text-sm font-normal text-letter"
                >
                  Role
                </label>
                <select
                  {...register('role')}
                  id="role"
                  className="border text-xs md:text-sm rounded-lg block w-full p-2 md:p-2.5 bg-primary 
                    border-letter placeholder-gray-400 text-letter focus:border-detail"
                >
                  <option value={Role.USER}>{Role.USER}</option>
                  <option value={Role.ADMIN}>{Role.ADMIN}</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  {...register('credits')}
                  htmlFor="credits"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Credits
                </label>
                <input
                  {...register('credits')}
                  type="number"
                  name="credits"
                  id="credits"
                  className="shadow-sm border border-letter bg-primary text-letter text-sm rounded-lg block w-full p-2.5"
                />
              </div>
              <div className="col-span-4 items-center justify-center flex mt-4">
                <label className="relative inline-flex items-center mr-6">
                  <input
                    type="checkbox"
                    {...register('newAiVersion')}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 cursor-pointer border-letter border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-600 rounded-full peer peer-checked:after:translate-x-full 
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                      after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-detail`}
                  ></div>
                  <span
                    className={`ml-3 text-xs md:text-sm font-medium text-letter`}
                  >
                    Mythic AI Version
                  </span>
                </label>
                <label className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('imageToTattoo')}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-11 h-6 cursor-pointer border-letter border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-600 rounded-full peer peer-checked:after:translate-x-full 
                      peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                      after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-detail`}
                  ></div>
                  <span
                    className={`ml-3 text-xs md:text-sm font-medium text-letter`}
                  >
                    Image Upload
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-primary bg-detail hover:bg-yellow-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface IAdmin {
  users: (User & { features: Partial<Features> })[];
}

const Admin: FC<IAdmin> = ({ users }) => {
  const [localUsers, setLocalUsers] = useState(users);
  const [openUserEditModal, setOpenUserEditModal] = useState<
    User & { features: Partial<Features> }
  >();

  const handleUpdateUser = async (
    updatedUser: User,
    updatedFeatures: Partial<Features>
  ) => {
    try {
      const newLocalUsers = [...localUsers];
      const currentUserIndex = localUsers.findIndex(
        (user) => user.id == updatedUser.id
      );
      newLocalUsers[currentUserIndex] = {
        ...newLocalUsers[currentUserIndex],
        ...{ ...updatedUser, features: { ...updatedFeatures } },
      };

      setLocalUsers(newLocalUsers);

      const newUserData = {
        updatedUser: {
          ...updatedUser,
          credits: parseInt(updatedUser.credits as unknown as string),
        },
        updatedFeatures: { ...updatedFeatures },
      };

      await axios.put('/api/user/update', newUserData);
    } catch (err) {
      toast.error(err as string, {
        position: 'top-right',
        autoClose: 5000,
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
    <main>
      <section className="flex min-h-screen h-screen px-2 flex-col items-center pt-16 md:pt-24 pb-0 text-letter overflow-y-scroll overflow-x-hidden scrollbar-hide">
        {openUserEditModal && (
          <UserEditModal
            user={openUserEditModal}
            updateUser={handleUpdateUser}
            closeUserEditModal={() => setOpenUserEditModal(undefined)}
          />
        )}
        <div className="h-full w-full mt-4 rounded-md p-6 flex flex-col items-center gap-5 ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <h1 className="text-3xl text-letter font-bold">
              Usuários: {users.length}
            </h1>
            <table className="w-full text-sm text-left text-letter mt-2 scrollbar-hide">
              <thead className="text-sm text-detail uppercase dark:bg-secondary ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credits
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Generation Count
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {localUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b bg-black border-letter hover:bg-black/25"
                  >
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.credits}</td>
                    <td className="px-6 py-4">{user.generationCount}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Tooltip id="feature-tooltip" />
                      {Object.keys(
                        user.features || {
                          newAiVersion: false,
                          imageToTattoo: false,
                        }
                      ).map((el) => {
                        const currFeature = (user.features as Features)?.[
                          el as keyof Features
                        ];
                        if (currFeature)
                          return (
                            <a
                              key={el}
                              data-tooltip-id="feature-tooltip"
                              data-tooltip-content={el.toLocaleUpperCase()}
                            >
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-4 h-4 text-green-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </a>
                          );

                        return (
                          <a
                            key={el}
                            data-tooltip-id="feature-tooltip"
                            data-tooltip-content={el.toLocaleUpperCase()}
                          >
                            <svg
                              key={el}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="w-4 h-4 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </a>
                        );
                      })}
                    </td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setOpenUserEditModal(user)}
                        className="font-medium text-blue-500 hover:underline mr-4"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession(req, res);
    const sessionUser = session!.user || {};

    const user = await prisma.user.findUnique({
      where: {
        email: sessionUser.email as string,
      },
    });

    if (user?.role != Role.ADMIN) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        credits: true,
        name: true,
        role: true,
        createdAt: true,
        generationCount: true,
        features: {
          select: {
            newAiVersion: true,
            imageToTattoo: true,
          },
        },
      },
    });

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  },
});

export default Admin;
