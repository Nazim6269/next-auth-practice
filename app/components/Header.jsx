import { auth } from '@/auth';
import Image from 'next/image';
import Signin from './Signin';
import Signout from './Signout';

const Header = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-center h-screen">
      {session?.user ? (
        <div className="flex items-center ">
          {session?.user?.name} ||{' '}
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={32}
            height={32}
            className="rounded-full mx-2"
          />
          <Signout />
        </div>
      ) : (
        <>
          <Signin />
        </>
      )}
    </div>
  );
};

export default Header;
